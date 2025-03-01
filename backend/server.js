// server.js (on your backend)
const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle AI assistant queries
app.post('/api/assistant', (req, res) => {
  const { message, history } = req.body;
  
  // Spawn Python process to run rag_n_roll.py
  const pythonProcess = spawn('python', ['rag_n_roll.py', '--query', message]);
  
  let responseData = '';
  
  pythonProcess.stdout.on('data', (data) => {
    responseData += data.toString();
  });
  
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python error: ${data}`);
  });
  
  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Error processing your request' });
    }
    
    try {
      const parsedData = JSON.parse(responseData);
      res.json({
        message: parsedData.response,
        repairGuides: parsedData.guides || [],
        tools: parsedData.tools || [],
        difficulty: parsedData.difficulty
      });
    } catch (error) {
      res.status(500).json({ error: 'Error parsing response from AI service' });
    }
  });
});

// Endpoint to search for repair guides
app.post('/api/search', (req, res) => {
  const { query } = req.body;
  
  // Spawn Python process to run snowflake script for search
  const pythonProcess = spawn('python', ['copy_of_snowflake_4_(1).py', '--search', query]);
  
  let responseData = '';
  
  pythonProcess.stdout.on('data', (data) => {
    responseData += data.toString();
  });
  
  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Error searching for guides' });
    }
    
    try {
      const guides = JSON.parse(responseData);
      res.json(guides);
    } catch (error) {
      res.status(500).json({ error: 'Error parsing search results' });
    }
  });
});

// Endpoint to get a specific repair guide
app.get('/api/guides/:id', (req, res) => {
  const { id } = req.params;
  
  // Spawn Python process to get guide details
  const pythonProcess = spawn('python', ['copy_of_snowflake_4_(1).py', '--guide', id]);
  
  let responseData = '';
  
  pythonProcess.stdout.on('data', (data) => {
    responseData += data.toString();
  });
  
  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Error fetching guide details' });
    }
    
    try {
      const guide = JSON.parse(responseData);
      res.json(guide);
    } catch (error) {
      res.status(500).json({ error: 'Error parsing guide details' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
