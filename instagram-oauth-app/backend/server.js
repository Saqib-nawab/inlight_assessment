const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport"); // Passport import
const authRoutes = require("./routes/auth");
const authLinkedin = require("./routes/authLinkedin"); // Import LinkedIn routes

dotenv.config();

const app = express();

// 1. CORS
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// 2. Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 3. Session Middleware
app.use(
    session({
        secret: "inLights", // Use a more secure secret in production
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false, // Use true for HTTPS
            httpOnly: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
    })
);

// 4. Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// 5. Routes
app.use("/auth", authRoutes);
app.use("/", authLinkedin); // LinkedIn routes

// 6. Default Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
