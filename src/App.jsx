// src/App.jsx
import React from "react"; // Keep React import for clarity/compatibility
// Import necessary components from react-router-dom
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

// Import the page components we created
// IMPORTANT: These imports will now point to the .jsx versions of these files
// Make sure you rename those files as well (e.g., GradeSelectionPage.tsx -> GradeSelectionPage.jsx)
import GradeSelectionPage from "./pages/GradeSelectionPage/GradeSelectionPage";
import NotesListPage from "./pages/NotesListPage/NotesListPage";
import NoteDetailPage from "./pages/NoteDetailPage/NoteDetailPage";

// Optional: Import an icon if you want to use one for the profile button
// import { FaUserCircle } from 'react-icons/fa';

// Import the App-specific CSS
import "./App.css";

// Define the main App component (no type annotations needed)
function App() {
  // The component returns JSX structure
  return (
    // <Router> component wraps everything that needs routing enabled
    <Router>
      {/* Main container div */}
      <div>
        {/* --- Updated Navigation Header --- */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 30px",
            backgroundColor: "var(--color-white)",
            borderBottom: "1px solid var(--color-border)",
            marginBottom: "20px",
            fontFamily: "var(--font-body)",
          }}
        >
          {/* Left side: Logo and Grade Selection Link */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link to="/">
              <img
                src="/logo.png"
                alt="Collab Notes Logo"
                style={{ height: "40px", display: "block" }}
              />
            </Link>
            <Link
              to="/"
              style={{
                fontWeight: 600,
                fontSize: "1.1em",
                textDecoration: "none",
                color: "var(--color-text-primary)",
              }}
            >
              Select Grade
            </Link>
          </div>

          {/* Right side: Profile Button (Placeholder) */}
          <div>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "5px",
                color: "var(--color-accent-dark)",
                fontSize: "1.8em",
              }}
              onClick={() =>
                alert("Profile button clicked! (TODO: Implement profile/login)")
              }
              aria-label="User Profile"
            >
              👤 {/* Simple emoji placeholder */}
              {/* <FaUserCircle /> */}
            </button>
          </div>
        </nav>
        {/* --- End Navigation Header --- */}

        {/* The <Routes> component defines where different page components will be rendered */}
        <Routes>
          {/* Route for the new Grade Selection Page (now the home page) */}
          <Route path="/" element={<GradeSelectionPage />} />

          {/* Route definition for the Notes List Page */}
          <Route path="/notes/:category" element={<NotesListPage />} />

          {/* Route definition for the Note Detail Page */}
          <Route path="/note/:noteId" element={<NoteDetailPage />} />

          {/* Optional: Catch-all Route for 404 Not Found pages */}
          <Route
            path="*"
            element={
              <div
                style={{
                  textAlign: "center",
                  padding: "50px",
                  fontFamily: "var(--font-body)",
                }}
              >
                <h2>404 - Page Not Found</h2>
                <p>Sorry, the page you were looking for doesn't exist.</p>
                <Link to="/">Go to Grade Selection</Link>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// Export the App component
export default App;
