import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  GraduationCap,
  X,
  Layout,
  PenTool,
  Monitor,
  Layers,
  ExternalLink,
  Dribbble,
  Github,
  ArrowRight,
} from 'lucide-react';

// --- 自定义滚动动画 Hook 组件 ---
const Reveal = ({ children, className = '', delay = 0, ...props }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};

// --- 核心数据 ---
const SKILLS = [
  { category: '设计工具', items: ['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'Principle'] },
  { category: '专业技能', items: ['用户体验设计 (UX)', '用户界面设计 (UI)', '交互原型制作', '设计系统构建', '用户调研', '产品思维'] },
  { category: '前端开发', items: ['HTML / CSS', 'React.js', 'Tailwind CSS', 'Framer Motion'] },
];

const EXPERIENCES = [
  {
    year: '2024.7 - 2025.7',
    role: '乡村振兴志愿者',
    company: '江苏省大学生志愿服务乡村振兴计划',
    summary: '用互联网思维带领 6 人团队从 0 到 1 搭建乡村振兴直播电商体系。',
    highlights: [
      '理想主义的实践，用互联网助力乡村振兴；常态化直播实现双平台总销售额近 3 万元、成交 5223 单、触达超 12.1 万人次，验证直播助农可行性并拓宽农产品线上销路，受高淳电视台采访 2 次。',
      '重构小程序产品流程，打通农产品展示、销售、售后的数字化链路，提升小程序实用性与运营效率，实现农产品线上流通的数字化升级。',
    ],
  },
  {
    year: '2024.3 - 2024.6',
    role: '用户体验部体验设计师',
    company: '传音控股',
    summary: '负责工具 App 的界面与交互体验，以及系统桌面部分的视觉与交互逻辑梳理。',
    highlights: [
      '系统桌面：负责 V15.0 桌面重构中的小部件与文件夹设计，基于 Google 框架和旧版本探索最佳方案，产出 3 版交互模式，参与 4 次交互视觉评审并确定品牌适配方案。',
      '工具 App：全面重构换机 App，引入 3D 设计，优化用户体验和界面视觉效果。',
    ],
  },
  {
    year: '2023.11 - 2024.2',
    role: 'TPG用户体验部体验设计师',
    company: '百度（中国）有限公司',
    summary: '负责文心一格功能优化与百度翻译 App 版本优化，覆盖调研、竞品分析、走查、研究与视觉设计。',
    highlights: [
      '文心一格：负责 Web 端交互与界面设计，独立承担 P1/P2 需求，交付 10+ 设计需求、累计产出 30+ 设计稿；从 0 到 1 设计并落地浮层帮助与关键细节优化，降低学习成本并提升创作效率。',
      '百度翻译：参与 v11.1 与 v11.1.1 版本优化，重点提升智能翻译体验与商业化表现，参与约 2/3 页面设计；主导 3 轮上线走查并独立对接开发与产品，保障按时交付。上线后下载量 +7.77%、日新增 +7.04%，并推动下半年营收持续增长。',
    ],
  },
  {
    year: '2023.8 - 2023.11',
    role: 'Text数字化部门UX设计师',
    company: '恩士迅信息科技（中国）有限公司',
    summary: '深度参与关键数字化项目，从研究到设计到沟通支撑全流程协同。',
    highlights: [
      '用户研究：参与 4 个关键项目，开展定向市场调研与竞品分析，研究竞争对手、客户与市场定位，为产品策略提供决策支持。',
      '产品设计：基于产品定位、市场需求和功能要求，主导整体 UI/交互设计，确保方案与需求方高度契合。',
      '沟通支持：准备并制作 6 份专业报告和演示文档，系统梳理项目分析结果与解决方案，支撑客户及团队沟通。',
    ],
  },
  {
    year: '2023.2 - 2023.7',
    role: 'UED用户体验部视觉设计师',
    company: '携程',
    summary: '负责营销活动与活动页面设计优化，参与内部实习生项目及 Hackathon。',
    highlights: [
      '产品设计：协助东南亚站点活动页面玩法优化，新增主推目的地板块，活动页面访问时长提升 18%；从 0 到 1 构思并落地「计划旅行」商业玩法，同时优化订单页面，客诉下降 6%。',
      '运营设计：负责 B/C 类需求主 KV 及延展、活动页 Web/H5 排版，并参与 A 类需求；累计参与 30+ 活动，产出 200+ Banner。',
      '业务支持：设计 Company intro deck 4.0、App Store 宣传册等多类型 PPT 模板，提升内外部会议沟通效率。',
      'AIGC 设计：参与 AIGC 虚拟小组，使用 Midjourney 赋能营销设计，出图效率提升约 1 倍。',
    ],
  },
  {
    year: '2022.6 - 2022.9',
    role: '品牌塑造部视觉设计师',
    company: '景枫中心',
    summary: '参与品牌视觉相关项目，支持品牌设计资产的建设与落地。',
    highlights: [],
  },
];

const ENTREPRENEURIAL_EXPERIENCES = [
  {
    year: '2024.7 - 至今',
    role: '创始人 / 主理人',
    company: '南京蚂蚁呀嘿文化创意工作室',
    summary: '提供平面设计、UI 视觉设计与运营服务，服务客户包括南京市高淳团区委、北京邮电大学等。',
    highlights: [
      '独立完成「楼下狮豹特」小程序 UI/UX 全流程设计与落地。',
      '负责南京榈烁文化品牌全链路设计，完成品牌手册与视觉体系搭建。',
      '操盘「慢城姑娘」小红书 / 公众号 / 抖音全域内容运营，搭建品牌市场逻辑、运营策略与标准化 SOP 流程，输出市场方向与流程文档。',
    ],
  },
];

const PROJECTS = [
  {
    id: 1,
    title: '百度翻译AI功能',
    category: 'UI/UX 设计',
    image: '/projects/baidu-ai-2.png',
    desc: 'AI驱动的下一代智能翻译与语言学习平台。',
    launchTime: '2024年1月',
    background: '全球化加速了跨语言信息需求，用户对翻译产品的期待已从单一工具向“理解+学习”的综合体验转变。传统产品普遍存在语境理解不足、使用场景局限、学习闭环缺失等痛点，同时对话式自然语言AI的兴起进一步重塑了用户对即时、互动式语言体验的认知。借助AI大模型，设计目标聚焦于打造智能化、沉浸式、持续驱动学习的语言体验。',
    detailImages: [
      '/projects/baidu-ai-1.png',
      '/projects/baidu-ai-2.png',
      '/projects/baidu-ai-3.png',
      '/projects/baidu-ai-4.png',
    ],
  },
  { id: 2, title: 'Zenith 冥想 App', category: '移动端应用', image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2000&auto=format&fit=crop', desc: '一款主打极简主义的冥想与睡眠辅助应用，采用拟物化与毛玻璃结合的设计语言。' },
  { id: 3, title: 'Aura 电商官网', category: '网页设计', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop', desc: '高端独立设计师品牌电商网站重构，强化品牌视觉调性并优化了购物结算转化率。' },
  { id: 4, title: 'Fintech 钱包概念设计', category: '移动端应用', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2000&auto=format&fit=crop', desc: '探索未来数字加密钱包的交互形式，引入手势操作与动态 3D 资产展示。' },
  { id: 5, title: '企业级设计系统', category: 'UI/UX 设计', image: 'https://images.unsplash.com/photo-1507238692062-540955af3cb5?q=80&w=2000&auto=format&fit=crop', desc: '从 0 到 1 搭建基于 Figma 的企业级组件库，包含 50+ 核心组件与完整的使用规范。' },
];

const CATEGORIES = ['全部', 'UI/UX 设计', '移动端应用', '网页设计'];

// --- 主页面组件 ---
export default function App() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const filteredProjects = activeCategory === '全部'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  // 锁定背景滚动（当任一弹窗打开时）
  useEffect(() => {
    const hasModalOpen = Boolean(selectedProject || selectedExperience);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = hasModalOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedProject, selectedExperience]);

  useEffect(() => {
    if (!selectedProject && !selectedExperience) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setSelectedExperience(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject, selectedExperience]);

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-[#A855F7]/30 selection:text-white relative">
      {/* 注入全局基础样式与自定义滚动条 */}
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #1A0B2E; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #A855F7; }
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      {/* 动态氛围背景 */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#1A0B2E] blur-[150px] opacity-60 mix-blend-screen animate-pulse duration-[10000ms]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#1A0B2E] blur-[150px] opacity-40 mix-blend-screen" />
        <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-[#A855F7]/10 blur-[120px] mix-blend-screen" />
        {/* 微小的噪点纹理叠加，增加质感 */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 pb-24">
        {/* Navigation / Header */}
        <nav className="flex items-center justify-between py-8">
          <div className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#A855F7] to-[#1A0B2E] flex items-center justify-center">
              <Layers size={16} className="text-white" />
            </div>
            Portfolio.
          </div>
          <div className="flex gap-4">
            <a href="#" className="p-2 text-gray-400 hover:text-white transition-colors glass-panel rounded-full hover:bg-white/10"><Github size={20} /></a>
            <a href="#" className="p-2 text-gray-400 hover:text-[#A855F7] transition-colors glass-panel rounded-full hover:bg-white/10"><Dribbble size={20} /></a>
          </div>
        </nav>

        {/* --- Hero Section --- */}
        <section className="min-h-[80vh] flex flex-col justify-center pt-12 pb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-[#A855F7] mb-8 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
              Available for new opportunities
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#A855F7]">Intuitive</span> <br className="hidden md:block" />
              & Beautiful Digital <br className="hidden md:block" />Experiences.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div className="max-w-4xl mb-12">
              <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed font-medium">
                你好，我是 <strong className="text-white">马丽雅 Maria</strong>，一名 UI/UX 设计师 <span className="text-lg text-[#A855F7] font-normal inline-block mt-2 md:mt-0 md:ml-2">| 近2年大厂及1年政企经验 | AI工具、出海业务</span>
              </p>
              <div className="text-base md:text-lg text-gray-400 leading-relaxed space-y-4">
                <p>
                  <strong className="text-gray-200">✨ 丰富的头部大厂及多端项目经验：</strong>曾履职于百度、传音、携程等多家头部互联网企业，业务线主要覆盖 C/B/G 多端。深度参与百度翻译（千万级体量）、文心一格等产品的体验设计与优化，主导的改版助力 APP 下载量提升 7.77%、日新增提升 7.04%。
                </p>
                <p>
                  <strong className="text-gray-200">🚀 AIGC 商业化落地与从0到1全局视角：</strong>2023 年将 AIGC（MJ、SD）深度融入实际设计工作流，曾在携程通过 AI 赋能使营销作图效率大幅提升，并参与 AI 应用产品的内部创业比赛。曾带队成功搭建乡村振兴直播体系并重构农产品小程序的数字化全链路。
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300} className="flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all flex items-center gap-2">
              查看作品集 <ArrowRight size={18} />
            </a>
            <a href="#contact" className="px-8 py-4 rounded-full glass-panel text-white font-semibold hover:bg-white/10 transition-all">
              联系我
            </a>
          </Reveal>
        </section>

        {/* --- Brief Info Section --- */}
        <section className="py-20" id="contact">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Mail, label: '电子邮件', value: 'marialia1026@gmail.com' },
                { icon: Phone, label: '联系电话', value: '17751795879' },
                { icon: GraduationCap, label: '教育背景', value: '南京艺术学院 · 数字媒体艺术本科' },
              ].map((info, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-2xl flex items-start gap-4 hover:bg-white/5 transition-all group">
                  <div className="p-3 rounded-xl bg-[#1A0B2E] text-[#A855F7] group-hover:scale-110 transition-transform">
                    <info.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm mb-1">{info.label}</h3>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* --- Experience Section --- */}
        <section className="py-16 border-t border-white/5">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 flex items-center gap-4">
              <span className="w-8 h-1 bg-[#A855F7] rounded-full" />
              工作经历
            </h2>
          </Reveal>

          <div className="space-y-4">
            {EXPERIENCES.map((exp, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <button
                  type="button"
                  onClick={() => setSelectedExperience({ ...exp, section: '工作经历' })}
                  className="w-full glass-panel rounded-2xl px-5 py-4 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      <p className="text-[#A855F7] font-medium truncate">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="bg-white/5 px-3 py-1 rounded-full">{exp.year}</span>
                      <span className="text-[#A855F7]">查看详情</span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 flex items-center gap-4">
              <span className="w-8 h-1 bg-[#A855F7] rounded-full" />
              创业经历
            </h2>
          </Reveal>

          <div className="space-y-4">
            {ENTREPRENEURIAL_EXPERIENCES.map((exp, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <button
                  type="button"
                  onClick={() => setSelectedExperience({ ...exp, section: '创业经历' })}
                  className="w-full glass-panel rounded-2xl px-5 py-4 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      <p className="text-[#A855F7] font-medium truncate">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="bg-white/5 px-3 py-1 rounded-full">{exp.year}</span>
                      <span className="text-[#A855F7]">查看详情</span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section className="py-24 border-t border-white/5" id="projects">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-4">
                <span className="w-8 h-1 bg-[#A855F7] rounded-full" />
                精选作品
              </h2>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 glass-panel p-2 rounded-2xl">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-[#A855F7] text-white shadow-lg shadow-purple-500/25'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <Reveal
                key={project.id}
                delay={idx * 100}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-3xl glass-panel aspect-[4/3] mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <div className="w-12 h-12 rounded-full bg-[#A855F7] text-white flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ml-auto">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6 px-4 py-2 glass-panel rounded-full text-xs font-semibold text-white tracking-wider backdrop-blur-xl">
                    {project.category}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#A855F7] transition-colors">{project.title}</h3>
                <p className="text-gray-400 line-clamp-2">{project.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section className="py-24 border-t border-white/5">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 flex items-center gap-4">
              <span className="w-8 h-1 bg-[#A855F7] rounded-full" />
              相关能力
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SKILLS.map((skillGroup, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="glass-panel p-8 rounded-3xl h-full hover:bg-white/5 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                    {idx === 0 && <PenTool className="text-[#A855F7]" />}
                    {idx === 1 && <Layout className="text-[#A855F7]" />}
                    {idx === 2 && <Monitor className="text-[#A855F7]" />}
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.items.map((item, i) => (
                      <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-[#A855F7] hover:text-white hover:border-[#A855F7] transition-all cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-24 pb-8 text-center text-gray-500 border-t border-white/5">
          <p>© {new Date().getFullYear()} Portfolio. Designed & Built with React & Tailwind.</p>
        </footer>
      </div>

      {/* --- Project Detail Modal --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity"
            onClick={() => setSelectedProject(null)}
          />
          <div className="relative w-full max-w-5xl max-h-full glass-panel bg-[#0a0512]/90 rounded-3xl overflow-hidden shadow-2xl flex flex-col transition duration-300 scale-100 opacity-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="px-4 py-1.5 rounded-full bg-[#A855F7]/20 text-[#A855F7] text-sm font-medium">
                {selectedProject.category}
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content Scrollable Area */}
            <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full aspect-[21/9] object-cover rounded-2xl mb-10"
              />
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{selectedProject.title}</h2>
                <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                  {selectedProject.desc}
                </p>
                {selectedProject.launchTime && (
                  <p className="text-sm text-[#A855F7] mb-8">上线时间：{selectedProject.launchTime}</p>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 py-8 border-y border-white/10">
                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">角色</h4>
                    <p className="text-white font-medium">主导设计师</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">周期</h4>
                    <p className="text-white font-medium">3 个月</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">平台</h4>
                    <p className="text-white font-medium">iOS / Android</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">链接</h4>
                    <a href="#" className="text-[#A855F7] hover:underline flex items-center gap-1 font-medium">
                      查看线上版本 <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <h3 className="text-2xl font-bold text-white">项目背景</h3>
                  <p>{selectedProject.background || '（此处为占位符：你可以在这里详细描述项目背景与目标。）'}</p>

                  {selectedProject.detailImages?.length > 0 && (
                    <div className="mt-8 space-y-8">
                      {selectedProject.detailImages.map((img, idx) => (
                        <section key={img} className="space-y-3">
                          <p className="text-sm text-gray-500">第 {idx + 1} 屏</p>
                          <img
                            src={img}
                            alt={`${selectedProject.title} 细节图 ${idx + 1}`}
                            className="w-full min-h-[70vh] object-contain rounded-xl border border-white/10 bg-black/30"
                          />
                        </section>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity"
            onClick={() => setSelectedExperience(null)}
          />
          <div className="relative w-full max-w-3xl max-h-full glass-panel bg-[#0a0512]/90 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="px-4 py-1.5 rounded-full bg-[#A855F7]/20 text-[#A855F7] text-sm font-medium">
                {selectedExperience.section}
              </span>
              <button
                onClick={() => setSelectedExperience(null)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedExperience.role}</h3>
                <p className="text-[#A855F7] font-medium">{selectedExperience.company}</p>
                <p className="text-sm text-gray-400 mt-2">{selectedExperience.year}</p>
              </div>

              {selectedExperience.highlights?.length > 0 ? (
                <ul className="space-y-3 text-gray-300 leading-relaxed list-disc pl-5">
                  {selectedExperience.highlights.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">暂无详细描述。</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
