export const SITE = {
  name: "Animesh Jaiswal",
  title: "Animesh Jaiswal — AI Consultant • Senior Product Designer • Creative Technologist",
  description:
    "Animesh Jaiswal designs intelligent digital experiences — AI consulting, senior product design, creative technology, ComfyUI systems, generative pipelines and cinematic interfaces.",
  url: "https://animeshjaiswal.com",
  email: "hello@animeshjaiswal.com",
  socials: {
    linkedin: "https://linkedin.com/in/animeshjaiswal",
    behance: "https://behance.net/animeshjaiswal",
    github: "https://github.com/animeshjaiswal",
    instagram: "https://instagram.com/animesh.designs",
  },
} as const;

export const NAV = [
  { href: "/", label: "Index", index: "00" },
  { href: "/about", label: "About", index: "01" },
  { href: "/projects", label: "Projects", index: "02" },
  { href: "/services", label: "Services", index: "03" },
  { href: "/process", label: "Process", index: "04" },
  { href: "/ai-lab", label: "AI Lab", index: "05" },
  { href: "/experience", label: "Experience", index: "06" },
  { href: "/testimonials", label: "Testimonials", index: "07" },
  { href: "/blog", label: "Insights", index: "08" },
  { href: "/skills", label: "Skills", index: "09" },
  { href: "/contact", label: "Contact", index: "10" },
];

export const STATS = [
  { value: 9, suffix: "+", label: "Years Crafting Experiences" },
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 42, suffix: "", label: "AI Systems Built" },
  { value: 60, suffix: "+", label: "Brands Worked With" },
];

export const SERVICES = [
  {
    id: "ai-consulting",
    title: "AI Consulting",
    desc: "Strategic AI integration across product, content and operations. Roadmaps, audits and high-leverage automation systems.",
    deliverables: ["Capability audit", "AI roadmap", "Pilot prototypes", "Team enablement"],
  },
  {
    id: "product-design",
    title: "Product Design",
    desc: "End-to-end senior product design — research, systems, interaction, motion. Shipping at the level of the world's best teams.",
    deliverables: ["Discovery & research", "Design systems", "UX architecture", "High-fidelity UI"],
  },
  {
    id: "creative-direction",
    title: "Creative Direction",
    desc: "Art direction for brands, products and immersive launches. From narrative to motion to interface.",
    deliverables: ["Brand worlds", "Narrative", "Motion language", "Launch direction"],
  },
  {
    id: "ai-workflows",
    title: "AI Workflow Automation",
    desc: "Custom pipelines that compress weeks of work into hours — engineered for studios, founders and product teams.",
    deliverables: ["Pipeline architecture", "Agentic systems", "Tooling", "Ops dashboards"],
  },
  {
    id: "comfyui",
    title: "ComfyUI Systems",
    desc: "Production-grade ComfyUI graphs for image, video and editorial generation. Modular, reproducible, performant.",
    deliverables: ["Graph design", "Custom nodes", "Style models", "Render farms"],
  },
  {
    id: "generative-video",
    title: "Generative Video Pipelines",
    desc: "End-to-end generative video — concept, prompt design, character consistency, finishing — engineered like a film studio.",
    deliverables: ["Concept boards", "Veo / model pipelines", "Edit & finish", "Delivery"],
  },
  {
    id: "motion-design",
    title: "Motion Design Systems",
    desc: "Codified motion languages for products — easing curves, choreography, micro-systems that make interfaces feel alive.",
    deliverables: ["Motion principles", "Component motion", "Reels & launch", "Documentation"],
  },
  {
    id: "ux-strategy",
    title: "UX Strategy",
    desc: "Product strategy with a designer's eye — positioning, jobs to be done, IA, decision frameworks and metric instrumentation.",
    deliverables: ["Strategy sprints", "JTBD mapping", "Information architecture", "OKR design"],
  },
];

export const PROCESS_STAGES = [
  { id: "01", title: "Discovery", body: "Listening, mapping, surfacing the deeper signal beneath the brief." },
  { id: "02", title: "Research", body: "Users, market, models, materials. Evidence over opinion." },
  { id: "03", title: "Strategy", body: "Sharp positioning, decision frameworks, measurable bets." },
  { id: "04", title: "Design", body: "Editorial systems, interaction craft, motion language." },
  { id: "05", title: "AI Integration", body: "Embedding intelligence with intent — never decoration." },
  { id: "06", title: "Automation", body: "Pipelines that compress timelines and amplify the team." },
  { id: "07", title: "Deployment", body: "Shipping with rigor — performance, accessibility, polish." },
  { id: "08", title: "Optimization", body: "Instrumentation, iteration, compounding returns." },
];

export const PROJECTS = [
  {
    slug: "halo-os",
    title: "Halo OS",
    client: "Halo Systems",
    year: "2025",
    category: "Product Design",
    summary: "An operating layer for AI-native teams. Multi-agent orchestration, cinematic UI, real-time workflow visualization.",
    tags: ["Product", "AI", "Design System"],
    accent: "#5b8cff",
  },
  {
    slug: "veo-atelier",
    title: "Veo Atelier",
    client: "Independent Studio",
    year: "2025",
    category: "Generative Video",
    summary: "A generative video atelier built on Veo — character-consistent pipelines for narrative short-form and brand films.",
    tags: ["Generative", "Pipeline", "Film"],
    accent: "#9b87ff",
  },
  {
    slug: "atlas-finance",
    title: "Atlas Finance",
    client: "Atlas Capital",
    year: "2024",
    category: "Product Design",
    summary: "A wealth platform reimagined as a calm, editorial intelligence layer over a noisy market.",
    tags: ["Fintech", "Product", "UX"],
    accent: "#5b8cff",
  },
  {
    slug: "noir-comfy",
    title: "Noir ComfyUI Stack",
    client: "Internal R&D",
    year: "2024",
    category: "ComfyUI Systems",
    summary: "A production ComfyUI stack for editorial photography — consistent character, lens and grade across a 400-image campaign.",
    tags: ["ComfyUI", "Generative", "Photography"],
    accent: "#9b87ff",
  },
  {
    slug: "mirror-brand",
    title: "Mirror — Brand World",
    client: "Mirror AI",
    year: "2024",
    category: "Creative Direction",
    summary: "Brand world, motion identity and product narrative for a flagship consumer AI product.",
    tags: ["Brand", "Direction", "Motion"],
    accent: "#5b8cff",
  },
  {
    slug: "north-automation",
    title: "North — Agentic Ops",
    client: "North Studio",
    year: "2023",
    category: "AI Automation",
    summary: "A multi-agent operations layer that runs a 14-person studio's intake, briefing and creative QA.",
    tags: ["Agents", "Ops", "Automation"],
    accent: "#9b87ff",
  },
];

export const TIMELINE = [
  { year: "2016", title: "Beginning", body: "Started as a product designer working on early-stage consumer apps in Mumbai." },
  { year: "2018", title: "Studios", body: "Joined a creative studio leading interaction & motion for global launches." },
  { year: "2020", title: "Senior", body: "Senior product designer shipping flagship products at scale." },
  { year: "2022", title: "AI Inflection", body: "Pivoted into AI tooling — early ComfyUI, agents, multimodal pipelines." },
  { year: "2023", title: "Consulting", body: "Founded an independent consulting practice for AI-native teams." },
  { year: "2025", title: "Now", body: "Designing intelligent digital experiences for studios, founders and brands." },
];

export const TESTIMONIALS = [
  {
    quote:
      "Animesh moves between strategy, design and engineering like very few people I've worked with. He raised the bar for our entire team.",
    author: "Priya Menon",
    role: "CEO, Halo Systems",
  },
  {
    quote:
      "He architected an AI pipeline that turned a 6-week production into a 3-day one without compromising craft. Surgical work.",
    author: "Lucas Hartmann",
    role: "Founder, North Studio",
  },
  {
    quote:
      "A rare blend — an aesthetic eye, deep product instinct and the technical depth to ship the system himself.",
    author: "Rhea Kapoor",
    role: "Head of Product, Atlas Capital",
  },
  {
    quote:
      "Working with Animesh felt like adding a senior partner to the team. The work he delivered is still our north star.",
    author: "Daniel Ofori",
    role: "Creative Director, Mirror AI",
  },
];

export const POSTS = [
  {
    slug: "designing-for-agentic-products",
    title: "Designing for Agentic Products",
    excerpt: "When the product is no longer a tool but a teammate, the design language changes underneath us.",
    category: "AI Workflows",
    date: "Apr 2026",
    read: "8 min",
  },
  {
    slug: "the-comfyui-studio",
    title: "The ComfyUI Studio",
    excerpt: "Treating ComfyUI like a film studio — departments, dailies, finishing — and what we learned shipping 400 frames.",
    category: "Generative Media",
    date: "Mar 2026",
    read: "11 min",
  },
  {
    slug: "motion-as-meaning",
    title: "Motion as Meaning",
    excerpt: "Motion is the grammar of trust. A small case for treating it like typography.",
    category: "Motion Design",
    date: "Feb 2026",
    read: "6 min",
  },
  {
    slug: "interfaces-that-disappear",
    title: "Interfaces That Disappear",
    excerpt: "The next decade of design is about removing the interface and exposing the model.",
    category: "Future Interfaces",
    date: "Jan 2026",
    read: "9 min",
  },
  {
    slug: "creative-automation-playbook",
    title: "A Creative Automation Playbook",
    excerpt: "A field-tested set of patterns for embedding AI into a creative org without breaking the soul of it.",
    category: "Creative Automation",
    date: "Dec 2025",
    read: "12 min",
  },
  {
    slug: "the-quiet-design-system",
    title: "The Quiet Design System",
    excerpt: "Restraint is the new maximalism. Notes on systems that whisper.",
    category: "Product Design",
    date: "Nov 2025",
    read: "7 min",
  },
];

export const AI_LAB = [
  { title: "Neural Atelier · 01", tag: "Generative Image", hue: "from-electric/30 to-violet-mist/20" },
  { title: "Veo Cinematica", tag: "Generative Video", hue: "from-violet-mist/30 to-electric/20" },
  { title: "Mirror Field", tag: "Real-time WebGL", hue: "from-electric/30 to-violet-deep/20" },
  { title: "Comfy Loom", tag: "ComfyUI Graph", hue: "from-violet-deep/40 to-electric/10" },
  { title: "Agent Choir", tag: "Multi-Agent System", hue: "from-electric/40 to-violet-mist/10" },
  { title: "Signal Garden", tag: "Audio-Reactive", hue: "from-violet-mist/20 to-electric/30" },
  { title: "Editorial Engine", tag: "AI Layout", hue: "from-electric/20 to-violet-deep/30" },
  { title: "Holo Sculpt", tag: "3D Generative", hue: "from-violet-mist/30 to-electric/30" },
];
