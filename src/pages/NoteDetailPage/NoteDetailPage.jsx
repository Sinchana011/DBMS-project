// src/pages/NoteDetailPage/NoteDetailPage.jsx
import React, { useState, useEffect } from "react";
// Import Link along with other hooks
import { useParams, useNavigate, Link } from "react-router-dom";
// Remove imports for TypeScript interfaces
// import { NoteDetail, Comment as CommentType, RatingInfo } from "../../interfaces";
import styles from "./NoteDetailPage.module.css";
import {
  FaDownload,
  FaStar,
  FaRegStar,
  FaBookmark,
  FaRegBookmark,
  FaUser,
  FaPaperPlane,
} from "react-icons/fa";

// --- MOCK DATA & Helper ---
// This array structure is standard JavaScript, but the data types
// previously enforced by TypeScript are now just conventions.
const MOCK_NOTES_DETAIL = [
  // Remove : NoteDetail[] type annotation
  // --- Class 10 Notes ---
  {
    id: "n1",
    title: "Algebra Basics",
    subject: "Mathematics",
    category: "class10",
    author: {
      id: "u1",
      name: "John Doe",
      avatarUrl: "https://via.placeholder.com/40/FF5841/FFFFFF?text=SS",
    },
    rating: 4.5,
    uploadTimestamp: Date.now() - 86400000 * 2,
    previewText: "Intro to variables...",
    contentText:
      "# Algebra Basics\n\nThis note covers the fundamental concepts of algebra needed for Grade 10.\n\n* Variables and Constants\n* Forming Equations\n* Solving Linear Equations (One Variable)\n* Examples and Practice Problems",
    downloadCount: 155,
    tags: ["Algebra", "Math", "Grade 10", "Equations"],
    comments: [
      {
        id: "c1",
        author: { id: "u2", name: "Anna" },
        text: "Very clear explanations, thanks!",
        timestamp: Date.now() - 86400000,
      },
    ],
    userRating: 4,
    isSavedByUser: true,
  },
  {
    id: "n3",
    title: "Newton's Laws of Motion",
    subject: "Physics",
    category: "class10",
    author: {
      id: "u3",
      name: "Rory",
      avatarUrl: "https://via.placeholder.com/40/007bff/FFFFFF?text=S",
    },
    rating: 4.2,
    uploadTimestamp: Date.now() - 86400000 * 1,
    previewText: "Inertia, F=ma...",
    contentText:
      "### Newton's Laws\n\n*   **First Law (Inertia):** An object stays at rest or in uniform motion unless acted upon by a net force.\n*   **Second Law:** Force equals mass times acceleration (F=ma).\n*   **Third Law:** For every action, there is an equal and opposite reaction.",
    downloadCount: 98,
    tags: ["Physics", "Mechanics", "Newton"],
    comments: [],
    isSavedByUser: false,
    userRating: undefined,
  },
  {
    id: "n4",
    title: "World War I Summary",
    subject: "History",
    category: "class10",
    author: { id: "u4", name: "Scott" },
    rating: 4.6,
    uploadTimestamp: Date.now() - 86400000 * 10,
    previewText: "Key causes...",
    contentText:
      "## WWI Summary\n\nKey events leading to and during the Great War, including:\n- MAIN Causes (Militarism, Alliances, Imperialism, Nationalism)\n- Major Fronts\n- Treaty of Versailles",
    downloadCount: 181,
    tags: ["History", "WWI", "Europe"],
    comments: [],
    isSavedByUser: true,
    userRating: 5,
  },
  // ... (rest of the MOCK_NOTES_DETAIL array - structure remains the same)
  {
    id: "e1",
    title: "Intro to Thermodynamics",
    subject: "Mechanical Eng.",
    category: "engineering",
    author: {
      id: "u5",
      name: "Prof. Anand",
      avatarUrl: "https://via.placeholder.com/40/28a745/FFFFFF?text=PA",
    },
    rating: 4.7,
    uploadTimestamp: Date.now() - 86400000 * 15,
    previewText: "First and Second Laws...",
    contentText:
      "# Thermodynamics 101\n\nCovers basic principles and laws.\n\n- Zeroth Law\n- First Law\n- Second Law",
    downloadCount: 112,
    tags: ["Thermo", "Engineering", "Mechanical"],
    comments: [],
    isSavedByUser: false,
    userRating: undefined,
  },
  {
    id: "e2",
    title: "Data Structures: Linked Lists",
    subject: "Computer Science Eng.",
    category: "engineering",
    author: {
      id: "u1",
      name: "Rory",
      avatarUrl: "https://via.placeholder.com/40/FF5841/FFFFFF?text=SS",
    },
    rating: 4.9,
    uploadTimestamp: Date.now() - 86400000 * 5,
    previewText: "Implementation...",
    contentText:
      "## Linked Lists in C++\n\n```cpp\nstruct Node {\n  int data;\n  Node* next;\n};\n```\n\nCovers implementation details, insertion, deletion, and traversal.",
    downloadCount: 250,
    tags: ["Data Structures", "CSE", "Linked List", "C++"],
    comments: [
      {
        id: "c3",
        author: { id: "uX", name: "Student A" },
        text: "Clear code example!",
        timestamp: Date.now() - 3600000 * 10,
      },
    ],
    isSavedByUser: true,
    userRating: 5,
  },
  {
    id: "m1",
    title: "Human Anatomy: Skeletal System",
    subject: "Anatomy",
    category: "medical",
    author: {
      id: "u6",
      name: "Dr. Priya",
      avatarUrl: "https://via.placeholder.com/40/6f42c1/FFFFFF?text=DP",
    },
    rating: 4.8,
    uploadTimestamp: Date.now() - 86400000 * 30,
    previewText: "Overview of major bones...",
    contentText:
      "# Skeletal System\n\nMajor bones:\n- Skull\n- Vertebral Column\n- Rib Cage\n- Pectoral Girdle\n- Pelvic Girdle\n- Upper and Lower Limbs",
    downloadCount: 195,
    tags: ["Anatomy", "Bones", "Medical", "Skeleton"],
    comments: [],
    isSavedByUser: false,
    userRating: undefined,
  },
  {
    id: "a1",
    title: "Introduction to Renaissance Art",
    subject: "Art History",
    category: "arts",
    author: {
      id: "u7",
      name: "C. Evans",
      avatarUrl: "https://via.placeholder.com/40/ffc107/FFFFFF?text=CE",
    },
    rating: 4.6,
    uploadTimestamp: Date.now() - 86400000 * 45,
    previewText: "Key artists and characteristics...",
    contentText:
      "# Renaissance Art\n\nFocuses on the Italian Renaissance.\n\n**Key Artists:**\n- Leonardo da Vinci\n- Michelangelo\n- Raphael\n\n**Characteristics:**\n- Humanism\n- Perspective\n- Realism",
    downloadCount: 88,
    tags: ["Art", "History", "Renaissance", "Italy"],
    comments: [
      {
        id: "c4",
        author: { id: "uY", name: "ArtLover" },
        text: "Great intro!",
        timestamp: Date.now() - 86400000 * 3,
      },
    ],
    isSavedByUser: true,
    userRating: 4,
  },
];

// Helper function to find a note by its ID - no type annotations needed
const findNoteById = (id) => {
  // Remove : string and return type
  console.log(`Searching for note details with ID: ${id}`);
  return MOCK_NOTES_DETAIL.find((note) => note.id === id);
};
// Helper function to generate mock rating info - no type annotations needed
const getMockRatingInfo = (average) => {
  // Remove : number and return type
  return {
    // Return a plain object
    average: average,
    count: Math.floor(Math.random() * 50) + 5,
  };
};
// --- END MOCK DATA ---

// Define the NoteDetailPage component - remove React.FC
const NoteDetailPage = () => {
  // Remove generic type from useParams
  const { noteId } = useParams();
  const navigate = useNavigate();
  // Remove generic types from useState hooks
  const [note, setNote] = useState(null);
  const [ratingInfo, setRatingInfo] = useState(null);
  const [userRating, setUserRating] = useState(undefined);
  const [isSaved, setIsSaved] = useState(false);
  const [newComment, setNewComment] = useState("");
  // Remove generic type from useState hook for comments array
  const [comments, setComments] = useState([]);

  // useEffect remains largely the same, types were mainly in state/helpers
  useEffect(() => {
    console.log("Attempting to load note details for ID:", noteId);
    if (noteId) {
      const foundNote = findNoteById(noteId);
      if (foundNote) {
        console.log("Found note details:", foundNote);
        setNote(foundNote);
        setRatingInfo(getMockRatingInfo(foundNote.rating));
        setUserRating(foundNote.userRating);
        // Use nullish coalescing for safety, although types are gone
        setIsSaved(foundNote.isSavedByUser ?? false);
        setComments(foundNote.comments);
      } else {
        console.error(
          "Note details not found in MOCK_NOTES_DETAIL for ID:",
          noteId
        );
        setNote(null);
        setRatingInfo(null);
      }
    }
    // It's generally safe to remove `navigate` from dependency array if not used inside effect
  }, [noteId]);

  // --- Action Handler Functions ---
  // Remove type annotation from ratingValue
  const handleRate = (ratingValue) => {
    console.log(`User rated note ${noteId} with ${ratingValue} stars`);
    setUserRating(ratingValue);
  };
  const handleSaveToggle = () => {
    console.log(
      `Toggling save state for note: ${noteId}. New state: ${!isSaved}`
    );
    setIsSaved(!isSaved);
  };
  const handleDownload = () => {
    console.log(`Download initiated for note: ${noteId}`);
    alert("Download would start now (simulation)");
  };
  // Remove type annotation from event 'e'
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !note) return;
    console.log(`Submitting comment for note ${noteId}: ${newComment}`);
    // mockNewComment structure remains the same, just no explicit type checking
    const mockNewComment = {
      // Remove : CommentType
      id: `c${Date.now()}`,
      author: { id: "currentUser", name: "You (Test User)" },
      text: newComment,
      timestamp: Date.now(),
    };
    setComments((prevComments) => [...prevComments, mockNewComment]);
    setNewComment("");
  };

  // --- Helper Function to Render Rating Stars ---
  // Remove type annotations from parameters
  const renderRatingStars = (
    currentRating, // Remove : number | undefined
    maxStars = 5,
    interactive = false
  ) => {
    return (
      <div className={styles.starsContainer}>
        {Array.from({ length: maxStars }, (_, i) => {
          const ratingValue = i + 1;
          return (
            <span
              key={i}
              onClick={interactive ? () => handleRate(ratingValue) : undefined}
              className={`${styles.star} ${
                interactive ? styles.interactiveStar : ""
              }`}
              role={interactive ? "button" : undefined}
              aria-label={interactive ? `Rate ${ratingValue} stars` : undefined}
              tabIndex={interactive ? 0 : undefined}
              onKeyDown={
                interactive
                  ? (
                      e // Remove : React.KeyboardEvent
                    ) =>
                      (e.key === "Enter" || e.key === " ") &&
                      handleRate(ratingValue)
                  : undefined
              }
            >
              {/* Logic remains the same */}
              {currentRating && ratingValue <= currentRating ? (
                <FaStar />
              ) : (
                <FaRegStar />
              )}
            </span>
          );
        })}
      </div>
    );
  };

  // --- Render Logic ---
  if (!note || !ratingInfo) {
    return (
      <div className={styles.pageContainer}>
        <p className={styles.loadingMessage}>
          Sorry, the details for this note could not be found.
        </p>
        <Link to="/">Go back to Grade Selection</Link>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.noteTitle}>{note.title}</h2>
        <p className={styles.noteSubject}>Subject: {note.subject}</p>
      </div>
      <div className={styles.mainContent}>
        <aside className={styles.actionsSidebar}>
          <h3>Actions</h3>
          <button onClick={handleDownload} className={styles.actionButton}>
            {/* Ensure note.downloadCount exists before rendering */}
            <FaDownload /> Download ({note.downloadCount ?? 0})
          </button>
          <div className={styles.ratingControl}>
            <h4>Your Rating</h4>
            {renderRatingStars(userRating, 5, true)}
          </div>
          <button
            onClick={handleSaveToggle}
            className={`${styles.actionButton} ${styles.saveButton}`}
          >
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}{" "}
            {isSaved ? "Saved" : "Save Note"}
          </button>
        </aside>
        <section className={styles.noteArea}>
          <div className={styles.notePreview}>
            <h3>Note Content</h3>
            {note.contentText ? (
              <pre className={styles.contentText}>{note.contentText}</pre>
            ) : (
              <p>Note content preview is unavailable.</p>
            )}
          </div>
          {ratingInfo && (
            <div className={styles.metaSection}>
              <h3>Details</h3>
              <div className={styles.averageRating}>
                <span>Average Rating:</span>
                {/* Ensure ratingInfo.average exists */}
                {renderRatingStars(ratingInfo.average, 5, false)}
                <span className={styles.ratingCount}>
                  {/* Add checks for safety */}(
                  {typeof ratingInfo.average === "number"
                    ? ratingInfo.average.toFixed(1)
                    : "N/A"}{" "}
                  from {ratingInfo.count ?? 0} ratings)
                </span>
              </div>
              <div className={styles.authorInfo}>
                {/* Use optional chaining for safety */}
                {note.author?.avatarUrl && (
                  <img
                    src={note.author.avatarUrl}
                    alt={`${note.author.name}'s avatar`}
                    className={styles.avatar}
                  />
                )}
                <span>
                  Uploaded by: <strong>{note.author?.name ?? "Unknown"}</strong>{" "}
                  on {/* Ensure timestamp exists */}
                  {note.uploadTimestamp
                    ? new Date(note.uploadTimestamp).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              {note.tags && note.tags.length > 0 && (
                <div className={styles.tags}>
                  <strong>Tags:</strong>{" "}
                  {note.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className={styles.discussionSection}>
            <h3>Discussion & Doubts</h3>
            <div className={styles.commentsList}>
              {/* Ensure comments is an array before mapping */}
              {Array.isArray(comments) && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className={styles.comment}>
                    <div className={styles.commentHeader}>
                      <span className={styles.commentAuthor}>
                        {/* Use optional chaining */}
                        <FaUser size={12} /> {comment.author?.name ?? "Unknown"}
                      </span>
                      <span className={styles.commentTimestamp}>
                        {/* Ensure timestamp exists */}
                        {comment.timestamp
                          ? new Date(comment.timestamp).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>
                    <p className={styles.commentText}>{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className={styles.noComments}>Be the first to comment!</p>
              )}
            </div>
            <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ask a question or add your thoughts..."
                rows={3}
                className={styles.commentInput}
                aria-label="Add a comment"
              />
              <button
                type="submit"
                className={styles.submitButton}
                disabled={!newComment.trim()}
              >
                <FaPaperPlane /> Post Comment
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NoteDetailPage;
