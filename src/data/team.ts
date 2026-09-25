export interface TeamMember {
  name: string
  role: string
  image: string
  level: 1 | 2 | 3 | 4
  category: "leadership" | "development" | "departments" | "infrastructure"
  initials: string
  github?: string
  description?: string
  domain?: string
}

export const team: TeamMember[] = [
  {
    name: "Yash Khule",
    role: "Lead",
    image: "/photos/Yash KHule.jpeg",
    level: 1,
    category: "leadership",
    initials: "YK",
    domain: "Direction & Strategy",
    description:
      "Directs organizational vision, campus administrative partnerships, and cross-department engineering execution at IIIT Nagpur.",
  },
  {
    name: "Yash Gaikwad",
    role: "Co-Lead",
    image: "/photos/yash.jpeg",
    level: 1,
    category: "leadership",
    initials: "YG",
    domain: "Operations & Mentorship",
    description:
      "Manages sprint execution velocity, inter-team roadmaps, and cross-batch technical mentorship continuity.",
  },
  {
    name: "Lakshit Verma",
    role: "Head of Development",
    image: "/photos/lakshitVerma.jpeg",
    level: 2,
    category: "development",
    initials: "LV",
    github: "https://github.com/yummyPancake2607",
    domain: "Full-Stack Architecture",
    description:
      "Architects campus-scale distributed web and mobile platforms including Pravesh transit and core client utilities.",
  },
  {
    name: "Wrichik Paul",
    role: "Head of Product",
    image: "/photos/Wrichik Paul.jpg",
    level: 3,
    category: "departments",
    initials: "WP",
    domain: "Product Strategy & UX",
    description:
      "Shapes product roadmaps, user experience architecture, and technical requirement specifications for campus tools.",
  },
  {
    name: "Harshit",
    role: "Head of Innovation",
    image: "/photos/Harshit_Soni.jpg",
    level: 3,
    category: "departments",
    initials: "H",
    domain: "Emerging Tech & Hackathons",
    description:
      "Spearheads experimental prototyping arenas, rapid development challenges, and hackathon technical benchmarks.",
  },
  {
    name: "Shlok Khandelwal",
    role: "Head of Management",
    image: "/photos/Shlok.jpg",
    level: 3,
    category: "departments",
    initials: "SK",
    domain: "Logistics & Planning",
    description:
      "Coordinates institutional logistics, stakeholder operations, and end-to-end delivery of flagship club initiatives.",
  },
  {
    name: "Rakshit Jain",
    role: "Head of Execution & Outreach",
    image: "/photos/Rakshit.png",
    level: 3,
    category: "departments",
    initials: "RJ",
    domain: "Outreach & Public Relations",
    description:
      "Leads inter-institute public relations, developer outreach, and external relations across technology communities.",
  },
  {
    name: "Abdul Ahad",
    role: "Head of AIRA",
    image: "/photos/Abdul01.png",
    level: 3,
    category: "departments",
    initials: "AA",
    domain: "Applied AI Research",
    description:
      "Leads the AI Research at CRISPR division, directing localized model quantization, RAG evaluation, and paper reading groups.",
  },
  {
    name: "Tejas Chandane",
    role: "Head of Cybersecurity",
    image: "/photos/Tejas.jpg",
    level: 3,
    category: "departments",
    initials: "TC",
    domain: "Network Security & Crypto",
    description:
      "Focuses on security auditing, zero-knowledge cryptographic storage, and campus network protocol reverse engineering (AuthBahn).",
  },
  {
    name: "Ashmit Garg",
    role: "Server Moderator",
    image: "",
    level: 4,
    category: "infrastructure",
    initials: "AG",
    domain: "Intranet Infrastructure",
    description:
      "Maintains the campus LAN FTP server infrastructure, ZFS storage nodes, and gigabit internal mirrors with 99.2% uptime.",
  },
]
