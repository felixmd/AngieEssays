# AngieWrites

A web-based essay coaching application for high school students that uses AI to provide personalized feedback on essay writing.

## Features

- **4 Essay Types**: Narrative, Descriptive, Compare-and-Contrast, and Argumentative essays
- **Topic Selection**: Choose from suggested topics or write about your own
- **On-Demand Feedback**: Click "Check My Progress" for actionable suggestions
- **Final Assessment**: Submit for overall quality score and comprehensive feedback
- **Structured Feedback**: Organized into 4 categories:
  - Structure (intro, body, conclusion)
  - Argument (thesis, main ideas, logic)
  - Grammar (spelling, punctuation, clarity)
  - Evidence (examples, support, credibility)
- **Modern UI**: Clean, student-friendly interface built with React and Tailwind CSS
- **Cost-Conscious**: AI feedback only when requested (not real-time)

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)

### Backend
- Node.js with Express
- OpenAI API (GPT-4o-mini for cost-effective feedback)
- CORS enabled for local development

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

## Setup Instructions

### 1. Clone or Navigate to the Project

```bash
cd AngiesEssays
```

### 2. Set Up the Backend

```bash
cd server
npm install

# Create .env file with your OpenAI API key
cp .env.example .env
# Edit .env and add your OpenAI API key:
# OPENAI_API_KEY=sk-your-key-here
```

### 3. Set Up the Frontend

```bash
cd ../client
npm install
```

### 4. Start the Application

**Terminal 1 - Start the backend server:**
```bash
cd server
npm start
```

The server will run on http://localhost:3001

**Terminal 2 - Start the frontend:**
```bash
cd client
npm run dev
```

The app will run on http://localhost:5173 (or another port if 5173 is busy)

### 5. Open the App

Open your browser and navigate to http://localhost:5173

## Usage

1. **Select Essay Type**: Choose from Narrative, Descriptive, Compare-and-Contrast, or Argumentative
2. **Pick a Topic**: Select a suggested topic or enter your own
3. **Write Your Essay**: Use the text editor to write your essay
4. **Check Progress**: Click "Check My Progress" (requires 50+ words) for feedback suggestions
5. **Make Improvements**: Review feedback and revise your essay
6. **Final Submission**: Click "Final Submission" (requires 100+ words) for overall assessment

## API Endpoints

### POST /api/feedback
Get feedback for an essay

**Request Body:**
```json
{
  "essayType": "narrative",
  "topic": "A Life-Changing Moment",
  "content": "Essay content here...",
  "isFinal": false
}
```

**Response (Progress Check):**
```json
{
  "categories": [
    {
      "category": "Structure",
      "suggestions": ["specific suggestion 1", "specific suggestion 2"]
    }
  ]
}
```

**Response (Final Submission):**
```json
{
  "overallScore": 85,
  "summary": "Your essay demonstrates...",
  "categories": [...]
}
```

### GET /api/health
Health check endpoint

## Project Structure

```
AngiesEssays/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── EssayTypeSelection.tsx
│   │   │   ├── TopicSelection.tsx
│   │   │   ├── EssayEditor.tsx
│   │   │   └── FeedbackDisplay.tsx
│   │   ├── data/
│   │   │   └── topics.ts  # Essay topics and type info
│   │   ├── types.ts       # TypeScript interfaces
│   │   ├── App.tsx        # Main app component
│   │   └── index.css      # Tailwind styles
│   └── package.json
│
├── server/                # Express backend
│   ├── index.js          # Server and OpenAI integration
│   ├── .env.example      # Environment template
│   └── package.json
│
└── README.md
```

## Cost Considerations

The app uses OpenAI's GPT-4o-mini model, which is cost-effective:
- Feedback is only generated when students click a button (not real-time)
- Progress checks and final submissions are separate API calls
- Average token usage per feedback: ~2000-3000 tokens
- Estimated cost per feedback: $0.001-0.002

## Development Notes

- The frontend runs on port 5173 (Vite default)
- The backend runs on port 3001
- CORS is enabled for local development
- All essay data is stored in client-side state (no database required)

## Future Enhancements

- Save essay progress to localStorage
- Essay history and progress tracking
- Additional essay types (Expository, Persuasive)
- Export essays to PDF
- Teacher dashboard for monitoring student progress
- Plagiarism detection
- Citation checker

## Troubleshooting

### "Failed to get feedback" Error
- Ensure the backend server is running on port 3001
- Check that your OpenAI API key is correctly set in server/.env
- Verify you have internet connection

### Tailwind Styles Not Loading
- Make sure you ran `npm install` in the client directory
- Check that tailwind.config.js and postcss.config.js exist
- Restart the dev server

### Port Already in Use
- Frontend: Vite will automatically use the next available port
- Backend: Change PORT in server/.env to use a different port

## License

MIT

## Support

For issues or questions, please contact the development team.

Set up your OpenAI API key:
cd server
cp .env.example .env
# Edit .env and add: OPENAI_API_KEY=sk-your-key-here
Start the backend (Terminal 1):
cd server
npm start
Start the frontend (Terminal 2):
cd client
npm run dev
Open http://localhost:5173 in your browser

Stop the dev server (Ctrl+C)
Clear the cache and restart:
cd client
rm -rf node_modules/.vite
npm run dev