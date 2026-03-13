# StudyLens — AI Study Topic Explainer

An AI-powered web application that generates instant, student-friendly explanations for any study topic. Built with Next.js, TypeScript, Tailwind CSS, and Google's Gemini AI API.

## Live Demo

> Deploy to Vercel and update this link: `https://your-project.vercel.app`

---

## Features

- **Instant AI Explanations** — Enter any topic and receive a clear, simplified explanation in seconds
- **Example Topics** — Quick-start pills for common study subjects
- **Loading State** — Visual feedback while the AI generates a response
- **Error Handling** — Friendly messages for empty input or API failures
- **Responsive Design** — Works seamlessly on mobile and desktop

---

## How the AI API Is Used

This project uses the **Google Gemini 1.5 Flash** model via the `@google/generative-ai` SDK.

**API Flow:**
1. User enters a topic on the frontend
2. Frontend sends a `POST /api/explain` request with `{ topic: "..." }`
3. The Next.js API route calls `lib/aiClient.ts`, which constructs a prompt:
   > *"You are a friendly teacher… Explain the topic: '[topic]' in simple terms for a student…"*
4. Gemini returns a plain-text explanation (2–3 paragraphs, 100–200 words)
5. The explanation is returned as `{ explanation: "..." }` and displayed on screen

**Model used:** `gemini-1.5-flash` (available on the free tier)

---

## Project Structure

```
app/
├── page.tsx                  # Main UI page
├── layout.tsx                # Root layout with metadata
├── globals.css               # Global styles + Tailwind
└── api/
    └── explain/
        └── route.ts          # POST /api/explain endpoint

components/
├── TopicInput.tsx            # Input field, submit button, example pills
└── ExplanationCard.tsx       # Displays loading, error, or explanation

lib/
└── aiClient.ts               # Gemini API client and prompt logic
```

---

## Setup Instructions

### Prerequisites
- Node.js 18+
- A free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ai-study-explainer.git
cd ai-study-explainer

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.local.example .env.local
# Edit .env.local and add your Gemini API key:
# GEMINI_API_KEY=your_key_here

# 4. Run the development server
npm run dev
# Open http://localhost:3000
```

---

## Deployment on Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/ai-study-explainer.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click **Add New Project** → import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variable**
   - In the Vercel project settings → **Environment Variables**
   - Add: `GEMINI_API_KEY` = `your_gemini_api_key_here`

4. **Deploy**
   - Click **Deploy** — your app will be live in ~1 minute

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Full-stack React framework |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling |
| Google Gemini API | AI explanation generation |
| Vercel | Hosting & deployment |

---

## API Reference

### `POST /api/explain`

**Request:**
```json
{ "topic": "photosynthesis" }
```

**Success Response (200):**
```json
{ "explanation": "Photosynthesis is the process by which plants make their own food..." }
```

**Error Response (400/500):**
```json
{ "error": "Please enter a topic to continue." }
```
