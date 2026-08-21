const express = require("express");
const cors = require("cors");

const app = express();

// CORS for all origins (Production & Local)
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Instagram Auth Server is running"
    });
});

module.exports = app;