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
  calcom: "animeshjaiswal/intro",
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
  { href: "/contact", label: "Contact", index: "09" },
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

// Unsplash photo IDs — neutral, cinematic, dark imagery suitable for the brand.
// Using Unsplash's direct image CDN with sizing params for optimization.
const U = (id: string, w = 1600, h = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  summary: string;
  tags: string[];
  accent: string;
  cover: string;
  gallery: string[];
  role: string[];
  duration: string;
  problem: string;
  process: { h: string; p: string }[];
  results: { v: string; l: string }[];
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "halo-os",
    title: "Halo OS",
    client: "Halo Systems",
    year: "2025",
    category: "Product Design",
    summary:
      "An operating layer for AI-native teams. Multi-agent orchestration, cinematic UI, real-time workflow visualization.",
    tags: ["Product", "AI", "Design System"],
    accent: "#5b8cff",
    cover: U("photo-1639762681485-074b7f938ba0"),
    gallery: [
      U("photo-1639322537228-f710d846310a"),
      U("photo-1635070041078-e363dbe005cb"),
      U("photo-1620712943543-bcc4688e7485"),
      U("photo-1518770660439-4636190af475"),
      U("photo-1581090464777-f3220bbe1b8b", 2400, 1000),
    ],
    role: ["Product Design Lead", "Design System", "AI Architecture"],
    duration: "14 weeks",
    problem:
      "Halo had product-market fit but the interface didn't communicate intelligence. Power users were drowning in agent traces; new users couldn't find the magic. The brief: rebuild the IA, the design system and the motion language as one — without shipping a rewrite.",
    process: [
      {
        h: "Discovery",
        p: "Two weeks embedded with the team — sales calls, support tickets, every Loom from the last quarter. The problem wasn't the agents; it was legibility.",
      },
      {
        h: "Architecture",
        p: "A new spatial model for the product: workspaces as scenes, agents as actors, traces as a cinematic timeline. Editorial, not engineering-shaped.",
      },
      {
        h: "Systems",
        p: "Token-driven design system in Figma + code, with motion grammar codified and instrumented. 480 components, one source of truth.",
      },
      {
        h: "Shipping",
        p: "Six release trains, zero regressions at GA. Performance budgets enforced in CI. Motion QA reviewed like film dailies.",
      },
    ],
    results: [
      { v: "3.4×", l: "Activation lift" },
      { v: "62%", l: "Faster time-to-value" },
      { v: "94", l: "Internal NPS" },
      { v: "0", l: "Regressions at launch" },
    ],
    stack: ["Next.js", "React Three Fiber", "GSAP", "Framer Motion", "Tailwind", "Supabase", "OpenAI", "Vercel"],
  },
  {
    slug: "veo-atelier",
    title: "Veo Atelier",
    client: "Independent Studio",
    year: "2025",
    category: "Generative Video",
    summary:
      "A generative video atelier built on Veo — character-consistent pipelines for narrative short-form and brand films.",
    tags: ["Generative", "Pipeline", "Film"],
    accent: "#9b87ff",
    cover: U("photo-1485846234645-a62644f84728"),
    gallery: [
      U("photo-1492691527719-9d1e07e534b4"),
      U("photo-1536440136628-849c177e76a1"),
      U("photo-1517604931442-7e0c8ed2963c"),
      U("photo-1478720568477-152d9b164e26"),
      U("photo-1532800783378-1bed60adaf58", 2400, 1000),
    ],
    role: ["Creative Director", "Pipeline Engineer", "Editor"],
    duration: "8 weeks",
    problem:
      "Generative video is dazzling and unusable. Characters drift, lighting flickers, the cut has no rhythm. The atelier had a vision — narrative short-form that could compete with live action — and no production system to make it real.",
    process: [
      {
        h: "Style anchor",
        p: "Built a reference grammar: 30 anchor stills, three lens packs, a color science doc. The model's taste is downstream of yours.",
      },
      {
        h: "Pipeline",
        p: "Veo + custom ControlNet conditioning + LoRA character locks + an offline grade pass in DaVinci. Reproducible, versioned, auditable.",
      },
      {
        h: "Edit room",
        p: "Treated the model like a DP. Daily rushes, selects, ADR. The cut emerged from the dailies, not the prompts.",
      },
      {
        h: "Finishing",
        p: "Sound design, score and final grade — the layer that turns 'AI footage' into a film.",
      },
    ],
    results: [
      { v: "6×", l: "Faster than live-action" },
      { v: "1/12", l: "Cost of comparable spot" },
      { v: "4", l: "Awards shortlists" },
      { v: "98%", l: "Character consistency" },
    ],
    stack: ["Veo", "ComfyUI", "ControlNet", "LoRA", "DaVinci Resolve", "Ableton", "Frame.io"],
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
    cover: U("photo-1611974789855-9c2a0a7236a3"),
    gallery: [
      U("photo-1554224155-6726b3ff858f"),
      U("photo-1611974789855-9c2a0a7236a3"),
      U("photo-1639815188508-13f7370f664a"),
      U("photo-1551288049-bebda4e38f71"),
      U("photo-1612831455540-fc18cfdd5dbd", 2400, 1000),
    ],
    role: ["Senior Product Designer", "Design System Lead"],
    duration: "9 months",
    problem:
      "Atlas had built a powerful wealth engine wrapped in a brokerage-era interface. Affluent users felt yelled at by the product. The opportunity: a calm, editorial intelligence layer that made decisions feel obvious.",
    process: [
      {
        h: "Reframe",
        p: "Wealth software optimized for the firm, not the client. We reframed every screen around the client's question, not the firm's report.",
      },
      {
        h: "Editorial system",
        p: "Typographic system tuned for long reading. Motion language tuned for trust. Color reduced to two functional hues.",
      },
      {
        h: "Mobile-first",
        p: "Designed for the moment of decision — a glance, a swipe, a confirm — not the moment of analysis.",
      },
      {
        h: "Instrumentation",
        p: "Every screen wired to outcome metrics. Design changes shipped behind flags with clear hypotheses.",
      },
    ],
    results: [
      { v: "+38%", l: "Daily active use" },
      { v: "+22%", l: "AUM moved into Atlas" },
      { v: "9.3", l: "App Store rating" },
      { v: "−47%", l: "Support tickets" },
    ],
    stack: ["Figma", "React Native", "Swift", "Lottie", "Amplitude", "Datadog"],
  },
  {
    slug: "noir-comfy",
    title: "Noir ComfyUI Stack",
    client: "Internal R&D",
    year: "2024",
    category: "ComfyUI Systems",
    summary:
      "A production ComfyUI stack for editorial photography — consistent character, lens and grade across a 400-image campaign.",
    tags: ["ComfyUI", "Generative", "Photography"],
    accent: "#9b87ff",
    cover: U("photo-1635776062764-e025521e3df3"),
    gallery: [
      U("photo-1567095761054-7a02e69e5c43"),
      U("photo-1635776062043-223faf322554"),
      U("photo-1620641788421-7a1c342ea42e"),
      U("photo-1620641788421-7a1c342ea42e"),
      U("photo-1633113217076-5a5d6e02b8a2", 2400, 1000),
    ],
    role: ["Pipeline Architect", "Creative Direction"],
    duration: "5 weeks",
    problem:
      "Editorial photography is a craft of consistency — same model, same lens, same grade across 400 frames. Generative models default to chaos. We built the discipline.",
    process: [
      {
        h: "Character lock",
        p: "Custom LoRA trained on 60 reference frames. Identity preserved across pose, lighting, wardrobe.",
      },
      {
        h: "Lens system",
        p: "Three lens 'looks' — 35mm, 50mm, 85mm — modeled as separate conditioning graphs. The DP's eye, in nodes.",
      },
      {
        h: "Grade pipeline",
        p: "Color science applied post-generation. A LUT, not a prompt. Reproducible across the campaign.",
      },
      {
        h: "Production",
        p: "Headless ComfyUI on a render farm — 400 frames in 14 hours, with a human-in-the-loop selects pass.",
      },
    ],
    results: [
      { v: "400", l: "Frames delivered" },
      { v: "14h", l: "Render time" },
      { v: "100%", l: "Character consistency" },
      { v: "1/8", l: "Cost of a shoot" },
    ],
    stack: ["ComfyUI", "LoRA", "ControlNet", "Python", "RunPod", "DaVinci Resolve"],
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
    cover: U("photo-1620712943543-bcc4688e7485"),
    gallery: [
      U("photo-1635070041078-e363dbe005cb"),
      U("photo-1518709268805-4e9042af2176"),
      U("photo-1635776062764-e025521e3df3"),
      U("photo-1573164713619-24c711fe7878"),
      U("photo-1531171596281-8b5d26917d8b", 2400, 1000),
    ],
    role: ["Creative Director", "Motion Lead"],
    duration: "11 weeks",
    problem:
      "Mirror had a magical product and a forgettable brand. Every consumer AI on the market looked the same — gradients, sparkles, sans-serif friendliness. We needed an identity with edges.",
    process: [
      {
        h: "Worldbuilding",
        p: "Wrote the brand like a film treatment — protagonist, world, conflict. The visual system fell out of the narrative.",
      },
      {
        h: "Identity",
        p: "Editorial wordmark, two-color system, a typographic voice that felt like literature, not software.",
      },
      {
        h: "Motion",
        p: "Codified motion as the brand's signature — eight reusable curves, a small library of choreography rules.",
      },
      {
        h: "Launch",
        p: "60-second hero film, product trailers, OOH and a homepage that broke the genre.",
      },
    ],
    results: [
      { v: "11M", l: "Launch impressions" },
      { v: "+340%", l: "Branded search lift" },
      { v: "FWA", l: "Site of the Day" },
      { v: "3", l: "Awwwards nominations" },
    ],
    stack: ["After Effects", "Cinema 4D", "Figma", "GSAP", "Next.js", "Cavalry"],
  },
  {
    slug: "north-automation",
    title: "North — Agentic Ops",
    client: "North Studio",
    year: "2023",
    category: "AI Automation",
    summary:
      "A multi-agent operations layer that runs a 14-person studio's intake, briefing and creative QA.",
    tags: ["Agents", "Ops", "Automation"],
    accent: "#9b87ff",
    cover: U("photo-1635776062127-d379bfcba9f8"),
    gallery: [
      U("photo-1664526937033-fe2c11f1be25"),
      U("photo-1593440942849-46e22a8af89e"),
      U("photo-1620712943543-26fc76dadc54"),
      U("photo-1518770660439-4636190af475"),
      U("photo-1620641788421-7a1c342ea42e", 2400, 1000),
    ],
    role: ["AI Consultant", "Systems Architect"],
    duration: "6 weeks",
    problem:
      "North's senior team was spending 40% of its week on intake, scoping and QA. Smart people doing dumb work. The mandate: get those hours back without compromising taste.",
    process: [
      {
        h: "Audit",
        p: "Two weeks shadowing every role. Identified 17 repeatable tasks, mapped to agent-shaped jobs.",
      },
      {
        h: "Agent architecture",
        p: "A small council of specialist agents — Intake, Briefer, Scoper, QA — orchestrated by a router.",
      },
      {
        h: "Human-in-the-loop",
        p: "Every agent output reviewed before it touched a client. Trust earned, not assumed.",
      },
      {
        h: "Ops dashboard",
        p: "A control panel for the council — overrides, traces, billing.",
      },
    ],
    results: [
      { v: "−34h", l: "Senior time / week" },
      { v: "+2.1×", l: "Project throughput" },
      { v: "100%", l: "QA coverage" },
      { v: "8 wks", l: "From idea to live" },
    ],
    stack: ["OpenAI", "Anthropic", "LangGraph", "Supabase", "Slack", "Linear API"],
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

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read: string;
  cover: string;
  body: string;
};

export const POSTS: Post[] = [
  {
    slug: "designing-for-agentic-products",
    title: "Designing for Agentic Products",
    excerpt:
      "When the product is no longer a tool but a teammate, the design language changes underneath us.",
    category: "AI Workflows",
    date: "Apr 2026",
    read: "8 min",
    cover: U("photo-1639762681485-074b7f938ba0"),
    body:
      "There is a quiet shift happening underneath the products we use. The agent is no longer a feature inside a product — it is becoming the product itself. The interface, then, is a stage on which the model performs, and our job as designers is to direct the performance.\n\nThe old grammar of interface design was about reducing friction. The new grammar is about increasing legibility — making the model's reasoning visible, its constraints felt, and its handoffs graceful. Friction is sometimes a feature. A small pause before an irreversible action is not a flaw; it is design.\n\nDesigning for agents asks us to invent affordances that didn't exist before — for trust, for revocation, for spectatorship. A user watching an agent work is a new role in the canon, somewhere between viewer and operator. We don't have the vocabulary yet. We are inventing it in production, one ship at a time.\n\nThree principles guide me when I'm in the work. First: show the model's confidence, never hide it. Second: design for the handoff — the most important screen is the one where the human takes the wheel. Third: write the product, don't decorate it. Copy is the model's costume.\n\nWe are early. The vocabulary is still being written. But the work is real, the stakes are higher, and the craft compounds.",
  },
  {
    slug: "the-comfyui-studio",
    title: "The ComfyUI Studio",
    excerpt:
      "Treating ComfyUI like a film studio — departments, dailies, finishing — and what we learned shipping 400 frames.",
    category: "Generative Media",
    date: "Mar 2026",
    read: "11 min",
    cover: U("photo-1635776062764-e025521e3df3"),
    body:
      "ComfyUI was built as a graph editor for diffusion. It became, by accident, a studio operating system. When we shipped Noir — a 400-image editorial campaign generated entirely in ComfyUI — the lesson wasn't about prompts or models. It was about departments.\n\nA real studio has departments — DP, gaffer, costume, post — because separating concerns is how taste scales. We did the same in nodes. One graph for character. One for lens. One for grade. Composable, versioned, reviewable.\n\nThe second lesson: dailies. Generative work has a fatal failure mode — you stop looking. We forced a daily 15-minute review with the team where every frame from the previous run was projected at scale. The frames you skip past on a screen embarrass you on a wall.\n\nThe third lesson: finishing. The model's output is not the product. The product is the cut, the grade, the score, the layout. Treating generation as a department, not the project, is the unlock.\n\nThe craft compounds when you let it. ComfyUI rewards the studio, not the user.",
  },
  {
    slug: "motion-as-meaning",
    title: "Motion as Meaning",
    excerpt: "Motion is the grammar of trust. A small case for treating it like typography.",
    category: "Motion Design",
    date: "Feb 2026",
    read: "6 min",
    cover: U("photo-1531171596281-8b5d26917d8b"),
    body:
      "Most product motion is decoration. It's the sparkle, the bounce, the friendly flourish a designer adds at the end. That's not what motion is for.\n\nMotion is the grammar of trust. A well-tuned curve teaches a user what to expect from a product, faster than any onboarding flow. When a modal opens with a specific weight and timing, the user learns — without being told — what kind of thing this is, how reversible it is, how seriously the product takes itself.\n\nTreat motion like typography. You wouldn't sprinkle Comic Sans through a luxury site for fun. Don't sprinkle bouncy easing through a tax product for charm. Pick a curve family the way you'd pick a type family. Document it. Enforce it.\n\nFive curves is enough for most products. One for ambient, one for state, one for nav, one for celebratory, one for destructive. Anything else is decoration.",
  },
  {
    slug: "interfaces-that-disappear",
    title: "Interfaces That Disappear",
    excerpt:
      "The next decade of design is about removing the interface and exposing the model.",
    category: "Future Interfaces",
    date: "Jan 2026",
    read: "9 min",
    cover: U("photo-1639322537228-f710d846310a"),
    body:
      "The dominant interface paradigm of the last twenty years was direct manipulation — buttons, panels, menus, drag handles. We built skeuomorphs of physical machinery, then we flattened the skeuomorphs, then we ornamented the flat shapes. The whole time the model underneath was getting smarter.\n\nThe next decade is about removing the interface and exposing the model. That doesn't mean a chat box. It means the product becomes a thin, well-mannered shell that lets you describe an outcome and watch the model produce it.\n\nThis is harder than it sounds. The interface is where trust lives. Removing it without replacing it with something equally trustable is how good products fail. The job of design becomes spectatorship: how do we let the user watch the model work, intervene when it matters, and stay calm when it doesn't.\n\nThe products that win this decade will feel quieter, slower, more confident. They will do less interface and more product.",
  },
  {
    slug: "creative-automation-playbook",
    title: "A Creative Automation Playbook",
    excerpt:
      "A field-tested set of patterns for embedding AI into a creative org without breaking the soul of it.",
    category: "Creative Automation",
    date: "Dec 2025",
    read: "12 min",
    cover: U("photo-1635776062043-223faf322554"),
    body:
      "Creative orgs are fragile. The thing that makes them good — taste — is the thing that breaks first when you introduce automation. After six engagements with creative studios in the last year, here's the playbook I now use.\n\nStart with the brief, not the model. The agents that get adopted are the ones that respect the existing rituals — the brief, the dailies, the crit. The ones that get rejected are the ones that try to replace them.\n\nMake the agent a junior. Never a senior. Senior taste is the studio's product. The agent's job is to extend it, not author it. If the agent is making creative calls, you have a different problem.\n\nInstrument taste. The reason creative orgs feel they're losing taste to AI is that taste was tacit. Write it down. Codify it. Then automate against it.\n\nThe playbook is short because the principles are. The work to apply them is the long part.",
  },
  {
    slug: "the-quiet-design-system",
    title: "The Quiet Design System",
    excerpt: "Restraint is the new maximalism. Notes on systems that whisper.",
    category: "Product Design",
    date: "Nov 2025",
    read: "7 min",
    cover: U("photo-1611974789855-9c2a0a7236a3"),
    body:
      "The dominant aesthetic of the last five years has been maximalist — gradients, glows, glass, generated illustrations, kinetic typography. It got loud. The next move is restraint.\n\nA quiet design system has fewer colors, fewer type sizes, fewer surface treatments. What it gains is hierarchy. When everything is special, nothing is. When most things are quiet, the things that aren't can sing.\n\nThis isn't minimalism for its own sake. It's a recognition that AI is making it cheap to be loud, and the new scarcity is restraint. The next decade of luxury digital products will be quiet ones.",
  },
];

export const AI_LAB = [
  {
    title: "Neural Atelier · 01",
    tag: "Generative Image",
    hue: "from-electric/30 to-violet-mist/20",
    image: U("photo-1635776062764-e025521e3df3", 1200, 1500),
  },
  {
    title: "Veo Cinematica",
    tag: "Generative Video",
    hue: "from-violet-mist/30 to-electric/20",
    image: U("photo-1485846234645-a62644f84728", 1200, 800),
  },
  {
    title: "Mirror Field",
    tag: "Real-time WebGL",
    hue: "from-electric/30 to-violet-deep/20",
    image: U("photo-1639762681485-074b7f938ba0", 1200, 1200),
  },
  {
    title: "Comfy Loom",
    tag: "ComfyUI Graph",
    hue: "from-violet-deep/40 to-electric/10",
    image: U("photo-1518709268805-4e9042af2176", 1200, 1000),
  },
  {
    title: "Agent Choir",
    tag: "Multi-Agent System",
    hue: "from-electric/40 to-violet-mist/10",
    image: U("photo-1635070041078-e363dbe005cb", 1200, 1000),
  },
  {
    title: "Signal Garden",
    tag: "Audio-Reactive",
    hue: "from-violet-mist/20 to-electric/30",
    image: U("photo-1518770660439-4636190af475", 1200, 1500),
  },
  {
    title: "Editorial Engine",
    tag: "AI Layout",
    hue: "from-electric/20 to-violet-deep/30",
    image: U("photo-1611974789855-9c2a0a7236a3", 1200, 1200),
  },
  {
    title: "Holo Sculpt",
    tag: "3D Generative",
    hue: "from-violet-mist/30 to-electric/30",
    image: U("photo-1620712943543-bcc4688e7485", 1200, 1200),
  },
];
