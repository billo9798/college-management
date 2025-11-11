import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api";
import signupImg from "../../asset/img/Employee-Welcome.jpg";

export default function Signup() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [idfile, setIdFile] = useState(null);
    const [rollNumber, setRollNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const formData = new FormData();
        formData.append("username", userName);
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("rollNumber", rollNumber);
        formData.append("password", password);
        formData.append("files", idfile);

        try {
            await api.post("/users/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/login");
        } catch (err) {
            setError("Signup failed. " + err.response.data + " Try again.");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                width: "100%",
                margin: "0",
                padding: "0",
                boxSizing: "border-box",
                fontFamily: "Arial, sans-serif"
            }}
        >
            <div
                style={{
                    flex: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f9fafb",
                    padding: "40px"
                }}
            >
                <div
                    style={{
                        backgroundColor: "white",
                        padding: "40px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                        width: "100%",
                        maxWidth: "400px"
                    }}
                >
                    <h2 style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "20px", color: "#333" }}>
                        Student Sign Up
                    </h2>

                    {error && (
                        <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{error}</p>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "16px"
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "16px"
                            }}
                        />
                        <input
                            type="text"
                            placeholder="User Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "16px"
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Roll Number"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value)}
                            required
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "16px"
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "16px"
                            }}
                        />
                        <label
                            htmlFor="fileInput"
                            style={{
                                display: "block",
                                fontWeight: "bold",
                                margin: "0px 10px",
                            }}
                        >
                            Upload Student Id card <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setIdFile(e.target.files[0])}
                            required
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "16px"
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: "14px",
                                backgroundColor: "#2563eb",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "18px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                transition: "0.3s"
                            }}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#1e4fd1")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
                        >
                            Sign Up
                        </button>
                    </form>

                    <p style={{ marginTop: "20px", textAlign: "center", color: "#555" }}>
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: "#2563eb", fontWeight: "bold", textDecoration: "none" }}>
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
            <div
                style={{
                    flex: "1",
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    padding: "20px"
                }}
            >
                <img
                    src={signupImg}
                    alt="Signup Illustration"
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100vh",
                        objectFit: "contain",
                        borderRadius: "12px"
                    }}
                />
            </div>
        </div>
    );
}