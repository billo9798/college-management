import React from "react";
import { useLocation } from "react-router-dom";

const AddIssue = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const issueType = queryParams.get("type") === "global" ? "Global Issue" : "My Issue";

  return (
    <div>
      <style>{`
        .add-issue-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(to right, #6a11cb, #2575fc);
          color: white;
        }
        .issue-form {
          background: white;
          color: black;
          padding: 30px;
          border-radius: 12px;
          box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
          width: 400px;
        }
        .issue-form h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        .issue-form input, .issue-form select, .issue-form button {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
        .issue-form button {
          background: #2575fc;
          color: white;
          border: none;
          font-weight: bold;
          cursor: pointer;
        }
        .issue-form button:hover {
          background: #1b5edb;
        }
      `}</style>

      <div className="add-issue-page">
        <form className="issue-form">
          <h2>{issueType}</h2>

          <input type="text" placeholder="Issue Title" required />
          
          <select required>
            <option value="">Select Issue Type</option>
            <option value="bug">Bug</option>
            <option value="request">Request</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <select required>
            <option value="">Select Department</option>
            <option value="it">IT</option>
            <option value="hr">HR</option>
            <option value="admin">Admin</option>
          </select>

          <select required>
            <option value="">Select Issue Category</option>
            <option value="critical">Critical</option>
            <option value="major">Major</option>
            <option value="minor">Minor</option>
          </select>

          <button type="submit">Submit Issue</button>
        </form>
      </div>
    </div>
  );
};

export default AddIssue;
