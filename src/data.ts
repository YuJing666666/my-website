import { WebItem, Category, NewsItem } from './types';

export const CATEGORIES: Category[] = [
  { id: 'fashion', name: '服装品牌', icon: 'Shirt' },
  { id: 'trend', name: '设计趋势', icon: 'TrendingUp' },
  { id: 'pattern', name: '纸样制版', icon: 'Scissors' },
  { id: 'sewing', name: '缝纫工艺', icon: 'Needle' },
  { id: 'accessory', name: '辅料工艺', icon: 'Zap' },
  { id: 'composition', name: '设计构成', icon: 'LayoutGrid' },
  { id: 'software', name: '设计软件', icon: 'Monitor' },
];

// ===================== 服装品牌（跳转质询类）=====================
export function getFashionWebItems(): WebItem[] {
  return [
    { id: 'uniqlo', name: '优衣库 UNIQLO', url: 'https://www.uniqlo.com/', description: '日本全球快时尚品牌，主打基础款与科技面料，性价比极高，联名系列频出。', category: 'fashion', tags: ['快时尚', '基础款', '性价比', '日本'], isFree: 'paid', logoColor: 'from-red-500 to-rose-600', logoText: 'UQ', popularity: 'huge', tokenPrice: '快时尚 · ¥99起', cardType: 'link', brandInfo: '日本迅销集团旗下核心品牌，创立于1984年，全球门店超2400家。以LifeWear服适人生为理念，主打高性价比基础款与科技面料（HEATTECH、AIRism）。', recommendation: '基础款首选，HEATTECH保暖内衣和AIRism凉感T恤是常年爆款；联名系列（KAWS、MoMA等）极具收藏价值。', priceRange: '¥59 - ¥499' },
    { id: 'zara', name: 'ZARA', url: 'https://www.zara.com/', description: '西班牙快时尚巨头，以极速上新和潮流跟踪著称，从T台到门店仅需两周。', category: 'fashion', tags: ['快时尚', '潮流', '极速上新'], isFree: 'paid', logoColor: 'from-zinc-700 to-zinc-900', logoText: 'ZR', popularity: 'normal', tokenPrice: '快时尚 · ¥199起', cardType: 'link', brandInfo: 'Inditex集团旗下旗舰品牌，创立于1975年，全球96个国家设有门店。以快时尚模式闻名，从设计到上架仅需14天。', recommendation: '潮流追踪者首选，每周两次上新；试穿版型偏欧码，建议大一码；Basic系列性价比高。', priceRange: '¥79 - ¥1299' },
    { id: 'hnm', name: 'H&M', url: 'https://www2.hm.com/', description: '瑞典快时尚品牌，以平价潮流和设计师联名系列闻名，可持续发展理念。', category: 'fashion', tags: ['快时尚', '平价', '联名'], isFree: 'paid', logoColor: 'from-red-600 to-orange-500', logoText: 'H&M', popularity: 'normal', tokenPrice: '快时尚 · ¥79起', cardType: 'link', brandInfo: 'Hennes & Mauritz AB，创立于1947年瑞典，全球74个国家4800多家门店。以平价潮流和设计师联名闻名。', recommendation: '联名系列抢购速度快；Conscious系列环保材质值得关注；打折季力度大。', priceRange: '¥39 - ¥799' },
    { id: 'gu', name: 'GU', url: 'https://www.gu-global.com/', description: '优衣库旗下年轻潮流品牌，价格更亲民，设计更大胆。', category: 'fashion', tags: ['快时尚', '年轻', '低价'], isFree: 'paid', logoColor: 'from-blue-500 to-cyan-400', logoText: 'GU', popularity: 'normal', tokenPrice: '快时尚 · ¥59起', cardType: 'link', brandInfo: '优衣库母公司迅销集团旗下年轻品牌，2006年创立。定位比优衣库更年轻、更潮流，价格低约30%。', recommendation: '学生党首选，宽松版型设计感强；针织衫和阔腿裤是热门单品。', priceRange: '¥39 - ¥399' },
    { id: 'muji', name: '无印良品 MUJI', url: 'https://www.muji.com/', description: '日本极简生活美学品牌，服装以自然材质和素色设计为核心。', category: 'fashion', tags: ['极简', '自然', '日系'], isFree: 'paid', logoColor: 'from-amber-600 to-stone-700', logoText: 'MJ', popularity: 'normal', tokenPrice: '生活美学 · ¥149起', cardType: 'link', brandInfo: '株式会社良品计划，1980年创立于日本。以无品牌标志理念闻名，强调自然材质与简约设计。', recommendation: '有机棉系列肤感极佳；亚麻衬衫是夏季必备；羊毛混纺针织适合通勤。', priceRange: '¥79 - ¥999' },
    { id: 'gap', name: 'GAP', url: 'https://www.gap.com/', description: '美国经典休闲服饰品牌，以牛仔和基本款T恤闻名。', category: 'fashion', tags: ['休闲', '美式', '牛仔'], isFree: 'paid', logoColor: 'from-blue-600 to-indigo-700', logoText: 'GP', popularity: 'normal', tokenPrice: '休闲服饰 · ¥199起', cardType: 'link', brandInfo: 'Gap Inc.旗下品牌，1969年创立于旧金山。美式休闲风格代表，以Logo卫衣和牛仔裤为核心单品。', recommendation: 'Logo卫衣是经典款；牛仔裤版型适合亚洲人；打折季力度大。', priceRange: '¥99 - ¥599' },
    { id: 'cos', name: 'COS', url: 'https://www.cosstores.com/', description: 'H&M旗下高端极简品牌，以建筑感剪裁和高级面料著称。', category: 'fashion', tags: ['极简', '高端', '剪裁'], isFree: 'paid', logoColor: 'from-stone-600 to-zinc-800', logoText: 'CO', popularity: 'normal', tokenPrice: '高端极简 · ¥399起', cardType: 'link', brandInfo: 'H&M集团旗下高端品牌，2007年创立于伦敦。以建筑感剪裁与现代极简美学为核心。', recommendation: '衬衫和廓形大衣是招牌单品；面料质感远超快时尚；适合职场通勤。', priceRange: '¥199 - ¥2999' },
    { id: 'ur', name: 'URBAN REVIVO', url: 'https://www.urcn.com/', description: '中国快时尚品牌，以大胆设计和快速上新著称，性价比高。', category: 'fashion', tags: ['快时尚', '国货', '潮流'], isFree: 'paid', logoColor: 'from-purple-600 to-violet-700', logoText: 'UR', popularity: 'normal', tokenPrice: '快时尚 · ¥129起', cardType: 'link', brandInfo: 'URBAN REVIVO，2006年创立于广州，中国本土快时尚代表品牌。设计大胆前卫。', recommendation: '国内快时尚性价比之王；连衣裙和外套设计感强；会员折扣力度大。', priceRange: '¥69 - ¥899' },
    { id: 'shein', name: 'SHEIN', url: 'https://www.shein.com/', description: '中国出海快时尚电商巨头，以极致低价和海量SKU席卷全球。', category: 'fashion', tags: ['快时尚', '低价', '出海'], isFree: 'paid', logoColor: 'from-zinc-800 to-black', logoText: 'SH', popularity: 'normal', tokenPrice: '快时尚 · ¥29起', cardType: 'link', brandInfo: '希音（SHEIN），2008年创立于南京，全球最大的纯线上快时尚零售商。以小单快反柔性供应链模式闻名。', recommendation: '价格极致低廉，适合尝鲜；尺码表务必仔细核对；用户评价参考价值高。', priceRange: '¥15 - ¥399' },
    { id: 'arcteryx', name: '始祖鸟', url: 'https://arcteryx.com/', description: '加拿大顶级户外品牌，以GORE-TEX技术和极简设计著称，户外装备天花板。', category: 'fashion', tags: ['户外', '顶级', 'GORE-TEX'], isFree: 'paid', logoColor: 'from-red-700 to-zinc-900', logoText: 'AT', popularity: 'normal', tokenPrice: '户外顶级 · ¥2000起', cardType: 'link', brandInfo: 'Arc\'teryx，1989年创立于加拿大温哥华。以极致工艺和GORE-TEX Pro技术闻名，Alpha SV硬壳冲锋衣是行业标杆。', recommendation: '硬壳冲锋衣首选Alpha SV；Beta系列性价比更高；投资级装备。', priceRange: '¥1500 - ¥15000' },
    { id: 'nike', name: 'Nike', url: 'https://www.nike.com/', description: '全球第一运动品牌，Air Max与Dunk系列引领球鞋文化。', category: 'fashion', tags: ['运动', '球鞋', '全球第一'], isFree: 'paid', logoColor: 'from-zinc-800 to-black', logoText: 'NK', popularity: 'normal', tokenPrice: '运动品牌 · ¥399起', cardType: 'link', brandInfo: 'Nike, Inc.，1964年创立于美国俄勒冈州。全球最大运动用品公司，旗下还含Jordan Brand和Converse。', recommendation: 'Air Force 1和Dunk Low是经典百搭款；Pegasus系列跑鞋性价比高；SNKRS App抽签抢限定款。', priceRange: '¥299 - ¥4999' },
    { id: 'adidas', name: 'Adidas', url: 'https://www.adidas.com/', description: '德国运动巨头，三叶草与YEEZY系列潮流影响力巨大。', category: 'fashion', tags: ['运动', '三叶草', '德国'], isFree: 'paid', logoColor: 'from-zinc-700 to-zinc-900', logoText: 'AD', popularity: 'normal', tokenPrice: '运动品牌 · ¥349起', cardType: 'link', brandInfo: 'Adidas AG，1949年创立于德国。全球第二大运动品牌，旗下有三叶草、Performance和Style三大事业部。', recommendation: 'Samba和Gazelle复古鞋款回潮；Ultraboost跑脚感极佳；三叶草联名系列值得收藏。', priceRange: '¥299 - ¥3999' },
    { id: 'lululemon', name: 'Lululemon', url: 'https://www.lululemon.com/', description: '加拿大高端瑜伽运动品牌，以Align系列瑜伽裤和社区文化闻名。', category: 'fashion', tags: ['瑜伽', '高端', '社区'], isFree: 'paid', logoColor: 'from-red-500 to-rose-600', logoText: 'LL', popularity: 'normal', tokenPrice: '瑜伽高端 · ¥750起', cardType: 'link', brandInfo: 'Lululemon Athletica Inc.，1998年创立于温哥华。以瑜伽裤起家，Align系列Nulu面料开创裸感穿着体验。', recommendation: 'Align瑜伽裤是必买单品；Define外套修身百搭；男士ABC裤舒适度极高。', priceRange: '¥380 - ¥1980' },
    { id: 'champion', name: 'Champion', url: 'https://www.champion.com/', description: '美国百年运动品牌，以Reverse Weave卫衣和复古运动风回潮。', category: 'fashion', tags: ['运动', '复古', '卫衣'], isFree: 'paid', logoColor: 'from-blue-500 to-red-500', logoText: 'CP', popularity: 'small', tokenPrice: '运动休闲 · ¥299起', cardType: 'link', brandInfo: 'Champion，1919年创立于美国。发明了Reverse Weave横纹编织技术，防止卫衣缩水变形。', recommendation: 'Reverse Weave卫衣是招牌；Weaver Beater背心夏季百搭；日版版型更适合亚洲人。', priceRange: '¥199 - ¥899' },
    { id: 'levi', name: "Levi's", url: 'https://www.levi.com/', description: '牛仔鼻祖品牌，501系列是牛仔裤的永恒经典。', category: 'fashion', tags: ['牛仔', '经典', '501'], isFree: 'paid', logoColor: 'from-red-500 to-red-700', logoText: 'LV', popularity: 'small', tokenPrice: '牛仔经典 · ¥499起', cardType: 'link', brandInfo: 'Levi Strauss & Co.，1853年创立于旧金山。1873年发明了世界上第一条铆钉牛仔裤，501是全球最经典牛仔裤版型。', recommendation: '501 Original直筒是入门首选；511 Slim修身适合日常；Made in Japan系列赤耳丹宁值得收藏。', priceRange: '¥399 - ¥2999' },
  ];
}

// ===================== 设计趋势网站（跳转质询类）=====================
export function getTrendWebItems(): WebItem[] {
  return [
    { id: 'dribbble', name: 'Dribbble', url: 'https://dribbble.com/', description: '全球设计师作品分享社区，UI/UX、插画、品牌设计灵感第一站。', category: 'trend', tags: ['设计社区', 'UI/UX', '灵感'], isFree: 'freemium', logoColor: 'from-pink-500 to-rose-500', logoText: 'Dr', popularity: 'huge', tokenPrice: '设计社区 · 免费+Pro', cardType: 'link', brandInfo: '全球最大的设计师作品展示社区之一，2009年创立。以Shot（作品截图）为核心展示形式。', recommendation: '关注热门Shot获取最新设计趋势；搜索关键词查找特定风格；Pro账户可发布项目和招聘。', priceRange: '免费 / Pro $5/月' },
    { id: 'behance', name: 'Behance', url: 'https://www.behance.net/', description: 'Adobe旗下设计作品展示平台，涵盖平面、工业、动效等全设计领域。', category: 'trend', tags: ['Adobe', '作品展示', '全领域'], isFree: 'free', logoColor: 'from-blue-600 to-indigo-700', logoText: 'Be', popularity: 'normal', tokenPrice: '设计平台 · 完全免费', cardType: 'link', brandInfo: 'Adobe旗下在线作品展示平台，2006年创立。支持项目案例式展示，涵盖全设计领域。', recommendation: '按Creative Field筛选领域；Moodboard功能整理灵感；与Adobe CC无缝集成。', priceRange: '免费' },
    { id: 'pinterest', name: 'Pinterest', url: 'https://www.pinterest.com/', description: '视觉灵感瀑布流平台，以图搜图功能强大，设计灵感与Moodboard首选。', category: 'trend', tags: ['灵感', '瀑布流', '以图搜图'], isFree: 'free', logoColor: 'from-red-500 to-rose-600', logoText: 'Pi', popularity: 'normal', tokenPrice: '灵感平台 · 完全免费', cardType: 'link', brandInfo: '视觉发现引擎，2010年创立。以Pin和Board为核心，用户可收藏和整理视觉灵感。月活超4.5亿。', recommendation: '创建Moodboard收集灵感；Lens功能以图搜图；适合面料和款式灵感收集。', priceRange: '免费 / Plus $14.99/月' },
    { id: 'awwwards', name: 'Awwwards', url: 'https://www.awwwards.com/', description: '全球最佳网站设计评审平台，每日评选Site of the Day，Web设计风向标。', category: 'trend', tags: ['Web设计', '评审', '风向标'], isFree: 'freemium', logoColor: 'from-green-500 to-emerald-600', logoText: 'Aw', popularity: 'normal', tokenPrice: 'Web评审 · 免费+Pro', cardType: 'link', brandInfo: '全球领先的网站设计评审平台，每日评选Site of the Day。评审维度包括设计、可用性、创意和内容。', recommendation: '每日浏览Site of the Day获取前沿Web设计趋势；按技术栈筛选案例。', priceRange: '免费 / Pro $15/月' },
    { id: 'vogue', name: 'Vogue Runway', url: 'https://www.vogue.com/fashion-shows', description: '全球顶级时尚媒体，完整收录四大时装周所有品牌秀场图。', category: 'trend', tags: ['时尚媒体', '时装周', '秀场图'], isFree: 'free', logoColor: 'from-zinc-800 to-black', logoText: 'Vg', popularity: 'normal', tokenPrice: '时尚权威 · 完全免费', cardType: 'link', brandInfo: 'Vogue杂志官方时装周数据库，收录全球四大时装周及度假系列等全部品牌秀场图片和Look。', recommendation: '按季按品牌查找完整秀场图；Designer Index了解设计师履历；趋势报告总结每季关键元素。', priceRange: '免费' },
    { id: 'wgsn', name: 'WGSN', url: 'https://www.wgsn.com/', description: '全球权威时尚趋势预测机构，提前2年预测色彩、面料、款式趋势。', category: 'trend', tags: ['趋势预测', '专业', '权威'], isFree: 'paid', logoColor: 'from-emerald-500 to-teal-600', logoText: 'WG', popularity: 'normal', tokenPrice: '趋势预测 · 付费订阅', cardType: 'link', brandInfo: 'Worth Global Style Network，1998年创立于伦敦。全球最大时尚趋势预测公司，客户包括Nike、H&M等。', recommendation: '行业从业者必备工具；趋势报告提前2年预测；色彩库和面料库极具参考价值。', priceRange: '企业订阅 / 联系询价' },
    { id: '1granary', name: '1 Granary', url: 'https://1granary.com/', description: '中央圣马丁学生创建的时尚创意平台，深度访谈与新锐设计师发掘。', category: 'trend', tags: ['新锐', '访谈', '圣马丁'], isFree: 'free', logoColor: 'from-stone-600 to-zinc-800', logoText: '1G', popularity: 'small', tokenPrice: '新锐时尚 · 完全免费', cardType: 'link', brandInfo: '由中央圣马丁学生于2009年创建的时尚创意平台。专注发掘新锐设计师，提供深度行业访谈。', recommendation: '了解新锐设计师第一手资料；深度访谈极具洞察力；适合寻找创意方向。', priceRange: '免费' },
    { id: 'businessoffashion', name: 'Business of Fashion', url: 'https://www.businessoffashion.com/', description: '时尚行业权威商业媒体，深度报道品牌战略、市场分析与行业动态。', category: 'trend', tags: ['商业', '行业分析', '权威'], isFree: 'freemium', logoColor: 'from-zinc-700 to-zinc-900', logoText: 'BoF', popularity: 'normal', tokenPrice: '时尚商业 · 免费+Pro', cardType: 'link', brandInfo: 'Business of Fashion（BoF），2007年创立于伦敦。全球时尚行业最具影响力的商业媒体之一。', recommendation: '行业从业者每日必读；BoF 500榜单了解行业关键人物；Professional订阅获取深度报告。', priceRange: '免费 / Professional $29.25/月' },
    { id: 'hypebeast', name: 'Hypebeast', url: 'https://hypebeast.com/', description: '全球领先街头潮流文化媒体，球鞋、街头品牌联名资讯第一站。', category: 'trend', tags: ['街头', '球鞋', '联名'], isFree: 'free', logoColor: 'from-zinc-800 to-zinc-950', logoText: 'HB', popularity: 'normal', tokenPrice: '街头潮流 · 完全免费', cardType: 'link', brandInfo: '2005年创立于香港，全球领先的街头潮流文化媒体。涵盖球鞋、街头服饰、艺术等领域，月访问量超3000万。', recommendation: '球鞋发售资讯第一站；联名预告抢先看；编辑精选内容质量高。', priceRange: '免费' },
    { id: 'thecuttingclass', name: 'The Cutting Class', url: 'https://thecuttingclass.com/', description: '专注服装结构与设计细节分析的教育博客，解析设计师剪裁手法。', category: 'trend', tags: ['结构分析', '教育', '细节'], isFree: 'free', logoColor: 'from-stone-500 to-zinc-700', logoText: 'TC', popularity: 'small', tokenPrice: '结构分析 · 完全免费', cardType: 'link', brandInfo: '专注服装结构、剪裁和设计细节深度分析的博客。通过拆解设计师作品，展示服装背后的构造原理。', recommendation: '服装设计学生必读；每篇分析都配有详细图解；帮助理解剪裁的底层逻辑。', priceRange: '免费' },
    { id: 'fashionista', name: 'Fashionista', url: 'https://fashionista.com/', description: '时尚行业新闻与职业发展媒体，关注品牌动态与人才招聘。', category: 'trend', tags: ['行业新闻', '职业', '招聘'], isFree: 'free', logoColor: 'from-rose-500 to-pink-600', logoText: 'Fa', popularity: 'small', tokenPrice: '行业新闻 · 完全免费', cardType: 'link', brandInfo: '时尚行业新闻和职业发展平台，关注品牌动态、设计师动向、零售趋势和人才招聘。', recommendation: '求职者关注招聘板块；品牌动态更新及时；行业薪资报告参考价值高。', priceRange: '免费' },
    { id: 'firstview', name: 'FirstVIEW', url: 'https://firstview.com/', description: '专业时装秀场图库，高清完整收录全球时装周Look。', category: 'trend', tags: ['秀场图库', '高清', '专业'], isFree: 'paid', logoColor: 'from-purple-500 to-violet-600', logoText: 'FV', popularity: 'small', tokenPrice: '秀场图库 · 付费订阅', cardType: 'link', brandInfo: '专业时装秀场图片库，为时尚行业从业者提供高清完整时装周图片资源。', recommendation: '完整Look高清下载；按品牌按季检索；适合买手和趋势分析师使用。', priceRange: '订阅 $295/年' },
  ];
}

// ===================== 纸样制版（知识科普类）=====================
export function getPatternWebItems(): WebItem[] {
  return [
    { id: 'basic-block', name: '基础原型', url: '#', description: '服装纸样的起点——原型样板，是所有款式变化的基础模板。', category: 'pattern', tags: ['原型', '基础', '起点'], isFree: 'free', logoColor: 'from-blue-500 to-indigo-600', logoText: '原', popularity: 'huge', tokenPrice: '纸样基础 · 核心概念', cardType: 'knowledge', level: '入门', knowledgeContent: [
      { heading: '什么是基础原型', body: '基础原型（Basic Block / Sloper）是根据人体净尺寸绘制的最基础纸样模板，不含任何缝份、放量和设计变化。它是所有款式纸样的起点，就像建筑的地基。', tips: ['原型分为上衣原型、裙原型、裤原型、袖原型等', '标准原型仅包含基本的活动放量（2-4cm）', '原型制作是纸样设计的第一步，也是最关键的一步'] },
      { heading: '原型制作方法', body: '主流原型制作方法有三种：①比例分配法（如文化式原型），根据胸围等关键尺寸按比例计算各部位尺寸；②立体裁剪法，在人体或人台上直接用白坯布立裁后取下拓印；③draping+flat pattern混合法，先立裁关键部位再平面调整。', tips: ['文化式原型（日本）最适合亚洲人体型', '新文化式原型（第8版）更贴合现代体型', '立裁法直观但需要人台，平面法精确但需要经验'] },
      { heading: '关键尺寸测量', body: '制作原型需要精确的人体数据。上衣原型需要：胸围(B)、腰围(W)、臀围(H)、背长、肩宽、颈围、袖窿深。裤原型还需要：立裆长、膝围、踝围。测量时被测者应穿紧身衣自然站立。', tips: ['胸围测量时保持皮尺水平', '腰围取腰部最细处', '所有数据建议测量2-3次取平均值'] },
    ]},
    { id: 'dart-manipulation', name: '省道转移', url: '#', description: '纸样设计核心技术：将省道转移至任意位置，实现款式变化。', category: 'pattern', tags: ['省道', '转移', '技法'], isFree: 'free', logoColor: 'from-rose-500 to-pink-600', logoText: '省', popularity: 'normal', tokenPrice: '纸样技术 · 核心技法', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '省道的作用', body: '省道（Dart）是将二维面料塑造成三维曲面的关键结构。通过缝合省道，使平面的布料贴合人体的起伏曲线（如胸凸、臀凸、肩胛骨凸起）。省道的尖端指向凸起最高点，开口在边缘。', tips: ['胸省使上衣贴合胸部曲线', '腰省收腰塑造沙漏型', '肩省处理肩胛骨凸起'] },
      { heading: '省道转移原理', body: '省道转移（Dart Manipulation）的核心原理是：以凸起点（如BP点）为圆心旋转纸样，将原省道闭合，在新位置产生等量开口。转移前后服装的合体度不变，只是造型线条改变。', tips: ['切展法：沿新省道线剪开，闭合原省道', '旋转法：以BP点为轴旋转纸样', '转移后省道长度和角度可能变化，但总量不变'] },
      { heading: '常见转移位置', body: '胸省可转移至：肩省、领口省、袖窿省、腰省、腋下省（侧缝省）。不同位置的省道产生不同的视觉效果。例如领口省优雅含蓄，腋下省隐蔽实用，肩省适合有肩线设计的款式。', tips: ['领口省适合优雅风格', '腋下省最隐蔽，适合日常穿着', '多个小省道替代一个大省道可减少缝合痕迹'] },
    ]},
    { id: 'grading', name: '推板放码', url: '#', description: '将基础码纸样按规则放大缩小为全套尺码的技术，工业化生产核心环节。', category: 'pattern', tags: ['推板', '放码', '工业'], isFree: 'free', logoColor: 'from-emerald-500 to-teal-600', logoText: '推', popularity: 'normal', tokenPrice: '工业制版 · 批量生产', cardType: 'knowledge', level: '高级', knowledgeContent: [
      { heading: '什么是推板放码', body: '推板放码（Grading）是将中间码（基准码）纸样按特定规则和放码表，系统性地放大或缩小为相邻尺码的过程。放码不是简单地等比例缩放，而是各部位按不同比例变化。', tips: ['放码基准码通常选M码或38码', '放码差值通常为2cm（如S-M-L之间胸围差2cm）', '放码需要建立放码规则表（Grading Rule）'] },
      { heading: '放码方法', body: '主要放码方法：①推档法——沿坐标轴方向移动关键点，适合规则放码；②射线法——以一个点为原点，各点沿放射方向移动，适合复杂款式；③数字放码——使用CAD软件（如Lectra、Gerber）自动计算放码，效率最高。', tips: ['推档法需要确定X/Y轴放码量', '关键点放码量参照放码规则表', '数字放码已成为行业主流'] },
      { heading: '放码规则制定', body: '放码规则基于人体测量数据和品牌定位。不同部位的放码量不同：胸围放码量最大（通常2cm/码），腰围次之，臀围与胸围接近。衣长放码通常0.5-1cm/码。高端品牌放码量偏小（更修身），快时尚偏大（更包容）。', tips: ['不同人体型需要不同放码规则', '亚洲版与欧洲版放码规则差异大', '放码后需检查各码线条流畅性'] },
    ]},
    { id: 'ease', name: '松量设计', url: '#', description: '服装与人体之间的空间余量，决定合体度与运动舒适度。', category: 'pattern', tags: ['松量', '合体度', '舒适'], isFree: 'free', logoColor: 'from-amber-500 to-orange-600', logoText: '松', popularity: 'normal', tokenPrice: '纸样参数 · 合体度控制', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '松量的定义', body: '松量（Ease）是服装尺寸与人体净尺寸之间的差值。它决定了服装与身体之间的空间。松量分为两类：①基本松量（Wearing Ease）——保证基本活动和呼吸所需的最小余量；②设计松量（Design Ease）——为实现特定造型额外增加的余量。', tips: ['紧身款基本松量约2-4cm', '合体款基本松量约5-8cm', '宽松款松量可达15cm以上'] },
      { heading: '不同部位的松量', body: '各部位松量需求不同：胸围需要较大松量（呼吸和手臂活动），约5-10cm（合体款）；腰围松量约2-5cm；臀围松量约4-8cm（坐姿需要）；袖窿围松量约2-4cm。运动装和外套的松量明显大于内衣和礼服。', tips: ['西装胸围松量通常8-10cm', '衬衫胸围松量约10-15cm', '大衣胸围松量可达20cm以上'] },
      { heading: '松量与版型的关系', body: '松量是决定服装版型（Silhouette）的关键参数。修身版（Slim Fit）松量最小，强调身体线条；合体版（Regular Fit）松量适中，兼顾美观与舒适；宽松版（Loose Fit）松量大，强调休闲感和空气感。设计师通过调整松量来实现不同的造型意图。', tips: ['松量过小影响活动且容易爆线', '松量过大显得臃肿', '不同面料厚度需要调整松量'] },
    ]},
    { id: 'seam-allowance', name: '缝份与放缝', url: '#', description: '纸样边缘预留的缝合余量，不同部位放缝量不同。', category: 'pattern', tags: ['缝份', '放缝', '工艺'], isFree: 'free', logoColor: 'from-violet-500 to-purple-600', logoText: '缝', popularity: 'small', tokenPrice: '纸样细节 · 缝合余量', cardType: 'knowledge', level: '入门', knowledgeContent: [
      { heading: '什么是缝份', body: '缝份（Seam Allowance）是纸样轮廓线之外预留的额外布料，用于缝合两片布料。缝份的宽度取决于面料特性、缝合工艺和服装类型。工业化纸样通常在净纸样基础上统一放缝。', tips: ['标准缝份通常1cm', '包缝/来去缝需要1.5cm', '弧线部位（袖窿、领口）缝份可减小到0.5-0.7cm'] },
      { heading: '不同部位的放缝量', body: '侧缝和肩缝通常放1cm；裤裆缝和弧线部位放0.7-1cm（减少厚度）；装袖袖窿放0.7-1cm；下摆放3-5cm（视款式而定）；需要修改的部位（如腰围）可放2-3cm留余量。', tips: ['弧线缝份太宽会导致不平整', '下摆缝份需考虑折边方式', '对格对条部位缝份需加宽0.5cm'] },
      { heading: '放缝注意事项', body: '放缝时要注意：①转角处缝份需垂直剪开或对齐；②弧线部位缝份需要剪牙口（Notch）以便展开；③省道尖端的缝份要逐渐收窄至零；④拉链位置缝份通常1.5cm；⑤包边部位不放缝份。', tips: ['剪牙口深度不超过缝份的一半', '对位点（Notch）在放缝后需重新标记', '工业化生产缝份需统一标准'] },
    ]},
    { id: 'notch', name: '对位标记', url: '#', description: '纸样上的剪口和点位标记，确保缝合时各部件精确对齐。', category: 'pattern', tags: ['对位', '标记', '工艺'], isFree: 'free', logoColor: 'from-cyan-500 to-blue-600', logoText: '位', popularity: 'small', tokenPrice: '纸样标记 · 对位系统', cardType: 'knowledge', level: '入门', knowledgeContent: [
      { heading: '对位标记的作用', body: '对位标记（Notch / Marking）是纸样上的剪口、孔位等标记，用于在裁剪和缝合时确保不同纸样部件精确对齐。没有对位标记，缝合时容易出现错位、歪斜或褶皱。', tips: ['剪口标记用于对齐缝合线', '打孔标记用于省道尖端、袋位等', '对位标记是工业化生产的基础'] },
      { heading: '标记类型', body: '①剪口（Notch）——在纸样边缘剪V形或U形小口，深度约3mm，用于对齐缝合位置；②打孔（Drill Hole）——在纸样内部打圆孔，标记省道尖端、口袋位置、扣位等；③刀眼——与剪口类似但更精确，工业纸样常用。', tips: ['剪口深度不超过缝份的一半', '省道打孔位置距省尖2-3cm', '关键对位点用不同数量剪口区分'] },
      { heading: '对位标记规则', body: '标准对位规则：①前后肩缝在肩点处各一个剪口；②袖山与袖窿的对位点（通常前后各一组）；③侧缝腰线位置对位；④省道开口处对位；⑤装领时领片与领窝的对位点。不同部位的剪口数量不同以便区分。', tips: ['袖山对位点通常用双剪口', '前片和后片用不同标记区分', '所有放码后的纸样需重新核对对位点'] },
    ]},
    { id: 'draping', name: '立体裁剪', url: '#', description: '在人体或人台上直接用白坯布塑形取样的裁剪方法，与平面裁剪互补。', category: 'pattern', tags: ['立裁', '人台', '创意'], isFree: 'free', logoColor: 'from-pink-500 to-rose-600', logoText: '立', popularity: 'normal', tokenPrice: '高级技法 · 创意裁剪', cardType: 'knowledge', level: '高级', knowledgeContent: [
      { heading: '什么是立体裁剪', body: '立体裁剪（Draping）是将白坯布直接在人体模型（人台）上用大头针固定、塑形、标记，然后取下拓印成纸样的裁剪方法。与平面裁剪（Flat Pattern）相比，立体裁剪更直观、更适合复杂造型和不规则设计。', tips: ['高级定制几乎全部使用立裁', '立裁能直观看到最终效果', '适合不对称设计和褶皱设计'] },
      { heading: '立裁基本步骤', body: '①准备人台和坯布——标好人台基准线，坯布熨烫平整；②粗裁坯布——大于所需尺寸约5cm余量；③固定塑形——用大头针将坯布固定在人台上，推出所需的褶皱、省道和造型线；④标记——用铅笔标记缝合线、省道线、对位点和下摆线；⑤取下拓印——将坯布取下放平，修正线条后拓印到纸样纸上。', tips: ['坯布的经纱方向要与人台垂直', '大头针方向一致便于操作', '标记时坯布需紧贴人台但不拉伸'] },
      { heading: '立裁与平裁的配合', body: '实际工作中立裁与平面裁剪通常配合使用。常见流程：①先立裁关键部位（如领口、褶皱）确定造型；②取下拓印为平面纸样；③在平面上调整和推板放码。复杂礼服可能全程立裁，简单款式可纯平面裁剪。高级定制品牌的首席版师通常精通两种技法。', tips: ['不对称设计必须用立裁', '褶皱和垂坠设计立裁更高效', '平面纸样验证后可再回到人台确认'] },
    ]},
    { id: 'pattern-terminology', name: '纸样术语', url: '#', description: '中英文纸样专业术语对照，制版师必备词汇表。', category: 'pattern', tags: ['术语', '中英对照', '专业'], isFree: 'free', logoColor: 'from-indigo-500 to-blue-600', logoText: '术', popularity: 'small', tokenPrice: '专业词汇 · 中英对照', cardType: 'knowledge', level: '入门', knowledgeContent: [
      { heading: '基础术语', body: '纸样（Pattern）、原型（Block / Sloper）、推板放码（Grading）、缝份（Seam Allowance）、对位标记（Notch）、松量（Ease）、立体裁剪（Draping）、平面裁剪（Flat Pattern Making）、省道（Dart）、褶（Pleat / Tuck）、育克（Yoke）、门襟（Placket）、挂面（Facing）。', tips: ['英文术语在国际品牌沟通中必备', '日本术语体系（文化式）与欧美有差异', '建议建立个人术语对照表'] },
      { heading: '部位术语', body: '前中线（CF / Center Front）、后中线（CB / Center Back）、袖窿（Armhole / Armscye）、BP点（Bust Point）、肩点（Shoulder Point）、颈侧点（NP / Neck Point）、侧缝（Side Seam）、公主线（Princess Line）、装袖（Set-in Sleeve）、插肩袖（Raglan Sleeve）、连身袖（Kimono Sleeve）。', tips: ['CF/CB是纸样最常用的缩写', '公主线是过胸的分割线', '袖型术语区分装袖、插肩和连身'] },
      { heading: '工艺术语', body: '来去缝（French Seam）、包缝（Flat-felled Seam）、滚边（Binding）、贴边（Facing）、里子（Lining）、衬（Interfacing）、归拔（Shaping / Pressing）、吃量（Ease / Fullness）、抽褶（Gathering）、劈缝（Press Open）、倒缝（Press to One Side）。', tips: ['来去缝适合轻薄透明面料', '衬是保持服装形状的关键', '归拔是熨烫塑形的专业技法'] },
    ]},
    { id: 'collar-drafting', name: '领型制图', url: '#', description: '从基础领窝到各种领型的纸样绘制方法。', category: 'pattern', tags: ['领型', '制图', '结构'], isFree: 'free', logoColor: 'from-rose-500 to-orange-600', logoText: '领', popularity: 'normal', tokenPrice: '纸样进阶 · 领型结构', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '领窝基础', body: '领窝（Neckline）是领型的起点。标准领窝根据颈围和肩宽绘制，前后领窝深度比为1:1.5（前深后浅）。领窝围度=颈围+松量（通常2-3cm）。', tips: ['前领深通常7-8cm', '后领深通常2.5-3cm', '领窝弧线要圆顺'] },
      { heading: '衬衫领制图', body: '衬衫领由领座和翻领组成。领座高3-3.5cm，翻领宽4-5cm。制图要点：①画领窝弧线；②以领窝弧线长为底画领座；③翻领比领座略长（差0.5-1cm）使翻折线自然。', tips: ['翻领与领座差量决定翻折效果', '领角形状可方可圆', '领座前中可加扣位'] },
      { heading: '翻领与立领', body: '①翻领——在领座基础上翻折，如西装领、大衣领；②立领——无翻折，直接竖立，如中山装领、旗袍领；③连身领——领子与衣身一体裁剪，无分割线。不同领型的制图原理不同，但都以领窝为基础。', tips: ['立领上口比下口略小才合颈', '翻领需要计算翻折量', '连身领需要立裁辅助'] },
    ]},
    { id: 'sleeve-drafting', name: '袖型制图', url: '#', description: '从基础袖窿到各种袖型的纸样设计方法。', category: 'pattern', tags: ['袖型', '制图', '结构'], isFree: 'free', logoColor: 'from-cyan-500 to-teal-600', logoText: '袖', popularity: 'normal', tokenPrice: '纸样进阶 · 袖型结构', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '袖窿基础', body: '袖窿（Armhole）是衣身上安装袖子的孔洞。袖窿深取决于胸围和款式，标准衬衫袖窿深约21-23cm。袖窿弧线由前袖窿弧线和后袖窿弧线组成，后弧线通常比前弧线略长。', tips: ['袖窿深与胸围正相关', '后袖窿弧线比前长0.5-1cm', '袖窿弧线要圆顺无棱角'] },
      { heading: '装袖制图', body: '装袖（Set-in Sleeve）是最标准的袖型。制图步骤：①测量袖窿弧线总长（AH）；②画袖长线、袖肥线（袖山高=AH/3±1cm）；③画袖山弧线——前袖山凹、后袖山凸；④袖山弧线总长=AH+吃量（2-4cm）。', tips: ['袖山高决定袖肥', '袖山吃量使袖子有立体感', '前袖山弧线比后袖山弧线凹'] },
      { heading: '插肩袖与连身袖', body: '①插肩袖——从领口直接到腋下的斜线分割，肩部无缝，休闲舒适。制图时从前领口画斜线到袖窿，袖片与衣身肩部连为一体；②连身袖——袖子与衣身完全一体，如和服袖。无袖窿缝合线，腋下有大量余量。', tips: ['插肩袖活动量最大', '连身袖需要控制腋下余量', '插肩袖分割线角度可变'] },
    ]},
    { id: 'knit-pattern', name: '针织纸样', url: '#', description: '针织面料的纸样设计原理，与梭织纸样的关键差异。', category: 'pattern', tags: ['针织', '弹性', '差异'], isFree: 'free', logoColor: 'from-violet-500 to-indigo-600', logoText: '针', popularity: 'small', tokenPrice: '纸样高级 · 针织专项', cardType: 'knowledge', level: '高级', knowledgeContent: [
      { heading: '针织与梭织的差异', body: '针织面料（Knit）具有弹性，梭织面料（Woven）几乎无弹性。因此针织纸样的松量为负值（比净尺寸小），利用面料弹性贴合身体。针织纸样的省道极少（弹性替代省道），缝合方式也不同（四线包缝替代平缝）。', tips: ['针织松量通常-5%~-15%', '弹性面料可省略省道', '针织用包缝机缝合'] },
      { heading: '弹性计算', body: '针织面料的弹性用拉伸率表示（如拉伸30%表示可拉长至原长的1.3倍）。纸样缩小量=净尺寸×（1-1/拉伸率）。例如胸围90cm、拉伸率30%：纸样胸围=90×0.23≈减少21cm，纸样胸围约69cm。', tips: ['不同方向弹性不同', '高弹面料缩小量更大', '弹性回复率也要考虑'] },
      { heading: '针织纸样要点', body: '①领口用滚边或罗纹包边，不用贴边；②袖口和下摆用罗纹口收紧；③缝份用四线包缝，不用来去缝；④针织纸样不需要放缝份（包缝自带宽度）；⑤尺寸标注用拉伸后尺寸。', tips: ['罗纹口弹性比面料大', '包缝线迹有弹性不断裂', '针织纸样比梭织简单'] },
    ]},
  ];
}

// ===================== 缝纫工艺（知识科普类）=====================
export function getSewingWebItems(): WebItem[] {
  return [
    { id: 'straight-stitch', name: '平缝', url: '#', description: '最基础的手缝针法，用于缝合两片布料或临时固定。', category: 'sewing', tags: ['基础', '手缝', '固定'], isFree: 'free', logoColor: 'from-blue-500 to-indigo-600', logoText: '平', popularity: 'huge', tokenPrice: '缝纫基础 · 核心针法', cardType: 'knowledge', level: '入门', knowledgeContent: [
      { heading: '什么是平缝', body: '平缝（Running Stitch）是最基本的手缝针法，针从面料正面穿入、背面穿出，再从正面穿入，形成等距的虚线状线迹。它是所有手缝技法的基础，简单但应用广泛。', tips: ['线迹间距均匀是质量关键', '通常间距3-5mm', '可用于假缝（临时固定）和收口'] },
      { heading: '操作方法', body: '①穿线打结——线长约手臂展开长度，末端打结；②起针——从面料折痕内穿入隐藏线结；③运针——针上下交替穿过面料，可一次穿多针提高效率；④收针——末端回缝2-3针固定，线头藏入折痕内剪断。', tips: ['运针时面料不宜拉得太紧', '针距均匀比速度更重要', '可用顶针辅助推针穿过厚面料'] },
      { heading: '应用场景', body: '平缝在服装制作中主要用于：①假缝（Basting）——正式缝合前临时固定面料位置；②抽褶——大针距平缝后拉线收褶；③明线装饰——表面可见的等距线迹；④缝补——简单的裂口修补。', tips: ['假缝线在正式缝合后需拆除', '抽褶用双线更牢固', '装饰性平缝可用绣线增加视觉效果'] },
    ]},
    { id: 'back-stitch', name: '回缝', url: '#', description: '每缝一针后退回一段再缝的针法，强度接近机缝。', category: 'sewing', tags: ['手缝', '加固', '强度'], isFree: 'free', logoColor: 'from-rose-500 to-pink-600', logoText: '回', popularity: 'normal', tokenPrice: '手缝技法 · 加固针法', cardType: 'knowledge', level: '入门', knowledgeContent: [
      { heading: '回缝的特点', body: '回缝（Backstitch）每缝一针后退回前一针终点再向前缝，形成连续无缝隙的线迹。强度远高于平缝，接近机缝效果。常用于需要承受拉力的部位，如纽扣孔、拉链两端、受力缝线。', tips: ['线迹连续无间隙', '强度接近缝纫机线迹', '适合替代缝纫机进行小范围加固'] },
      { heading: '操作方法', body: '①起针同平缝；②第一针从起点穿出；③第二针回退至第一针前方穿入，从更前方穿出；④重复后退一针、前进两针的节奏；⑤线迹在正面呈连续直线，背面呈重叠线段。', tips: ['后退距离等于前进距离的一半', '拉线力度要均匀一致', '正面线迹应连续无缝隙'] },
      { heading: '变体与应用', body: '①半回缝（Half Backstitch）——后退距离为前进距离的一半，效率更高；②全回缝（Full Backstitch）——后退至前一针终点，完全无缝隙，强度最高；③挑缝（Prick Stitch）——后退距离极小（1-2mm），正面仅露小点，用于高档手工缝制的外露线迹。', tips: ['挑缝适合高档西装手工明线', '全回缝用于受力最大部位', '半回缝兼顾效率与强度'] },
    ]},
    { id: 'french-seam', name: '来去缝', url: '#', description: '将缝份包裹在内的两次缝合技法，正面和反面都看不到毛边。', category: 'sewing', tags: ['机缝', '包边', '精致'], isFree: 'free', logoColor: 'from-emerald-500 to-teal-600', logoText: '去', popularity: 'normal', tokenPrice: '机缝工艺 · 精致包边', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '什么是来去缝', body: '来去缝（French Seam）是一种两次缝合的工艺：第一次将面料反面相对缝合（正面朝外），修剪缝份后翻转使正面相对再缝一次，将毛边包裹在内。成品正反两面都看不到毛边，非常精致。', tips: ['适合轻薄透明面料', '不适合厚重面料', '需要精确的缝份计算'] },
      { heading: '操作步骤', body: '①第一缝——面料反面相对（正面朝外），沿净线外侧0.5cm缝合一道；②修剪——将缝份修剪至0.3cm；③翻转——将面料翻转使正面相对，沿折痕熨烫；④第二缝——紧贴折痕缝合第二道（净线位置），将第一缝的毛边完全包裹；⑤劈开——将缝份劈向两侧熨烫平整。', tips: ['第一缝缝份要精确', '修剪后翻转前要熨烫', '第二缝要紧贴折痕'] },
      { heading: '应用与变体', body: '来去缝广泛应用于衬衫、裙装、童装等轻薄面料的直线缝。变体包括：①假来去缝——仅缝一次后包缝，效率更高但不够精致；②来去缝转角——在直角转角处需要特殊处理；③曲面来去缝——弧线部位需减小缝份避免不平整。', tips: ['雪纺、真丝等透明面料首选', '侧缝和公主线常用', '弧度大的部位不推荐使用'] },
    ]},
    { id: 'hemming', name: '下摆处理', url: '#', description: '服装下摆的多种收边工艺，包括折边、包边和盲缝。', category: 'sewing', tags: ['下摆', '收边', '工艺'], isFree: 'free', logoColor: 'from-amber-500 to-orange-600', logoText: '摆', popularity: 'normal', tokenPrice: '缝纫工艺 · 收边技法', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '折边（Turned Hem）', body: '最常见下摆处理方式：将面料边缘向反面折两次后缝合。第一次折0.5cm（包住毛边），第二次折2-4cm（下摆宽度）。适用于中厚面料的直线或微弧下摆。', tips: ['折前先锁边防止散边', '缝合可用明线或暗线', '弧线部位需要适当缩减折边宽度'] },
      { heading: '包边（Bound Hem）', body: '用斜裁包边条包裹面料边缘的收边方式。适合弧线下摆和不规则下摆。包边条宽度通常3-4cm，面料2cm。成品正反两面都可见包边条，可选择同色或撞色。', tips: ['斜裁包边条有弹性适合弧线', '包边条对接处需45度斜接', '轻薄面料用窄包边，厚面料用宽包边'] },
      { heading: '盲缝（Blind Hem）', body: '正面几乎看不到线迹的下摆缝法。使用特殊盲缝针法或缝纫机盲缝压脚，线迹主要在反面折边内，正面仅每隔1cm左右挑起1-2根纱线。适用于西裤、裙装、大衣等需要隐形下摆的服装。', tips: ['手工盲缝用专用弯针', '机缝盲缝需更换压脚并调整针位', '正面线迹间距越大越隐蔽'] },
    ]},
    { id: 'zipper', name: '拉链安装', url: '#', description: '各种拉链安装方法：普通拉链、隐形拉链和门筒拉链。', category: 'sewing', tags: ['拉链', '安装', '辅料'], isFree: 'free', logoColor: 'from-violet-500 to-purple-600', logoText: '链', popularity: 'normal', tokenPrice: '缝纫工艺 · 辅料安装', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '普通拉链安装', body: '普通拉链（中心拉链或侧拉链）安装方法：①将拉链正面朝下放在缝份反面；②用拉链压脚沿拉链齿边缘缝合；③缝合至拉链上下端时回缝加固；④拉开拉链检查是否平整。缝份通常1.5cm以容纳拉链宽度。', tips: ['缝合前用珠针固定拉链位置', '拉链齿两侧线距均匀', '拉链头端需留2-3cm缝份空间'] },
      { heading: '隐形拉链安装', body: '隐形拉链缝好后从正面看不到拉链，常用于裙装和连衣裙后中。需要专用隐形拉链压脚。步骤：①打开拉链，将一侧拉链齿用压脚卷起缝合；②同样缝另一侧；③关闭拉链检查效果；④拉链下方继续缝合剩余缝线。', tips: ['缝合时压脚必须卷起拉链齿', '拉链长度比开口长2-3cm', '缝合起点距拉链顶端1cm'] },
      { heading: '门筒拉链', body: '门筒拉链（门襟拉链）常见于外套、夹克和裤装。拉链安装在门筒下方，两侧有门筒盖住。门筒宽度通常3-4cm，拉链被完全遮盖。需要精确的对位和加固。', tips: ['门筒需加粘合衬保持挺括', '拉链两端用打结或回缝加固', '对位点确保拉链两侧对齐'] },
    ]},
    { id: 'buttonhole', name: '纽扣孔', url: '#', description: '手工和机缝纽扣孔的制作方法，不同面料的处理差异。', category: 'sewing', tags: ['纽扣', '孔位', '手工'], isFree: 'free', logoColor: 'from-cyan-500 to-blue-600', logoText: '扣', popularity: 'small', tokenPrice: '缝纫工艺 · 辅料细节', cardType: 'knowledge', level: '高级', knowledgeContent: [
      { heading: '纽扣孔类型', body: '纽扣孔主要分为：①直孔——直线形，最常见，适合衬衫和日常服装；②圆头孔——一端为圆形，适合外套和西服；③锁眼孔——用锁边针法包裹边缘，最高档；④鸡眼孔——金属环加固的圆孔，用于铆钉扣。', tips: ['圆头孔需用专用压脚', '锁眼孔是高级定制标志', '孔位大小为纽扣直径+2mm'] },
      { heading: '机缝纽扣孔', body: '现代缝纫机通常有自动纽扣孔功能。步骤：①用划粉或消失笔标记孔位；②安装纽扣孔压脚，设定孔长（=纽扣直径+厚度+2mm）；③缝纫机自动完成四步：左侧密缝→上端横缝→右侧密缝→下端横缝；④用拆线器或小刀在中间割开。', tips: ['先在碎布上试缝确认尺寸', '割开时两端小心不要割过头', '轻薄面料需加衬加固'] },
      { heading: '手工锁眼', body: '手工锁眼（Hand-worked Buttonhole）是高级定制的标志。步骤：①剪开孔位；②用粗线沿边缘做一圈加固线（线迹骨架）；③用锁边针法（Buttonhole Stitch）沿骨架密缝包裹边缘；④末端打结收针。每个锁眼耗时15-30分钟。', tips: ['锁边针法的环必须朝向孔内', '线迹密度约2mm一针', '丝线或锁眼专用线效果最佳'] },
    ]},
    { id: 'pressing', name: '熨烫归拔', url: '#', description: '缝制过程中的熨烫塑形技术，决定成品质感的关键工序。', category: 'sewing', tags: ['熨烫', '塑形', '归拔'], isFree: 'free', logoColor: 'from-orange-500 to-red-500', logoText: '烫', popularity: 'normal', tokenPrice: '缝纫工艺 · 塑形关键', cardType: 'knowledge', level: '高级', knowledgeContent: [
      { heading: '熨烫在缝制中的作用', body: '熨烫（Pressing）是缝制中不可省略的工序，它不仅是把布料烫平，更是通过热量和蒸汽对面料进行塑形。俗话说三分缝七分烫，好的熨烫可以弥补缝合的微小瑕疵，差的熨烫则会毁掉精致的缝线。', tips: ['每缝一道线都应立即熨烫', '缝份先劈开或倒向一侧再烫', '不同面料需要不同温度和蒸汽量'] },
      { heading: '归与拔', body: '归（Shrinking）和拔（Stretching）是高级熨烫技术。归——通过蒸汽和热量使面料某区域收缩变短变厚，如将袖山弧线多余量归进去形成立体圆弧。拔——通过拉伸使面料某区域变长变薄，如将臀部曲线拔出贴合身体。', tips: ['归拔需要大量蒸汽配合', '羊毛面料归拔效果最好', '化纤面料归拔效果有限'] },
      { heading: '熨烫工具与技巧', body: '①熨斗——推荐蒸汽量大且有温度选择的熨斗；②烫凳（Tailor\'s Ham）——曲面熨烫工具，用于袖山、胸部等弧线部位；③烫板——大面积平面，用于一般缝份；④点烫机——小型精确熨烫工具，用于领角、翻领尖等细节。', tips: ['熨烫时使用烫布防止面料烫伤', '厚重面料用高温高蒸汽', '轻薄面料用中温和烫布'] },
    ]},
    { id: 'hand-stitches', name: '手缝针法大全', url: '#', description: '服装制作中常用的8种手缝针法及其应用场景。', category: 'sewing', tags: ['手缝', '针法', '大全'], isFree: 'free', logoColor: 'from-indigo-500 to-violet-600', logoText: '针', popularity: 'small', tokenPrice: '手缝技法 · 针法汇总', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '基础针法', body: '①平缝（Running Stitch）——等距运针，用于假缝和抽褶；②回缝（Backstitch）——后退再前进，强度高；③缲缝（Slip Stitch）——斜向挑缝，用于下摆和贴边暗缝；④缭缝（Whip Stitch）——绕边缝合，用于包边和拼接。', tips: ['缲缝正面几乎看不到线迹', '缭缝适合毛边包裹', '每种针法线长建议不超过60cm'] },
      { heading: '装饰与加固针法', body: '⑤锁边针法（Buttonhole Stitch）——环状密缝，用于纽扣孔和边缘加固；⑥十字缝（Cross Stitch）——X形线迹，用于固定贴花和装饰；⑦链缝（Chain Stitch）——链环状线迹，用于装饰刺绣；⑧星缝（Star Stitch）——星形线迹，用于装饰点缀。', tips: ['锁边针法环朝内', '十字缝间距均匀美观', '链缝需保持环的大小一致'] },
      { heading: '专用针法', body: '①三角缝（Herringbone Stitch）——锯齿形线迹，用于固定衬里和防止边缘散开；②暗缲缝（Blind Slip Stitch）——完全隐藏线迹的下摆缝法；③挑缝（Prick Stitch）——正面仅露小点的回缝变体，用于高档手工明线；④抽缝（Gathering Stitch）——大针距平缝后拉线收褶。', tips: ['暗缲缝正面挑1-2根纱线', '三角缝适合弹性面料', '抽缝用双线更牢固'] },
    ]},
    { id: 'gathering', name: '抽褶工艺', url: '#', description: '通过收线使面料形成均匀褶皱的技法，增加体积和装饰效果。', category: 'sewing', tags: ['抽褶', '装饰', '体积'], isFree: 'free', logoColor: 'from-pink-500 to-rose-600', logoText: '褶', popularity: 'normal', tokenPrice: '缝纫进阶 · 褶皱技法', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '抽褶原理', body: '抽褶（Gathering）是用大针距（4-5mm）平缝后拉线收褶，使面料缩短形成均匀褶皱。抽褶量通常为原长的1.5-3倍（如抽褶后50cm，需要75-150cm面料）。抽褶广泛用于裙摆、袖山、腰头等部位。', tips: ['双线抽褶比单线更牢固', '抽褶后需均匀分布褶量', '不同面料抽褶效果不同'] },
      { heading: '抽褶方法', body: '①手缝抽褶——大针距平缝后拉线，适合小范围；②机缝抽褶——调大针距，面线张力调松，面料自动收褶；③抽褶压脚——专用压脚自动收褶，效率最高；④松紧线抽褶——在面线穿松紧线，拉松紧线收褶。', tips: ['机缝抽褶调松面线张力', '抽褶压脚效果最均匀', '松紧线抽褶适合长距离'] },
      { heading: '抽褶应用', body: '①裙摆抽褶——腰部抽褶形成蓬松裙摆；②袖山抽褶——袖山弧线抽褶形成泡泡袖；③领口抽褶——领口抽褶形成柔美褶皱；④装饰抽褶——在特定部位抽褶作为装饰。抽褶后需将抽褶部位与对应面料缝合固定。', tips: ['抽褶量决定蓬松度', '泡泡袖袖山抽褶量2-4cm', '裙摆抽褶量通常1:2或1:3'] },
    ]},
    { id: 'piping', name: '嵌线工艺', url: '#', description: '用斜裁布条包裹棉线形成立体线条的装饰技法。', category: 'sewing', tags: ['嵌线', '装饰', '高级'], isFree: 'free', logoColor: 'from-amber-500 to-yellow-600', logoText: '嵌', popularity: 'small', tokenPrice: '缝纫高级 · 装饰技法', cardType: 'knowledge', level: '高级', knowledgeContent: [
      { heading: '什么是嵌线', body: '嵌线（Piping）是用斜裁布条包裹棉线（或细绳）形成立体管状线条，缝在服装边缘或分割线处的装饰技法。嵌线使线条更加清晰、立体，是高档服装和定制服装的标志性细节。', tips: ['嵌线使分割线更立体', '是高定标志细节', '可同色或撞色'] },
      { heading: '嵌线制作', body: '①裁斜裁条——45度斜裁，宽度=2×缝份+棉线直径+0.5cm；②包裹棉线——将斜裁条对折，中间放棉线，沿棉线边缘缝合；③安装嵌线——将嵌线放在面料正面边缘，沿嵌线内侧缝合；④将面料翻折覆盖嵌线后缝合。', tips: ['斜裁条有弹性适合弧线', '棉线粗细决定立体感', '缝合要紧贴棉线'] },
      { heading: '嵌线应用', body: '①领口嵌线——领口边缘加嵌线使轮廓更清晰；②口袋嵌线——嵌线袋是西裤经典细节；③分割线嵌线——公主线、育克线等分割线加嵌线增加立体感；④边缘嵌线——袖口、下摆边缘加嵌线作为装饰。', tips: ['嵌线袋是西裤标准配置', '撞色嵌线增加设计感', '弧线嵌线需要斜裁条'] },
    ]},
    { id: 'topstitching', name: '明线工艺', url: '#', description: '服装表面可见的装饰性缝线，兼具功能与美观。', category: 'sewing', tags: ['明线', '装饰', '功能'], isFree: 'free', logoColor: 'from-blue-500 to-cyan-600', logoText: '明', popularity: 'normal', tokenPrice: '缝纫基础 · 装饰明线', cardType: 'knowledge', level: '入门', knowledgeContent: [
      { heading: '明线的作用', body: '明线（Topstitching）是缝在面料正面的可见缝线，兼具功能性和装饰性。功能上：加固缝合线、压住缝份使平整、固定贴边和翻折线。装饰上：增加线条感、强调轮廓、创造风格（如牛仔的明线是其标志性特征）。', tips: ['明线兼有功能和装饰性', '牛仔明线是风格标志', '明线使缝合更牢固'] },
      { heading: '明线类型', body: '①单明线——一道平行于边缘的缝线，最常见；②双明线——两道平行缝线，装饰性更强；③装饰明线——用对比色或粗线缝合，强调线条；④链式明线——用链式线迹缝合，复古感强（如牛仔裤的链式裤边）。', tips: ['单明线间距通常0.1-0.5cm', '双明线间距0.5-1cm', '牛仔裤用橙黄色链式明线'] },
      { heading: '明线技巧', body: '①明线针距比暗缝略大（3-3.5mm）；②面线张力略松避免起皱；③使用明线压脚（带导向）确保线距均匀；④转角处针留在落下位置，抬起压脚转向后放下继续缝；⑤长距离明线用导向条辅助直线。', tips: ['明线用专用压脚', '转角处不抬针', '粗线明线需换大号针'] },
    ]},
  ];
}

// ===================== 辅料与工艺细节（知识科普类）=====================
export function getAccessoryWebItems(): WebItem[] {
  return [
    { id: 'interfacing', name: '粘合衬', url: '#', description: '服装中起支撑定型作用的内部材料，决定领子、门襟等部位的挺括度。', category: 'accessory', tags: ['衬布', '定型', '支撑'], isFree: 'free', logoColor: 'from-blue-500 to-indigo-600', logoText: '衬', popularity: 'huge', tokenPrice: '辅料核心 · 定型基础', cardType: 'knowledge', level: '入门', knowledgeContent: [
      { heading: '粘合衬的作用', body: '粘合衬（Interfacing / Fusible Interlining）是粘贴在面料反面的支撑材料，通过热熔胶在高温下与面料粘合。它赋予服装部件（领子、门襟、袖口、腰头）所需的挺括度、弹性和保型性，是现代服装制造不可或缺的辅料。', tips: ['不同部位需要不同厚度的衬', '衬的厚度不能超过面料厚度', '粘合衬分有纺和无纺两种'] },
      { heading: '粘合衬类型', body: '①有纺粘合衬——以机织或针织布为底布，手感好、透气性强，适合中高档服装；②无纺粘合衬——以纤维直接压制而成，成本低、易裁剪，适合衬衫领和袖口；③树脂领衬——硬挺度极高，专门用于衬衫领；④腰头衬——专为裤腰设计，保持腰头平整。', tips: ['有纺衬经纬方向需与面料一致', '针织衬适合弹力面料', '树脂领衬使衬衫领立挺'] },
      { heading: '粘合工艺', body: '粘合步骤：①将衬的胶面朝下放在面料反面；②用熨斗（温度140-160度）按压10-15秒；③冷却后检查粘合强度。注意：不同衬的粘合温度和时间不同，建议先在碎布上试粘。大面积粘合建议使用专业压烫机。', tips: ['粘合时不能移动熨斗（只按压）', '蒸汽会增加粘合难度', '粘合后需冷却再移动面料'] },
    ]},
    { id: 'buttons', name: '纽扣', url: '#', description: '服装扣合件，材质、形状和尺寸的全面知识。', category: 'accessory', tags: ['纽扣', '扣合', '材质'], isFree: 'free', logoColor: 'from-rose-500 to-pink-600', logoText: '扣', popularity: 'normal', tokenPrice: '辅料大全 · 扣合系统', cardType: 'knowledge', level: '入门', knowledgeContent: [
      { heading: '纽扣材质', body: '①天然材质——贝壳扣（高档、光泽好）、木质扣（自然、文艺）、骨质扣（传统、复古）、椰壳扣（手工感）；②合成材质——树脂扣（最常见、可仿各种效果）、ABS塑料扣（轻便、便宜）、亚克力扣（透明感）；③金属材质——铜扣（高档、做旧效果）、锌合金扣（可铸复杂造型）、不锈钢扣（防锈）。', tips: ['贝壳扣适合高档衬衫', '金属扣需注意防锈处理', '树脂扣性价比最高'] },
      { heading: '纽扣尺寸', body: '纽扣尺寸用号（Ligne，缩写L）表示，1L约等于0.635mm。常见尺寸：18L（11mm，衬衫领扣）、24L（15mm，衬衫门襟扣）、28L（18mm，外套小扣）、36L（23mm，外套大扣）、44L（28mm，大衣扣）。纽扣孔位通常2孔或4孔，还有1孔（暗眼）和无孔（铆钉扣）之分。', tips: ['衬衫通常用18-24L', '大衣通常用36-44L', '四孔扣缝X形或平行两种方式'] },
      { heading: '扣合方式', body: '①普通扣合——纽扣穿过纽扣孔；②暗扣（按扣）——按压扣合，表面不可见；③铆钉扣——用铆钉工具固定在面料上（常见于牛仔裤）；④装饰扣——不具扣合功能，仅起装饰作用；⑤包扣——用面料包裹的纽扣，与服装同色同料。', tips: ['暗扣适合需要平整外观的部位', '包扣是高级定制细节', '铆钉扣需要专用安装工具'] },
    ]},
    { id: 'zippers', name: '拉链', url: '#', description: '拉链类型、规格和选用指南，不同部位适用不同拉链。', category: 'accessory', tags: ['拉链', '扣合', '规格'], isFree: 'free', logoColor: 'from-emerald-500 to-teal-600', logoText: '链', popularity: 'normal', tokenPrice: '辅料大全 · 扣合系统', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '拉链类型', body: '①尼龙拉链——轻柔、便宜、颜色丰富，常用于连衣裙、裙装；②树脂拉链（塑钢拉链）——齿为塑料，耐热、色彩鲜艳，常用于外套、运动服；③金属拉链——铜/铝齿，坚固、有质感，常用于牛仔裤、皮衣；④隐形拉链——拉链齿在反面，正面不可见，常用于裙装后中。', tips: ['尼龙拉链可弯曲适合弧线', '金属拉链质感好但较重', '隐形拉链需专用压脚安装'] },
      { heading: '拉链规格', body: '拉链规格用号表示齿的宽度：3号（齿宽3mm，轻薄面料）、5号（齿宽5mm，常规面料）、8号（齿宽8mm，厚重面料）、10号（齿宽10mm，大衣/包袋）。拉链长度从10cm到120cm不等，可按需截断。拉链分开口拉链（可完全分开，如外套）和闭口拉链（底端闭合，如裤装）。', tips: ['3号适合薄衬衫', '5号最常用于日常服装', '开口拉链有插销和插座'] },
      { heading: '拉链配件', body: '①拉链头（Slider）——控制拉链开合，有自锁和非自锁之分；②上下止——防止拉链头脱落，上止在上端、下止在下端；③插销插座——开口拉链底端的分离/连接装置；④拉片——拉链头上的拉手，可定制Logo。', tips: ['自锁拉链头拉下后自动锁定', '拉片可更换实现个性化', '上下止脱落需及时更换'] },
    ]},
    { id: 'thread', name: '缝纫线', url: '#', description: '缝纫线的材质、支数和选用原则，不同面料适用不同线材。', category: 'accessory', tags: ['线材', '缝线', '规格'], isFree: 'free', logoColor: 'from-amber-500 to-orange-600', logoText: '线', popularity: 'normal', tokenPrice: '辅料基础 · 线材知识', cardType: 'knowledge', level: '入门', knowledgeContent: [
      { heading: '缝纫线材质', body: '①涤纶线（Polyester）——最常用，强度高、弹性好、耐热耐化学、不起毛，适合绝大多数面料；②棉线——柔软、耐高温（可高温熨烫），但强度较低，适合纯棉面料和手缝；③丝线——光泽好、强度高，用于高档丝绸和手工锁眼；④尼龙线（透明线）——隐形效果，用于透明面料和串珠固定。', tips: ['涤纶线是日常首选', '丝线用于高档手工', '透明线适合特殊需求'] },
      { heading: '线的规格', body: '缝纫线粗细用支数或号表示。常见规格：60s/2（最细，轻薄面料）、60s/3（标准，衬衫和薄外套）、40s/2（中等，常规面料）、40s/3（较粗，牛仔和厚外套）、20s/2（最粗，皮革和帆布）。数字越大线越细，斜杠后的数字表示股数。', tips: ['60s/2适合雪纺和真丝', '40s/2是通用首选', '20s/2适合厚牛仔布'] },
      { heading: '选线原则', body: '选线遵循三匹配原则：①与面料材质匹配——涤纶面料用涤纶线、棉面料用棉线；②与面料厚度匹配——薄面料用细线、厚面料用粗线；③与面料颜色匹配——通常选比面料深半色的线（缝线在正面略有阴影）。特殊需求：对比色装饰线、双色渐变线等。', tips: ['缝线颜色宁深勿浅', '弹力面料用弹力线（包芯线）', '装饰明线可选用对比色'] },
    ]},
    { id: 'fasteners', name: '暗扣与钩扣', url: '#', description: '隐藏式扣合件：暗扣、四合扣、钩扣和魔术贴。', category: 'accessory', tags: ['暗扣', '钩扣', '隐藏'], isFree: 'free', logoColor: 'from-violet-500 to-purple-600', logoText: '暗', popularity: 'small', tokenPrice: '辅料大全 · 隐藏扣合', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '暗扣（按扣）', body: '暗扣（Snap Fastener）由凹凸两片组成，按压扣合。分为：①缝制暗扣——用线缝在面料上，常见4分/6分/8分（直径）；②五爪暗扣——金属爪脚穿过面料后翻压固定，需专用工具；③磁吸暗扣——内置磁铁，吸力大，常用于包袋。', tips: ['暗扣适合不需要频繁开合的部位', '缝制暗扣位置需加衬加固', '磁吸暗扣注意远离信用卡'] },
      { heading: '四合扣', body: '四合扣（Snap Button）由面扣、母扣、子扣、底扣四个部件组成，通过铆合固定在面料上。安装需专用四合扣工具（手压机或手动模具）。常用于童装、休闲外套和帆布包。四合扣安装牢固、开合手感清脆、外观整齐。', tips: ['安装前务必加衬加固', '面扣花型可定制', '手压机安装效果最均匀'] },
      { heading: '钩扣与魔术贴', body: '①钩扣（Hook and Eye）——金属钩加环组成，常用于裤腰、裙腰和内衣，隐蔽性极高；②领钩——小型钩扣，用于衬衫领和旗袍领；③魔术贴（Velcro）——尼龙搭扣，分毛面和刺面，开合方便但耐久性有限，常用于童装、鞋类和运动护具。', tips: ['钩扣缝制时针脚要密', '领钩比普通钩扣更小更细', '魔术贴不适合需要精确对位的部位'] },
    ]},
    { id: 'lining', name: '里布与衬里', url: '#', description: '服装内部衬里材料的选择与安装，影响穿着舒适度和服装品质。', category: 'accessory', tags: ['里布', '衬里', '舒适'], isFree: 'free', logoColor: 'from-cyan-500 to-blue-600', logoText: '里', popularity: 'small', tokenPrice: '辅料大全 · 内部材料', cardType: 'knowledge', level: '高级', knowledgeContent: [
      { heading: '里布的作用', body: '里布（Lining）是缝合在服装内部的衬里面料，主要功能：①遮盖内部缝份和衬布，提升内部整洁度；②减少面料与身体的摩擦，方便穿脱；③为服装提供额外支撑和保型性；④增加保暖性（冬季服装）；⑤防止透明面料走光。', tips: ['高档服装几乎都有里布', '里布颜色通常与面料同色或深色', '夏季服装可用半里（仅上半身有里）'] },
      { heading: '里布材质选择', body: '①涤纶里布——最常用，光滑、耐磨、便宜，适合外套和裙装；②铜氨里布（宾霸Bemberg）——透气、吸湿、抗静电，高端服装首选；③真丝里布——最奢华，轻薄透气有光泽，用于高级定制；④针织里布——有弹性，适合弹力面料的服装。', tips: ['铜氨里布性价比最高', '真丝里布是高定标志', '里布缩水率需与面料匹配'] },
      { heading: '里布安装方法', body: '①全里——整件服装内部全部安装里布，最高档；②半里——仅上半身或前片有里布，适合夏季西装；③兜里——仅口袋部位有里布，最经济。里布与面料的连接方式：①面里分别缝合后在领口/袖窿处对接；②里布比面料略大（0.3-0.5cm松量）避免紧绷；③下摆处里布比面料短1-2cm。', tips: ['里布需要松量不能紧绷', '袖子里布用不同颜色区分前后', '下摆处面里要有落差'] },
    ]},
    { id: 'shoulder-pad', name: '肩垫', url: '#', description: '服装肩部支撑件，塑造肩部线条和廓形。', category: 'accessory', tags: ['肩垫', '支撑', '廓形'], isFree: 'free', logoColor: 'from-indigo-500 to-blue-600', logoText: '肩', popularity: 'normal', tokenPrice: '辅料进阶 · 廓形支撑', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '肩垫的作用', body: '肩垫（Shoulder Pad）安装在服装肩部内侧，用于塑造和支撑肩部线条。不同厚度的肩垫创造不同廓形：薄肩垫（0.5-1cm）使肩线自然；中厚肩垫（1-2cm）塑造结构化肩线；厚肩垫（2-3cm）创造强势夸张的肩部造型。', tips: ['西装必须用肩垫', '厚肩垫创造强势廓形', '薄肩垫适合针织服装'] },
      { heading: '肩垫类型', body: '①棉花肩垫——手工铺棉缝制，最贴合人体，用于高档定制；②海绵肩垫——模压成型，轻便便宜，用于成衣；③针刺肩垫——针刺棉压缩成型，介于棉花和海绵之间；④隐形肩垫——超薄透明，用于轻薄面料。', tips: ['棉花肩垫是高定标配', '海绵肩垫最常见', '隐形肩垫适合真丝'] },
      { heading: '肩垫安装', body: '肩垫安装在袖窿和肩缝交界处，用三角针法或暗缝固定在里布上。安装要点：①肩垫中线对准肩缝线；②肩垫前缘覆盖前袖窿1-2cm；③肩垫后缘覆盖后袖窿2-3cm；④肩垫不可在正面看到。', tips: ['肩垫中线对准肩缝', '后缘覆盖比前缘多', '用暗缝固定在里布上'] },
    ]},
    { id: 'ribbon-trim', name: '织带与花边', url: '#', description: '装饰性织带、蕾丝花边和镶边的类型与应用。', category: 'accessory', tags: ['花边', '织带', '装饰'], isFree: 'free', logoColor: 'from-rose-500 to-pink-600', logoText: '花', popularity: 'normal', tokenPrice: '辅料基础 · 装饰材料', cardType: 'knowledge', level: '入门', knowledgeContent: [
      { heading: '织带类型', body: '①缎带——光滑亮面，常用于蝴蝶结和腰带；②罗纹带——有棱纹，挺括有型，用于滚边和束带；③丝绒带——绒面质感，复古华丽，用于冬季装饰；④棉织带——哑光自然，用于休闲和童装；⑤提花带——有提花图案，高档装饰。', tips: ['缎带最常用', '丝绒带适合冬季', '提花带最高档'] },
      { heading: '花边类型', body: '①蕾丝花边——镂空花纹，浪漫优雅，用于内衣和礼服；②刺绣花边——在网纱上刺绣图案，立体感强；③水溶花边——水溶纸上的刺绣，独立成型；④抽褶花边——已抽褶的花边，直接缝合使用；⑤包边花边——带包边边的花边，用于边缘装饰。', tips: ['蕾丝花边最浪漫', '水溶花边可独立成型', '抽褶花边使用最方便'] },
      { heading: '花边应用', body: '①领口花边——沿领口缝合装饰花边；②下摆花边——裙摆或袖口装饰花边；③拼接花边——在分割线处嵌入花边增加层次；④叠层花边——多层花边叠加创造体积感。花边安装时需注意不要拉伸变形，弧线部位用斜裁或打剪口。', tips: ['花边不能拉伸变形', '弧线部位打剪口', '多层叠放创造蓬松感'] },
    ]},
    { id: 'elastic', name: '松紧带', url: '#', description: '弹性辅料的选择与安装，用于腰部、袖口等收口部位。', category: 'accessory', tags: ['松紧', '弹性', '收口'], isFree: 'free', logoColor: 'from-emerald-500 to-green-600', logoText: '弹', popularity: 'normal', tokenPrice: '辅料基础 · 弹性辅料', cardType: 'knowledge', level: '入门', knowledgeContent: [
      { heading: '松紧带类型', body: '①编织松紧带——最常见的松紧带，透气柔软，用于腰头；②针织松紧带——有弹性纹路，较厚，用于运动装；③透明松紧带——透明硅胶材质，用于透明面料；④花边松紧带——带花边装饰，用于内衣物；⑤包布松紧带——外面包裹布料，用于高档服装。', tips: ['编织松紧带最常用', '透明松紧带适合薄面料', '包布松紧带最高档'] },
      { heading: '松紧带规格', body: '松紧带宽度决定用途：①1cm以下——袖口、裤脚口；②1-2cm——内裤腰、童装腰；③2-3cm——裙腰、裤腰；④3-5cm——宽腰头。松紧带长度通常比实际部位短10-15%（如腰围70cm，松紧带长60-63cm）。', tips: ['松紧带比腰围短10-15%', '宽松紧带收力更均匀', '窄松紧带适合小部位'] },
      { heading: '松紧带安装', body: '①穿入法——做好通道后用安全针穿入松紧带，两端缝合固定；②缝合法——将松紧带拉紧后直接缝合在面料上（Z字形线迹）；③包边法——松紧带放在折边内，用之字形线迹缝合同时拉伸。安装后检查松紧度是否合适。', tips: ['穿入法最常见', '缝合法需拉伸缝合', '包边法适合薄面料'] },
    ]},
    { id: 'eyelet-grommet', name: '鸡眼与气眼', url: '#', description: '金属环扣件，加固孔位并增加装饰效果。', category: 'accessory', tags: ['鸡眼', '气眼', '金属'], isFree: 'free', logoColor: 'from-orange-500 to-amber-600', logoText: '眼', popularity: 'small', tokenPrice: '辅料高级 · 金属配件', cardType: 'knowledge', level: '高级', knowledgeContent: [
      { heading: '鸡眼与气眼的区别', body: '鸡眼（Eyelet/Grommet）和气眼（Grommet）都是金属环扣件，区别在于：鸡眼通常较小（内径3-8mm），双面金属环；气眼较大（内径8-20mm），常配合绳带使用。两者都需要专用安装工具（手压机或锤击模具）。', tips: ['鸡眼小、气眼大', '两者都需要专用工具', '鸡眼更精致'] },
      { heading: '安装方法', body: '①在面料上标记孔位；②用冲孔器或剪刀开孔（孔径略小于鸡眼内径）；③将鸡眼下环从孔中穿出；④放上上环；⑤用安装工具铆合上下环。安装前需在面料反面加衬布加固，防止面料撕裂。', tips: ['开孔略小于鸡眼内径', '安装前加衬布', '铆合要均匀受力'] },
      { heading: '应用场景', body: '①鞋带孔——运动鞋和帆布鞋的穿带孔；②束绳口——卫衣帽口、运动裤腰的穿绳孔；③通风孔——夏季服装的装饰透气孔；④装饰孔——排列组合形成图案；⑤窗帘孔——窗帘杆穿过的大气眼。', tips: ['运动鞋孔最常见', '束绳口用大气眼', '装饰孔可排列成图案'] },
    ]},
  ];
}

// ===================== 设计构成（知识科普类）=====================
export function getCompositionWebItems(): WebItem[] {
  return [
    { id: 'silhouette', name: '廓形与外轮廓', url: '#', description: '服装外轮廓线条是设计的第一语言，决定整体视觉印象。', category: 'composition', tags: ['廓形', '轮廓', '基础'], isFree: 'free', logoColor: 'from-blue-500 to-indigo-600', logoText: '廓', popularity: 'huge', tokenPrice: '设计构成 · 核心概念', cardType: 'knowledge', level: '入门', knowledgeContent: [
      { heading: '什么是廓形', body: '廓形（Silhouette）是服装的外轮廓线条，即穿着后服装在空间中呈现的整体形状。它是设计师表达设计理念的第一语言，也是观者对服装的第一印象。廓形决定了服装的体积感、比例和风格倾向。', tips: ['廓形是服装设计的骨架', '同一廓形可演绎无数款式', '廓形变化是每季趋势的核心'] },
      { heading: '经典廓形分类', body: '①A型——上窄下宽，如A字裙、伞裙，优雅柔美；②H型——直筒形，肩宽等于下摆宽，中性利落；③X型——肩宽加收腰加宽下摆，如沙漏型，经典女性化；④O型——圆润茧型，肩部和下摆收窄、中部蓬松，前卫有趣；⑤T型——肩宽下窄，如蝙蝠袖上衣，强势有力；⑥Y型——上宽下窄的倒三角，如宽肩收腰裙。', tips: ['A型适合掩盖臀腿', 'H型最中性百搭', 'X型最经典优雅'] },
      { heading: '廓形与人体', body: '廓形通过在人体基础上增加或减少空间来创造。增加空间（松量、填充、支撑）产生膨胀效果（如蓬蓬裙、泡泡袖）；减少空间（省道、收紧、弹性）产生贴合效果（如紧身裙、束腰）。设计师通过调整不同部位的空间量来创造无数廓形变化。', tips: ['廓形空间量决定风格', '膨胀产生戏剧化和力量感', '贴合产生性感和优雅'] },
    ]},
    { id: 'proportion', name: '比例与分割', url: '#', description: '服装各部位之间的比例关系，黄金比例在设计中的应用。', category: 'composition', tags: ['比例', '分割', '黄金比'], isFree: 'free', logoColor: 'from-rose-500 to-pink-600', logoText: '比', popularity: 'normal', tokenPrice: '设计构成 · 比例法则', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '比例的重要性', body: '比例（Proportion）是服装各部位尺寸之间的对比关系。好的比例让服装视觉舒适、层次分明；差的比例则显得别扭、失衡。比例不仅影响美观，还能调整穿着者的视觉身高和体型。', tips: ['比例是设计的节奏感', '上下身比例最影响整体观感', '腰带位置是调节比例的关键'] },
      { heading: '黄金比例应用', body: '黄金比例（1:1.618）在服装设计中的应用：①上下身分割——上身占3/8、下身占5/8时视觉最舒适（高腰线设计）；②叠穿层次——外套与内搭的长度比建议3:5或5:8；③色彩面积——主色60%、辅色30%、点缀色10%的经典配色比例。', tips: ['高腰线（腰线在胸下）拉长腿部', '三分法比二分法更有层次感', '小面积亮色比大面积更出彩'] },
      { heading: '分割线设计', body: '分割线（Seam Lines）是调整比例的重要工具。①横向分割线——如腰线、育克线，改变上下比例；②纵向分割线——如公主线、侧缝线，改变宽度视觉；③斜向分割线——如不对称设计，增加动感和个性。分割线的位置、数量和方向共同决定服装的比例关系。', tips: ['公主线使视觉纵向延伸显瘦', '横向分割线位置决定腰线高度', '不对称分割增加设计感'] },
    ]},
    { id: 'balance', name: '平衡与对称', url: '#', description: '对称平衡与不对称平衡在服装设计中的运用。', category: 'composition', tags: ['平衡', '对称', '不对称'], isFree: 'free', logoColor: 'from-emerald-500 to-teal-600', logoText: '衡', popularity: 'normal', tokenPrice: '设计构成 · 平衡法则', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '对称平衡', body: '对称平衡（Symmetrical Balance）是以中轴线为界，左右两侧完全或基本相同的平衡方式。对称设计给人庄重、稳定、经典的感觉，是礼服、制服、正装的首选。完全对称有时会显得呆板，设计师常通过细节变化（如口袋、纽扣位置）打破过于严格的对称。', tips: ['正装几乎都是对称设计', '完全对称可能显得保守', '微小的左右差异增加趣味性'] },
      { heading: '不对称平衡', body: '不对称平衡（Asymmetrical Balance）是左右两侧不同但视觉重量相等的平衡方式。通过颜色、面积、质感、位置等元素的巧妙搭配，使不对称的两侧达到视觉平衡。不对称设计更有张力、更具现代感，常见于前卫设计和潮流品牌。', tips: ['一侧大色块加另一侧小亮点可平衡', '斜线是不对称设计的利器', '不对称领口和下摆最常见'] },
      { heading: '平衡的要素', body: '影响视觉平衡的要素：①大小——大区域比小区域重；②颜色——深色/暖色比浅色/冷色重；③质感——粗糙/复杂比光滑/简单重；④位置——远离中轴线的元素比近的重。设计师通过调整这些要素来创造或打破平衡。', tips: ['深色上衣加浅色下装等于上重下轻', '大图案比小图案视觉更重', '平衡不等于对称'] },
    ]},
    { id: 'rhythm', name: '节奏与韵律', url: '#', description: '通过重复、渐变和交替创造服装的视觉节奏感。', category: 'composition', tags: ['节奏', '韵律', '重复'], isFree: 'free', logoColor: 'from-amber-500 to-orange-600', logoText: '奏', popularity: 'normal', tokenPrice: '设计构成 · 节奏法则', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '什么是视觉节奏', body: '节奏（Rhythm）是设计元素以特定规律重复或变化时产生的视觉韵律感。在服装设计中，通过纽扣间距、褶皱排列、图案重复、色彩渐变等方式创造节奏，使服装产生流动感和生命力。', tips: ['节奏让服装动起来', '等距重复产生秩序感', '渐变重复产生流动感'] },
      { heading: '节奏的类型', body: '①重复节奏——相同元素等距重复，如纽扣、百褶裙的褶、条纹；②渐变节奏——元素按规律逐渐变化，如由小到大的圆点、由深到浅的色彩渐变；③交替节奏——两种或多种元素交替出现，如A-B-A-B的色块交替；④放射节奏——元素从一个中心点向外放射，如裙摆的放射褶。', tips: ['百褶裙是重复节奏的典范', '渐变染色是渐变节奏', '放射褶裙摆最具戏剧性'] },
      { heading: '节奏与情绪', body: '不同节奏类型传达不同情绪：①均匀重复——秩序、稳定、经典（如条纹衫）；②快速密集重复——紧张、活泼、年轻（如波点）；③缓慢渐变——柔和、优雅、流动（如渐变染色）；④不规则节奏——前卫、叛逆、个性（如不规则剪裁）。', tips: ['条纹是永恒的经典节奏', '波点适合活泼风格', '不规则节奏要有节制'] },
    ]},
    { id: 'color-theory', name: '色彩搭配', url: '#', description: '服装配色的基本原理：色相、明度、纯度与经典配色方案。', category: 'composition', tags: ['色彩', '配色', '原理'], isFree: 'free', logoColor: 'from-violet-500 to-purple-600', logoText: '色', popularity: 'normal', tokenPrice: '设计构成 · 色彩原理', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '色彩三要素', body: '①色相（Hue）——颜色的名称，如红、黄、蓝。色相环上相对180度为互补色、120度为对比色、60度为邻近色；②明度（Value）——颜色的明暗程度，加白提亮、加黑变暗。明度差越大对比越强；③纯度（Saturation）——颜色的鲜艳程度，纯度越高越鲜艳、越低越灰。', tips: ['明度差是配色对比的关键', '降低纯度使色彩更高级', '色相环是配色的基础工具'] },
      { heading: '经典配色方案', body: '①单色配色——同一色相不同明度纯度，安全优雅；②邻近色配色——色相环上相邻2-3色，和谐统一；③互补色配色——色相环上相对两色，对比强烈（如红配绿、蓝配橙）；④三角色配色——色相环上等距三色，活泼丰富（如红-黄-蓝）；⑤分割互补色——互补色中一方用其两侧邻近色替代，对比稍缓。', tips: ['单色配色最安全适合日常', '互补色面积比建议1:3避免冲突', '60-30-10法则：主色60%加辅色30%加点缀10%'] },
      { heading: '配色与风格', body: '不同配色方案传达不同风格：①高明度低纯度（浅灰系/莫兰迪）——温柔、高级、文艺；②低明度高纯度（深色鲜艳）——浓烈、戏剧、个性；③中性色加一个亮色——经典、利落、有重点（如黑加红）；④全身同色（All Black / All White）——极简、前卫、有力。', tips: ['莫兰迪色系适合文艺风格', 'All Black永远不过时', '一个亮色提亮整体造型'] },
    ]},
    { id: 'fabric-drape', name: '面料与垂坠', url: '#', description: '面料的悬垂性如何影响服装廓形和设计表现。', category: 'composition', tags: ['面料', '垂坠', '悬垂'], isFree: 'free', logoColor: 'from-cyan-500 to-blue-600', logoText: '垂', popularity: 'small', tokenPrice: '设计构成 · 面料表现', cardType: 'knowledge', level: '高级', knowledgeContent: [
      { heading: '什么是悬垂性', body: '悬垂性（Drape）是面料在重力作用下自然下垂并形成褶皱的能力。悬垂性好的面料（如真丝乔其纱、雪纺）能产生柔软流畅的垂褶；悬垂性差的面料（如厚毛呢、棉布）保持自身形状不轻易下垂。悬垂性是设计师选择面料时的核心考量之一。', tips: ['悬垂性与面料重量、组织、纤维有关', '真丝和雪纺悬垂性最好', '帆布和毛呢几乎不垂坠'] },
      { heading: '悬垂性与廓形', body: '面料悬垂性直接决定服装的廓形表现：①高悬垂性面料——产生贴合身体的流线型廓形，适合A型、X型设计，如真丝连衣裙；②低悬垂性面料——保持结构化廓形，适合H型、T型设计，如结构化西装；③中等悬垂性——兼顾结构与流动，如薄毛呢大衣。', tips: ['宽松设计用高悬垂性面料', '结构设计用低悬垂性面料', '混搭不同悬垂性增加层次'] },
      { heading: '垂坠设计技法', body: '设计师利用面料垂坠性创造特殊效果：①垂褶（Draping）——利用面料自身重量形成自然褶皱，如古希腊式垂褶裙；②斜裁（Bias Cut）——45度斜向裁剪使面料获得最大弹性和垂坠感，如斜裁丝裙；③抓褶——在特定点固定面料产生放射状垂褶，如抓褶礼服。', tips: ['斜裁是真丝连衣裙的经典技法', '垂褶设计需要至少3倍松量', '抓褶位置决定褶皱方向'] },
    ]},
    { id: 'detail-design', name: '细节设计', url: '#', description: '领口、袖型、口袋等细节元素的设计变化与风格表达。', category: 'composition', tags: ['细节', '领口', '袖型'], isFree: 'free', logoColor: 'from-indigo-500 to-violet-600', logoText: '细', popularity: 'small', tokenPrice: '设计构成 · 细节元素', cardType: 'knowledge', level: '高级', knowledgeContent: [
      { heading: '领口设计', body: '领口（Neckline）是服装最靠近脸部的线条，对整体风格影响极大。常见领型：①圆领——经典百搭，适合日常；②V领——拉长颈部线条，显脸小；③方领——复古优雅，法式风格；④一字领——横向延伸肩线，优雅性感；⑤立领——干练利落，中式韵味；⑥船领——优雅窄肩，法式经典；⑦心形领——甜美浪漫，常见于礼服。', tips: ['V领适合圆脸和短颈', '方领适合长脸', '圆脸避免高领'] },
      { heading: '袖型设计', body: '袖子（Sleeve）变化丰富，是设计表达的重要部位：①装袖——最标准，袖山与袖窿缝合；②插肩袖——从领口直接到腋下，肩部无缝，休闲运动；③连身袖——袖子与衣身一体，东方风格；④泡泡袖——袖山蓬起，浪漫复古；⑤灯笼袖——上下蓬松中间收紧，戏剧化；⑥喇叭袖——袖口张开，飘逸柔美；⑦主教袖——长泡泡袖，维多利亚风格。', tips: ['泡泡袖适合窄肩', '插肩袖最休闲舒适', '喇叭袖增加女性柔美感'] },
      { heading: '口袋设计', body: '口袋（Pocket）兼具功能和装饰性：①贴袋——缝在面料表面，休闲实用；②插袋——开口在侧缝或分割线中，隐蔽简洁；③嵌线袋——袋口有嵌线装饰，正装标配；④翻盖袋——有翻盖覆盖，工装经典；⑤假口袋——仅装饰无实用功能。口袋的位置、大小、形状和数量都是设计语言。', tips: ['贴袋增加休闲感', '嵌线袋最正式', '口袋位置影响视觉重心'] },
    ]},
    { id: 'texture', name: '纹理与图案', url: '#', description: '面料纹理和印花图案在设计中的视觉表现。', category: 'composition', tags: ['纹理', '图案', '视觉'], isFree: 'free', logoColor: 'from-amber-500 to-orange-600', logoText: '纹', popularity: 'normal', tokenPrice: '设计进阶 · 纹理图案', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '纹理的类型', body: '面料纹理分为：①触觉纹理——实际可触摸的表面质感（如丝绸光滑、羊毛粗糙）；②视觉纹理——视觉效果上的质感（如印花仿木纹）。设计时可将不同纹理组合搭配，创造丰富的层次感。', tips: ['触觉纹理可触摸', '视觉纹理是视觉效果', '混搭纹理增加层次'] },
      { heading: '图案的分类', body: '①具象图案——可辨识的物体（如花卉、动物、几何）；②抽象图案——无具体形象（如色块、线条）；③条纹——横向、纵向或斜向条纹；④波点——大小不同的圆点；⑤格纹——方格、菱格、苏格兰格。不同图案传达不同风格。', tips: ['花卉图案浪漫', '条纹经典百搭', '格纹英伦风'] },
      { heading: '图案搭配', body: '图案搭配原则：①同类型图案可混搭（如不同大小的波点）；②对比类型图案需谨慎（如条纹配格纹）；③图案面积要有主次（大图案为主、小图案为辅）；④图案与素色搭配最安全。印花面料设计时要注意图案位置和对位。', tips: ['同类型图案可混搭', '大图案为主小为辅', '图案+素色最安全'] },
    ]},
    { id: 'layering', name: '层次与叠穿', url: '#', description: '多件服装叠加穿着的层次设计原理。', category: 'composition', tags: ['层次', '叠穿', '搭配'], isFree: 'free', logoColor: 'from-cyan-500 to-blue-600', logoText: '层', popularity: 'normal', tokenPrice: '设计进阶 · 层次搭配', cardType: 'knowledge', level: '进阶', knowledgeContent: [
      { heading: '层次的作用', body: '层次（Layering）是通过多件服装叠加创造视觉深度和丰富感。层次设计不仅增加保暖性（实用功能），更是表达个人风格和设计理念的重要手段。好的层次搭配让整体造型有深度、有故事。', tips: ['层次增加视觉深度', '兼有保暖功能', '是风格表达的重要手段'] },
      { heading: '叠穿原则', body: '①内紧外松——贴身内搭加宽松外套，层次分明；②内长外短——内搭露出下摆创造层次；③薄厚搭配——轻薄面料与厚重面料交替；④色彩递进——同色系深浅递进或对比色碰撞；⑤每层都有可见部分——不能完全遮盖。', tips: ['内紧外松最经典', '内长外短露层次', '每层都要有可见部分'] },
      { heading: '层次数量', body: '层次数量建议2-4层：①2层——基础搭配（如衬衫+外套）；②3层——丰富搭配（如T恤+衬衫+外套）；③4层——高阶搭配（如T恤+衬衫+马甲+外套）。超过4层会显得臃肿。每层之间应有明确的视觉区分（颜色、长度、面料）。', tips: ['3层最实用', '超过4层显臃肿', '每层要有视觉区分'] },
    ]},
    { id: 'focal-point', name: '视觉焦点', url: '#', description: '设计中引导观者视线的焦点设置原理。', category: 'composition', tags: ['焦点', '视觉', '引导'], isFree: 'free', logoColor: 'from-rose-500 to-red-600', logoText: '焦', popularity: 'small', tokenPrice: '设计高级 · 视觉引导', cardType: 'knowledge', level: '高级', knowledgeContent: [
      { heading: '什么是视觉焦点', body: '视觉焦点（Focal Point）是设计中最先吸引观者注意的部位。每套服装应该有一个主要焦点（不超过两个），通过对比手法创造：颜色对比、形状对比、材质对比、位置对比。焦点引导观者的视线流动。', tips: ['每套服装1-2个焦点', '焦点通过对比创造', '焦点引导视线'] },
      { heading: '焦点设置方法', body: '①色彩焦点——用亮色或对比色在关键部位（如红腰带、黄围巾）；②装饰焦点——用特殊装饰（如胸针、刺绣、印花）；③结构焦点——用特殊剪裁（如不对称领口、夸张袖型）；④暴露焦点——用露肤（如露肩、露背）创造焦点。', tips: ['亮色腰带是经典焦点', '特殊装饰吸引注意', '露肤是最自然的焦点'] },
      { heading: '焦点与平衡', body: '焦点设置需要与整体平衡协调：①一个焦点——简洁有力，焦点位于上半身（如项链）或腰部（如腰带）；②两个焦点——需要主次分明（如上装大焦点+下装小焦点）；③无焦点——全身统一（如All Black），通过质感和剪裁取胜。', tips: ['一个焦点最简洁', '两个焦点需主次分明', '无焦点靠质感取胜'] },
    ]},
  ];
}

// ===================== 设计软件（跳转质询类）=====================
export function getSoftwareWebItems(): WebItem[] {
  return [
    { id: 'clo3d', name: 'CLO 3D', url: 'https://www.clo3d.com/', description: '行业领先的3D服装设计软件，实时模拟面料物理特性，从设计到虚拟试衣一体化。', category: 'software', tags: ['3D服装', '虚拟试衣', '行业标杆'], isFree: 'paid', logoColor: 'from-slate-700 to-zinc-900', logoText: 'CL', popularity: 'huge', tokenPrice: '3D服装设计 · 行业标杆', cardType: 'link', brandInfo: 'CLO Virtual Fashion旗下核心产品，2009年创立于韩国。全球3D服装设计软件市场份额第一，客户涵盖Nike、Adidas、Gucci等一线品牌。Marvelous Designer为其同公司旗下3D布料模拟产品。', recommendation: '服装3D化首选工具，实时面料模拟物理引擎精确度行业第一；支持导入DXF纸样直接3D化；与PLM系统无缝对接。', priceRange: '$50/月（个人版） / 企业定制' },
    { id: 'illustrator', name: 'Adobe Illustrator', url: 'https://www.adobe.com/products/illustrator.html', description: '矢量绘图之王，服装款式图、Tech Pack（工艺单）、Logo与图案设计的标准工具。', category: 'software', tags: ['矢量绘图', '款式图', 'Adobe'], isFree: 'paid', logoColor: 'from-orange-500 to-amber-600', logoText: 'Ai', popularity: 'wide', tokenPrice: '矢量绘图 · 行业标准', cardType: 'link', brandInfo: 'Adobe Systems旗下矢量图形编辑器，1987年首发。服装行业中用于绘制款式图（Flat Sketch）、Tech Pack、花纹图案和品牌视觉设计。是设计师必备的Adobe Creative Cloud核心工具之一。', recommendation: '服装款式图行业标准工具；Pen Tool绘制精准矢量线条；与Photoshop和InDesign无缝联动；建议掌握快捷键提升效率。', priceRange: '¥68/月（单App） / ¥98/月（全家桶）' },
    { id: 'photoshop', name: 'Adobe Photoshop', url: 'https://www.adobe.com/products/photoshop.html', description: '图像处理巨头，面料图案设计、效果图后期、Moodboard制作的核心工具。', category: 'software', tags: ['图像处理', '面料图案', 'Adobe'], isFree: 'paid', logoColor: 'from-blue-600 to-indigo-700', logoText: 'Ps', popularity: 'normal', tokenPrice: '图像处理 · 设计必备', cardType: 'link', brandInfo: 'Adobe Systems旗下图像编辑器，1990年首发。服装领域中用于面料图案设计、效果图后期处理、色彩调整、Moodboard拼贴和产品精修图。Creative Cloud核心工具。', recommendation: '面料花纹设计和效果图处理必备；Pattern Maker功能可制作无缝拼贴图案；Generative Fill AI功能加速创意探索；建议学习图层蒙版和调整图层。', priceRange: '¥68/月（单App） / ¥98/月（全家桶）' },
    { id: 'browzwear', name: 'Browzwear VStitcher', url: 'https://browzwear.com/', description: '企业级3D服装设计平台，精确模拟面料物理特性，支持全尺码虚拟试衣与3D样品评审。', category: 'software', tags: ['3D服装', '企业级', '虚拟试衣'], isFree: 'paid', logoColor: 'from-purple-600 to-violet-700', logoText: 'BW', popularity: 'normal', tokenPrice: '3D服装 · 企业级', cardType: 'link', brandInfo: 'Browzwear成立于1999年，总部位于以色列。企业级3D服装设计解决方案提供商，VStitcher是其旗舰产品。客户包括Lululemon、PVH、Under Armour等。与CLO 3D并称3D服装双雄。', recommendation: '企业级3D服装方案，面料物理模拟精确度极高；支持从DXF纸样直接生成3D样衣；Tech Pack自动生成功能强大；适合规模化服装企业部署。', priceRange: '企业订阅 / 联系询价' },
    { id: 'lectra', name: 'Lectra Modaris', url: 'https://www.lectra.com/', description: '法国Lectra旗下CAD打版软件，全球顶级服装制版与放码系统，工业化生产标准工具。', category: 'software', tags: ['CAD打版', '工业制版', '法国'], isFree: 'paid', logoColor: 'from-blue-700 to-cyan-700', logoText: 'LC', popularity: 'normal', tokenPrice: 'CAD制版 · 工业标准', cardType: 'link', brandInfo: 'Lectra（力克）成立于1973年，总部位于法国巴黎。全球领先的服装CAD/CAM解决方案提供商。Modaris是其核心打版软件，与Gerber并称服装CAD双雄。客户涵盖Louis Vuitton、Gap、H&M等。', recommendation: '工业级制版系统标准工具；放码功能精确高效；与Kaledo（面料设计）和Optiplan（排料）形成完整CAD解决方案；制版师必备技能。', priceRange: '企业订阅 / 联系询价' },
    { id: 'gerber', name: 'Gerber AccuMark', url: 'https://www.gerbertechnology.com/', description: '美国Gerber旗下CAD系统，与Lectra并列服装制版行业两大标准，全球工厂普及率极高。', category: 'software', tags: ['CAD打版', '工业标准', '美国'], isFree: 'paid', logoColor: 'from-emerald-600 to-teal-700', logoText: 'GB', popularity: 'normal', tokenPrice: 'CAD制版 · 行业标准', cardType: 'link', brandInfo: 'Gerber Technology成立于1968年，总部位于美国康涅狄格州。AccuMark是其旗舰CAD系统，全球服装工厂使用率极高。2021年被Aptean收购。与Lectra并列服装CAD行业两大标准。', recommendation: '与Lectra并列制版师两大必修系统；AccuMark放码和排料模块行业认可度最高；亚洲工厂普及率更高；掌握后就业面广。', priceRange: '企业订阅 / 联系询价' },
    { id: 'et-cad', name: 'ET CAD', url: 'https://www.e-t-cad.com/', description: '中国自主研发的服装CAD系统，国内中小型服装企业主流选择，性价比高。', category: 'software', tags: ['CAD打版', '国产', '性价比'], isFree: 'paid', logoColor: 'from-red-600 to-rose-700', logoText: 'ET', popularity: 'normal', tokenPrice: '国产CAD · 高性价比', cardType: 'link', brandInfo: 'ET CAD由深圳市亿通科技有限公司开发，中国本土服装CAD系统代表。在国内中小型服装企业和制版工作室中普及率极高，操作逻辑简洁高效。', recommendation: '国产CAD性价比之选；操作界面中文化更友好；国内工厂和工作室使用率最高；适合中小型企业和小型工作室。', priceRange: '¥3,000 - ¥15,000（一次性买断）' },
    { id: 'coreldraw', name: 'CorelDRAW', url: 'https://www.coreldraw.com/', description: '矢量图形设计软件，在印花图案、绣花制版和面料纹样设计中广泛使用。', category: 'software', tags: ['矢量绘图', '印花图案', '绣花'], isFree: 'paid', logoColor: 'from-green-600 to-emerald-700', logoText: 'CD', popularity: 'small', tokenPrice: '矢量绘图 · 图案设计', cardType: 'link', brandInfo: 'Corel Corporation旗下矢量图形编辑器，1989年首发。在服装印花图案设计、绣花制版和面料纹样排版中应用广泛，尤其在印花工厂和绣花厂中使用率高。', recommendation: '印花图案设计性价比之选；PowerTRACE位图转矢量功能实用；与绣花机和印花机对接成熟；适合印花和绣花工厂使用。', priceRange: '¥2,699/年（全家桶）' },
    { id: 'procreate', name: 'Procreate', url: 'https://procreate.com/', description: 'iPad专业绘图App，服装设计草图、效果图与概念设计的高效数字绘画工具。', category: 'software', tags: ['iPad绘图', '效果图', '数字绘画'], isFree: 'paid', logoColor: 'from-orange-500 to-red-600', logoText: 'Pr', popularity: 'normal', tokenPrice: '数字绘画 · 移动端', cardType: 'link', brandInfo: 'Savage Interactive开发，2011年发布。iPad平台最强大的专业绘图App之一。在服装设计领域广泛用于设计草图、效果图绘制和概念设计。一次买断制无订阅费。', recommendation: 'iPad设计草图首选工具；笔刷库丰富可模拟水彩和马克笔；QuickShape功能快速画直线和曲线；一次买断性价比极高。', priceRange: '¥68（一次性买断）' },
    { id: 'optitex', name: 'Optitex', url: 'https://optitex.com/', description: '3D虚拟试衣与2D/3D一体化CAD系统，精准模拟面料特性，支持3D样衣评审。', category: 'software', tags: ['3D试衣', '2D/3D一体', 'CAD'], isFree: 'paid', logoColor: 'from-indigo-600 to-blue-700', logoText: 'OP', popularity: 'small', tokenPrice: '3D一体化 · 虚拟试衣', cardType: 'link', brandInfo: 'Optitex成立于1988年，总部位于以色列。3D虚拟试衣和2D/3D一体化CAD解决方案提供商。2021年被EFI收购。在3D样衣评审和虚拟试衣领域技术领先。', recommendation: '2D/3D一体化方案独特；3D虚拟试衣精准度高；适合注重打样成本控制的企业；与EFI RIP系统对接适合印花企业。', priceRange: '企业订阅 / 联系询价' },
    { id: 'tuka3d', name: 'TUKA3D', url: 'https://www.tukatech.com/', description: 'Tukatech旗下3D服装设计系统，以虚拟试衣与纸样验证见长，性价比高。', category: 'software', tags: ['3D试衣', '纸样验证', '性价比'], isFree: 'paid', logoColor: 'from-cyan-600 to-blue-600', logoText: 'TK', popularity: 'small', tokenPrice: '3D试衣 · 纸样验证', cardType: 'link', brandInfo: 'Tukatech成立于1995年，总部位于美国洛杉矶。TUKA3D是其3D服装设计系统，以高性价比的3D虚拟试衣和纸样验证功能著称。TUKAcad打版系统在中小型企业中普及。', recommendation: '3D方案性价比之选；纸样验证功能可减少物理打样次数；适合中小型服装企业；TUKAcad打版系统入门门槛低。', priceRange: '联系询价（中小型企业友好）' },
    { id: 'stylecad', name: 'StyleCAD', url: 'https://www.stylecad.com/', description: '集成化服装CAD系统，打版、放码、排料一体化，适合中小型服装企业。', category: 'software', tags: ['CAD打版', '一体化', '中小企业'], isFree: 'paid', logoColor: 'from-rose-500 to-pink-600', logoText: 'SC', popularity: 'small', tokenPrice: 'CAD系统 · 中小企业', cardType: 'link', brandInfo: 'StyleCAD由TC2公司开发，面向中小型服装企业的集成化CAD系统。涵盖打版、放码、排料和工艺单等模块，以易学易用和高性价比著称。', recommendation: '中小企业CAD入门友好；模块化采购灵活；界面直观学习成本低；适合初创服装品牌和小型工作室。', priceRange: '联系询价' },
    { id: 'marvelous', name: 'Marvelous Designer', url: 'https://www.marvelousdesigner.com/', description: 'CLO公司旗下3D布料模拟软件，影视游戏角色服装与数字时尚设计利器。', category: 'software', tags: ['3D布料', '影视游戏', '数字时尚'], isFree: 'paid', logoColor: 'from-violet-600 to-purple-700', logoText: 'MD', popularity: 'normal', tokenPrice: '3D布料模拟 · 数字时尚', cardType: 'link', brandInfo: 'Marvelous Designer由CLO Virtual Fashion开发（与CLO 3D同公司），专注3D布料模拟。广泛应用于影视特效（漫威、迪士尼）、游戏角色服装（刺客信条、最终幻想）和数字时尚（NFT服装）领域。', recommendation: '影视游戏角色服装首选工具；布料物理模拟效果行业最佳；数字时尚和虚拟服装创作利器；与Maya、ZBrush、Unreal Engine无缝对接。', priceRange: '$50/月（个人版） / 企业定制' },
    { id: 'rhinoceros', name: 'Rhino 3D', url: 'https://www.rhino3d.com/', description: 'NURBS曲面建模软件，珠宝配饰设计与鞋类3D建模的专业工具。', category: 'software', tags: ['3D建模', '珠宝设计', '鞋类设计'], isFree: 'paid', logoColor: 'from-zinc-700 to-gray-800', logoText: 'Rh', popularity: 'small', tokenPrice: '3D建模 · 配饰设计', cardType: 'link', brandInfo: 'Rhinoceros 3D由Robert McNeel & Associates开发，1998年首发。NURBS曲面建模软件，在珠宝设计、鞋类设计和工业设计领域应用广泛。Grasshopper可视化编程插件扩展了参数化设计能力。', recommendation: '珠宝和配饰设计专业工具；NURBS曲面建模精度极高；Grasshopper参数化设计拓展无限可能；鞋类设计必备技能。', priceRange: '$995（一次性买断）' },
    { id: 'keyshot', name: 'KeyShot', url: 'https://www.keyshot.com/', description: '实时3D渲染软件，为3D服装、配饰和鞋类设计生成逼真产品效果图。', category: 'software', tags: ['3D渲染', '产品效果图', '实时'], isFree: 'paid', logoColor: 'from-amber-500 to-yellow-600', logoText: 'KS', popularity: 'small', tokenPrice: '3D渲染 · 产品展示', cardType: 'link', brandInfo: 'KeyShot由Luxion开发，2010年发布。实时3D渲染软件，以操作简单和渲染速度快著称。在服装3D设计流程中常用于将CLO 3D或Rhino模型渲染为逼真产品效果图。', recommendation: '3D设计渲染输出必备工具；实时渲染无需等待；材质库包含丰富面料材质；与CLO 3D和Rhino无缝对接。', priceRange: '$99/月（专业版） / $1,199（买断）' },
  ];
}

// ===================== 资讯与推荐（为质询类卡片生成）=====================
export function getInquiryDataForItem(item: WebItem): { news: NewsItem[]; recommendation: string } {
  const name = item.name.toLowerCase();

  if (item.category === 'fashion') {
    const fashionNewsMap: Record<string, NewsItem[]> = {
      'uniqlo': [
        { title: '优衣库联名KAWS系列发售即售罄，二手价飙升3倍', source: '时尚商业Daily', time: '5小时前' },
        { title: '迅销集团季度财报：优衣库中国市场份额超越日本本土', source: '华尔街日报', time: '1天前' },
      ],
      'nike': [
        { title: 'Nike Air Jordan 1新配色发售SNKRS抽签人数突破200万', source: 'Hypebeast', time: '3小时前' },
        { title: '耐克宣布全新可持续材料Move to Zero计划扩展至全线产品', source: 'Vogue Business', time: '1天前' },
      ],
      'shein': [
        { title: 'SHEIN计划在墨西哥建立生产基地，缩短北美交付周期', source: '路透社', time: '8小时前' },
        { title: 'SHEIN X设计师扶持计划已孵化超3000名独立设计师', source: 'BoF', time: '2天前' },
      ],
    };
    const news = fashionNewsMap[item.id] || [
      { title: `${item.name}发布全新季度系列，主打可持续面料与经典版型融合`, source: '时尚头条', time: '12小时前' },
      { title: `${item.name}扩大亚洲市场布局，新概念店将于上海开业`, source: '第一财经', time: '2天前' },
    ];
    return { news, recommendation: item.recommendation || `${item.name}值得关注的亮点：经典款式与当季新品交替选择，联名系列收藏价值高。` };
  }

  if (item.category === 'trend') {
    const trendNewsMap: Record<string, NewsItem[]> = {
      'dribbble': [
        { title: 'Dribbble 2024年度设计趋势报告：3D插画与玻璃拟态持续走红', source: 'Dribbble Blog', time: '6小时前' },
        { title: 'Dribbble推出AI辅助设计工具板块，首批入驻50+工具', source: 'Designboom', time: '1天前' },
      ],
      'vogue': [
        { title: '2025春夏米兰时装周完整日程公布，Gucci新创意总监首秀', source: 'Vogue Runway', time: '4小时前' },
        { title: '巴黎高定周回顾：Elie Saab 20周年大秀惊艳全场', source: 'Vogue中文网', time: '1天前' },
      ],
      'wgsn': [
        { title: 'WGSN发布2026春夏色彩趋势：数字化薰衣草紫领衔', source: 'WGSN Insider', time: '10小时前' },
        { title: 'WGSN趋势报告：解构主义将在2026年主导街头设计', source: 'Fashion United', time: '2天前' },
      ],
    };
    const news = trendNewsMap[item.id] || [
      { title: `${item.name}发布最新趋势报告，设计师关注可持续与创新材料`, source: '设计前沿', time: '12小时前' },
      { title: `${item.name}新增AI搜索功能，帮助设计师快速定位灵感素材`, source: '创意资讯', time: '2天前' },
    ];
    return { news, recommendation: item.recommendation || `${item.name}是设计趋势获取的重要平台，建议定期浏览保持灵感更新。` };
  }

  if (item.category === 'software') {
    const softwareNewsMap: Record<string, NewsItem[]> = {
      'clo3d': [
        { title: 'CLO 3D发布2025版本：AI辅助纸样生成与实时布料解算加速30%', source: 'CLO官方博客', time: '4小时前' },
        { title: 'Nike宣布全线产品3D化流程采用CLO 3D，物理打样减少60%', source: 'Vogue Business', time: '1天前' },
      ],
      'illustrator': [
        { title: 'Adobe Illustrator 2025新增Generative Shape AI：文字描述生成矢量图形', source: 'Adobe Blog', time: '6小时前' },
        { title: 'Adobe Creative Cloud推出服装设计师专属工作区预设', source: 'Designboom', time: '2天前' },
      ],
      'browzwear': [
        { title: 'Browzwear VStitcher新增AI尺码推荐引擎，虚拟试衣准确度提升40%', source: 'Browzwear News', time: '8小时前' },
        { title: 'Lululemon全面部署Browzwear 3D平台，产品开发周期缩短35%', source: 'Sourcing Journal', time: '2天前' },
      ],
      'lectra': [
        { title: 'Lectra发布Modaris 3D模块：2D纸样一键生成3D样衣', source: 'Lectra News', time: '10小时前' },
        { title: 'Lectra收购3D试衣公司，加速2D/3D一体化布局', source: 'Fashion United', time: '3天前' },
      ],
      'gerber': [
        { title: 'Gerber AccuMark 2025版发布：AI排料算法节省面料3-5%', source: 'Gerber Blog', time: '12小时前' },
        { title: 'Aptean旗下Gerber推出云端协作平台，支持远程打版审核', source: 'Apparel News', time: '2天前' },
      ],
      'marvelous': [
        { title: 'Marvelous Designer 13发布：新增GPU布料解算器，速度提升5倍', source: 'CG Society', time: '5小时前' },
        { title: '漫威新片角色服装全部使用Marvelous Designer模拟制作', source: 'CG Channel', time: '1天前' },
      ],
    };
    const news = softwareNewsMap[item.id] || [
      { title: `${item.name}发布最新版本更新，新增AI辅助功能提升设计效率`, source: '设计软件资讯', time: '12小时前' },
      { title: `${item.name}宣布与更多3D设计工具打通格式互通，优化工作流`, source: 'Digital Fashion', time: '2天前' },
    ];
    return { news, recommendation: item.recommendation || `${item.name}是服装设计师需要掌握的专业软件，建议系统学习并在实际项目中练习。` };
  }

  return { news: [], recommendation: '' };
}
