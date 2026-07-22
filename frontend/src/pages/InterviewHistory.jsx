import { useEffect, useState } from "react";
import { getInterviewHistory } from "../services/api";

function InterviewHistory({ onBack }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getInterviewHistory();

        if (data.success) {
          setHistory(data.history);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="app-shell">
        <h2>Loading Interview History...</h2>
      </div>
    );
  }

  return (
    <div className="app-shell">

      <header className="topbar">
        <div className="brand">
          <span className="brand-icon">◈</span>
          <span>Interview History</span>
        </div>

        <button
          className="logout-btn"
          onClick={onBack}
        >
          ← Back
        </button>
      </header>

      <main style={{ padding: "30px" }}>

        {history.length === 0 ? (
          <div className="completion-card">
            <h2>No Interviews Yet</h2>

            <p>
              Complete your first mock interview to see your
              interview history here.
            </p>
          </div>
        ) : (

          history.map((interview, index) => (

            <div
              key={index}
              className="completion-card"
              style={{
                marginBottom: "25px",
                textAlign: "left"
              }}
            >

              <h2>{interview.role}</h2>

              <p>
                <strong>Difficulty:</strong>{" "}
                {interview.difficulty}
              </p>

              <p>
                <strong>Duration:</strong>{" "}
                {new Date(interview.duration * 1000)
                  .toISOString()
                  .substring(11, 19)}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  interview.created_at
                ).toLocaleString()}
              </p>

              <button
                className="nav-button"
                style={{ marginTop: "15px" }}
                onClick={() =>
                  setExpandedIndex(
                    expandedIndex === index ? null : index
                  )
                }
              >
                {expandedIndex === index
                  ? "Hide Details"
                  : "View Details"}
              </button>

              {expandedIndex === index && (

                <div
                  style={{
                    marginTop: "25px"
                  }}
                >

                  {interview.responses.map(
                    (response, i) => (

                      <div
                        key={i}
                        className="evaluation-box"
                        style={{
                          marginBottom: "25px"
                        }}
                      >

                        <h3>
                          Question {i + 1}
                        </h3>

                        <pre>{response.question}</pre>

                        <h4>Your Answer</h4>

                        <pre>{response.answer}</pre>

                        <h4>AI Evaluation</h4>

                        <pre>{response.evaluation}</pre>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          ))

        )}

      </main>

    </div>
  );
}

export default InterviewHistory;