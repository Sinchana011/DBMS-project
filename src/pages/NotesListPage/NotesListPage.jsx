// src/pages/NotesListPage/NotesListPage.jsx
import React, { useState, useMemo } from "react"; // Import React hooks
import { useNavigate, useParams } from "react-router-dom"; // Import hooks for navigation and URL params

import NoteCard from "/Users/sinchana/dbms2/src/components/NoteCard.jsx";

// import { NoteSummary } from "../../interfaces";
import styles from "./NotesListPage.module.css"; // Import styles for this page
import { FaSearch } from "react-icons/fa"; // Import search icon

// Define the NotesListPage component - remove React.FC
const NotesListPage = () => {
  // Remove generic type from useParams
  const { category } = useParams();
  // Remove type annotation from useState
  const [searchTerm, setSearchTerm] = useState("");
  // Remove generic type from useState
  const [selectedSubject, setSelectedSubject] = useState("All"); // Default to 'All'
  const navigate = useNavigate();

  // --- Static Mock Data (For Frontend Demo Only) ---
  // Remove type annotation NoteSummary[]
  const ALL_MOCK_NOTES = [
    // Class 10
    {
      id: "n1",
      title: "Algebra Basics",
      subject: "Mathematics",
      category: "class10",
      author: { id: "u1", name: "John Doe" },
      rating: 4.5,
      uploadTimestamp: Date.now() - 86400000 * 2,
      previewText:
        "Intro to variables, equations, solving basic linear equations.",
    },
    {
      id: "n3",
      title: "Newton's Laws of Motion",
      subject: "Physics",
      category: "class10",
      author: { id: "u3", name: "Rory" },
      rating: 4.2,
      uploadTimestamp: Date.now() - 86400000 * 1,
      previewText: "Inertia, F=ma, and action-reaction pairs explained simply.",
    },
    {
      id: "n4",
      title: "World War I Summary",
      subject: "History",
      category: "class10",
      author: { id: "u4", name: "Scott" },
      rating: 4.6,
      uploadTimestamp: Date.now() - 86400000 * 10,
      previewText: "Key causes, major battles, and the end of the Great War.",
    },
    // Engineering
    {
      id: "e1",
      title: "Intro to Thermodynamics",
      subject: "Mechanical Eng.",
      category: "engineering",
      author: { id: "u5", name: "Prof. Anand" },
      rating: 4.7,
      uploadTimestamp: Date.now() - 86400000 * 15,
      previewText: "First and Second Laws, basic cycles explained.",
    },
    {
      id: "e2",
      title: "Data Structures: Linked Lists",
      subject: "Computer Science Eng.",
      category: "engineering",
      author: { id: "u1", name: "Rory" },
      rating: 4.9,
      uploadTimestamp: Date.now() - 86400000 * 5,
      previewText: "Implementation and time complexity of singly linked lists.",
    },
    // Medical
    {
      id: "m1",
      title: "Human Anatomy: Skeletal System",
      subject: "Anatomy",
      category: "medical",
      author: { id: "u6", name: "Dr. Priya" },
      rating: 4.8,
      uploadTimestamp: Date.now() - 86400000 * 30,
      previewText: "Overview of major bones and joint types.",
    },
    // Arts
    {
      id: "a1",
      title: "Introduction to Renaissance Art",
      subject: "Art History",
      category: "arts",
      author: { id: "u7", name: "C. Evans" },
      rating: 4.6,
      uploadTimestamp: Date.now() - 86400000 * 45,
      previewText: "Key artists and characteristics of the period.",
    },
  ];
  // --- End Static Mock Data ---

  // useMemo hooks remain the same structurally
  const notesForCategory = useMemo(() => {
    console.log(`Filtering mock notes for category: ${category}`);
    // Filter logic is standard JavaScript
    return ALL_MOCK_NOTES.filter((note) => note.category === category);
  }, [category]);

  const subjects = useMemo(() => {
    if (!notesForCategory || notesForCategory.length === 0) return ["All"];
    // Map and Set logic is standard JavaScript
    const allSubjects = notesForCategory.map((note) => note.subject);
    return ["All", ...new Set(allSubjects)];
  }, [notesForCategory]);

  const filteredNotes = useMemo(() => {
    return notesForCategory.filter((note) => {
      // Filter logic is standard JavaScript
      const matchesSearch =
        searchTerm === "" ||
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (note.previewText &&
          note.previewText.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesSubject =
        selectedSubject === "All" || note.subject === selectedSubject;

      return matchesSearch && matchesSubject;
    });
  }, [notesForCategory, searchTerm, selectedSubject]);

  // --- Navigation Handler ---
  // Remove type annotation from noteId parameter
  const handleNoteClick = (noteId) => {
    navigate(`/note/${noteId}`);
    console.log(`Navigating to note detail page for ID: ${noteId}`);
  };

  // --- Helper function to capitalize ---
  // Remove type annotations from parameter and return type
  const capitalize = (str) => {
    if (!str) return "Unknown";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // --- Render JSX ---
  // Structure remains the same
  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Notes for {capitalize(category)}</h2>

      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search notes by title, subject..."
            value={searchTerm}
            // Standard event handling
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          <span>Filter by Subject:</span>
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`${styles.filterButton} ${
                selectedSubject === subject ? styles.activeFilter : ""
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.notesGrid}>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            // Pass props to NoteCard (ensure NoteCard.jsx expects these)
            <NoteCard key={note.id} note={note} onClick={handleNoteClick} />
          ))
        ) : (
          <p className={styles.noNotes}>
            {notesForCategory.length === 0
              ? `No notes found for ${capitalize(category)} yet.`
              : "No notes match your current filters."}
          </p>
        )}
      </div>
    </div>
  );
};

export default NotesListPage;
