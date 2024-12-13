const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.get("/login", login);

router.get("/session", (req, res) => {
    if (req.session.user) {
        res.status(200).json({ user: req.session.user });
    } else {
        res.status(401).json({ message: "No active session" });
    }
});


module.exports = router;
