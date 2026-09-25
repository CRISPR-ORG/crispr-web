export interface Alumni {
  id: string
  name: string
  role: string
  batch: string
  current: string
  quote: string
  achievements: string[]
  linkedin: string
  image: string
  initials: string
  num: string
}

export const alumni: Alumni[] = [
  {
    id: "krishna-chaudhari",
    name: "Krishna Chaudhari",
    role: "Founder of CRISPR",
    current: "MBA Student, IIM Calcutta",
    quote:
      "Founding CRISPR taught me to build and lead, turning ideas into solutions used by over 1800 students at IIITN.",
    achievements: [
      "Founded CRISPR, deploying 20+ projects for 2200+ users",
      "Served as Technical Secretary at IIIT Nagpur",
      "Secured admission to IIM Calcutta for MBA",
    ],
    linkedin: "https://www.linkedin.com/in/truekrishna/",
    image: "/alumni/KrishnaChaudhari.jpeg",
    initials: "KC",
    num: "001",
  },
  {
    id: "aayush-jain",
    name: "Aayush Jain",
    role: "Past Lead",
    current: "AI & CV Intern, BigVision LLC",
    quote:
      "CRISPR provided a foundation to explore diverse technical fields, from business analytics at Zepto to AI at BigVision.",
    achievements: [
      "Founded Commune for inter-IIIT collaboration",
      "Interned as Business Analyst at Zepto",
      "Head Convenor of TantraFiesta tech fest",
    ],
    linkedin: "https://www.linkedin.com/in/aayushjain9300/",
    image: "/alumni/AayushJain.jpeg",
    initials: "AJ",
    num: "002",
  },
  {
    id: "prakhar-shukla",
    name: "Prakhar Shukla",
    role: "Past Co-Lead & Mentor",
    current: "Final Year Student, IIIT Nagpur",
    quote:
      "At CRISPR, we aimed to revolutionize the college experience through technology, literally editing the technical and cultural DNA of our campus.",
    achievements: [
      "Managed network access for 1500+ students as Technical Secretary",
      "Served as Co-Lead at CRISPR",
      "Certified in CUDA C/C++ by NVIDIA",
    ],
    linkedin: "https://www.linkedin.com/in/prakhar-shukla07a/",
    image: "/alumni/PrakharShukla.png",
    initials: "PS",
    num: "003",
  },
  {
    id: "ayush-karapagale",
    name: "Ayush Karapagale",
    role: "Past Head of Product",
    current: "Physical Design Engineer Intern, Intel",
    quote:
      "The hands-on project experience, from robotics to RISC-V CPU design, is invaluable for tackling complex engineering challenges.",
    achievements: [
      "Summer Research Intern at e-Yantra, IIT Bombay",
      "Led the IOTICS Club",
      "Won 1st place in Micromouse '24 at BITS Pilani",
    ],
    linkedin: "https://www.linkedin.com/in/ayush-k-43906a126/",
    image: "/alumni/AyushKarapagale.jpeg",
    initials: "AK",
    num: "004",
  },
]
