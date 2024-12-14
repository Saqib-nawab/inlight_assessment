const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { findUserByEmail, createUser } = require("../models/userModel");
const jwt = require("jsonwebtoken");

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

const passwordLesssignup = async (newUser) => {

    if (!newUser.email || !newUser.firstName || !newUser.lastName) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the email is already registered
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Create a new user
        const userId = uuidv4();
        const newUser = await createUser(userId, firstName, lastName, email);
        return newUser;
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login Controller
// const login = async (req, res) => {
//     const { email, password } = req.query;

//     if (!email || !password) {
//         return res.status(400).json({ message: "Email and password are required" });
//     }

//     try {
//         const user = await findUserByEmail(email);
//         if (!user) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         // Save user info in session
//         req.session.user = {
//             id: user.user_id,
//             firstName: user.first_name,
//             lastName: user.last_name,
//             email: user.email,
//         };

//         console.log("Session after setting user:", req.session);
//         // res.status(200).json({
//         //     message: "Login successful",
//         //     user: req.session.user,
//         // });

//         // Explicitly save the session
//         req.session.save((err) => {
//             if (err) {
//                 console.error("Error saving session:", err);
//                 return res.status(500).json({ message: "Internal server error" });
//             }
//             console.log("Session after saving:", req.session);

//             res.status(200).json({
//                 message: "Login successful",
//                 user: req.session.user,
//             });
//         });
//     } catch (err) {
//         console.error("Error during login:", err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };


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

        // Generate a JWT
        const token = jwt.sign(
            {
                id: user.user_id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
            },
            process.env.JWT_SECRET || "default-secret", // Use a strong secret key
            { expiresIn: "1h" } // Token expiry (optional)
        );

        res.status(200).json({
            message: "Login successful",
            token, // Return the JWT
        });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const passwordlesslogin = async (email) => {

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "user doesn't exist" });
        }

        return user;
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    signup,
    login,
};
