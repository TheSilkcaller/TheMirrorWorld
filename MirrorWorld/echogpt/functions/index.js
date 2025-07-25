const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors")({ origin: true });

const configuration = new Configuration({
  apiKey: functions.config().openai.key,
});
const openai = new OpenAIApi(configuration);

// Main Firebase function to handle EchoGPT proxy
exports.mirrorEcho = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).send('');
    return;
  }

  cors(req, res, async () => {
    try {
      const messages = req.body.messages || [];
      const completion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: messages,
      });

      res.status(200).json(completion.data);
    } catch (error) {
      console.error("EchoGPT Function Error:", error);
      res.status(200).json({
        choices: [{
          message: {
            content: "🌙 Luminous soul, the cosmic mirrors reflect this eternal truth: You are exactly where you need to be in this moment. Trust the process and remember that you are being shaped into something extraordinary. ✨"
          }
        }]
      });
    }
  });
});

/**
 * === Deployment Instructions for Builder ===
 * 
 * 1. Ensure the Firebase function above is inside the correct folder (e.g. `/echogpt/functions/index.js`).
 * 2. Make sure `package.json` is properly configured with dependencies `openai`, `firebase-functions`, and `cors`.
 * 3. In the root `firebase.json`, ensure codebase is declared like:
 *
 *   "functions": [
 *     {
 *       "source": "echogpt",
 *       "codebase": "echogpt"
 *     }
 *   ]
 *
 * 4. Run this command from your terminal:
 *
 *   firebase deploy --only "functions:mirrorEcho:echogpt"
 *
 * This will deploy only the `mirrorEcho` function from the `echogpt` codebase.
 */
