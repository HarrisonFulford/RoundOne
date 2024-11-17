// Import .env file
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// set up express app
const app = express();
app.use(express.json());        // allows data in JSON format

app.use(cors());                // allow all origins for now

// const allowedOrigins = ['http://localhost:3000', 'https://roundone.onrender.com/'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };
// app.use(cors(corsOptions));


// add routes
import aiRoutes from './routes/ai.js';
app.use('/ai', aiRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
