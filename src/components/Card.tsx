import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles, MessageSquareText, Cpu, Palette, Image, Github,
  Camera, Paintbrush, FileText, Kanban, BookOpen, Dribbble,
  Compass, Component, Blocks, Trash2, Globe, GripVertical,
  Music, Video, Zap, Film, Users, Bot, Mic, Activity,
  Search, Plus, Sun, Moon, BookText,
  ExternalLink, Newspaper, ChevronRight
} from 'lucide-react';
import { WebItem } from '../types';
import { getInquiryDataForItem } from '../data';

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
  onSearchClick?: () => void;
  onAddClick?: () => void;
  darkMode?: boolean;
  density?: 'compact' | 'comfortable';
  onThemeToggle?: () => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles, MessageSquareText, Cpu, Palette, Image, Github,
  Camera, Paintbrush, FileText, Kanban, BookOpen, Dribbble,
  Compass, Component, Blocks, Globe, Music, Video, Zap,
  Film, Users, Bot, Mic
};

export default function Card({
  item, cardWidth, cardHeight,
  onDelete, onDragStart, onDragOver, onDragEnd, isDragging,
  onClick, darkMode, onThemeToggle, density
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);

  // Logo loading states - cached via localStorage
  const [logoState, setLogoState] = useState<'clearbit' | 'google' | 'fallback'>('clearbit');
  const [domain, setDomain] = useState('');

  useEffect(() => {
    let hostname = '';
    try {
      hostname = new URL(item.url).hostname.replace('www.', '');
      setDomain(hostname);
    } catch (e) {
      setDomain('');
      setLogoState('fallback');
      return;
    }

    // Check localStorage cache first to avoid re-fetching on refresh
    if (hostname) {
      const cached = localStorage.getItem(`logo_cache_${hostname}`);
      if (cached === 'google' || cached === 'fallback') {
        setLogoState(cached);
      } else {
        setLogoState('clearbit');
      }
    }
  }, [item.url]);

  // Persist logo state to cache when it changes
  useEffect(() => {
    if (domain && (logoState === 'google' || logoState === 'fallback')) {
      localStorage.setItem(`logo_cache_${domain}`, logoState);
    }
  }, [logoState, domain]);

  const getPricingTag = () => {
    switch (item.isFree) {
      case 'free':
        return { label: '免费', classes: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-700/40' };
      case 'paid':
        return { label: '付费', classes: 'bg-rose-50 dark:bg-rose-950/30 text-rose-500 dark:text-rose-400 border border-rose-100 dark:border-rose-950/40' };
      case 'freemium':
        return { label: '混合', classes: 'bg-amber-50 dark:bg-amber-950/30 text-amber-500 dark:text-amber-400 border border-amber-100 dark:border-amber-950/40' };
      default:
        return { label: '免费', classes: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-700/40' };
    }
  };

  const pricing = getPricingTag();
  const IconComponent = item.iconName ? iconMap[item.iconName] || Globe : Globe;
  const isKnowledge = item.cardType === 'knowledge';

  // Get inquiry news for link cards
  const inquiryData = !isKnowledge ? getInquiryDataForItem(item) : null;
  const cardNews = inquiryData?.news || [];

  // Precision fluid scaling logic
  const minDimension = Math.min(cardWidth, cardHeight);
  const paddingPx = Math.max(5, Math.min(14, minDimension * 0.055)) * (density === 'compact' ? 0.82 : 1);
  const titleSizePx = Math.max(9, Math.min(18, minDimension * 0.075));
  const descSizePx = Math.max(8, Math.min(11.5, minDimension * 0.048));
  const logoSizePx = Math.max(16, Math.min(36, minDimension * 0.15));

  const showDesc = cardHeight > 75;
  const showTags = cardHeight > 120 && cardWidth > 120;
  const showPriceTag = cardHeight > 80 && cardWidth > 110;

  // Handle Logo Src fallback
  const getLogoSrc = () => {
    if (!domain) return '';
    if (logoState === 'clearbit') return `https://logo.clearbit.com/${domain}`;
    if (logoState === 'google') return `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
    return '';
  };

  const handleLogoError = () => {
    if (logoState === 'clearbit') setLogoState('google');
    else if (logoState === 'google') setLogoState('fallback');
  };

  const hasLoadedLogoImage = logoState !== 'fallback' && domain;

  // Adapt tags list
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
      if (onClick) onClick(item);
    }
    dragStartPos.current = null;
  };

  // Knowledge course outline sections
  const courseSections = isKnowledge && item.knowledgeContent ? item.knowledgeContent : [];
  const maxSections = cardHeight > 180 ? 4 : cardHeight > 120 ? 3 : 2;
  const maxNews = cardHeight > 160 ? 2 : 1;

  return (
    <div className="relative group h-full select-none" style={{ perspective: '1000px' }}>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        draggable={true}
        onDragStart={(e: any) => {
          if (onDragStart) onDragStart(item.id);
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', item.id);
        }}
        onDragOver={(e: any) => {
          if (onDragOver) { e.preventDefault(); onDragOver(item.id); }
        }}
        onDragEnd={() => { if (onDragEnd) onDragEnd(); }}
        whileHover={{ scale: 1.04, y: -4, zIndex: 40, marginLeft: "3px", marginRight: "3px", marginTop: "-3px", marginBottom: "3px" }}
        transition={{ type: 'spring', stiffness: 350, damping: 15, layout: { duration: 0.25, type: 'spring' } }}
        className={`relative flex flex-col justify-between h-full rounded-xl transition-all duration-300 cursor-pointer border ${
          isDragging
            ? 'bg-zinc-200/10 dark:bg-zinc-800/10 opacity-30 scale-[0.98] border-zinc-200/40 dark:border-zinc-800/40'
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
        {/* Top Row: Logo & Title */}
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-1.5 overflow-hidden flex-grow min-w-0">
            {/* Brand Logo */}
            <div
              className={`flex-shrink-0 rounded-lg flex items-center justify-center text-white font-bold bg-gradient-to-tr shadow-sm overflow-hidden ${item.logoColor || 'from-zinc-500 to-zinc-700'}`}
              style={{ width: `${logoSizePx}px`, height: `${logoSizePx}px`, fontSize: `${logoSizePx * 0.45}px` }}
            >
              {hasLoadedLogoImage ? (
                <img
                  src={getLogoSrc()}
                  alt={item.name}
                  className="w-full h-full object-contain p-0.5 bg-white"
                  onError={handleLogoError}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center font-bold">
                  {item.logoText ? item.logoText : <IconComponent style={{ width: '50%', height: '50%' }} />}
                </div>
              )}
            </div>

            <div className="overflow-hidden min-w-0 flex-grow">
              <h3 className="tracking-tight font-extrabold truncate flex items-center gap-1" style={{ fontSize: `${titleSizePx}px`, lineHeight: 1.1 }}>
                {isKnowledge ? (
                  <span className="text-zinc-900 dark:text-zinc-100">{item.name}</span>
                ) : (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onClick={(e) => e.stopPropagation()}
                    className="text-zinc-900 dark:text-zinc-100 hover:underline hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                  >
                    {item.name}
                  </a>
                )}
              </h3>
              {cardHeight > 85 && domain && !isKnowledge && (
                <span className="text-zinc-400 dark:text-zinc-500 font-mono tracking-wide truncate block mt-0.5" style={{ fontSize: `${Math.max(7, titleSizePx * 0.6)}px` }}>
                  {domain}
                </span>
              )}
              {cardHeight > 85 && isKnowledge && (
                <span className="text-cyan-500 dark:text-cyan-400 font-mono tracking-wide truncate block mt-0.5 flex items-center gap-0.5" style={{ fontSize: `${Math.max(7, titleSizePx * 0.55)}px` }}>
                  <BookText className="w-2.5 h-2.5" />
                  {item.level ? `${item.level}课程` : '科普知识'}
                </span>
              )}
            </div>
          </div>

          {/* Pricing Tag */}
          <div className="flex items-center gap-1 shrink-0 ml-1">
            {showPriceTag && (
              <span className={`rounded-full font-bold uppercase tracking-wider ${pricing.classes}`} style={{ fontSize: `${Math.max(7, titleSizePx * 0.5)}px`, padding: '1px 5px' }}>
                {pricing.label}
              </span>
            )}
          </div>
        </div>

        {/* ===== Middle Row: Content ===== */}
        {/* Link cards: Show latest news */}
        {showDesc && !isKnowledge && cardNews.length > 0 && (
          <div className="flex flex-col gap-1 text-left flex-grow overflow-hidden select-none mt-1.5" style={{ minHeight: '28px' }}>
            {cardNews.slice(0, maxNews).map((news, idx) => (
              <div key={idx} className="flex items-start gap-1 p-1.5 rounded-md bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-100/60 dark:border-zinc-800/60">
                <Newspaper className="w-2.5 h-2.5 text-orange-400 dark:text-orange-500 mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="text-zinc-600 dark:text-zinc-300 font-medium leading-snug line-clamp-2" style={{ fontSize: `${Math.max(8, descSizePx * 0.85)}px` }}>
                    {news.title}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5" style={{ fontSize: `${Math.max(7, descSizePx * 0.7)}px` }}>
                    <span className="text-zinc-400 dark:text-zinc-500 font-mono font-semibold">{news.source}</span>
                    <span className="text-zinc-300 dark:text-zinc-600">·</span>
                    <span className="text-zinc-400 dark:text-zinc-500 font-mono">{news.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Link cards: Fallback description if no news */}
        {showDesc && !isKnowledge && cardNews.length === 0 && (
          <div className="flex flex-col gap-1 text-left flex-grow overflow-hidden select-none mt-1.5" style={{ minHeight: '28px' }}>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3" style={{ fontSize: `${Math.max(8, descSizePx * 0.85)}px` }}>
              {item.description}
            </p>
          </div>
        )}

        {/* Knowledge cards: Show course outline (从浅入深) */}
        {showDesc && isKnowledge && courseSections.length > 0 && (
          <div className="flex flex-col gap-0.5 text-left flex-grow overflow-hidden select-none mt-1.5" style={{ minHeight: '28px' }}>
            {courseSections.slice(0, maxSections).map((section, idx) => (
              <div key={idx} className="flex items-center gap-1.5 py-0.5">
                <span
                  className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  style={{
                    fontSize: `${Math.max(7, descSizePx * 0.65)}px`,
                    background: idx === 0 ? 'rgb(34 211 238 / 0.15)' : idx === courseSections.length - 1 ? 'rgb(168 85 247 / 0.15)' : 'rgb(161 161 170 / 0.15)',
                    color: idx === 0 ? '#06b6d4' : idx === courseSections.length - 1 ? '#a855f7' : '#71717a'
                  }}
                >
                  {idx + 1}
                </span>
                <span className="text-zinc-600 dark:text-zinc-300 font-medium truncate flex-1" style={{ fontSize: `${Math.max(8, descSizePx * 0.82)}px` }}>
                  {section.heading}
                </span>
                {idx < courseSections.length - 1 && idx < maxSections - 1 && (
                  <ChevronRight className="w-2.5 h-2.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                )}
              </div>
            ))}
            {courseSections.length > maxSections && (
              <div className="text-zinc-400 dark:text-zinc-600 italic mt-0.5" style={{ fontSize: `${Math.max(7, descSizePx * 0.7)}px` }}>
                ...共 {courseSections.length} 章节
              </div>
            )}
          </div>
        )}

        {/* Tag Badges Row */}
        {showTags && visibleTags.length > 0 && (
          <div className="flex items-center gap-1 my-0.5 overflow-hidden w-full">
            <div className="flex flex-wrap gap-1 overflow-hidden">
              {visibleTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded bg-zinc-200/50 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 border border-transparent font-semibold uppercase tracking-wide shrink-0"
                  style={{ fontSize: `${Math.max(7, descSizePx * 0.7)}px`, padding: '1px 4px' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ===== Bottom Bar ===== */}
        <div className="border-t border-zinc-200/40 dark:border-zinc-800/40 pt-1 mt-auto flex items-center justify-between gap-1">
          {!isKnowledge ? (
            <>
              <div className="flex items-center gap-0.5 text-zinc-400 dark:text-zinc-500" style={{ fontSize: `${Math.max(7, titleSizePx * 0.5)}px` }}>
                <ExternalLink className="w-2.5 h-2.5" />
                <span className="font-mono font-semibold">点击查看详情</span>
              </div>
              {item.priceRange && (
                <span className="text-zinc-400 dark:text-zinc-500 font-mono truncate" style={{ fontSize: `${Math.max(7, titleSizePx * 0.48)}px` }}>
                  {item.priceRange}
                </span>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-1 text-cyan-500 dark:text-cyan-400" style={{ fontSize: `${Math.max(7, titleSizePx * 0.5)}px` }}>
                <BookOpen className="w-2.5 h-2.5" />
                <span className="font-semibold">{courseSections.length} 章节</span>
                {item.level && (
                  <span className="text-zinc-400 dark:text-zinc-500 font-mono ml-1">· {item.level}</span>
                )}
              </div>
              <ChevronRight className="w-3 h-3 text-zinc-300 dark:text-zinc-600" />
            </>
          )}
        </div>

        {/* Custom actions */}
        {item.isCustom && onDelete && (
          <div className="absolute bottom-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(item.id); }}
              className="p-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-red-500 rounded-md shadow-sm transition-colors cursor-pointer"
              title="删除卡片"
            >
              <Trash2 style={{ width: `${Math.max(10, titleSizePx * 0.7)}px`, height: `${Math.max(10, titleSizePx * 0.7)}px` }} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
