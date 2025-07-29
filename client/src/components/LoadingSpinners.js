import React from 'react';
import './LoadingSpinner.css'; // Add some basic CSS for a spinner

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default LoadingSpinner;