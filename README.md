<div align="center">

<img src="public/favicon.svg" width="80" height="80" alt="PassForge Logo" />

# PassForge

### Next-Gen Secure Password Generator

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-pass--forge--six.vercel.app-7c3aed?style=for-the-badge&logoColor=white)](https://pass-forge-six.vercel.app/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

**PassForge** is a production-ready, premium password generator built with React + Vite + Tailwind CSS.  
Cryptographically secure. Fully client-side. Stunningly beautiful.

<br/>

> 🔐 **Zero data stored. Zero server calls. 100% private.**

</div>

---

## ✨ Features

- **🔐 Cryptographically Secure** — Powered by the native `window.crypto.getRandomValues()` Web Crypto API, not `Math.random()`
- **⚡ Instant Generation** — Passwords generate in real-time as you adjust any setting
- **📊 Strength Meter** — Live 4-segment animated strength bar with color transitions (Weak → Fair → Strong → Unbreakable)
- **🎨 Character Color Coding** — Each character type is color-highlighted: purple for uppercase, cyan for numbers, pink for symbols
- **📋 One-Click Copy** — Copy to clipboard with ripple animation and success feedback
- **🔢 Entropy Display** — Real-time entropy bits calculation so you understand your password's true strength
- **⏱️ Crack Time Estimate** — Instant visual indicator of how long it would take to brute-force
- **📱 Fully Responsive** — Flawless on mobile, tablet, and desktop
- **🌌 Premium UI** — Deep space dark theme with animated starfield, floating orbs, glassmorphism cards
- **🚫 Zero Dependencies** — No external libraries, no tracking, no ads

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 18.2 | UI framework |
| [Vite](https://vitejs.dev/) | 5.0 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Utility-first styling |
| [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) | Native | Cryptographic randomness |
| [Google Fonts](https://fonts.google.com/) | — | Outfit + Fira Code typography |

---

## 📁 Project Structure

```
passforge/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Background.jsx       # Animated starfield, orbs, grid
│   │   ├── Controls.jsx         # Length slider + character toggles
│   │   ├── GithubButton.jsx     # GitHub profile link button
│   │   ├── PasswordDisplay.jsx  # Password box with copy + regen
│   │   ├── StatsRow.jsx         # Entropy, char count, crack time
│   │   └── StrengthMeter.jsx    # Animated 4-segment strength bar
│   ├── utils/
│   │   └── generatePassword.js  # Crypto-secure generation logic
│   ├── App.jsx                  # Root app component
│   ├── index.css                # Global styles + Tailwind layers
│   └── main.jsx                 # React entry point
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) — v18 or higher
- npm — v8 or higher

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Armaan582/passforge.git
cd passforge
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The optimized build output will be in the `dist/` folder.

**Preview the production build locally:**

```bash
npm run preview
```

---

## 🔒 How It Works

PassForge uses the browser's built-in **Web Crypto API** (`window.crypto.getRandomValues()`) to generate truly random passwords — not pseudo-random values from `Math.random()`.

### Generation Algorithm

1. Build a character pool from the selected types (uppercase, lowercase, numbers, symbols)
2. Guarantee at least **one character from each enabled type** is included
3. Fill remaining slots with random characters from the full pool
4. Apply a **cryptographic Fisher-Yates shuffle** to eliminate positional bias
5. Calculate entropy as `length × log₂(poolSize)` bits

### Entropy Reference

| Pool | Pool Size | 16-char entropy |
|---|---|---|
| Lowercase only | 26 | ~75 bits |
| Lower + Upper + Numbers | 62 | ~95 bits |
| All types | 92 | ~104 bits |

> A password with **80+ bits** of entropy is considered secure against brute-force attacks with current computing power.

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Background | `#03010a` | Page base |
| Surface | `#0d0a1a` | Cards |
| Accent Purple | `#b06ef3` | Primary accent, toggles |
| Accent Cyan | `#6e9ef5` | Secondary accent |
| Strength Red | `#ff4d6d` | Weak passwords |
| Strength Yellow | `#ffcc00` | Fair passwords |
| Strength Green | `#00e5a0` | Strong passwords |
| Font Display | Outfit | Headings, UI labels |
| Font Mono | Fira Code | Password display |

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Armaan582/passforge)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repository
4. Framework preset will auto-detect as **Vite**
5. Click **Deploy** — done!

### Deploy to Netlify

```bash
npm run build
# Drag the dist/ folder to netlify.com/drop
```

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

```bash
npm run build && npm run deploy
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Ideas for Contributions

- [ ] Password history (last 5 generated)
- [ ] Pronounceable password mode
- [ ] Password strength tips tooltip
- [ ] Dark/light theme toggle
- [ ] Passphrase generator (word-based)
- [ ] QR code export

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License — free to use, modify, and distribute.
```

---

## 👨‍💻 Author

<div align="center">

**Armaanjot Singh**

[![GitHub](https://img.shields.io/badge/GitHub-Armaan582-181717?style=for-the-badge&logo=github)](https://github.com/Armaan582)

*Built with ❤️ and a lot of caffeine*

</div>

---

<div align="center">

**⭐ If you found this project useful, please give it a star!**

[![Star on GitHub](https://img.shields.io/github/stars/Armaan582/passforge?style=social)](https://github.com/Armaan582/passforge)

<br/>

[🔗 Live Demo](https://pass-forge-six.vercel.app/) · [🐛 Report Bug](https://github.com/Armaan582/passforge/issues) · [✨ Request Feature](https://github.com/Armaan582/passforge/issues)

</div>
