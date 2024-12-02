const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const cookieParser = require('cookie-parser');

const express = require('express');
const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/task', require('./routes/taskRoutes'));
app.use('/api/task/data', require('./routes/taskDataRoutes'));

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
// });

module.exports = app;
