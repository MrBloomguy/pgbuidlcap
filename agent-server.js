// agent-server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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

  // TODO: Integrate with OpenAI or custom logic here
  // For now, echo the message with a canned response
  let reply = "I'm Buidl AI. You said: " + message + "\n\n(This is a placeholder. Connect me to OpenAI or your own logic!)";

  // Example: if the user asks about grants
  if (/grant|fund|public good/i.test(message)) {
    reply = "Here are some public goods grant programs you can explore: Gitcoin Grants, Optimism RetroPGF, and more! (This is a placeholder.)";
  }

  res.json({ reply });
});

app.get('/', (req, res) => {
  res.send('Buidl AI Agent backend is running.');
});

app.listen(PORT, () => {
  console.log(`Buidl AI Agent backend running on port ${PORT}`);
});
