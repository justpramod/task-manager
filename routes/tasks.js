const express = require('express');
const router = express.Router();
const Tasks = require('../models/Task');
router.post('/',async(req, res)=>{
    try{
    const {title, description} = req.body;
    if(!title || !description) return res.status(400).json({message: 'Title and description required'});
    const task = await Tasks.create({title, description, user: req.userId});
    res.status(201).json({task});
    }
   catch(e){
    res.status(500).json({message: 'Invalid id format'});
   }
});

router.get('/', async(req,res)=>{
    try
    {
        const tasks = await Tasks.find({ user: req.userId});
        if(tasks.length === 0) return res.status(404).json({message: 'Task not found!!'});
        res.status(200).json({tasks});
    }
    catch(e)
    {
    res.status(500).json({message: 'Invalid Id format'});
    }
});

router.put('/:id', async(req, res)=>{
    try{
        const {title, description, completed} = req.body;
        const task = await Tasks.findById(req.params.id);
     if(!task) return res.status(404).json({message: 'Task not found'});
     if(task.user.toString() !== req.userId)return res.status(403).json({message: 'Not your task!!'});
       const updated = await Tasks.findByIdAndUpdate(req.params.id, 
        {title: title || task.title,
         description: description|| task.description,
         completed: completed ?? task.completed},
         {new: true});
         res.status(200).json({updated});
    
    }
    catch(e){
        res.status(500).json({message: 'Invalid Id format'});
    }
});

router.delete('/:id', async(req, res)=>{
try{
    const task = await Tasks.findById(req.params.id);
    if(!task) return res.status(404).json({message: 'Task not found'});
    if(task.user.toString()!== req.userId) return  res.status(403).json({message: 'Not your task!'});
    await Tasks.findByIdAndDelete(req.params.id);
    res.status(200).json({'Deleted task':task});
    
    }
catch(e){
        res.status(500).json({message: 'Invalid Id format'});
    }
})
module.exports = router;