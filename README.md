# Juici - AI-Powered Idea Generator

> "Get the juices warmed up creatively. Kobe Bryant didn't just walk into Staples Center at game time, you shouldn't just show up to innovate. Get juiced."

A vibrant, juice-themed idea generator that helps developers and creatives overcome analysis paralysis by providing project inspiration.

![Juici App Screenshot](https://via.placeholder.com/800x400?text=Juici+App+Screenshot)

## Features

- Generates random project ideas from a curated list of 50 prompts
- Create professional-grade Product Requirements Documents (PRDs) with AI
- Fresh, modern UI with a juice theme (purple, green, and yellow color scheme)
- Animated hero section with liquid animations
- Copy-to-clipboard functionality for easy use

## Live Demo

Visit [juici.space](https://juici.space) to see the live application.

## Tech Stack

- **Frontend**: React with TypeScript, Styled Components, Framer Motion for animations
- **Backend**: Node.js with Express
- **Data**: Static JSON file containing 50 creative project prompts
- **AI Integration**: OpenAI API for generating detailed PRDs

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- OpenAI API key

### Environment Setup

1. Clone this repository
   ```
   git clone https://github.com/yourusername/juici.git
   cd juici
   ```

2. Set up environment variables
   ```
   cd backend
   cp .env.example .env
   ```
   
3. Edit the `.env` file and add your OpenAI API key
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Installing Dependencies

#### Backend
```
cd backend
npm install
```

#### Frontend
```
cd frontend
npm install
```

### Running Locally

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

The application will be available at http://localhost:3000

## Deployment

### GitHub Pages Deployment

This project is set up to deploy to GitHub Pages using GitHub Actions. When you push to the main branch, it will automatically deploy to your custom domain (if configured).

### Custom Domain Setup

1. In your DNS provider, add an A record pointing to GitHub Pages IP addresses:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

2. Also add a CNAME record:
   ```
   Name: www or subdomain
   Value: yourusername.github.io
   ```

3. Make sure the CNAME file is in the `frontend/public` directory with your domain name.

## Environment Variables

To run this project, you need to set up the following environment variables in a `.env` file in the backend directory:

- `OPENAI_API_KEY`: Your OpenAI API key for generating PRDs
- `PORT` (optional): The port number for the backend server (defaults to 5555)

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