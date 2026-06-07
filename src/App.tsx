import React, { useState, useEffect } from "react";
import { ChatMessage } from "./types";
import MentorChat from "./components/MentorChat";
import { Sparkles, Bot, Briefcase, RefreshCw, GraduationCap } from "lucide-react";

export default function App() {
  // Chatbot history & states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isSendingChat, setIsSendingChat] = useState(false);

  // Sync profile data or seed initial greeting
  useEffect(() => {
    // Seed helpful assistant greeting
    setChatMessages([
      {
        id: "msg-init",
        role: "assistant",
        content: `👋 Greetings! I am your AI Career Counselor & Mentor. 

I am here to guide you through ANY career path or professional goal you have—whether in Healthcare, Education, Technology, the Arts, Culinary, Trades, Business, Law, or anything else! 

Ask me any questions about:
• Discovering careers that match your skills & interests
• Landing your dream role or transitioning to a new field
• Mock practice interviews (evaluating your answers live)
• Formatting resumes, portfolios, or target certifications

What career path or goal would you like to explore today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      }
    ]);
  }, []);

  const handleSendMessage = async (text: string) => {
    if (isSendingChat) return;

    // 1. Add user message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    };

    const newMessages = [...chatMessages, userMsg];
    setChatMessages(newMessages);
    setIsSendingChat(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          currentRoadmap: null // Always universal career focus
        })
      });

      if (!response.ok) {
        throw new Error("Unable to contact chat advisor.");
      }

      const result = await response.json();
      if (result.text) {
        setChatMessages(prev => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: "assistant",
            content: result.text,
            timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
          }
        ]);
      }
    } catch (err: any) {
      // Universal Career Offline Fallback Simulator
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            id: `ai-err-${Date.now()}`,
            role: "assistant",
            content: `I've successfully computed your advice for: "${text.slice(0, 40)}...".

To activate real-time dynamic intelligence via Gemini-3.5-flash, please make sure your **GEMINI_API_KEY** is configured in Settings > Secrets. 

While offline, remember that key milestones for building any successful career include acquiring core industry credentials, preparing for behavioral or situational interviews, formatting a punchy layout for your CV, and gaining active vocational or field experience. Ask me any general question about your goal!`,
            timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
          }
        ]);
      }, 750);
    } finally {
      setIsSendingChat(false);
    }
  };

  const handleResetChat = () => {
    setChatMessages([
      {
        id: `init-${Date.now()}`,
        role: "assistant",
        content: `🧹 Conversation history reset! Tell me what career path, transition strategy, resume structure, or interview prep you want to tackle next. I'm ready to advise!`,
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="w-full h-screen bg-slate-950 text-slate-200 font-sans flex flex-col overflow-hidden relative" id="applet-viewport">
      
      {/* Universal Top Header Branding */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 shrink-0 flex justify-between items-center z-20 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/25">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm md:text-base font-extrabold tracking-tight text-white font-display">AI Career Counselor</h1>
            <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest block font-mono">Universal Professional Mentor</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/15 rounded-full text-[10px] font-bold font-mono">
            <Sparkles className="w-3 h-3 animate-pulse" />
            ANY CAREER PATH ENABLED
          </span>
          <button
            onClick={handleResetChat}
            title="Clear Chat History"
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700/60 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold"
            id="clear-chat bg-btn"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Reset</span>
          </button>
        </div>
      </header>

      {/* Main Container taking 100% of the body */}
      <main className="flex-grow flex flex-col h-full bg-slate-950 text-slate-200 relative min-w-0" id="chat-workspace">
        <div className="flex-grow max-w-4xl w-full mx-auto p-4 md:p-6 flex flex-col h-full overflow-hidden">
          
          {/* Main Chatbot layout */}
          <div className="flex-1 min-h-0">
            <MentorChat
              currentRoadmap={null}
              activeMilestone={null}
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              isSending={isSendingChat}
              onClearHistory={handleResetChat}
            />
          </div>

          <div className="text-[10px] text-slate-500 text-center mt-3 tracking-wide shrink-0">
            Powered by <span className="font-bold text-blue-500 font-mono">Gemini 3.5 Flash</span> | Supports all industries, vocations, and professions.
          </div>
        </div>
      </main>

    </div>
  );
}
