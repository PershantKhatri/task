const express = require("express");
const cors = require("cors");

const app = express();

// Yeh line har tarah ke frontend origin aur trailing slash ke maslay ko khatam kar degi
app.use(cors());

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