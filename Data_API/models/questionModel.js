const mongoose = require('mongoose');

const Question = new mongoose.Schema(
    {
        question: {
            required: true,
            type: String
        },
        difficulty: {
            required: true,
            type: String
        },
        traits: {
            required: true,
            type: [String]
        },
        companies: {
            required: true,
            type: [String]
        }
    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model('Question', Question)
