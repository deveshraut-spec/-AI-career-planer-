import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Helper to get Lazy GoogleGenAI client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined on the server side. Please set your Gemini API key in Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Generate Career Roadmap using structured JSON output from Gemini-3.5-flash
app.post("/api/generate-roadmap", async (req, res) => {
  try {
    const { skills, interests, goalRole, experienceLevel, pace } = req.body;

    if (!goalRole) {
      return res.status(400).json({ error: "Goal role is required to generate a career roadmap." });
    }

    const ai = getGeminiClient();

    const prompt = `
      You are an expert career planner and industry strategist.
      Analyze the user's career profile and design a highly personalized, step-by-step career path roadmap.
      
      User Profile:
      - Current Skills: ${skills || "None specified"}
      - Professional Interests: ${interests || "None specified"}
      - Target/Goal Career Role: ${goalRole}
      - Current Experience Level: ${experienceLevel || "Entry or transitioning"}
      - Preferred Learning Pace / Timeline Commitment: ${pace || "balanced"}

      Deliver a comprehensive roadmap in JSON format matching the schema requested below. Make sure it has concrete, actual action steps and real-world high-quality resources (GitHub repositories, reputable websites, certification bodies) that exist.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite, highly encouraging career advisor. You always provide highly actionable, structured plans with actual web resources, skill definitions, and clear phases. Be realistic but highly optimistic.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "targetRole", "summary", "estimatedTime", "skillGaps", "milestones", "salaryTrend", "certificationSuggestions"],
          properties: {
            title: { type: Type.STRING, description: "Clear, customized roadmap title (e.g., Transition from Frontend to Cloud Solutions Architect)" },
            targetRole: { type: Type.STRING, description: "The final target role" },
            summary: { type: Type.STRING, description: "A high-level executive summary of the career transition plan and overall strategy." },
            estimatedTime: { type: Type.STRING, description: "Estimated duration (e.g., 9-12 Months)" },
            skillGaps: {
              type: Type.ARRAY,
              description: "List of missing skills the user must acquire to reach the target role.",
              items: {
                type: Type.OBJECT,
                required: ["skill", "description", "priority"],
                properties: {
                  skill: { type: Type.STRING, description: "Name of the skill" },
                  description: { type: Type.STRING, description: "Why this skill is missing or needed for target role" },
                  priority: { type: Type.STRING, description: "High, Medium, or Low" }
                }
              }
            },
            milestones: {
              type: Type.ARRAY,
              description: "Sequential phases/steps guiding the user from current status to the target role.",
              items: {
                type: Type.OBJECT,
                required: ["id", "phase", "durationName", "description", "gainsNewSkills", "actionSteps", "resources", "interviewsPrep"],
                properties: {
                  id: { type: Type.STRING, description: "Unique identifier, e.g., m1, m2, etc." },
                  phase: { type: Type.STRING, description: "Name/title of this roadmap phase (e.g., Phase 1: Core Systems & Networking)" },
                  durationName: { type: Type.STRING, description: "Target timeframe (e.g., Months 1-3)" },
                  description: { type: Type.STRING, description: "Brief overview of what is conquered in this phase" },
                  gainsNewSkills: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Skills added during this milestone phase"
                  },
                  actionSteps: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Specific concrete actionable steps to perform"
                  },
                  resources: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      required: ["name", "url", "type"],
                      properties: {
                        name: { type: Type.STRING, description: "Title of the resource, e.g., AWS Developer Guide" },
                        url: { type: Type.STRING, description: "Accurate real-world URL or learning link (e.g., https://...)" },
                        type: { type: Type.STRING, description: "Type of resource like 'Course', 'Documentation', 'Book', 'GitHub Repo', 'Project Idea'" }
                      }
                    }
                  },
                  interviewsPrep: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "What topics/questions to expect in interviews regarding this milestone"
                  }
                }
              }
            },
            salaryTrend: {
              type: Type.OBJECT,
              required: ["average", "demand", "outlook"],
              properties: {
                average: { type: Type.STRING, description: "Average annual compensation rate or range" },
                demand: { type: Type.STRING, description: "Current job market demand label (e.g., High, Surging)" },
                outlook: { type: Type.STRING, description: "Future growth prospects" }
              }
            },
            certificationSuggestions: {
              type: Type.ARRAY,
              description: "Valuable certificates that advance credibility in this area.",
              items: {
                type: Type.OBJECT,
                required: ["name", "issuer", "description"],
                properties: {
                  name: { type: Type.STRING, description: "Name of the credential" },
                  issuer: { type: Type.STRING, description: "e.g., Amazon Web Services, Google, Scrum Alliance" },
                  description: { type: Type.STRING, description: "Short description of why it helps" }
                }
              }
            }
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json({ roadmap: parsedData });
  } catch (err: any) {
    console.error("Generate roadmap error:", err);
    res.status(500).json({ error: err?.message || "An error occurred while generating the career planner roadmap." });
  }
});

// API: Handle Chatbot messages relative to career roadmapping with smart context
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, currentRoadmap } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const ai = getGeminiClient();

    // Map system instruction with optional roadmap context
    let systemInstruction = "You are an elite, professional, encouraging AI Career Counselor and Mentor coaching users across ANY professional field (e.g., healthcare, education, culinary arts, creative industry, trades, business, law, public service, technology, and beyond). Always tailor your advice, questions, resources, and insights specifically to the user's requested career field—completely avoid assuming a technology or digital tech focus unless the user has explicitly mentioned it. Answer their career queries, interview challenges, resume structures, role preparation steps, and path changes clearly. Limit your response to 2-3 short, highly readable paragraphs or structured bulleted lists using rich, clean markdown elements.";

    if (currentRoadmap) {
      systemInstruction += `\n\nTake note of the user's active career roadmap:
      Title: "${currentRoadmap.title}"
      Target Role: "${currentRoadmap.targetRole}"
      Summary: "${currentRoadmap.summary}"
      Estimated transition timeline: "${currentRoadmap.estimatedTime}"
      Salary Average Details: "${currentRoadmap.salaryTrend?.average}"
      
      Always tailor your helpful suggestions, resources, or advice to guide them smoothly along this specific career path unless they are asking to switch paths.`;
    }

    // Map chat history conforming to Gemini API chat guidelines
    const formattedHistory = messages.slice(0, -1).map(m => {
      return {
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      };
    });

    const lastMessageText = messages[messages.length - 1].content;

    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: formattedHistory
    });

    const response = await chatInstance.sendMessage({ message: lastMessageText });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Chat error:", err);
    res.status(500).json({ error: err?.message || "An error occurred while conversing with the career mentor." });
  }
});

// Setup Vite & Static Assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
