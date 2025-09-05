import React, { useEffect, useState } from "react";
import axios from "axios";
import ShareButton from "./ShareButton";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    axios.get(`https://notesapp-backend-latest.onrender.com/notes/byUser-ID/${user.id}`)
      .then(res => setNotes(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Your Notes</h2>
      {notes.length === 0 && <p>No notes found.</p>}
      {notes.map(note => (
        <div key={note.id} style={{ marginBottom: "20px" }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p> {/* <-- FIX: use 'content' */}
          <ShareButton shareUrl={note.shareUrl} />
        </div>
      ))}
    </div>
  );
};

export default NotesList;
