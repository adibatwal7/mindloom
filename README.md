# MINDLOOM MVP

An AI-enabled early support platform for identifying potential characteristics of Autism Spectrum Disorder (ASD) in children through interactive activities.

## ⚠️ Disclaimer
**This is a support tool and hackathon MVP, not a medical device. It does not provide medical diagnoses. Please consult a qualified healthcare professional for medical advice.**

## Features
- **Privacy-First Face Tracking**: On-device FaceMesh via Google MediaPipe tracks engagement metrics without recording or transmitting video.
- **Interactive Child Flow**: Engaging Emotion Recognition and Behavioral prompts with high-contrast, large-button UI and sunburst reward animations.
- **Demo Mode**: Easily jump to the end state to review the AI-assisted Parent Dashboard and insights.
- **FHIR Support**: Export the results to a FHIR-compliant Observation JSON object.

## Tech Stack
- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **AI Model**: Google MediaPipe Tasks Vision (`FaceLandmarker`)

## Running Locally

1. **Install Dependencies**
   Open two terminal tabs.

   ```sh
   # Tab 1: Frontend
   cd frontend
   npm install

   # Tab 2: Backend
   cd backend
   npm install
   ```

2. **Start the Development Servers**
   
   ```sh
   # Tab 1: Frontend
   npm run dev

   # Tab 2: Backend
   npm run dev
   ```

3. **Usage**
   Navigate to `http://localhost:5173`
   Allow Camera access to see the tracking engagement in the Session Flow. Or click "Run Demo Mode" on the landing page for immediate mock results.

## Optional: Claude API Integration (Bonus)
If you want to use the real Anthropic Claude API to generate empathetic parent reports based on the metrics:
1. Open the `backend/.env` file.
2. Replace `your_api_key_here` with your actual Anthropic API key (`CLAUDE_API_KEY=sk-...`).
3. In `backend/server.ts`, uncomment the marked `fetch` block inside the `/api/sessions` endpoint.
4. Restart your backend server.

## Limitations (Hackathon Scope)
- "Claude" report is mocked locally based on a simple heuristic algorithm.
- Face Tracking calculates a naive engagement proxy (number of detected faces and continuous presence) rather than deep psychological models.
- Backend handles session saves statelessly without a database to optimize for rapid deployment.
