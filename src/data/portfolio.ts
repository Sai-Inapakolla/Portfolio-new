const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
// Portfolio facts transcribed for Sai Inapakolla.

export type Palette = { from: string; via: string; to: string; accent: string };
export type Metric = { value: string; label: string };
export type Project = { id: string; title: string; year: string; genre: string; logline: string; stack: string[]; build: string[]; features: string[]; metrics: Metric[]; github?: string; appUrl?: string; website?: string; palette: Palette; motif: 'shield' | 'flow' | 'tenants' };
export type Achievement = { id: string; title: string; org: string; detail: string; laurel: string; link?: string };
export type Certification = { issuer: string; name: string; link?: string };
export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };
export type Episode = { code: string; title: string; description: string; tags: string[]; runtime: string; palette: Palette };
export type Season = { number: number; title: string; period: string; synopsis: string; episodes: Episode[] };
export type TopPick = { label: string; title: string; detail: string; palette: Palette };
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

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
    "Distributed Systems & Data Isolation",
    "Machine Learning Integration"
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
  productionAppCount: "5",
  languages: [
    "English — Professional",
    "Telugu — Native",
    "Hindi — Working"
  ],
  resumePdf: asset('Resume.pdf'),
  portrait: { src: asset('portrait-720.webp'), srcSet: `${asset('portrait-420.webp')} 420w, ${asset('portrait-720.webp')} 720w, ${asset('portrait-1100.webp')} 1100w`, alt: 'Sai Inapakolla' },
};

export const education = [
  {
    school: "Parul Institute of Engineering & Technology, Parul University",
    place: "Vadodara, Gujarat, India",
    degree: "Bachelor of Technology — Computer Science & Engineering",
    period: "2023 – 2027",
    score: "CGPA 7.71 / 10.0"
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
      "Developed TAI, an automated loan approval platform integrating Angular with Node.js and a dedicated Python machine learning scoring microservice.",
      "Built Aeros flight simulator backend exploring decoupled Spring Boot microservices and service-to-service communication.",
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
    motif: "flow"
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
    motif: "flow"
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
    motif: "shield"
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
    name: "Safe-Go (GitHub)",
    url: "https://github.com/Sai-Inapakolla/Safe-Go"
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
    subtitle: "ML fundamentals & model service integration",
    skills: [
      { name: "Python", mono: "Py" },
      { name: "Scikit-Learn", mono: "SL" },
      { name: "Pandas", mono: "Pd" },
      { name: "NumPy", mono: "NP" },
      { name: "ML API Integration", mono: "ML" }
    ]
  }
];

export const skillEvidence: Record<string, string[]> = {
  "Java": [
    "TeamX: Multi-tenant backend architecture & data isolation",
    "Aeros: Spring Boot flight simulator microservices",
    "600+ DSA algorithmic problems solved"
  ],
  "Spring Boot": [
    "TeamX: 15+ secure REST API endpoints with JPA & Hibernate",
    "Aeros: Microservice decomposition and domain architecture"
  ],
  "Spring Security": [
    "TeamX: JWT authentication & Role-Based Access Control (Admin, Manager, User)"
  ],
  "React.js": [
    "TeamX: Collaborative SaaS project management UI",
    "SafeGo: Passenger, Driver & Admin portals with Tailwind CSS"
  ],
  "TypeScript": [
    "SafeGo: Type-safe frontend client architecture and state management"
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
    "TAI: Loan application workflow datastore"
  ],
  "Python": [
    "SafeGo: Machine learning features & AI voice assistant",
    "TAI: Dedicated loan approval scoring microservice",
    "Foodie Genie: Flask recommendation engine"
  ],
  "Vitest": [
    "TeamX: Automated testing suite verifying 102,982 assertions"
  ]
};

export const seasons: Season[] = [
  {
    number: 1,
    title: "Academic Core & Algorithmic Depth",
    period: "2023 – Present",
    synopsis: "B.Tech in Computer Science & Engineering · Parul University",
    episodes: [
      {
        code: "S01 E01",
        title: "The Algorithmic Ladder",
        description: "Solved 600+ Data Structures & Algorithms problems across LeetCode and GeeksforGeeks, securing Rank #2 on the university college leaderboard.",
        tags: [
          "DSA",
          "Java",
          "Rank #2 GfG",
          "LeetCode"
        ],
        runtime: "2023 – Present",
        palette: {
          from: "#2a0610",
          via: "#7a0f24",
          to: "#0b0710",
          accent: "#ff3d5a"
        }
      },
      {
        code: "S01 E02",
        title: "Computer Science Foundations",
        description: "Building strong fundamentals in Object-Oriented Programming, Database Management Systems, Operating Systems, and System Design with a 7.71 CGPA.",
        tags: [
          "B.Tech CSE",
          "DBMS",
          "OOP",
          "Parul University"
        ],
        runtime: "2023 – 2027",
        palette: {
          from: "#1a0d02",
          via: "#8a4a07",
          to: "#0a0806",
          accent: "#ffb547"
        }
      }
    ]
  },
  {
    number: 2,
    title: "Backend Architecture & Multi-Tenancy",
    period: "2024 – 2025",
    synopsis: "Java Spring Boot, Enterprise Security & Microservice Design",
    episodes: [
      {
        code: "S02 E01",
        title: "TeamX: Zero-Leak Multi-Tenancy",
        description: "Architected a multi-tenant SaaS management platform with tenant-aware shared schema, JWT authentication, role-based access control, and 102,982 verified assertions.",
        tags: [
          "Spring Boot",
          "Multi-Tenancy",
          "Spring Security",
          "MySQL"
        ],
        runtime: "2025",
        palette: {
          from: "#04121f",
          via: "#0f4c6e",
          to: "#05080d",
          accent: "#4cc9ff"
        }
      },
      {
        code: "S02 E02",
        title: "Aeros: Service Orchestration",
        description: "Explored distributed microservices and service-to-service communication with Spring Boot for a real-time flight simulation backend.",
        tags: [
          "Microservices",
          "Spring Boot",
          "Distributed Architecture"
        ],
        runtime: "2024",
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
    number: 3,
    title: "Real-Time Systems & AI Integration",
    period: "2025 – Present",
    synopsis: "High-Throughput Mobility & Machine Learning Workflows",
    episodes: [
      {
        code: "S03 E01",
        title: "SafeGo: Real-Time Mobility",
        description: "Engineered an intelligent ride-hailing platform with WebSocket live tracking, emergency SOS, Twilio integration, AI voice assist, and load-tested up to 8,650 req/sec.",
        tags: [
          "FastAPI",
          "WebSockets",
          "Twilio",
          "Python ML"
        ],
        runtime: "2025",
        palette: {
          from: "#2a0610",
          via: "#7a0f24",
          to: "#0b0710",
          accent: "#ff3d5a"
        }
      },
      {
        code: "S03 E02",
        title: "TAI: Approval Intelligence",
        description: "Connected an Angular frontend with Node.js and a dedicated Python machine learning service for automated risk assessment in loan approval workflows.",
        tags: [
          "Machine Learning",
          "Angular",
          "Node.js",
          "Python"
        ],
        runtime: "2024",
        palette: {
          from: "#1a0d02",
          via: "#8a4a07",
          to: "#0a0806",
          accent: "#ffb547"
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
    label: "Primary Stack",
    title: "Java & Spring",
    detail: "Spring Boot, Security, Hibernate & REST APIs",
    palette: {
      from: "#1a0d02",
      via: "#8a4a07",
      to: "#0a0806",
      accent: "#ffb547"
    }
  },
  {
    label: "Frontend",
    title: "React & TS",
    detail: "Modern reactive interfaces with Tailwind CSS",
    palette: {
      from: "#04121f",
      via: "#0f4c6e",
      to: "#05080d",
      accent: "#4cc9ff"
    }
  },
  {
    label: "AI / ML Integration",
    title: "TAI Intelligence",
    detail: "Dedicated Python ML scoring microservice",
    palette: {
      from: "#2a0610",
      via: "#7a0f24",
      to: "#0b0710",
      accent: "#ff3d5a"
    }
  },
  {
    label: "Education",
    title: "B.Tech CSE",
    detail: "Parul University · 2023 – 2027 · CGPA 7.71",
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
      "LeetCode: Arrays, Dynamic Programming, Trees & Graphs"
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
    kicker: "Intelligent Workflows",
    title: "Machine learning integration.",
    lines: [
      "TAI: Automated loan approval intelligence microservice",
      "Foodie Genie: Smart preference-matching recommendation engine"
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
const amber = projects[2].palette;
const ocean = projects[0].palette;
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & engineering', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals • Full-Stack & Systems`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: `Top ${topPicks.length} highlights`, palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Moments', card: 'My Achievements', meta: `${achievements.length} Moments • ${certifications.length} Credentials`, palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & contact', palette: violet },
};
