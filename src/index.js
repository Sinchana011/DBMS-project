import React from "react";
import ReactDOM from "react-dom/client"; // or 'react-dom'
import "./index.css";
import App from "./App.jsx"; // Import App.jsx explicitly
import reportWebVitals from "./reportWebVitals.js"; // Import .js version

// Find the root element
const rootElement = document.getElementById("root");

// Check if the element exists before creating the root
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Remove type assertion
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element with ID 'root'");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); // Call the function (make sure reportWebVitals.ts is also converted to .js)
