import React, { useState } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("global");
  const navigate = useNavigate();
  const myIssues = [
    { id: 1, title: "Library AC not working", status: "Open", date: "2025-09-01" },
    { id: 2, title: "Projector in Lab 3 broken", status: "In Progress", date: "2025-08-30" },
  ];

  const globalIssues = [
    { id: 1, title: "Water supply disruption in campus", status: "Resolved", date: "2025-08-28" },
    { id: 2, title: "WiFi outage in Hostel Block A", status: "Open", date: "2025-09-01" },
    { id: 3, title: "Canteen food complaints", status: "In Progress", date: "2025-08-25" },
  ];

  const issuesToShow = activeTab === "global" ? myIssues : globalIssues;

  return (
    <div className="home-page">
      <div className="hero-section text-white py-4">
        <div className="d-flex justify-content-between align-items-center px-4">
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => navigate("/add-issue?type=my")}
          >
            Add My Issue
          </button>

          <div className="text-center">
            <h1 className="display-5 fw-bold m-0">Welcome to Issue Tracker</h1>
            <p className="lead m-0">Track and resolve issues quickly — for you and for the entire campus</p>
          </div>

          <button
            className="btn btn-success btn-lg"
            onClick={() => navigate("/add-issue?type=global")}
          >
            Add Global Issue
          </button>
        </div>
      </div>

      <div className="container mt-4">
        <div className="d-flex justify-content-center gap-3">
          <button
            className={`btn toggle-btn ${activeTab === "global" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveTab("global")}
          >
            Global Issues
          </button>
          <button
            className={`btn toggle-btn ${activeTab === "my" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveTab("my")}
          >
            My Issues
          </button>

        </div>

        <div className="row mt-4">
          {issuesToShow.map((issue) => (
            <div key={issue.id} className="col-md-4 mb-4">
              <div className="card issue-card shadow-lg border-0">
                <div className="card-body">
                  <h5 className="card-title">{issue.title}</h5>
                  <p className="card-text">
                    <strong>Status:</strong> {issue.status}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Reported on {issue.date}</small>
                  </p>
                  <button className="btn btn-sm btn-gradient">View Details</button>
                </div>
              </div>
            </div>
          ))}

          {issuesToShow.length === 0 && (
            <div className="text-center text-muted mt-5">
              <h5>No issues found</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
