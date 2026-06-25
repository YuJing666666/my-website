import { WebItem, Category, AIModel, StockInfo, StockPoint, NewsItem } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: '全部', icon: 'LayoutGrid' }
];

export const INITIAL_WEB_ITEMS: WebItem[] = [
  {
    id: 'deepseek',
    name: 'DeepSeek',
    url: 'https://www.deepseek.com/',
    description: '引爆全球的中国开源大模型，以极高的性价比和顶级的推理性能（DeepSeek-V3/R1）震撼世界。',
    category: 'ai',
    tags: ['开源', '推理模型', '高性价比', '对话聊天'],
    isFree: 'free',
    logoColor: 'from-blue-600 via-blue-500 to-indigo-600',
    logoText: 'DS',
    iconName: 'Sparkles',
    popularity: 'huge', // Size 1: Huge 2x2
    tokenPrice: '$0.00014/K tokens $0.00028/K tokens'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    url: 'https://chatgpt.com/',
    description: 'OpenAI 旗下的行业标杆，具备强大的多模态交互、o1系列深度推理与全能办公。',
    category: 'ai',
    tags: ['多模态', '深度推理', '对话聊天', '官方出品'],
    isFree: 'freemium',
    logoColor: 'from-emerald-600 to-teal-500',
    logoText: 'GP',
    iconName: 'MessageSquareText',
    popularity: 'wide', // Size 2: Wide 2x1
    tokenPrice: '$0.0025/K tokens $0.010/K tokens'
  },
  {
    id: 'claude',
    name: 'Claude',
    url: 'https://claude.ai/',
    description: 'Anthropic 顶级智能助手，公认的代码编写、长文本分析与人文写作专家（Sonnet 3.5）。',
    category: 'ai',
    tags: ['代码专家', '超长文本', '逻辑分析', '写作'],
    isFree: 'freemium',
    logoColor: 'from-amber-600 to-orange-500',
    logoText: 'Cl',
    iconName: 'Cpu',
    popularity: 'wide', // Size 2: Wide 2x1
    tokenPrice: '$0.003/K tokens $0.015/K tokens'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    url: 'https://huggingface.co/',
    description: '全球最顶尖的开源机器学习与模型社区，托管数十万开源模型、数据集以及交互式 Demo Web 应用。',
    category: 'ai',
    tags: ['开源社区', '模型库', '数据集', '开源AI'],
    isFree: 'free',
    logoColor: 'from-yellow-400 to-amber-500',
    logoText: 'HF',
    iconName: 'Component',
    popularity: 'tall', // Size 3: Tall 1x2
    tokenPrice: '$0.0002/K tokens'
  },
  {
    id: 'doubao',
    name: '豆包 Doubao',
    url: 'https://www.doubao.com/',
    description: '字节跳动推出的超高人气 AI 伴侣，提供自然流畅的语音交互、写作、翻译及丰富有趣的智能体服务。',
    category: 'ai',
    tags: ['字节生态', '语音交互', '虚拟人', '高人气'],
    isFree: 'free',
    logoColor: 'from-blue-500 to-cyan-400',
    logoText: 'DB',
    iconName: 'Users',
    popularity: 'tall', // Size 3: Tall 1x2
    tokenPrice: '$0.00008/K $0.00028/K tokens'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    url: 'https://gemini.google.com/',
    description: '谷歌原生多模态 AI 旗舰，无缝集成谷歌生态，支持百万超长上下文。',
    category: 'ai',
    tags: ['多模态', '谷歌生态', '长上下文'],
    isFree: 'freemium',
    logoColor: 'from-blue-500 via-indigo-500 to-violet-600',
    logoText: 'Ge',
    iconName: 'Sparkles',
    popularity: 'normal', // Size 4: Normal 1x1
    tokenPrice: '$0.000075/K tokens $0.0003/K tokens'
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    url: 'https://www.perplexity.ai/',
    description: '新一代 AI 搜索引擎，实时联网检索，直接呈现整合后的精确答案与权威学术引用。',
    category: 'ai',
    tags: ['AI搜索', '实时联网', '学术探究'],
    isFree: 'freemium',
    logoColor: 'from-teal-600 to-emerald-700',
    logoText: 'Px',
    iconName: 'Compass',
    popularity: 'normal', // Size 4: Normal 1x1
    tokenPrice: '$0.0028/K tokens'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    url: 'https://www.midjourney.com/',
    description: '世界领先的 AI 艺术生成引擎，能够创造出无与伦比的超写实、电影级视觉效果。',
    category: 'ai',
    tags: ['AI绘画', '艺术创作', '超写实'],
    isFree: 'paid',
    logoColor: 'from-purple-600 to-pink-500',
    logoText: 'Mj',
    iconName: 'Image',
    popularity: 'normal', // Size 4: Normal 1x1
    tokenPrice: '$0.032/image'
  },
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    url: 'https://notebooklm.google/',
    description: '谷歌推出的个性化 AI 笔记与学习助手，支持自动生成超逼真的双人对话播客音频。',
    category: 'ai',
    tags: ['学习助手', '播客生成', '谷歌出品'],
    isFree: 'free',
    logoColor: 'from-slate-600 to-zinc-800',
    logoText: 'NL',
    iconName: 'BookOpen',
    popularity: 'normal', // Size 4: Normal 1x1
    tokenPrice: '$0.0015/K tokens'
  },
  {
    id: 'qwen',
    name: '通义千问 Qwen',
    url: 'https://qwenlm.github.io/',
    description: '阿里巴巴旗舰级开源大模型，中英文处理能力顶级，支持多模态及复杂数学推理。',
    category: 'ai',
    tags: ['阿里开源', '大语言模型', '多语言'],
    isFree: 'free',
    logoColor: 'from-indigo-600 to-purple-500',
    logoText: 'QW',
    iconName: 'Cpu',
    popularity: 'normal', // Size 4: Normal 1x1
    tokenPrice: '$0.0014/K tokens $0.0014/K tokens'
  },
  {
    id: 'cursor',
    name: 'Cursor AI',
    url: 'https://www.cursor.com/',
    description: '专为 AI 时代重构的 IDE 编程工具，智能预测、代码库级对话，重塑程序员编码流程。',
    category: 'ai',
    tags: ['AI编程', '代码补全', '高效IDE'],
    isFree: 'freemium',
    logoColor: 'from-sky-500 to-blue-700',
    logoText: 'Cr',
    iconName: 'Blocks',
    popularity: 'small', // Size 5: Small 1x1 Compact
    tokenPrice: '$0.002/K tokens'
  },
  {
    id: 'kimi',
    name: 'Kimi Chat',
    url: 'https://kimi.moonshot.cn/',
    description: '月之暗面明星产品，支持超长无损上下文，长篇论文与复杂财报解析神器。',
    category: 'ai',
    tags: ['长文本', '论文分析', '国货之光'],
    isFree: 'free',
    logoColor: 'from-orange-500 via-amber-500 to-yellow-600',
    logoText: 'Ki',
    iconName: 'BookOpen',
    popularity: 'small', // Size 5: Small 1x1 Compact
    tokenPrice: '$0.00168/K tokens $0.00168/K tokens'
  },
  {
    id: 'suno',
    name: 'Suno AI',
    url: 'https://suno.com/',
    description: '殿堂级 AI 音乐生成平台，只需输入歌词或描述，即刻生成极高品质的完整单曲。',
    category: 'ai',
    tags: ['AI音乐', '歌曲创作', '人声合成'],
    isFree: 'freemium',
    logoColor: 'from-rose-500 to-red-600',
    logoText: 'Su',
    iconName: 'Music',
    popularity: 'small', // Size 5: Small 1x1 Compact
    tokenPrice: '$0.012/song'
  },
  {
    id: 'v0',
    name: 'v0 by Vercel',
    url: 'https://v0.dev/',
    description: 'Vercel 推出的生成式前端 UI 助手，直接生成可复制的 React 布局与交互组件。',
    category: 'ai',
    tags: ['UI生成', '前端代码', 'React'],
    isFree: 'freemium',
    logoColor: 'from-neutral-800 to-neutral-950',
    logoText: 'v0',
    iconName: 'Blocks',
    popularity: 'small', // Size 5: Small 1x1 Compact
    tokenPrice: '$0.004/gen'
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    url: 'https://elevenlabs.io/',
    description: '最逼真、情绪化的 AI 语音合成克隆平台，配音、有声书首选方案。',
    category: 'ai',
    tags: ['语音克隆', '高逼真配音', '多国语'],
    isFree: 'freemium',
    logoColor: 'from-stone-700 to-neutral-900',
    logoText: 'EL',
    iconName: 'Mic',
    popularity: 'small', // Size 5: Small 1x1 Compact
    tokenPrice: '$0.015/K chars'
  },
  {
    id: 'runway',
    name: 'Runway Gen-3',
    url: 'https://runwayml.com/',
    description: '电影级 AI 视频生成工具，Gen-3 Alpha 带来惊艳的物理世界模拟与运镜控制力。',
    category: 'ai',
    tags: ['AI视频', '电影级', '运镜模拟'],
    isFree: 'freemium',
    logoColor: 'from-neutral-900 to-zinc-800',
    logoText: 'Rw',
    iconName: 'Video',
    popularity: 'small', // Size 5: Small 1x1 Compact
    tokenPrice: '$0.05/sec'
  },
  {
    id: 'cohere',
    name: 'Cohere AI',
    url: 'https://cohere.com/',
    description: '顶尖的企业级大语言模型及高效 RAG（检索增强生成）与文本重排分类解决方案。',
    category: 'ai',
    tags: ['企业级', '文本搜索', 'RAG'],
    isFree: 'freemium',
    logoColor: 'from-emerald-800 to-zinc-900',
    logoText: 'CO',
    iconName: 'Cpu',
    popularity: 'small', // Size 5: Small 1x1 Compact
    tokenPrice: '$0.0015/K tokens $0.002/K tokens'
  },
  {
    id: 'groq',
    name: 'Groq Speed',
    url: 'https://groq.com/',
    description: '极致极速推理引擎，支持每秒数百个 Token 超低延迟大模型实时对话。',
    category: 'ai',
    tags: ['极速推理', 'LPU芯片'],
    isFree: 'free',
    logoColor: 'from-lime-500 to-emerald-600',
    logoText: 'Gr',
    iconName: 'Zap',
    popularity: 'micro', // Size 6: Micro 1x1 Condensed
    tokenPrice: '$0.0005/K tokens $0.0008/K tokens'
  },
  {
    id: 'luma',
    name: 'Luma Dream',
    url: 'https://lumalabs.ai/',
    description: '梦境视频与 3D 渲染，实现完美的分镜效果。',
    category: 'ai',
    tags: ['3D模型', '写实视频'],
    isFree: 'freemium',
    logoColor: 'from-violet-500 to-fuchsia-600',
    logoText: 'Lu',
    iconName: 'Film',
    popularity: 'micro', // Size 6: Micro 1x1 Condensed
    tokenPrice: '$0.04/sec'
  },
  {
    id: 'pika',
    name: 'Pika Art',
    url: 'https://pika.art/',
    description: '极具趣味性的 AI 视频特效与局部重绘编辑器。',
    category: 'ai',
    tags: ['3D动画', '特效'],
    isFree: 'freemium',
    logoColor: 'from-sky-400 to-indigo-500',
    logoText: 'Pk',
    iconName: 'Sparkles',
    popularity: 'micro', // Size 6: Micro 1x1 Condensed
    tokenPrice: '$0.03/sec'
  },
  {
    id: 'tome',
    name: 'Tome PPT',
    url: 'https://tome.app/',
    description: '一键自动构建精美排版 PPT 与故事画卷。',
    category: 'ai',
    tags: ['AI幻灯片', '排版'],
    isFree: 'freemium',
    logoColor: 'from-fuchsia-800 to-neutral-900',
    logoText: 'TM',
    iconName: 'Palette',
    popularity: 'micro', // Size 6: Micro 1x1 Condensed
    tokenPrice: '$0.008/page'
  },
  {
    id: 'blackbox',
    name: 'Blackbox AI',
    url: 'https://www.blackbox.ai/',
    description: '极速代码搜索与全自动逻辑片段编写助手。',
    category: 'ai',
    tags: ['代码搜索', '极速'],
    isFree: 'free',
    logoColor: 'from-neutral-900 to-sky-950',
    logoText: 'BB',
    iconName: 'Zap',
    popularity: 'micro', // Size 6: Micro 1x1 Condensed
    tokenPrice: '$0.0004/K tokens'
  },
  {
    id: 'replicate',
    name: 'Replicate',
    url: 'https://replicate.com/',
    description: '云端 API 轻松一键运行各类开源机器学习模型。',
    category: 'ai',
    tags: ['云端API', '开源部署'],
    isFree: 'paid',
    logoColor: 'from-zinc-800 to-black',
    logoText: 'RP',
    iconName: 'Blocks',
    popularity: 'micro', // Size 6: Micro 1x1 Condensed
    tokenPrice: '$0.00022/sec'
  }
];

export function getModelsForItem(item: WebItem): AIModel[] {
  if (item.models && item.models.length > 0) return item.models;

  const name = item.name;
  if (name.toLowerCase().includes('deepseek')) {
    return [
      { name: 'DeepSeek-R1', releaseDate: '2025-01', useCase: '推理/代码' },
      { name: 'DeepSeek-V3', releaseDate: '2024-12', useCase: '聊天/多模态' },
      { name: 'DeepSeek-Coder', releaseDate: '2024-06', useCase: '代码' }
    ];
  }
  if (name.toLowerCase().includes('gpt') || name.toLowerCase().includes('openai')) {
    return [
      { name: 'o3-mini', releaseDate: '2025-01', useCase: '推理/代码' },
      { name: 'o1-pro', releaseDate: '2024-12', useCase: '推理/代码' },
      { name: 'GPT-4o', releaseDate: '2024-05', useCase: '聊天/多模态' },
      { name: 'DALL-E 3', releaseDate: '2023-10', useCase: '绘画' }
    ];
  }
  if (name.toLowerCase().includes('claude') || name.toLowerCase().includes('anthropic')) {
    return [
      { name: 'Claude 3.5 Sonnet', releaseDate: '2024-06', useCase: '代码/写作' },
      { name: 'Claude 3.5 Haiku', releaseDate: '2024-11', useCase: '聊天/代码' },
      { name: 'Claude 3 Opus', releaseDate: '2024-03', useCase: '长文本/逻辑' }
    ];
  }
  if (name.toLowerCase().includes('gemini') || name.toLowerCase().includes('google')) {
    return [
      { name: 'Gemini 2.0 Flash', releaseDate: '2024-12', useCase: '聊天/多模态' },
      { name: 'Gemini 1.5 Pro', releaseDate: '2024-05', useCase: '长文本/分析' },
      { name: 'Imagen 3', releaseDate: '2024-08', useCase: '绘画' }
    ];
  }
  if (name.toLowerCase().includes('doubao') || name.toLowerCase().includes('豆包')) {
    return [
      { name: 'Doubao-pro', releaseDate: '2024-05', useCase: '聊天/办公' },
      { name: 'Doubao-lite', releaseDate: '2024-05', useCase: '轻量/对话' },
      { name: 'Skylark-v2', releaseDate: '2023-11', useCase: '聊天/语言' }
    ];
  }
  if (name.toLowerCase().includes('kimi') || name.toLowerCase().includes('moonshot')) {
    return [
      { name: 'Kimi-Chat-200k', releaseDate: '2023-10', useCase: '长文本/对话' },
      { name: 'Kimi-Exploration', releaseDate: '2024-10', useCase: '搜索/联网' }
    ];
  }
  if (name.toLowerCase().includes('midjourney')) {
    return [
      { name: 'Midjourney v6.1', releaseDate: '2024-07', useCase: '绘画' },
      { name: 'Midjourney v6', releaseDate: '2023-12', useCase: '绘画' }
    ];
  }
  if (name.toLowerCase().includes('suno')) {
    return [
      { name: 'Suno v4', releaseDate: '2024-11', useCase: '声音' },
      { name: 'Suno v3', releaseDate: '2024-03', useCase: '声音' }
    ];
  }
  if (name.toLowerCase().includes('runway')) {
    return [
      { name: 'Gen-3 Alpha', releaseDate: '2024-06', useCase: '视频' },
      { name: 'Gen-2', releaseDate: '2023-06', useCase: '视频' }
    ];
  }
  if (name.toLowerCase().includes('v0')) {
    return [
      { name: 'v0-next', releaseDate: '2024-09', useCase: '代码' },
      { name: 'v0-dolly', releaseDate: '2023-10', useCase: '代码' }
    ];
  }
  if (name.toLowerCase().includes('flux') || name.toLowerCase().includes('black-forest')) {
    return [
      { name: 'FLUX.1 [pro]', releaseDate: '2024-08', useCase: '绘画' },
      { name: 'FLUX.1 [dev]', releaseDate: '2024-08', useCase: '绘画' },
      { name: 'FLUX.1 [schnell]', releaseDate: '2024-08', useCase: '绘画' }
    ];
  }

  const tags = item.tags || [];
  let detectedUseCase = '聊天';
  if (tags.some(t => t.includes('代码') || t.includes('编程') || t.includes('写代码'))) {
    detectedUseCase = '代码';
  } else if (tags.some(t => t.includes('画') || t.includes('生图') || t.includes('图像') || t.includes('图片') || t.includes('设计') || t.includes('绘画'))) {
    detectedUseCase = '绘画';
  } else if (tags.some(t => t.includes('视频') || t.includes('剪辑') || t.includes('动画'))) {
    detectedUseCase = '视频';
  } else if (tags.some(t => t.includes('声音') || t.includes('音频') || t.includes('音乐') || t.includes('配音'))) {
    detectedUseCase = '声音';
  }

  return [
    { name: `${item.name}-Pro`, releaseDate: '2024-10', useCase: detectedUseCase },
    { name: `${item.name}-Lite`, releaseDate: '2024-04', useCase: detectedUseCase }
  ];
}

export interface StockAndNews {
  stock: StockInfo;
  news: NewsItem[];
}

export function getStockAndNewsForItem(item: WebItem): StockAndNews {
  if (item.stock && item.news && item.news.length > 0) {
    return { stock: item.stock, news: item.news };
  }

  const name = item.name.toLowerCase();
  
  let ticker = 'GOOGL';
  let companyName = 'Alphabet Inc. (Google)';
  let basePrice = 175.24;
  let change = 1.34;
  
  if (name.includes('deepseek')) {
    ticker = '603156.SH';
    companyName = '幻方量化 (High-Flyer AI Partner)';
    basePrice = 52.80;
    change = 4.25;
  } else if (name.includes('gpt') || name.includes('openai') || name.includes('microsoft')) {
    ticker = 'MSFT';
    companyName = 'Microsoft Corp. (OpenAI Partner)';
    basePrice = 421.90;
    change = 1.82;
  } else if (name.includes('claude') || name.includes('anthropic') || name.includes('amazon')) {
    ticker = 'AMZN';
    companyName = 'Amazon.com, Inc. (Anthropic Partner)';
    basePrice = 189.30;
    change = -0.45;
  } else if (name.includes('doubao') || name.includes('字节') || name.includes('bytedance')) {
    ticker = 'BDNCE';
    companyName = 'ByteDance (Doubao Parent)';
    basePrice = 120.50;
    change = 3.12;
  } else if (name.includes('kimi') || name.includes('moonshot') || name.includes('月之暗面')) {
    ticker = '600602.SH';
    companyName = '月之暗面 Moonshot AI';
    basePrice = 34.60;
    change = 2.45;
  } else if (name.includes('midjourney')) {
    ticker = 'MJY';
    companyName = 'Midjourney Inc.';
    basePrice = 85.00;
    change = 0.50;
  } else if (name.includes('v0') || name.includes('vercel')) {
    ticker = 'VRCL';
    companyName = 'Vercel Inc.';
    basePrice = 72.40;
    change = 1.15;
  } else if (name.includes('hugging')) {
    ticker = 'HUG';
    companyName = 'Hugging Face Inc.';
    basePrice = 96.20;
    change = 0.85;
  } else if (name.includes('runway')) {
    ticker = 'RWY';
    companyName = 'Runway AI, Inc.';
    basePrice = 45.10;
    change = -1.20;
  } else if (name.includes('suno')) {
    ticker = 'SUNO';
    companyName = 'Suno Music AI';
    basePrice = 32.80;
    change = 5.67;
  } else {
    ticker = 'NVDA';
    companyName = 'NVIDIA Corp. (AI Hardware Partner)';
    basePrice = 124.50;
    change = 2.75;
  }

  const history: StockPoint[] = [];
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  let currentVal = basePrice - (change * 4);
  for (let i = 0; i < 7; i++) {
    const dailyFluctuation = (Math.sin(i * 1.5) * (basePrice * 0.02)) + (Math.random() * (basePrice * 0.01));
    currentVal = parseFloat((basePrice * (0.95 + (i * 0.008)) + dailyFluctuation).toFixed(2));
    history.push({ date: days[i], value: currentVal });
  }
  history[6].value = basePrice;

  let news: NewsItem[] = [];
  if (name.includes('deepseek')) {
    news = [
      { title: 'DeepSeek R1 发布：开源推理大模型性能比肩 OpenAI o1', source: '机器之心', time: '12小时前' },
      { title: '全球开发者涌入：DeepSeek 官方 API 流量激增 10 倍', source: 'CSDN', time: '1天前' },
      { title: '低成本算力奇迹：幻方量化如何用 2000 万美元训练出顶尖大模型', source: '36氪', time: '3天前' }
    ];
  } else if (name.includes('gpt') || name.includes('openai')) {
    news = [
      { title: 'OpenAI 计划推出下一代 o3 推理大模型，专注于高级数理逻辑', source: '科技日报', time: '5小时前' },
      { title: 'ChatGPT Plus 订阅用户再创新高，新语音模式全面上线', source: '腾讯科技', time: '1天前' },
      { title: '微软宣布增加对 OpenAI 的百亿追加投资，全力升级 Azure 算力', source: '华尔街日报', time: '2天前' }
    ];
  } else if (name.includes('claude') || name.includes('anthropic')) {
    news = [
      { title: 'Anthropic 推出 Claude 3.5 Sonnet 新版本：编写复杂代码能力倍增', source: '量子位', time: '3小时前' },
      { title: 'Claude 网页端上线 "Artifacts" 功能：直接在对话框预览网页并生成界面', source: '新浪科技', time: '18小时前' },
      { title: '亚马逊追加 40 亿美元投资，成为 Anthropic 核心云服务商', source: '钛媒体', time: '3天前' }
    ];
  } else if (name.includes('gemini') || name.includes('google')) {
    news = [
      { title: '谷歌发布 Gemini 2.0 Flash：实时音频、视频与高并发推理全面开放 API', source: '爱范儿', time: '8小时前' },
      { title: '谷歌 Chrome 浏览器深度集成 Gemini Nano 离线模型，支持网页本地总结', source: 'IT之家', time: '1天前' },
      { title: 'Alphabet 发布季度财报，谷歌云 AI 服务营收增长超 35%', source: '雪球', time: '2天前' }
    ];
  } else if (name.includes('doubao') || name.includes('字节')) {
    news = [
      { title: '字节跳动豆包大模型日均代币消耗量突破 1.2 万亿，国内增速第一', source: '北京商报', time: '10小时前' },
      { title: '豆包 APP 推出全新数字分身功能，人人皆可一键创建专属 AI 伴侣', source: '创业邦', time: '1天前' },
      { title: '火山引擎发布全新大模型版低成本存储方案，助推 AI 规模化落地', source: '中国经济网', time: '3天前' }
    ];
  } else if (name.includes('kimi') || name.includes('moonshot')) {
    news = [
      { title: '月之暗面 Kimi 推出极速“探索版”：支持自主多步联网搜索与智能整理', source: '第一财经', time: '6小时前' },
      { title: '长文本专家 Kimi 升级支持 200 万字超长上下文无损分析', source: '网易科技', time: '1天前' },
      { title: '月之暗面完成新一轮数亿美元融资，估值突破 30 亿美元大关', source: '投中网', time: '4天前' }
    ];
  } else if (name.includes('midjourney')) {
    news = [
      { title: 'Midjourney 开启网页端免注册体验，并发布全新人脸细节恢复器', source: '艺术与科技', time: '16小时前' },
      { title: 'MJ V6.1 大版本迭代发布：图像渲染速度提升 25%，细节更细腻', source: '设计前沿', time: '2天前' }
    ];
  } else if (name.includes('suno')) {
    news = [
      { title: 'Suno V4 音乐生成大模型内测上线：支持 44kHz 超高保真立体声', source: '音频界', time: '20小时前' },
      { title: 'AI 音乐合法性争鸣：Suno 联合创始人发声支持创作者版权分成', source: '新浪科技', time: '3天前' }
    ];
  } else {
    news = [
      { title: `${item.name} 升级全新大语言模型，企业级安全性全面通过认证`, source: '行业先锋', time: '12小时前' },
      { title: `全球 AI 算力高地：${item.name} 携手英伟达启动千卡计算集群`, source: '科技焦点', time: '2天前' }
    ];
  }

  return {
    stock: { ticker, companyName, price: basePrice, change, history },
    news
  };
}
