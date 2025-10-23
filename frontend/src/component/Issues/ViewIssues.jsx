import React from "react";
import "./viewIssues.css";
import { useNavigate } from "react-router-dom";

const ViewIssues = () => {
  const navigate = useNavigate();
  const issues = [
    { id: 1, title: "Library Wi-Fi Not Working", description: "Wi-Fi in the main library is down since morning.", type: "My Issue", status: "Open" },
    { id: 2, title: "Canteen Hygiene", description: "Need better cleanliness in canteen.", type: "Global Issue", status: "In Progress" },
    { id: 3, title: "Projector Issue in Room 204", description: "Projector is not turning on.", type: "My Issue", status: "Resolved" },
    { id: 4, title: "Parking Space Shortage", description: "Students are struggling to find parking space.", type: "Global Issue", status: "Open" }
  ];

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
            All Reported Issues
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
        {issues.map((issue) => (
          <div className="issue-card" key={issue.id}>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <div className="issue-meta">
              <span className={`issue-type ${issue.type === "Global Issue" ? "global" : "my"}`}>
                {issue.type}
              </span>
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
