import React, { useEffect } from "react";
import axios from "axios";

const LinkedIn = () => {
    console.log("Connecting to LinkedIn");

    // Function to handle LinkedIn callback
    const handleLinkedInCallback = async (authCode) => {
        try {
            // Send the code to the backend
            const response = await axios.post("http://localhost:5000/callback", { //this will trigger the last route in authLinkedin in order exchange code with token
                code: authCode,
            });

            // Extract the token and user data from the response
            const { token, user } = response.data;
            console.log("User Data:", user);

            console.log("LinkedIn Login Successful:", response.data);

            if (token) {
                // Store the token in localStorage
                localStorage.setItem("authToken", token);

                // Navigate to the dashboard or any other route
                // navigate("/authentication/linkedin/callback");
            } else {
                console.error("Login response does not contain a token");
            }
        } catch (error) {
            console.error("Error handling LinkedIn login:", error.response?.data || error.message);
            alert("LinkedIn login failed. Please try again.");
        }
    };

    useEffect(() => {
        console.log("useEffect triggered");

        // Extract `code` parameter from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            console.log("LinkedIn Authorization Code:", code);
            handleLinkedInCallback(code);
        } else {
            console.error("Authorization code is missing from the LinkedIn callback URL");
            alert("Authorization code is missing.");
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <p>Processing LinkedIn login...</p>
        </div>
    );
};

export default LinkedIn;
