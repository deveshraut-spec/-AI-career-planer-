import React, { useState } from "react";
import { Sparkles, Sliders, Briefcase, ChevronRight, GraduationCap } from "lucide-react";

interface RoadmapFormProps {
  onSubmit: (formData: {
    skills: string;
    interests: string;
    goalRole: string;
    experienceLevel: string;
    pace: string;
  }) => void;
  isGenerating: boolean;
  onSelectSample: (key: string) => void;
}

const POPULAR_ROLES = [
  { label: "AI Engineer", key: "ai_engineer", skills: "React, Node.js, JavaScript, Python" },
  { label: "Cloud Architect", key: "cloud_architect", skills: "AWS, Linux, System Design, DevOps" },
  { label: "Product Manager", key: "product_manager", skills: "Agile, Strategy, UI Foundations, Metrics" },
  { label: "Data Scientist", key: "data_science", skills: "Python, SQL, Statistics, Data Visuals" },
];

export default function RoadmapForm({ onSubmit, isGenerating, onSelectSample }: RoadmapFormProps) {
  const [goalRole, setGoalRole] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("junior");
  const [pace, setPace] = useState("balanced");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalRole.trim()) return;
    onSubmit({
      skills,
      interests,
      goalRole,
      experienceLevel,
      pace
    });
  };

  const handleQuickSelect = (roleName: string) => {
    setGoalRole(roleName);
    if (roleName === "AI Engineer") {
      setSkills("JavaScript, React, basic Node.js, HTML/CSS");
      setInterests("Large language models, automation, server-side APIs");
    } else if (roleName === "Cloud Architect") {
      setSkills("Bash script, basic web development, Linux commands");
      setInterests("Server scale, networks, automation, infrastructure-as-code");
    } else if (roleName === "Product Manager") {
      setSkills("Marketing, customer research, communication, Excel");
      setInterests("User experience design, engineering coordinate, market strategy");
    } else if (roleName === "Data Scientist") {
      setSkills("Python basics, SQL, spreadsheet analysis");
      setInterests("Data models, business forecasting, data reporting");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl min-h-full" id="roadmap-form-card">
      <div className="flex items-center gap-2 mb-6">
        <Sliders className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-display font-bold text-white" id="form-title">Strategic Goal Definition</h2>
      </div>

      {/* Suggested blueprints */}
      <div className="mb-6">
        <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">
          Or Quick Start with Expert Blueprints
        </label>
        <div className="grid grid-cols-2 gap-2">
          {POPULAR_ROLES.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => {
                handleQuickSelect(r.label);
                onSelectSample(r.key);
              }}
              className="text-left p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all group cursor-pointer"
              id={`quick-select-${r.key}`}
            >
              <div className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors flex items-center justify-between">
                {r.label}
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all text-blue-400" />
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{r.skills}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex items-center my-6">
        <div className="flex-grow border-t border-slate-800"></div>
        <span className="flex-shrink mx-3 text-[9px] bg-slate-900 px-2 text-slate-500 font-extrabold uppercase tracking-widest">
          Customize Career Roadmap
        </span>
        <div className="flex-grow border-t border-slate-800"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Goal Role */}
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            Target Career Role *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Cybersecurity Specialist, Kubernetes Lead"
            value={goalRole}
            onChange={(e) => setGoalRole(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-xs text-slate-200 rounded-xl px-4 py-3 placeholder:text-slate-600 focus:outline-none transition-all"
            id="goal-role-input"
          />
        </div>

        {/* Current Skills */}
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
            Your Current Skills
          </label>
          <textarea
            placeholder="e.g. JavaScript, React, Excel, basic CSS (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            rows={2}
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-xs text-slate-200 rounded-xl px-4 py-3 placeholder:text-slate-600 resize-none focus:outline-none transition-all"
            id="skills-input"
          />
        </div>

        {/* Professional Interests */}
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">
            Interests & Motivations
          </label>
          <input
            type="text"
            placeholder="e.g. high scalability, system automation, user interfaces"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-xs text-slate-200 rounded-xl px-4 py-3 placeholder:text-slate-600 focus:outline-none transition-all"
            id="interests-input"
          />
        </div>

        {/* Experience Level & Pace Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-slate-450 font-bold mb-2">
              Experience Level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
              id="experience-select"
            >
              <option value="junior">Entry-Level / Junior</option>
              <option value="mid">Mid-Level Dev</option>
              <option value="senior">Senior Lead</option>
              <option value="transitioning">Career Changer</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-slate-450 font-bold mb-2">
              Learning Pace
            </label>
            <select
              value={pace}
              onChange={(e) => setPace(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
              id="pace-select"
            >
              <option value="fast">Fast-Track (Intense)</option>
              <option value="balanced">Balanced Progression</option>
              <option value="part-time">Part-Time (5h/week)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating || !goalRole.trim()}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-850 disabled:text-slate-600 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-[0.98]"
          id="generate-roadmap-btn"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Drafting Customized Guide...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate My Career Blueprint</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
