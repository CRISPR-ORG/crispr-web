export interface TeamMember {
  name: string
  role: string
  image: string
  level: 1 | 2 | 3 | 4
  category: "leadership" | "development" | "departments" | "infrastructure"
  initials: string
  github?: string
}

export const team: TeamMember[] = [
  {
    name: "Yash Khule",
    role: "Lead",
    image: "/photos/Yash KHule.jpeg",
    level: 1,
    category: "leadership",
    initials: "YK",
  },
  {
    name: "Yash Gaikwad",
    role: "Co-Lead",
    image: "/photos/yash.jpeg",
    level: 1,
    category: "leadership",
    initials: "YG",
  },
  {
    name: "Lakshit Verma",
    role: "Head of Development",
    image: "/photos/lakshitVerma.jpeg",
    level: 2,
    category: "development",
    initials: "LV",
    github: "https://github.com/yummyPancake2607",
  },
  {
    name: "Wrichik Paul",
    role: "Head of Product",
    image: "/photos/Wrichik Paul.jpg",
    level: 3,
    category: "departments",
    initials: "WP",
  },
  {
    name: "Harshit",
    role: "Head of Innovation",
    image: "/photos/Harshit_Soni.jpg",
    level: 3,
    category: "departments",
    initials: "H",
  },
  {
    name: "Shlok Khandelwal",
    role: "Head of Management",
    image: "/photos/Shlok.jpg",
    level: 3,
    category: "departments",
    initials: "SK",
  },
  {
    name: "Rakshit Jain",
    role: "Head of Execution & Outreach",
    image: "/photos/Rakshit.png",
    level: 3,
    category: "departments",
    initials: "RJ",
  },
  {
    name: "Abdul Ahad",
    role: "Head of AIRA",
    image: "/photos/Abdul01.png",
    level: 3,
    category: "departments",
    initials: "AA",
  },
  {
    name: "Tejas Chandane",
    role: "Head of Cybersecurity",
    image: "/photos/Tejas.jpg",
    level: 3,
    category: "departments",
    initials: "TC",
  },
  {
    name: "Ashmit Garg",
    role: "Server Moderator",
    image: "",
    level: 4,
    category: "infrastructure",
    initials: "AG",
  },
]
