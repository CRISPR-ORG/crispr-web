export interface Product {
  id: string
  name: string
  category: string
  tag: "CAMPUS" | "KNOWLEDGE" | "AI" | "MEDIA" | "COMMUNITY" | "TOOLS"
  status: "Active" | "Development" | "Testing" | "Research"
  description: string
  tech: string[]
  featured: boolean
  num: string
  image: string
  year: string
}

export const products: Product[] = [
  {
    id: "pravesh",
    image: "/products/pravesh.jpg",
    year: "2025",
    name: "Pravesh",
    category: "Campus Management",
    tag: "CAMPUS",
    status: "Active",
    description:
      "A smart entry-exit application for IIIT Nagpur to streamline the process of signing offline registers and enhance convenience, safety, and efficiency for the entire campus community.",
    tech: ["React Native", "Node.js", "MongoDB"],
    featured: true,
    num: "01",
  },
  {
    id: "campus-pulse",
    image: "/products/campus-pulse.jpg",
    year: "2024",
    name: "Campus Pulse",
    category: "Newsletter",
    tag: "MEDIA",
    status: "Active",
    description:
      "The official newsletter of the CRISPR Club, designed to capture the spirit and energy of campus life — from workshops and tech deep-dives to cultural festivals and student achievements.",
    tech: ["Content Writing", "Design Tools", "Email Marketing"],
    featured: true,
    num: "02",
  },
  {
    id: "techpulse",
    image: "/products/techpulse.jpg",
    year: "2025",
    name: "Techpulse",
    category: "News Platform",
    tag: "MEDIA",
    status: "Active",
    description:
      "Your daily dose of tech news and campus pulse — curated stories on emerging technologies, industry trends, and what's happening across IIIT Nagpur, delivered in one feed.",
    tech: ["React", "News API", "Email Automation"],
    featured: true,
    num: "03",
  },
  {
    id: "campuskart",
    image: "/products/campuskart.jpg",
    year: "2025",
    name: "CampusKart",
    category: "E-commerce Platform",
    tag: "COMMUNITY",
    status: "Active",
    description:
      "A structured marketplace where students can buy and sell items within the college community.",
    tech: ["React", "Node.js", "MongoDB"],
    featured: false,
    num: "04",
  },
  {
    id: "badal",
    image: "/products/badal.jpg",
    year: "2024",
    name: "Badal",
    category: "Digital Solution Platform",
    tag: "TOOLS",
    status: "Active",
    description:
      "A one-stop digital solution bringing together academic resources and campus utilities.",
    tech: ["React", "Firebase"],
    featured: false,
    num: "05",
  },
  {
    id: "how-to-ace",
    image: "/products/how-to-ace.jpg",
    year: "2024",
    name: "How to Ace",
    category: "Podcast Series",
    tag: "MEDIA",
    status: "Active",
    description:
      "Helping students navigate academics and careers through conversations with seniors.",
    tech: ["Content", "Spotify", "YouTube"],
    featured: false,
    num: "06",
  },
  {
    id: "revamp",
    image: "/products/revamp.jpg",
    year: "2023",
    name: "Revamp",
    category: "Social Media Initiative",
    tag: "COMMUNITY",
    status: "Active",
    description:
      "An initiative aimed at increasing the social presence and outreach of IIIT Nagpur.",
    tech: ["Design", "Strategy", "Content"],
    featured: false,
    num: "07",
  },
  {
    id: "crispr-server",
    image: "/products/crispr-server.jpg",
    year: "2023",
    name: "CRISPR Server",
    category: "Resource Hub",
    tag: "TOOLS",
    status: "Active",
    description:
      "The central hub developed by CRISPR Club providing students with academic materials, courses and recreational content.",
    tech: ["Python", "FastAPI", "PostgreSQL"],
    featured: true,
    num: "08",
  },
  {
    id: "authbahn",
    image: "/products/authbahn.jpg",
    year: "2024",
    name: "AuthBahn",
    category: "Browser Extension",
    tag: "TOOLS",
    status: "Active",
    description:
      "A Chrome extension designed to simplify the login process for students by securely storing credentials locally.",
    tech: ["JavaScript", "Chrome API", "Crypto"],
    featured: false,
    num: "09",
  },
]
