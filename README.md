# 🧭 AI Career Counselor

🚀 **Welcome to your AI Career Counselor**  
This is a modern, full-screen AI mentor built to guide you through any professional path you choose. No matter if you are diving into healthcare, arts, culinary, business, trades, or tech, this chatbot is designed to think like a real-world career counselor. It completely skips complex tech jargon so that anyone can chat naturally and get immediate, human-like guidance.

---

## 🌟 What This Coach Can Do For You

We made this app to do exactly four powerful things exceptionally well:

* **🎯 Suggest Careers**: Analyzes your interests and real-life skills to find your perfect job match. The coach will ask you three quick, simple questions about what you enjoy, how you like to live, and outline three customized job roles that fit you like a glove.
* **🤝 Simulate Real Interviews**: Conducts live mock interviews and grades your answers on the spot. Tell the coach what job you are interviewing for, and it will ask you real, field-tested questions *one by one* and evaluate your answers with helpful tips on how to sound more professional.
* **🔄 Shift Your Path**: Build complete step-by-step roadmaps to transition into a brand new field. Receive a simple, realistic, week-by-week transition strategy detailing exactly what skills to focus on, how to gain initial experience, and what credentials are actually worth your time.
* **📝 Resume Mastery**: Reviews your experience and gives you direct tips to fix your resume or portfolio. Learn the exact, clean structures that recruiters love to see and common mistakes to avoid.
* **🫧 Sleek Space Slate Theme**: A beautiful, eye-friendly dark look designed for focused, late-night planning.

---

## 🎨 Beautiful, Modern Look ("Sleek Interface" Theme)

We threw away boring default setups. The interface is crafted to evoke comfort and clarity:
* **Deep Space Slate Canvas**: Deep, dark, eye-friendly blues and carbon slates that keep your focus completely on the advice.
* **Warm Typography**: Distinct display layouts with matching monospaced status alerts.
* **Responsive Layout**: Works beautifully on your laptop, iPad, or mobile phone so you can practice on the move.
* **Smood Action Intercepts**: Dynamic quick pills at the bottom of the chat to launch mock interviews or resume guides with a single click.

---

## ⚡ Quick Start (No Complex Setup)

### 1. Configure Your Secret Key
To unlock the fully personalized AI responses, save your Google Gemini key in the container environment:
* Go to the **Secrets** panel in your Google AI Studio UI.
* Set `GEMINI_API_KEY` to your personal Gemini developer key.

### 2. Run the App
If you are developing locally, run:
```bash
npm install
npm run dev
```
Open your browser to `http://localhost:3000` and start talking with your new mentor!

---

## 🛠️ Tech Stack & Architecture

We kept the internal code exceptionally clean, modular, and fast so anyone can modify it:
* **Backend**: Express + Native Node.js Server serving as a secure proxy (this ensures your private Gemini API key never leaks to the web browser).
* **Frontend**: React + TypeScript designed in modular parts (`MentorChat`).
* **Styling**: Tailwind CSS utility parameters with customized scrolling overlays.
* **Platform Security**: Robust local session isolation with immediate chat reset parameters.

---

*Made with 💙 to help anyone, anywhere find their true vocational calling.*
