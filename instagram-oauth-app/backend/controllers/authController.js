const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { findUserByEmail, createUser } = require("../models/userModel");

// Signup Controller
const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the email is already registered
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const userId = uuidv4();
        const newUser = await createUser(userId, firstName, lastName, email, hashedPassword);

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.query;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Save user info in session
        req.session.user = {
            id: user.user_id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
        };

        res.status(200).json({
            message: "Login successful",
            user: req.session.user,
        });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {
    signup,
    login,
};
