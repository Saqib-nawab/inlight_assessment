import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLinkedInLogin = () => {
        // Correct LinkedIn authentication route
        window.location.href = "http://localhost:5000/authentication/linkedin";
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to the InLights</h1>
            <p>Please choose an option:</p>
            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={() => navigate("/login")}
                    style={{
                        padding: "10px 20px",
                        marginRight: "10px",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>
                <button
                    onClick={() => navigate("/signup")}
                    style={{
                        padding: "10px 20px",
                        marginLeft: "10px",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    Signup
                </button>
            </div>
            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={handleLinkedInLogin}
                    style={{
                        padding: "10px 20px",
                        marginTop: "10px",
                        fontSize: "16px",
                        backgroundColor: "#0077B5", // LinkedIn blue
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    Login/Signup with LinkedIn
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
