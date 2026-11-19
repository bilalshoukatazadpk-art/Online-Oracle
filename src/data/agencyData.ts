export type ServiceCategory =
  | 'All'
  | 'Social & Growth'
  | 'Writing & Editorial'
  | 'AI & Automation'
  | 'Web & Experience';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: Exclude<ServiceCategory, 'All'>;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  idealFor: string;
  accent: 'orange' | 'magenta';
}

export type PortfolioCategory =
  | 'All'
  | 'Social Media & PR'
  | 'Digital Ecosystems'
  | 'Ghostwriting & Editorial'
  | 'AI & Automation'
  | 'Growth Campaigns';

export interface PortfolioItem {
  id: string;
  title: string;
  organization: string;
  roleAttribution: string;
  timeframe: string;
  category: Exclude<PortfolioCategory, 'All'>;
  attributionType: 'Founder-Led Engagement' | 'Agency Practice';
  headlineMetric: string;
  summary: string;
  challenge: string;
  execution: string[];
  outcome: string;
  platforms: string[];
  accent: 'orange' | 'magenta';
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  outputs: string[];
}

export type InsightCategory =
  | 'All'
  | 'AI & Production'
  | 'Social Strategy'
  | 'Editorial & Ghostwriting'
  | 'Digital Growth';

export interface InsightArticle {
  id: string;
  title: string;
  category: Exclude<InsightCategory, 'All'>;
  readTime: string;
  publishedDate: string;
  author: string;
  excerpt: string;
  takeaways: string[];
  body: string[];
}

export interface FounderMilestone {
  period: string;
  role: string;
  organization: string;
  location: string;
  highlight: string;
}

export const BRAND_ASSETS = {
  logoLight: '/assets/aistudio/bg__1__1869b23d.png',
  logoDark: '/assets/aistudio/bg__2__5562c4d5.png',
  founderPortrait: '/assets/aistudio/1793974885366.jpg_e74b4eff.jpeg',
  resumePdf: '/assets/aistudio/Bilal_Shoukat_-_Updated_Resume__2026__e2833b18.pdf',
} as const;

export const AGENCY_CONTACT = {
  email: 'bilal.shoukat.lhr@gmail.com',
  phones: ['+92-319-4972752', '+92-302-9080090', '+92-300-9872752'],
  location: 'Lahore, Punjab, Pakistan',
  serviceReach: 'Serving clients across Pakistan, UK, Middle East, Australia & Global Markets',
  linkedin: 'https://www.linkedin.com/in/bilal-shoukat-azad',
  socialLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bilal-shoukat-azad' },
    { label: 'Email Direct', href: 'mailto:bilal.shoukat.lhr@gmail.com' },
    { label: 'WhatsApp Consultation', href: 'https://wa.me/923194972752' },
  ],
} as const;

export const SERVICES: ServiceItem[] = [
  {
    id: 'social-media-management',
    number: '01',
    title: 'Social Media Management',
    category: 'Social & Growth',
    shortDescription:
      'Full-lifecycle omnichannel account governance, editorial calendars, community management, and KPI reporting.',
    fullDescription:
      'We manage your brand presence end-to-end across LinkedIn, Instagram, Facebook, YouTube, Pinterest, and X—aligning every post, comment, and campaign with measurable awareness and pipeline objectives.',
    deliverables: [
      'Omnichannel strategy & monthly content calendars',
      'Consistent publishing & active community moderation',
      'Audience engagement protocols & reputation stewardship',
      'Monthly GA4, Meta Insights & LinkedIn performance reports',
    ],
    idealFor: 'Consultancies, B2B firms, travel brands, nonprofits, and growing businesses',
    accent: 'orange',
  },
  {
    id: 'social-media-optimization',
    number: '02',
    title: 'Social Media Optimization (SMO)',
    category: 'Social & Growth',
    shortDescription:
      'Profile architecture, platform discoverability, hashtag intelligence, and organic engagement engineering.',
    fullDescription:
      'Turn passive social profiles into discoverable brand assets. We audit and restructure bios, visual hierarchy, posting cadences, search keywords, and cross-platform linking to maximize organic reach.',
    deliverables: [
      'Complete profile, bio & visual identity audit',
      'Keyword, hashtag & topic-cluster optimization',
      'Posting cadence & format mix calibration',
      'Competitor benchmarking & engagement velocity tracking',
    ],
    idealFor: 'Organizations with active accounts struggling to break past stagnant reach',
    accent: 'magenta',
  },
  {
    id: 'social-media-content-creation',
    number: '03',
    title: 'Social Media Content Creation',
    category: 'Social & Growth',
    shortDescription:
      'Scroll-stopping posts, strategic carousels, short-form reels, branded visuals, and integrated campaign assets.',
    fullDescription:
      'Every format is crafted for platform-native retention—from executive LinkedIn carousels and infographics to high-retention short-form video reels produced in Premiere Pro, CapCut, and Canva.',
    deliverables: [
      'Branded visual systems, carousels & infographics',
      'Short-form reels, explainers & promotional video edits',
      'Campaign creative suites for launches & seasonal offers',
      'Bilingual English & Urdu visual storytelling assets',
    ],
    idealFor: 'Brands seeking studio-grade creative consistency without an in-house production team',
    accent: 'orange',
  },
  {
    id: 'content-writing-copywriting',
    number: '04',
    title: 'Content Writing & Copywriting',
    category: 'Writing & Editorial',
    shortDescription:
      'Research-backed SEO articles, authoritative blogs, conversion website copy, and corporate communications.',
    fullDescription:
      'Built on two decades of editorial discipline and 360° source verification, our writing combines search visibility with persuasive human storytelling that positions your organization as a category authority.',
    deliverables: [
      'SEO-structured long-form articles & editorial blogs',
      'Website messaging, landing pages & service copy',
      'Press releases, brand narratives & B2B collateral',
      'Bilingual English & Urdu localization and adaptation',
    ],
    idealFor: 'Startups, B2B service firms, publishers, and mission-driven institutions',
    accent: 'magenta',
  },
  {
    id: 'ghostwriting',
    number: '05',
    title: 'Executive Ghostwriting',
    category: 'Writing & Editorial',
    shortDescription:
      'Confidential, research-driven ghostwriting for books, booklets, policy briefs, speeches, scripts, and publications.',
    fullDescription:
      'We emulate your intellectual voice, authority, and strategic vision to turn dense technical, policy, or commercial expertise into published books, executive columns, award dossiers, and keynote scripts.',
    deliverables: [
      'Research-based books, eBooks & technical booklets',
      'CEO thought-leadership articles & LinkedIn essays',
      'Policy briefs, institutional reports & award dossiers',
      'Keynote speeches, documentary & broadcast scripts',
    ],
    idealFor: 'Founders, CEOs, urbanists, engineers, consultants, and public-sector leaders',
    accent: 'orange',
  },
  {
    id: 'ai-powered-content-creation',
    number: '06',
    title: 'AI-Powered Content Creation',
    category: 'AI & Automation',
    shortDescription:
      'Hybrid human-AI production pipelines for text, generative visuals, synthetic video, voiceovers, and workflow scale.',
    fullDescription:
      'We pair editorial governance with cutting-edge generative AI—using ChatGPT, MidJourney, HeyGen, ElevenLabs, Pictory, D-ID, and Synthesia to multiply creative output while keeping human judgment in control.',
    deliverables: [
      'Custom LLM prompting & research acceleration workflows',
      'AI video presenters, avatar synthesis & voiceover localization',
      'Generative brand visual concepts & rapid storyboarding',
      'Bilingual (English/Urdu) automated content repurposing pipelines',
    ],
    idealFor: 'Teams scaling high-volume digital publishing with lean production budgets',
    accent: 'magenta',
  },
  {
    id: 'youtube-facebook-automation',
    number: '07',
    title: 'YouTube & Facebook Automation',
    category: 'AI & Automation',
    shortDescription:
      'End-to-end channel architecture, faceless video production systems, SEO publishing workflows, and audience scaling.',
    fullDescription:
      'From niche research and script pipelines to voice synthesis, editing templates, thumbnail testing, and YouTube Studio analytics, we build repeatable video publishing engines for YouTube and Facebook.',
    deliverables: [
      'Channel strategy, niche architecture & content blueprints',
      'Faceless & hybrid video production and publishing pipelines',
      'Title, thumbnail, metadata & retention optimization',
      'Cross-posting automation & monetization readiness',
    ],
    idealFor: 'Media entrepreneurs, educators, creators, and brands building video channels',
    accent: 'orange',
  },
  {
    id: 'web-development',
    number: '08',
    title: 'Web Development',
    category: 'Web & Experience',
    shortDescription:
      'Fast, responsive, SEO-engineered websites, WordPress platforms, and custom digital portals built to convert.',
    fullDescription:
      'We engineer modern, accessible, mobile-first websites with clean technical SEO foundations, analytics tracking (GA4 & UTM), lead-capture integrations, and reliable performance across devices.',
    deliverables: [
      'Responsive corporate websites & custom digital platforms',
      'CMS setup (WordPress & modern web frameworks)',
      'Technical SEO, speed optimization & GA4 instrumentation',
      'Lead-capture funnels, CRM & WhatsApp Business integrations',
    ],
    idealFor: 'Businesses launching a credible flagship digital presence or rebuilding legacy sites',
    accent: 'magenta',
  },
  {
    id: 'web-design',
    number: '09',
    title: 'Web Design & UI/UX',
    category: 'Web & Experience',
    shortDescription:
      'Google-certified UX architecture, wireframes, high-converting landing pages, and distinctive brand interfaces.',
    fullDescription:
      'Grounded in formal UX design methodology, we craft intuitive user journeys, wireframes, interactive prototypes, and high-contrast visual systems that reflect your agency authority and guide visitors to action.',
    deliverables: [
      'Information architecture, user flows & interactive wireframes',
      'High-conversion landing page & multi-page UI design',
      'Cohesive typography, color & component design systems',
      'Responsive desktop, tablet & mobile interface prototypes',
    ],
    idealFor: 'Founders and companies seeking an unmistakable visual identity online',
    accent: 'orange',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'sheher-saaz-omnichannel',
    title: 'International Omnichannel PR & Thought Leadership',
    organization: 'Sheher Saaz Private Limited',
    roleAttribution: 'Social Media Lead & PR Executive (Bilal Shoukat)',
    timeframe: 'July 2024 – Present',
    category: 'Social Media & PR',
    attributionType: 'Founder-Led Engagement',
    headlineMetric: '50%+ Documented Engagement Growth',
    summary:
      'Architected a six-platform digital communications and thought-leadership engine across Pakistan, London, and Sydney markets for Pakistan’s premier urban sustainability and architecture consultancy.',
    challenge:
      'Translate highly technical urban planning, climate resilience, renewable energy, and architecture expertise into authoritative global digital discourse while supporting international award nominations and B2B bids.',
    execution: [
      'Unified omnichannel content strategy across LinkedIn, Instagram, Facebook, YouTube, Pinterest, and X.',
      'Ghostwrote 50+ formal articles, research booklets, policy briefs, and award dossiers for senior leadership.',
      'Tracked audience performance via Google Analytics and Meta Insights to continuously refine topic velocity.',
      'Supported institutional business development through competitive RFPs, EOIs, grant proposals, and donor mapping.',
    ],
    outcome:
      'Achieved a documented 50%+ increase in audience engagement across Pakistan, London, and Sydney audiences while strengthening executive authority in international sustainability dialogues.',
    platforms: ['LinkedIn', 'Instagram', 'Facebook', 'YouTube', 'Pinterest', 'X'],
    accent: 'orange',
  },
  {
    id: 'placemaking-pakistan-ecosystem',
    title: 'Zero-to-One National Digital Identity & Platform',
    organization: 'Placemaking Pakistan',
    roleAttribution: 'Founding Strategist & Digital Lead (Bilal Shoukat)',
    timeframe: 'August 2024 – Present',
    category: 'Digital Ecosystems',
    attributionType: 'Founder-Led Engagement',
    headlineMetric: 'Zero-to-One National Platform Launch',
    summary:
      'Conceptualised and built the complete digital identity, web presence, editorial voice, and SDG-aligned narrative framework for Pakistan’s first national placemaking platform.',
    challenge:
      'Establish credibility from inception for a pioneering urban resilience and people-centred public space movement founded by urbanist Khurram Farid Bargatt.',
    execution: [
      'Created Pakistan’s first placemaking-specific content strategy, visual branding, and editorial tone.',
      'Developed policy advocacy narratives, visual toolkits, and communications for workshops and government forums.',
      'Aligned public campaigns with UN Sustainable Development Goals, gender equity in planning, and community inclusion.',
      'Bridged grassroots Pakistani urban narratives with international placemaking networks.',
    ],
    outcome:
      'Delivered a cohesive, recognizable national digital platform connecting civic institutions, urbanists, and international sustainability stakeholders.',
    platforms: ['Web Presence', 'Visual Identity', 'Policy Toolkits', 'Cross-Platform Social'],
    accent: 'magenta',
  },
  {
    id: 'online-oracle-ai-pipelines',
    title: 'Hybrid Generative AI & Bilingual Production Studio',
    organization: 'Online Oracle Digital Media Agency',
    roleAttribution: 'Founder, CEO & Content Marketing Director',
    timeframe: 'February 2022 – Present',
    category: 'AI & Automation',
    attributionType: 'Agency Practice',
    headlineMetric: '5 Industry Verticals Served',
    summary:
      'Built boutique digital marketing and AI-assisted content production workflows serving travel, education, media, nonprofit, and technology clients with multidisciplinary creative teams.',
    challenge:
      'Help lean organizations maintain high-frequency, bilingual (English/Urdu) multimedia publishing and lead-generation funnels without sacrificing research depth or brand voice.',
    execution: [
      'Pioneered automated text-to-video, AI avatar synthesis, and voiceover workflows using ChatGPT, HeyGen, ElevenLabs, Pictory, and MidJourney.',
      'Built faceless YouTube channel development blueprints and scalable bilingual content localization pipelines.',
      'Recruited, mentored, and directed writers, video editors, graphic designers, and digital marketers across concurrent client accounts.',
      'Structured ROI performance reporting across full-funnel campaigns and lead-generation channels.',
    ],
    outcome:
      'Established a repeatable hybrid AI-human production model that accelerates delivery speed while preserving human editorial accuracy.',
    platforms: ['YouTube Automation', 'HeyGen & ElevenLabs', 'MidJourney', 'Bilingual Funnels'],
    accent: 'orange',
  },
  {
    id: 'altec-engineers-b2b',
    title: 'B2B Engineering Brand Authority & Technical Ghostwriting',
    organization: 'ALTEC Engineers',
    roleAttribution: 'Marketing, Social Media & PR Manager (Bilal Shoukat)',
    timeframe: '2021–2023 Full-Time · 2025–Present Remote',
    category: 'Ghostwriting & Editorial',
    attributionType: 'Founder-Led Engagement',
    headlineMetric: 'Multi-Year B2B Governance & Crisis PR',
    summary:
      'Directed full B2B marketing, technical ghostwriting, media outreach, award nominations, and reputational crisis protocols for a civil and MEP engineering consultancy.',
    challenge:
      'Position a specialized engineering consultancy as a credible, procurement-ready partner across competitive B2B tenders and technical executive audiences.',
    execution: [
      'Ghostwrote technical research booklets, executive articles, and corporate communications for leadership.',
      'Managed six social platforms (LinkedIn, Instagram, Facebook, YouTube, Pinterest, X) with engineering-focused brand positioning.',
      'Built media relations for project launches and authored crisis communication protocols to protect institutional credibility.',
    ],
    outcome:
      'Elevated B2B procurement credibility and sustained long-term trust—leading to renewed remote social media governance leadership in 2025.',
    platforms: ['Technical Booklets', 'LinkedIn B2B', 'PR & Crisis Protocols'],
    accent: 'magenta',
  },
  {
    id: 'yamama-travel-growth',
    title: 'Full-Funnel Religious Tourism & Regional Lead Engine',
    organization: 'Yamama Travel and Tours Pvt. Ltd.',
    roleAttribution: 'Social Media & Marketing Manager (Bilal Shoukat)',
    timeframe: 'September 2023 – July 2024',
    category: 'Growth Campaigns',
    attributionType: 'Founder-Led Engagement',
    headlineMetric: 'Full-Funnel Video + WhatsApp Conversion',
    summary:
      'Directed multi-platform digital marketing, SEO/SEM optimization, promotional video ads, and WhatsApp Business broadcast funnels for Umrah and Southeast Asia tour packages.',
    challenge:
      'Capture high-intent seasonal travel demand in a competitive religious and regional tourism market while maintaining qualified direct-to-sales inquiries.',
    execution: [
      'Executed seasonal package campaigns paired with targeted promotional video creatives.',
      'Optimized organic and paid search visibility (SEO/SEM) alongside social lead ads.',
      'Engineered structured WhatsApp Business broadcast funnels to convert inquiries into bookings.',
    ],
    outcome:
      'Built a repeatable direct-response acquisition pipeline linking social video discovery directly to sales consultations.',
    platforms: ['Meta Ads', 'Promotional Video', 'SEO/SEM', 'WhatsApp Business'],
    accent: 'orange',
  },
  {
    id: 'editorial-archive-10000',
    title: 'Two Decades of Research-Backed Editorial Publishing',
    organization: 'Azadiyat · Mukaalma.com · Daleel.pk · Baaghi TV · Star Asia News',
    roleAttribution: 'Columnist, Head of Blog Section & Content Producer (Bilal Shoukat)',
    timeframe: 'August 2005 – Present',
    category: 'Ghostwriting & Editorial',
    attributionType: 'Founder-Led Engagement',
    headlineMetric: '10,000+ Published Articles & Scripts',
    summary:
      'Sustained unbroken 20-year research-grounded editorial practice spanning geopolitical analysis, media critique, newsroom scripting, and SEO blog division leadership.',
    challenge:
      'Maintain strict source verification, distinct analytical voice, and high publication volume across multi-platform Urdu and bilingual digital newsrooms.',
    execution: [
      'Authored 10,000+ research-based pieces across Azadiyat, including 300+ columns on Mukaalma.com and 300+ articles on Daleel.pk.',
      'Directed Baaghi TV’s digital blog division, supervising writers and implementing SEO topical strategies.',
      'Produced multimedia news packages, scripts, bulletins, and storyboards at Star Asia News.',
    ],
    outcome:
      'Demonstrated rare editorial endurance, newsroom discipline, and complex-to-clear synthesis that now anchors Online Oracle’s content standards.',
    platforms: ['Long-Form Journalism', 'SEO Newsrooms', 'Broadcast Scripts', 'Urdu & English'],
    accent: 'magenta',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    subtitle: 'Alignment & Commercial Context',
    description:
      'We begin by listening—auditing your business model, audience reality, brand voice, existing channels, and commercial targets so creative decisions solve real business problems.',
    outputs: ['Brand & channel audit', 'Stakeholder goals brief', 'KPI baseline definition'],
  },
  {
    number: '02',
    title: '360° Research',
    subtitle: 'Verified Intelligence & Positioning',
    description:
      'Applying our founder’s 360° research methodology, we map competitors, search intent, audience pain points, cultural nuance, and verified domain references before writing a single word.',
    outputs: ['Competitor & market matrix', 'Keyword & topic clusters', 'Audience persona map'],
  },
  {
    number: '03',
    title: 'Strategy',
    subtitle: 'Narrative & Channel Architecture',
    description:
      'We translate research into a clear narrative architecture—defining content pillars, platform roles, funnel touchpoints, bilingual localization rules, and AI-human workflow boundaries.',
    outputs: ['Omnichannel content strategy', 'Editorial tone & voice guide', 'Funnel & conversion map'],
  },
  {
    number: '04',
    title: 'Planning',
    subtitle: 'Calendars, Scripts & Wireframes',
    description:
      'Every deliverable moves into structured production schedules: editorial calendars, video storyboards, UX wireframes, and milestone sign-offs with zero guesswork.',
    outputs: ['Monthly publishing roadmap', 'Creative briefs & storyboards', 'UX wireframes & prototypes'],
  },
  {
    number: '05',
    title: 'Creation',
    subtitle: 'Editorial Craft + AI Velocity',
    description:
      'Our writers, designers, editors, and AI production specialists craft high-authority articles, ghostwritten publications, reels, visual systems, and responsive web experiences.',
    outputs: ['Publication-ready copy & scripts', 'Branded visuals & video reels', 'Responsive web builds'],
  },
  {
    number: '06',
    title: 'Implementation',
    subtitle: 'Publishing, Launch & Automation',
    description:
      'We deploy across your ecosystem—optimizing metadata, scheduling cross-platform releases, launching automated YouTube/Facebook or WhatsApp funnels, and ensuring crisp QA.',
    outputs: ['Live cross-platform rollout', 'SEO & UTM tracking setup', 'Automated publishing workflows'],
  },
  {
    number: '07',
    title: 'Performance Optimization',
    subtitle: 'Analytics & Compounding Growth',
    description:
      'Launch is the starting line. Using GA4, Meta Insights, LinkedIn Analytics, and YouTube Studio, we test creatives, double down on high-retention formats, and refine ROI every cycle.',
    outputs: ['Monthly KPI & ROI dashboards', 'A/B creative iterations', 'Next-quarter growth roadmap'],
  },
];

export const WHY_CHOOSE_US = [
  {
    number: '01',
    title: 'Research-First Editorial Authority',
    description:
      'Most agencies recycle surface-level templates. Online Oracle is built on 20+ years of verified research and 10,000+ published works—producing content that earns genuine executive and audience trust.',
    proof: '10,000+ published research pieces by founder',
  },
  {
    number: '02',
    title: 'Certified Human + AI Hybrid Production',
    description:
      'Led by a Google Certified AI Professional and Oxford/UNESCO AI governance credential holder, we combine generative AI speed with strict human editorial judgment and brand ethics.',
    proof: '18+ Google, Coursera & Oxford/UNESCO certifications',
  },
  {
    number: '03',
    title: 'Commercial & Territory Sales Acumen',
    description:
      'Eight years of award-winning pharmaceutical territory sales leadership taught us that creative work only succeeds when it drives real pipeline, retention, and measurable commercial outcomes.',
    proof: 'Two-time national 100%+ sales target award winner',
  },
  {
    number: '04',
    title: 'Bilingual & Cross-Market Cultural Fluency',
    description:
      'We bridge South Asian, Middle Eastern, UK, and international markets with native Urdu/Punjabi nuance and sharp professional English communications tailored to global audiences.',
    proof: 'Campaign experience across Pakistan, London & Sydney',
  },
  {
    number: '05',
    title: 'Single-Partner Full-Stack Capability',
    description:
      'From executive ghostwriting and omnichannel social media to YouTube automation and UX-engineered web platforms, one cohesive strategic vision eliminates agency handoff friction.',
    proof: '9 integrated content, AI, social & web disciplines',
  },
];

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: 'hybrid-ai-content-governance',
    title: 'Hybrid Human-AI Production: Scaling Output Without Losing Brand Voice',
    category: 'AI & Production',
    readTime: '6 min read',
    publishedDate: 'October 2026',
    author: 'Bilal Shoukat Azad',
    excerpt:
      'Why pure AI content fails to build authority—and how structured prompt engineering paired with human editorial verification creates a decisive competitive moat.',
    takeaways: [
      'Use generative AI for research synthesis, outline stress-testing, visual prototyping, and multilingual drafts—never unverified final publication.',
      'Anchor every AI workflow in a written brand voice bible and verified primary sources.',
      'Combine tools like ChatGPT, ElevenLabs, HeyGen, and MidJourney into repeatable pipelines with human QA gates.',
    ],
    body: [
      'Across digital marketing, audiences have developed an instant radar for generic, mass-produced AI copy. When every competitor publishes the same predictable lists and hollow adjectives, volume alone stops creating advantage.',
      'At Online Oracle, we treat generative AI as a production multiplier rather than a substitute for thinking. Every assignment begins with human-led 360° research: interviewing stakeholders, auditing primary data, and defining an unmistakable point of view.',
      'Once the narrative spine is locked, AI accelerates execution across formats. A single research-backed pillar brief can be structured into executive LinkedIn carousels, bilingual English/Urdu summaries, storyboarded video scripts, and synthetic voiceover tests in a fraction of traditional turnaround time.',
      'The organizations winning attention in 2026 are not choosing between human craft and AI automation—they are designing disciplined hybrid pipelines where human editors govern truth, tone, and strategy while AI removes repetitive production friction.',
    ],
  },
  {
    id: 'omnichannel-social-authority',
    title: 'How Omnichannel Strategy Drives 50%+ Engagement Growth in Technical Sectors',
    category: 'Social Strategy',
    readTime: '5 min read',
    publishedDate: 'September 2026',
    author: 'Bilal Shoukat Azad',
    excerpt:
      'Lessons from transforming complex urban sustainability and engineering expertise into high-engagement social ecosystems across Pakistan, London, and Sydney.',
    takeaways: [
      'Stop copy-pasting identical posts across LinkedIn, Instagram, YouTube, and X—adapt the narrative geometry to each platform.',
      'Pair institutional updates with clear human takeaways, visual data storytelling, and executive perspectives.',
      'Review GA4 and Meta Insights monthly to prune low-retention formats and double down on high-signal topics.',
    ],
    body: [
      'Technical consultancies, engineering firms, and B2B organizations often struggle on social media because they mistake corporate announcements for audience value. Press-release captions rarely spark conversation or build international visibility.',
      'When architecting omnichannel growth across LinkedIn, Instagram, Facebook, YouTube, Pinterest, and X, the breakthrough comes from translating dense technical domains—such as urban climate resilience or MEP engineering—into clear human stakes.',
      'On LinkedIn, decision-makers respond to analytical frameworks, project lessons, and leadership essays. On Instagram and Facebook, visual carousels and concise reels make complex ideas immediately scannable. On YouTube, structured explainers build long-tail search discovery.',
      'Consistent analytics discipline closes the loop. By pairing every creative cycle with platform insights and UTM tracking, teams move from guesswork to compounding engagement growth.',
    ],
  },
  {
    id: 'executive-ghostwriting-credibility',
    title: 'Executive Ghostwriting: Turning Leadership Expertise into Published Authority',
    category: 'Editorial & Ghostwriting',
    readTime: '7 min read',
    publishedDate: 'August 2026',
    author: 'Bilal Shoukat Azad',
    excerpt:
      'Founders and CEOs hold decades of hard-won insight but rarely have time to write. Here is how executive voice emulation turns tacit knowledge into books, policy briefs, and market trust.',
    takeaways: [
      'Great ghostwriting never sounds like a ghostwriter—it captures the principal’s cadence, conviction, and domain vocabulary.',
      'Research-verified booklets, policy papers, and award dossiers directly strengthen B2B procurement and institutional credibility.',
      'A structured interview-to-manuscript cadence lets busy executives publish consistently in under two hours a month.',
    ],
    body: [
      'In high-trust industries—from urban architecture and engineering to consulting and social impact—buyers evaluate the intellectual credibility of leadership long before signing a contract.',
      'Yet the people with the deepest operational insights are almost always the busiest people in the room. Executive ghostwriting bridges that gap when treated as collaborative journalism rather than generic copywriting.',
      'Our process relies on focused discovery interviews, rigorous background verification, and voice emulation. Whether producing a technical research booklet, an international award dossier, a keynote speech, or an executive column, every argument is grounded in verifiable evidence and aligned with the leader’s authentic perspective.',
      'Over time, published thought leadership becomes a permanent business development asset—opening doors to conferences, institutional partnerships, and inbound opportunities that cold outreach rarely reaches.',
    ],
  },
  {
    id: 'youtube-automation-retention-systems',
    title: 'Architecting Sustainable YouTube & Facebook Automation Workflows',
    category: 'Digital Growth',
    readTime: '5 min read',
    publishedDate: 'July 2026',
    author: 'Bilal Shoukat Azad',
    excerpt:
      'Building a scalable video channel requires more than automated tools—it demands repeatable topic validation, hook engineering, and clean cross-platform distribution.',
    takeaways: [
      'Validate topic demand and search intent before investing in production templates.',
      'Design modular production stages: scriptwriting, voice synthesis, visual pacing, thumbnail A/B testing, and retention auditing.',
      'Repurpose long-form YouTube assets cleanly into Facebook video and vertical reels to multiply ROI per script.',
    ],
    body: [
      'Video automation is frequently misunderstood as low-effort spam. In reality, platforms aggressively reward viewer satisfaction and average view duration—meaning weak automated videos disappear immediately.',
      'A high-performing YouTube and Facebook automation engine is an editorial assembly line. It starts with topic validation, tight narrative pacing in the first 30 seconds, crisp voiceover delivery (human or calibrated ElevenLabs synthesis), and purposeful visual storytelling.',
      'When each step—research, scripting, editing, thumbnail design, metadata SEO, and scheduled publishing—follows documented standards, channels can publish reliably every week without burning out founders or sacrificing quality.',
    ],
  },
];

export const FOUNDER_PROFILE = {
  name: 'Bilal Shoukat Azad',
  headline: 'Founder, CEO & Content Marketing Director — Online Oracle',
  currentLeadership: 'Social Media Lead & PR Executive at Sheher Saaz Private Limited · Founding Strategist & Digital Lead at Placemaking Pakistan',
  location: 'Lahore, Punjab, Pakistan',
  experienceYears: '22+',
  publishedPieces: '10,000+',
  certificationsCount: '18+',
  engagementGrowth: '50%+',
  bioParagraphs: [
    'Bilal Shoukat Azad is a multidisciplinary senior communications strategist with approximately 22 years of cross-sector experience spanning social media strategy, public relations, executive ghostwriting, digital communications, research-based content creation, and AI-powered media production.',
    'He founded Online Oracle in February 2022 to bring newsroom-grade research rigor, commercial discipline, and modern generative AI production workflows to entrepreneurs, startups, consultancies, and mission-driven institutions.',
    'Concurrently, he serves as Social Media Lead & PR Executive at Sheher Saaz Private Limited (operating across Pakistan, London, and Sydney) and as Founding Strategist & Digital Lead for Placemaking Pakistan—having previously led B2B marketing and PR at ALTEC Engineers, digital marketing at Yamama Travel & Tours, blog operations at Baaghi TV, and newsroom production at Star Asia News.',
    'Before transitioning full-time into digital communications, Bilal spent eight years in pharmaceutical territory sales leadership across five companies—earning consecutive national sales awards at ATCO Laboratories—giving Online Oracle a grounded commercial edge rarely found in purely creative agencies.',
  ],
  timeline: [
    {
      period: 'Feb 2022 – Present',
      role: 'Founder, CEO & Content Marketing Director',
      organization: 'Online Oracle, Digital Media Agency',
      location: 'Pakistan (Hybrid)',
      highlight:
        'Directs full-funnel digital marketing, content strategy, branding, video production, and generative AI pipelines across travel, education, media, nonprofit, and tech sectors.',
    },
    {
      period: 'Jul 2024 – Present',
      role: 'Social Media Lead & PR Executive',
      organization: 'Sheher Saaz Private Limited',
      location: 'Lahore · London · Sydney',
      highlight:
        'Delivered 50%+ documented engagement growth across 6 platforms, 50+ formal & ghostwritten sustainability pieces, executive support, and B2B proposal/bid research.',
    },
    {
      period: 'Aug 2024 – Present',
      role: 'Founding Strategist & Digital / Social Media Lead',
      organization: 'Placemaking Pakistan',
      location: 'Lahore (Hybrid)',
      highlight:
        'Built Pakistan’s first national placemaking platform’s digital identity, web presence, editorial voice, and SDG-aligned advocacy narratives from zero to one.',
    },
    {
      period: 'Jul 2021 – Aug 2023 · Aug 2025 – Present',
      role: 'Marketing, Social Media & PR Manager',
      organization: 'ALTEC Engineers',
      location: 'Lahore (Full-Time / Remote)',
      highlight:
        'Led B2B engineering brand positioning, ghostwrote technical research booklets, managed 6 social channels, and authored crisis PR protocols.',
    },
    {
      period: 'Sep 2023 – Jul 2024',
      role: 'Social Media & Marketing Manager',
      organization: 'Yamama Travel and Tours Pvt. Ltd.',
      location: 'Raiwind, Pakistan',
      highlight:
        'Directed full-funnel digital marketing, SEO/SEM, promotional video ads, and WhatsApp Business funnels for Umrah and Southeast Asia tour packages.',
    },
    {
      period: 'Jul 2022 – Mar 2023',
      role: 'Content Producer & Head of Blog Section',
      organization: 'Star Asia News & Baaghi TV',
      location: 'Lahore, Pakistan',
      highlight:
        'Produced multimedia news scripts, bulletins, and storyboards while directing Baaghi TV’s SEO-driven digital blog division.',
    },
    {
      period: 'Aug 2005 – Present',
      role: 'Research Columnist & Editorial Writer',
      organization: 'Azadiyat · Mukaalma.com · Daleel.pk',
      location: 'Pakistan',
      highlight:
        'Authored 10,000+ research-based articles and columns across two unbroken decades covering geopolitics, diplomacy, history, and media critique.',
    },
    {
      period: 'Apr 2013 – Jun 2021',
      role: 'Territory Manager / Junior District Sales Manager',
      organization: 'ATCO Labs · Hilton Pharma · Macter · Herbion · Foray',
      location: 'Lahore, Sadiqabad & Bahawalpur',
      highlight:
        '8 years in pharmaceutical sales leadership; two-time winner of ATCO’s "Medal & Incentive Foreign Tour" award (2013–14, 2014–15) for surpassing 100% annual targets.',
    },
  ] as FounderMilestone[],
  certifications: [
    {
      issuer: 'Google / Coursera (2025–2026)',
      items: [
        'Google AI Professional & Prompting Essentials',
        'Advanced Data Analytics & Business Intelligence',
        'Digital Marketing & E-Commerce',
        'UX Design & Agile Project Management',
        'IT Automation with Python, IT Support & Cybersecurity',
      ],
    },
    {
      issuer: 'University of Oxford / UNESCO (Sep 2025)',
      items: [
        'AI, Justice & Rule of Law',
        'AI & Digital Transformation in Government',
      ],
    },
    {
      issuer: 'Academic & Journalism Credentials',
      items: [
        'Bachelor of Arts (BA) — Journalism, Media Studies, PR, IR & Sociology, The Islamia University of Bahawalpur',
        'Diplomas in Media & Mass Communication, ADIT, HSE & Office Management (SDCL Lahore)',
        'Certificate of Journalism — National Institute of Journalism, Islamabad',
      ],
    },
  ],
  civicLeadership: [
    'Pakistan Federal Union of Columnists (PFUC) — Active Member (2019–Present), Finance Secretary (2023), VP Central Punjab (2022), General Secretary Central Punjab (2021)',
    'Head of PR, Mohsineen Youth Squad & Mohsineen Youth Convention (2022)',
    'Campaign Communications Lead, "Sub Ka Pakistan" Campaign (2016)',
  ],
  languages: [
    { name: 'Urdu', level: 'Native' },
    { name: 'Punjabi', level: 'Native' },
    { name: 'English', level: 'Professional Working' },
    { name: 'Sindhi', level: 'Limited Working' },
    { name: 'Saraiki', level: 'Read & Write' },
    { name: 'Arabic', level: 'Elementary' },
  ],
  toolStack: [
    'ChatGPT & Prompt Engineering',
    'HeyGen · Synthesia · D-ID · Pictory',
    'ElevenLabs · MidJourney',
    'Adobe Premiere Pro · CapCut · Canva · OBS Studio',
    'Google Analytics (GA4) · Meta Insights · YouTube Studio',
    'WordPress · Mailchimp · WhatsApp Business · Notion',
  ],
};
