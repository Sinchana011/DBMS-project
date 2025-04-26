// src/pages/GradeSelectionPage/GradeSelectionPage.jsx
import React from "react";
import { Link } from "react-router-dom"; // Use Link for navigation
import styles from "./GradeSelectionPage.module.css"; // Import the CSS module

// Define the categories/grades available
// This array definition is standard JavaScript
const categories = [
  { name: "Class 10", path: "class10" },
  { name: "Class 11", path: "class11" },
  { name: "Class 12", path: "class12" },
  { name: "Engineering", path: "engineering" },
  { name: "Medical", path: "medical" },
  { name: "Arts", path: "arts" },
  // Add more categories as needed
];

// Define the component as a standard JavaScript function
// Remove React.FC type annotation
const GradeSelectionPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Select your grade</h1>
      <p className={styles.subtitle}>
        Select your grade or stream to find notes:
      </p>
      <div className={styles.grid}>
        {/* Map over the categories array (standard JavaScript) */}
        {categories.map((category) => (
          // Each category becomes a clickable link
          <Link
            key={category.path}
            to={`/notes/${category.path}`} // Navigate using react-router Link
            className={styles.card}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

// Export the component
export default GradeSelectionPage;
