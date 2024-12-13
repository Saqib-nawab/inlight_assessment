import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardPlus = () => {
    const [user, setUser] = useState(null); // Store user data
    const [message, setMessage] = useState(""); // Store message to display

    console.log("DashboardPlus component rendered");
    useEffect(() => {
        console.log("useEffect triggered");

        const fetchSession = async () => {
            try {
                const token = localStorage.getItem("authToken"); // Get token from localStorage

                if (!token) {
                    setMessage("No active session. Please log in.");
                    return;
                }

                const response = await axios.get("http://localhost:5000/auth/session", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the JWT in the Authorization header
                    },
                });

                console.log("Response data:", response.data);
                if (response.data.user) {
                    setUser({ ...response.data.user }); // Set user data if valid token
                } else {
                    setMessage("No active session. Please log in.");
                }
            } catch (error) {
                console.error("Error fetching session:", error.response || error);
                setMessage("No active session. Please log in.");
            }
        };

        fetchSession();
    }, []); // No dependency array so it will run on every render

    // Show message if no user is present
    if (!user && message) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <p>{message}</p>
            </div>
        );
    }

    // Show user details if user exists
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            {user ? (
                <>
                    <h1>
                        Welcome, {user.firstName} {user.lastName}!
                    </h1>
                    <p>Welcome to inLights.</p>
                </>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default DashboardPlus;
