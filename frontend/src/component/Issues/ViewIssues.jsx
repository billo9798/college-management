import React, { useEffect, useState } from "react";
import "./viewIssues.css";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const ViewIssues = () => {
  const navigate = useNavigate();
  const [myIssues, setMyIssues] = useState([]);
  useEffect(() => {
    const fetchMyIssues = async () => {
      try {
        const response = await api.get("/issues/my", {
          withCredentials: true,
        });
        setMyIssues(response.data);
      } catch (error) {
        console.error("Error fetching My issue types:", error);
      }
    };

    fetchMyIssues();
  }, []);

  return (
    <div className="view-issues-container">
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            margin: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 10px"
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "bold",
              color: "#333"
            }}
          >
            All My Reported Issues
          </h1>
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.2)"
            }}
            onClick={() => navigate("/add-issue?type=my")}
          >
            Add My Issue
          </button>
        </div>
      </>


      <div className="issues-grid">
        {myIssues.map((issue) => (
          <div className="issue-card" key={issue.id}>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <div className="issue-meta">
              <small className="text-muted">
                Issue Type :- {issue.issueType.displayName}
              </small>
              <span className="text-muted">
                Priority :- {issue.priority}
              </span>
            </div>
            <div className="issue-meta">
              <small className="text-muted">
                Reported on {new Date(issue.createdAt).toLocaleDateString("en-GB")}
              </small>
              <small className="text-muted">
                Due AT {new Date(issue.dueAt).toLocaleDateString("en-GB")}
              </small>
              <span className={`issue-status ${issue.status.toLowerCase().replace(" ", "-")}`}>
                {issue.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewIssues;
