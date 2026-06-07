import { useState } from "react";
import { CareerRoadmap, Milestone } from "../types";
import {
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  GraduationCap,
  ExternalLink,
  CheckCircle2,
  ListTodo,
  Award,
  ChevronRight,
  MessageSquare,
  HelpCircle,
  PlayCircle
} from "lucide-react";

interface RoadmapViewProps {
  roadmap: CareerRoadmap;
  completedSteps: Record<string, boolean>;
  onToggleStep: (stepKey: string) => void;
  onAskCoachAboutMilestone: (milestone: Milestone, type: "explain" | "quiz" | "project") => void;
}

export default function RoadmapView({
  roadmap,
  completedSteps,
  onToggleStep,
  onAskCoachAboutMilestone,
}: RoadmapViewProps) {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(
    roadmap.milestones[0]?.id || ""
  );

  const activeMilestone =
    roadmap.milestones.find((m) => m.id === activeMilestoneId) || roadmap.milestones[0];

  // Calculate statistics
  const totalSteps = roadmap.milestones.reduce((acc, curr) => acc + curr.actionSteps.length, 0);
  const completedCount = Object.keys(completedSteps).filter(
    (key) => key.startsWith(roadmap.title) && completedSteps[key]
  ).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <div className="space-y-6" id="roadmap-view-container">
      {/* Upper header section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Strategic Career Blueprints
            </span>
            <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white mt-2" id="roadmap-title">
              {roadmap.title}
            </h1>
          </div>

          {/* Progress gauge */}
          <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 p-3 rounded-xl self-start md:self-auto shadow-inner">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">
                Roadmap Progress
              </span>
              <span className="text-xs font-mono font-bold text-blue-400">
                {completedCount}/{totalSteps} complete
              </span>
            </div>
            <div className="relative w-11 h-11 flex items-center justify-center">
              {/* Outer circle */}
              <svg className="w-11 h-11 transform -rotate-90">
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  className="stroke-slate-800"
                  strokeWidth="3.5"
                  fill="transparent"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  className="stroke-blue-500 transition-all duration-300"
                  strokeWidth="3.5"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 18}
                  strokeDashoffset={2 * Math.PI * 18 * (1 - progressPercent / 100)}
                />
              </svg>
              <span className="absolute text-[10px] font-mono font-extrabold text-slate-200">{progressPercent}%</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-350 leading-relaxed max-w-4xl" id="roadmap-summary">
          {roadmap.summary}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 border-t border-slate-800/80 pt-6">
          <div className="bg-slate-950/40 rounded-xl p-3 flex items-start gap-3 border border-slate-800/50">
            <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">
                Est. Transition Time
              </span>
              <span className="text-sm font-semibold text-slate-200">{roadmap.estimatedTime}</span>
            </div>
          </div>

          <div className="bg-slate-950/40 rounded-xl p-3 flex items-start gap-3 border border-slate-800/50">
            <DollarSign className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">
                Market Salary Average
              </span>
              <span className="text-sm font-semibold text-emerald-400 font-mono">{roadmap.salaryTrend?.average || "$120,000+"}</span>
            </div>
          </div>

          <div className="bg-slate-950/40 rounded-xl p-3 flex items-start gap-3 border border-slate-800/50">
            <TrendingUp className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">
                Active Job Demand
              </span>
              <span className="text-sm font-semibold text-slate-200">{roadmap.salaryTrend?.demand || "High Surge"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Gaps Analysis */}
      {roadmap.skillGaps && roadmap.skillGaps.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-display font-semibold text-white" id="skill-gap-title">
              Identified Core Skill Gaps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roadmap.skillGaps.map((gap, index) => {
              const isHigh = gap.priority?.toLowerCase() === "high";
              const isMedium = gap.priority?.toLowerCase() === "medium";
              return (
                <div
                  key={index}
                  className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/40 flex items-start justify-between gap-3"
                  id={`skill-gap-item-${index}`}
                >
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">
                      {gap.skill}
                    </h3>
                    <p className="text-xs text-slate-450 mt-1">{gap.description}</p>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide shrink-0 ${
                      isHigh
                        ? "bg-rose-500/10 text-rose-450 border border-rose-500/25"
                        : isMedium
                        ? "bg-amber-500/10 text-amber-450 border border-amber-500/25"
                        : "bg-slate-800 text-slate-400 border border-slate-700/60"
                    }`}
                  >
                    {gap.priority}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Tabs timeline & Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Timeline phases map sidebar */}
        <div className="lg:col-span-4 space-y-2">
          <div className="flex items-center gap-2 px-1 mb-3">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Strategic Progression Guide
            </span>
          </div>

          <div className="flex flex-col gap-2.5" id="timeline-tabs-list">
            {roadmap.milestones.map((milestone, idx) => {
              const isActive = milestone.id === activeMilestoneId;
              const hasMilestoneCompleted = milestone.actionSteps.every(
                (step, sIdx) => completedSteps[`${roadmap.title}-${milestone.id}-${sIdx}`]
              );

              return (
                <button
                  key={milestone.id}
                  onClick={() => setActiveMilestoneId(milestone.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all relative flex items-start gap-3 group cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20 transform translate-x-1"
                      : "bg-slate-900 text-slate-300 border-slate-800/80 hover:border-slate-700 hover:bg-slate-850"
                  }`}
                  id={`milestone-tab-${milestone.id}`}
                >
                  {/* Decorative timeline connecting line */}
                  {idx < roadmap.milestones.length - 1 && (
                    <div
                      className={`absolute left-7 top-14 bottom-[-22px] w-0.5 z-0 ${
                        isActive ? "bg-blue-300/20" : "bg-slate-800"
                      }`}
                    />
                  )}

                  {/* Icon step number indicator */}
                  <div
                    className={`w-7- h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 z-10 border ${
                      isActive
                        ? "bg-white text-blue-750 border-white"
                        : hasMilestoneCompleted
                        ? "bg-emerald-500/10 text-emerald-450 border-emerald-505/20"
                        : "bg-slate-950 text-slate-500 border-slate-800 group-hover:bg-blue-500/10 group-hover:text-blue-400 group-hover:border-blue-500/20"
                    }`}
                  >
                    {hasMilestoneCompleted && !isActive ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-450" />
                    ) : (
                      <span>{(idx + 1).toString().padStart(2, "0")}</span>
                    )}
                  </div>

                  {/* Content line */}
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-[9px] font-extrabold uppercase tracking-widest font-mono block ${
                        isActive ? "text-blue-100" : "text-blue-400"
                      }`}
                    >
                      {milestone.durationName}
                    </span>
                    <h3
                      className={`text-xs font-bold truncate mt-0.5 ${
                        isActive ? "text-white" : "text-slate-200"
                      }`}
                    >
                      {milestone.phase.replace(/^Phase \d+:\s*/, "")}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone Deep-dive detail card */}
        {activeMilestone && (
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 relative">
            {/* Absolute indicator for Active */}
            <div className="absolute -top-3 right-6 px-3 py-1 bg-blue-600 rounded-full text-[9px] font-bold text-white uppercase tracking-widest shadow-md">
              Focus Phase
            </div>

            {/* Header info */}
            <div>
              <span className="text-[10px] font-bold text-blue-400 bg-blue-500/15 border border-blue-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {activeMilestone.durationName}
              </span>
              <h2 className="text-xl font-display font-black text-white mt-2" id="active-milestone-title">
                {activeMilestone.phase}
              </h2>
              <p className="text-sm text-slate-350 leading-relaxed mt-2.5">
                {activeMilestone.description}
              </p>
            </div>

            {/* Gained skills */}
            {activeMilestone.gainsNewSkills && activeMilestone.gainsNewSkills.length > 0 && (
              <div>
                <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  Skills Acquired
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeMilestone.gainsNewSkills.map((sk, index) => (
                    <span
                      key={index}
                      className="text-xs bg-slate-950 border border-slate-850 text-slate-300 px-3 py-1 rounded-lg font-medium hover:border-blue-500/45 transition-colors cursor-default"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Checklist of Action items */}
            <div>
              <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                <ListTodo className="w-3.5 h-3.5 text-blue-400" />
                Action Milestones Checklist
              </h4>
              <div className="space-y-2">
                {activeMilestone.actionSteps.map((step, index) => {
                  const stepKey = `${roadmap.title}-${activeMilestone.id}-${index}`;
                  const isDone = !!completedSteps[stepKey];
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => onToggleStep(stepKey)}
                      className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
                        isDone
                          ? "bg-slate-950/40 text-slate-500 border-slate-850/60 line-through"
                          : "bg-slate-950 text-slate-300 border-slate-850 hover:bg-slate-950/80 hover:border-slate-700 hover:shadow-inner"
                      }`}
                      id={`action-checkbox-${index}`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 fill-emerald-500/10" />
                        ) : (
                          <div className="w-4.5 h-4.5 rounded-full border-2 border-slate-700 hover:border-blue-500 transition-colors bg-slate-900" />
                        )}
                      </div>
                      <span className="text-xs font-semibold leading-relaxed">{step}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Highlighted high-quality Learning Links & Resources */}
            {activeMilestone.resources && activeMilestone.resources.length > 0 && (
              <div>
                <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  Validated Learning Paths
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeMilestone.resources.map((res, index) => (
                    <a
                      key={index}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-950 hover:bg-slate-950/70 border border-slate-850 hover:border-blue-500/30 rounded-xl transition-all flex items-start justify-between group"
                      id={`resource-link-${index}`}
                    >
                      <div className="min-w-0 pr-2">
                        <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider block w-fit">
                          {res.type}
                        </span>
                        <h5 className="text-xs font-bold text-slate-200 mt-2.5 truncate group-hover:text-blue-400 transition-colors">
                          {res.name}
                        </h5>
                        <p className="text-[10px] text-slate-500 block truncate mt-1">{res.url}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 shrink-0 mt-3 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* High-yield Interview Practice */}
            {activeMilestone.interviewsPrep && activeMilestone.interviewsPrep.length > 0 && (
              <div className="bg-slate-950 border border-slate-850 rounded-xl p-4">
                <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                  Key Interview Targets for this Phase
                </h4>
                <ul className="space-y-2 text-xs text-slate-350 mt-3 list-disc list-inside">
                  {activeMilestone.interviewsPrep.map((prep, index) => (
                    <li key={index} className="leading-relaxed">
                      {prep}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Seamless Chat Mentor Options */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-3">
                Need details or a mockup problem? Choose an intercept action:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => onAskCoachAboutMilestone(activeMilestone, "explain")}
                  className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  id="ask-coach-explain-btn"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Explain concepts
                </button>

                <button
                  type="button"
                  onClick={() => onAskCoachAboutMilestone(activeMilestone, "quiz")}
                  className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  id="ask-coach-quiz-btn"
                >
                  <ListTodo className="w-3.5 h-3.5" />
                  Challenge Practice Quiz
                </button>

                <button
                  type="button"
                  onClick={() => onAskCoachAboutMilestone(activeMilestone, "project")}
                  className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  id="ask-coach-project-btn"
                >
                  <Award className="w-3.5 h-3.5" />
                  Formulate a Project task
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Certification Section */}
      {roadmap.certificationSuggestions && roadmap.certificationSuggestions.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-display font-semibold text-white" id="cert-title">
              Target Professional Certifications
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roadmap.certificationSuggestions.map((cert, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-slate-850 bg-slate-950/40 flex items-start gap-3.5"
                id={`cert-item-${index}`}
              >
                <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl shrink-0 mt-0.5">
                  <Award className="w-4.5 h-4.5 text-blue-400" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block font-mono">
                    ISSUED BY {cert.issuer}
                  </span>
                  <h3 className="text-sm font-bold text-slate-200 mt-1">{cert.name}</h3>
                  <p className="text-xs text-slate-450 leading-relaxed mt-1">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
