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
  Route,
  BookOpen,
  Package,
  Network,
  Zap,
  Database,
  ShieldCheck,
  Activity,
  CheckCircle2,
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
  { category: '专业技能', items: ['用户体验设计 (UX)', '用户界面设计 (UI)', '交互原型制作', '用户调研', '产品思维'] },
  { category: 'AI应用能力', items: ['Vibe coding', 'Midjourney', 'Lovart'] },
];

const CAPABILITY_PROJECTS = [
  {
    title: '设计流程',
    icon: Route,
    desc: '从需求洞察到方案验证的端到端设计流程体系。',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1280&auto=format&fit=crop',
    detailPage: '/capabilities/design-process-tech.html',
    details: [
      '需求梳理与目标拆解：定义业务目标、用户目标和衡量指标。',
      '研究与洞察：结合访谈、问卷、竞品分析定位关键机会点。',
      '方案产出与验证：通过信息架构、线框和原型进行快速验证迭代。',
    ],
  },
  {
    title: '方法沉淀',
    icon: BookOpen,
    desc: '把项目经验固化为可复用的方法、模板与规范。',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1280&auto=format&fit=crop',
    customType: 'b2bFramework',
    details: [
      '沉淀组件与交互规范，统一设计语言并降低沟通成本。',
      '建立评审与复盘机制，将经验转化为团队可继承资产。',
      '形成从问题定义到交付验收的标准化流程文档。',
    ],
  },
  {
    title: '对AI应用的思考',
    icon: Package,
    desc: '从场景价值、可解释性到落地成本，系统化评估 AI 应用设计。',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1280&auto=format&fit=crop',
    sections: [
      {
        heading: '观察',
        content: '最近在观察市面上的各类产品时，我有一个很强烈的感受：大量所谓“AI 产品”本质上仍是传统互联网产品逻辑，只是在某个节点接入了智能能力；而真正的 AI Native 产品，则是围绕模型能力重新设计产品结构与交互方式。',
      },
      {
        heading: '问题提出',
        content: '当越来越多的软件都在右上角加入一个“AI 助手”按钮时，我们更需要回到产品底层逻辑去判断：它到底是功能增强，还是范式重构。',
      },
      {
        heading: '1）核心判断标准：去掉 AI，产品还能成立吗？',
        content: 'AI-enabled 产品去掉 AI 后仍可使用，AI 只是附加能力，比如传统修图或文档工具中的智能功能。AI Native 产品去掉 AI 后将失去核心能力，例如 ChatGPT、Midjourney 这类以模型为中心的产品。',
      },
      {
        heading: '2）产品结构层：从“局部增强”到“全局接管”',
        content: '在 AI-enabled 阶段，原有结构和用户流程基本不变，AI 仅在某一步骤提升效率；而在 AI Native 阶段，用户不再逐步操作软件，而是直接表达目标，由系统规划任务并输出结果，产品核心从“工具流程”转向“结果交付”。',
      },
      {
        heading: '3）交互设计层：从“图形界面”到“意图界面”',
        content: '传统产品依赖按钮、菜单、表单，用户是操作者；AI Native 更强调对话、意图与 Agent，用户逐渐成为指挥者。以搜索为例：传统搜索返回链接列表，用户自行筛选；AI Native 搜索会在后台组织信息并直接给出结论，体验从“检索工具”进化为“知识代理”。',
      },
      {
        heading: '结语与趋势',
        content: '当前多数产品仍处在从 AI-enabled 向 AI Native 的过渡期。对设计而言，真正的挑战已经不只是把“AI 按钮”做得更显眼，而是基于模型的推理与执行能力，重构一套更少路径、更高完成度的新工作流。',
      },
    ],
    details: [
      '先定义“AI 解决什么问题”，再选择模型与交互形态，避免为 AI 而 AI。',
      '以可解释反馈和可回退机制提升用户信任，降低黑盒感与误操作风险。',
      '平衡体验收益与实现成本，持续跟踪模型效果并迭代提示词与流程。',
    ],
  },
];

const EXTENDED_CAPABILITIES = [
  {
    title: '市场能力',
    desc: '理解用户与市场，支持品牌定位和增长策略。',
    detailImages: [
      '/image/yunying/manchengguniang.webp',
      '/image/yunying/SOP.webp',
      '/image/yunying/yunying.webp',
    ],
    details: [
      '分析目标人群与竞品格局，提炼差异化价值主张。',
      '配合营销节点输出策略导向的设计与传播素材。',
      '将市场反馈反哺产品体验，提升整体转化效率。',
    ],
  },
  {
    title: '账号运营',
    desc: '覆盖内容规划、发布节奏和数据复盘的运营能力。',
    detailImages: [
      '/image/zimeiti/zimeiti-overview.webp',
      '/image/zimeiti/zimeiti-script.webp',
      '/image/zimeiti/zimeiti-stats.webp',
    ],
    details: [
      '搭建内容选题与栏目体系，形成稳定输出机制。',
      '依据平台特性优化文案、视觉和互动策略。',
      '通过数据分析持续调整方向，沉淀可复制 SOP。',
    ],
  },
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
    category: '移动端应用',
    image: '/image/百度翻译封面.webp',
    desc: 'AI驱动的下一代智能翻译与语言学习平台。',
    launchTime: '2024年1月',
    background: '全球化加速了跨语言信息需求，用户对翻译产品的期待已从单一工具向“理解+学习”的综合体验转变。传统产品普遍存在语境理解不足、使用场景局限、学习闭环缺失等痛点，同时对话式自然语言AI的兴起进一步重塑了用户对即时、互动式语言体验的认知。借助AI大模型，设计目标聚焦于打造智能化、沉浸式、持续驱动学习的语言体验。',
    detailImages: [
      '/image/百度翻译1.webp',
      '/image/百度翻译2.webp',
      '/image/百度翻译3.webp',
      '/image/百度翻译4.webp',
    ],
  },
  {
    id: 2,
    title: '智建云租（创业项目）',
    category: '网页端应用',
    image: '/image/AIagent.webp',
    desc: '「智建云租」是一个面向建筑材料租赁业务的 SaaS 化一体化工作台。',
    projectLink: 'http://121.41.188.162/',
    background: `项目地址：http://121.41.188.162/

项目背景：
传统通用 SaaS（金蝶/用友）采用线性强绑定关联逻辑：订单 -> 发货单 -> 签收单 -> 结算单。归还时，必须明确“这次归还的是哪张租出单里的哪批货”。

痛点：
建筑材料（如钢管、扣件、脚手架）属于无差别的大宗散货物资，一旦进入工地，不同批次发过去的材料会完全混在一起。工期结束或部分退场时，工人只能按“总数”装车归还，根本不可能、也无法分辨哪些是第一批租的、哪些是第三批租的。强绑定会导致系统在使用时卡死，业务员只能为了系统而造假账。

智建云租方案：
采用“错位流转与对账结算驱动”的行业深度定制逻辑：租出单与归还单解耦，两者不发生直接关联，而是共同作用于该项目的“物资动态总池”。

优势：
极大降低一线人员操作门槛，完全贴合建筑行业“高频进出、按批收发、乱序归还”的真实施工场景。`,
    detailImages: [
      '/image/AIagent.webp',
      '/image/xiangmu_zuchu.webp',
      '/image/xiangmu_zuchu_hetong.webp',
      '/image/xiangmu_zuchu_zonglan.webp',
      '/image/xiangmu_zuchu_zuchudan.webp',
      '/image/xiangmu_zuchu_zuchudan2.webp',
      '/image/jinxiao_caigou.webp',
      '/image/jinxiao_caigoudan.webp',
      '/image/jinxiao_kucun.webp',
      '/image/xinxi_cailiao.webp',
    ],
  },
  {
    id: 3,
    title: '文心一格体验升级（文生图AI）',
    category: '网页端应用',
    image: '/image/wenxin-cover.webp',
    desc: '面向大众创作者的文生图 AI 产品体验优化，提升创作效率、可控性与探索乐趣。',
    background: '文心一格作为基于文心大模型的 AI 绘画产品，提供了从文本到图像的生成能力，并吸引了大量用户进行 AI 创作尝试。但随着用户规模增长与使用场景的多样化，用户对 AI 工具的期待也从“尝试生成图片”转向“高效完成创作”，产品体验的重要性逐渐提升。',
    detailImages: [
      '/image/wenxin-1.webp',
      '/image/wenxin-2.webp',
      '/image/wenxin-3.webp',
      '/image/wenxin-4.webp',
    ],
  },
  {
    id: 4,
    title: '如流-智能助理（百度企业办公应用）',
    category: '移动端应用',
    image: '/image/如流超级助理封面.webp',
    desc: '在企业办公场景中引入AI智能助理能力,优化信息检索、任务协同与日常决策效率。',
    role: '设计师',
    period: '--',
    background: '业务痛点：随着企业内部工具（如 OA、差旅出行、研发 iCafe 提单等）日益庞杂，员工面临着严重的“系统割裂”和“入口迷失”问题。传统的“菜单点击”与“关键词搜索”效率低下，且新员工学习成本极高。设计目标：依托 LLM（大语言模型）能力，将办公体验从“人找系统”升级为“对话即服务（Dialog as a Service）”。通过自然语言交互作为统一入口，打造一个能理解上下文、支持多轮对话、并能直接唤起插件执行任务的 AI 超级助理。',
    detailImages: [
      '/image/如流超级助理图1.webp',
      '/image/Slide%2016_9%20-%201.webp',
      '/image/Slide%2016_9%20-%202.webp',
      '/image/Slide%2016_9%20-%203.webp',
      '/image/Slide%2016_9%20-%204.webp',
      '/image/Slide%2016_9%20-%205.webp',
      '/image/Slide%2016_9%20-%206.webp',
      '/image/Slide%2016_9%20-%207.webp',
    ],
  },
  {
    id: 5,
    title: 'Trip.com计划旅行页升级',
    category: '移动端应用',
    image: '/image/trip-plan-cover.webp',
    desc: '围绕旅行决策链路重构计划页体验，提升用户浏览深度、停留时长与转化表现。',
    detailImages: [
      '/image/trip%20plan.webp',
      '/image/trip%20plan-1.webp',
      '/image/trip%20plan-2.webp',
      '/image/trip%20plan-3.webp',
    ],
  },
  {
    id: 6,
    title: 'Trip.com营销视觉',
    category: '视觉设计',
    image: '/image/营销活动.webp',
    desc: '打造多场景营销视觉体系与活动素材规范，统一品牌表达并提升活动触达效率。',
    detailImages: [
      '/image/营销活动-1.webp',
      '/image/营销活动-2.webp',
      '/image/营销活动-3.webp',
      '/image/营销活动-4.webp',
      '/image/营销活动-5.webp',
    ],
  },
];

const CATEGORIES = ['全部', '网页端应用', '移动端应用', '视觉设计'];

// --- 主页面组件 ---
export default function App() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);

  const filteredProjects = activeCategory === '全部'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  // 锁定背景滚动（当任一弹窗打开时）
  useEffect(() => {
    const hasModalOpen = Boolean(selectedProject || selectedExperience || selectedCapability);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = hasModalOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedProject, selectedExperience, selectedCapability]);

  useEffect(() => {
    if (!selectedProject && !selectedExperience && !selectedCapability) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setSelectedExperience(null);
        setSelectedCapability(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject, selectedExperience, selectedCapability]);

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
                  <strong className="text-gray-200">🏢 大厂与多端实战经验：</strong>拥有百度、携程、传音等头部互联网公司经验，参与并推动多款 C/B/G 端产品的体验设计与增长优化。曾深度参与百度翻译（千万级用户产品）与文心一格等 AI 产品设计，通过体验改版推动 APP 下载量提升 7.77%，日新增提升 7.04%。
                </p>
                <p>
                  <strong className="text-gray-200">🤖 AIGC 工作流升级：</strong>2023 年开始将 AIGC（如 Midjourney、Stable Diffusion）系统化融入设计工作流，在携程推动 AI 赋能视觉生产效率，并参与 AI 应用产品内部创业项目并获得铜奖。
                </p>
                <p>
                  <strong className="text-gray-200">🚀 从 0 到 1 的全局能力：</strong>具备从 0 到 1 的产品与设计全局能力：曾创业打造 ToB 建材 SaaS 产品「智建云租」，负责产品与设计体系搭建；同时主导乡村振兴直播体系建设，并重构农产品小程序的数字化运营链路。
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
              工作/实习经历
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    loading="lazy"
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

          <Reveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CAPABILITY_PROJECTS.map((item, idx) => (
                <Reveal
                  key={item.title}
                  delay={idx * 80}
                  className="group cursor-pointer"
                  onClick={() => setSelectedCapability({ ...item, section: '相关能力' })}
                >
                  <div className="relative overflow-hidden rounded-3xl glass-panel aspect-[4/3] mb-6">
                    {item.coverImage ? (
                      <img
                        src={item.coverImage}
                        alt={`${item.title} 封面`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1A0B2E] via-[#0d1326] to-black flex items-center justify-center">
                        <item.icon size={42} className="text-[#A855F7]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                      <div className="w-12 h-12 rounded-full bg-[#A855F7] text-white flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ml-auto">
                        <ArrowRight size={24} />
                      </div>
                    </div>
                    <div className="absolute top-6 left-6 px-4 py-2 glass-panel rounded-full text-xs font-semibold text-white tracking-wider backdrop-blur-xl flex items-center gap-2">
                      <item.icon size={14} className="text-[#A855F7]" />
                      相关能力
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#A855F7] transition-colors">{item.title}</h3>
                  <p className="text-gray-400 line-clamp-2">{item.desc}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150} className="mt-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-6 h-1 bg-[#A855F7] rounded-full" />
              拓展能力
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {EXTENDED_CAPABILITIES.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setSelectedCapability({ ...item, section: '拓展能力' })}
                  className="glass-panel p-8 rounded-3xl h-full text-left hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#A855F7] transition-colors">
                      {item.title}
                    </h3>
                    <ArrowRight size={20} className="text-[#A855F7] shrink-0 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-gray-400 mt-3 leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {SKILLS.map((skillGroup, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-3xl h-full hover:bg-white/5 transition-colors">
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
              ))}
            </div>
          </Reveal>
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
                loading="lazy"
                className="w-full h-auto object-contain rounded-2xl mb-10 border border-white/10 bg-black/30"
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
                    <p className="text-white font-medium">{selectedProject.role || '主导设计师'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">周期</h4>
                    <p className="text-white font-medium">{selectedProject.period || '3 个月'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">平台</h4>
                    <p className="text-white font-medium">{selectedProject.platform || 'iOS / Android'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">链接</h4>
                    <a
                      href={selectedProject.projectLink || '#'}
                      target={selectedProject.projectLink ? '_blank' : undefined}
                      rel={selectedProject.projectLink ? 'noreferrer' : undefined}
                      className="text-[#A855F7] hover:underline flex items-center gap-1 font-medium"
                    >
                      查看线上版本 <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <div className="space-y-6 text-gray-300 leading-relaxed">
                  {selectedProject.businessPain && (
                    <>
                      <h3 className="text-2xl font-bold text-white">业务痛点</h3>
                      <p>{selectedProject.businessPain}</p>
                    </>
                  )}
                  {selectedProject.background && (
                    <>
                      <h3 className="text-2xl font-bold text-white">项目背景</h3>
                      <p className="whitespace-pre-line">{selectedProject.background}</p>
                    </>
                  )}

                  {selectedProject.detailImages?.length > 0 && (
                    <div className="mt-8 space-y-8">
                      {selectedProject.detailImages.map((img, idx) => (
                        <section key={img} className="space-y-3">
                          <p className="text-sm text-gray-500">第 {idx + 1} 屏</p>
                          <img
                            src={img}
                            alt={`${selectedProject.title} 细节图 ${idx + 1}`}
                            loading="lazy"
                            className="w-full h-auto object-contain rounded-xl border border-white/10 bg-black/30"
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

      {selectedCapability && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity"
            onClick={() => setSelectedCapability(null)}
          />
          <div className="relative w-full max-w-5xl max-h-full glass-panel bg-[#0a0512]/90 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="px-4 py-1.5 rounded-full bg-[#A855F7]/20 text-[#A855F7] text-sm font-medium">
                {selectedCapability.section}
              </span>
              <button
                onClick={() => setSelectedCapability(null)}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 md:p-10">
              {selectedCapability.customType === 'b2bFramework' ? (
                <MethodologyB2B />
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-white mb-3">{selectedCapability.title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">{selectedCapability.desc}</p>
                  {selectedCapability.detailPage && (
                    <div className="mb-8">
                      <iframe
                        src={selectedCapability.detailPage}
                        title={`${selectedCapability.title} Tech Edition`}
                        className="w-full h-[60vh] rounded-xl border border-white/10 bg-black/30"
                      />
                    </div>
                  )}
                  <ul className="space-y-3 text-gray-300 leading-relaxed list-disc pl-5">
                    {selectedCapability.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {selectedCapability.detailImages?.length > 0 && (
                    <div className="mt-8 space-y-6">
                      {selectedCapability.detailImages.map((img, idx) => (
                        <section key={img} className="space-y-2">
                          <p className="text-sm text-gray-500">第 {idx + 1} 屏</p>
                          <img
                            src={img}
                            alt={`${selectedCapability.title} 内容图 ${idx + 1}`}
                            loading="lazy"
                            className="w-full h-auto object-contain rounded-xl border border-white/10 bg-black/30"
                          />
                        </section>
                      ))}
                    </div>
                  )}
                  {selectedCapability.sections?.length > 0 && (
                    <div className="mt-8 space-y-6">
                      {selectedCapability.sections.map((section) => (
                        <section key={section.heading} className="space-y-2">
                          <h4 className="text-xl font-bold text-white">{section.heading}</h4>
                          <p className="text-gray-300 leading-relaxed">{section.content}</p>
                        </section>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const B2BLayerCard = ({ num, align, icon, title, enTitle, desc, tags }) => {
  const isLeft = align === 'left';

  return (
    <div className={`relative flex flex-col md:flex-row items-center w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      <div className="hidden sm:flex absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-900 border-4 border-[#070b14] rounded-full items-center justify-center z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <span className="text-sm font-black text-slate-500">{num}</span>
      </div>
      <div className="hidden md:block w-1/2" />
      <div className={`w-full md:w-1/2 pl-16 md:pl-0 sm:pl-24 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 text-left'}`}>
        <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm p-8 rounded-3xl hover:bg-slate-800/80 transition-all duration-300 group">
          <div className={`flex items-center mb-4 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
            <div className={`w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-700 group-hover:border-slate-500 transition-colors ${isLeft ? 'md:ml-4 order-last md:order-none' : 'mr-4'}`}>
              {icon}
            </div>
            <div className="ml-4 md:ml-0 flex-1 md:flex-none">
              <h3 className="text-2xl font-bold text-white">{title}</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{enTitle}</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">{desc}</p>
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[#070b14] text-slate-300 text-xs rounded-lg border border-slate-700/50 flex items-center">
                <CheckCircle2 size={12} className="mr-1.5 opacity-50" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MethodologyB2B = () => {
  return (
    <div className="w-full bg-[#070b14] text-slate-300 font-sans selection:bg-blue-500/30 overflow-x-hidden relative rounded-2xl border border-white/10 p-4 md:p-6">
      <div className="absolute top-0 left-1/4 w-[260px] h-[260px] bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[320px] h-[320px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-2 md:px-4 py-6 md:py-10 relative z-10 flex flex-col items-center">
        <div className="text-center mb-12 max-w-4xl flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 text-xs font-bold tracking-[0.2em] uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Methodology / B2B UX Framework</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">领域驱动 B 端体验架构</h1>
          <h2 className="text-lg md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6 italic">
            Domain-Driven Operational UX Architecture
          </h2>

          <div className="bg-slate-900/80 border-l-4 border-blue-500 p-6 md:p-8 rounded-r-2xl text-left max-w-3xl backdrop-blur-sm shadow-2xl">
            <p className="text-base md:text-lg text-slate-300 leading-relaxed font-medium">
              在多个 B 端系统设计实践中，我逐渐总结出一个可复用的体验设计框架。相比 C 端产品强调“用户转化路径”，B 端产品的核心挑战在于：<strong className="text-white">复杂业务流程、高频操作效率、数据准确性与风险控制</strong>。
              <br /><br />
              因此，B 端体验设计需要围绕 <strong className="text-blue-400">“业务执行与管控结构”</strong> 展开。
            </p>
          </div>
        </div>

        <div className="w-full mb-16 relative">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">五层业务驱动模型</h3>
            <p className="text-slate-500 tracking-wide uppercase text-sm font-bold">The 5-Layer Structure</p>
          </div>

          <div className="absolute left-8 md:left-1/2 top-[120px] bottom-10 w-px bg-gradient-to-b from-blue-500/50 via-indigo-500/50 to-emerald-500/50 md:-translate-x-1/2 hidden sm:block" />

          <div className="space-y-6 md:space-y-8 relative">
            <B2BLayerCard
              num="01"
              align="right"
              icon={<Network className="text-blue-400" size={28} />}
              title="业务域理解"
              enTitle="Domain Understanding"
              desc="任何 B 端设计都必须从业务领域结构出发。明确核心业务对象、业务流转方式以及风控校验环节。目标是建立业务模型（Business Model），为体验架构提供基础。"
              tags={['实体对象提取', '业务流转分析', '如：订单/物料/合同']}
            />
            <B2BLayerCard
              num="02"
              align="left"
              icon={<Zap className="text-cyan-400" size={28} />}
              title="执行操作流"
              enTitle="Execution Flow"
              desc="B 端系统中最频繁使用的部分，服务于一线操作人员（仓管/运营/发货）。核心原则是：优先保证业务可以顺畅执行。设计目标是操作效率最大化、认知负担最小化、允许业务容错。"
              tags={['扁平化表单', '批量操作', '快速录入', '自动填充']}
            />
            <B2BLayerCard
              num="03"
              align="right"
              icon={<Database className="text-indigo-400" size={28} />}
              title="数据沉淀层"
              enTitle="Data Ledger"
              desc="连接执行层与管理层的核心枢纽。所有执行操作最终沉淀为系统数据。承担数据统一记录、关系建立与历史追踪职责，确保系统具备完整的数据可追溯能力。"
              tags={['操作日志', '数据台账', '状态记录', '数据关系表']}
            />
            <B2BLayerCard
              num="04"
              align="left"
              icon={<ShieldCheck className="text-amber-400" size={28} />}
              title="管控决策层"
              enTitle="Control & Decision Layer"
              desc="当业务规模扩大后，系统需要支持管理与风控。主要用户是管理者与财务。相比执行层的效率，此层更强调数据的准确性、可解释性与风险控制。"
              tags={['对账系统', '审批流程', '数据分析', '财务结算']}
            />
            <B2BLayerCard
              num="05"
              align="right"
              icon={<Activity className="text-emerald-400" size={28} />}
              title="状态反馈系统"
              enTitle="System Feedback"
              desc="多角色协作与复杂流程中，系统必须持续向用户反馈业务状态。解决业务进度是否清晰、异常是否及时发现、跨角色信息是否同步的问题，让复杂业务保持可见与可控。"
              tags={['状态标签', '进度可视化', '异常提示', 'Dashboard']}
            />
          </div>
        </div>

        <div className="w-full bg-[#0a101d] border border-slate-800 rounded-[2rem] p-6 md:p-10 mb-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

          <div className="text-center mb-14">
            <div className="inline-block mb-3 px-3 py-1 bg-slate-800 text-slate-400 text-xs font-bold rounded-md uppercase tracking-wider">Case Application</div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">框架落地：智建云租</h3>
            <p className="text-slate-400">如何将五层架构应用于极其复杂的建材租赁业务</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="bg-slate-900/80 border border-slate-700/50 p-8 rounded-3xl hover:border-cyan-500/30 transition-colors group">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">02. 执行流：极简宽容</h4>
              <p className="text-sm text-cyan-400 mb-4">租出/归还单 双轨制表单</p>
              <p className="text-slate-400 text-sm leading-relaxed">放弃传统ERP强绑定的线性操作。将“库存计数”与“财务计价”拆分为双轨字段。一线仓管无需顾虑财务逻辑，只需极速录入实物收发，系统自动换算，允许业务错位流转。</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-700/50 p-8 rounded-3xl hover:border-amber-500/30 transition-colors group transform md:-translate-y-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">03/04. 数据与管控：严密兜底</h4>
              <p className="text-sm text-amber-400 mb-4">物料/财务 对账单系统</p>
              <p className="text-slate-400 text-sm leading-relaxed">前端释放的压力在底层汇聚为“动态物资池”。对账单作为核心风控阀门，同屏展示“盘点差异标红”与“合同赔偿条款”，辅助财务在复杂乱账中快速进行精准结算。</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-700/50 p-8 rounded-3xl hover:border-emerald-500/30 transition-colors group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                <Activity size={24} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">05. 状态反馈：消除信息差</h4>
              <p className="text-sm text-emerald-400 mb-4">项目总览 Dashboard</p>
              <p className="text-slate-400 text-sm leading-relaxed">全局状态告别干瘪的“进行中”。基于结算周期，可视化透传业务真实进度（如归还进度80%），并在卡片中明确透出“算头算尾”计费规则，让跨部门协作透明可控。</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl text-center py-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug mb-8">
            “ B端体验设计的核心，不是界面美观，<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              而是让复杂业务能够被高效执行、被准确记录、并被有效管控。
            </span> ”
          </h2>
          <p className="text-lg text-slate-500 font-medium tracking-wide">
            优秀的 B 端体验架构，本质是 <strong className="text-slate-300">业务执行效率</strong> 与 <strong className="text-slate-300">系统管控能力</strong> 之间的平衡。
          </p>
        </div>
      </div>
    </div>
  );
};
