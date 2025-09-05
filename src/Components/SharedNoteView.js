import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SharedNoteView = () => {
  const { shareUrl } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://notesapp-backend-latest.onrender.com/share/${shareUrl}`)
      .then((res) => setNote(res.data.data))
      .catch(() => setError("Failed to load shared note or note does not exist."));
  }, [shareUrl]);

  if (error) {
    return <div style={{ padding: "40px", color: "red", fontSize: "20px" }}>{error}</div>;
  }

  if (!note) {
    return <div style={{ padding: "40px", fontSize: "24px" }}>Loading shared note...</div>;
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "40px",
        background: "#f8f9fa",
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "12px" }}>{note.title}</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "30px", whiteSpace: "pre-wrap" }}>{note.content}</p>
      <div style={{ fontSize: "1.1rem", color: "#444" }}>
        <strong>Date:</strong> {note.date}<br />
        <strong>Note ID:</strong> {note.id}<br />
        <strong>Share URL:</strong> {note.shareUrl}
      </div>
    </div>
  );
};

export default SharedNoteView;
