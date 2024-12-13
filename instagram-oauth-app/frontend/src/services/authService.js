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

// Login service
export const loginUser = async (userData) => {
    try {
        const response = await axios.get(`${API_URL}/login`, {
            params: {
                email: userData.email,
                password: userData.password,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
