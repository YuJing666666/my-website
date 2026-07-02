import { motion } from 'motion/react';
import {
  Search, Plus, Sun, Moon,
  Shirt, TrendingUp, Scissors, PenTool, Zap, LayoutGrid, Monitor
} from 'lucide-react';
import { CategoryType } from '../types';

interface SidebarProps {
  activeCategory: CategoryType;
  onSelect: (cat: CategoryType) => void;
  darkMode: boolean;
  onThemeToggle: () => void;
  onSearchClick: () => void;
  onAddClick: () => void;
}

const CATEGORIES: { id: CategoryType; label: string; icon: typeof Shirt; color: string }[] = [
  { id: 'fashion', label: '服装品牌', icon: Shirt, color: 'text-pink-500' },
  { id: 'trend', label: '设计趋势', icon: TrendingUp, color: 'text-orange-500' },
  { id: 'pattern', label: '纸样制版', icon: Scissors, color: 'text-cyan-500' },
  { id: 'sewing', label: '缝纫工艺', icon: PenTool, color: 'text-emerald-500' },
  { id: 'accessory', label: '辅料工艺', icon: Zap, color: 'text-amber-500' },
  { id: 'composition', label: '设计构成', icon: LayoutGrid, color: 'text-violet-500' },
  { id: 'software', label: '设计软件', icon: Monitor, color: 'text-sky-500' },
];

const colorMap: Record<string, string> = {
  'text-pink-500': '#ec4899',
  'text-orange-500': '#f97316',
  'text-cyan-500': '#06b6d4',
  'text-emerald-500': '#10b981',
  'text-amber-500': '#f59e0b',
  'text-violet-500': '#8b5cf6',
  'text-sky-500': '#0ea5e9',
};

export default function Sidebar({ activeCategory, onSelect, darkMode, onThemeToggle, onSearchClick, onAddClick }: SidebarProps) {
  return (
    <aside className="w-[68px] sm:w-[76px] shrink-0 border-r border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md flex flex-col items-center py-3 z-20 relative overflow-y-auto scrollbar-none">
      {/* Category Buttons */}
      <nav className="flex flex-col gap-1.5 flex-grow">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`relative flex flex-col items-center justify-center gap-1 w-[56px] sm:w-[64px] py-2.5 rounded-xl transition-all duration-200 cursor-pointer group ${
                isActive
                  ? 'bg-zinc-100 dark:bg-zinc-800/80'
                  : 'hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
              }`}
              title={cat.label}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full"
                  style={{ backgroundColor: colorMap[cat.color] || '#6366f1' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <cat.icon
                className={`w-5 h-5 transition-colors ${
                  isActive
                    ? cat.color
                    : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'
                }`}
              />
              <span
                className={`text-[10px] font-semibold transition-colors leading-none ${
                  isActive
                    ? 'text-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="w-8 h-px bg-zinc-200 dark:bg-zinc-800 my-2 shrink-0" />

      {/* Action Buttons: Search / Add */}
      <div className="flex flex-col gap-1.5 shrink-0">
        <button
          onClick={onSearchClick}
          className="flex flex-col items-center justify-center gap-1 w-[56px] sm:w-[64px] py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer group"
          title="搜索"
        >
          <Search className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
          <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors leading-none">搜索</span>
        </button>

        <button
          onClick={onAddClick}
          className="flex flex-col items-center justify-center gap-1 w-[56px] sm:w-[64px] py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer group"
          title="添加卡片"
        >
          <Plus className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
          <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors leading-none">添加</span>
        </button>
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-zinc-200 dark:bg-zinc-800 my-2 shrink-0" />

      {/* Theme toggle at bottom */}
      <button
        onClick={onThemeToggle}
        className="flex flex-col items-center justify-center gap-1 w-[56px] sm:w-[64px] py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all cursor-pointer group shrink-0"
        title={darkMode ? '切换亮色模式' : '切换暗黑模式'}
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        ) : (
          <Moon className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        )}
        <span className="text-[10px] font-semibold leading-none text-zinc-500 dark:text-zinc-400">
          {darkMode ? '亮色' : '暗黑'}
        </span>
      </button>
    </aside>
  );
}
