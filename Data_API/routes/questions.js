const express = require('express');
const Model = require('../models/questionModel');
const router = express.Router();

// Create question
router.post('/create', async (req, res) => {
    const data = new Model({
        question: req.body.question,
        difficulty: req.body.difficulty,
        traits: req.body.traits,
        companies: req.body.companies
    });

    try {
        await data.save();
        res.status(200).json({ message: "Question created successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Get all questions
router.get('/all', async (req, res) => {
    try {
        const questions = await Model.find();

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get by company method
router.get('/find', async (req, res) => {
    try {
        const company = req.query.company;

        const questions = await Model.find({ companies: company });

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
