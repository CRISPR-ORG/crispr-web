export interface ResearchArea {
  id: string
  path: string
  title: string
  description: string
  topics: string[]
  active: boolean
}

export interface AiraProject {
  name: string
  status: "Active" | "In Development" | "Research Phase"
  summary: string
  tech: string[]
  num: string
}

export const researchAreas: ResearchArea[] = [
  {
    id: "ml",
    path: "machine-learning",
    title: "Machine Learning",
    description:
      "Model architecture, training pipelines and the unglamorous work of making a result reproducible.",
    topics: [
      "Neural network optimization",
      "Transfer learning",
      "AutoML frameworks",
    ],
    active: true,
  },
  {
    id: "nlp",
    path: "nlp",
    title: "Natural Language Processing",
    description:
      "Systems that read and write — retrieval, summarization, and the evaluation problems underneath both.",
    topics: ["Sentiment analysis", "Retrieval & RAG", "Text summarization"],
    active: true,
  },
  {
    id: "cv",
    path: "computer-vision",
    title: "Computer Vision",
    description:
      "Detection, classification and tracking, applied to problems that actually exist on this campus.",
    topics: ["Image classification", "Object detection", "Face recognition"],
    active: false,
  },
  {
    id: "gen",
    path: "generative-ai",
    title: "Generative AI",
    description:
      "Experimental architectures, agentic tooling and an honest look at where the failure modes are.",
    topics: ["Generative models", "Reinforcement learning", "AI ethics"],
    active: true,
  },
]

export const airaProjects: AiraProject[] = [
  {
    name: "Campus AI Assistant",
    status: "Active",
    summary:
      "A retrieval-backed assistant that answers questions about campus systems, courses and paperwork.",
    tech: ["LLM", "LangChain", "Vector DB"],
    num: "01",
  },
  {
    name: "Smart Attendance System",
    status: "In Development",
    summary:
      "Vision-based attendance that works in a real lecture hall — bad lighting, moving people, partial faces.",
    tech: ["OpenCV", "TensorFlow", "Face Recognition"],
    num: "02",
  },
  {
    name: "Code Review AI",
    status: "Research Phase",
    summary:
      "Static analysis fused with learned models to leave review comments a human would actually agree with.",
    tech: ["CodeBERT", "AST Analysis", "Transformers"],
    num: "03",
  },
]

export const airaActivities = [
  {
    title: "Reading Group",
    detail: "Weekly paper discussions, one presenter, no slides required.",
  },
  {
    title: "Hackathons",
    detail: "Internal and inter-college competitions, run and entered.",
  },
  {
    title: "Publications",
    detail: "Write-ups and preprints from work that survives review.",
  },
  {
    title: "Collaborations",
    detail: "Joint work with labs, alumni and industry contacts.",
  },
]
