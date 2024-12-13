import axios from "axios";

const API_URL = "http://localhost:5000/auth";

// Signup service
export const signupUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data; // Return the response data
    } catch (error) {
        throw error; // Pass the error to the component
    }
};
