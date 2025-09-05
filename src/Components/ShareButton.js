import React, { useState } from "react";

const ShareButton = ({ shareUrl, className, style }) => {
  const [message, setMessage] = useState("");

  const copyToClipboard = () => {
    if (!shareUrl) {
      setMessage("No share URL found!");
      return;
    }
    const fullUrl = `http://notesapp-backend-latest.onrender.com/share/${shareUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setMessage("Share link copied to clipboard!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div>
      <button className={className} style={style} onClick={copyToClipboard}>
        Share
      </button>
      {message && (
        <p style={{ color: "green", fontSize: "small" }}>{message}</p>
      )}
    </div>
  );
};

export default ShareButton;
