import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Sparkles, Check, Info } from 'lucide-react';
import { WebItem } from '../types';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<WebItem, 'id' | 'isCustom'>) => void;
  categories?: { id: string; name: string }[];
}

const GRADIENT_PRESETS = [
  { name: '曜石墨黑', value: 'from-neutral-800 to-zinc-950', dot: 'bg-zinc-800' },
  { name: '水泥深灰', value: 'from-zinc-600 to-zinc-800', dot: 'bg-zinc-600' },
  { name: '太空雾灰', value: 'from-zinc-400 to-zinc-600', dot: 'bg-zinc-500' },
  { name: '极客碳黑', value: 'from-stone-700 to-zinc-900', dot: 'bg-stone-800' },
  { name: '银白金属', value: 'from-zinc-300 to-zinc-500', dot: 'bg-zinc-400' }
];

export default function AddCardModal({ isOpen, onClose, onAdd }: AddCardModalProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isFree, setIsFree] = useState<'free' | 'paid' | 'freemium'>('free');
  const [tokenPrice, setTokenPrice] = useState('');
  const [logoText, setLogoText] = useState('');
  const [selectedGradient, setSelectedGradient] = useState(GRADIENT_PRESETS[0].value);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('请输入网页名称');
      return;
    }
    if (!url.trim()) {
      setError('请输入网页链接');
      return;
    }
    
    let formattedUrl = url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    try {
      new URL(formattedUrl);
    } catch {
      setError('请输入有效的网址格式 (例如: https://example.com)');
      return;
    }

    if (!description.trim()) {
      setError('请输入网页的简短介绍');
      return;
    }

    // Auto generate 2-char initials if not set
    let resolvedLogoText = logoText.trim().slice(0, 2);
    if (!resolvedLogoText) {
      resolvedLogoText = name.trim().slice(0, 2);
    }

    onAdd({
      name: name.trim(),
      url: formattedUrl,
      description: description.trim(),
      category: 'ai',
      tags: [],
      isFree,
      logoText: resolvedLogoText,
      logoColor: selectedGradient,
      tokenPrice: tokenPrice.trim() || undefined
    });

    // Reset fields
    setName('');
    setUrl('');
    setDescription('');
    setIsFree('free');
    setTokenPrice('');
    setLogoText('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/40 dark:bg-zinc-950/65 backdrop-blur-md"
            id="modal-backdrop"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative w-full max-w-lg rounded-2xl bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_24px_48px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_48px_rgba(0,0,0,0.4)] overflow-hidden backdrop-blur-xl"
            id="add-card-dialog"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">添加自定义 AI 卡片</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3.5 max-h-[80vh] overflow-y-auto scrollbar-none text-left">
              {error && (
                <div className="p-3 text-xs bg-zinc-500/10 border border-zinc-500/20 text-zinc-600 dark:text-zinc-400 rounded-lg flex items-center gap-2">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
                    网页名称 *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!logoText) {
                        setLogoText(e.target.value.trim().slice(0, 2));
                      }
                    }}
                    placeholder="如: ChatGPT"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500 outline-none text-sm font-medium transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
                    网页链接 *
                  </label>
                  <input
                    type="text"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="example.com"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500 outline-none text-sm font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
                  网页介绍 *
                </label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="对该网页进行简短直观的描述..."
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500 outline-none text-sm font-medium transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
                    收费模式
                  </label>
                  <select
                    value={isFree}
                    onChange={(e) => setIsFree(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30 text-zinc-800 dark:text-zinc-100 focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500 outline-none text-sm font-medium transition-all"
                  >
                    <option value="free" className="dark:bg-zinc-900">免费</option>
                    <option value="freemium" className="dark:bg-zinc-900">免费+内购 (Freemium)</option>
                    <option value="paid" className="dark:bg-zinc-900">付费/订阅</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
                    模型 Token 价格 (选填)
                  </label>
                  <input
                    type="text"
                    value={tokenPrice}
                    onChange={(e) => setTokenPrice(e.target.value)}
                    placeholder="如: $0.0015/K tokens"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500 outline-none text-sm font-medium transition-all"
                  />
                </div>
              </div>

              <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-4 mt-2">
                <h4 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                  自定义卡片 Logo & 背景配色
                </h4>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3 flex flex-col items-center">
                    <div 
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-semibold text-xl bg-gradient-to-tr shadow-md ${selectedGradient}`}
                    >
                      {logoText.trim().slice(0, 2) || (name ? name.trim().slice(0, 2) : 'A')}
                    </div>
                    <span className="text-[10px] text-zinc-400 mt-1.5">Logo 效果</span>
                  </div>

                  <div className="col-span-9 space-y-3">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">
                        Logo 缩写 (最多2位)
                      </label>
                      <input
                        type="text"
                        maxLength={2}
                        value={logoText}
                        onChange={(e) => setLogoText(e.target.value)}
                        placeholder={name ? name.trim().slice(0, 2) : '缩写'}
                        className="w-24 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-400 dark:focus:border-zinc-500 outline-none text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1.5">
                        背景色渐变
                      </label>
                      <div className="flex gap-2">
                        {GRADIENT_PRESETS.map((grad, index) => {
                          const isSelected = selectedGradient === grad.value;
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setSelectedGradient(grad.value)}
                              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                                isSelected 
                                  ? 'border-zinc-500 dark:border-zinc-400 scale-110' 
                                  : 'border-transparent hover:scale-105'
                              }`}
                              title={grad.name}
                            >
                              <span className={`w-4 h-4 rounded-full block bg-gradient-to-tr ${grad.value}`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-5 mt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-white rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  确认添加
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
