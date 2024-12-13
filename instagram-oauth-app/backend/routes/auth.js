const express = require("express");
const { signup, login } = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.get("/login", login);

// router.get("/session", (req, res) => {
//     console.log("Session route hit");
//     console.log("Session data on request:", req.session);

//     if (req.session && req.session.user) {
//         console.log("User session exists:", req.session);
//         res.status(200).json({ user: req.session.user });
//     } else {
//         console.log("No active session found.");
//         res.status(401).json({ message: "No active session" });
//     }
// });

router.get("/session", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default-secret");
        console.log("Decoded JWT:", decoded);

        res.status(200).json({ user: decoded }); // Send the decoded user data
    } catch (err) {
        console.error("Error verifying token:", err);
        res.status(401).json({ message: "Invalid or expired token" });
    }
});



module.exports = router;
