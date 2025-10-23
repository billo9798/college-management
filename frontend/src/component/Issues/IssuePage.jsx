import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function IssuePage() {
    const [form, setForm] = useState({
        title: "",
        type: "",
        department: "",
        category: ""
    });

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const issueType = queryParams.get("type") === "global" ? "Global Issue" : "My Issue";


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Issue Submitted: " + JSON.stringify(form, null, 2));
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.heading}>Create {issueType}</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Issue Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Issue Type</label>
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            style={styles.select}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Bug">Bug</option>
                            <option value="Feature">Feature</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Department</label>
                        <select
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            style={styles.select}
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="IT">IT</option>
                            <option value="Admin">Admin</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Issue Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            style={styles.select}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Urgent">Urgent</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <button type="submit" style={styles.button}>Submit Issue</button>
                </form>
            </div>
        </div>
    );
}

// Internal CSS as JS object
const styles = {
    page: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
        fontFamily: "Arial, sans-serif"
    },
    card: {
        background: "white",
        padding: "30px",
        borderRadius: "15px",
        boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        width: "400px"
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#333"
    },
    formGroup: {
        marginBottom: "15px"
    },
    label: {
        display: "block",
        marginBottom: "5px",
        fontWeight: "bold",
        color: "#444"
    },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        outline: "none",
        fontSize: "14px"
    },
    select: {
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        outline: "none",
        fontSize: "14px"
    },
    button: {
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        background: "linear-gradient(45deg, #ff6ec4, #7873f5)",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "10px"
    }
};
