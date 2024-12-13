import React, { useState } from "react";
import { signupUser } from "../services/authService";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signupUser(formData); // Call the signup service
            setMessage(response.message); // Set success message
            setFormData({ firstName: "", lastName: "", email: "", password: "" }); // Reset form
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred. Please try again."); // Show error message
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Signup</h1>
            {message && <p>{message}</p>}
            <button
                style={{
                    padding: "10px 20px",
                    marginBottom: "20px",
                    fontSize: "16px",
                    cursor: "pointer",
                }}
                onClick={() => document.getElementById("signupForm").style.display = "block"}
            >
                Signup
            </button>
            <form
                id="signupForm"
                style={{ display: "none", marginTop: "20px" }}
                onSubmit={handleSubmit}
            >
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        style={{ padding: "10px", width: "300px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        style={{ padding: "10px", width: "300px" }}
                    />
                </div>
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
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Signup;
