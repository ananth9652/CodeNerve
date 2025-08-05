import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // custom styles

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!code.trim()) return alert("Enter some code!");
    setLoading(true);
    setReview("");

    try {
      const res = await axios.post("http://localhost:3000/api/review", { code });
      setReview(res.data.review);
    } catch (err) {
      console.error(err);
      setReview("Error fetching review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title"> CodeNerve</h1>
      <p className="subtitle">AI-powered Code Reviewer</p>

      <textarea
        className="code-input"
        rows={12}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
      />

      <button
        className="review-btn"
        onClick={handleReview}
        disabled={loading}
      >
        {loading ? "Reviewing..." : "🚀 Review Code"}
      </button>

      {review && (
        <div className="review-box">
          <h3>Review:</h3>
          <pre>{review}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
