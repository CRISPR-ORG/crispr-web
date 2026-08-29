export interface EventItem {
  id: string
  name: string
  type: "Hackathon" | "Competition" | "Workshop" | "Showcase" | "Symposium"
  date: string
  year: string
  location: string
  status: "Live" | "Upcoming" | "Registration Open" | "Archived"
  description: string
  highlights: string[]
  image: string
  num: string
}

export const events: EventItem[] = [
  {
    id: "server-marathon",
    name: "Server Marathon",
    type: "Competition",
    date: "Nov 2025",
    year: "2025",
    location: "CRISPR Server",
    status: "Live",
    description:
      "A high-intensity server management and moderation challenge run entirely inside the CRISPR Server — the fastest route to becoming a moderator.",
    highlights: ["Moderator selection", "Live leaderboard", "Running now"],
    image: "/events/servermarthon.jpeg",
    num: "01",
  },
  {
    id: "claude-solvathon",
    name: "Claude Solvathon",
    type: "Hackathon",
    date: "Dec 2025",
    year: "2025",
    location: "IIIT Nagpur",
    status: "Upcoming",
    description:
      "A two-stage AI challenge where teams ship real solutions on frontier models — from problem framing through to a working demo.",
    highlights: ["Two stages", "Frontier models", "Team event"],
    image: "/events/claudesolvathon.jpeg",
    num: "02",
  },
  {
    id: "analytica",
    name: "Analytica",
    type: "Competition",
    date: "Nov 2025",
    year: "2025",
    location: "IIIT Nagpur",
    status: "Registration Open",
    description:
      "A machine learning and data science hackathon built around real analytical problems, judged on both modelling rigour and communication.",
    highlights: ["ML & data science", "Real datasets", "Industry judging"],
    image: "/events/analytica.jpeg",
    num: "03",
  },
  {
    id: "demo-days",
    name: "Demo Days",
    type: "Showcase",
    date: "Ongoing",
    year: "2025",
    location: "IIIT Nagpur",
    status: "Registration Open",
    description:
      "A recurring series where members put unfinished work in front of the club — ship something, show it, take the feedback.",
    highlights: ["Monthly cadence", "Open to all members", "Live feedback"],
    image: "/events/demodays.jpg",
    num: "04",
  },
  {
    id: "market-wise",
    name: "Market Wise",
    type: "Competition",
    date: "Mar 2024",
    year: "2024",
    location: "IIIT Nagpur",
    status: "Archived",
    description:
      "A flagship financial-acumen event presented with Udyam E-Cell — three days of trading simulation, analysis and nerve.",
    highlights: ["₹53,000 in prizes", "200+ participants", "3-day event"],
    image: "/events/marketwise.jpeg",
    num: "05",
  },
  {
    id: "data-wizards",
    name: "Data Wizards",
    type: "Competition",
    date: "Feb 2024",
    year: "2024",
    location: "IIIT Nagpur",
    status: "Archived",
    description:
      "A data analysis contest rewarding the sharpest insight and the clearest visual argument, judged live on stage.",
    highlights: ["Visualization challenge", "Live judging", "Industry mentors"],
    image: "/events/datawizard.png",
    num: "06",
  },
  {
    id: "solve-a-thon",
    name: "3.5 Solve-A-Thon",
    type: "Hackathon",
    date: "Jan 2024",
    year: "2024",
    location: "IIIT Nagpur",
    status: "Archived",
    description:
      "Twenty-four hours, one model, and a room full of people finding out what large language models could actually do.",
    highlights: [
      "24-hour hackathon",
      "AI-powered builds",
      "First of its kind on campus",
    ],
    image: "/events/gptsolvathon.jpeg",
    num: "07",
  },
]

export const eventYears = [
  "All",
  ...Array.from(new Set(events.map((e) => e.year))),
]

/** Poster strip — pulled from the archive so it always has real artwork. */
export const gallery = events.map((e) => ({
  id: e.id,
  image: e.image,
  caption: `${e.name} · ${e.date}`,
}))
