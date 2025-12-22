import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api";

export default function IssuePage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "LOW",
        amount: "",
        transactionId: "",
        transactionType: "",
        department: "",
        issueType: -1
    });
    console.log(form, 'form')
    const [images, setImages] = useState([]);
    const [issueTypes, setIssueTypes] = useState([]);
    useEffect(() => {
        const fetchIssueTypes = async () => {
            try {
                const response = await api.get("/issue-types", {
                    withCredentials: true,
                });
                setIssueTypes(response.data);
            } catch (error) {
                console.error("Error fetching issue types:", error);
            }
        };

        fetchIssueTypes();
    }, []);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const issueType = queryParams.get("type") === "global" ? "Global Issue" : "My Issue";

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddImages = (e) => {
        const selected = Array.from(e.target.files);

        // Prevent selecting more than 5 total
        if (images.length + selected.length > 5) {
            alert("Maximum 5 images allowed");
            return;
        }

        setImages(prev => [...prev, ...selected]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form, 'form')
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("priority", form.priority);
        formData.append("issueTypeId", form.issueType);
        formData.append("amount", form.amount);
        formData.append("transactionId", form.transactionId);
        formData.append("transactionType", form.transactionType);
        formData.append("globalIssue", queryParams.get("type") === "global" ? true : false);
        formData.append("assignedToDepartment", form.department);

        images.forEach(file => {
            formData.append("files", file);
        });

        try {
            await api.post("/issues/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            navigate("/home");
        } catch (err) {
            alert("Signup failed. " + err.response.data + " Try again.");
        }
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
                            name="issueType"
                            value={form.issueType}
                            onChange={handleChange}
                            style={styles.select}
                            required
                        >
                            <option value="">Select Issue Type</option>
                            {issueTypes.map((issue) => (
                                <option key={issue.id} value={issue.id}>
                                    {issue.displayName}
                                </option>
                            ))}
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
                            <option value="ACCOUNTS">ACCOUNTS</option>
                            <option value="IT">IT</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="SUPPORT">SUPPORT</option>
                            <option value="STUDENT_AFFAIRS">STUDENT_AFFAIRS</option>
                            <option value="EXAM_CELL">EXAM_CELL</option>
                            <option value="LIBRARY">LIBRARY</option>
                        </select>
                    </div>
                    {form.issueType === "6" && (
                        <>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Total Amount</label>
                                <input
                                    placeholder="Enter Total Amount e.g. 712.85"
                                    type="number"
                                    name="amount"
                                    value={form.amount}
                                    onChange={handleChange}
                                    style={styles.input}
                                     />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Transaction ID</label>
                                <input
                                    placeholder="Enter Transaction Id e.g. 1000234567890"
                                    type="number"
                                    name="transactionId"
                                    value={form.transactionId}
                                    onChange={handleChange}
                                    style={styles.input}
                                     />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Transaction Type</label>
                                <input
                                    placeholder="Enter Transaction Type e.g. UPI, DEBIT CARD"
                                    type="text"
                                    name="transactionType"
                                    value={form.transactionType}
                                    onChange={handleChange}
                                    style={styles.input}
                                     />
                            </div>
                        </>
                    )}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Issue Priority</label>
                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            style={styles.select}
                            required
                        >
                            <option selected value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                            <option value="CRITICAL">CRITICAL</option>
                        </select>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Issue Description</label>
                        <input
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Issue Attachment</label>

                        {/* File Input */}
                        {images.length < 5 && (
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleAddImages}
                                style={styles.input}
                            />
                        )}

                        {/* Previews */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                            {images.map((file, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt=""
                                        width={90}
                                        height={90}
                                        style={{ objectFit: "cover", borderRadius: 4 }}
                                    />

                                    {/* Delete button */}
                                    <button
                                        style={{
                                            position: "absolute",
                                            right: -5,
                                            top: -5,
                                            background: "red",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "50%",
                                            width: 20,
                                            height: 20,
                                            cursor: "pointer"
                                        }}
                                        onClick={() => {
                                            setImages(prev => prev.filter((_, i) => i !== index));
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
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
