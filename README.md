# ClickFinder — User Statistics Dashboard

A lightweight, high-performance web application built with **Vanilla JavaScript** and **SCSS** that provides a seamless, dynamic interface for tracking and analyzing user statistics.

The project features an optimized single-page views toggle system, clean modular architecture, and custom pagination, fully aligned with the **DRY (Don't Repeat Yourself)** principle and **BEM** methodology.

---

## 🚀 Features

*   **Dynamic Screen Toggling:** Seamless switching between the Landing Page and the Statistics View without heavy router overhead or page reloads.
*   **Asynchronous Data Processing:** Optimized fetching and aggregation of user data and click/view metrics from a REST API via native `async/await`.
*   **Custom Pagination Component:** Client-side pagination logic with dynamic ellipsis handle, reducing initial rendering strain.
*   **Fluid Responsive Layout:** Crafted using advanced SCSS, fully responsive across mobile, tablet, and desktop viewports.
*   **Visual States:** Seamless progress tracking with CSS-animated loaders and user-friendly "empty states."

---

## 🛠️ Tech Stack & Architecture

*   **Logic:** JavaScript (ES6+ Modules)
*   **Styling:** SCSS (SASS Compiler), structured with BEM methodology (Block-Element-Modifier)
*   **Build Tool / Environment:** Vite (or your current bundler, e.g., Webpack/Parcel)
*   **Fonts:** Montserrat (Google Fonts)

### Project Directory Structure

```text
├── src/
│   ├── components/
│   │   └── pagination.js       # Standalone custom pagination logic
│   ├── pages/
│   │   └── statsPage.js        # Core data injection & table rendering
│   ├── services/
│   │   └── usersService.js     # Async API data management & aggregation
│   └── index.js                # App entry point & view coordination (The Conductor)
├── styles/
│   ├── index.scss              # Global style aggregator
│   ├── variables.scss          # Centralized style configuration (colors, fonts)
│   ├── table.scss              # Layout and micro-states for the data table
│   └── ...                     # BEM-structured component stylesheets
└── index.html                  # Core application markup with pre-baked view sections
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

3. **Compile SCSS styles:**
   ```bash
   npm run scss
   ```

4. **Launch the application:**
   ```bash
   Open index.html using the Live Server extension in VS Code or any local static server.
   ```