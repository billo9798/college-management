import React, { useEffect, useState } from "react";
import "./viewIssues.css";
import api from "../../api";

const ViewIssuesStatusChange = () => {
  const [myIssues, setMyIssues] = useState([]);
  const fetchMyIssues = async () => {
    try {
      const response = await api.get("/issues/list", {
        withCredentials: true,
      });
      setMyIssues(response.data);
    } catch (error) {
      console.error("Error fetching My issue types:", error);
    }
  };

  useEffect(() => {
    fetchMyIssues();
  }, []);


  const toggleStatus = async (id, currentStatus) => {
    let status = currentStatus;
    try {
      console.log(id, 'id');
      console.log(currentStatus, 'current stat')
      if (status === 'OPEN') {
        status = 'IN_PROGRESS';
      } else if (status === 'IN_PROGRESS') {
        status = 'RESOLVED';
      } else if (status === 'RESOLVED') {
        status = 'CLOSED';
      } else {
        status = 'OPEN';
      }
      const response = await api.put(
        `/issues/${id}/status?status=${status}`,
        {
          withCredentials: true,
        }
      );
      console.log(response, 'response');
      if (response.status === 200) {
        fetchMyIssues();
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const toggleDeleteIssue = async (id) => {
    try {
      const response = await api.delete(
        `/issues/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response, 'response');
      if (response.status === 200) {
        fetchMyIssues();
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            All College Issues
          </h1>
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
            <div>
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
            </div>
            <div className="issue-meta">
              <button
                className={`btn btn-sm ${issue.status ? 'btn-success' : 'btn-secondary'}`}
                onClick={() => toggleStatus(issue.id, issue.status)}
              >
                Change Staus
              </button>
              <button
                className='btn btn-sm btn-danger'
                onClick={() => toggleDeleteIssue(issue.id)}
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewIssuesStatusChange;