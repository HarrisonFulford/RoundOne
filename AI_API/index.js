// Import .env file
import 'dotenv/config';
import express from 'express';

// set up express app
const app = express();
app.use(express.json());        // allows data in JSON format

// add routes
import aiRoutes from './routes/ai.js';
app.use('/ai', aiRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
