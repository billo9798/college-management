import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("global");
  const navigate = useNavigate();
  const [myIssues, setMyIssues] = useState([]);
  const [globalIssues, setGlobalIssues] = useState([]);


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

  const fetchGlobalIssues = async () => {
    try {
      const response = await api.get("/issues/global", {
        withCredentials: true,
      });
      setGlobalIssues(response.data);
    } catch (error) {
      console.error("Error fetching Global issue types:", error);
    }
  };

  useEffect(() => {
    fetchMyIssues();
    fetchGlobalIssues();
  }, []);

  const issuesToShow = activeTab === "global" ? globalIssues : myIssues;

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
                  <p className="card-title">{issue.description}</p>
                  <p className="card-text">
                    <strong>Status:</strong> {issue.status}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Reported on {new Date(issue.createdAt).toLocaleDateString("en-GB")}
                    </small>
                  </p>

                  {issue.attachments && issue.attachments.length > 0 && (
                    <div className="d-flex gap-2 mb-2 flex-wrap">
                      {issue.attachments.map((img, index) => {
                        const imgUrl = `data:${img.fileType};base64,${img.fileData}`;

                        return (
                          <div key={index} className="issue-image-wrapper">
                            <img
                              src={imgUrl}
                              alt={img.fileName}
                              className="issue-avatar"
                            />
                            <img
                              src={imgUrl}
                              alt="Large Preview"
                              className="issue-large-preview"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <button className="btn btn-sm btn-gradient">{activeTab === "global" ? 'Global Issue' : 'My Issue'}</button>
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
