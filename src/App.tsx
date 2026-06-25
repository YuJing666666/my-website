import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Sun, Moon, Plus, RefreshCw, AlertCircle, History, X
} from 'lucide-react';
import { WebItem } from './types';
import { INITIAL_WEB_ITEMS } from './data';
import Card from './components/Card';
import AddCardModal from './components/AddCardModal';

interface Rect {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  w: number; // percentage 0-100
  h: number; // percentage 0-100
}

function computeTreemap(
  items: WebItem[],
  containerWidth: number,
  containerHeight: number
): { item: WebItem; rect: Rect }[] {
  const getWeight = (pop?: string) => {
    switch (pop) {
      case 'huge': return 16;
      case 'wide': return 8;
      case 'tall': return 8;
      case 'normal': return 4;
      case 'small': return 2;
      case 'micro': return 1;
      default: return 4;
    }
  };

  // Sort by weight descending for beautiful visual nesting
  const weightedItems = items.map(item => ({
    item,
    weight: getWeight(item.popularity)
  })).sort((a, b) => b.weight - a.weight);

  function layout(
    nodes: { item: WebItem; weight: number }[],
    rect: Rect
  ): { item: WebItem; rect: Rect }[] {
    if (nodes.length === 0) return [];
    if (nodes.length === 1) {
      return [{ item: nodes[0].item, rect }];
    }

    // Split nodes into two groups with closest total weights
    const totalWeight = nodes.reduce((sum, n) => sum + n.weight, 0);
    let cumulative = 0;
    let splitIndex = 1;
    let minDiff = Infinity;

    for (let i = 0; i < nodes.length - 1; i++) {
      cumulative += nodes[i].weight;
      const diff = Math.abs(totalWeight / 2 - cumulative);
      if (diff < minDiff) {
        minDiff = diff;
        splitIndex = i + 1;
      }
    }

    const group1 = nodes.slice(0, splitIndex);
    const group2 = nodes.slice(splitIndex);

    const weight1 = group1.reduce((sum, n) => sum + n.weight, 0);
    const ratio = weight1 / totalWeight;

    // Evaluate physical dimensions of split options to avoid skinny vertical/horizontal cards
    const w1_v = rect.w * ratio;
    const w2_v = rect.w * (1 - ratio);
    const h1_v = rect.h;
    const h2_v = rect.h;

    const w1_h = rect.w;
    const w2_h = rect.w;
    const h1_h = rect.h * ratio;
    const h2_h = rect.h * (1 - ratio);

    // Convert relative coordinates to physical pixels
    const px_w1_v = (w1_v * containerWidth) / 100;
    const px_w2_v = (w2_v * containerWidth) / 100;
    const px_h1_v = (h1_v * containerHeight) / 100;
    const px_h2_v = (h2_v * containerHeight) / 100;

    const px_w1_h = (w1_h * containerWidth) / 100;
    const px_w2_h = (w2_h * containerWidth) / 100;
    const px_h1_h = (h1_h * containerHeight) / 100;
    const px_h2_h = (h2_h * containerHeight) / 100;

    const aspect_v1 = px_w1_v / px_h1_v;
    const aspect_v2 = px_w2_v / px_h2_v;

    const aspect_h1 = px_w1_h / px_h1_h;
    const aspect_h2 = px_w2_h / px_h2_h;

    // Penalty score helper: penalize aspect ratios that produce ugly, tall vertical cards.
    // Width-to-height ratio is preferred to be square or wide (aspect ratio >= 1.1).
    // Extreme vertical strips (aspect < 1.1) are extremely heavily penalized to ensure cards are square/wide.
    // Very thin horizontal lines (aspect > 2.8) are also penalized.
    const getPenalty = (aspect: number) => {
      let penalty = 0;
      if (aspect < 1.1) {
        penalty += Math.pow(1.1 - aspect, 2) * 15000;
      }
      if (aspect > 2.8) {
        penalty += Math.pow(aspect - 2.8, 2) * 800;
      }
      return penalty;
    };

    const penalty_v = getPenalty(aspect_v1) + getPenalty(aspect_v2);
    const penalty_h = getPenalty(aspect_h1) + getPenalty(aspect_h2);

    // Split along the axis that produces a more comfortable, legible card dimension
    const splitVertically = penalty_v < penalty_h;

    let r1: Rect;
    let r2: Rect;

    if (splitVertically) {
      r1 = {
        x: rect.x,
        y: rect.y,
        w: rect.w * ratio,
        h: rect.h
      };
      r2 = {
        x: rect.x + rect.w * ratio,
        y: rect.y,
        w: rect.w * (1 - ratio),
        h: rect.h
      };
    } else {
      r1 = {
        x: rect.x,
        y: rect.y,
        w: rect.w,
        h: rect.h * ratio
      };
      r2 = {
        x: rect.x,
        y: rect.y + rect.h * ratio,
        w: rect.w,
        h: rect.h * (1 - ratio)
      };
    }

    return [
      ...layout(group1, r1),
      ...layout(group2, r2)
    ];
  }

  return layout(weightedItems, { x: 0, y: 0, w: 100, h: 100 });
}

export default function App() {
  const [items, setItems] = useState<WebItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Search history state, persistent via localStorage
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ai_search_history');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return ['推理模型', '开源', 'AI 绘画', 'AI 视频', '编程']; // Initial default fast filters
  });

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      // Default to light mode (false) as requested by the user
      return false;
    }
    return false;
  });

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Resize Observer state to dynamically compute the physical dimensions of the Treemap container
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: width || 800,
          height: height || 600
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Load initial dataset + user custom additions
  useEffect(() => {
    const savedCustomItems = localStorage.getItem('custom_web_items');
    let customItems: WebItem[] = [];
    if (savedCustomItems) {
      try {
        customItems = JSON.parse(savedCustomItems);
      } catch (e) {
        console.error('Failed to parse custom items', e);
      }
    }

    const savedOrderedItems = localStorage.getItem('all_web_items_ordered');
    if (savedOrderedItems) {
      try {
        const ordered: WebItem[] = JSON.parse(savedOrderedItems);
        const validIds = new Set([
          ...INITIAL_WEB_ITEMS.map(i => i.id),
          ...customItems.map(i => i.id)
        ]);
        
        const filteredOrdered = ordered.filter(item => validIds.has(item.id));
        const orderedIds = new Set(filteredOrdered.map(i => i.id));
        const missingItems = [
          ...INITIAL_WEB_ITEMS,
          ...customItems
        ].filter(item => !orderedIds.has(item.id));
        
        setItems([...filteredOrdered, ...missingItems]);
        return;
      } catch (e) {
        console.error('Failed to parse ordered items', e);
      }
    }

    setItems([...INITIAL_WEB_ITEMS, ...customItems]);
  }, []);

  // Theme Syncing
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Global keyboard listeners for triggering and closing the search drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      
      // Open drawer on 's' or '/' when not typing in any input field
      if (!isInput && (e.key.toLowerCase() === 's' || e.key === '/')) {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => {
          searchInputRef.current?.focus();
          setIsFocused(true);
        }, 80);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => {
          searchInputRef.current?.focus();
          setIsFocused(true);
        }, 80);
      }
      
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsFocused(false);
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save term to persistent search history
  const saveSearchTerm = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item !== trimmed);
      const updated = [trimmed, ...filtered].slice(0, 10); // Keep up to 10 items
      localStorage.setItem('ai_search_history', JSON.stringify(updated));
      return updated;
    });
  };

  // Clear search histories
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('ai_search_history');
  };

  // Add Custom AI Card
  const handleAddCard = (newItem: Omit<WebItem, 'id' | 'isCustom'>) => {
    const freshItem: WebItem = {
      ...newItem,
      id: `custom-${Date.now()}`,
      isCustom: true,
      popularity: 'small'
    };
    const updated = [freshItem, ...items];
    setItems(updated);

    const customOnly = updated.filter(i => i.isCustom);
    localStorage.setItem('custom_web_items', JSON.stringify(customOnly));
    localStorage.setItem('all_web_items_ordered', JSON.stringify(updated));
  };

  // Delete Custom AI Card
  const handleDeleteCard = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    
    const customOnly = updated.filter(i => i.isCustom);
    localStorage.setItem('custom_web_items', JSON.stringify(customOnly));
    localStorage.setItem('all_web_items_ordered', JSON.stringify(updated));
  };

  // Drag Reordering Engine
  const handleReorder = (draggedId: string | null, hoveredId: string) => {
    if (!draggedId || draggedId === hoveredId) return;

    setItems(prevItems => {
      const draggedIndex = prevItems.findIndex(item => item.id === draggedId);
      const hoveredIndex = prevItems.findIndex(item => item.id === hoveredId);
      
      if (draggedIndex === -1 || hoveredIndex === -1) return prevItems;

      const newItems = [...prevItems];
      const [draggedItem] = newItems.splice(draggedIndex, 1);
      newItems.splice(hoveredIndex, 0, draggedItem);

      localStorage.setItem('all_web_items_ordered', JSON.stringify(newItems));
      return newItems;
    });
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  // Bento Span Classes mapped precisely across 6 structural sizes to give optimal dense arrangement
  const getBentoSpanClass = (popularity?: 'huge' | 'wide' | 'tall' | 'normal' | 'small' | 'micro') => {
    switch (popularity) {
      case 'huge':
        return 'md:col-span-2 md:row-span-2 col-span-2 row-span-2';
      case 'wide':
        return 'md:col-span-2 md:row-span-1 col-span-2';
      case 'tall':
        return 'md:col-span-1 md:row-span-2 col-span-1 row-span-2';
      case 'normal':
        return 'col-span-1 row-span-1';
      case 'small':
        return 'col-span-1 row-span-1';
      case 'micro':
        return 'col-span-1 row-span-1';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  // Filter items matching the query text or tag match
  const filteredItems = items.filter(item => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    const tagsMatch = item.tags && item.tags.some(t => t.toLowerCase().includes(query));
    return (
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.url.toLowerCase().includes(query) ||
      tagsMatch
    );
  });

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-[#fafafa] dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors duration-300 px-3 sm:px-4 lg:px-6 py-4 flex flex-col relative">
      
      {/* Background aesthetic grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_0.5px,transparent_0.5px),linear-gradient(to_bottom,#e5e7eb_0.5px,transparent_0.5px)] dark:bg-[linear-gradient(to_right,#1f2937_0.5px,transparent_0.5px),linear-gradient(to_bottom,#1f2937_0.5px,transparent_0.5px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.25] dark:opacity-[0.16]" />
      </div>

      {/* Floating trigger button when search drawer is closed */}
      <AnimatePresence>
        {!isSearchOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              setIsSearchOpen(true);
              setTimeout(() => {
                searchInputRef.current?.focus();
                setIsFocused(true);
              }, 120);
            }}
            className="fixed bottom-6 right-6 z-30 flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 shadow-[0_12px_24px_rgba(0,0,0,0.1)] dark:shadow-[0_12px_24px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            id="search-trigger-fab"
            title="搜索设置"
          >
            <Search className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Search overlay & top drawer */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Backdrop Overlay Mask with rich dark blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 z-40 bg-zinc-950/40 dark:bg-black/75 backdrop-blur-md"
              id="search-backdrop-overlay"
            />

            {/* Sliding top drawer - Adapts to current color theme */}
            <motion.div
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              className="fixed top-0 inset-x-0 z-50 bg-white/95 dark:bg-[#09090b]/95 border-b border-zinc-200 dark:border-zinc-900 shadow-[0_24px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.7)] backdrop-blur-md py-6 px-4 sm:px-6 md:px-8 text-zinc-800 dark:text-zinc-100"
              id="search-top-drawer"
            >
              <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
                {/* Simplified Search Bar with no container background, just a bottom border */}
                <div className="flex items-center gap-3 py-1.5 border-b border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-400 dark:focus-within:border-zinc-500 transition-all duration-300">
                  <div className="flex items-center gap-2.5 flex-grow min-w-0">
                    <Search className={`w-4 h-4 shrink-0 transition-colors ${isFocused ? 'text-zinc-800 dark:text-zinc-100' : 'text-zinc-400 dark:text-zinc-500'}`} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => {
                        setIsFocused(false);
                        if (searchQuery.trim()) {
                          saveSearchTerm(searchQuery);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          saveSearchTerm(searchQuery);
                          searchInputRef.current?.blur();
                        }
                      }}
                      placeholder="搜索 AI 工具、网址、关键词或标签..."
                      className="w-full bg-transparent border-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-0 text-sm font-semibold"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-[10px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 transition-colors shrink-0"
                      >
                        清除
                      </button>
                    )}
                  </div>

                  {/* Splitter Line */}
                  <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 shrink-0 mx-1" />

                  {/* Action Buttons Toolbar */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Color Theme Switcher */}
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                      title={darkMode ? '切换亮色模式' : '切换暗黑极客'}
                    >
                      {darkMode ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                    </button>

                    {/* Add Custom Card */}
                    <button
                      onClick={() => setAddModalOpen(true)}
                      className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                      title="添加自定义卡片"
                    >
                      <Plus className="w-4.5 h-4.5" />
                    </button>

                    {/* Reset Layout Order */}
                    <button
                      onClick={() => {
                        if (confirm('确认重置整个导航布局吗？这会清除您的排序和自定义卡片。')) {
                          localStorage.removeItem('custom_web_items');
                          localStorage.removeItem('all_web_items_ordered');
                          window.location.reload();
                        }
                      }}
                      className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                      title="重置默认顺序"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* SEARCH HISTORY & QUICK CHIPS BAR */}
                {searchHistory.length > 0 && (
                  <div className="mt-1 px-1 flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold tracking-wider uppercase shrink-0 flex items-center gap-1">
                      <History className="w-2.5 h-2.5" /> 搜索历史:
                    </span>
                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                      {searchHistory.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(term);
                          }}
                          className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-colors shrink-0 ${
                            searchQuery === term 
                              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-sm'
                              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                          }`}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      onClick={clearSearchHistory}
                      className="text-[9px] text-zinc-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-400 ml-auto shrink-0 transition-colors pl-1"
                    >
                      清除历史
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex-grow flex flex-col h-full">
        {/* COMPACT DENSE PACKED BENTO WALL */}
        <main className="w-full flex-grow flex-1 min-h-0 relative mb-2" ref={containerRef}>
          {filteredItems.length > 0 ? (
            <div className="absolute inset-0 w-full h-full" id="treemap-bento-grid">
              <AnimatePresence mode="popLayout">
                {computeTreemap(filteredItems, dimensions.width, dimensions.height).map(({ item, rect }) => {
                  const cardWidth = (rect.w * dimensions.width) / 100;
                  const cardHeight = (rect.h * dimensions.height) / 100;
                  return (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        position: 'absolute',
                        left: `${rect.x}%`,
                        top: `${rect.y}%`,
                        width: `${rect.w}%`,
                        height: `${rect.h}%`,
                        padding: '3px',
                      }}
                    >
                      <Card 
                        item={item} 
                        cardWidth={cardWidth - 6} // minus padding
                        cardHeight={cardHeight - 6} // minus padding
                        onDelete={handleDeleteCard}
                        onDragStart={(id) => setDraggedId(id)}
                        onDragOver={(id) => handleReorder(draggedId, id)}
                        onDragEnd={handleDragEnd}
                        isDragging={draggedId === item.id}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="w-full max-w-md mx-auto py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">未匹配到相关 AI 工具</h3>
                <p className="text-xs text-zinc-400 mt-1">请输入其他关键词或标签（例如: 编程、图片、视频、多模态）</p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                清空搜索重置
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Embedded add card modal */}
      <AddCardModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddCard}
        categories={[]}
      />
    </div>
  );
}
