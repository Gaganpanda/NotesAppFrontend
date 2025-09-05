import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SharedNoteView = () => {
  const { shareUrl } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://notes-app-frontend-mgzx.vercel.app/share/${shareUrl}`)
      .then(res => setNote(res.data.data))
      .catch(() => setError("Failed to load shared note or note does not exist."));
  }, [shareUrl]);

  if (error) {
    return <div style={{ padding: "40px", color: "red", fontSize: "2rem" }}>{error}</div>;
  }

  if (!note) {
    return <div style={{ padding: "40px", fontSize: "2rem" }}>Loading shared note...</div>;
  }

  return (
  <div
    style={{
      maxWidth: "750px",
      margin: "60px auto",
      padding: "40px",
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 3px 24px rgba(0,0,0,0.12)",
      textAlign: "center"
    }}
  >
    <h1 style={{ fontSize: "2.75rem", margin: "0 0 24px" }}>{note.title}</h1>
    <p style={{ fontSize: "1.7rem", margin: "0 0 36px", whiteSpace: "pre-wrap" }}>{note.content}</p>
  </div>
);

};

export default SharedNoteView;
