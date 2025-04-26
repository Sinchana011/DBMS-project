// src/components/NoteCard/NoteCard.jsx
import React from "react"; // Keep React import
// Remove the import for NoteSummary as it's a TypeScript interface
// import { NoteSummary } from '../../interfaces';
// Import the CSS styles specific to this component
import styles from "./NoteCard.module.css";
// Import icons we'll use
import { FaStar, FaUser } from "react-icons/fa"; // Make sure you ran 'npm install react-icons'

// Define the NoteCard component as a standard JavaScript function
// It receives 'props' (which we destructure into 'note' and 'onClick')
// No need for React.FC or interface definitions here
const NoteCard = ({ note, onClick }) => {
  // Helper to format the timestamp into a readable date
  // No type annotations needed
  const uploadDate = new Date(note.uploadTimestamp).toLocaleDateString();

  // The JSX structure (HTML-like) that this component renders
  return (
    // The main container div for the card
    <div
      className={styles.card}
      onClick={() => onClick(note.id)} // Pass note.id to the onClick prop function
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && onClick(note.id)
      }
    >
      {/* Note Title */}
      <h4 className={styles.title}>{note.title}</h4>

      {/* Note Subject */}
      <p className={styles.subject}>{note.subject}</p>

      {/* Meta information (Author and Date) */}
      <div className={styles.meta}>
        <span className={styles.author}>
          <FaUser size={12} /> {/* User icon */}
          {/* Access nested property safely, assuming 'note.author' exists */}
          {note.author?.name} {/* Optional chaining ?. might be good here */}
        </span>
        <span className={styles.date}>{uploadDate}</span> {/* Formatted date */}
      </div>

      {/* Rating */}
      <div className={styles.rating}>
        <FaStar color="gold" /> {/* Star icon */}
        {/* Ensure note.rating is a number before calling toFixed */}
        {typeof note.rating === "number" ? note.rating.toFixed(1) : "N/A"}
      </div>

      {/* Optional Preview Text */}
      {note.previewText && <p className={styles.preview}>{note.previewText}</p>}
    </div>
  );
};

// Make the component available to be imported in other files
export default NoteCard;
