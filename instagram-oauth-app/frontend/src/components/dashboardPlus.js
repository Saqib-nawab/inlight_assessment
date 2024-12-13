import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardPlus = () => {
    const [user, setUser] = useState(null); // Store user data
    const [message, setMessage] = useState(""); // Store message to display

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get("http://localhost:5000/auth/session", {
                    withCredentials: true, // Include cookies
                });
                console.log("Response data:", response.data);
                if (response.data.user) {
                    setUser(response.data.user); // Set user data if session exists
                } else {
                    setMessage("No active session. Please log in."); // Set message if no user
                }
            } catch (error) {
                console.error("Error fetching session:", error.response || error);
                setMessage("No active session. Please log in."); // Handle error
            }
        };

        fetchSession();
    }, []);

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
            <h1>Welcome, {user.firstName}!</h1>
            <p>Welcome to inLights.</p>
        </div>
    );
};

export default DashboardPlus;
