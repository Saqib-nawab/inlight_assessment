import React from "react";

const Login = () => {
    const handleLogin = () => {
        // backend endpoint for Instagram OAuth
        window.location.href = "http://localhost:5000/auth/instagram";
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Login with Instagram</h1>
            <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
                Login
            </button>
        </div>
    );
};

export default Login;
