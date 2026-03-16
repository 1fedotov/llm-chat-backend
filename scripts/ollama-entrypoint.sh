#!/bin/bash

# 1. Start Ollama in the background
ollama serve &

# 2. Wait for Ollama to be ready (it can take a few seconds to start the API)
echo "Waiting for Ollama server..."
while ! ollama list > /dev/null 2>&1; do
  sleep 2
done

# 3. Pull the model you need (Change 'gemma3:270m' to your model of choice)
echo "Ollama is awake! Pulling model: ${OLLAMA_MODEL:-gemma3:270m}"
ollama pull ${OLLAMA_MODEL:-gemma3:270m}

echo "Warming up the model..."
ollama run ${OLLAMA_MODEL:-gemma3:270m} "hi" > /dev/null

# 4. Bring the Ollama process back to the foreground so the container stays alive
wait $!