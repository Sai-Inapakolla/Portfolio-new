const asset = (name: string) => `${import.meta.env?.BASE_URL || '/'}assets/${name}`;
// Portfolio facts transcribed for Sai Inapakolla.

export type Palette = { from: string; via: string; to: string; accent: string };
export type Metric = { value: string; label: string };
export type Project = { id: string; title: string; year: string; genre: string; logline: string; stack: string[]; build: string[]; features: string[]; metrics: Metric[]; github?: string; appUrl?: string; website?: string; palette: Palette; motif: 'shield' | 'flow' | 'tenants' };
export type Achievement = { id: string; title: string; org: string; detail: string; laurel: string; link?: string };
export type Certification = { issuer: string; name: string; link?: string };
export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };
export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
  institution?: string;
  score?: string;
  board?: string;
  highlights?: string[];
  achievements?: string[];
};
export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  institution?: string;
  degree?: string;
  score?: string;
  board?: string;
  highlights?: string[];
  achievements?: string[];
  episodes: Episode[];
};
export type TopPick = { label: string; title: string; detail: string; palette: Palette };
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };
export type LeetCodeAchievements = {
  username: string;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  recent: { title: string; url: string; solvedAt: string }[];
  badges: { name: string; icon: string; earnedAt: string }[];
  fetchedAt: string;
};

export const profile = {
  fullName: "Sai Inapakolla",
  displayName: "Sai Inapakolla",
  firstName: "SAI",
  seriesTag: "THE SERIES",
  originalLabel: "A SAI INAPAKOLLA ORIGINAL",
  role: "Full Stack Developer | ML Engineer | Java Developer",
  primaryBadge: "Full Stack",
  tagline: [
    "Java & Spring Boot",
    "Full-Stack Development",
    "Backend Architecture"
  ],
  intro: "I'm a 2027 Computer Science and Engineering student and software developer focused on building reliable, scalable full-stack applications. My primary strengths are Java, Spring Boot, React, TypeScript, and backend engineering. I have developed projects involving multi-tenant SaaS architecture, secure REST APIs, JWT authentication, role-based access control, real-time communication, and database optimization.",
  location: "Hyderabad, Telangana",
  email: "inapakolla.sai1@gmail.com",
  phone: "+91 9490969706",
  links: {
    linkedin: "https://www.linkedin.com/in/saiinapakolla576",
    github: "https://github.com/Sai-Inapakolla",
    leetcode: "https://leetcode.com/u/user_x_576/",
    instagram: "https://instagram.com/inapakolla.sai",
    website: "https://safego1.vercel.app"
  },
  interests: [
    "Backend Architecture & Microservices",
    "Multi-Tenant SaaS Systems",
    "Real-Time Applications & WebSockets",
    "Combinatorial Algorithms & Optimization",
    "Machine Learning & Agentic AI"
  ],
  primaryLanguage: "Java",
  supportingLanguages: [
    "JavaScript",
    "TypeScript",
    "Python",
    "SQL"
  ],
  primaryStack: [
    "Java",
    "Spring Boot",
    "React",
    "TypeScript"
  ],
  yearsExperience: "Class of 2027",
  productionAppCount: "11",
  languages: [
    "English — Professional",
    "Telugu — Native",
    "Hindi — Working"
  ],
  resumePdf: '',
  portrait: {
    src: asset('portrait-720.webp'),
    srcSet: `${asset('portrait-420.webp')} 420w, ${asset('portrait-720.webp')} 720w, ${asset('portrait-1100.webp')} 1100w`,
    alt: 'Sai Inapakolla',
  },
};

export const education = [
  {
    school: "Parul Institute of Engineering & Technology, Parul University",
    place: "Vadodara, Gujarat, India",
    degree: "Bachelor of Technology — Computer Science & Engineering",
    period: "2023 – 2027",
    score: "7.71 / 10.0 Current CGPA",
    highlights: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks"
    ],
    achievements: [
      "Top 2 – GeeksforGeeks College Leaderboard",
      "PU Code Hackathon 3.0 Finalist",
      "Bharatiya Antariksh Hackathon 2026"
    ]
  },
  {
    school: "Government Junior College",
    place: "Cherla, Telangana",
    degree: "Intermediate Education — MPC (Mathematics, Physics & Chemistry)",
    period: "2021 – 2023",
    score: "867 / 1000 Total marks (86.7%)",
    board: "Telangana State Board of Intermediate Education (TSBIE)",
    highlights: [
      "Mathematics (Differential & Integral Calculus, Matrices, Geometry)",
      "Physics (Mechanics, Electromagnetism, Modern Physics)",
      "Chemistry (Organic, Inorganic & Physical Chemistry)"
    ],
    achievements: [
      "86.7% First-Class Distinction in TSBIE Public Examinations"
    ]
  },
  {
    school: "Gurudev Vidyalayam",
    place: "Telangana, India",
    degree: "Secondary School Certificate (SSC — Class X)",
    period: "2020 – 2021",
    score: "10.0 / 10.0 Perfect GPA",
    board: "Telangana State Board of Secondary Education",
    highlights: [
      "Mathematics & Geometry Core",
      "Physical & Biological Sciences",
      "Social Sciences & English Language"
    ],
    achievements: [
      "10.0 / 10.0 Perfect GPA Secondary School Academic Achievement"
    ]
  }
];

export const experience = [
  {
    company: "Engineering & Open Source Projects",
    role: "Full-Stack & Backend Developer",
    place: "Hyderabad, India",
    period: "2023 – Present",
    points: [
      "Architected TeamX, a multi-tenant SaaS platform in Java Spring Boot with tenant-isolated data layers, JWT security, and 102k+ verified test assertions.",
      "Engineered SafeGo, an intelligent real-time safety ride-hailing platform using FastAPI, React, WebSockets, Twilio, and ML with 8,650 req/sec benchmarked throughput.",
      "Built BAAHUBALI, a role-based core banking application with Spring Boot 3.5, transaction ledgers, and loan lifecycle processing.",
      "Developed AstroML, an astronomy-focused machine learning classification and cosmological distance regression system.",
      "Built a Multi-Strategy Combinatorial Optimization Framework benchmarking TSP, Knapsack, and Hungarian Matching across 5 algorithmic paradigms.",
      "Solved 600+ Data Structures & Algorithms problems across LeetCode and GeeksforGeeks, ranking Top 2 on the college leaderboard."
    ]
  }
];

export const projects: Project[] = [
  {
    id: "teamx",
    title: "TeamX",
    year: "2025",
    genre: "Java • Spring Boot • Multi-Tenant SaaS",
    logline: "A multi-tenant SaaS management platform featuring tenant-level data isolation, secure authentication, role-based access control, and collaborative project management.",
    stack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "React.js",
      "Hibernate/JPA",
      "MySQL",
      "MongoDB",
      "Vitest"
    ],
    build: [
      "Designed a tenant-aware shared-schema architecture with data isolation enforced at the data layer.",
      "Implemented JWT authentication and role-based access control for Admin, Manager, and User roles.",
      "Developed 15+ REST API endpoints with robust error handling and transactional integrity.",
      "Validated tenant isolation through 102,982 assertions with zero cross-tenant leaks.",
      "Load-tested 50 concurrent tenant organizations at 120+ requests per second with sub-50ms p95 latency for project reads."
    ],
    features: [
      "Tenant-level data isolation",
      "JWT & Role-Based Access Control",
      "15+ REST API endpoints",
      "102,982 test assertions",
      "Collaborative project management",
      "Sub-50ms p95 read latency"
    ],
    metrics: [
      {
        value: "102k+",
        label: "tested assertions"
      },
      {
        value: "<50ms",
        label: "p95 read latency"
      },
      {
        value: "0",
        label: "cross-tenant leaks"
      }
    ],
    palette: {
      from: "#04121f",
      via: "#0f4c6e",
      to: "#05080d",
      accent: "#4cc9ff"
    },
    motif: "tenants",
    github: "https://github.com/Sai-Inapakolla/TeamX"
  },
  {
    id: "safego",
    title: "SafeGo",
    year: "2025",
    genre: "Full-Stack • Real-Time Systems • ML",
    logline: "An inclusive, safety-first ride-hailing platform with real-time location tracking, ML features, AI voice assistance, and emergency SOS.",
    stack: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "MongoDB",
      "WebSockets",
      "Machine Learning",
      "Twilio"
    ],
    build: [
      "Developed Passenger, Driver, and Admin portals with streamlined ride-booking and dispatch workflows.",
      "Implemented WebSocket-based live location tracking, driver synchronization, and instant emergency SOS triggers.",
      "Integrated ML models, AI voice assistance, multilingual capabilities, and Twilio SMS/voice notifications.",
      "Designed accessibility features with WCAG 2.1 AA specifications and validated with a 258-test suite at 100% pass rate.",
      "Load-tested up to 8,650 requests per second with 5,000 concurrent virtual users."
    ],
    features: [
      "WebSocket live location tracking",
      "Emergency SOS & Twilio alerts",
      "ML ride & safety intelligence",
      "AI voice assistant",
      "WCAG 2.1 AA accessibility",
      "Portals for Rider, Driver & Admin"
    ],
    metrics: [
      {
        value: "8.6k",
        label: "requests / second"
      },
      {
        value: "100%",
        label: "pass rate (258 tests)"
      },
      {
        value: "5k",
        label: "concurrent virtual users"
      }
    ],
    palette: {
      from: "#2a0610",
      via: "#7a0f24",
      to: "#0b0710",
      accent: "#ff3d5a"
    },
    motif: "shield",
    github: "https://github.com/Sai-Inapakolla/Safe-Go",
    appUrl: "https://safego1.vercel.app/",
    website: "https://safego1.vercel.app/"
  },
  {
    id: "baahubali",
    title: "BAAHUBALI Bank Management",
    year: "2024",
    genre: "Java • Spring Boot • FinTech",
    logline: "A lightweight banking management system with role-based access control, transaction ledgers, and loan processing.",
    stack: [
      "Java",
      "Spring Boot 3.5",
      "Spring Data JPA",
      "Hibernate",
      "REST APIs",
      "H2 Database"
    ],
    build: [
      "Engineered a core banking system using Spring Boot 3.5 and Hibernate/JPA.",
      "Implemented Role-Based Access Control (Admin, Employee, Customer) for secure financial workflows.",
      "Built REST API endpoints for real-time account balances, ledger transactions, and loan evaluations.",
      "Ensured transactional integrity and strict audit logging across all banking operations."
    ],
    features: [
      "Role-Based Access Control (Admin, Employee, Customer)",
      "Account & ledger transaction management",
      "Loan application processing lifecycle",
      "JPA/Hibernate RESTful APIs",
      "Automated financial state tracking"
    ],
    metrics: [
      {
        value: "3 Roles",
        label: "Admin, Employee, Customer"
      },
      {
        value: "Spring 3.5",
        label: "modern framework"
      }
    ],
    palette: {
      from: "#04121f",
      via: "#0f4c6e",
      to: "#05080d",
      accent: "#4cc9ff"
    },
    motif: "tenants",
    github: "https://github.com/Sai-Inapakolla/BAAHUBALI"
  },
  {
    id: "astroml",
    title: "AstroML — Cosmic Classification",
    year: "2024",
    genre: "Machine Learning • Python • Astrophysics",
    logline: "Machine learning for stellar object classification and cosmological distance estimation using observational parameters.",
    stack: [
      "Python",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "Machine Learning"
    ],
    build: [
      "Developed ML classification models to identify stars, galaxies, and quasars from multi-band astronomical survey data.",
      "Constructed regression pipelines to estimate cosmological distance and redshift values from photometric parameters.",
      "Applied feature importance analysis and model evaluation techniques to maximize predictive accuracy."
    ],
    features: [
      "Stellar object classification (stars, galaxies, quasars)",
      "Cosmological distance & redshift estimation",
      "Astronomical photometric feature engineering",
      "Scikit-learn model evaluation & cross-validation"
    ],
    metrics: [
      {
        value: "Multi-Class",
        label: "astronomical objects"
      },
      {
        value: "Python ML",
        label: "scientific computing"
      }
    ],
    palette: {
      from: "#1a0d02",
      via: "#8a4a07",
      to: "#0a0806",
      accent: "#ffb547"
    },
    motif: "shield",
    github: "https://github.com/Sai-Inapakolla/AstroML"
  },
  {
    id: "combinatorial-optimization",
    title: "Combinatorial Optimization Framework",
    year: "2024",
    genre: "Algorithms • Optimization • Python",
    logline: "A multi-strategy framework benchmarking classical NP-hard problems (TSP, Knapsack, Bipartite Matching) across 5 algorithmic paradigms.",
    stack: [
      "Python",
      "Dynamic Programming",
      "Branch & Bound",
      "Hungarian Algorithm",
      "Backtracking",
      "Benchmarking"
    ],
    build: [
      "Engineered an extensible algorithmic framework to experiment, compare, and benchmark multiple solution paradigms on classical optimization challenges.",
      "Implemented 5 distinct strategies for TSP: Greedy Nearest-Neighbor with 2-Opt, Divide & Conquer median split, Held-Karp Dynamic Programming, Backtracking, and Priority-Queue guided Branch & Bound.",
      "Formulated exact and approximation solutions for 0/1 Knapsack including meet-in-the-middle and fractional bound pruning.",
      "Solved Min-Cost Bipartite Matching using optimal Hungarian Algorithm (O(n³)), bitmask Dynamic Programming, and heuristic strategies."
    ],
    features: [
      "TSP multi-strategy solver (Held-Karp, 2-Opt, Branch & Bound)",
      "0/1 Knapsack exact and meet-in-the-middle solvers",
      "Min-Cost Bipartite Matching via Hungarian Algorithm O(n³)",
      "Comparative benchmarking and latency profiling"
    ],
    metrics: [
      {
        value: "3 NP-Hard",
        label: "classical problems"
      },
      {
        value: "5 Paradigms",
        label: "DP, B&B, Greedy, D&C, Backtracking"
      }
    ],
    palette: {
      from: "#1a0d02",
      via: "#8a4a07",
      to: "#0a0806",
      accent: "#ffb547"
    },
    motif: "flow",
    github: "https://github.com/Sai-Inapakolla/Multi-Strategy-Combinatorial-Optimization-Framework"
  },
  {
    id: "tai",
    title: "TAI — Approval Intelligence",
    year: "2024",
    genre: "Full-Stack • ML Microservice • Workflow",
    logline: "An intelligent loan approval platform combining a full-stack web application with a dedicated machine learning service for decision workflows.",
    stack: [
      "Angular",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "Machine Learning"
    ],
    build: [
      "Developed an Angular-based interface for interactive loan application and approval workflows.",
      "Engineered backend REST APIs with Node.js and Express to process underwriting applications.",
      "Integrated a dedicated Python machine learning microservice for automated risk scoring and approval intelligence.",
      "Connected frontend, MongoDB datastore, and ML prediction service into a unified reactive architecture."
    ],
    features: [
      "ML loan approval risk scoring",
      "Multi-step approval workflows",
      "Angular frontend application",
      "Unified Node.js & Python backend",
      "Audit logging & decision trails"
    ],
    metrics: [
      {
        value: "End-to-End",
        label: "ML microservice integration"
      }
    ],
    palette: {
      from: "#1a0d02",
      via: "#8a4a07",
      to: "#0a0806",
      accent: "#ffb547"
    },
    motif: "flow",
    github: "https://github.com/Sai-Inapakolla/TAI-main"
  },
  {
    id: "aeros",
    title: "Aeros Flight Simulator",
    year: "2024",
    genre: "Java • Spring Boot • Microservices",
    logline: "A flight simulation backend built with Spring Boot microservices exploring distributed service architecture and inter-service messaging.",
    stack: [
      "Java",
      "Spring Boot",
      "Microservices",
      "REST APIs",
      "Maven"
    ],
    build: [
      "Engineered a flight simulation backend structured into modular Spring Boot microservices.",
      "Decoupled system capabilities into independent flight-data, telemetry, and simulation services.",
      "Applied service-oriented architectural patterns and clean domain-driven backend design."
    ],
    features: [
      "Decoupled microservice architecture",
      "Telemetry & flight simulation logic",
      "Service-to-service communication",
      "Modular Spring Boot design"
    ],
    metrics: [],
    palette: {
      from: "#04121f",
      via: "#0f4c6e",
      to: "#05080d",
      accent: "#4cc9ff"
    },
    motif: "flow",
    github: "https://github.com/Sai-Inapakolla/Aeros"
  },
  {
    id: "intern-tracer",
    title: "Intern-Tracer",
    year: "2024",
    genre: "Full-Stack • Angular • TypeScript",
    logline: "A centralized full-stack application for tracking internship applications, interview rounds, and recruiter communications.",
    stack: [
      "Angular",
      "Node.js",
      "Express.js",
      "TypeScript",
      "MongoDB"
    ],
    build: [
      "Developed an Angular Single Page Application (SPA) for managing career search pipelines.",
      "Built Node.js & Express REST APIs with TypeScript for structured application lifecycle management.",
      "Integrated MongoDB for persistent application status tracking, notes, and timeline logging."
    ],
    features: [
      "Pipeline board for internship applications",
      "TypeScript Node.js REST API",
      "Angular reactive SPA interface",
      "MongoDB persistent status datastore"
    ],
    metrics: [],
    palette: {
      from: "#04121f",
      via: "#0f4c6e",
      to: "#05080d",
      accent: "#4cc9ff"
    },
    motif: "tenants",
    github: "https://github.com/Sai-Inapakolla/Intern-Tracer"
  },
  {
    id: "foodie-genie",
    title: "Foodie Genie",
    year: "2024",
    genre: "Python • Flask • Recommendation System",
    logline: "A Flask-based recipe recommendation platform helping users discover recipes through intelligent preference matching.",
    stack: [
      "Python",
      "Flask",
      "Recommendation Systems",
      "HTML5",
      "CSS3"
    ],
    build: [
      "Developed a Python web application utilizing Flask for fast culinary discovery.",
      "Implemented recommendation logic matching user ingredients and preferences with recipe profiles.",
      "Crafted an intuitive, lightweight web interface for instant dish recommendations."
    ],
    features: [
      "Ingredient-based recipe discovery",
      "Recommendation matching algorithm",
      "Lightweight Flask web application",
      "Clean interactive interface"
    ],
    metrics: [],
    palette: {
      from: "#2a0610",
      via: "#7a0f24",
      to: "#0b0710",
      accent: "#ff3d5a"
    },
    motif: "shield",
    github: "https://github.com/Sai-Inapakolla/foodie_genie"
  },
  {
    id: "fino",
    title: "Fino — Financial Decision Agent",
    year: "2024",
    genre: "Agentic AI • Next.js • FinTech",
    logline: "A deterministic financial decision platform evaluating purchase viability, payment plans, and budget risk for HackerRank Orchestrate.",
    stack: [
      "Next.js",
      "TypeScript",
      "Python",
      "Agentic AI",
      "Tailwind CSS"
    ],
    build: [
      "Built a full-stack financial decision platform combining a Next.js interface with an intelligent Python evaluation agent.",
      "Implemented deterministic financial logic to categorize purchases into safe, plan-based, postponed, or inadvisable.",
      "Designed reactive user workflows with instant financial health feedback and decision transparency."
    ],
    features: [
      "Deterministic affordability scoring",
      "Payment plan evaluation logic",
      "Next.js reactive dashboard",
      "Financial risk reasoning engine"
    ],
    metrics: [
      {
        value: "4 States",
        label: "safe, plan, postpone, reject"
      }
    ],
    palette: {
      from: "#2a0610",
      via: "#7a0f24",
      to: "#0b0710",
      accent: "#ff3d5a"
    },
    motif: "flow",
    github: "https://github.com/Sai-Inapakolla/Fino"
  },
  {
    id: "nexusops",
    title: "NexusOps",
    year: "2024",
    genre: "Full-Stack • Operations • CRM",
    logline: "A centralized business operations platform for managing customer relationships, inventory, products, and sales challans.",
    stack: [
      "Full-Stack",
      "CRM Architecture",
      "Inventory Systems",
      "REST APIs",
      "Database Design"
    ],
    build: [
      "Designed a centralized business operations platform unifying customer records, inventory tracking, and sales workflows.",
      "Structured schemas for multi-product catalogs, stock tracking, and sales challan generation.",
      "Developed modular interfaces and REST endpoints for comprehensive enterprise resource and customer relationship management."
    ],
    features: [
      "Centralized CRM and customer profile management",
      "Real-time inventory and product catalog tracking",
      "Sales challan and order workflow generation",
      "Unified enterprise operational dashboard"
    ],
    metrics: [
      {
        value: "Centralized",
        label: "operations platform"
      }
    ],
    palette: {
      from: "#04121f",
      via: "#0f4c6e",
      to: "#05080d",
      accent: "#4cc9ff"
    },
    motif: "tenants",
    github: "https://github.com/Sai-Inapakolla/NexusOps"
  }
];

export const productionApps = [
  {
    name: "SafeGo (Live App)",
    url: "https://safego1.vercel.app/"
  },
  {
    name: "TeamX (GitHub)",
    url: "https://github.com/Sai-Inapakolla/TeamX"
  },
  {
    name: "BAAHUBALI (GitHub)",
    url: "https://github.com/Sai-Inapakolla/BAAHUBALI"
  },
  {
    name: "AstroML (GitHub)",
    url: "https://github.com/Sai-Inapakolla/AstroML"
  },
  {
    name: "Combinatorial Optimization (GitHub)",
    url: "https://github.com/Sai-Inapakolla/Multi-Strategy-Combinatorial-Optimization-Framework"
  },
  {
    name: "TAI (GitHub)",
    url: "https://github.com/Sai-Inapakolla/TAI-main"
  },
  {
    name: "Safe-Go (GitHub)",
    url: "https://github.com/Sai-Inapakolla/Safe-Go"
  },
  {
    name: "Aeros (GitHub)",
    url: "https://github.com/Sai-Inapakolla/Aeros"
  },
  {
    name: "Intern-Tracer (GitHub)",
    url: "https://github.com/Sai-Inapakolla/Intern-Tracer"
  },
  {
    name: "Foodie Genie (GitHub)",
    url: "https://github.com/Sai-Inapakolla/foodie_genie"
  },
  {
    name: "Fino (GitHub)",
    url: "https://github.com/Sai-Inapakolla/Fino"
  },
  {
    name: "NexusOps (GitHub)",
    url: "https://github.com/Sai-Inapakolla/NexusOps"
  },
  {
    name: "LeetCode (user_x_576)",
    url: "https://leetcode.com/u/user_x_576/"
  }
];

export const achievements: Achievement[] = [
  {
    id: "dsa-600",
    title: "600+ DSA Problems Solved",
    org: "LeetCode & GeeksforGeeks",
    detail: "Mastered core algorithms, dynamic programming, graph theory, and data structures.",
    laurel: "Algorithmic Depth"
  },
  {
    id: "gfg-leaderboard",
    title: "Top 2 Leaderboard Rank",
    org: "GeeksforGeeks Parul University",
    detail: "Ranked #2 on the university coding leaderboard through continuous problem-solving excellence.",
    laurel: "Competitive Coding"
  },
  {
    id: "tenant-isolation",
    title: "102k+ Zero-Leak Assertions",
    org: "TeamX Platform",
    detail: "Architected tenant-level data isolation verified with 102,982 assertions.",
    laurel: "Backend Architecture"
  },
  {
    id: "load-test-throughput",
    title: "8,650 Req/Sec Load Test",
    org: "SafeGo Mobility Platform",
    detail: "High-throughput real-time WebSocket and API benchmarking with 5,000 concurrent virtual users.",
    laurel: "High Concurrency"
  }
];

export const certifications: Certification[] = [
  {
    issuer: "Parul University",
    name: "B.Tech Computer Science & Engineering (2023–2027)"
  },
  {
    issuer: "GeeksforGeeks",
    name: "Data Structures & Algorithms Leaderboard Rank #2"
  },
  {
    issuer: "LeetCode",
    name: "600+ Algorithmic Challenges (user_x_576)"
  },
  {
    issuer: "Spring & Java",
    name: "Multi-Tenant Architecture & REST API Engineering"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend Development",
    subtitle: "Robust enterprise services, APIs & security",
    skills: [
      { name: "Java", mono: "Ja", note: "Primary" },
      { name: "Spring Boot", mono: "SB", note: "Primary" },
      { name: "Spring Security", mono: "SS" },
      { name: "Hibernate / JPA", mono: "JP" },
      { name: "Node.js", mono: "No" },
      { name: "Express.js", mono: "Ex" },
      { name: "FastAPI", mono: "FA" },
      { name: "REST APIs", mono: "RE" },
      { name: "WebSockets", mono: "WS" },
      { name: "JWT & RBAC", mono: "JW" }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Development",
    subtitle: "Responsive UI & modern web applications",
    skills: [
      { name: "React.js", mono: "Re", note: "Primary" },
      { name: "Next.js", mono: "Nx" },
      { name: "TypeScript", mono: "TS" },
      { name: "JavaScript", mono: "JS" },
      { name: "Angular", mono: "Ng" },
      { name: "Tailwind CSS", mono: "TC" },
      { name: "HTML5 & CSS3", mono: "H5" }
    ]
  },
  {
    id: "database",
    title: "Database Engineering",
    subtitle: "Data modeling, isolation & query optimization",
    skills: [
      { name: "MySQL", mono: "My" },
      { name: "MongoDB", mono: "Mo" },
      { name: "SQL", mono: "SQ" },
      { name: "Data Modeling", mono: "DM" },
      { name: "Multi-Tenant Isolation", mono: "TI" }
    ]
  },
  {
    id: "cloud-tools",
    title: "Cloud, Tools & Testing",
    subtitle: "Infrastructure, developer tooling & automated suites",
    skills: [
      { name: "AWS (S3, EC2, IAM)", mono: "AW" },
      { name: "Git & GitHub", mono: "Gi" },
      { name: "Maven", mono: "Mv" },
      { name: "Postman", mono: "Po" },
      { name: "Vitest", mono: "Vi" },
      { name: "Twilio", mono: "Tw" },
      { name: "Cloudinary", mono: "Cl" }
    ]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    subtitle: "ML fundamentals, algorithms & model integration",
    skills: [
      { name: "Python", mono: "Py" },
      { name: "Scikit-Learn", mono: "SL" },
      { name: "Combinatorial Optimization", mono: "CO" },
      { name: "Pandas", mono: "Pd" },
      { name: "NumPy", mono: "NP" },
      { name: "ML API Integration", mono: "ML" }
    ]
  }
];

export const skillEvidence: Record<string, string[]> = {
  "Java": [
    "TeamX: Multi-tenant backend architecture & data isolation",
    "BAAHUBALI: Core banking system with Spring Boot 3.5 & H2",
    "Aeros: Spring Boot flight simulator microservices",
    "600+ DSA algorithmic problems solved"
  ],
  "Spring Boot": [
    "TeamX: 15+ secure REST API endpoints with JPA & Hibernate",
    "BAAHUBALI: Role-based banking ledger & loan management",
    "Aeros: Microservice decomposition and domain architecture"
  ],
  "Spring Security": [
    "TeamX: JWT authentication & Role-Based Access Control (Admin, Manager, User)",
    "BAAHUBALI: Role-based authorization across banking endpoints"
  ],
  "React.js": [
    "TeamX: Collaborative SaaS project management UI",
    "SafeGo: Passenger, Driver & Admin portals with Tailwind CSS"
  ],
  "Next.js": [
    "Fino: Full-stack financial decision agent dashboard"
  ],
  "TypeScript": [
    "SafeGo: Type-safe frontend client architecture and state management",
    "Intern-Tracer: Node.js backend & Angular application"
  ],
  "FastAPI": [
    "SafeGo: High-concurrency backend load-tested to 8,650 req/sec"
  ],
  "WebSockets": [
    "SafeGo: Live location tracking, driver synchronization & emergency SOS"
  ],
  "MySQL": [
    "TeamX: Tenant-aware shared-schema architecture & data isolation"
  ],
  "MongoDB": [
    "SafeGo: Scalable ride-log and user data storage",
    "TAI: Loan application workflow datastore",
    "Intern-Tracer: Application tracking datastore"
  ],
  "Python": [
    "SafeGo: Machine learning features & AI voice assistant",
    "AstroML: Stellar object classification & cosmological distance regression",
    "Combinatorial Optimization: Multi-strategy benchmark framework",
    "TAI: Dedicated loan approval scoring microservice",
    "Foodie Genie: Flask recommendation engine",
    "Fino: Deterministic financial decision engine"
  ],
  "Vitest": [
    "TeamX: Automated testing suite verifying 102,982 assertions"
  ]
};

export const seasons: Season[] = [
  {
    number: 1,
    title: "Bachelor of Technology — Computer Science & Engineering",
    period: "2023 – 2027",
    synopsis: "Parul Institute of Engineering & Technology, Parul University · Vadodara, Gujarat, India",
    institution: "Parul Institute of Engineering & Technology, Parul University",
    degree: "Bachelor of Technology — Computer Science & Engineering",
    score: "7.71 / 10.0 Current CGPA",
    highlights: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks"
    ],
    achievements: [
      "Top 2 – GeeksforGeeks College Leaderboard",
      "PU Code Hackathon 3.0 Finalist",
      "Bharatiya Antariksh Hackathon 2026"
    ],
    episodes: [
      {
        code: "SLIDE 01",
        title: "Bachelor of Technology — CSE",
        description: "Pursuing B.Tech in Computer Science & Engineering at Parul Institute of Engineering & Technology with a 7.71 CGPA. Mastered Data Structures & Algorithms, Operating Systems, DBMS, and Computer Networks while securing Top 2 on GeeksforGeeks College Leaderboard.",
        tags: [
          "Parul University",
          "CGPA 7.71 / 10",
          "DSA & Algorithms",
          "Operating Systems",
          "DBMS",
          "Computer Networks",
          "2023 – 2027"
        ],
        runtime: "2023 – 2027",
        palette: {
          from: "#2a0610",
          via: "#7a0f24",
          to: "#0b0710",
          accent: "#ff3d5a"
        }
      }
    ]
  },
  {
    number: 2,
    title: "Intermediate Education — MPC (Class XII)",
    period: "2021 – 2023",
    synopsis: "Government Junior College · Cherla, Telangana",
    institution: "Government Junior College",
    degree: "Intermediate — MPC (Mathematics, Physics & Chemistry)",
    score: "867 / 1000 Total marks (86.7%)",
    board: "Telangana State Board of Intermediate Education (TSBIE)",
    highlights: [
      "Mathematics (Differential & Integral Calculus, Matrices, Geometry)",
      "Physics (Mechanics, Electromagnetism, Modern Physics)",
      "Chemistry (Organic, Inorganic & Physical Chemistry)"
    ],
    achievements: [
      "86.7% First-Class Distinction in TSBIE Public Examinations"
    ],
    episodes: [
      {
        code: "SLIDE 02",
        title: "Intermediate Education — MPC",
        description: "Completed higher secondary education in Mathematics, Physics & Chemistry (MPC) at Government Junior College, Cherla under TSBIE. Scored 867/1000 (86.7%) total marks with strong mathematical and analytical foundations.",
        tags: [
          "Government Junior College",
          "867 / 1000 (86.7%)",
          "TSBIE Board",
          "Mathematics (MPC)",
          "Physics & Chemistry",
          "Cherla, Telangana"
        ],
        runtime: "2021 – 2023",
        palette: {
          from: "#120822",
          via: "#3d1a6e",
          to: "#07060c",
          accent: "#b98bff"
        }
      }
    ]
  },
  {
    number: 3,
    title: "Secondary School Certificate — SSC (Class X)",
    period: "2020 – 2021",
    synopsis: "Gurudev Vidyalayam · Telangana, India",
    institution: "Gurudev Vidyalayam",
    degree: "Secondary School Certificate (SSC — Class X)",
    score: "10.0 / 10.0 Perfect GPA",
    board: "Telangana State Board of Secondary Education",
    highlights: [
      "Mathematics & Geometry Core",
      "Physical & Biological Sciences",
      "Social Sciences & English Language"
    ],
    achievements: [
      "10.0 / 10.0 Perfect GPA Secondary School Academic Achievement"
    ],
    episodes: [
      {
        code: "SLIDE 03",
        title: "Secondary School Certificate (SSC)",
        description: "Graduated Class X secondary school education at Gurudev Vidyalayam under Telangana State Board with a Perfect 10.0 / 10.0 GPA, establishing academic excellence across core sciences and mathematics.",
        tags: [
          "Gurudev Vidyalayam",
          "10.0 / 10.0 Perfect GPA",
          "Telangana SSC Board",
          "Class X Distinction",
          "Pass-out 2021"
        ],
        runtime: "2020 – 2021",
        palette: {
          from: "#03150f",
          via: "#0d5a40",
          to: "#050a08",
          accent: "#46e3a8"
        }
      }
    ]
  }
];

export const topPicks: TopPick[] = [
  {
    label: "Algorithmic Depth",
    title: "600+ DSA",
    detail: "Solved on LeetCode & GeeksforGeeks",
    palette: {
      from: "#2a0610",
      via: "#7a0f24",
      to: "#0b0710",
      accent: "#ff3d5a"
    }
  },
  {
    label: "Coding Rank",
    title: "Top 2 Rank",
    detail: "GeeksforGeeks Parul University Leaderboard",
    palette: {
      from: "#1a0d02",
      via: "#8a4a07",
      to: "#0a0806",
      accent: "#ffb547"
    }
  },
  {
    label: "Flagship SaaS",
    title: "TeamX",
    detail: "Multi-tenant SaaS with 102k+ verified assertions",
    palette: {
      from: "#04121f",
      via: "#0f4c6e",
      to: "#05080d",
      accent: "#4cc9ff"
    }
  },
  {
    label: "Real-Time Scale",
    title: "SafeGo",
    detail: "Mobility app tested to 8,650 req/sec with WebSockets",
    palette: {
      from: "#2a0610",
      via: "#7a0f24",
      to: "#0b0710",
      accent: "#ff3d5a"
    }
  },
  {
    label: "Core Banking",
    title: "BAAHUBALI",
    detail: "Spring Boot 3.5 role-based banking ledger",
    palette: {
      from: "#04121f",
      via: "#0f4c6e",
      to: "#05080d",
      accent: "#4cc9ff"
    }
  },
  {
    label: "Algorithms",
    title: "Combinatorial",
    detail: "Optimization framework for TSP, Knapsack & Matching",
    palette: {
      from: "#1a0d02",
      via: "#8a4a07",
      to: "#0a0806",
      accent: "#ffb547"
    }
  },
  {
    label: "Scientific ML",
    title: "AstroML",
    detail: "Stellar object classification & redshift regression",
    palette: {
      from: "#2a0610",
      via: "#7a0f24",
      to: "#0b0710",
      accent: "#ff3d5a"
    }
  },
  {
    label: "Primary Stack",
    title: "Java & Spring",
    detail: "Spring Boot, Security, Hibernate & REST APIs",
    palette: {
      from: "#1a0d02",
      via: "#8a4a07",
      to: "#0a0806",
      accent: "#ffb547"
    }
  }
];

export const introSlides: IntroSlide[] = [
  {
    kicker: "Profile",
    title: "Full-Stack. Systems. Scale.",
    lines: [
      "Sai Inapakolla · Full Stack Developer & Java Engineer",
      "B.Tech CSE · Parul University (2023–2027)"
    ],
    chips: [
      "Java",
      "Spring Boot",
      "React"
    ]
  },
  {
    kicker: "Backend Architecture",
    title: "Enterprise & secure.",
    lines: [
      "Spring Boot · Spring Security · Hibernate · MySQL",
      "Multi-tenant isolation · JWT & RBAC · FastAPI · REST APIs"
    ],
    chips: [
      "Spring Boot",
      "MySQL",
      "JWT",
      "REST"
    ]
  },
  {
    kicker: "Algorithmic Depth",
    title: "600+ DSA Solved.",
    lines: [
      "Top 2 on GeeksforGeeks college leaderboard",
      "Combinatorial Optimization Framework: TSP, Knapsack & Hungarian Algorithm"
    ]
  },
  {
    kicker: "Flagship: TeamX",
    title: "Zero-leak multi-tenancy.",
    lines: [
      "Tenant-aware shared schema with 102,982 assertions",
      "Sub-50ms p95 latency · 50 concurrent tenant organizations"
    ]
  },
  {
    kicker: "Mobility: SafeGo",
    title: "Safety-first real-time tech.",
    lines: [
      "Live WebSocket tracking · Emergency SOS · Twilio integration",
      "Load-tested to 8,650 requests/sec with 5,000 concurrent users"
    ]
  },
  {
    kicker: "Scientific ML & FinTech",
    title: "Machine learning integration.",
    lines: [
      "AstroML: Astronomical object classification & distance regression",
      "BAAHUBALI Banking Core · Fino Decision Agent · NexusOps"
    ]
  },
  {
    kicker: "Education",
    title: "Computer Science & Engineering.",
    lines: [
      "Parul Institute of Engineering & Technology",
      "2023 – 2027 · CGPA 7.71/10.0 · Vadodara, Gujarat"
    ]
  }
];

export type ProfileId = 'sai' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'sai',
    name: 'Sai',
    blurb: 'The full series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, achievements & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'The story arc & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

const crimson = projects[1].palette;
const amber = projects[3].palette;
const ocean = projects[0].palette;
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & engineering', palette: violet },
  journey: { nav: 'Academics', card: 'Academic Details', meta: `${seasons.length} Academic Phases • B.Tech CSE & Foundations`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals • Full-Stack & Systems`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: `Top ${topPicks.length} highlights`, palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Moments', card: 'My Achievements', meta: `${achievements.length} Moments • ${certifications.length} Credentials`, palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & contact', palette: violet },
};
