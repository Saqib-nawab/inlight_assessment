const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Enable CORS for frontend
app.use(bodyParser.json());

// Configure session middleware
app.use(
    session({
        secret: process.env.secret_key, // Use the secret key from the .env file
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: true }, // Set `secure: true` in production if using HTTPS
    })
);

// Routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
