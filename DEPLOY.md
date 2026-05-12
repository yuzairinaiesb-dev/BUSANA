# BUSANA — Free Deployment Guide (Google Gemini)
# Zero cost · No credit card needed

---

## STEP 1 — Get your FREE Gemini API key (2 min)

1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API key"
4. Copy the key (looks like: AIzaSy...)

That's it — FREE, no credit card, generous daily quota.

---

## STEP 2 — Put the code on GitHub (2 min)

1. Go to: https://github.com/new
2. Repository name: busana
3. Set to Public
4. Click "Create repository"
5. Upload all files from this folder (drag & drop)

---

## STEP 3 — Deploy FREE on Render.com (3 min)

1. Go to: https://render.com (sign up free)
2. Click "New +" → "Web Service"
3. Connect GitHub → select "busana" repo
4. Fill in these settings:
   - Name: busana
   - Runtime: Node
   - Build Command: npm install
   - Start Command: node server.js
5. Scroll to "Environment Variables" → click "Add Variable":
   - Key:   GEMINI_API_KEY
   - Value: (paste your AIzaSy... key here)
6. Click "Create Web Service"
7. Wait ~2 minutes to build

Your live URL: https://busana.onrender.com (or similar)

---

## STEP 4 — Open on your phone

1. Open the URL in your phone's browser
2. iPhone: tap Share icon → "Add to Home Screen"
3. Android: tap browser menu → "Add to Home Screen"

BUSANA installs as a full-screen app — no App Store needed!

---

## Gemini Free Tier Limits
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per day
- No credit card required

More than enough for demos and client presentations!

---

## Troubleshooting
- "quota exceeded" → wait 1 minute and try again
- "API key invalid" → check the key in Render environment variables
- App not loading → check Render logs for errors

## Questions?
The app stores garments in the browser's localStorage.
Garments persist between sessions on the same device/browser.
