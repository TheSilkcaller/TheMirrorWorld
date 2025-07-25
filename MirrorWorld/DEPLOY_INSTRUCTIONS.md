# 🔥 Deploy EchoGPT Firebase Proxy

## Copy these files to your computer:

1. Copy the `firebase-functions/` folder to your computer
2. Copy the `firebase.json` file to your computer

## Run these commands in your terminal:

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Create Firebase Project
```bash
firebase projects:create echogpt-proxy-2025
```

### 4. Initialize in your project folder
```bash
firebase init
# Choose "Functions" 
# Select "Use an existing project" → echogpt-proxy-2025
# Choose JavaScript
# Choose Yes for ESLint
# Choose Yes to install dependencies
```

### 5. Set your OpenAI API key
```bash
firebase functions:config:set openai.key="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"
```

### 6. Deploy the function
```bash
firebase deploy --only functions
```

### 7. Get your URL
After deployment, you'll see something like:
```
https://us-central1-echogpt-proxy-2025.cloudfunctions.net/echo
```

### 8. Update your widget
Replace this line in your EchoGPT widget:
```javascript
fetch("/api/echo", {
```

With:
```javascript
fetch("https://us-central1-echogpt-proxy-2025.cloudfunctions.net/echo", {
```

## Test it!
Your EchoGPT should now work with beautiful fallback responses even when OpenAI APIs are down!

## Alternative: Keep using current fallbacks
Your current setup now has beautiful fallback responses that work immediately without Firebase. The widget will give meaningful wisdom responses right now!
