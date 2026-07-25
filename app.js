const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
const taskRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');
const protect = require('./middleware/protect');
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('MongoDB connected!!'))
.catch((err)=> console.log('Connection error: ', err));

app.use('/auth',authRouter);

