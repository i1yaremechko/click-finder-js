# 🖱️ Click Finger Project

A modern web application designed for click speed training and user statistics analysis. The project is built as a Multi-Page Application (MPA) using the **Vite** bundler and **Sass (SCSS)** preprocessor.

---

## 🚀 Features

* **Home Page:** An interactive click trainer with a custom, responsive user interface.
* **Statistics Page (`/users/stats/`):** A dynamic data table that fetches and displays user records from an external API.
* **Pagination:** Seamless page navigation for the statistics table with URL sync support (`?page=`).
* **Responsive Web Design (RWD):** Fully optimized for a smooth experience across smartphones, tablets, and desktops.

---

## 🛠️ Tech Stack

* **Bundler:** [Vite v5](https://vitejs.dev/) (configured for Multi-Page Application architecture).
* **Scripts:** Vanilla JavaScript (ES6+ Modules).
* **Styles:** SCSS (Sass) utilizing the modern `@use` modular system.
* **Assets:** SVG icons isolated in the `public` directory to ensure bulletproof relative paths.

---

## 🔗 Live Demo
[View the Live Project](https://i1yaremechko.github.io/click-finder-js/)

---

### Project Directory Structure

```text
click-finger-project/
├── public/                 # Static assets (images, icons) directly served by Vite
│   └── images/
├── src/                    # Source code
│   ├── common/             # Global styles, constants, and utilities
│   │   ├── constants/
│   │   └── scss/           # Main index.scss and style modules (@use)
│   ├── features/           # Isolated component logic
│   │   ├── Pagination/
│   │   └── StatisticsTable/
│   ├── index.js            # Main script for the Home page
│   └── stats.js            # Main script for the Statistics page
├── users/
│   └── stats/
│       └── index.html      # Statistics page (Entry point 2)
├── index.html              # Home page (Entry point 1)
├── vite.config.js          # Vite configuration for MPA and GitHub Pages
└── package.json
```

## 🚀 How to Run Locally

1. **Clone the repository:**   
  ```bash
  git clone https://github.com/i1yaremechko/click-finder-js.git
  cd click-finder-js
  ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

   The application will be accessible at the local URL provided in your terminal (usually http://localhost:5173/click-finder-js/).

🏗️ Build and Test Commands
The project includes pre-configured scripts to streamline development and deployment:

- npm run dev – Starts the local development server with Hot Module Replacement (HMR).

- npm run build – Compiles, minifies, and optimizes the source code. The production-ready assets are output to the dist/ directory.

- npm run preview – Locally hosts the compiled dist/ folder to test the production build before deploying.