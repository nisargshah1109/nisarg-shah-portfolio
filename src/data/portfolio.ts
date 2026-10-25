// Portfolio content config — edit values here to update the site.
// Contact links: leave a value as "" to hide that link entirely.
export const contact = {
  email: "nisargshah1109@gmail.com",
  phone: "9904253656",
  github: "https://github.com/nisargshah1109",
  linkedin: "https://www.linkedin.com/in/nisarg-shah-545910354",
};

export const profile = {
  name: "Nisarg Pranitbhai Shah",
  shortName: "Nisarg Shah",
  location: "Vadodara, Gujarat, India",
  status: "B.Tech CSE • AI/ML & Generative AI",
};

export const skillGroups = [
  { title: "Programming", note: "Practical coursework & project experience; Python still developing", items: ["C", "C++", "Java", "Python"] },
  { title: "Web", note: "Building responsive interfaces", items: ["HTML", "CSS", "JavaScript", "React"] },
  { title: "Backend & Data", note: "Used in project work", items: ["Python", "FastAPI", "MySQL", "SQLite"] },
  { title: "AI & Retrieval", note: "Core interest area", items: ["ML fundamentals", "Generative AI", "RAG", "FAISS / vector search"] },
  { title: "Tools & Cloud", note: "Learning & applying", items: ["Git / GitHub", "AWS (basic)", "Cloud / DevOps fundamentals"] },
];

export type Project = {
  id: string;
  title: string;
  label: string;
  description: string;
  stack: string[];
  summary: string;
  problem: string;
  approach: string[];
  features?: string[];
  note: string;
  demoUrl: string;
  repoUrl: string;
  art: "pdf" | "rag";
};

export const projects: Project[] = [
  {
    id: "pdf-qa",
    title: "PDF-Based QA",
    label: "AI • Document Intelligence",
    description:
      "A question-answering project designed to help users retrieve answers from PDF documents, connecting document content with a focused question-answering workflow.",
    stack: ["Python", "Document Processing", "Question Answering"],
    summary:
      "A project exploring how document content can be turned into direct answers, so users don't have to scan long PDFs manually.",
    problem:
      "Finding a specific answer inside long PDF documents is slow, and keyword search often misses context.",
    approach: [
      "Extract and process text from PDF documents",
      "Organise content so relevant passages can be located",
      "Answer user questions using the retrieved document context",
    ],
    note: "Built as a learning/portfolio project — not a production service.",
    demoUrl: "",
    repoUrl: "https://github.com/nisargshah1109/pdf-question-answering-ai.git",
    art: "pdf",
  },
  {
    id: "kpgu-assistant",
    title: "KPGU University AI Assistant",
    label: "RAG • University Knowledge",
    description:
      "A university-focused assistant that answers questions from a curated institutional knowledge base, designed to make campus and admission information easier to find.",
    stack: ["React", "Tailwind CSS", "FastAPI", "SQLite", "FAISS"],
    summary:
      "Curated knowledge base with retrieval-oriented question answering; integrations and data coverage depend on configuration.",
    problem:
      "Campus and admissions information is spread across pages and documents, making simple questions hard to answer quickly.",
    approach: [
      "Seed a curated institutional dataset into a local SQLite database",
      "Index content with FAISS for vector retrieval",
      "Serve answers through a FastAPI backend to a React + Tailwind interface",
    ],
    features: [
      "Curated campus and admissions data",
      "Retrieval-oriented answers grounded in the knowledge base",
      "Local database fallback when an external model is not configured",
      "Language-aware response intent (English / Hindi / Gujarati) as a design goal",
    ],
    note: "A work-in-progress project; not presented as production-ready. LLM integration depends on API configuration.",
    demoUrl: "",
    repoUrl: "https://github.com/nisargshah1109/kpgu-ai-assistant.git",
    art: "rag",
  },
];
