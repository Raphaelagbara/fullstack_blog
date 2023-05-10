const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// to check if user is authenticated
exports.isAuthenticated = async (req,res,next)=>{
    const {token} = req.cookies;
    // checking the availaibity of token
    if(!token){
        return next (new ErrorResponse('You are not logged in',401));
    }

    try{
        //verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await user.findById(decodedToken.id);
        next();
    }
    catch(err){
        return next (new ErrorResponse('you are have not been authenticated',401));
    }
}

//middleware for admin

exports.isAdmin = (req,res,next) => {
    if(req.user.role === 0){
        return next (new ErrorResponse('access denied, you must be an admin', 401))
    }
    next();
}
