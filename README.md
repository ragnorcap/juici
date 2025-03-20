# Juici - AI-Powered Idea Generator

> "Get the juices warmed up creatively. Kobe Bryant didn't just walk into Staples Center at game time, you shouldn't just show up to innovate. Get juiced."

A vibrant, juice-themed idea generator that helps developers and creatives overcome analysis paralysis by providing project inspiration.

<img width="1440" alt="Juici App Screenshot" src="https://github.com/user-attachments/assets/771bc946-86e6-4824-97aa-85396c4af473" />

## Features

- ✨ Generates random project ideas from a curated list of 50 prompts
- 📝 Creates professional-grade Product Requirements Documents (PRDs) with AI
- 🎨 Fresh, modern UI with a juice theme (purple, green, and yellow color scheme)
- 💧 Animated hero section with liquid animations and bubble effects
- 📋 Copy-to-clipboard functionality for easy use
- 🔐 User authentication through Supabase to save favorite ideas
- 💾 Store and manage your favorite project ideas

## Live Demo

Visit [juici.space](https://juici.space) to see the live application.

## Tech Stack

- **Frontend**: React with TypeScript, Styled Components, Framer Motion for animations
- **Backend**: Node.js with Express, TypeScript
- **Database**: Supabase for authentication and data storage
- **Data**: Static JSON file containing 50 creative project prompts
- **AI Integration**: OpenAI API for generating detailed PRDs
- **Deployment**: Vercel for hosting the full-stack application

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- OpenAI API key
- Supabase account and project

### Environment Setup

1. Clone this repository
   ```
   git clone https://github.com/ragnorcap/juici.git
   cd juici
   ```

2. Set up environment variables
   ```
   cp .env.example .env
   ```
   
3. Edit the `.env` file and add your API keys
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_KEY=your_supabase_anon_key_here
   SUPABASE_SECRET=your_supabase_service_role_key_here
   ```

### Installing Dependencies

```
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..
```

### Running Locally

The easiest way to run the project locally is using the provided script:

```
npm run dev
```

This will concurrently run:
- Backend: http://localhost:5555
- Frontend: http://localhost:3000

Alternatively, you can run them separately:

#### Backend
```
cd backend
npm run dev
```

#### Frontend
```
cd frontend
npm start
```

## Deployment

### Vercel Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure the following build settings:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `frontend/build`
   - **Install Command**: `npm install`
4. Add environment variables in the Vercel dashboard:
   - `OPENAI_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `SUPABASE_SECRET`
5. Deploy and configure your custom domain if desired

## Project Structure

```
juici/
├── .github/            # GitHub Actions workflows
├── backend/            # Express backend
│   ├── src/            # TypeScript source files
│   │   ├── index.ts    # Main server file
│   │   └── lib/        # Backend libraries
├── data/               # Data files
│   └── prompts.json    # Project idea prompts
├── frontend/           # React frontend
│   ├── public/         # Static files
│   └── src/            # React components and styles
├── .env.example        # Example environment variables
├── vercel.json         # Vercel deployment configuration
└── package.json        # Root package.json for scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the challenge of overcoming creative blocks
- OpenAI for providing the API that powers the PRD generation
- The React community for the tools and libraries that make this possible
- Supabase for the authentication and database services
