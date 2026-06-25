import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, MessageSquareText, Cpu, Palette, Image, Github, 
  Camera, Paintbrush, FileText, Kanban, BookOpen, Dribbble, 
  Compass, Component, Blocks, Trash2, Globe, GripVertical,
  Music, Video, Zap, Film, Users, Bot, Mic, Activity
} from 'lucide-react';
import { WebItem } from '../types';

interface CardProps {
  item: WebItem;
  cardWidth: number;
  cardHeight: number;
  onDelete?: (id: string) => void;
  onDragStart?: (id: string) => void;
  onDragOver?: (id: string) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
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
  isDragging 
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);

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
          classes: 'bg-zinc-200/50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
        };
      case 'paid':
        return {
          label: '付费',
          classes: 'bg-zinc-200/50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
        };
      case 'freemium':
        return {
          label: '混合',
          classes: 'bg-zinc-200/50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
        };
      default:
        return {
          label: '免费',
          classes: 'bg-zinc-200/50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
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

  return (
    <div className="relative group h-full select-none" style={{ perspective: '1000px' }}>
      <a 
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full no-underline"
        id={`card-link-${item.id}`}
      >
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          draggable={isDraggable}
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
            setIsDraggable(false);
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
                  className="text-zinc-900 dark:text-zinc-100 tracking-tight font-extrabold truncate flex items-center gap-1"
                  style={{ fontSize: `${titleSizePx}px`, lineHeight: 1.1 }}
                >
                  {item.name}
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

          {/* Middle Row: Description */}
          {showDesc && (
            <p 
              className="text-zinc-500 dark:text-zinc-400 leading-normal text-left overflow-hidden flex-grow select-none mt-1"
              style={{ 
                fontSize: `${descSizePx}px`,
                lineHeight: 1.25,
                display: '-webkit-box',
                WebkitLineClamp: cardHeight > 160 ? 5 : cardHeight > 120 ? 3 : cardHeight > 95 ? 2 : 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {item.description}
            </p>
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
      </a>
    </div>
  );
}
