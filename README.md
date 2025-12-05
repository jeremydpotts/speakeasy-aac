# 🗣️ SpeakEasy AAC

**Free, open-source communication app for nonverbal individuals**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

## 🎯 Mission

> *Every voice deserves to be heard.*

SpeakEasy AAC is a free, open-source Augmentative and Alternative Communication (AAC) app designed primarily for nonverbal autistic children and their families. Commercial AAC apps cost $250-400+, creating barriers for families who need these essential tools. We believe communication is a human right that shouldn't have a price tag.

## ✨ Features

### Core Features (MVP)
- **🖼️ Symbol-Based Communication** - Tap pictures to speak words
- **🔊 Text-to-Speech** - High-quality speech synthesis
- **📂 Category Navigation** - Organized vocabulary by topics
- **📴 Offline Support** - Works without internet after first load
- **⚙️ Customizable** - Adjust grid size, voice, and theme
- **📱 Cross-Platform** - Works on any device with a browser

### Coming Soon
- 📝 Sentence building
- 📷 Custom image upload
- 📅 Visual schedules
- 👥 Multiple user profiles
- ☁️ Cloud backup

## 🚀 Quick Start

### Use Online
Visit: **[speakeasy-aac.app](https://speakeasy-aac.app)** *(coming soon)*

The app works in any modern browser and can be installed as a PWA on your device.

### Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/speakeasy-aac.git
cd speakeasy-aac

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 📖 Documentation

- [📊 Market Research](./docs/RESEARCH.md)
- [📋 Product Requirements](./docs/PRD.md)
- [🏗️ Technical Architecture](./docs/ARCHITECTURE.md)
- [📅 Development Plan](./docs/DEVELOPMENT_PLAN.md)
- [📝 Development Log](./docs/DEV_LOG.md)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| State | Zustand |
| Storage | IndexedDB (Dexie.js) |
| TTS | Web Speech API |
| PWA | Workbox |
| Symbols | ARASAAC (CC BY-NC-SA) |

## 🎨 Screenshots

*Coming soon*

## 🤝 Contributing

We welcome contributions from developers, designers, speech-language pathologists, and families!

### Ways to Contribute
- 🐛 Report bugs and issues
- 💡 Suggest features
- 🌍 Help with translations
- 📖 Improve documentation
- 💻 Submit pull requests

### Development Setup

```bash
# Fork and clone the repo
git clone https://github.com/YOUR_USERNAME/speakeasy-aac.git
cd speakeasy-aac

# Install dependencies
npm install

# Create a branch for your feature
git checkout -b feature/your-feature-name

# Make your changes, then commit
git add -A
git commit -m "Add your feature"

# Push and create a PR
git push origin feature/your-feature-name
```

### Code Style
- We use ESLint and Prettier for code formatting
- Run `npm run lint` before committing
- Write TypeScript with strict mode
- Add tests for new features

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Symbol Attribution
Symbols used in this app are from [ARASAAC](https://arasaac.org/), licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

> Pictograms author: Sergio Palao. Origin: ARASAAC (http://www.arasaac.org). License: CC (BY-NC-SA). Owner: Government of Aragón (Spain)

## 🙏 Acknowledgments

- [ARASAAC](https://arasaac.org/) for the incredible free symbol library
- [CBoard](https://www.cboard.io/) for inspiration and the open-source AAC movement
- All the families, SLPs, and educators who provided feedback
- The open-source community

## 📞 Contact

- **Issues:** [GitHub Issues](https://github.com/YOUR_USERNAME/speakeasy-aac/issues)
- **Discussions:** [GitHub Discussions](https://github.com/YOUR_USERNAME/speakeasy-aac/discussions)
- **Email:** speakeasy.aac@example.com *(placeholder)*

---

<p align="center">
  Made with ❤️ for families who need it most
</p>

<p align="center">
  <a href="#-speakeasy-aac">Back to top</a>
</p>

