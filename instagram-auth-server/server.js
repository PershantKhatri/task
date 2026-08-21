const express = require("express");
const cors = require("cors");

const app = express();

app.use(
    cors({
        origin: "https://instagram-fronted-kes1sbc2-khatri6.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
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

module.exports = app