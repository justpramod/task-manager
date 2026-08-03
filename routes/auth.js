const User = require('../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async(req,res)=>{
    try{
        const {username, password} = req.body;
        if(!username || !password) return res.status(400).json({message: 'username and password required'});
        const hashedpassword = await bcrypt.hash(password, 12);
        const user = await User.create({username: username, password: hashedpassword});
        res.status(201).json({message: 'User registered', username: user.username});
    }
    catch(e){
        if(e.code === 11000) return res.status(409).json({message: 'Username already taken, try another one!!'});
        next(e);
    }
});

router.post('/login', async(req, res)=>{
    try{
        const {username, password} = req.body;
        if(!username || !password) return res.status(400).json({message: 'Required Username and password to login'});

        const user = await User.findOne({username: username});
        if(!user) return res.status(404).json({message: 'Incorrect password !!'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({message: 'Incorrect username or password'});

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );
        res.status(200).json({token});
    }
    catch(e){
        res.status(500).json({message: 'Invalid Id format'});
    }
});
module.exports = router;
