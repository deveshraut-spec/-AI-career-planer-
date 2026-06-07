import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, Sparkles, RefreshCw, X, ArrowRight, CornerDownRight } from "lucide-react";
import { ChatMessage, CareerRoadmap, Milestone } from "../types";

interface MentorChatProps {
  currentRoadmap: CareerRoadmap | null;
  activeMilestone: Milestone | null;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isSending: boolean;
  onClearHistory: () => void;
}

export default function MentorChat({
  currentRoadmap,
  activeMilestone,
  messages,
  onSendMessage,
  isSending,
  onClearHistory,
}: MentorChatProps) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Smooth scroll container to the bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  const handleInterceptAction = (actionText: string) => {
    onSendMessage(actionText);
  };

  // Automated contextual quick suggestions based on active career path
  const getInterceptSuggestions = () => {
    return [
      { text: "🎯 Suggest Careers", prompt: "I want to explore new career options. Ask me 3 brief questions about my hobbies, skills, and lifestyle goals, then suggest 3 careers that would fit me perfectly!" },
      { text: "🤝 Simulate Interview", prompt: "I want to practice my interview skills. Ask me what role I am interviewing for, then ask me one professional interview question at a time and evaluate my answers." },
      { text: "🔄 Shift Career Path", prompt: "I am thinking about migrating to/beginning a completely new career. Can you outline a step-by-step master plan on how to transition smoothly, build a strong portfolio, and gain experience?" },
      { text: "📝 Resume Mastery", prompt: "What are the gold-standard advice and structure for modern professional resumes? What critical mistakes should I avoid to get noticed by recruiters?" }
    ];
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-full overflow-hidden" id="mentor-chat-panel">
      {/* Header bar */}
      <div className="bg-slate-800/80 px-4 py-3.5 border-b border-slate-800 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <span className="text-xs font-bold text-slate-100 tracking-wide block">Career Assistant</span>
            {currentRoadmap && (
              <span className="text-[10px] text-blue-400 font-medium block">
                Mentoring: {currentRoadmap.targetRole}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onClearHistory}
          title="Clear chat history"
          className="p-1 px-2 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700/60 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
          id="clear-chat-history"
        >
          <RefreshCw className="w-3 h-3" />
          Reset Chat
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-slate-950/45">
        {messages.length === 0 ? (
          <div className="text-center py-8 px-4 h-full flex flex-col justify-center items-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600/30 to-purple-600/30 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-3 animate-bounce">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white font-display">Your AI Personal Coach</h4>
            <p className="text-xs text-slate-400 max-w-[240px] mx-auto mt-2 leading-relaxed">
              Ask any question about skills, certs, resume critiques, or request a customized study plan.
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isAI = message.role === "assistant";
            return (
              <div
                key={message.id}
                className={`flex gap-3 max-w-[90%] ${isAI ? "self-start" : "ml-auto flex-row-reverse"}`}
                id={`chat-msg-${message.id}`}
              >
                {/* Avatar indicator */}
                <div
                  className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-extrabold ${
                    isAI
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/15"
                      : "bg-slate-800 text-slate-300 border border-slate-700"
                  }`}
                >
                  {isAI ? "AI" : "ME"}
                </div>

                <div
                  className={`p-3 text-xs leading-relaxed rounded-2xl ${
                    isAI
                      ? "bg-slate-900 border border-slate-800/80 text-slate-250 rounded-tl-none"
                      : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/10 rounded-tr-none"
                  }`}
                >
                  {/* Markdown-like output support with simple splits */}
                  <div className="space-y-1.5 whitespace-pre-wrap font-sans">
                    {message.content}
                  </div>
                  <span className={`text-[9px] block text-right mt-1.5 ${isAI ? "text-slate-500" : "text-blue-200"}`}>
                    {message.timestamp}
                  </span>
                </div>
              </div>
            );
          })
        )}

        {isSending && (
          <div className="flex gap-3 max-w-[80%] self-start" id="chat-typing-indicator">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs shrink-0 flex items-center justify-center">
              AI
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none">
              <div className="flex items-center gap-1.5 py-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75" />
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150" />
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Smood Intercept Quick Panel */}
      <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800/80 shrink-0">
        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
          {currentRoadmap ? "Suggested Intercept Guides" : "Quick Assistant Starters"}
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2 mask-scrollbar scroll-smooth">
          {getInterceptSuggestions().map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isSending}
              onClick={() => handleInterceptAction(suggestion.prompt)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-750 text-slate-300 border border-slate-700/60 hover:border-slate-600 text-[10px] font-medium transition-all shrink-0 cursor-pointer disabled:opacity-50"
              id={`chat-sugg-${idx}`}
            >
              {suggestion.text}
            </button>
          ))}
        </div>
      </div>

      {/* Input area Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-slate-900 border-t border-slate-800/80 shrink-0">
        <div className="relative">
          <input
            type="text"
            placeholder={isSending ? "AI Coach is typing..." : "Ask about any career path, interview preparation, resume optimization..."}
            value={inputText}
            disabled={isSending}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl pl-4 pr-11 py-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all disabled:opacity-60"
            id="chat-input-field"
          />
          <button
            type="submit"
            disabled={isSending || !inputText.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors cursor-pointer disabled:bg-slate-800 disabled:text-slate-600"
            id="chat-send-btn"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
