const express = require('express');
const path = require('path');

const app = express();
app.use(express.json({ limit: '25mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Proxy to Google Gemini API — key stays server-side
app.post('/api/gemini', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not configured on server.' });
  }

  const { prompt, images } = req.body;

  // Build Gemini content parts
  const parts = [];

  // Add images first (if any)
  if (images && Array.isArray(images)) {
    for (const img of images) {
      parts.push({
        inline_data: {
          mime_type: img.mimeType,
          data: img.data
        }
      });
    }
  }

  // Add text prompt
  parts.push({ text: prompt });

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1200,
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || `Gemini error ${response.status}`
      });
    }

    // Extract text from Gemini response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.json({ text });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✨ BUSANA (Gemini) running at http://localhost:${PORT}\n`);
});
