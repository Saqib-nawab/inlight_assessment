const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Enable CORS for frontend
app.use(bodyParser.json());

app.use(
    session({
        secret: "inLights",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false, // Use true if HTTPS is enabled
            httpOnly: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        },
    })
);


app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
