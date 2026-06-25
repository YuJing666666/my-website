import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, MessageSquareText, Cpu, Palette, Image, Github, 
  Camera, Paintbrush, FileText, Kanban, BookOpen, Dribbble, 
  Compass, Component, Blocks, Trash2, Globe, GripVertical,
  Music, Video, Zap, Film, Users, Bot, Mic, Activity,
  Search, Plus, RefreshCw, Sun, Moon
} from 'lucide-react';
import { WebItem } from '../types';
import { getModelsForItem } from '../data';

interface CardProps {
  item: WebItem;
  cardWidth: number;
  cardHeight: number;
  onDelete?: (id: string) => void;
  onDragStart?: (id: string) => void;
  onDragOver?: (id: string) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
  onClick?: (item: WebItem) => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  onAddClick?: () => void;
  onResetClick?: () => void;
  darkMode?: boolean;
  onThemeToggle?: () => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles,
  MessageSquareText,
  Cpu,
  Palette,
  Image,
  Github,
  Camera,
  Paintbrush,
  FileText,
  Kanban,
  BookOpen,
  Dribbble,
  Compass,
  Component,
  Blocks,
  Globe,
  Music,
  Video,
  Zap,
  Film,
  Users,
  Bot,
  Mic
};

export default function Card({ 
  item, 
  cardWidth,
  cardHeight,
  onDelete, 
  onDragStart, 
  onDragOver, 
  onDragEnd, 
  isDragging,
  onClick,
  searchQuery,
  onSearchChange,
  onAddClick,
  onResetClick,
  darkMode,
  onThemeToggle
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);

  // Logo loading states
  const [logoState, setLogoState] = useState<'clearbit' | 'google' | 'fallback'>('clearbit');
  const [domain, setDomain] = useState('');

  // Simulated latency bar data
  const [currentPing, setCurrentPing] = useState(25);

  useEffect(() => {
    try {
      const hostname = new URL(item.url).hostname.replace('www.', '');
      setDomain(hostname);
      setLogoState('clearbit');
    } catch (e) {
      setDomain('');
      setLogoState('fallback');
    }

    // Dynamic ping logic with a realistic domestic direct host latency distribution
    const charSum = item.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // basePing spread from 15ms to 135ms to cover green (<40), yellow (40-99), and red (>=100)
    const basePing = 15 + (charSum % 120); 
    setCurrentPing(basePing);

    const interval = setInterval(() => {
      const fluctuation = Math.floor(Math.random() * 9) - 4; // -4 to +4
      setCurrentPing(Math.max(5, basePing + fluctuation));
    }, 4500);

    return () => clearInterval(interval);
  }, [item.url, item.name]);

  const getPricingTag = () => {
    switch (item.isFree) {
      case 'free':
        return {
          label: '免费',
          classes: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-700/40'
        };
      case 'paid':
        return {
          label: '付费',
          classes: 'bg-rose-50 dark:bg-rose-950/30 text-rose-500 dark:text-rose-400 border border-rose-100 dark:border-rose-950/40'
        };
      case 'freemium':
        return {
          label: '混合',
          classes: 'bg-amber-50 dark:bg-amber-950/30 text-amber-500 dark:text-amber-400 border border-amber-100 dark:border-amber-950/40'
        };
      default:
        return {
          label: '免费',
          classes: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-700/40'
        };
    }
  };

  const pricing = getPricingTag();
  const IconComponent = item.iconName ? iconMap[item.iconName] || Globe : Globe;

  // Precision fluid scaling logic based on actual bounding rectangle dimensions
  const minDimension = Math.min(cardWidth, cardHeight);

  // Pad scales smoothly from 6px to 14px
  const paddingPx = Math.max(5, Math.min(14, minDimension * 0.055));
  
  // Title text size scales smoothly from 9px to 18px
  const titleSizePx = Math.max(9, Math.min(18, minDimension * 0.075));
  
  // Description text size scales smoothly from 8px to 11.5px
  const descSizePx = Math.max(8, Math.min(11.5, minDimension * 0.048));
  
  // Logo size scales smoothly from 16px to 40px
  const logoSizePx = Math.max(16, Math.min(40, minDimension * 0.16));

  // Determine visibility of extra UI controls dynamically
  const showDesc = cardHeight > 75;
  const showTags = cardHeight > 130 && cardWidth > 130;
  const showPriceTag = cardHeight > 80 && cardWidth > 110;
  const showLatencyText = cardHeight > 75 && cardWidth > 130;
  const showGripHandle = cardHeight > 75 && cardWidth > 100;

  // Dynamic high-density segment colors (Amber < 40ms, Emerald 40-100ms, Red >= 100ms) plus checkered grid
  const segmentCount = Math.max(16, Math.min(64, Math.floor(cardWidth / 4.5)));
  const activeRatio = Math.min(1, Math.max(0.12, currentPing / 150));
  const activeCount = Math.ceil(segmentCount * activeRatio);
  const latencySegments: { bgClass: string; title: string }[] = [];
  
  for (let i = 0; i < segmentCount; i++) {
    if (i < activeCount) {
      let bgClass = '';
      if (currentPing < 40) {
        bgClass = 'bg-amber-400 dark:bg-amber-400 shadow-[0_0_4px_rgba(245,158,11,0.5)]';
      } else if (currentPing < 100) {
        bgClass = 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_4px_rgba(16,185,129,0.5)]';
      } else {
        bgClass = 'bg-rose-500 dark:bg-rose-400 shadow-[0_0_4px_rgba(244,63,94,0.5)]';
      }
      latencySegments.push({ bgClass, title: `当前延迟: ${currentPing}ms` });
    } else {
      // Checkered "black, white, gray" grid
      let bgClass = '';
      if (i % 3 === 0) {
        bgClass = 'bg-zinc-900 dark:bg-zinc-950'; // Blackish
      } else if (i % 3 === 1) {
        bgClass = 'bg-zinc-200 dark:bg-zinc-200'; // Whitish
      } else {
        bgClass = 'bg-zinc-400 dark:bg-zinc-600'; // Greyish
      }
      latencySegments.push({ bgClass, title: '未激活通道' });
    }
  }

  // Handle Logo Src fallback
  const getLogoSrc = () => {
    if (!domain) return '';
    if (logoState === 'clearbit') {
      return `https://logo.clearbit.com/${domain}`;
    }
    if (logoState === 'google') {
      return `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
    }
    return '';
  };

  const handleLogoError = () => {
    if (logoState === 'clearbit') {
      setLogoState('google');
    } else if (logoState === 'google') {
      setLogoState('fallback');
    }
  };

  const hasLoadedLogoImage = logoState !== 'fallback' && domain;

  // Adapt tags list length based on height
  const getVisibleTags = () => {
    const rawTags = item.tags || [];
    if (cardHeight > 200) return rawTags.slice(0, 3);
    if (cardHeight > 150) return rawTags.slice(0, 2);
    return rawTags.slice(0, 1);
  };

  const visibleTags = showTags ? getVisibleTags() : [];

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!dragStartPos.current) return;
    const dx = Math.abs(e.clientX - dragStartPos.current.x);
    const dy = Math.abs(e.clientY - dragStartPos.current.y);
    if (dx < 5 && dy < 5) {
      if (onClick) {
        onClick(item);
      }
    }
    dragStartPos.current = null;
  };

  const isHighLatency = currentPing >= 100;

  if (item.id === 'control-center') {
    const size = Math.min(cardWidth, cardHeight) - 4;
    return (
      <div className="relative w-full h-full flex items-center justify-center select-none p-0.5">
        <div 
          className="grid grid-cols-2 grid-rows-2 gap-2"
          style={{ width: size > 40 ? size : '100%', height: size > 40 ? size : '100%' }}
        >
          {/* Cell 1: Search */}
          <div className="flex flex-col items-center justify-center rounded-md bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm p-1 min-w-0 min-h-0 relative group/search hover:border-indigo-300 dark:hover:border-indigo-900 transition-colors">
            <Search className="w-5 h-5 text-indigo-500" />
            <input
              type="text"
              value={searchQuery || ''}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="搜索"
              className={`absolute inset-0 w-full h-full bg-white dark:bg-zinc-900 border-none text-center text-xs focus:outline-none focus:ring-0 p-1 text-zinc-800 dark:text-zinc-200 font-bold transition-opacity rounded-md ${
                searchQuery ? 'opacity-100' : 'opacity-0 focus:opacity-100'
              }`}
              title="搜索..."
            />
          </div>

          {/* Cell 2: Add */}
          <button
            onClick={(e) => { e.stopPropagation(); onAddClick?.(); }}
            className="flex items-center justify-center rounded-md bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:border-emerald-300 dark:hover:border-emerald-900 hover:scale-[1.03] active:scale-95 transition-all cursor-pointer min-w-0 min-h-0 text-emerald-500"
            title="添加卡片"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Cell 3: Reset */}
          <button
            onClick={(e) => { e.stopPropagation(); onResetClick?.(); }}
            className="flex items-center justify-center rounded-md bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:border-rose-300 dark:hover:border-rose-900 hover:scale-[1.03] active:scale-95 transition-all cursor-pointer min-w-0 min-h-0 text-rose-500"
            title="重置布局"
          >
            <RefreshCw className="w-4.5 h-4.5" />
          </button>

          {/* Cell 4: Theme Toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); onThemeToggle?.(); }}
            className="flex items-center justify-center rounded-md bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:border-amber-300 dark:hover:border-amber-900 hover:scale-[1.03] active:scale-95 transition-all cursor-pointer min-w-0 min-h-0"
            title="切换主题"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-500" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group h-full select-none" style={{ perspective: '1000px' }}>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        draggable={true}
        onDragStart={(e) => {
          if (onDragStart) onDragStart(item.id);
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', item.id);
        }}
        onDragOver={(e) => {
          if (onDragOver) {
            e.preventDefault();
            onDragOver(item.id);
          }
        }}
        onDragEnd={() => {
          if (onDragEnd) onDragEnd();
        }}
        whileHover={{
          scale: 1.05,
          y: -5,
          zIndex: 40,
          marginLeft: "3px",
          marginRight: "3px",
          marginTop: "-3px",
          marginBottom: "3px"
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 350, 
          damping: 15,
          layout: { duration: 0.25, type: 'spring' }
        }}
        className={`relative flex flex-col justify-between h-full rounded-xl transition-all duration-300 cursor-pointer border ${
          isDragging 
            ? 'bg-zinc-200/10 dark:bg-zinc-800/10 opacity-30 scale-[0.98] border-zinc-200/40 dark:border-zinc-800/40' 
            : isHighLatency
              ? isHovered
                ? 'bg-zinc-200/95 dark:bg-black shadow-xl dark:shadow-black/80 border-zinc-400 dark:border-zinc-600'
                : 'bg-zinc-100/95 dark:bg-zinc-950/95 shadow-sm dark:shadow-black/40 border-zinc-300/80 dark:border-zinc-800/90'
              : isHovered 
                ? 'bg-zinc-50 dark:bg-zinc-800/90 shadow-xl dark:shadow-black/70 border-zinc-300 dark:border-zinc-700/60'
                : 'bg-white dark:bg-zinc-900/75 shadow-sm dark:shadow-black/20 border-zinc-200/80 dark:border-zinc-800/40'
        }`}
        style={{ 
          outline: 'none',
          padding: `${paddingPx}px`,
          boxShadow: isHovered 
            ? '0 16px 36px -4px rgba(0,0,0,0.08), 0 6px 16px -2px rgba(0,0,0,0.04)' 
            : '0 4px 12px -1px rgba(0,0,0,0.02), 0 1px 4px -1px rgba(0,0,0,0.01)'
        }}
      >
          {/* Top Row: Logo & Tool Identity */}
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-1.5 overflow-hidden flex-grow min-w-0">
              
              {/* Brand Logo construct */}
              <div 
                className={`flex-shrink-0 rounded-lg flex items-center justify-center text-white font-bold bg-gradient-to-tr shadow-sm overflow-hidden ${item.logoColor || 'from-zinc-500 to-zinc-700'}`}
                style={{
                  width: `${logoSizePx}px`,
                  height: `${logoSizePx}px`,
                  fontSize: `${logoSizePx * 0.45}px`
                }}
              >
                {hasLoadedLogoImage ? (
                  <img 
                    src={getLogoSrc()} 
                    alt={item.name} 
                    className="w-full h-full object-contain p-0.5 bg-white"
                    onError={handleLogoError}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex items-center justify-center font-bold">
                    {item.logoText ? item.logoText : <IconComponent style={{ width: '50%', height: '50%' }} />}
                  </div>
                )}
              </div>
              
              <div className="overflow-hidden min-w-0 flex-grow">
                <h3 
                  className="tracking-tight font-extrabold truncate flex items-center gap-1"
                  style={{ fontSize: `${titleSizePx}px`, lineHeight: 1.1 }}
                >
                  <a 
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="text-zinc-900 dark:text-zinc-100 hover:underline hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                  >
                    {item.name}
                  </a>
                </h3>
                {cardHeight > 90 && domain && (
                  <span 
                    className="text-zinc-400 dark:text-zinc-500 font-mono tracking-wide truncate block mt-0.5"
                    style={{ fontSize: `${Math.max(7, titleSizePx * 0.65)}px` }}
                  >
                    {domain}
                  </span>
                )}
              </div>
            </div>

            {/* Pricing Tag & Drag Handle */}
            <div className="flex items-center gap-1 shrink-0 ml-1">
              {showPriceTag && (
                <span 
                  className={`rounded-full font-bold uppercase tracking-wider ${pricing.classes}`}
                  style={{ 
                    fontSize: `${Math.max(7, titleSizePx * 0.55)}px`,
                    padding: '1px 5px'
                  }}
                >
                  {pricing.label}
                </span>
              )}

              {showGripHandle && (
                /* Minimalist drag handle */
                <div
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setIsDraggable(true);
                  }}
                  onMouseUp={(e) => {
                    e.stopPropagation();
                    setIsDraggable(false);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="p-0.5 text-zinc-300 hover:text-zinc-500 dark:text-zinc-600 dark:hover:text-zinc-400 rounded cursor-grab active:cursor-grabbing transition-colors"
                  title="拖拽排序"
                >
                  <GripVertical style={{ width: `${Math.max(10, titleSizePx * 0.8)}px`, height: `${Math.max(10, titleSizePx * 0.8)}px` }} />
                </div>
              )}
            </div>
          </div>

          {/* Middle Row: Model List */}
          {showDesc && (
            <div 
              className="flex flex-col gap-1 text-left flex-grow overflow-hidden select-none mt-1.5"
              style={{ minHeight: '30px' }}
            >
              {(() => {
                const allModels = getModelsForItem(item);
                // Calculate how many rows of models can fit dynamically
                const availableHeight = cardHeight - paddingPx * 2 - (showTags ? 30 : 0) - 45;
                const maxRows = Math.max(1, Math.floor(availableHeight / 18));
                const modelsToDisplay = allModels.slice(0, maxRows);
                const hasMore = allModels.length > maxRows;

                return (
                  <>
                    {modelsToDisplay.map((model, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between gap-1 text-zinc-500 dark:text-zinc-400 font-mono overflow-hidden truncate whitespace-nowrap"
                        style={{ fontSize: `${Math.max(8, descSizePx * 0.95)}px`, height: '16px' }}
                      >
                        <div className="flex items-center gap-1.5 min-w-0 overflow-hidden truncate">
                          <span className="text-zinc-400 dark:text-zinc-500 shrink-0 font-medium">
                            {model.releaseDate}
                          </span>
                          <span className="text-zinc-800 dark:text-zinc-200 font-bold truncate">
                            {model.name}
                          </span>
                        </div>
                        <span 
                          className="px-1 py-[1px] rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 shrink-0 font-sans font-medium"
                          style={{ fontSize: `${Math.max(7, descSizePx * 0.8)}px` }}
                        >
                          {model.useCase}
                        </span>
                      </div>
                    ))}
                    {hasMore && (
                      <div 
                        className="text-zinc-400 dark:text-zinc-500 font-medium italic select-none"
                        style={{ fontSize: `${Math.max(7, descSizePx * 0.8)}px` }}
                      >
                        ... 还有 {allModels.length - maxRows} 个模型
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}

          {/* Tag Badges & Token Price Row */}
          {showTags && (visibleTags.length > 0 || item.tokenPrice) && (
            <div className="flex items-center justify-between gap-1.5 my-1 overflow-hidden w-full">
              {visibleTags.length > 0 && (
                <div className="flex flex-wrap gap-1 overflow-hidden">
                  {visibleTags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="rounded bg-zinc-200/50 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 border border-transparent font-semibold uppercase tracking-wide shrink-0"
                      style={{ 
                        fontSize: `${Math.max(7, descSizePx * 0.75)}px`,
                        padding: '1px 4px'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              {item.tokenPrice && (
                <span 
                  className="text-zinc-400 dark:text-zinc-500 font-mono font-medium truncate shrink-0 ml-auto"
                  style={{ fontSize: `${Math.max(7.5, descSizePx * 0.75)}px` }}
                  title="模型 API 费用 (输入 / 输出)"
                >
                  {item.tokenPrice}
                </span>
              )}
            </div>
          )}

          {/* Latency Segment Energy Bar */}
          <div className="border-t border-zinc-200/40 dark:border-zinc-800/40 pt-1 mt-auto">
            <div className="flex items-center justify-between gap-1">
              {/* Colorful High-density Latency Bar */}
              <div className="flex items-center gap-[1px] flex-grow">
                {latencySegments.map((seg, idx) => (
                  <div 
                    key={idx} 
                    className={`rounded-[0.5px] transition-all duration-300 ${seg.bgClass} opacity-95`}
                    style={{
                      height: `${Math.max(3, cardHeight * 0.03)}px`,
                      flexGrow: 1
                    }}
                    title={seg.title}
                  />
                ))}
              </div>

              {/* Ping metric numerical readouts */}
              {showLatencyText && (
                <div 
                  className={`flex items-center gap-0.5 shrink-0 font-mono font-bold ${
                    currentPing < 40 
                      ? 'text-amber-500 dark:text-amber-400' 
                      : currentPing < 100 
                        ? 'text-emerald-500 dark:text-emerald-400' 
                        : 'text-rose-500 dark:text-rose-400'
                  }`}
                  style={{ fontSize: `${Math.max(7, titleSizePx * 0.65)}px` }}
                >
                  <Activity style={{ width: `${Math.max(8, titleSizePx * 0.7)}px`, height: `${Math.max(8, titleSizePx * 0.7)}px` }} />
                  <span>{currentPing}ms</span>
                </div>
              )}
            </div>
          </div>

        {/* Custom actions */}
        {item.isCustom && onDelete && (
          <div className="absolute bottom-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(item.id);
              }}
              className="p-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-red-500 rounded-md shadow-sm transition-colors cursor-pointer"
              title="删除卡片"
              id={`delete-btn-${item.id}`}
            >
              <Trash2 style={{ width: `${Math.max(10, titleSizePx * 0.8)}px`, height: `${Math.max(10, titleSizePx * 0.8)}px` }} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
