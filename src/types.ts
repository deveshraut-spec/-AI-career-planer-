export interface SkillGap {
  skill: string;
  description: string;
  priority: string; // "High" | "Medium" | "Low"
}

export interface ResourceLink {
  name: string;
  url: string;
  type: string; // e.g. "Course", "Documentation", "Book", "GitHub Repo"
}

export interface Milestone {
  id: string;
  phase: string;
  durationName: string;
  description: string;
  gainsNewSkills: string[];
  actionSteps: string[];
  resources: ResourceLink[];
  interviewsPrep: string[];
}

export interface SalaryTrend {
  average: string;
  demand: string;
  outlook: string;
}

export interface CertificationSuggestion {
  name: string;
  issuer: string;
  description: string;
}

export interface CareerRoadmap {
  title: string;
  targetRole: string;
  summary: string;
  estimatedTime: string;
  skillGaps: SkillGap[];
  milestones: Milestone[];
  salaryTrend: SalaryTrend;
  certificationSuggestions: CertificationSuggestion[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
