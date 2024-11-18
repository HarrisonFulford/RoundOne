
// Import .env file & mongodb database url
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoString  = process.env.DATABASE_URL

// Connect to database
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})
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
const userRoutes = require('./routes/users');
const questionRoutes = require('./routes/questions');
app.use('/user', userRoutes);
app.use('/question', questionRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
