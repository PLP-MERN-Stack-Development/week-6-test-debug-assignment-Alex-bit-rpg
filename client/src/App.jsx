import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BugDetailsPage from './pages/BugDetailsPage';
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Bug Tracker</h1>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </header>
        <main>
          <ErrorBoundary> {/* Wrap the main content with ErrorBoundary */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bug/:id" element={<BugDetailsPage />} />
              {/* Intentional Bug: Missing route for a component, e.g., /bugs/create to demonstrate 404 in console */}
              {/* <Route path="/bugs/create" element={<BugFormPage />} /> */}
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </Router>
  );
}

export default App;