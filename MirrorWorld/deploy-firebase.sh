#!/bin/bash

echo "🔥 Setting up Firebase for EchoGPT..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "Installing Firebase CLI..."
    npm install -g firebase-tools
fi

# Login to Firebase
echo "Please login to Firebase..."
firebase login

# Initialize project (if not already done)
if [ ! -f "firebase.json" ]; then
    echo "Initializing Firebase project..."
    firebase init functions
fi

# Set OpenAI API key
echo "Setting OpenAI API key..."
firebase functions:config:set openai.key="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"

# Install dependencies
echo "Installing dependencies..."
cd firebase-functions
npm install
cd ..

# Deploy functions
echo "Deploying Firebase functions..."
firebase deploy --only functions

echo "✨ Firebase deployment complete!"
echo "Your EchoGPT proxy URL will be shown above."
echo "Update your widget to use the new URL."
