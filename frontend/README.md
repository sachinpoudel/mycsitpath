# 📚 mycsitpath

**Master Your CSIT Journey.** 🚀

A modern, open-source platform for BSc CSIT students in Nepal. Access organized notes, past questions, PDFs, and video tutorials—all in one place.

## ✨ Features

*   **📂 Organized Content:** Everything sorted from Semester 1 to 8.
*   **🎥 Multi-Format:** Read text notes, view PDFs, or watch video tutorials.
*   **🤖 AI-Powered:** Get instant chapter summaries and Q&A powered by Gemini AI.
*   **⚡ Fast & Modern:** Built for speed and ease of use.

## 🛠️ Tech Stack

*   **Frontend:** React, TypeScript, Tailwind CSS, Vite
*   **Backend:** Node.js, Express
*   **Database & Storage:** Supabase
*   **AI:** Google Gemini

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/mycsitpath.git

# Install dependencies
npm install

# Run the app
npm run dev

Browser: fetch("/api/semesters")
         ↓
Nginx (frontend:80): sees /api/*, proxies to backend:3001
         ↓
Backend (backend:3001): handles /api/semesters
         ↓
Response flows back

┌─────────────────────────────────────────────────────────────────┐
│                         YOUR BROWSER                            │
│                    http://localhost:3002                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NGINX (Frontend Container)                   │
│                         Port 80                                 │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                    DECISION MAKER                       │   │
│   │                                                         │   │
│   │   Request: /                    → Serve index.html      │   │
│   │   Request: /team                → Serve index.html      │   │
│   │   Request: /semester/1          → Serve index.html      │   │
│   │   Request: /assets/main.js      → Serve the JS file     │   │
│   │   Request: /api/semesters       → Forward to Backend    │   │
│   │   Request: /api/subjects/1      → Forward to Backend    │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┴─────────────────┐
            │                                   │
            ▼                                   ▼
┌───────────────────────┐           ┌───────────────────────┐
│   STATIC FILES        │           │   BACKEND CONTAINER   │
│   /usr/share/nginx/   │           │   http://backend:3001 │
│   html/               │           │                       │
│                       │           │   - /api/semesters    │
│   - index.html        │           │   - /api/subjects     │
│   - assets/main.js    │           │   - /api/chapters     │
│   - assets/style.css  │           │   - /api/notes        │
│                       │           │                       │
└───────────────────────┘           └───────────────────────┘



Browser: "I need /api/semesters"
         ↓
Browser: "Let me call /api/semesters (relative URL)..."
         ↓
Nginx: "I see /api/*, let me forward to backend:3001"
         ↓
Backend: "Here's the data!"
         ↓
Nginx: "Here you go, browser!"