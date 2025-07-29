# MERN Stack Bug Tracker

## Project Overview
This is a full-stack web application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It serves as a comprehensive tool for tracking and managing software bugs and issues within a project lifecycle. Users can report new bugs, view a consolidated list of existing issues, update bug statuses and priorities, and add comments for collaboration.

## Features
- **Bug Creation:** Easily report new bugs with details like title, description, status, priority, and assigned developer.
- **Bug Listing:** View all reported bugs in a clear, organized list.
- **Bug Details & Updates:** Access individual bug details, allowing for updates to its status, priority, assignee, and description.
- **Comments:** Add notes and updates to specific bugs, fostering communication among team members.
- **MongoDB Integration:** Persistent storage of all bug data in a NoSQL database.
- **RESTful API:** A robust backend API built with Node.js and Express.js to handle all data operations.
- **Responsive UI:** A dynamic and interactive user interface built with React.js.

## Technologies Used

### Backend (Server)
- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js, used for building the RESTful API.
- **MongoDB:** NoSQL database for flexible and scalable data storage.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js, simplifying data interactions.
- **Nodemon:** Tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- **Dotenv:** Loads environment variables from a `.env` file.
- **CORS:** Middleware to enable Cross-Origin Resource Sharing.

### Frontend (Client)
- **React.js:** JavaScript library for building user interfaces.
- **React Router:** For declarative routing within the single-page application.
- **Axios:** Promise-based HTTP client for making API requests to the backend.
- **CSS/Styling:** Standard CSS for styling components.

### Testing & Debugging
- **Jest:** JavaScript testing framework (for both frontend and backend).
- **React Testing Library:** For testing React components.
- **Supertest:** For testing HTTP requests (API endpoints).

## Installation and Running the Project

Follow these steps to get the Bug Tracker up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (installed and running)
- [Git](https://git-scm.com/downloads)

### Step-by-Step Installation

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```
    (Replace `https://github.com/your-username/your-repo-name.git` with your actual repository URL).

2.  **Backend Setup (Server):**
    Navigate into the `server` directory and install dependencies:
    ```bash
    cd server
    npm install
    ```
    **Environment Variables:** Create a `.env` file in the `server` directory. This file will store sensitive information and configurations.
    ```
    MONGO_URI=mongodb://localhost:27017/bugtracker_db
    PORT=5000
    # JWT_SECRET=your_jwt_secret_key_here  # Uncomment and set if you have authentication
    ```
    **Note:** Ensure your MongoDB server is running on `localhost:27017`. If your database name is different, adjust `bugtracker_db` accordingly.

3.  **Frontend Setup (Client):**
    Navigate into the `client` directory and install dependencies:
    ```bash
    cd ../client # Go back to the root then into client
    npm install
    ```
    **Environment Variables (Optional):** If your frontend needs to explicitly know the backend API URL, create a `.env.local` file in the `client` directory:
    ```
    REACT_APP_API_URL=http://localhost:5000
    ```

### Running the Application

Ensure both your MongoDB server and your application's backend and frontend are running.

1.  **Start MongoDB Server:**
    Make sure your local MongoDB instance is active. You can typically start it via your system's services (Windows) or using `mongod` in a terminal.

2.  **Start Backend Server:**
    Open a new terminal window.
    Navigate to the `server` directory:
    ```bash
    cd C:\Users\T & A\Documents\full MERN\week 6\week-6-test-debug-assignment-Alex-bit-rpg\server
    npm run dev
    ```
    You should see confirmation messages like "Server running in development mode on port 5000" and "MongoDB Connected: localhost". Keep this terminal open.

3.  **Start Frontend Development Server:**
    Open *another* new terminal window.
    Navigate to the `client` directory:
    ```bash
    cd C:\Users\T & A\Documents\full MERN\week 6\week-6-test-debug-assignment-Alex-bit-rpg\client
    npm start
    ```
    This will compile the React application and automatically open it in your default web browser at `http://localhost:3000`. Keep this terminal open.

Your application should now be fully operational! If you previously seeded your database with sample data, you should see it displayed in the frontend.

## Running Tests and Debugging Techniques

### Running Tests

Both the backend and frontend parts of this project come with their own test suites, typically configured with Jest.

1.  **Backend Tests:**
    Navigate to the `server` directory:
    ```bash
    cd server
    npm test
    ```
    *(Note: Your `package.json` might have more specific test scripts like `test:watch` for continuous testing. Check the "scripts" section in `server/package.json`.)*

2.  **Frontend Tests:**
    Navigate to the `client` directory:
    ```bash
    cd client
    npm test
    ```
    *(This will usually open an interactive test runner. Press `a` to run all tests.)*

### Debugging Techniques Used

Debugging a MERN stack application often involves inspecting both the server-side and client-side processes.

1.  **Terminal Output Inspection:**
    * **Server:** Keep an eye on the backend server's terminal (where `npm run dev` is running). Errors in API routes, database connections, or server-side logic will appear here. `nodemon` automatically restarts the server on file changes, which helps in seeing immediate feedback.
    * **Client:** The frontend terminal (where `npm start` is running) will show compilation errors, warnings, and messages from `react-scripts`.

2.  **Browser Developer Tools (Frontend Debugging):**
    * Press `F12` in your browser to open Developer Tools.
    * **Console Tab:** Look for JavaScript errors, `console.log()` messages, and network request failures.
    * **Network Tab:** Inspect all HTTP requests made by your React app to the backend. Check status codes (e.g., `200 OK`, `404 Not Found`, `500 Internal Server Error`), request/response payloads, and timings. This is crucial for debugging API communication issues.
    * **Components/Elements Tab:** Inspect your React component tree and their props/state (requires React Developer Tools browser extension).

3.  **Node.js Inspector (Backend Debugging):**
    * For more in-depth backend debugging, you can use Node.js's built-in inspector.
    * Modify your `dev` script in `server/package.json`:
        ```json
        "dev": "node --inspect-brk ./node_modules/nodemon/bin/nodemon.js server.js"
        ```
    * Run `npm run dev`. This will pause execution at the first line.
    * Open Chrome, type `chrome://inspect` in the address bar, and click "Open dedicated DevTools for Node". You can then set breakpoints, step through code, and inspect variables.

4.  **`console.log()` and `console.error()`:**
    * The simplest and most effective debugging tool. Strategically place `console.log()` statements in your code (both frontend React components/functions and backend API routes/controllers) to inspect variable values, execution flow, and catch where issues occur.

## Testing Approach and Coverage

### Testing Approach

Our testing approach focuses on ensuring the reliability and correctness of both the backend API and the frontend user interface.

1.  **Unit Tests (Frontend & Backend):**
    * **Frontend:** Individual React components are tested in isolation using **Jest** and **React Testing Library**. These tests focus on rendering correctly, responding to user interactions, and displaying data as expected, without relying on a running backend.
    * **Backend:** Individual functions, utility modules, and database interaction logic (e.g., Mongoose models) are tested using **Jest**. These tests ensure that each piece of the server-side logic performs its intended task correctly.

2.  **Integration Tests (Backend API):**
    * **Backend:** API endpoints are tested using **Jest** and **Supertest**. These tests simulate HTTP requests to the actual Express.js routes to ensure that endpoints handle requests correctly, interact with the database as intended, and return appropriate responses (status codes, JSON data). This verifies the "glue" between different parts of the backend.

3.  **End-to-End Tests (Optional, Advanced):**
    * While not explicitly part of the initial core tests, for a more comprehensive approach, end-to-end tests (using tools like Cypress or Playwright) would simulate real user flows across the entire application, from UI interactions to backend responses.

### Testing Coverage

Testing "coverage" refers to the percentage of your codebase that is executed by your tests.

* **Tools:** Tools like Jest can generate coverage reports (often in HTML, accessible from `coverage/lcov-report/index.html` after running tests).
* **What it measures:** It typically measures:
    * **Line Coverage:** Percentage of lines of code executed.
    * **Branch Coverage:** Percentage of `if`/`else` statements or `switch` cases executed.
    * **Function Coverage:** Percentage of functions called.
    * **Statement Coverage:** Percentage of statements executed.
* **Our Goal:** While striving for 100% coverage can be impractical and not always indicative of quality, our goal is to achieve **high test coverage on critical parts of the application**, particularly:
    * **Backend API Endpoints:** Ensuring all CRUD operations for bugs are thoroughly tested.
    * **Core Business Logic:** Any complex logic for status transitions, priority handling, or data validation.
    * **Key Frontend Components:** Components that handle user input, display critical information, or interact with the API.

By maintaining good test coverage, we aim to minimize regressions, catch bugs early in the development cycle, and ensure the overall stability and reliability of the MERN Stack Bug Tracker application.

---

**Author:**
ALEX NG'ANG'A