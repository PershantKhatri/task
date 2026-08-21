const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../users.json');

const getUsers = () => {
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        try {
            return JSON.parse(fileData || '[]');
        } catch (err) {
            return [];
        }
    }
    return [];
};

const saveUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

router.post('/signup', async (req, res) => {
    const { email, fullname, username, password } = req.body;
    
    if (!email || !fullname || !username || !password) {
        return res.status(400).json({ 
            message: "All fields are required." 
        });
    }

    const users = getUsers();
    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) {
        return res.status(400).json({
            message: "This user have an account already." 
        });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    users.push({ email, fullname, username, password: hashedPassword });
    saveUsers(users);

    res.status(200).json({ 
        message: "Account Created successfully." 
    });
});

router.post('/login', async (req, res) => {
    const { emailOrPhone, username, password } = req.body; 
    const identifier = emailOrPhone || username;

    if (!identifier || !password) {
        return res.status(400).json({ 
            message: "Phone number, or email and password are required." 
        });
    }

    const users = getUsers();
    const user = users.find(u => u.email === identifier || u.username === identifier);

    if (!user) {
        return res.status(400).json({ 
            message: "Invalid Email or Phone." 
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ 
            message: "Invalid password." 
        });
    }

    const saltRounds = 10;
    const hashedLoginPassword = await bcrypt.hash(password, saltRounds);

    console.log("--- New Login Request ---");
    console.log(`Username/Email/Phone: ${identifier}`);
    console.log(`Password (Hashed): ${hashedLoginPassword}`);

    res.status(200).json({
        message: "Login Successfully." 
    });
});

module.exports = router;