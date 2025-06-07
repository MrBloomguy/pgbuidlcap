// agent-server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.AGENT_PORT || 4001;

app.use(cors());
app.use(bodyParser.json());

// Example endpoint for Buidl AI agent chat
app.post('/api/agent/ask', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    // Forward the message to the Eliza agent service
    const elizaRes = await fetch('http://localhost:8000/agent/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await elizaRes.json();
    // Assume Eliza returns { reply: ... }
    res.json({ reply: data.reply });
  } catch (err) {
    res.status(500).json({ reply: "Sorry, Buidl AI is temporarily unavailable." });
  }
});

app.get('/', (req, res) => {
  res.send('Buidl AI Agent backend is running.');
});

app.listen(PORT, () => {
  console.log(`Buidl AI Agent backend running on port ${PORT}`);
});
