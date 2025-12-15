require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ESSAY_TYPE_CONTEXT = {
  narrative: 'a narrative essay that tells a story from personal experience',
  descriptive: 'a descriptive essay that uses sensory details to paint a vivid picture',
  'compare-contrast': 'a compare-and-contrast essay that analyzes similarities and differences',
  argumentative: 'an argumentative essay that takes a position and supports it with evidence',
};

app.post('/api/feedback', async (req, res) => {
  try {
    const { essayType, topic, content, isFinal } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Essay content is required' });
    }

    const essayContext = ESSAY_TYPE_CONTEXT[essayType] || 'an essay';
    const feedbackType = isFinal ? 'comprehensive final assessment' : 'progress feedback';

    const systemPrompt = `You are an experienced high school English teacher providing ${feedbackType} for ${essayContext}.

Your feedback should be:
- Encouraging and constructive
- Specific and actionable (e.g., "Add a transition sentence between paragraphs 2 and 3" rather than "improve transitions")
- Appropriate for high school students
- Focused on helping students improve their writing skills

Provide feedback in exactly 4 categories:
1. Structure (introduction, body paragraphs, conclusion, organization)
2. Argument (thesis, main ideas, logical flow, persuasiveness)
3. Grammar (spelling, punctuation, sentence structure, clarity)
4. Evidence (examples, details, support for claims, credibility)

For each category, provide 2-3 specific, actionable suggestions.

${isFinal ? 'Also provide an overall score from 0-100 and a brief encouraging summary (2-3 sentences) of the essay\'s strengths and areas for growth.' : ''}

Respond in JSON format:
${isFinal ? `{
  "overallScore": 85,
  "summary": "Your essay shows strong...",
  "categories": [
    {
      "category": "Structure",
      "suggestions": ["specific suggestion 1", "specific suggestion 2"]
    },
    ...
  ]
}` : `{
  "categories": [
    {
      "category": "Structure",
      "suggestions": ["specific suggestion 1", "specific suggestion 2", "specific suggestion 3"]
    },
    ...
  ]
}`}`;

    const userPrompt = `Essay Type: ${essayType}
Topic: ${topic}

Essay Content:
${content}

Please provide ${feedbackType} for this student's essay.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const feedback = JSON.parse(completion.choices[0].message.content);

    res.json(feedback);
  } catch (error) {
    console.error('Error generating feedback:', error);
    res.status(500).json({
      error: 'Failed to generate feedback',
      message: error.message,
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AngieWrites API is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AngieWrites server running on port ${PORT}`);
  console.log(`📝 API endpoint: /api/feedback`);

  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  WARNING: OPENAI_API_KEY not found in environment variables');
  }
});
