/* =============================================================================
 *  SITE CONFIG  —  Edit everything about your portfolio from this one file.
 *  -----------------------------------------------------------------------------
 *  To add a new project, copy a {} block in `projects` and fill it in.
 *  To add a new job, copy a {} block in `experience`.
 *  No build step. Just edit, save, and refresh / push to GitHub Pages.
 * ========================================================================== */

const CONFIG = {
  /* ---------------------------------------------------------------------------
   *  PROFILE  —  the basics shown in the hero and header
   * ------------------------------------------------------------------------- */
  profile: {
    name: "Naitam Gandhi",
    // Shown after the name in the terminal prompt, e.g. ~/naitam $
    handle: "naitam",
    // Rotating taglines typed out in the hero (add as many as you like)
    roles: [
      "Full-Stack Software Engineer",
      "DevOps & Cloud Platform Builder",
      "ML & Data Pipeline Engineer",
      "AI Automation & Integration Specialist",
    ],
    tagline:
      "I engineer full-stack systems, integrate AI to automate workflows, and build ML-powered data pipelines — consistently cutting costs, toil, and time-to-ship at enterprise scale.",
    location: "New York City, NY",
    available: true, // shows the green "open to opportunities" dot
    availableText: "Open to Full-Stack, Backend, DevOps & ML Roles",
    resumeUrl: "Resume_SWE_2026.pdf", // drop your PDF in this folder to enable the button
  },

  /* ---------------------------------------------------------------------------
   *  SOCIAL / CONTACT LINKS  —  icon is one of:
   *  github, linkedin, email, twitter, website, devto, medium
   * ------------------------------------------------------------------------- */
  links: [
    { icon: "github",   label: "GitHub",   url: "https://github.com/NaitamGandhi" },
    { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/naitam-gandhi/" },
    { icon: "email",    label: "Email",    url: "mailto:naitamg.work@gmail.com" },
  ],

  /* ---------------------------------------------------------------------------
   *  ABOUT  —  short prose. Use \n\n to separate paragraphs.
   * ------------------------------------------------------------------------- */
  about: {
    summary:
      "Full-Stack Software Engineer with 4+ years across backend systems, cloud infrastructure, DevOps, and applied ML. I build end-to-end — high-throughput REST APIs and distributed storage platforms, CI/CD pipelines, data-lake reporting layers, and full-stack operational dashboards.\n\nWhat differentiates my work: I actively integrate AI APIs and LLMs into engineering workflows to automate release risk assessments, drive pipeline diagnostics, and eliminate manual toil — translating directly into measurable reductions in engineer-hours and infrastructure spend. Currently pursuing an M.S. in Data Science at the University of Pennsylvania to deepen my ML systems and large-scale data infrastructure expertise.",
    // Quick stat cards under the about text. Edit / add freely.
    stats: [
      { value: "4+ Years",                             label: "Building enterprise software, platform infrastructure & automation" },
      { value: "$1.12 million infra spend ",           label: "Costs attributed across 12 platform teams" },
      { value: "10+ Hrs/week",                         label: "Eliminated through platform automation across 5 engineering teams" },
      { value: "23% Faster",                           label: "Cross-firm enterprise data migration" },
      { value: "1 TB/Hr",                              label: "Data quality and governance pipeline throughput" },
    ],
  },

  /* ---------------------------------------------------------------------------
   *  EXPERIENCE  —  newest first
   * ------------------------------------------------------------------------- */
  experience: [
    {
      company: "FactSet Research",
      role: "Platform & Infrastructure Software Engineer",
      location: "New York City, NY",
      start: "Jul 2022",
      end: "Jun 2026",
      tags: ["C#", ".NET", "C++", "Python", "SQL", "AWS", "Databricks", "OpenAI API", "GitHub Actions"],
      highlights: [
        "Designed and operated a full-stack distributed file storage platform (C#, .NET, C++, REST APIs) that serves as the data backbone for enterprise-wide FactSet workflows — owning the system end-to-end from API design to operational reliability.",
        "Led full-stack development of a self-service client data migration platform — .NET backend, operational UI layer, AWS infrastructure — enabling secure cross-firm data consolidation with automated integrity validation and eliminating ~10 hours/week of overhead across 5 engineering teams.",
        "Architected a high-throughput data quality platform processing up to 1 TB/hour across AWS S3 and SQL, ensuring data integrity for critical client-data workflows.",
        "Built an AI-powered engineering copilot (Python, OpenAI APIs, GitHub Actions, SQL) that auto-generates release risk assessments, dependency analyses, and stakeholder-ready summaries from deployment metadata and operational logs — eliminating a recurring manual reporting bottleneck.",
        "Developed ML-assisted observability tooling (scikit-learn decision-tree classifiers, Pandas) that analyzes production infrastructure logs to surface memory bottlenecks — reducing mean time to detection for recurring performance incidents.",
        "Redesigned CI/CD and deployment orchestration for a distributed SQL platform spanning 1,000+ database nodes — modernizing scheduling and versioning, cutting cross-firm migration execution time by 23% across ~20 annual enterprise migrations.",
        "Built cost-attribution analytics pipelines and a data-lake reporting layer in Databricks from operational telemetry — surfacing cloud spend by team and component, enabling leadership to reduce infrastructure costs.",
        "Engineered a resilient multi-region AWS infrastructure solution improving fault tolerance and scalability for critical client-data workflows.",
        "Built an event-driven deployment calendar and visualization platform integrated with release workflows, giving engineering teams and stakeholders real-time operational transparency.",
      ],
    },
    {
      company: "RWJ Hospital AI Research",
      role: "Data Scientist Intern",
      location: "New Brunswick, NJ",
      start: "Jul 2024",
      end: "Jan 2025",
      tags: ["PyRadiomics", "NumPy", "Pandas", "CNN", "Medical Imaging"],
      highlights: [
        "Designed medical imaging preprocessing and radiomics feature-extraction pipelines (PyRadiomics, NumPy, Pandas), improving dataset quality for CNN-based clinical AI models achieving ~97% precision/recall and advancing early disease detection research.",
      ],
    },
    {
      company: "ADP, LLC",
      role: "ML Engineering Intern",
      location: "Roseland, NJ",
      start: "Jun 2021",
      end: "Aug 2021",
      tags: ["BERT", "NLP", "Python", "Document Processing"],
      highlights: [
        "Architected and deployed an in-house BERT-based NLP document-processing platform that automated classification and metadata extraction for 5,000+ weekly uploads — replacing a third-party solution, reducing costs, and removing a critical bottleneck.",
      ],
    },
  ],

  /* ---------------------------------------------------------------------------
   *  PROJECTS  —  resume work + future passion projects.
   *  Fields:
   *    title, blurb, tags[], featured(bool), status, links[{label,url}], year
   *  status: "shipped" | "in-progress" | "exploring"  (controls the badge)
   * ------------------------------------------------------------------------- */
  projects: [
    {
      title: "Distributed File Storage Platform",
      year: "2022–2026",
      status: "shipped",
      featured: true,
      blurb:
        "Large-scale distributed file storage platform exposing high-throughput REST APIs that power vital enterprise workflows across FactSet products. Owned the design and day-to-day operation end to end.",
      tags: ["C#", ".NET", "C++", "SQL", "REST", "Distributed Systems"],
      links: [],
    },
    {
      title: "Self-Service Client Data Migration Platform",
      year: "2023–2026",
      status: "shipped",
      featured: true,
      blurb:
        "Secure cross-firm data consolidation with automated integrity validation. Eliminated ~10 hours/week of operational overhead across 5 engineering teams and cut migration execution time 23% via resilient multi-region infrastructure.",
      tags: ["C#", "AWS", "Multi-Region", "Automation", "Data Integrity"],
      links: [],
    },
    {
      title: "High-Throughput Data Quality Platform",
      year: "2023",
      status: "shipped",
      featured: true,
      blurb:
        "Processes up to 1 TB/hour across AWS S3 and SQL storage systems, ensuring data integrity and operational reliability for client-data workflows.",
      tags: ["AWS S3", "SQL", "Throughput", "Data Quality"],
      links: [],
    },
    {
      title: "Deployment Orchestration Redesign",
      year: "2024",
      status: "shipped",
      featured: false,
      blurb:
        "Redesigned deployment orchestration for a distributed relational database platform spanning 1,000+ nodes and hundreds of client databases — modernizing CI/CD, deployment scheduling, and versioning. Paired with an event-driven deployment calendar and visualization tool.",
      tags: ["CI/CD", "GitHub Actions", "Orchestration", "Visualization"],
      links: [],
    },
    {
      title: "AI-Assisted Engineering Copilot",
      year: "2025",
      status: "shipped",
      featured: false,
      blurb:
        "Automated release risk assessments and stakeholder-ready summaries by analyzing deployment metadata, infrastructure dependencies, and operational logs with OpenAI APIs, GitHub Actions, and SQL.",
      tags: ["Python", "OpenAI", "GitHub Actions", "SQL", "Observability"],
      links: [],
    },
    {
      title: "ML-Assisted Observability Tooling",
      year: "2024",
      status: "shipped",
      featured: false,
      blurb:
        "Decision-tree classifiers over production and infrastructure logs to rapidly surface memory bottlenecks and system constraints — turning noisy telemetry into actionable signals.",
      tags: ["Python", "Pandas", "scikit-learn", "Telemetry"],
      links: [],
    },
  ],

  /* ---------------------------------------------------------------------------
   *  SKILLS  —  grouped. Add / rename categories freely.
   * ------------------------------------------------------------------------- */
  skills: [
    { group: "Languages",        items: ["Python", "C#", "C++", "TypeScript", "Java", "SQL", "R"] },
    { group: "Frameworks",       items: [".NET", "React", "FastAPI", "Flask", "Node.js", "HuggingFace"] },
    { group: "ML & Data",        items: ["Pandas", "NumPy", "scikit-learn", "TensorFlow", "XGBoost", "ML Pipelines", "LLM APIs"] },
    { group: "Databases",        items: ["SQL", "PostgreSQL", "MongoDB"] },
    { group: "Cloud & DevOps",   items: ["AWS", "Docker", "Terraform", "GitHub Actions", "Apache Spark", "Databricks", "Linux"] },
  ],

  /* ---------------------------------------------------------------------------
   *  CURRENTLY  —  what you're learning / pursuing.
   * ------------------------------------------------------------------------- */
  currently: {
    learning: ["GPU Computing for Machine Learning Systems", "Multi-Agent System (MAS)", "MLOps"],
    building: ["FIFA 2026 Predictor", "Iris Classification"],
    reading: ["The Big Book of MLOps", "Data Science for Marketing Analytics"],
  },

  /* ---------------------------------------------------------------------------
   *  EDUCATION
   * ------------------------------------------------------------------------- */
  education: [
    {
      school: "University of Pennsylvania",
      degree: "M.S. in Data Science, AI/ML Focus | GPA: 3.9",
      start: "Aug 2025",
      end: "Dec 2026",
      desc: "Interdisciplinary graduate program spanning ML/AI systems and large-scale data infrastructure",
      notes: "Coursework: Applied Machine Learning, Distributed Systems, Product Design, AI, NLP, Big Data",
    },
    {
      school: "New Jersey Institute of Technology",
      degree: "B.S. in Computer Science, Minor in Appl. Statistics | GPA: 3.8",
      start: "Sep 2018",
      end: "May 2022",
      desc: "",
      notes: "Honors: 4x Dean's List · 2020 PMINJ Scholarship · All-Academic AKPsi Scholarship",
    },
  ],

  /* ---------------------------------------------------------------------------
   *  THEME
   * ------------------------------------------------------------------------- */
  theme: {
    accent: "#2dd4bf",       // teal — primary highlights, nodes
    accentAlt: "#fbbf24",    // amber — secondary glow / accents
    accentWarn: "#fb923c",   // orange — in-progress badges
    bg: "#0e1218",           // deep slate page background
    surface: "#161c25",      // card background (glassy)
    border: "#283342",
    text: "#e8edf4",
    textDim: "#94a3b8",
    font: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif",
  },
};

// Expose CONFIG to the page renderer (main.js). Leave this line in place.
window.CONFIG = CONFIG;
