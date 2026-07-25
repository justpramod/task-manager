const jwt = require('jsonwebtoken');
module.exports = async (req, res, next)=>
{
    try{
        const tkn = req.headers.authorization;
        if(!tkn) return res.status(401).json({message: 'Login First!'});
        const token = tkn.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch(e){
        res.status(401).json({message: 'Not authorized'});
    }
}