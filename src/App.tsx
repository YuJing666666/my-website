import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Sun, Moon, Plus, AlertCircle, History, X,
  TrendingUp, Newspaper, ExternalLink, Lightbulb, BookOpen, Tag,
  ShoppingBag, Info, Download, Upload, Maximize2, Minimize2,
  Shirt, Scissors, PenTool, Zap, LayoutGrid, Monitor, ChevronRight
} from 'lucide-react';
import { WebItem, CategoryType } from './types';

const CATEGORY_ORDER: CategoryType[] = ['fashion', 'trend', 'pattern', 'sewing', 'accessory', 'composition', 'software'];

const MOBILE_CATEGORIES: { id: CategoryType; label: string; icon: typeof Shirt; color: string }[] = [
  { id: 'fashion', label: '品牌', icon: Shirt, color: 'text-pink-500' },
  { id: 'trend', label: '趋势', icon: TrendingUp, color: 'text-orange-500' },
  { id: 'pattern', label: '纸样', icon: Scissors, color: 'text-cyan-500' },
  { id: 'sewing', label: '缝纫', icon: PenTool, color: 'text-emerald-500' },
  { id: 'accessory', label: '辅料', icon: Zap, color: 'text-amber-500' },
  { id: 'composition', label: '构成', icon: LayoutGrid, color: 'text-violet-500' },
  { id: 'software', label: '软件', icon: Monitor, color: 'text-sky-500' },
];
import { getFashionWebItems, getTrendWebItems, getPatternWebItems, getSewingWebItems, getAccessoryWebItems, getCompositionWebItems, getSoftwareWebItems, getInquiryDataForItem } from './data';
import Card from './components/Card';
import AddCardModal from './components/AddCardModal';
import Sidebar from './components/Sidebar';

interface Rect { x: number; y: number; w: number; h: number; }

function computeTreemap(items: WebItem[], cw: number, ch: number): { item: WebItem; rect: Rect }[] {
  const getWeight = (pop?: string) => {
    switch (pop) { case 'huge': return 6; case 'wide': return 5; case 'tall': return 5; case 'normal': return 4; case 'small': return 3; case 'micro': return 2.5; default: return 4; }
  };
  const weighted = items.map(item => ({ item, weight: getWeight(item.popularity) })).sort((a, b) => b.weight - a.weight);
  function layout(nodes: { item: WebItem; weight: number }[], rect: Rect): { item: WebItem; rect: Rect }[] {
    if (nodes.length === 0) return [];
    if (nodes.length === 1) return [{ item: nodes[0].item, rect }];
    const total = nodes.reduce((s, n) => s + n.weight, 0);
    let cum = 0, split = 1, minDiff = Infinity;
    for (let i = 0; i < nodes.length - 1; i++) { cum += nodes[i].weight; const d = Math.abs(total / 2 - cum); if (d < minDiff) { minDiff = d; split = i + 1; } }
    const g1 = nodes.slice(0, split), g2 = nodes.slice(split);
    const ratio = g1.reduce((s, n) => s + n.weight, 0) / total;
    const pen = (a: number) => { let p = 0; if (a < 0.65) p += Math.pow(0.65 - a, 2) * 40000; if (a > 1.5) p += Math.pow(a - 1.5, 2) * 40000; if (a < 0.45) p += 100000; if (a > 2.2) p += 100000; return p; };
    const pv = pen((rect.w * ratio * cw) / (rect.h * ch)) + pen((rect.w * (1 - ratio) * cw) / (rect.h * ch));
    const ph = pen((rect.w * cw) / (rect.h * ratio * ch)) + pen((rect.w * cw) / (rect.h * (1 - ratio) * ch));
    const sv = pv < ph;
    let r1: Rect, r2: Rect;
    if (sv) { r1 = { x: rect.x, y: rect.y, w: rect.w * ratio, h: rect.h }; r2 = { x: rect.x + rect.w * ratio, y: rect.y, w: rect.w * (1 - ratio), h: rect.h }; }
    else { r1 = { x: rect.x, y: rect.y, w: rect.w, h: rect.h * ratio }; r2 = { x: rect.x, y: rect.y + rect.h * ratio, w: rect.w, h: rect.h * (1 - ratio) }; }
    return [...layout(g1, r1), ...layout(g2, r2)];
  }
  return layout(weighted, { x: 0, y: 0, w: 100, h: 100 });
}

export default function App() {
  const [items, setItems] = useState<WebItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('fashion');
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') { const s = localStorage.getItem('ai_search_history'); if (s) { try { return JSON.parse(s); } catch { return []; } } }
    return ['快时尚', '设计趋势', '纸样', '缝纫', '配色', '辅料'];
  });
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') { const s = localStorage.getItem('theme'); if (s) return s === 'dark'; return true; }
    return true;
  });
  const [density, setDensity] = useState<'compact' | 'comfortable'>(() => {
    if (typeof window !== 'undefined') { const s = localStorage.getItem('card_density'); if (s === 'compact' || s === 'comfortable') return s; }
    return 'comfortable';
  });
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<WebItem | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeCategoryRef = useRef(activeCategory);
  const scrollCooldownRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedTool(null); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver((entries) => { for (const e of entries) { const { width, height } = e.contentRect; setDimensions({ width: width || 800, height: height || 600 }); } });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const savedCustom = localStorage.getItem('custom_web_items');
    let customItems: WebItem[] = [];
    if (savedCustom) { try { customItems = JSON.parse(savedCustom); } catch (e) { console.error(e); } }
    const savedOrdered = localStorage.getItem('all_web_items_ordered');
    if (savedOrdered) {
      try {
        const ordered: WebItem[] = JSON.parse(savedOrdered);
        const validIds = new Set([...getFashionWebItems().map(i => i.id), ...customItems.map(i => i.id)]);
        const filtered = ordered.filter(item => validIds.has(item.id));
        const orderedIds = new Set(filtered.map(i => i.id));
        const missing = [...getFashionWebItems(), ...customItems].filter(item => !orderedIds.has(item.id));
        setItems([...filtered, ...missing]);
        return;
      } catch (e) { console.error(e); }
    }
    setItems([...getFashionWebItems(), ...customItems]);
  }, []);

  useEffect(() => {
    if (darkMode) { document.documentElement.classList.add('dark'); localStorage.setItem('theme', 'dark'); }
    else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
  }, [darkMode]);

  useEffect(() => { localStorage.setItem('card_density', density); }, [density]);
  useEffect(() => { setActiveSectionIndex(0); }, [selectedTool]);
  useEffect(() => { activeCategoryRef.current = activeCategory; }, [activeCategory]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isSearchOpen || selectedTool) return;
      const target = e.target as HTMLElement;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      if (scrollCooldownRef.current) return;
      const idx = CATEGORY_ORDER.indexOf(activeCategoryRef.current);
      let next = idx;
      if (e.deltaY > 30) next = Math.min(idx + 1, CATEGORY_ORDER.length - 1);
      else if (e.deltaY < -30) next = Math.max(idx - 1, 0);
      if (next !== idx) {
        e.preventDefault();
        setActiveCategory(CATEGORY_ORDER[next]);
        setSearchQuery('');
        scrollCooldownRef.current = true;
        setTimeout(() => { scrollCooldownRef.current = false; }, 600);
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isSearchOpen, selectedTool]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if (!isInput && (e.key.toLowerCase() === 's' || e.key === '/')) {
        e.preventDefault(); setIsSearchOpen(true);
        setTimeout(() => { searchInputRef.current?.focus(); setIsFocused(true); }, 80);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault(); setIsSearchOpen(true);
        setTimeout(() => { searchInputRef.current?.focus(); setIsFocused(true); }, 80);
      }
      if (e.key === 'Escape') { setIsSearchOpen(false); setIsFocused(false); searchInputRef.current?.blur(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const saveSearchTerm = (term: string) => {
    const t = term.trim(); if (!t) return;
    setSearchHistory(prev => { const f = prev.filter(i => i !== t); const u = [t, ...f].slice(0, 10); localStorage.setItem('ai_search_history', JSON.stringify(u)); return u; });
  };
  const clearSearchHistory = () => { setSearchHistory([]); localStorage.removeItem('ai_search_history'); };

  const handleAddCard = (newItem: Omit<WebItem, 'id' | 'isCustom'>) => {
    const fresh: WebItem = { ...newItem, id: `custom-${Date.now()}`, isCustom: true, popularity: 'small' };
    const updated = [fresh, ...items]; setItems(updated);
    localStorage.setItem('custom_web_items', JSON.stringify(updated.filter(i => i.isCustom)));
    localStorage.setItem('all_web_items_ordered', JSON.stringify(updated));
  };
  const handleDeleteCard = (id: string) => {
    const updated = items.filter(i => i.id !== id); setItems(updated);
    localStorage.setItem('custom_web_items', JSON.stringify(updated.filter(i => i.isCustom)));
    localStorage.setItem('all_web_items_ordered', JSON.stringify(updated));
  };

  const handleExport = () => {
    const config = { customItems: JSON.parse(localStorage.getItem('custom_web_items') || '[]'), orderedItems: JSON.parse(localStorage.getItem('all_web_items_ordered') || '[]'), searchHistory: JSON.parse(localStorage.getItem('ai_search_history') || '[]'), density, theme: darkMode ? 'dark' : 'light', exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href = url; a.download = `fashion-nav-config-${new Date().toISOString().slice(0, 10)}.json`; a.click(); URL.revokeObjectURL(url);
  };
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const config = JSON.parse(ev.target?.result as string);
        if (config.customItems) localStorage.setItem('custom_web_items', JSON.stringify(config.customItems));
        if (config.orderedItems) localStorage.setItem('all_web_items_ordered', JSON.stringify(config.orderedItems));
        if (config.searchHistory) localStorage.setItem('ai_search_history', JSON.stringify(config.searchHistory));
        if (config.density) setDensity(config.density);
        if (config.theme) setDarkMode(config.theme === 'dark');
        window.location.reload();
      } catch { alert('导入失败：文件格式不正确'); }
    };
    reader.readAsText(file); e.target.value = '';
  };

  const activeItems: WebItem[] = (() => {
    if (activeCategory === 'fashion') return getFashionWebItems();
    if (activeCategory === 'trend') return getTrendWebItems();
    if (activeCategory === 'pattern') return getPatternWebItems();
    if (activeCategory === 'sewing') return getSewingWebItems();
    if (activeCategory === 'accessory') return getAccessoryWebItems();
    if (activeCategory === 'composition') return getCompositionWebItems();
    if (activeCategory === 'software') return getSoftwareWebItems();
    return getFashionWebItems();
  })();

  const displayItems = activeItems.filter(item => {
    const q = searchQuery.toLowerCase().trim(); if (!q) return true;
    return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.url.toLowerCase().includes(q) || (item.tags && item.tags.some(t => t.toLowerCase().includes(q)));
  });

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-[#fafafa] dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 transition-colors duration-300 flex relative">
      <Sidebar
        activeCategory={activeCategory}
        onSelect={(cat) => { setActiveCategory(cat); setSelectedTool(null); setIsSearchOpen(false); setSearchQuery(''); }}
        darkMode={darkMode}
        onThemeToggle={() => setDarkMode(!darkMode)}
        onSearchClick={() => { setIsSearchOpen(true); setTimeout(() => { searchInputRef.current?.focus(); setIsFocused(true); }, 80); }}
        onAddClick={() => setAddModalOpen(true)}
      />

      <div className="flex-1 flex flex-col overflow-hidden px-2.5 sm:px-4 pt-4 pb-14 md:py-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_0.5px,transparent_0.5px),linear-gradient(to_bottom,#e5e7eb_0.5px,transparent_0.5px)] dark:bg-[linear-gradient(to_right,#1f2937_0.5px,transparent_0.5px),linear-gradient(to_bottom,#1f2937_0.5px,transparent_0.5px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.25] dark:opacity-[0.16]" />
        </div>

        {/* Search drawer */}
        <AnimatePresence>
          {isSearchOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setIsSearchOpen(false)} className="fixed inset-0 z-40 bg-zinc-950/40 dark:bg-black/75 backdrop-blur-md" />
              <motion.div
                initial={{ y: '-100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 26, stiffness: 240 }}
                className="fixed top-0 inset-x-0 z-50 bg-white/95 dark:bg-[#09090b]/95 border-b border-zinc-200 dark:border-zinc-900 shadow-[0_24px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.7)] backdrop-blur-md py-6 px-4 sm:px-6 md:px-8 text-zinc-800 dark:text-zinc-100"
              >
                <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
                  <div className="flex items-center gap-3 py-1.5 border-b border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-400 dark:focus-within:border-zinc-500 transition-all duration-300">
                    <div className="flex items-center gap-2.5 flex-grow min-w-0">
                      <Search className={`w-4 h-4 shrink-0 transition-colors ${isFocused ? 'text-zinc-800 dark:text-zinc-100' : 'text-zinc-400 dark:text-zinc-500'}`} />
                      <input ref={searchInputRef} type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => { setIsFocused(false); if (searchQuery.trim()) saveSearchTerm(searchQuery); }} onKeyDown={(e) => { if (e.key === 'Enter') { saveSearchTerm(searchQuery); searchInputRef.current?.blur(); } }} placeholder="搜索服装品牌、设计趋势、纸样工艺、辅料知识..." className="w-full bg-transparent border-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-0 text-sm font-semibold" />
                      {searchQuery && <button onClick={() => setSearchQuery('')} className="text-[10px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 transition-colors shrink-0">清除</button>}
                    </div>
                    <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 shrink-0 mx-1" />
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => setDarkMode(!darkMode)} className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer" title={darkMode ? '切换亮色模式' : '切换暗黑极客'}>{darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
                      <button onClick={() => setAddModalOpen(true)} className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer" title="添加自定义卡片"><Plus className="w-4.5 h-4.5" /></button>
                      <button onClick={() => setDensity(density === 'compact' ? 'comfortable' : 'compact')} className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer" title={density === 'compact' ? '切换舒适密度' : '切换紧凑密度'}>{density === 'compact' ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}</button>
                      <button onClick={handleExport} className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer" title="导出配置"><Download className="w-4 h-4" /></button>
                      <button onClick={() => fileInputRef.current?.click()} className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer" title="导入配置"><Upload className="w-4 h-4" /></button>
                      <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
                    </div>
                  </div>
                  {searchHistory.length > 0 && (
                    <div className="mt-1 px-1 flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                      <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold tracking-wider uppercase shrink-0 flex items-center gap-1"><History className="w-2.5 h-2.5" /> 搜索历史:</span>
                      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                        {searchHistory.map((term, index) => (
                          <button key={index} onClick={() => setSearchQuery(term)} className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-colors shrink-0 ${searchQuery === term ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-sm' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'}`}>{term}</button>
                        ))}
                      </div>
                      <button onClick={clearSearchHistory} className="text-[9px] text-zinc-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-400 ml-auto shrink-0 transition-colors pl-1">清除历史</button>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content: treemap OR split panel */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex-grow flex flex-col h-full">
          <main className="w-full flex-grow flex-1 min-h-0 relative mb-2" ref={containerRef}>
            <AnimatePresence mode="wait">
              {selectedTool ? (
                <motion.div key="split-panel" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 flex gap-2.5">
                  {/* Left strip */}
                  <div className="w-[140px] sm:w-[200px] shrink-0 overflow-y-auto scrollbar-none space-y-1 pr-1">
                    {displayItems.map((si) => (
                      <button key={si.id} onClick={() => { setSelectedTool(si); setActiveSectionIndex(0); }} className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl transition-all text-left ${selectedTool.id === si.id ? 'bg-zinc-100 dark:bg-zinc-800/80 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700/50' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/50'}`}>
                        <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold bg-gradient-to-tr ${si.logoColor || 'from-zinc-500 to-zinc-700'}`}>{si.logoText || si.name.slice(0, 1)}</div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs font-bold truncate ${selectedTool.id === si.id ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'}`}>{si.name}</div>
                          <div className={`text-[9px] font-mono ${si.cardType === 'link' ? 'text-orange-500' : 'text-cyan-500'}`}>{si.cardType === 'link' ? '质询' : '科普'}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {/* Right content panel */}
                  <div className="flex-1 rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden flex flex-col border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg dark:shadow-black/40">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800/80 shrink-0 bg-zinc-50/50 dark:bg-zinc-900/50">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-gradient-to-tr ${selectedTool.logoColor || 'from-zinc-500 to-zinc-700'}`}>{selectedTool.logoText || selectedTool.name.slice(0, 1)}</div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100 truncate">{selectedTool.name}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono shrink-0 ${selectedTool.cardType === 'link' ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400' : 'bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400'}`}>{selectedTool.cardType === 'link' ? '质询' : '科普'}</span>
                          </div>
                          {selectedTool.tags && selectedTool.tags.length > 0 && (
                            <div className="flex items-center gap-1 mt-0.5 overflow-hidden">{selectedTool.tags.slice(0, 3).map((tag, i) => <span key={i} className="text-[9px] text-zinc-400 dark:text-zinc-500">#{tag}</span>)}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {selectedTool.cardType === 'link' && selectedTool.url && selectedTool.url !== '#' && (
                          <a href={selectedTool.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950/50 transition-colors cursor-pointer"><ExternalLink className="w-3 h-3" />访问</a>
                        )}
                        <button onClick={() => setSelectedTool(null)} className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer" title="关闭"><X className="w-4 h-4" /></button>
                      </div>
                    </div>
                    {selectedTool.cardType === 'knowledge' && selectedTool.knowledgeContent ? (
                      <div className="flex flex-1 overflow-hidden">
                        {/* Chapter nav */}
                        <div className="w-[130px] sm:w-[180px] shrink-0 border-r border-zinc-100 dark:border-zinc-800/80 overflow-y-auto scrollbar-none py-2">
                          {selectedTool.knowledgeContent.map((section, idx) => (
                            <button key={idx} onClick={() => setActiveSectionIndex(idx)} className={`w-full flex items-center gap-2 px-3 py-2.5 text-left transition-all ${activeSectionIndex === idx ? 'bg-cyan-50/50 dark:bg-cyan-950/20 border-l-2 border-cyan-500' : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/50 border-l-2 border-transparent'}`}>
                              <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${activeSectionIndex === idx ? 'bg-cyan-500 text-white' : 'bg-zinc-200/50 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400'}`}>{idx + 1}</span>
                              <span className={`text-xs font-semibold truncate ${activeSectionIndex === idx ? 'text-cyan-700 dark:text-cyan-300' : 'text-zinc-500 dark:text-zinc-400'}`}>{section.heading}</span>
                            </button>
                          ))}
                        </div>
                        {/* Chapter content */}
                        <div className="flex-1 overflow-y-auto scrollbar-none p-4 sm:p-5">
                          <AnimatePresence mode="wait">
                            <motion.div key={activeSectionIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}>
                              {(() => {
                                const s = selectedTool.knowledgeContent![activeSectionIndex];
                                return (
                                  <>
                                    <div className="flex items-center gap-2 mb-3">
                                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs font-bold">{activeSectionIndex + 1}</span>
                                      <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-zinc-100">{s.heading}</h3>
                                    </div>
                                    <div className="rounded-xl p-4 bg-zinc-50/50 dark:bg-zinc-900/30 mb-4"><p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{s.body}</p></div>
                                    {s.tips && s.tips.length > 0 && (
                                      <div className="rounded-xl p-4 bg-cyan-50/30 dark:bg-cyan-950/10 border border-cyan-100/50 dark:border-cyan-900/20">
                                        <h4 className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5 mb-2.5"><Lightbulb className="w-3.5 h-3.5" /> 实用技巧</h4>
                                        <div className="space-y-2">{s.tips.map((tip, i) => <div key={i} className="flex items-start gap-2"><span className="text-cyan-500 text-xs mt-0.5 shrink-0">▸</span><span className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{tip}</span></div>)}</div>
                                      </div>
                                    )}
                                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                                      <button onClick={() => setActiveSectionIndex(Math.max(0, activeSectionIndex - 1))} disabled={activeSectionIndex === 0} className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"><ChevronRight className="w-3 h-3 rotate-180" /> 上一章</button>
                                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">{activeSectionIndex + 1} / {selectedTool.knowledgeContent!.length}</span>
                                      <button onClick={() => setActiveSectionIndex(Math.min(selectedTool.knowledgeContent!.length - 1, activeSectionIndex + 1))} disabled={activeSectionIndex === selectedTool.knowledgeContent!.length - 1} className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">下一章 <ChevronRight className="w-3 h-3" /></button>
                                    </div>
                                  </>
                                );
                              })()}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    ) : (() => {
                      const inquiry = getInquiryDataForItem(selectedTool);
                      return (
                        <div className="flex-1 overflow-y-auto scrollbar-none p-4 sm:p-5 space-y-4">
                          {selectedTool.tags && selectedTool.tags.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap">{selectedTool.tags.map((tag, i) => <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-semibold">{tag}</span>)}</div>
                          )}
                          <div className="rounded-xl p-4 bg-zinc-50/50 dark:bg-zinc-900/30"><p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{selectedTool.description}</p></div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col rounded-xl p-4 bg-zinc-50/50 dark:bg-zinc-900/30 gap-4">
                              {selectedTool.brandInfo && (<div><h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 mb-2"><Info className="w-4 h-4 text-zinc-400" /> <span>品牌简介</span></h3><p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{selectedTool.brandInfo}</p></div>)}
                              {selectedTool.priceRange && (<div><h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 mb-2"><ShoppingBag className="w-4 h-4 text-zinc-400" /> <span>价格区间</span></h3><span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 font-mono">{selectedTool.priceRange}</span></div>)}
                              {inquiry?.recommendation && (<div><h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 mb-2"><Lightbulb className="w-4 h-4 text-amber-500" /> <span>推荐理由</span></h3><p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{inquiry.recommendation}</p></div>)}
                            </div>
                            <div className="flex flex-col rounded-xl p-4 bg-zinc-50/50 dark:bg-zinc-900/30">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 mb-3"><Newspaper className="w-4 h-4 text-zinc-400" /> <span>最近资讯</span></h3>
                              <div className="space-y-2.5 flex-1 overflow-y-auto scrollbar-none">
                                {inquiry && inquiry.news.length > 0 ? inquiry.news.map((n, idx) => (
                                  <div key={idx} className="p-2.5 rounded-lg bg-white/60 dark:bg-zinc-950/20 text-left transition-all duration-200 hover:bg-white dark:hover:bg-zinc-950/40">
                                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100 leading-snug">{n.title}</h4>
                                    <div className="flex items-center gap-2 mt-1.5 text-[9px] font-mono text-zinc-400 dark:text-zinc-500"><span className="font-semibold text-zinc-500 dark:text-zinc-400">{n.source}</span><span>•</span><span>{n.time}</span></div>
                                  </div>
                                )) : <div className="text-xs text-zinc-400 text-center py-6">暂无资讯</div>}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
              ) : displayItems.length > 0 ? (
                <motion.div key={activeCategory} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 w-full h-full" id="treemap-bento-grid">
                  {computeTreemap(displayItems, dimensions.width, dimensions.height).map(({ item, rect }) => {
                    const cardW = (rect.w * dimensions.width) / 100;
                    const cardH = (rect.h * dimensions.height) / 100;
                    const gap = density === 'compact' ? 1.5 : 4;
                    return (
                      <motion.div layout key={item.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} style={{ position: 'absolute', left: `${rect.x}%`, top: `${rect.y}%`, width: `${rect.w}%`, height: `${rect.h}%`, padding: `${gap}px` }}>
                        <Card item={item} cardWidth={cardW - (density === 'compact' ? 3 : 8)} cardHeight={cardH - (density === 'compact' ? 3 : 8)} onDelete={undefined} onDragStart={undefined} onDragOver={undefined} onDragEnd={undefined} isDragging={draggedId === item.id} onClick={(clickedItem) => setSelectedTool(clickedItem)} searchQuery={searchQuery} onSearchChange={setSearchQuery} onSearchClick={() => { setIsSearchOpen(true); setTimeout(() => { searchInputRef.current?.focus(); setIsFocused(true); }, 80); }} onAddClick={() => setAddModalOpen(true)} darkMode={darkMode} onThemeToggle={() => setDarkMode(!darkMode)} density={density} />
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400"><AlertCircle className="w-8 h-8" /></div>
                  <div><h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">未匹配到相关内容</h3><p className="text-xs text-zinc-400 mt-1">请输入其他关键词或标签</p></div>
                  <button onClick={() => setSearchQuery('')} className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">清空搜索重置</button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>

        <AddCardModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddCard} categories={[]} />

        {/* Mobile Bottom Tab Bar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 flex items-center px-1 h-[52px]">
          <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none flex-grow">
            {MOBILE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setSelectedTool(null); setIsSearchOpen(false); setSearchQuery(''); }} className={`flex flex-col items-center justify-center gap-0.5 px-2.5 py-1 rounded-lg shrink-0 transition-all ${isActive ? 'bg-zinc-100 dark:bg-zinc-800/80' : ''}`}>
                  <cat.icon className={`w-4 h-4 ${isActive ? cat.color : 'text-zinc-400 dark:text-zinc-500'}`} />
                  <span className={`text-[9px] font-semibold ${isActive ? 'text-zinc-800 dark:text-zinc-100' : 'text-zinc-400 dark:text-zinc-500'}`}>{cat.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-0.5 shrink-0 pl-1 border-l border-zinc-200 dark:border-zinc-800 ml-1">
            <button onClick={() => { setIsSearchOpen(true); setTimeout(() => { searchInputRef.current?.focus(); setIsFocused(true); }, 80); }} className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer" title="搜索"><Search className="w-4 h-4" /></button>
            <button onClick={() => setAddModalOpen(true)} className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer" title="添加"><Plus className="w-4 h-4" /></button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer" title={darkMode ? '切换亮色' : '切换暗黑'}>{darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
          </div>
        </nav>
      </div>
    </div>
  );
}
