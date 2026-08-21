const express = require('express');
const cors = require('cors'); // 1. CORS import karein
const app = express();
const PORT = process.env.PORT || 3000;

// 2. CORS middleware enable karein taake frontend se request block na ho
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// 3. Local server run karne ke liye direct app.listen lagayein
app.listen(PORT, () => {
    console.log(`Server is running smoothly on http://localhost:${PORT}`);
});

module.exports = app;