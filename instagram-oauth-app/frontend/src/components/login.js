import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData); // Call loginUser service

            // Save JWT to localStorage
            localStorage.setItem("authToken", response.token);
            console.log("Token saved:", response.token);

            // Set success message and reset form
            setMessage("Login successful!");
            setFormData({ email: "", password: "" });

            // Redirect to Dashboard+
            navigate("/dashboard-plus");
        } catch (error) {
            // Handle error messages
            setMessage(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Login</h1>
            {message && <p style={{ color: message === "Login successful!" ? "green" : "red" }}>{message}</p>}
            <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ padding: "10px", width: "300px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ padding: "10px", width: "300px" }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
