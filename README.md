# ClickFinder

A modern, fast, and lightweight Single Page Application (SPA) designed to display and analyze user activity statistics. Built from scratch using pure JavaScript and modular architecture to demonstrate mastery of asynchronous data manipulation and custom client-side routing.

## 🔗 Live Demo
[View the Live Project](https://i1yaremechko.github.io/smart-coworking-booking-system/)

## 🛠️ Technologies & Tools
- **Vanilla JavaScript** (ES6+ Modules, Async/Await)
- **History API** (Custom SPA Router without external frameworks)
- **SCSS / CSS** (Modular styling with custom CSS animations)
- **REST API Integration** (Data fetching and aggregation from a remote Vercel server)

## 💡 Features
- **Custom SPA Routing:** Seamless page transitions between the Landing Page and User Statistics without refreshing the browser, utilizing the HTML5 History API.
- **Advanced Data Aggregation:** Fetches multi-layered data from independent REST endpoints (Users and Statistics) and aggregates them on the client side using efficient array manipulation (`.map()`, `.filter()`, `.reduce()`).
- **Dynamic Data Table:** Renders user profiles along with their calculated metrics (Total Clicks and Total Page Views) directly into the DOM.
- **Mathematical Pagination Component:** Includes a smart chunked pagination algorithm with dynamic boundary rendering and ellipsis (`...`) support for effortless navigation through large datasets.
- **Linear Progress Indicator:** Implements a sleek, animated top-bar loading indicator (similar to YouTube/GitHub) to provide real-time visual feedback during asynchronous network requests.
- **Clean Architecture:** Developed following the *Separation of Concerns (SoC)* principle, separating code into Services, Pages, Components, and Routers.

## 📁 Project Architecture & Directory Structure

src/
├── components/
│   └── pagination.js       # Pagination component logic & boundary rendering
├── pages/
│   └── statsPage.js        # Statistics page blueprint & DOM tables generator
├── router/
│   └── router.js           # Client-side router & state transition manager
├── services/
│   └── usersService.js     # Asynchronous API client & data transformer
├── index.js                # Application entry point & global event listeners
└── style.css               # Main stylesheet including core layouts & animations


## 🚀 How to Run Locally

1. **Clone the repository:**

git clone https://github.com/i1yaremechko/smart-coworking-booking-system.git
cd smart-coworking-booking-system

2. **Launch a Local Server:**

Since the project relies heavily on ES6 Modules (`type="module"`), it cannot be run by simply opening the `index.html` file via `file:///`. You must serve it using a local development server.
- **Using VS Code (Recommended):** Install the **Live Server** extension, right-click `index.html`, and select **Open with Live Server**.
- **Using Node.js (Alternative):**
npx serve .

## ⚙️ API Integration Details

The application communicates with a remote backend hosted on Vercel:

- **Base URL:** `https://appco-snowy.vercel.app/api`
- **Endpoints Used:**
  - `GET /users?page={page}&rowsPerPage={limit}` — Fetches the paginated list of registered users.
  - `GET /users/statistics?userIds={ids}` — Fetches daily raw metrics for the specified user IDs.

The data is merged dynamically on the client side inside `usersService.js` to avoid redundant loading states and minimize network overhead.