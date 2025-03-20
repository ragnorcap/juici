#!/bin/bash

# Display banner
echo "=================================="
echo "🧃 JUICI - Idea Generator & PRD Creator"
echo "=================================="

# Function to handle script exit
cleanup() {
  echo "Shutting down services..."
  kill $(jobs -p)
  exit 0
}

# Set up trap for clean shutdown
trap cleanup SIGINT SIGTERM

# Check for dependencies
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed"
    exit 1
fi

# Navigate to the project root directory
cd "$(dirname "$0")"

# Check for environment variables
if [ ! -f backend/.env ]; then
  echo "⚠️  Warning: No .env file found in backend directory"
  echo "   Create a .env file based on .env.example for full functionality"
else 
  echo "✅ Environment variables loaded"
fi

echo "🔍 Checking for dependencies..."
# Ensure dependencies are installed
if [ ! -d node_modules ]; then
  echo "📦 Installing root dependencies..."
  npm install
fi

if [ ! -d frontend/node_modules ]; then
  echo "📦 Installing frontend dependencies..."
  cd frontend && npm install && cd ..
fi

if [ ! -d backend/node_modules ]; then
  echo "📦 Installing backend dependencies..."
  cd backend && npm install && cd ..
fi

echo "🚀 Starting Juici..."
# Run the servers in parallel
cd frontend && npm start & FRONTEND_PID=$!
cd backend && npm run dev & BACKEND_PID=$!

echo "💻 Frontend running at http://localhost:3000"
echo "🔌 Backend API running at http://localhost:5555"
echo "🔄 Press Ctrl+C to stop all services"

# Wait for all background processes to finish
wait 