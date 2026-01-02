# 🌍 Natours AI - Intelligent Travel Architect

![Natours AI Banner](https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=400&fit=crop)

> **The world's first AI-powered travel agency.**
> Natours AI uses Google Gemini 2.5 and Real-time Voice Synthesis to act as your personal travel concierge, building custom itineraries and guiding you through destinations with immersive audio.

---

## 🚀 Live Demo
**Frontend (Vercel):** [https://natours-ai.vercel.app](https://natours-ai.vercel.app)  
**Backend API (Render):** [https://natours-backend.onrender.com](https://natours-backend.onrender.com)

*(Note: The backend runs on a free instance and may take 30s to wake up on the first request.)*

---

## ✨ Key Features

### 🤖 AI Auto-Planner (Gemini 2.5)
Stop browsing, start traveling. Enter your **Budget** (e.g., $500) and **Interests** (e.g., "History & Spicy Food"), and our AI Agent generates a **complete 3-day itinerary** with:
- Cost breakdown fitting your budget.
- Hotel recommendations.
- Day-by-day activity schedule.

### 🗣️ Immersive Audio Guides
Experience the world before you fly.
- **Text-to-Speech:** The app reads cultural insights aloud.
- **Karaoke Highlighting:** Text lights up in real-time as the AI speaks, improving engagement and accessibility.

### 🎨 Cinematic UI/UX
- **Parallax Animations:** Powered by **GSAP** and **Swiper.js**.
- **Smooth Scrolling:** Integrated **Lenis** for a luxury feel.
- **Lazy Loading:** Blur-up image optimization for instant performance.

### 🔐 Secure Architecture
- **Authentication:** JWT (JSON Web Tokens) with HttpOnly cookies.
- **Security:** Password hashing with **Bcrypt**.
- **Performance:** Optimized API calls with separate Client/Server architecture.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP, Framer Motion
- **State Management:** React Hooks
- **HTTP Client:** Axios

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **AI Engine:** Google Generative AI (Gemini 2.5 Flash)
- **Image Source:** Unsplash API

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/kiran123-stack/natours-ai.git]
cd natours-ai

2. Backend Setup
cd server
npm install

# Create a .env file in the server folder and add:
# DATABASE_URL=your_mongodb_connection_string
# GEMINI_API_KEY=your_google_ai_key
# UNSPLASH_ACCESS_KEY=your_unsplash_key
# JWT_SECRET=your_secret_key
# NODE_ENV=development

# Start the Server
npm run dev

3. Frontend Setup
Open a new terminal.

cd client
npm install

# Create a .env.local file in the client folder and add:
# NEXT_PUBLIC_API_URL=http://localhost:5000

# Start the Client
npm run dev

Your app should now be running at http://localhost:3000! 🚀

📸 Screenshots
<img width="1341" height="635" alt="image" src="https://github.com/user-attachments/assets/faa171b7-397c-449f-a6b2-8be1344b9ac7" />
<img width="1285" height="393" alt="image" src="https://github.com/user-attachments/assets/6ab9b4dd-7157-4fc0-a315-5f5cfd631946" />

🤝 Contributing
Contributions are welcome!

Fork the project.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.
👤 Author
Kiran Aspiring Full Stack Developer & AI Enthusiast
Built with ❤️ and ☕.

