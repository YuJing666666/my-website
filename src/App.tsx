import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Sun, Moon, Plus, RefreshCw, AlertCircle, History, X,
  TrendingUp, TrendingDown, Newspaper, Calendar, DollarSign, Activity, Cpu
} from 'lucide-react';
import { WebItem } from './types';
import { INITIAL_WEB_ITEMS, getStockAndNewsForItem, getModelsForItem } from './data';
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
  })).sort((a, b) => {
    if (b.weight !== a.weight) {
      return b.weight - a.weight;
    }
    if (a.item.id === 'control-center') return 1;
    if (b.item.id === 'control-center') return -1;
    return 0;
  });

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
  const [selectedTool, setSelectedTool] = useState<WebItem | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTool(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
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
    <div className="h-screen max-h-screen overflow-hidden bg-[#fafafa] dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors duration-300 px-2.5 sm:px-4 py-4 flex flex-col relative">
      
      {/* Background aesthetic grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_0.5px,transparent_0.5px),linear-gradient(to_bottom,#e5e7eb_0.5px,transparent_0.5px)] dark:bg-[linear-gradient(to_right,#1f2937_0.5px,transparent_0.5px),linear-gradient(to_bottom,#1f2937_0.5px,transparent_0.5px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.25] dark:opacity-[0.16]" />
      </div>

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
                {(() => {
                  const controlCenterItem: WebItem = {
                    id: 'control-center',
                    name: '控制中心',
                    url: '#',
                    description: '四合一控制面板',
                    category: 'system',
                    tags: [],
                    isFree: 'free',
                    popularity: 'micro',
                    logoColor: 'from-zinc-100 to-zinc-200',
                    logoText: 'Ctrl',
                    iconName: 'Settings'
                  };
                  const treemapItems = [...filteredItems];
                  if (!treemapItems.some(i => i.id === 'control-center')) {
                    treemapItems.push(controlCenterItem);
                  }
                  return computeTreemap(treemapItems, dimensions.width, dimensions.height).map(({ item, rect }) => {
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
                          onClick={(clickedItem) => {
                            if (clickedItem.id === 'control-center') return;
                            setSelectedTool(clickedItem);
                          }}
                          searchQuery={searchQuery}
                          onSearchChange={setSearchQuery}
                          onAddClick={() => setAddModalOpen(true)}
                          onResetClick={() => {
                            if (confirm('确认重置整个导航布局吗？这会清除您的排序和自定义卡片。')) {
                              localStorage.removeItem('custom_web_items');
                              localStorage.removeItem('all_web_items_ordered');
                              window.location.reload();
                            }
                          }}
                          darkMode={darkMode}
                          onThemeToggle={() => setDarkMode(!darkMode)}
                        />
                      </motion.div>
                    );
                  });
                })()}
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

      {/* Stock Price and News Floating Modal Panel */}
      <AnimatePresence>
        {selectedTool && (() => {
          const data = getStockAndNewsForItem(selectedTool);
          const { stock, news } = data;
          const isUp = stock.change >= 0;
          
          // Compute SVG coordinates for the 7 points
          const minVal = Math.min(...stock.history.map(p => p.value));
          const maxVal = Math.max(...stock.history.map(p => p.value));
          const valSpread = maxVal - minVal || 1;
          
          // Add margin to spread
          const padMin = minVal - valSpread * 0.15;
          const padMax = maxVal + valSpread * 0.15;
          const padSpread = padMax - padMin || 1;

          const width = 500;
          const height = 220;
          const paddingLeft = 45;
          const paddingRight = 15;
          const paddingTop = 25;
          const paddingBottom = 30;
          
          const chartW = width - paddingLeft - paddingRight;
          const chartH = height - paddingTop - paddingBottom;
          
          const points = stock.history.map((p, idx) => {
            const x = paddingLeft + (idx / (stock.history.length - 1)) * chartW;
            const y = paddingTop + chartH - ((p.value - padMin) / padSpread) * chartH;
            return { x, y, ...p };
          });
          
          let lineD = '';
          let areaD = '';
          if (points.length > 0) {
            lineD = `M ${points[0].x},${points[0].y} ` + points.slice(1).map(p => `L ${p.x},${p.y}`).join(' ');
            areaD = lineD + ` L ${points[points.length - 1].x},${paddingTop + chartH} L ${points[0].x},${paddingTop + chartH} Z`;
          }

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 dark:bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedTool(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl dark:shadow-black/80 overflow-hidden flex flex-col max-h-[85vh] md:max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top Bar / Header */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800/80 shrink-0 bg-zinc-50/50 dark:bg-zinc-900/50">
                  <div className="flex items-center gap-3">
                    <div className="text-zinc-900 dark:text-zinc-100 font-extrabold text-base flex items-center gap-2">
                      <span>{selectedTool.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-mono">
                        {stock.ticker}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400 dark:text-zinc-500 font-mono hidden sm:inline">
                      {stock.companyName}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedTool(null)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-850 transition-colors"
                    title="关闭窗口"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>
                
                {/* Scrollable Container with dense layout & no scrollbar */}
                <div className="flex-grow overflow-hidden p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                    
                    {/* Left Side: Stock Trend Dashboard - NO BORDER */}
                    <div className="flex flex-col rounded-xl p-4 bg-zinc-50/50 dark:bg-zinc-900/30 justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                            <Activity className="w-4 h-4 text-zinc-400" />
                            <span>最新股票走势</span>
                          </h3>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            NASDAQ 实时行情
                          </span>
                        </div>
                        
                        {/* Current Price indicators */}
                        <div className="flex items-baseline gap-2 mb-2">
                          <div className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 font-mono">
                            ${stock.price.toFixed(2)}
                          </div>
                          <div className={`flex items-center text-xs font-bold font-mono ${isUp ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                            {isUp ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
                            <span>{isUp ? '+' : ''}{stock.change.toFixed(2)} ({isUp ? '+' : ''}{((stock.change / (stock.price - stock.change)) * 100).toFixed(2)}%)</span>
                          </div>
                        </div>
                      </div>
 
                      {/* SVG Area Chart - NO BORDER */}
                      <div className="relative w-full overflow-hidden mt-1 bg-zinc-100/20 dark:bg-zinc-950/40 rounded-lg p-2">
                        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
                          <defs>
                            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={isUp ? '#10b981' : '#f43f5e'} stopOpacity="0.25" />
                              <stop offset="100%" stopColor={isUp ? '#10b981' : '#f43f5e'} stopOpacity="0.00" />
                            </linearGradient>
                          </defs>
                          
                          {/* Horizontal coordinate grid lines */}
                          {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
                            const yVal = padMin + r * padSpread;
                            const yPos = paddingTop + chartH - r * chartH;
                            return (
                              <g key={i} className="opacity-40">
                                <line 
                                  x1={paddingLeft} 
                                  y1={yPos} 
                                  x2={width - paddingRight} 
                                  y2={yPos} 
                                  stroke="currentColor" 
                                  strokeWidth="0.5" 
                                  strokeDasharray="3 3"
                                  className="text-zinc-300 dark:text-zinc-750" 
                                />
                                <text 
                                  x={paddingLeft - 8} 
                                  y={yPos + 3} 
                                  textAnchor="end" 
                                  className="fill-zinc-400 font-mono text-[9px] font-bold"
                                >
                                  ${yVal.toFixed(0)}
                                </text>
                              </g>
                            );
                          })}
 
                          {/* Gradient Area Fill */}
                          {areaD && (
                            <path 
                              d={areaD} 
                              fill="url(#chartFill)" 
                            />
                          )}
 
                          {/* Stroke line */}
                          {lineD && (
                            <path 
                              d={lineD} 
                              fill="none" 
                              stroke={isUp ? '#10b981' : '#f43f5e'} 
                              strokeWidth="2.5" 
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          )}
 
                          {/* Clickable Columns & Highlight Circles */}
                          {points.map((p, idx) => {
                            return (
                              <g key={idx} className="group/dot cursor-pointer">
                                {/* Hitbox column for hover feedback */}
                                <rect
                                  x={p.x - chartW / 12}
                                  y={paddingTop}
                                  width={chartW / 6}
                                  height={chartH}
                                  fill="transparent"
                                  className="hover:fill-zinc-500/5 dark:hover:fill-zinc-350/5 transition-colors"
                                />
                                
                                {/* Glowing Dot on Line */}
                                <circle 
                                  cx={p.x} 
                                  cy={p.y} 
                                  r="5" 
                                  className={`transition-transform duration-200 fill-white border ${
                                    isUp 
                                      ? 'stroke-emerald-500 dark:stroke-emerald-400 group-hover/dot:scale-125' 
                                      : 'stroke-rose-500 dark:stroke-rose-400 group-hover/dot:scale-125'
                                  }`}
                                  strokeWidth="2.5" 
                                />
 
                                {/* Hover Tooltip Overlay */}
                                <g className="opacity-0 group-hover/dot:opacity-100 transition-opacity duration-150 pointer-events-none">
                                  <rect 
                                    x={Math.max(10, p.x - 45)} 
                                    y={p.y - 32} 
                                    width="90" 
                                    height="24" 
                                    rx="4" 
                                    className="fill-zinc-950 dark:fill-white text-white dark:text-zinc-950"
                                  />
                                  <text 
                                    x={Math.max(10, p.x - 45) + 45} 
                                    y={p.y - 17} 
                                    textAnchor="middle" 
                                    className="fill-white dark:fill-zinc-950 font-mono text-[9px] font-extrabold"
                                  >
                                    {p.date}: ${p.value.toFixed(2)}
                                  </text>
                                </g>
                              </g>
                            );
                          })}
 
                          {/* Date timeline labels at bottom */}
                          {points.map((p, idx) => (
                            <text 
                              key={idx} 
                              x={p.x} 
                              y={height - 8} 
                              textAnchor="middle" 
                              className="fill-zinc-400 font-bold text-[9px] font-sans"
                            >
                              {p.date}
                            </text>
                          ))}
                        </svg>
                      </div>
                    </div>
                    
                    {/* Right Side: divided into News (1/3) and Model Series (2/3) */}
                    <div className="flex flex-col gap-3.5">
                      
                      {/* Right-Top 1/3: News - NO BORDER / NO REDIRECTS */}
                      <div className="flex-[1] flex flex-col rounded-xl p-3.5 bg-zinc-50/50 dark:bg-zinc-900/30 justify-between">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 mb-2.5">
                            <Newspaper className="w-4 h-4 text-zinc-400" />
                            <span>行业相关资讯</span>
                          </h3>
                          
                          <div className="space-y-2">
                            {news.slice(0, 2).map((item, idx) => (
                              <div 
                                key={idx}
                                className="group/news p-2.5 rounded-lg bg-white/60 dark:bg-zinc-950/20 text-left transition-all duration-200"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100 leading-snug line-clamp-1 flex-grow">
                                    {item.title}
                                  </h4>
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-[9px] font-mono text-zinc-400 dark:text-zinc-500">
                                  <span className="font-semibold text-zinc-500 dark:text-zinc-400">{item.source}</span>
                                  <span>•</span>
                                  <span>{item.time}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
 
                      {/* Right-Bottom 2/3: Model Series - NO BORDER / NO SCROLLBAR */}
                      <div className="flex-[2] flex flex-col rounded-xl p-3.5 bg-zinc-50/50 dark:bg-zinc-900/30 justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2.5">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                              <Cpu className="w-4 h-4 text-zinc-400" />
                              <span>推荐模型系列</span>
                            </h3>
                            <span className="text-[9px] text-zinc-450 dark:text-zinc-400 font-mono bg-white/50 dark:bg-zinc-950/20 px-2 py-0.5 rounded-md">
                              共 {getModelsForItem(selectedTool).length} 个模型
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-hidden">
                            {getModelsForItem(selectedTool).slice(0, 4).map((model, idx) => (
                              <div 
                                key={idx}
                                className="p-2 rounded-lg bg-white/60 dark:bg-zinc-950/20 hover:bg-white dark:hover:bg-zinc-950/45 transition-all text-left flex flex-col justify-between"
                              >
                                <div>
                                  <div className="font-bold text-xs text-zinc-850 dark:text-zinc-100 truncate">
                                    {model.name}
                                  </div>
                                  <div className="text-[9px] text-zinc-400 dark:text-zinc-500 font-mono mt-0.5">
                                    发布时间: {model.releaseDate}
                                  </div>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold">
                                    {model.useCase}
                                  </span>
                                  <span className="text-[9px] text-emerald-500 dark:text-emerald-400 font-mono font-bold">
                                    状态良好
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
 
                        <div className="text-[9px] text-zinc-400 text-left mt-2.5 border-t border-zinc-200/40 dark:border-zinc-800/40 pt-2 font-mono">
                          数据来源：各大科技媒体 & 金融公开市场。更新频率：实时。
                        </div>
                      </div>
 
                    </div>
 
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
