export interface Work {
  n: string;
  slug: string;
  title: string;
  client: string;
  kind: string;
  year: string;
  role: string;
  tags: string[];
  video: string;
  summary: string;
  body: string[];
  scope: string;
  collaborator?: string;
}

export interface Service {
  n: string;
  slug: string;
  title: string;
  cat: string;
  desc: string;
  items: string[];
  longDesc: string;
  features: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  stats: { value: string; label: string }[];
  faq: { q: string; a: string }[];
  tools: string[];
  relatedServices: string[];
}

export interface Story {
  no: string;
  slug: string;
  title: string;
  sub: string;
  year: string;
  role: string;
  tags: string[];
  video: string;
  body: string[];
  client?: string;
}

export interface Scene {
  id: string;
  label: string;
  hash: string;
}

export interface PreviewData extends Work {
  x?: number;
  y?: number;
}

export type Project = (Work & { type: "work" }) | (Story & { type: "story" });

export function getProjectBySlug(slug: string): Project | undefined {
  const work = WORKS.find((w) => w.slug === slug);
  if (work) return { ...work, type: "work" };
  const story = STORIES.find((s) => s.slug === slug);
  if (story) return { ...story, type: "story" };
  return undefined;
}

export function getAllProjectSlugs(): string[] {
  return [...WORKS.map((w) => w.slug), ...STORIES.map((s) => s.slug)];
}

export function getAllProjects(): Project[] {
  return [
    ...WORKS.map((w) => ({ ...w, type: "work" as const })),
    ...STORIES.map((s) => ({ ...s, type: "story" as const })),
  ];
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const all = getAllProjects();
  const idx = all.findIndex((p) => (p.type === "work" ? p.slug : p.slug) === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : all[all.length - 1],
    next: idx < all.length - 1 ? all[idx + 1] : all[0],
  };
}

export const WORKS: Work[] = [
  {
    n: "01",
    slug: "polaris",
    title: "Polaris",
    client: "Polaris Films",
    kind: "Brand film",
    year: "2025",
    role: "Identity / Film",
    tags: ["Identity", "16mm", "Motion", "Brand"],
    video: "/assets/story-01.mp4",
    summary: "A quiet brand for a loud medium.",
    body: [
      "Polaris is a boutique film label whose reels live inside festival circuits. The identity needed to move without being showy; it lives on slates, title cards, and the credit roll as much as on paper.",
      "We built a system around one constant: a type-led mark that can shift from a one-line slate to a 12-frame opener. The brand film was shot on 16mm and cut against a typographic score we drew weekly with the director.",
    ],
    scope: "Identity, film, web",
    collaborator: "dir. M. Keser",
  },
  {
    n: "02",
    slug: "meridian",
    title: "Meridian",
    client: "Meridian Coffee",
    kind: "Identity · Packaging",
    year: "2025",
    role: "Brand / Packaging",
    tags: ["Identity", "Packaging", "Print"],
    video: "/assets/story-02.mp4",
    summary: "A roastery brand built around origin and rhythm.",
    body: [
      "Meridian Coffee needed an identity that could travel from bag to bar to digital shelf. We started from the bean's journey — latitude lines, altitude markers, and the quiet geometry of a roasting curve.",
      "The result is a modular system: a logotype that locks up with origin data, packaging that changes color by region, and a web presence that treats the menu like editorial content.",
    ],
    scope: "Identity, packaging, web",
  },
  {
    n: "03",
    slug: "halcyon",
    title: "Halcyon",
    client: "Halcyon Hotels",
    kind: "Direction · Web",
    year: "2024",
    role: "Direction / Web",
    tags: ["Direction", "Web", "Photography"],
    video: "/assets/story-03.mp4",
    summary: "A hotel brand designed to feel like arriving, not checking in.",
    body: [
      "Halcyon Hotels asked for a web experience that matched the pace of their lobby — unhurried, considered, warm. We directed the photography, set the editorial tone, and built a site that loads like a slow fade-in.",
      "Navigation is minimal. Content is paced by scroll. The booking flow was redesigned to feel less like a form and more like a conversation.",
    ],
    scope: "Direction, web, photography",
  },
  {
    n: "04",
    slug: "aperture",
    title: "Aperture",
    client: "Aperture Lab",
    kind: "Art direction",
    year: "2024",
    role: "Art Direction",
    tags: ["Art direction", "Visual identity", "Digital"],
    video: "/assets/story-04.mp4",
    summary: "Visual language for a research lab that builds in public.",
    body: [
      "Aperture Lab publishes research at the intersection of design and computation. They needed a visual system that could hold both dense technical content and open-ended visual essays.",
      "We designed a flexible grid, a type scale rooted in monospace, and a set of compositional rules that let their team publish without design oversight while still looking intentional.",
    ],
    scope: "Art direction, visual identity",
  },
  {
    n: "05",
    slug: "fathom",
    title: "Fathom",
    client: "Fathom Journal",
    kind: "Editorial · Print",
    year: "2023",
    role: "Editorial / Print",
    tags: ["Editorial", "Print", "Typography"],
    video: "/assets/story-05.mp4",
    summary: "A print journal that treats the page like a screen — and means it.",
    body: [
      "Fathom is a biannual journal on architecture and landscape. The editorial brief was clear: no pullquotes, no hero images, no decoration. Let the type and the white space do the work.",
      "We set the publication in two weights of a single typeface, used a strict 12-column grid, and developed a system of marginalia that lets footnotes, captions, and asides live alongside the main text without competing.",
    ],
    scope: "Editorial design, print",
  },
  {
    n: "06",
    slug: "longitude",
    title: "Longitude",
    client: "Longitude Studio",
    kind: "Motion · Brand",
    year: "2023",
    role: "Motion / Brand",
    tags: ["Motion", "Brand", "Title sequence"],
    video: "/assets/reel-b.mp4",
    summary: "A motion-first brand for a studio that thinks in frames.",
    body: [
      "Longitude Studio produces short documentaries. Their identity needed to work in motion before it worked on paper — title cards first, business cards second.",
      "We built the brand around a simple animation principle: everything enters from the left and exits to the right, like a timeline. The logotype, the lower thirds, the credit roll — all follow the same directional logic.",
    ],
    scope: "Motion, brand identity",
  },
];

export const SERVICES: Service[] = [
  {
    n: "01",
    slug: "web-design",
    title: "Web Design",
    cat: "Design",
    desc: "Brand-driven marketing sites with considered type, motion, and editorial rhythm.",
    items: ["Landing · Marketing", "Portfolio · Editorial", "Design systems"],
    longDesc:
      "We design marketing sites that move with intention — every typographic choice, spacing decision, and motion detail serves the brand story. The result is a site that feels authored, not assembled. We work from strategy to final pixel, covering information architecture, interaction design, and handoff-ready component systems.",
    features: [
      { title: "Brand-First Layout", desc: "Every layout starts from the brand's visual language, not a template. Grid, type scale, and spacing are derived from the identity." },
      { title: "Editorial Typography", desc: "Type is treated as the primary design element — scale, rhythm, and hierarchy are set before color or imagery." },
      { title: "Motion Design", desc: "Purposeful animation that enhances storytelling without distracting. Entrances, transitions, and micro-interactions are storyboarded." },
      { title: "Design Systems", desc: "Component libraries with documented tokens, variants, and usage guidelines — so your team can extend the design without breaking it." },
      { title: "Responsive First", desc: "Every breakpoint is designed, not just resized. Mobile is a first-class experience, not an afterthought." },
      { title: "CMS Integration", desc: "Contentful, Sanity, or headless setups that let non-technical editors publish at pace without touching code." },
    ],
    process: [
      { step: "01", title: "Discovery", desc: "Brand audit, competitor analysis, stakeholder interviews. We establish what the site needs to say and who it needs to say it to." },
      { step: "02", title: "Architecture", desc: "Sitemap, content model, and page wireframes. Structure before style." },
      { step: "03", title: "Visual Direction", desc: "Two visual directions explored, one developed. Type, color, and layout language defined." },
      { step: "04", title: "Design Build", desc: "Full-fidelity Figma components across all breakpoints, with interaction specs and motion notes." },
      { step: "05", title: "Handoff", desc: "Developer-ready files, design tokens exported, component annotations, and a recorded walkthrough." },
    ],
    stats: [
      { value: "3–6wk", label: "Typical timeline" },
      { value: "100+", label: "Sites shipped" },
      { value: "98", label: "Avg Lighthouse score" },
      { value: "2×", label: "Conversion lift avg." },
    ],
    faq: [
      { q: "Do you build the site or just design it?", a: "Both. We offer design-only engagements for teams with developers, and full design-to-code delivery. Most clients take the full package." },
      { q: "What if we already have a brand?", a: "We work with existing brand systems and extend them into digital. We'll audit what you have and adapt rather than override." },
      { q: "How many revision rounds are included?", a: "Two rounds per major phase. Additional rounds are billed at our hourly rate. In practice, we rarely hit that limit because we align early." },
      { q: "Can you work with our existing CMS?", a: "Yes — we've built on Webflow, Framer, WordPress, Contentful, Sanity, and custom Next.js setups. We'll recommend what fits your team's workflow." },
    ],
    tools: ["Figma", "Framer", "Next.js", "Tailwind", "Contentful", "Sanity", "Vercel", "Lottie"],
    relatedServices: ["web-app", "ai-integration", "seo-geo"],
  },
  {
    n: "02",
    slug: "web-app",
    title: "Web App",
    cat: "Build",
    desc: "Full-stack product surfaces — dashboards, tools, internal systems that hold up at scale.",
    items: ["React / Next.js", "Auth · Billing · Roles", "Realtime · API design"],
    longDesc:
      "We build product-grade web applications that handle real load, real users, and real complexity. From the data model to the dashboard UI, every layer is considered. We specialize in Next.js full-stack builds with authentication, billing, role-based access, and real-time features — shipped with observability from day one.",
    features: [
      { title: "Full-Stack Architecture", desc: "Next.js App Router with server components, API routes, and edge functions. TypeScript throughout, no compromises." },
      { title: "Auth & Roles", desc: "Multi-tenant auth with role-based access control. SSO, social login, magic links — whatever your user base needs." },
      { title: "Billing Integration", desc: "Stripe subscriptions, usage-based billing, metered features, and customer portal — wired in from the start, not bolted on later." },
      { title: "Realtime Features", desc: "WebSockets, server-sent events, and optimistic UI for collaborative or live-updating interfaces." },
      { title: "API Design", desc: "RESTful or tRPC APIs with typed contracts, rate limiting, and versioning strategy built in." },
      { title: "Observability", desc: "Error tracking, performance monitoring, and structured logging from day one. You'll know what's breaking before users do." },
    ],
    process: [
      { step: "01", title: "Scoping", desc: "Requirements workshop, technical spec, and architecture decision records. Nothing ambiguous going into build." },
      { step: "02", title: "Data Model", desc: "Schema design, relationships, and indexing strategy before a line of application code is written." },
      { step: "03", title: "Core Build", desc: "Auth, routing, and data layer first. UI components follow once the foundation is solid." },
      { step: "04", title: "Feature Sprints", desc: "Two-week sprints with deployed previews after every sprint. Feedback integrated before moving forward." },
      { step: "05", title: "Launch", desc: "Production environment setup, monitoring configured, documentation written, and team handover session." },
    ],
    stats: [
      { value: "8–16wk", label: "Typical timeline" },
      { value: "50+", label: "Apps shipped" },
      { value: "99.9%", label: "Uptime target" },
      { value: "<200ms", label: "Avg API response" },
    ],
    faq: [
      { q: "Do you work with an existing codebase?", a: "Yes. We've joined projects mid-way, refactored legacy codebases, and extended existing products. We always start with an audit." },
      { q: "What database do you use?", a: "Postgres for most projects, with Prisma or Drizzle as the ORM. We'll use what's already in your stack if you have one." },
      { q: "Do you handle DevOps?", a: "We set up the infrastructure as part of the build — CI/CD, preview environments, and production on Vercel or AWS. Long-term DevOps is a separate engagement." },
      { q: "How do you handle security?", a: "OWASP top-10 is baseline. We also do input validation, CSRF protection, rate limiting, and dependency audits as part of standard delivery." },
    ],
    tools: ["Next.js", "TypeScript", "Postgres", "Prisma", "Stripe", "Clerk", "Redis", "Vercel", "AWS"],
    relatedServices: ["web-design", "mobile-app", "cloud-ecosystem"],
  },
  {
    n: "03",
    slug: "mobile-app",
    title: "Mobile App",
    cat: "Build",
    desc: "Cross-platform iOS/Android apps tuned to feel native, ship fast, and survive updates.",
    items: ["React Native · Expo", "Push · Offline sync", "Store submission"],
    longDesc:
      "We build cross-platform mobile apps with React Native and Expo that feel native on both iOS and Android. From onboarding flows to push notifications, offline sync, and App Store submission — we handle the full lifecycle. Shipping a mobile app is a different beast than a web app, and we treat it that way.",
    features: [
      { title: "React Native + Expo", desc: "Managed Expo workflow for fast iteration, with bare workflow available when native modules require it." },
      { title: "Native Feel", desc: "Platform-appropriate navigation patterns, gestures, and animations. iOS feels like iOS. Android feels like Android." },
      { title: "Push Notifications", desc: "Expo Notifications with segmentation, scheduling, and deep linking built in from the start." },
      { title: "Offline Sync", desc: "Local-first architecture with conflict resolution — your app works without a connection and syncs cleanly when it reconnects." },
      { title: "Store Submission", desc: "We handle App Store and Google Play submissions, including screenshots, metadata, and review response if needed." },
      { title: "OTA Updates", desc: "EAS Update for over-the-air patches — ship fixes without waiting for store review cycles." },
    ],
    process: [
      { step: "01", title: "Platform Strategy", desc: "iOS-first, Android-first, or simultaneous? We align on platform priorities, target OS versions, and device support matrix." },
      { step: "02", title: "UX Design", desc: "Navigation architecture and user flows designed for touch. Figma prototypes before any code." },
      { step: "03", title: "Core Build", desc: "Navigation shell, auth, and data layer. Feature work starts on a solid foundation." },
      { step: "04", title: "Beta Testing", desc: "TestFlight and Google Play internal testing. Real devices, real feedback, before public launch." },
      { step: "05", title: "Store Launch", desc: "Submission, review management, and post-launch monitoring. We stay on until the app is live and stable." },
    ],
    stats: [
      { value: "10–20wk", label: "Typical timeline" },
      { value: "30+", label: "Apps shipped" },
      { value: "4.7★", label: "Avg store rating" },
      { value: "2", label: "Platforms, one codebase" },
    ],
    faq: [
      { q: "Why React Native over native Swift/Kotlin?", a: "For most product companies, the code-sharing and iteration speed of React Native outweighs the performance delta. We'll tell you honestly if your use case is the exception." },
      { q: "Can you build on an existing React Native codebase?", a: "Yes. We audit first, identify technical debt, and agree on a remediation approach before adding features." },
      { q: "Do you handle the App Store accounts?", a: "You need your own Apple Developer and Google Play accounts. We handle the submission process from within them." },
      { q: "What about backend for the app?", a: "We can build the backend as part of the same engagement, or integrate with an existing API. Most clients use our Web App service for the backend." },
    ],
    tools: ["React Native", "Expo", "EAS", "TypeScript", "Zustand", "MMKV", "Notifee", "Sentry"],
    relatedServices: ["web-app", "ai-integration", "automation"],
  },
  {
    n: "04",
    slug: "automation",
    title: "Automation",
    cat: "Ops",
    desc: "Workflow pipelines that quietly replace the spreadsheets no one wants to open.",
    items: ["n8n · Zapier · Make", "Internal tools", "Webhooks · schedulers"],
    longDesc:
      "We map your manual processes and replace them with reliable, observable automation pipelines. Whether it's n8n self-hosted on your infrastructure, Zapier for low-code simplicity, or custom-built webhook handlers — we match the tool to the job. The goal is to eliminate the work that shouldn't require a human.",
    features: [
      { title: "Process Mapping", desc: "We document the current manual workflow before touching any tooling. Understanding the process is 80% of the job." },
      { title: "n8n Self-Hosted", desc: "Full control over your automations with n8n on your own infrastructure. No per-execution pricing, no vendor lock-in." },
      { title: "Zapier & Make", desc: "Rapid deployment for teams that need automation without infrastructure overhead. Right tool for the right job." },
      { title: "Internal Tools", desc: "Custom admin panels, approval workflows, and data management UIs built on top of your automation layer." },
      { title: "Webhook Architecture", desc: "Event-driven pipelines with retry logic, dead letter queues, and idempotency handling." },
      { title: "Scheduled Jobs", desc: "Cron-based data sync, report generation, and maintenance tasks with monitoring and alerting." },
    ],
    process: [
      { step: "01", title: "Process Audit", desc: "Interview the people doing the manual work. Map every step, decision point, and exception case." },
      { step: "02", title: "Automation Design", desc: "Design the automated workflow with error handling and edge cases documented before implementation." },
      { step: "03", title: "Build & Test", desc: "Implement with staging environment testing. Every automation is tested against real data before production." },
      { step: "04", title: "Monitoring Setup", desc: "Alerts for failures, execution logs, and dashboards so you know when something breaks." },
      { step: "05", title: "Handover", desc: "Documentation, training for your team, and a 30-day support window post-launch." },
    ],
    stats: [
      { value: "200+", label: "Automations built" },
      { value: "15hrs", label: "Avg weekly time saved" },
      { value: "99.5%", label: "Execution success rate" },
      { value: "2–4wk", label: "Typical timeline" },
    ],
    faq: [
      { q: "We already use Zapier — can you improve what we have?", a: "Absolutely. We audit existing Zaps, identify fragile steps, and rebuild or extend them. Often we migrate the most complex ones to n8n." },
      { q: "What if the process changes after you build it?", a: "We document everything so your team can maintain it. For ongoing changes, we offer retainer support." },
      { q: "Can you automate across multiple tools?", a: "Yes — multi-system automations are our specialty. CRM, ERP, Slack, email, databases, and custom APIs all connected." },
      { q: "Is n8n hard to manage?", a: "We handle the infrastructure setup and make it manageable. Most clients find it easier than expected after the initial setup." },
    ],
    tools: ["n8n", "Zapier", "Make", "Node.js", "Postgres", "Redis", "Docker", "Cloudflare Workers"],
    relatedServices: ["ai-integration", "data-engineering", "cloud-ecosystem"],
  },
  {
    n: "05",
    slug: "ai-integration",
    title: "AI Integration",
    cat: "AI",
    desc: "LLMs, RAG, and agents wired into real products — evaluated, guard-railed, observable.",
    items: ["Claude · OpenAI · Gemini", "RAG · Vector · Memory", "Agents · Tool-use"],
    longDesc:
      "We integrate large language models into real products responsibly — with evaluation frameworks, guardrails, cost controls, and observability built in. We work with Claude, OpenAI, and Gemini, and we choose models based on your use case, not familiarity. RAG pipelines, agent architectures, and tool-use systems are our specialty.",
    features: [
      { title: "Model Selection", desc: "We evaluate models against your specific use case — latency, cost, quality, and capability all factored in. No defaults." },
      { title: "RAG Pipelines", desc: "Retrieval-augmented generation with vector databases, chunking strategies, and re-ranking. Your data, accurately surfaced." },
      { title: "Agent Architecture", desc: "Multi-step agents with tool-use, memory, and planning. Built to complete complex tasks reliably, not just impressively." },
      { title: "Evaluation Framework", desc: "Custom eval suites that measure what matters for your use case. No vibes-based quality assessment." },
      { title: "Guardrails", desc: "Input/output filtering, content policies, and safety layers that match your risk tolerance and regulatory environment." },
      { title: "Observability", desc: "Trace every LLM call, track costs, monitor latency, and alert on quality regressions. LLMOps from the start." },
    ],
    process: [
      { step: "01", title: "Use Case Scoping", desc: "Define the problem the AI should solve and the metrics that define success. Avoid building before you know what 'good' looks like." },
      { step: "02", title: "Prototype & Eval", desc: "Rapid prototype tested against real data. Evaluation suite built alongside the prototype, not after." },
      { step: "03", title: "Pipeline Build", desc: "Production-grade implementation with error handling, fallbacks, and cost controls." },
      { step: "04", title: "Guardrails & Safety", desc: "Input validation, output filtering, and adversarial testing before any user-facing deployment." },
      { step: "05", title: "Monitor & Iterate", desc: "Post-launch monitoring with regular quality reviews and model updates as the landscape evolves." },
    ],
    stats: [
      { value: "40+", label: "AI integrations shipped" },
      { value: "3×", label: "Avg accuracy vs baseline" },
      { value: "60%", label: "Avg cost reduction" },
      { value: "6–12wk", label: "Typical timeline" },
    ],
    faq: [
      { q: "Which LLM should we use?", a: "It depends on your use case. We'll run a structured evaluation against your actual data and recommend based on results, not hype." },
      { q: "How do you handle hallucinations?", a: "RAG grounds responses in your data. Eval suites catch regressions. Guardrails catch harmful outputs. No single solution — defense in depth." },
      { q: "What does an AI integration cost to run?", a: "We model inference costs as part of the design. Most integrations we build cost $0.01–$0.10 per user session at scale." },
      { q: "Can you improve an existing AI feature?", a: "Yes. We audit the current implementation, identify the failure modes, and improve the pipeline systematically." },
    ],
    tools: ["Claude", "OpenAI", "Gemini", "LangChain", "Pinecone", "pgvector", "LangSmith", "Helicone"],
    relatedServices: ["web-app", "automation", "data-engineering"],
  },
  {
    n: "06",
    slug: "google-ads",
    title: "Google Ads",
    cat: "Growth",
    desc: "Search, performance-max, and display campaigns built around conversion paths, not vanity metrics.",
    items: ["Search · PMax", "Conversion tracking", "Creative iteration"],
    longDesc:
      "We run Google Ads campaigns that are built around your actual conversion path — not impressions, not clicks, not awareness. Every campaign structure, bidding strategy, and creative decision is tied to a measurable business outcome. We set up conversion tracking properly before spending a dollar on ads.",
    features: [
      { title: "Campaign Architecture", desc: "Account structure designed for performance — the right match types, negative keywords, and ad group segmentation from day one." },
      { title: "Search Campaigns", desc: "Intent-based search campaigns targeting buyers, not browsers. Copy written to match the search context, not to impress." },
      { title: "Performance Max", desc: "PMax campaigns built with strong asset groups and audience signals — not left to Google's defaults." },
      { title: "Conversion Tracking", desc: "GA4, Google Ads, and server-side tracking set up accurately. You can't optimize what you can't measure." },
      { title: "Creative Testing", desc: "Systematic ad copy and creative testing with statistical significance thresholds. No gut-feel decisions." },
      { title: "Reporting", desc: "Weekly reports focused on business metrics — leads, revenue, ROAS — not vanity metrics." },
    ],
    process: [
      { step: "01", title: "Audit & Setup", desc: "Existing account audit (or new account setup), conversion tracking verification, and baseline measurement." },
      { step: "02", title: "Campaign Build", desc: "Campaign structure, keyword research, ad copy, and landing page alignment." },
      { step: "03", title: "Launch & Learn", desc: "Two-week learning period with daily monitoring. No major changes until the algorithm has sufficient data." },
      { step: "04", title: "Optimize", desc: "Weekly optimization cycles: bid adjustments, negative keywords, creative testing, audience refinement." },
      { step: "05", title: "Scale", desc: "Proven campaigns scaled methodically. Budget increases tied to efficiency thresholds, not ambition." },
    ],
    stats: [
      { value: "3.2×", label: "Avg ROAS improvement" },
      { value: "45%", label: "Avg CPA reduction" },
      { value: "60+", label: "Accounts managed" },
      { value: "Ongoing", label: "Engagement model" },
    ],
    faq: [
      { q: "What budget do we need to start?", a: "Minimum $1,500/month ad spend. Below that, the learning period takes too long to generate meaningful data." },
      { q: "How long until we see results?", a: "The first 4 weeks are the learning period. Meaningful optimization starts in week 5–6. Month 3 is typically when efficiency peaks." },
      { q: "Do you work with existing campaigns?", a: "Yes. We audit first, identify the biggest losses, and fix those before building new campaigns." },
      { q: "Is the management fee separate from ad spend?", a: "Yes. You pay Google directly for ad spend. Our management fee is separate and covers strategy, setup, and optimization." },
    ],
    tools: ["Google Ads", "GA4", "Google Tag Manager", "Looker Studio", "Search Console", "SEMrush"],
    relatedServices: ["seo-geo", "web-design", "web-app"],
  },
  {
    n: "07",
    slug: "seo-geo",
    title: "SEO & GEO",
    cat: "Growth",
    desc: "Technical SEO plus generative-engine optimization — being found by Google and by models.",
    items: ["Technical · Content", "Schema · Core Web Vitals", "LLM citation surfaces"],
    longDesc:
      "SEO in 2025 means being found by both search engines and language models. We handle technical SEO — Core Web Vitals, schema markup, crawlability — and generative engine optimization: structuring your content so it's cited by Claude, ChatGPT, and Perplexity. These are different problems with different solutions, and we address both.",
    features: [
      { title: "Technical SEO Audit", desc: "Crawl analysis, Core Web Vitals, indexation issues, duplicate content, and redirect chains. Everything that affects how Google sees your site." },
      { title: "Schema Markup", desc: "Structured data that tells search engines exactly what your content is — Organization, Product, Article, FAQ, and custom schemas." },
      { title: "Core Web Vitals", desc: "LCP, INP, and CLS optimization at the code level. We work with your dev team to implement, not just report." },
      { title: "Content Strategy", desc: "Topic cluster mapping, content gap analysis, and editorial calendar built around search intent, not just volume." },
      { title: "GEO (Generative Engine)", desc: "Structuring content so language models can accurately cite and summarize it. A different discipline from traditional SEO." },
      { title: "LLM Citation Surfaces", desc: "Building the authoritative content, structured data, and link profile that makes models choose you as a source." },
    ],
    process: [
      { step: "01", title: "Technical Audit", desc: "Full crawl, Core Web Vitals measurement, and indexation analysis. Prioritized fix list with effort/impact estimates." },
      { step: "02", title: "Fix Implementation", desc: "Technical fixes implemented alongside your dev team. We write the specs; we can implement too if needed." },
      { step: "03", title: "Content Map", desc: "Topic clusters, content gaps, and a 6-month editorial calendar tied to search intent and business goals." },
      { step: "04", title: "GEO Layer", desc: "Schema markup, structured content formats, and authority-building content specifically for LLM citation." },
      { step: "05", title: "Monitor & Iterate", desc: "Monthly reporting on rankings, traffic, and citation mentions. Strategy adjusted as the landscape evolves." },
    ],
    stats: [
      { value: "3–6mo", label: "Typical payoff window" },
      { value: "180%", label: "Avg organic traffic lift" },
      { value: "Top 3", label: "Avg ranking position" },
      { value: "40+", label: "Sites optimized" },
    ],
    faq: [
      { q: "What's GEO and why does it matter?", a: "Generative Engine Optimization is the practice of making your content citable by AI models. As more users get answers from AI, being cited by Claude or ChatGPT becomes as important as ranking on Google." },
      { q: "How long does SEO take?", a: "Technical fixes show results in 2–4 weeks. Content impact takes 3–6 months. GEO results are harder to measure but typically visible in 2–3 months." },
      { q: "Do you write the content?", a: "We can write, brief, or review. Most clients have their own writers and use us for strategy and optimization." },
      { q: "Can you work with our existing CMS?", a: "Yes. We've optimized content on WordPress, Contentful, Sanity, Webflow, and custom setups. Schema and meta implementation adapts to your stack." },
    ],
    tools: ["Screaming Frog", "Ahrefs", "Search Console", "GA4", "PageSpeed Insights", "Schema.org", "Surfer"],
    relatedServices: ["google-ads", "web-design", "web-app"],
  },
  {
    n: "08",
    slug: "claude-code-educator",
    title: "Claude Code Educator",
    cat: "Teach",
    desc: "Workshops and 1:1 coaching for teams shipping with Claude Code — from first repo to production.",
    items: ["Team workshops", "1:1 coaching", "Internal playbooks"],
    longDesc:
      "We train engineering teams to ship real software with Claude Code — not demos, not toy projects, but production systems. Workshops cover everything from first repo setup to multi-agent orchestration. Coaching is hands-on: we work in your actual codebase, on your actual problems, until your team is self-sufficient.",
    features: [
      { title: "Team Workshops", desc: "Half-day or full-day sessions for engineering teams. Structured curriculum covering Claude Code fundamentals through advanced patterns." },
      { title: "1:1 Coaching", desc: "Dedicated sessions with individual engineers. We work in their codebase, on their current project, solving real problems." },
      { title: "Internal Playbooks", desc: "Custom documentation covering your team's conventions, workflows, and Claude Code patterns — written for your specific stack." },
      { title: "CLAUDE.md Design", desc: "We design and write your project's CLAUDE.md files — the instructions that make Claude Code effective in your codebase." },
      { title: "Multi-Agent Patterns", desc: "Advanced workshop covering orchestration, parallel agents, and complex task decomposition for senior engineers." },
      { title: "Ongoing Advisory", desc: "Monthly check-ins to review how the team is using Claude Code, identify friction points, and update patterns." },
    ],
    process: [
      { step: "01", title: "Team Assessment", desc: "Survey of current AI tool usage, engineering skill levels, and specific goals. We design the curriculum around your team." },
      { step: "02", title: "Curriculum Design", desc: "Workshop agenda and exercises built around your actual tech stack and current projects." },
      { step: "03", title: "Workshop Delivery", desc: "Live session with hands-on exercises. Everyone leaves having shipped something real with Claude Code." },
      { step: "04", title: "Playbook Writing", desc: "Post-workshop documentation of patterns, conventions, and gotchas specific to your team." },
      { step: "05", title: "Follow-up Coaching", desc: "Optional 1:1 sessions for engineers who want to go deeper after the workshop." },
    ],
    stats: [
      { value: "200+", label: "Engineers trained" },
      { value: "40+", label: "Teams upskilled" },
      { value: "5×", label: "Avg velocity increase" },
      { value: "1 day", label: "Workshop format" },
    ],
    faq: [
      { q: "What level of experience do participants need?", a: "Intermediate engineering background. They should be comfortable with their stack. We teach Claude Code, not programming fundamentals." },
      { q: "Can you customize for our tech stack?", a: "Yes — all examples, exercises, and playbooks are built around your actual technologies." },
      { q: "Do you offer remote workshops?", a: "Yes. Remote workshops work well for up to 12 participants. Larger groups benefit from in-person delivery." },
      { q: "How do we measure the ROI?", a: "We baseline sprint velocity before the workshop and measure for 6 weeks after. Most teams report 3–5× improvement in AI-assisted feature delivery." },
    ],
    tools: ["Claude Code", "VS Code", "GitHub", "Cursor", "Anthropic API", "MCP", "TypeScript"],
    relatedServices: ["ai-integration", "web-app", "automation"],
  },
  {
    n: "09",
    slug: "data-engineering",
    title: "Data Engineering",
    cat: "Data",
    desc: "Warehouses, ELT pipelines, and analytics layers your team can actually query.",
    items: ["Postgres · BigQuery", "dbt · Airbyte · Airflow", "Metrics · dashboards"],
    longDesc:
      "We build data infrastructure that your team actually uses — clean schemas, reliable pipelines, and dashboards that answer real questions. From raw event streams to executive dashboards, we handle the full analytics stack. The goal is a data warehouse your team trusts enough to make decisions from.",
    features: [
      { title: "Warehouse Design", desc: "Dimensional modeling in BigQuery, Snowflake, or Postgres. Schemas designed for both query performance and team usability." },
      { title: "ELT Pipelines", desc: "Airbyte for extraction, dbt for transformation. Every transformation tested, documented, and version-controlled." },
      { title: "dbt Models", desc: "Modular dbt project with staging, intermediate, and mart layers. Every model has tests and documentation." },
      { title: "Orchestration", desc: "Airflow or Prefect for pipeline scheduling, monitoring, and failure handling. No silent failures." },
      { title: "Metrics Layer", desc: "Semantic layer with consistent metric definitions across all dashboards. One source of truth for 'revenue' and 'active users'." },
      { title: "Dashboards", desc: "Looker, Metabase, or Superset dashboards built around actual business questions, not what the tool makes easy." },
    ],
    process: [
      { step: "01", title: "Data Audit", desc: "Inventory of existing data sources, quality assessment, and identification of the 5 questions the business most needs to answer." },
      { step: "02", title: "Architecture Design", desc: "Warehouse selection, schema design, and pipeline architecture documented before any code." },
      { step: "03", title: "Pipeline Build", desc: "ELT pipelines with data quality checks, alerting, and incremental loading from the start." },
      { step: "04", title: "Transform Layer", desc: "dbt models covering all core business entities with tests and documentation." },
      { step: "05", title: "Dashboard Delivery", desc: "Business dashboards built with stakeholders, not for them. Iteration included." },
    ],
    stats: [
      { value: "8–16wk", label: "Typical timeline" },
      { value: "50+", label: "Warehouses built" },
      { value: "99.9%", label: "Pipeline reliability" },
      { value: "10×", label: "Avg query speed improvement" },
    ],
    faq: [
      { q: "Which warehouse should we use?", a: "BigQuery for GCP shops, Snowflake for enterprise, Postgres for early-stage. We'll recommend based on your team size, budget, and existing stack." },
      { q: "We have messy, inconsistent data — can you still help?", a: "That's the typical starting point. Data cleaning and normalization is part of the dbt transformation layer." },
      { q: "Do you train our team on dbt?", a: "Yes. Knowledge transfer is part of every engagement. We don't build black boxes." },
      { q: "How do you handle PII and data privacy?", a: "Column-level masking, role-based access, and data classification as standard. We can also help with GDPR/CCPA compliance requirements." },
    ],
    tools: ["BigQuery", "Postgres", "dbt", "Airbyte", "Airflow", "Prefect", "Looker", "Metabase", "Python"],
    relatedServices: ["ai-integration", "automation", "cloud-ecosystem"],
  },
  {
    n: "10",
    slug: "cloud-ecosystem",
    title: "Cloud Ecosystem",
    cat: "Infra",
    desc: "Production-grade cloud setups across AWS, GCP, and Vercel — observable, documented, handover-ready.",
    items: ["AWS · GCP · Vercel", "IaC · Terraform", "CI/CD · monitoring"],
    longDesc:
      "We design and build cloud infrastructure that's production-ready from day one — not just something that works, but something observable, documented, and safe to hand over. Terraform for infrastructure-as-code, GitHub Actions for CI/CD, and a monitoring stack that tells you what's happening before users notice it isn't.",
    features: [
      { title: "Infrastructure as Code", desc: "Terraform modules for all infrastructure. Everything reproducible, version-controlled, and reviewable." },
      { title: "AWS Architecture", desc: "ECS, Lambda, RDS, S3, CloudFront — right-sized for your workload. Not over-engineered, not under-built." },
      { title: "GCP Architecture", desc: "Cloud Run, GKE, BigQuery, Cloud SQL — Google's managed services selected for your specific use case." },
      { title: "CI/CD Pipelines", desc: "GitHub Actions workflows with automated testing, preview deployments, and controlled production releases." },
      { title: "Monitoring Stack", desc: "Datadog, Grafana, or CloudWatch configured to alert on what matters. Dashboards your on-call team will actually use." },
      { title: "Documentation", desc: "Architecture decision records, runbooks, and incident response playbooks. Your team can operate it after we leave." },
    ],
    process: [
      { step: "01", title: "Architecture Review", desc: "Current state assessment, bottleneck identification, and future-state architecture design with tradeoffs documented." },
      { step: "02", title: "IaC Migration", desc: "Existing infrastructure codified in Terraform. No more click-ops." },
      { step: "03", title: "CI/CD Build", desc: "Automated pipelines for all environments — dev, staging, production — with deployment gates and rollback procedures." },
      { step: "04", title: "Monitoring Setup", desc: "Alerts, dashboards, and on-call runbooks configured and tested before go-live." },
      { step: "05", title: "Handover", desc: "Documentation package, team training session, and 30-day support window." },
    ],
    stats: [
      { value: "99.99%", label: "Uptime achieved" },
      { value: "60%", label: "Avg cost reduction" },
      { value: "70+", label: "Cloud setups built" },
      { value: "4–10wk", label: "Typical timeline" },
    ],
    faq: [
      { q: "We're on AWS but want to move to GCP — can you help?", a: "Yes. Cloud migrations are a core part of our work. We do them incrementally to minimize risk." },
      { q: "Do you manage the infrastructure ongoing?", a: "We set up and hand over. Ongoing management retainers are available but most clients prefer to own their infrastructure after we've set it up well." },
      { q: "How do you handle disaster recovery?", a: "RTO and RPO targets defined in the architecture phase, with tested recovery procedures. DR isn't an afterthought." },
      { q: "Do you work with Kubernetes?", a: "Yes. EKS on AWS, GKE on GCP, or self-managed. We'll recommend it when the complexity is justified — which is less often than people think." },
    ],
    tools: ["AWS", "GCP", "Terraform", "GitHub Actions", "Docker", "Kubernetes", "Datadog", "Grafana", "Vercel"],
    relatedServices: ["web-app", "data-engineering", "automation"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}

export const MANIFESTO =
  "We make cinematic identities for studios that believe pace, restraint, and a little grain still matter.";

export const SCENES: Scene[] = [
  { id: "hero", label: "Hero", hash: "hero" },
  { id: "note", label: "Note", hash: "note" },
  { id: "work", label: "Work", hash: "work" },
  { id: "stories", label: "Stories", hash: "stories" },
  { id: "case", label: "Case", hash: "case" },
  { id: "reel", label: "Reel", hash: "reel" },
  { id: "services", label: "Services", hash: "services" },
  { id: "about", label: "About", hash: "about" },
  { id: "contact", label: "Contact", hash: "contact" },
];

export const STORIES: Story[] = [
  {
    no: "01",
    slug: "red-knight",
    title: "Red Knight",
    sub: "A silent opener for a thriller serial.",
    year: "2025",
    role: "Dir / Edit",
    tags: ["Title sequence", "Color", "Sound design"],
    video: "/assets/story-01.mp4",
    body: [
      "Red Knight is the title sequence for an upcoming thriller serial. The brief was simple: set the tone in twelve seconds without showing a single character.",
      "We built the sequence around a single color — a deep, saturated red — and a series of typographic reveals timed to a percussive score. Every frame was composed to feel like a still photograph that happens to move.",
    ],
    client: "Confidential",
  },
  {
    no: "02",
    slug: "vertical-26",
    title: "Vertical / 26",
    sub: "Quarterly reel stitched from studio B-roll.",
    year: "2025",
    role: "Edit / Grade",
    tags: ["Reel", "Vertical", "Typography"],
    video: "/assets/story-02.mp4",
    body: [
      "Vertical / 26 is our quarterly reel — a loose edit pulled from the last three months of studio work. Title cards, typographic moments, B‑roll, and the frames we keep returning to.",
      "Updated quarterly, never polished, always scored to whatever we had on the speakers that week. The reel lives on the site and on vertical channels.",
    ],
  },
  {
    no: "03",
    slug: "polaris-key-04",
    title: "Polaris — Key 04",
    sub: "Brand film cut against a typographic score.",
    year: "2024",
    role: "Identity / Film",
    tags: ["Identity", "16mm", "Motion"],
    video: "/assets/story-03.mp4",
    body: [
      "Key 04 is the fourth visual key in the Polaris brand system — a short film that demonstrates how the identity moves across title cards, slates, and credit rolls.",
      "Shot on 16mm with a single prime lens. The edit was driven by typography: each cut lands on a type transition rather than a visual one.",
    ],
    client: "Polaris Films",
  },
  {
    no: "04",
    slug: "untitled-coming",
    title: "Untitled / Coming",
    sub: "A boutique label's first long-format piece.",
    year: "2026",
    role: "In production",
    tags: ["WIP", "Long-format"],
    video: "/assets/story-04.mp4",
    body: [
      "Currently in production. A boutique label's first long-format visual piece — more details to follow.",
    ],
  },
  {
    no: "05",
    slug: "night-cut",
    title: "Night Cut",
    sub: "A late-hour visual, built frame by frame.",
    year: "2025",
    role: "Dir / Motion",
    tags: ["Motion", "Vertical", "Type"],
    video: "/assets/story-05.mp4",
    body: [
      "Night Cut started as an experiment in after-hours editing — a visual built frame by frame from studio offcuts and type animations.",
      "The piece runs vertical and was designed for loop playback. Every transition is hand-timed to a minimal ambient score.",
    ],
  },
];
