const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.get("/login", login);

router.get("/session", (req, res) => {
    console.log("Session route hit");
    console.log("Session data on request:", req.session);

    if (req.session && req.session.user) {
        console.log("User session exists:", req.session);
        res.status(200).json({ user: req.session.user });
    } else {
        console.log("No active session found.");
        res.status(401).json({ message: "No active session" });
    }
});




module.exports = router;
