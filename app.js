const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
const taskRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');
const protect = require('./middleware/protect');

app.use('/auth',authRouter);
app.use('/tasks', protect, taskRouter);

app.use((req,res)=>{
    res.status(404).json({message: 'Route not found!'});
});
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({message: 'server error'});
});

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log('MongoDB connected!!');
    app.listen(process.env.PORT || 3000, ()=> console.log('Server on http://localhost:3000'));
})
.catch((err)=> 
    {
        console.log('Connection error: ', err);
        process.exit(1);
    });
