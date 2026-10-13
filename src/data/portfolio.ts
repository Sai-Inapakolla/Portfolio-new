const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
// Portfolio facts transcribed from Amit Sah's Resume.pdf.


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
  "fullName": "Amit Sah",
  "displayName": "Amit Sah",
  "firstName": "AMIT",
  "seriesTag": "THE SERIES",
  "originalLabel": "AN AMIT SAH ORIGINAL",
  "role": "Senior iOS Developer & Backend Engineer",
  "tagline": [
    "iOS Development",
    "Backend Engineering",
    "Swift & SwiftUI"
  ],
  "intro": "Senior iOS Developer and Backend Engineer with 5+ years of experience building scalable, AI-driven, real-time mobile applications. Delivered 30+ production apps across SaaS, fintech, and social platforms, with expertise in Swift, SwiftUI, modular architecture, performance optimization, and CI/CD automation.",
  "location": "New Delhi, India",
  "email": "aksamitsah@gmail.com",
  "phone": "+91 9313079350",
  "links": {
    "linkedin": "https://linkedin.com/in/aksamitsah",
    "github": "https://github.com/aksamitsah",
    "behance": "https://behance.net/aksamitsah",
    "website": "https://amit-sah.com.np"
  },
  "interests": [
    "Scalable iOS Architecture",
    "System Design & Scalability",
    "Backend Integration",
    "DevOps & Automation"
  ],
  "primaryLanguage": "Swift",
  "supportingLanguages": [
    "Objective-C",
    "C",
    "C++",
    "Java",
    "JavaScript",
    "Kotlin"
  ],
  "primaryStack": [
    "Swift",
    "SwiftUI",
    "Node.js"
  ],
  "yearsExperience": "5+",
  "productionAppCount": "30+",
  "languages": [
    "English — Professional",
    "French — A1"
  ],
  resumePdf: asset('Resume.pdf'),
  portrait: { src: asset('portrait-720.webp'), srcSet: `${asset('portrait-420.webp')} 420w, ${asset('portrait-720.webp')} 720w, ${asset('portrait-1100.webp')} 1100w`, alt: 'Amit Sah monogram' },
};

export const education = [
  {
    "school": "Chitkara University",
    "place": "India",
    "degree": "Bachelor of Technology — Computer Science",
    "period": "2017 – 2021",
    "score": "CGPA 8.6"
  }
];

export const experience = [
  {
    "company": "Zaytun AI LLC",
    "role": "Senior iOS Developer",
    "place": "Remote (California, US)",
    "period": "January 2025 – Present",
    "points": [
      "Led end-to-end iOS development for an AI-powered Muslim social and community platform using modular MVVM architecture and reusable components.",
      "Built live streaming and social features including feeds, sharing, explore, profiles, messaging, feed ranking, and engagement analytics.",
      "Implemented AI-driven cultural moderation and a contextual assistant for Islamic lifestyle guidance.",
      "Optimized lazy loading, pagination, caching, and state management; added multi-language support and centralized Dark/Light themes.",
      "Automated CI/CD with GitHub Actions, including AI PR review and auto-release."
    ]
  },
  {
    "company": "Goodspace.ai",
    "role": "Senior iOS Developer",
    "place": "Saket, Delhi, India",
    "period": "December 2023 – November 2024",
    "points": [
      "Led iOS development for an AI recruitment platform serving 1M+ users.",
      "Architected reactive UI with RxSwift and reduced load times by 35% through local and server-side caching.",
      "Built AI-driven video interviews with real-time capture and automated transcript processing.",
      "Developed a career-assistant chatbot and automated CI/CD to accelerate release cycles."
    ]
  },
  {
    "company": "Zoconut Pvt. LTD",
    "role": "iOS Developer",
    "place": "New Delhi, India",
    "period": "August 2022 – October 2023",
    "points": [
      "Led development and deployment of 25+ white-label iOS applications in nutrition and wellness.",
      "Developed the core Zoconut nutrition business management app using Swift and third-party APIs.",
      "Automated build and release pipelines with Fastlane and managed architecture, implementation, customization, and App Store deployment.",
      "Collaborated with backend, product, and design teams to improve performance, stability, and user experience."
    ]
  },
  {
    "company": "Bhanguz Software",
    "role": "Mobile Application Developer",
    "place": "Mohali, India",
    "period": "May 2021 – July 2022",
    "points": [
      "Developed scalable iOS applications and expanded expertise in Node.js, cloud services, and project coordination.",
      "Built University Intoto for campus communication, student travel tracking, and international-office community engagement.",
      "Developed LolliCash for cross-border payments with secure gateways, authentication, and performance optimization."
    ]
  },
  {
    "company": "ThinkNEXT Technologies",
    "role": "Mobile Developer Intern",
    "place": "India",
    "period": "December 2020 – April 2021",
    "points": [
      "Developed native Swift applications integrating Location Services, authentication, Maps, and third-party APIs.",
      "Optimized network calls and custom components, translated requirements into functional designs, and gained hands-on debugging and testing experience."
    ]
  }
];

export const projects: Project[] = [
  {
    "id": "zaytun-ai",
    "title": "Zaytun AI",
    "year": "2025 – Present",
    "genre": "iOS • AI • Social",
    "logline": "An AI-powered social and community platform for the Muslim community.",
    "stack": [
      "Swift",
      "MVVM",
      "GitHub Actions",
      "AI Moderation"
    ],
    "build": [
      "Led end-to-end iOS development for an AI-powered Muslim social and community platform using modular MVVM architecture and reusable components.",
      "Built live streaming and social features including feeds, sharing, explore, profiles, messaging, feed ranking, and engagement analytics.",
      "Implemented AI-driven cultural moderation and a contextual assistant for Islamic lifestyle guidance.",
      "Optimized lazy loading, pagination, caching, and state management; added multi-language support and centralized Dark/Light themes.",
      "Automated CI/CD with GitHub Actions, including AI PR review and auto-release."
    ],
    "features": [
      "Live streaming",
      "Social feeds & messaging",
      "AI cultural moderation",
      "Contextual AI assistant",
      "Multi-language support",
      "Dark/Light themes"
    ],
    "metrics": [],
    "palette": {
      "from": "#2a0610",
      "via": "#7a0f24",
      "to": "#0b0710",
      "accent": "#ff3d5a"
    },
    "motif": "shield",
    "appUrl": "https://apps.apple.com/in/app/zaytun-ai/id6642714586",
    "website": "https://zaytun.ai/"
  },
  {
    "id": "goodspace",
    "title": "Goodspace",
    "year": "2023 – 2024",
    "genre": "iOS • AI • Recruitment",
    "logline": "AI recruitment with video interviews, transcript processing, and a career-assistant chatbot.",
    "stack": [
      "Swift",
      "RxSwift",
      "CI/CD"
    ],
    "build": [
      "Led iOS development for an AI recruitment platform serving 1M+ users.",
      "Architected reactive UI with RxSwift and reduced load times by 35% through local and server-side caching.",
      "Built AI-driven video interviews with real-time capture and automated transcript processing.",
      "Developed a career-assistant chatbot and automated CI/CD to accelerate release cycles."
    ],
    "features": [
      "Reactive UI",
      "AI video interviews",
      "Automated transcripts",
      "Career-assistant chatbot",
      "Local & server-side caching"
    ],
    "metrics": [
      {
        "value": "1M+",
        "label": "platform users"
      },
      {
        "value": "35%",
        "label": "reduction in load times"
      }
    ],
    "palette": {
      "from": "#1a0d02",
      "via": "#8a4a07",
      "to": "#0a0806",
      "accent": "#ffb547"
    },
    "motif": "flow",
    "appUrl": "https://apps.apple.com/in/app/goodspace-job-search-and-hire/id1495314369",
    "website": "https://goodspace.ai"
  },
  {
    "id": "zoconut",
    "title": "Zoconut & White-Label Apps",
    "year": "2022 – 2023",
    "genre": "iOS • SaaS • Wellness",
    "logline": "A nutrition business management platform and 25+ customized white-label iOS apps.",
    "stack": [
      "Swift",
      "Fastlane",
      "Third-party APIs"
    ],
    "build": [
      "Led development and deployment of 25+ white-label iOS applications in nutrition and wellness.",
      "Developed the core Zoconut nutrition business management app using Swift and third-party APIs.",
      "Automated build and release pipelines with Fastlane and managed architecture, implementation, customization, and App Store deployment.",
      "Collaborated with backend, product, and design teams to improve performance, stability, and user experience."
    ],
    "features": [
      "Client-branded applications",
      "Nutrition business management",
      "Automated build & release",
      "App Store deployment"
    ],
    "metrics": [
      {
        "value": "25+",
        "label": "white-label iOS applications"
      }
    ],
    "palette": {
      "from": "#04121f",
      "via": "#0f4c6e",
      "to": "#05080d",
      "accent": "#4cc9ff"
    },
    "motif": "tenants",
    "appUrl": "https://apps.apple.com/in/app/zoconut/id1474358548",
    "website": "https://zoconut.com"
  },
  {
    "id": "lollicash",
    "title": "LolliCash",
    "year": "2021 – 2022",
    "genre": "iOS • Fintech • Payments",
    "logline": "A cross-border payments app with secure payment gateways and authentication.",
    "stack": [
      "iOS",
      "Payment APIs"
    ],
    "build": [
      "Developed LolliCash at Bhanguz Software, integrating secure payment gateways for reliable global transactions.",
      "Implemented authentication and optimized app performance for a secure user experience."
    ],
    "features": [
      "Cross-border payments",
      "Secure authentication",
      "Payment gateway integration"
    ],
    "metrics": [],
    "palette": {
      "from": "#2a0610",
      "via": "#7a0f24",
      "to": "#0b0710",
      "accent": "#ff3d5a"
    },
    "motif": "shield",
    "appUrl": "https://apps.apple.com/in/app/lollicash/id6444011906",
    "website": "https://lollicash.com"
  },
  {
    "id": "university-intoto",
    "title": "University Intoto",
    "year": "2021 – 2022",
    "genre": "iOS • Education • Community",
    "logline": "Campus management for international-office communication, travel tracking, and engagement.",
    "stack": [
      "iOS"
    ],
    "build": [
      "Built University Intoto while working at Bhanguz Software."
    ],
    "features": [
      "Campus communication",
      "Student travel tracking",
      "Community engagement"
    ],
    "metrics": [],
    "palette": {
      "from": "#1a0d02",
      "via": "#8a4a07",
      "to": "#0a0806",
      "accent": "#ffb547"
    },
    "motif": "flow",
    "website": "https://intoto.ca"
  },
  {
    "id": "dream-home",
    "title": "Dream Home Automation",
    "year": "Additional project",
    "genre": "Smart Home • Security",
    "logline": "Control existing devices with enhanced security, data privacy, and secure access.",
    "stack": [
      "Smart-device integration"
    ],
    "build": [
      "Developed a home automation system integrating smart devices for convenient, secure control."
    ],
    "features": [
      "Device control",
      "Data privacy",
      "Secure access"
    ],
    "metrics": [],
    "palette": {
      "from": "#04121f",
      "via": "#0f4c6e",
      "to": "#05080d",
      "accent": "#4cc9ff"
    },
    "motif": "tenants",
    "website": "https://dreamcoder.tech"
  },
  {
    "id": "gurudai",
    "title": "Gurudai User & Rider App",
    "year": "Additional project",
    "genre": "Mobile • Transport • Payments",
    "logline": "Affordable cab booking for short and long distances, for riders and drivers.",
    "stack": [
      "Location services",
      "Payment integration"
    ],
    "build": [
      "Developed a cab-booking app with real-time location tracking, fare estimation, and secure payments."
    ],
    "features": [
      "Real-time tracking",
      "Fare estimation",
      "Secure payments"
    ],
    "metrics": [],
    "palette": {
      "from": "#2a0610",
      "via": "#7a0f24",
      "to": "#0b0710",
      "accent": "#ff3d5a"
    },
    "motif": "shield"
  },
  {
    "id": "countrypickeraks",
    "title": "CountryPickerAKS",
    "year": "Framework",
    "genre": "iOS • Framework • Open Source",
    "logline": "Customizable country selection with themes, country lists, CocoaPods, and Swift Package Manager.",
    "stack": [
      "iOS",
      "CocoaPods",
      "Swift Package Manager"
    ],
    "build": [
      "Created a country-selection framework with customizable themes and country lists, available through CocoaPods and SPM."
    ],
    "features": [
      "Custom themes",
      "Configurable country lists",
      "CocoaPods & SPM distribution"
    ],
    "metrics": [],
    "palette": {
      "from": "#1a0d02",
      "via": "#8a4a07",
      "to": "#0a0806",
      "accent": "#ffb547"
    },
    "motif": "flow",
    "github": "https://github.com/aksamitsah/CountryPickerAKS"
  }
];

export const productionApps = [
  {
    "name": "Zaytun AI -Social",
    "url": "https://apps.apple.com/in/app/zaytun-ai/id6642714586"
  },
  {
    "name": "Goodspace",
    "url": "https://apps.apple.com/in/app/goodspace-job-search-and-hire/id1495314369"
  },
  {
    "name": "Parafit",
    "url": "https://apps.apple.com/in/app/parafit/id1663480280"
  },
  {
    "name": "OJOLIFE",
    "url": "https://apps.apple.com/in/app/ojolife/id6444918835"
  },
  {
    "name": "Lollicash",
    "url": "https://apps.apple.com/in/app/lollicash/id6444011906"
  },
  {
    "name": "Zoconut",
    "url": "https://apps.apple.com/in/app/zoconut/id1474358548"
  },
  {
    "name": "Ediet",
    "url": "https://apps.apple.com/in/app/ediet-your-diet-companion/id1465083090"
  },
  {
    "name": "24 Holistic Health",
    "url": "https://apps.apple.com/in/app/24-holistic-health/id1660462491"
  },
  {
    "name": "Nutrition Defined",
    "url": "https://apps.apple.com/in/app/nutrition-defined/id1613876514"
  },
  {
    "name": "Warriors of Wellness",
    "url": "https://apps.apple.com/in/app/warriors-of-wellness/id1660452120"
  },
  {
    "name": "Balcal Nutrefy",
    "url": "https://apps.apple.com/in/app/balcal-nutrefy/id1626440771"
  },
  {
    "name": "Diet Enrich",
    "url": "https://apps.apple.com/in/app/diet-enrich/id1585622507"
  },
  {
    "name": "The Balanced Plate",
    "url": "https://apps.apple.com/in/app/the-balanced-plate/id1592255718"
  },
  {
    "name": "NutrifyMe",
    "url": "https://apps.apple.com/in/app/nutrifyme-by-dt-prachi/id1548921094"
  },
  {
    "name": "Sarvodaya Wellness",
    "url": "https://apps.apple.com/in/app/sarvodaya-wellness/id1550248364"
  },
  {
    "name": "Limestag Fitness",
    "url": "https://apps.apple.com/in/app/limestag-fitness/id1621231562"
  },
  {
    "name": "Nutri4Verve",
    "url": "https://apps.apple.com/in/app/nutri4verve/id1508299836"
  },
  {
    "name": "Arogyam Nutrition",
    "url": "https://apps.apple.com/in/app/arogyam-nutrition/id1618422507"
  },
  {
    "name": "Prana Nutrition",
    "url": "https://apps.apple.com/in/app/prana-nutrition/id1618412356"
  },
  {
    "name": "Fit Mantra",
    "url": "https://apps.apple.com/in/app/fit-mantra/id1537059850"
  },
  {
    "name": "NP Fitness",
    "url": "https://apps.apple.com/in/app/np-fitness-by-nupuur-patil/id1612790844"
  }
];

export const achievements: Achievement[] = [
  {
    "id": "production-apps",
    "title": "30+ Production Apps",
    "org": "SaaS • Fintech • Social",
    "detail": "Delivered production applications spanning social platforms, financial services, and SaaS.",
    "laurel": "Production Delivery"
  },
  {
    "id": "white-label",
    "title": "25+ White-Label Apps",
    "org": "Zoconut",
    "detail": "Led development and deployment of customized nutrition and wellness applications.",
    "laurel": "Client Delivery"
  },
  {
    "id": "performance",
    "title": "35% Faster Loading",
    "org": "Goodspace.ai",
    "detail": "Reduced load times through local and server-side caching.",
    "laurel": "Performance"
  },
  {
    "id": "scale",
    "title": "1M+ User Platform",
    "org": "Goodspace.ai",
    "detail": "Led iOS development for an AI recruitment platform serving over one million users.",
    "laurel": "Platform Scale"
  },
  {
    "id": "automation",
    "title": "Automated Releases",
    "org": "Zaytun AI • Zoconut",
    "detail": "GitHub Actions with AI PR review and auto-release; Fastlane build and release pipelines.",
    "laurel": "CI/CD"
  }
];

export const certifications: Certification[] = [
  {
    "issuer": "ImaginXP",
    "name": "UX Designer"
  },
  {
    "issuer": "Google",
    "name": "Android Nanodegree"
  },
  {
    "issuer": "Udemy",
    "name": "iOS Development"
  },
  {
    "issuer": "Udemy",
    "name": "SwiftUI Advanced"
  },
  {
    "issuer": "Coursera",
    "name": "Product Design"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    "id": "languages",
    "title": "Languages",
    "subtitle": "Swift and Objective-C, with cross-platform experience",
    "skills": [
      {
        "name": "Swift",
        "mono": "Sw",
        "note": "Primary"
      },
      {
        "name": "Objective-C",
        "mono": "Ob"
      },
      {
        "name": "C",
        "mono": "C"
      },
      {
        "name": "C++",
        "mono": "C+"
      },
      {
        "name": "Java",
        "mono": "Ja"
      },
      {
        "name": "JavaScript",
        "mono": "Ja"
      },
      {
        "name": "Kotlin",
        "mono": "Ko"
      }
    ]
  },
  {
    "id": "ios",
    "title": "iOS Development",
    "subtitle": "Native interfaces, data, and distribution",
    "skills": [
      {
        "name": "UIKit",
        "mono": "UI"
      },
      {
        "name": "SwiftUI",
        "mono": "Sw"
      },
      {
        "name": "Auto Layout",
        "mono": "Au"
      },
      {
        "name": "Core Data",
        "mono": "Co"
      },
      {
        "name": "Animation & Graphics",
        "mono": "An"
      },
      {
        "name": "App Store Deployment",
        "mono": "Ap"
      },
      {
        "name": "Memory Management",
        "mono": "Me"
      }
    ]
  },
  {
    "id": "architecture",
    "title": "Architecture & Concurrency",
    "subtitle": "Scalable, reactive application design",
    "skills": [
      {
        "name": "MVC",
        "mono": "MV"
      },
      {
        "name": "MVVM",
        "mono": "MV"
      },
      {
        "name": "VIPER",
        "mono": "VI"
      },
      {
        "name": "RxSwift",
        "mono": "Rx"
      },
      {
        "name": "Combine",
        "mono": "Co"
      },
      {
        "name": "Multithreading & Concurrency",
        "mono": "Mu"
      },
      {
        "name": "System Design",
        "mono": "Sy"
      }
    ]
  },
  {
    "id": "backend",
    "title": "Backend & Integration",
    "subtitle": "Services and connected applications",
    "skills": [
      {
        "name": "Node.js",
        "mono": "No"
      },
      {
        "name": "Express",
        "mono": "Ex"
      },
      {
        "name": "React",
        "mono": "Re"
      },
      {
        "name": "Third-party APIs",
        "mono": "Th"
      },
      {
        "name": "SDK Development",
        "mono": "SD"
      },
      {
        "name": "Kafka",
        "mono": "Ka"
      }
    ]
  },
  {
    "id": "delivery",
    "title": "Delivery & Quality",
    "subtitle": "Reliable releases and maintainable software",
    "skills": [
      {
        "name": "Git",
        "mono": "Gi"
      },
      {
        "name": "GitHub Actions",
        "mono": "Gi"
      },
      {
        "name": "YAML",
        "mono": "YA"
      },
      {
        "name": "Fastlane",
        "mono": "Fa"
      },
      {
        "name": "Cloud Infrastructure",
        "mono": "Cl"
      },
      {
        "name": "CI/CD",
        "mono": "CI"
      },
      {
        "name": "XCTest",
        "mono": "XC"
      },
      {
        "name": "UI Testing",
        "mono": "UI"
      },
      {
        "name": "Debugging",
        "mono": "De"
      },
      {
        "name": "Performance Optimization",
        "mono": "Pe"
      },
      {
        "name": "Agile",
        "mono": "Ag"
      }
    ]
  },
  {
    "id": "tools",
    "title": "Tools & Design",
    "subtitle": "Development, product, and collaboration",
    "skills": [
      {
        "name": "Xcode",
        "mono": "Xc"
      },
      {
        "name": "Android Studio",
        "mono": "An"
      },
      {
        "name": "VS Code",
        "mono": "VS"
      },
      {
        "name": "IntelliJ IDEA",
        "mono": "In"
      },
      {
        "name": "Figma",
        "mono": "Fi"
      },
      {
        "name": "Sketch",
        "mono": "Sk"
      },
      {
        "name": "Adobe",
        "mono": "Ad"
      },
      {
        "name": "Microsoft Office",
        "mono": "Mi"
      }
    ]
  }
];

export const skillEvidence: Record<string, string[]> = {
  "Swift": [
    "Zoconut",
    "ThinkNEXT native iOS applications"
  ],
  "SwiftUI": [
    "Advanced SwiftUI certification",
    "Native iOS interfaces"
  ],
  "MVVM": [
    "Zaytun AI modular architecture"
  ],
  "RxSwift": [
    "Goodspace reactive UI"
  ],
  "GitHub Actions": [
    "Zaytun AI: AI PR review and auto-release"
  ],
  "Fastlane": [
    "Zoconut automated releases"
  ],
  "Performance Optimization": [
    "Goodspace: 35% lower load times",
    "Zaytun: caching and pagination"
  ],
  "Node.js": [
    "Bhanguz Software backend experience"
  ],
  "Third-party APIs": [
    "Zoconut",
    "ThinkNEXT"
  ],
  "App Store Deployment": [
    "25+ white-label iOS applications"
  ],
  "XCTest": [
    "Unit testing skill listed in the résumé"
  ],
  "Figma": [
    "Design tools listed in the résumé"
  ]
};

export const seasons: Season[] = [
  {
    "number": 1,
    "title": "The Foundation",
    "period": "2017 – 2021",
    "synopsis": "Computer Science studies and a first native iOS internship.",
    "episodes": [
      {
        "code": "S01 E01",
        "title": "The Computer Scientist",
        "description": "B.Tech in Computer Science at Chitkara University, graduating with CGPA 8.6.",
        "tags": [
          "Computer Science",
          "CGPA 8.6"
        ],
        "runtime": "2017 – 2021",
        "palette": {
          "from": "#2a0610",
          "via": "#7a0f24",
          "to": "#0b0710",
          "accent": "#ff3d5a"
        }
      },
      {
        "code": "S01 E02",
        "title": "The Native Developer",
        "description": "Developed native Swift applications integrating Location Services, authentication, Maps, and third-party APIs.",
        "tags": [
          "Swift",
          "Maps",
          "APIs"
        ],
        "runtime": "December 2020 – April 2021",
        "palette": {
          "from": "#1a0d02",
          "via": "#8a4a07",
          "to": "#0a0806",
          "accent": "#ffb547"
        }
      }
    ]
  },
  {
    "number": 2,
    "title": "Bhanguz Software",
    "period": "May 2021 – July 2022",
    "synopsis": "Mobile Application Developer · Mohali, India",
    "episodes": [
      {
        "code": "S02 E01",
        "title": "Mobile Application Developer",
        "description": "Developed scalable iOS applications and expanded expertise in Node.js, cloud services, and project coordination. Built University Intoto for campus communication, student travel tracking, and international-office community engagement. Developed LolliCash for cross-border payments with secure gateways, authentication, and performance optimization.",
        "tags": [
          "iOS",
          "Backend Integration"
        ],
        "runtime": "May 2021 – July 2022",
        "palette": {
          "from": "#2a0610",
          "via": "#7a0f24",
          "to": "#0b0710",
          "accent": "#ff3d5a"
        }
      }
    ]
  },
  {
    "number": 3,
    "title": "Zoconut Pvt. LTD",
    "period": "August 2022 – October 2023",
    "synopsis": "iOS Developer · New Delhi, India",
    "episodes": [
      {
        "code": "S03 E01",
        "title": "iOS Developer",
        "description": "Led development and deployment of 25+ white-label iOS applications in nutrition and wellness. Developed the core Zoconut nutrition business management app using Swift and third-party APIs. Automated build and release pipelines with Fastlane and managed architecture, implementation, customization, and App Store deployment. Collaborated with backend, product, and design teams to improve performance, stability, and user experience.",
        "tags": [
          "iOS",
          "Architecture",
          "CI/CD"
        ],
        "runtime": "August 2022 – October 2023",
        "palette": {
          "from": "#2a0610",
          "via": "#7a0f24",
          "to": "#0b0710",
          "accent": "#ff3d5a"
        }
      }
    ]
  },
  {
    "number": 4,
    "title": "Goodspace.ai",
    "period": "December 2023 – November 2024",
    "synopsis": "Senior iOS Developer · Saket, Delhi, India",
    "episodes": [
      {
        "code": "S04 E01",
        "title": "Senior iOS Developer",
        "description": "Led iOS development for an AI recruitment platform serving 1M+ users. Architected reactive UI with RxSwift and reduced load times by 35% through local and server-side caching. Built AI-driven video interviews with real-time capture and automated transcript processing. Developed a career-assistant chatbot and automated CI/CD to accelerate release cycles.",
        "tags": [
          "iOS",
          "Architecture",
          "CI/CD"
        ],
        "runtime": "December 2023 – November 2024",
        "palette": {
          "from": "#2a0610",
          "via": "#7a0f24",
          "to": "#0b0710",
          "accent": "#ff3d5a"
        }
      }
    ]
  },
  {
    "number": 5,
    "title": "Zaytun AI LLC",
    "period": "January 2025 – Present",
    "synopsis": "Senior iOS Developer · Remote (California, US)",
    "episodes": [
      {
        "code": "S05 E01",
        "title": "Senior iOS Developer",
        "description": "Led end-to-end iOS development for an AI-powered Muslim social and community platform using modular MVVM architecture and reusable components. Built live streaming and social features including feeds, sharing, explore, profiles, messaging, feed ranking, and engagement analytics. Implemented AI-driven cultural moderation and a contextual assistant for Islamic lifestyle guidance. Optimized lazy loading, pagination, caching, and state management; added multi-language support and centralized Dark/Light themes. Automated CI/CD with GitHub Actions, including AI PR review and auto-release.",
        "tags": [
          "iOS",
          "Architecture",
          "CI/CD"
        ],
        "runtime": "January 2025 – Present",
        "palette": {
          "from": "#2a0610",
          "via": "#7a0f24",
          "to": "#0b0710",
          "accent": "#ff3d5a"
        }
      }
    ]
  }
];

export const topPicks: TopPick[] = [
  {
    "label": "Experience",
    "title": "5+ Years",
    "detail": "Senior iOS development & backend engineering",
    "palette": {
      "from": "#2a0610",
      "via": "#7a0f24",
      "to": "#0b0710",
      "accent": "#ff3d5a"
    }
  },
  {
    "label": "Production delivery",
    "title": "30+ Apps",
    "detail": "SaaS, fintech, and social platforms",
    "palette": {
      "from": "#1a0d02",
      "via": "#8a4a07",
      "to": "#0a0806",
      "accent": "#ffb547"
    }
  },
  {
    "label": "Current chapter",
    "title": "Zaytun AI",
    "detail": "Senior iOS Developer · January 2025 – Present",
    "palette": {
      "from": "#04121f",
      "via": "#0f4c6e",
      "to": "#05080d",
      "accent": "#4cc9ff"
    }
  },
  {
    "label": "Platform scale",
    "title": "Goodspace",
    "detail": "AI recruitment platform · 1M+ users",
    "palette": {
      "from": "#2a0610",
      "via": "#7a0f24",
      "to": "#0b0710",
      "accent": "#ff3d5a"
    }
  },
  {
    "label": "Performance",
    "title": "35% Faster",
    "detail": "Reduced Goodspace load times",
    "palette": {
      "from": "#1a0d02",
      "via": "#8a4a07",
      "to": "#0a0806",
      "accent": "#ffb547"
    }
  },
  {
    "label": "White-label delivery",
    "title": "25+ Apps",
    "detail": "Nutrition & wellness at Zoconut",
    "palette": {
      "from": "#04121f",
      "via": "#0f4c6e",
      "to": "#05080d",
      "accent": "#4cc9ff"
    }
  },
  {
    "label": "Open source",
    "title": "CountryPickerAKS",
    "detail": "Country selection · CocoaPods & SPM",
    "palette": {
      "from": "#2a0610",
      "via": "#7a0f24",
      "to": "#0b0710",
      "accent": "#ff3d5a"
    }
  },
  {
    "label": "Primary stack",
    "title": "Swift & SwiftUI",
    "detail": "Native mobile interfaces & modular architecture",
    "palette": {
      "from": "#1a0d02",
      "via": "#8a4a07",
      "to": "#0a0806",
      "accent": "#ffb547"
    }
  },
  {
    "label": "Automation",
    "title": "CI/CD",
    "detail": "GitHub Actions & Fastlane",
    "palette": {
      "from": "#04121f",
      "via": "#0f4c6e",
      "to": "#05080d",
      "accent": "#4cc9ff"
    }
  },
  {
    "label": "Education",
    "title": "Computer Science",
    "detail": "Chitkara University · CGPA 8.6",
    "palette": {
      "from": "#2a0610",
      "via": "#7a0f24",
      "to": "#0b0710",
      "accent": "#ff3d5a"
    }
  }
];

export const introSlides: IntroSlide[] = [
  {
    "kicker": "Profile",
    "title": "iOS. Backend. Impact.",
    "lines": [
      "Amit Sah · Senior iOS Developer & Backend Engineer",
      "5+ years of experience · 30+ production apps"
    ],
    "chips": [
      "Swift",
      "SwiftUI",
      "MVVM"
    ]
  },
  {
    "kicker": "Skills",
    "title": "Swift first.",
    "lines": [
      "UIKit · SwiftUI · RxSwift · Combine",
      "Node.js · Express · React · GitHub Actions · Fastlane"
    ],
    "chips": [
      "Swift",
      "SwiftUI",
      "Node.js",
      "CI/CD"
    ]
  },
  {
    "kicker": "Current role",
    "title": "Zaytun AI",
    "lines": [
      "Senior iOS Developer · January 2025 – Present",
      "AI moderation · Live streaming · Social & community"
    ]
  },
  {
    "kicker": "Impact",
    "title": "Built for scale.",
    "lines": [
      "Goodspace: AI recruitment platform with 1M+ users",
      "35% lower load times through caching",
      "Zoconut: 25+ white-label iOS applications"
    ]
  },
  {
    "kicker": "Projects",
    "title": "Beyond the app.",
    "lines": [
      "CountryPickerAKS · CocoaPods & SPM",
      "Dream Home Automation · Gurudai User & Rider App"
    ]
  },
  {
    "kicker": "Education",
    "title": "Computer Science",
    "lines": [
      "Chitkara University · 2017 – 2021",
      "CGPA 8.6"
    ]
  },
  {
    "kicker": "Design & development",
    "title": "Always building.",
    "lines": [
      "UX design · Native iOS · SwiftUI · Product design",
      "Scalable architecture · Backend integration · DevOps"
    ]
  }
];

export type ProfileId = 'amit' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'amit',
    name: 'Amit',
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

const crimson = projects[0].palette;
const amber = projects[1].palette;
const ocean = projects[2].palette;
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & experience', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals • Production & projects`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: `Top ${topPicks.length} from the resume`, palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Moments', card: 'My Achievements', meta: `${achievements.length} Moments • ${certifications.length} Certifications`, palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: violet },
};
