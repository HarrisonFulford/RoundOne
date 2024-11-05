const express = require('express');
const Model = require('../models/userModel');
const router = express.Router();

// Register (create user) Method
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const possibleUser = await Model.findOne({ username: username });
        
        if (possibleUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const data = new Model({
            username: username,
            password: password
        });

        await data.save();
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login (authenticate user) Method
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Model.findOne({ username: username });
        
        if (user && user.password === password) {
            res.status(200).json({ message: "User credentials correct" });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
