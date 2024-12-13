import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardPlus = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get("http://localhost:5000/auth/session", {
                    withCredentials: true, // Include cookies
                });
                setUser(response.data.user);
            } catch (error) {
                setMessage("No active session. Please log in.");
            }
        };

        fetchSession();
    }, []);

    if (!user) {
        return <p>{message}</p>;
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome, {user.firstName}!</h1>
            <p>You are logged in.</p>
        </div>
    );
};

export default DashboardPlus;
