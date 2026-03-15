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
  { year: '2023 - 至今', role: '高级 UI/UX 设计师', company: '某科技创新公司', desc: '主导核心 SaaS 产品的体验升级，构建并维护企业级设计系统，使研发效率提升 30%。' },
  { year: '2021 - 2023', role: '视觉与交互设计师', company: '某知名设计机构', desc: '参与多款亿级日活 App 的改版设计，负责从概念探索到高保真原型的全流程输出。' },
  { year: '2019 - 2021', role: '初级 UI 设计师', company: '某互联网创业团队', desc: '负责移动端应用界面的日常迭代，配合产品经理完成需求的原型可视化。' },
];

const PROJECTS = [
  { id: 1, title: 'Nova 智能数据中台', category: 'UI/UX 设计', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop', desc: '为企业级用户设计的智能数据分析平台，注重复杂数据的可视化展示与操作效率。' },
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

  const filteredProjects = activeCategory === '全部'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  // 锁定背景滚动（当弹窗打开时）
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = selectedProject ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

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
        <section className="py-24 border-t border-white/5">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 flex items-center gap-4">
              <span className="w-8 h-1 bg-[#A855F7] rounded-full" />
              工作经历
            </h2>
          </Reveal>

          <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12">
            {EXPERIENCES.map((exp, idx) => (
              <Reveal key={idx} delay={idx * 100} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <span className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-[#A855F7] ring-4 ring-black" />
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-3">
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <span className="text-[#A855F7] font-medium">{exp.company}</span>
                  <span className="text-sm text-gray-500 bg-white/5 px-3 py-1 rounded-full">{exp.year}</span>
                </div>
                <p className="text-gray-400 leading-relaxed max-w-2xl">{exp.desc}</p>
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
                  <h3 className="text-2xl font-bold text-white">项目背景与挑战</h3>
                  <p>（此处为占位符：你可以在这里详细描述项目的背景、面临的核心业务挑战以及为什么需要进行设计改版。详细阐述用户痛点和业务目标。）</p>

                  <h3 className="text-2xl font-bold text-white mt-12">设计策略与解决方案</h3>
                  <p>（此处为占位符：描述你是如何通过调研、线框图推导、交互尝试来解决上述问题的。展示你的思考过程而不仅仅是视觉结果。）</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="aspect-video glass-panel rounded-xl flex items-center justify-center text-gray-600">界面展示 1</div>
                    <div className="aspect-video glass-panel rounded-xl flex items-center justify-center text-gray-600">界面展示 2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
