import { CareerRoadmap } from "./types";

export const SAMPLE_ROADMAPS: { [key: string]: CareerRoadmap } = {
  ai_engineer: {
    title: "Web Developer to Production AI Engineer",
    targetRole: "AI Engineer",
    summary: "Leverage your engineering foundations to master large language model orchestrations, vector database indexing, dynamic agents agentic design patterns, and deployment of production-ready generative AI APIs.",
    estimatedTime: "6-8 Months",
    skillGaps: [
      { skill: "LLM Orchestration frameworks", description: "Familiarity with LangChain, LangGraph, or Llamaindex.", priority: "High" },
      { skill: "Vector Databases & Embeddings", description: "Understanding semantic chunking and index storage constraints (Pinecone, pgvector).", priority: "High" },
      { skill: "Python & Data Handling", description: "Most heavy model tooling uses Python pandas/numpy.", priority: "Medium" },
      { skill: "Prompt Engineering & Evaluation", description: "Structured testing paradigms for LLM prompts to measure reliability.", priority: "High" }
    ],
    milestones: [
      {
        id: "m1",
        phase: "Phase 1: Generative AI Foundations & Basic LLM Prompting",
        durationName: "Month 1",
        description: "Focus on understanding language models, zero-shot/few-shot learning instruction engineering, and using raw developer SDKs.",
        gainsNewSkills: ["Prompt Engineering", "Developer SDK Interaction", "Parameters (temp, top_p)"],
        actionSteps: [
          "Complete Andrew Ng's Prompt Engineering for Developers course.",
          "Write a simple Node.js CLI tool that communicates with the @google/genai SDK to translate inputs and summarize developer logs."
        ],
        resources: [
          { name: "DeepLearning.AI Prompting Course", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", type: "Course" },
          { name: "Official Google GenAI Documentation", url: "https://github.com/google/generative-ai-js", type: "Documentation" }
        ],
        interviewsPrep: [
          "Explain the difference between Temperature and Top-P controls.",
          "Identify strategies to mitigate common model hallucination issues."
        ]
      },
      {
        id: "m2",
        phase: "Phase 2: RAG (Retrieval-Augmented Generation) & Semantic Search",
        durationName: "Months 2-3",
        description: "Transform static applications into intelligent engines capable of querying custom documents and company wikis securely.",
        gainsNewSkills: ["Document Chunking", "Embedding Models", "Vector Databases (Pinecone/pgvector)"],
        actionSteps: [
          "Learn semantic vs keyword search concepts.",
          "Build a full-stack document QA portal where users can upload a PDF, chunk it, generate embeddings, store them, and ask questions to the model."
        ],
        resources: [
          { name: "Pinecone Vector Search Mastery", url: "https://www.pinecone.io/learn/", type: "Documentation" },
          { name: "ChromaDB Starter Handbook", url: "https://docs.trychroma.com/", type: "Documentation" }
        ],
        interviewsPrep: [
          "Describe how cosine similarity measures semantic distance.",
          "Explain what context window overflow is and how chunking resolves it."
        ]
      },
      {
        id: "m3",
        phase: "Phase 3: Agentic Orchestration & App Integration",
        durationName: "Months 4-5",
        description: "Design autonomous loops where agents invoke system tools (APIs, calculators, database lookups) to solve multi-step problems.",
        gainsNewSkills: ["Function Calling", "Agent Workflows", "Stateful Chats"],
        actionSteps: [
          "Implement recursive model loops that execute and report back system actions via Function Calling.",
          "Create a travel planner assistant that calls a mock hotel and flight booking API automatically to optimize itineraries."
        ],
        resources: [
          { name: "Introduction to LangGraph", url: "https://langchain-ai.github.io/langgraph/", type: "GitHub Repo" },
          { name: "Gemini Function Calling Guide", url: "https://ai.google.dev/gemini-api/docs/function-calling", type: "Documentation" }
        ],
        interviewsPrep: [
          "Explain what a 'ReAct' framework is for agents.",
          "Discuss handling agent loop failures (e.g., getting stuck in endless circular tool calls)."
        ]
      },
      {
        id: "m4",
        phase: "Phase 4: Evaluation, Scaling, and LLMOps",
        durationName: "Months 6+",
        description: "Deploy apps securely, track run-time latencies, monitor user prompts, and optimize model query cost using cache mechanics.",
        gainsNewSkills: ["Prompt Cache Optimizations", "Semantic Validation", "Safety Filters Configuration"],
        actionSteps: [
          "Configure cost alerts on cloud endpoints and set up context token count limit safeguards.",
          "Build a CI pipeline verifying prompt performance against 50 static unit test cases under prompt-eval rules."
        ],
        resources: [
          { name: "LlamaIndex Evaluation Guide", url: "https://docs.llamaindex.ai/en/stable/module_guides/evaluating/evaluation/", type: "Documentation" }
        ],
        interviewsPrep: [
          "Describe how and when schema validation protects downstream applications.",
          "Detail methods to log and audit model outputs for toxic content and security compliance."
        ]
      }
    ],
    salaryTrend: {
      average: "$135,000 - $185,000",
      demand: "Surging (+140% YOY)",
      outlook: "Extremely strong with high priority budget allocation across enterprises."
    },
    certificationSuggestions: [
      { name: "Google Cloud Professional Machine Learning Engineer", issuer: "Google Cloud", description: "Demonstrates expertise in deploying ML models safely on GCP enterprise environments." },
      { name: "AWS Certified Machine Learning - Specialty", issuer: "Amazon Web Services", description: "Validates cloud-based model engineering, pipeline design, and inference scaling skills." }
    ]
  },
  cloud_architect: {
    title: "Software Engineer to Cloud Solutions Architect",
    targetRole: "Cloud Solutions Architect",
    summary: "Transition from writing isolated features to architecting globally distributed, highly available, fault-tolerant, and secure cloud microservice infrastructures.",
    estimatedTime: "9-12 Months",
    skillGaps: [
      { skill: "Infrastructure as Code (IaC)", description: "Writing declerative cluster layouts with Terraform or OpenTofu.", priority: "High" },
      { skill: "Enterprise Security & Networking", description: "Understanding VPC structures, NAT gateways, security groups, and encryption-at-rest.", priority: "High" },
      { skill: "Load Balancing & Auto-scaling", description: "Configuring auto-scaling rules and multiregional failovers.", priority: "Medium" }
    ],
    milestones: [
      {
        id: "m1",
        phase: "Phase 1: Core Networking, Virtualization, and Basic Cloud",
        durationName: "Months 1-3",
        description: "Master subnets, CIDR notation, routing tables, and building basic computing virtual machines on top of the cloud network.",
        gainsNewSkills: ["VPC Design", "Subnet Routing", "Firewall Policies"],
        actionSteps: [
          "Configure a custom VPC manually from scratch using both public and private subnets.",
          "Create a secure database server inside a private subnet and configure a bastion jump server to allow SSH admin access."
        ],
        resources: [
          { name: "AWS VPC Deep Dive Workshop", url: "https://catalog.workshops.aws/general", type: "Course" },
          { name: "Cloudflare Networking Core Guides", url: "https://www.cloudflare.com/learning/network-layer/what-is-a-subnet/", type: "Documentation" }
        ],
        interviewsPrep: [
          "Explain the difference between a public subnet and a private subnet.",
          "Detail how a NAT Gateway allows external outbound traffic without allowing inbound unsolicited packets."
        ]
      },
      {
        id: "m2",
        phase: "Phase 2: Containers, Kubernetes, and Modern Microservices",
        durationName: "Months 4-6",
        description: "Migrate legacy applications into isolated containers and orchestrate scale actions using Kubernetes clusters.",
        gainsNewSkills: ["Docker Containerization", "Kubernetes Pods & Services", "Ingress Controllers"],
        actionSteps: [
          "Dockerize a full-stack Node.js + React application.",
          "Deploy the containerized stack onto a Kubernetes dev cluster using Minikube or Google GKE."
        ],
        resources: [
          { name: "Kubernetes the Hard Way Guide", url: "https://github.com/kelseyhightower/kubernetes-the-hard-way", type: "GitHub Repo" },
          { name: "Docker Official Reference Manual", url: "https://docs.docker.com/get-started/", type: "Documentation" }
        ],
        interviewsPrep: [
          "Explain the difference between a container image and a running container.",
          "Describe how a Kubernetes Service routes traffic to dynamic pod IPs."
        ]
      }
    ],
    salaryTrend: {
      average: "$145,000 - $195,000",
      demand: "High",
      outlook: "Constant steady migration of legacy enterprise systems assures long-term demand."
    },
    certificationSuggestions: [
      { name: "AWS Certified Solutions Architect – Associate", issuer: "AWS", description: "Industry-standard benchmark credential showcasing wide-ranging systems design expertise." },
      { name: "Google Cloud Professional Cloud Architect", issuer: "Google Cloud", description: "Highly prestigious credential testing advanced organizational architectural strategies." }
    ]
  }
};
