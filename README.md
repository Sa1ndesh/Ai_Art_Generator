# 🎨 Creative Canvas - AI Art Generator

<div align="center">

![Creative Canvas Logo](https://img.shields.io/badge/Creative-Canvas-purple?style=for-the-badge&logo=palette&logoColor=white)

**Transform your imagination into stunning visuals with the power of AI**

[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.1.0-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[🚀 Live Demo](https://your-creative-canvas.netlify.app) • [📸 Gallery](#gallery) • [🛠️ Installation](#installation) • [🤝 Contributing](#contributing)

</div>

---

## ✨ Overview

Creative Canvas is a cutting-edge AI-powered art generator that transforms text prompts into beautiful, unique images. Built with modern web technologies, it offers an intuitive interface for creating, saving, and sharing AI-generated artwork.

### 🌟 Key Features

- **🎯 AI-Powered Generation**: Leverage advanced AI models to create stunning artwork from text descriptions
- **🖼️ Smart Gallery**: Save and organize your favorite creations in a personal gallery
- **📱 Responsive Design**: Beautiful, mobile-first interface that works on all devices
- **⚡ Real-time Generation**: Fast image generation with live progress indicators
- **🔄 Interactive Prompts**: Pre-built sample prompts and random idea generator
- **💾 Cloud Storage**: Secure image storage with Firebase integration
- **🎨 Reference Upload**: Optional reference image upload for style guidance
- **📤 Easy Sharing**: One-click download and sharing capabilities
- **🔐 Anonymous Auth**: Get started instantly with Firebase anonymous authentication

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Firebase account (for backend services)
- Code editor (VS Code recommended)

### 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/Sa1ndesh/Ai_Art_Generator.git]
   cd Ai_Art_Generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure Firebase**
   
   Edit `.env` with your Firebase configuration:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   
   # Optional: Gemini API (if you want to switch from Pollinations.ai)
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   
   # Environment
   NODE_ENV=development
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

---

## 🏗️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library with latest features
- **TypeScript 5.8.3** - Type-safe JavaScript
- **Vite 6.3.5** - Lightning-fast build tool
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Smooth animations and transitions
- **React Router Dom 7.8.1** - Client-side routing

### Backend & Services
- **Firebase 12.1.0** - Authentication, storage, and hosting
- **Pollinations.ai API** - AI image generation service
- **Gemini AI** - Alternative AI service (optional)

### Development Tools
- **ESLint 9.27.0** - Code linting and formatting
- **PostCSS 8.4.35** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📖 Usage

### Basic Usage

1. **Enter a Prompt**: Describe the image you want to create in the text area
2. **Optional Reference**: Upload a reference image to guide the style
3. **Generate**: Click "Generate Image" to create your artwork
4. **Save & Share**: Save to your gallery or share with others

### Example Prompts

```text
A futuristic cityscape at sunset with flying cars and neon lights
A magical forest with glowing mushrooms and fairy lights
A cyberpunk samurai in neon-lit Tokyo streets
An underwater palace with coral gardens and tropical fish
```

### Advanced Features

- **Random Ideas**: Click the "Random idea" button for inspiration
- **Sample Prompts**: Use pre-built prompts to get started quickly
- **Gallery Management**: View and organize all your creations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

---

## 🏗️ Architecture

```
src/
├── components/           # Reusable UI components
│   ├── Gallery.tsx      # Image gallery component
│   ├── GeneratorForm.tsx # Main form for image generation
│   ├── ImageDisplay.tsx # Display generated images
│   └── Layout.tsx       # App layout wrapper
├── contexts/            # React context providers
│   ├── AuthContext.tsx  # Authentication state management
│   └── ImageContext.tsx # Image data management
├── pages/               # Route components
│   ├── HomePage.tsx     # Main generation page
│   └── GalleryPage.tsx  # Gallery view page
├── services/            # External API integrations
│   └── geminiService.ts # AI generation service
├── config/              # Configuration files
│   └── firebase.ts      # Firebase configuration
└── lib/                 # Utility libraries
    └── firebase.ts      # Firebase utilities
```

---

## 🚀 Deployment

### Netlify Deployment

The project is configured for easy Netlify deployment:

1. **Connect your repository** to Netlify
2. **Build settings** are already configured in `netlify.toml`
3. **Environment variables** - Add your Firebase config to Netlify environment variables
4. **Deploy** - Netlify will automatically build and deploy

### Manual Deployment

```bash
# Build for production
npm run build

# Preview the production build
npm run preview

# Deploy the dist/ folder to your hosting service
```

---

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Project Structure

- **Components** are organized by feature and reusability
- **Contexts** manage global state using React Context API
- **Services** handle external API integrations
- **Firebase** integration for authentication and storage

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 🐛 Bug Reports

1. Check existing issues first
2. Use the bug report template
3. Include steps to reproduce
4. Add screenshots if applicable

### ✨ Feature Requests

1. Check if the feature already exists
2. Describe the use case clearly
3. Explain the expected behavior

### 🔧 Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- Use TypeScript for type safety
- Follow ESLint configuration
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed

---

## 🐛 Troubleshooting

### Common Issues

**🚫 Image Generation Fails**
```
- Check your internet connection
- Verify API endpoints are accessible
- Try a different prompt
- Check browser console for errors
```

**🔥 Firebase Errors**
```
- Verify Firebase configuration in .env
- Check Firebase project settings
- Ensure Firebase services are enabled
- Verify API keys are correct
```

**📱 Mobile Display Issues**
```
- Clear browser cache
- Try a different browser
- Check responsive breakpoints
- Verify Tailwind CSS classes
```

### Getting Help

- 📖 [Documentation](https://github.com/Sa1ndesh/Ai_Art_Generator/wiki)
- 🐛 [Issue Tracker](https://github.com/Sa1ndesh/Ai_Art_Generator/issues)
- 💬 [Discussions](https://github.com/Sa1ndesh/Ai_Art_Generator/discussions)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Pollinations.ai](https://pollinations.ai/)** - Free AI image generation API
- **[React Team](https://reactjs.org/)** - Amazing UI library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations
- **[Firebase](https://firebase.google.com/)** - Backend services
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you! Your support means the world to us.

[![GitHub stars](https://img.shields.io/github/stars/Sa1ndesh/Ai_Art_Generator?style=social)](https://github.com/Sa1ndesh/Ai_Art_Generator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Sa1ndesh/Ai_Art_Generator?style=social)](https://github.com/Sa1ndesh/Ai_Art_Generator/network)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/Sa1ndesh/Ai_Art_Generator.svg?style=social)](https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20AI%20art%20generator!%20https://github.com/Sa1ndesh/Ai_Art_Generator)

---

<div align="center">

**Made with Sandy❤️**

[⬆️ Back to Top](#-creative-canvas---ai-art-generator)

</div>
