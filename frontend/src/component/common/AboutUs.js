import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About Our College Issue Management System</h1>
        <p>
          Empowering students and management to collaborate efficiently and
          resolve issues seamlessly.
        </p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>🎓 What Is This Project?</h2>
          <p>
            The <strong>College Issue Management System</strong> is a web-based
            platform designed to streamline the process of reporting,
            assigning, and resolving issues within a college environment. From
            infrastructure complaints to administrative concerns, students can
            raise issues which are then tracked and managed by the college
            authorities efficiently.
          </p>
        </section>

        <section className="about-section">
          <h2>🚀 Key Features</h2>
          <ul>
            <li>📝 Students can easily create and submit issues.</li>
            <li>👩‍💼 Management can assign and track issue progress.</li>
            <li>📊 Dashboard to monitor issue status in real-time.</li>
            <li>🔒 Secure authentication for students and staff.</li>
            <li>📬 Notification system for updates and resolutions.</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>💡 Our Mission</h2>
          <p>
            Our mission is to create a transparent and efficient communication
            channel between students and college administration. By digitizing
            the issue reporting process, we aim to enhance accountability and
            responsiveness across all departments.
          </p>
        </section>

        <section className="about-section">
          <h2>👨‍💻 Developed By</h2>
          <p>
            This project was developed by <strong>Khushbu Kumari (BCA Student)</strong> as part
            of our second-year college project. We combined our knowledge of web
            technologies and problem-solving skills to create a useful tool for
            campus management.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
