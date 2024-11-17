import express from 'express';
import { CohereClient } from 'cohere-ai';
const client = new CohereClient({ token: process.env.API_KEY });
const router = express.Router();


// Evaluate user response
router.post('/evaluate', async (req, res) => {
    const { question, responseText, traits } = req.body;
    const responseFormat = `[
        {
            "trait": "Trait One",
            "score": 9,
            "evaluation": "You got a score of 9 because..."
        },
        {
            "trait": "Trait Two",
            "score": 4.5,
            "evaluation": "You got a score of 4.5 because..."
        }
    ]`;
    try {
        const chat = await client.chat(
            {
                model: "command-r",
                message: `Evaluate the following response according to each trait on 100 ${traits}, to the question ${question} \n Response: \n${responseText}. \nRespond with no extra words in this format: ${responseFormat}, in the order of traits given`
            }
        )
        const jsonResponse = JSON.parse(chat.chatHistory[1].message);

        res.status(200).json(jsonResponse);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Generate question
router.get('/question', async (req, res) => {
    const difficulty = req.query.difficulty;

    const responseFormat = `{
                                "question": "question here",
                                "traits": ["trait1", "trait2"]
                            }`;
    const traits = 2;
    try {
        const chat = await client.chat(
            {
                model: "command-r",
                message: `Create a ${difficulty} behavioural interview question for a position in tech, along with ${traits} traits that it should be evaluated on. \nRespond with no extra words in this format: ${responseFormat}`
            }
        )
        const jsonResponse = JSON.parse(chat.chatHistory[1].message);

        res.status(200).json(jsonResponse);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default router;
