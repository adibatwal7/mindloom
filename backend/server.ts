require('dotenv').config();
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

app.use(cors());
app.use(express.json());

// Main session ingest endpoint
app.post('/api/sessions', async (req, res) => {
  const { metrics, engagementScore, totalTime } = req.body;

  // Scoring logic heuristic based on MVP constraints
  let scoreCategory = 'Low';
  let reportString = "The session indicates typical response times and engagement.";

  // Very naive logic to prove MVP concept
  if (metrics.correctAnswers < 2 || engagementScore < 30) {
    scoreCategory = 'Elevated';
    if (!CLAUDE_API_KEY || CLAUDE_API_KEY === 'your_api_key_here') {
      reportString = "During the session, the child exhibited lower engagement or delayed responses for given tasks. Although this is just an early support indicator, you may want to consult a specialist.";
    }
  } else if (metrics.correctAnswers < 3 || engagementScore < 60) {
    scoreCategory = 'Moderate';
    if (!CLAUDE_API_KEY || CLAUDE_API_KEY === 'your_api_key_here') {
      reportString = "The child completed the tasks but showed some variability in engagement and reaction times.";
    }
  }

  // Optional: Generate report via OpenAI API if key is present
  if (CLAUDE_API_KEY && CLAUDE_API_KEY !== 'your_api_key_here') {
    try {
      // Use OpenAI API since the provided key is an OpenAI key
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CLAUDE_API_KEY.trim()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{
            role: 'user',
            content: `Write an empathetic 2 sentence summary for a parent. The child's screening score was ${scoreCategory}. Metrics: Accuracy: ${metrics.correctAnswers}/3, Engagement: ${engagementScore}/100. Keep it reassuring, note this is not a diagnosis.`
          }]
        })
      });
      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        reportString = data.choices[0].message.content;
      } else {
        console.error("OpenAI API Response Error:", data);
        reportString = `API Error: Could not generate response with OpenAI.`;
      }
    } catch (error) {
      console.error("OpenAI API Error:", error);
    }
  }

  return res.json({
    success: true,
    data: {
      scoreCategory,
      metrics: {
        accuracy: `${Math.round((metrics.correctAnswers / 3) * 100)}%`,
        averageResponseTime: `${(metrics.totalResponseTime / 3).toFixed(1)}s`,
        engagementLevel: engagementScore > 70 ? 'High' : (engagementScore > 30 ? 'Moderate' : 'Low')
      },
      report: reportString
    }
  });
});

export default app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Backend securely running on port ${PORT}`);
  });
}
