const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors")({ origin: true });

const configuration = new Configuration({
  apiKey: functions.config().openai.key,
});
const openai = new OpenAIApi(configuration);

exports.mirrorEcho = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.status(200).send('');
      return;
    }

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
