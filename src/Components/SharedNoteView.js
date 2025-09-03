import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SharedNoteView = () => {
  const { shareUrl } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/notes/share/${shareUrl}`)
      .then((res) => {
        setNote(res.data.data);
      })
      .catch(() => {
        setError("Failed to load shared note or note does not exist.");
      });
  }, [shareUrl]);

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  }

  if (!note) {
    return <div style={{ padding: "20px" }}>Loading shared note...</div>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", background: "#f0f0f0", borderRadius: "8px" }}>
      <h2>{note.title}</h2>
      <p style={{ whiteSpace: "pre-wrap", fontSize: "16px", lineHeight: "1.5" }}>{note.note}</p>
    </div>
  );
};

export default SharedNoteView;
