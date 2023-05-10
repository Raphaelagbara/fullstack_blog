const User = require('../models/userModel');
const errorResponse=require('../utils/errorResponse');

exports.signup = async(req,res, next)=>{
    const{email}= req.body;
    const userExist = await User.findOne({email});
    if(userExist){
        return next(new errorResponse('Email already registered', 400));
    }
    try{
        const user = await User.create(req.body);
        res.status(201).json({
            success:true,
            user
        })
    }catch(error){
        next(error);
    }
}

//sign in

exports.signin = async (req, res, next) => {
  try{
        const {email, password} = req.body;
        //validation
        if(!email){
            return next(new errorResponse('please add an email address', 400));
        }
        if (!password) {
          return next(new errorResponse("please add an email password", 400));
        }
        // to check user email in db
        if(!email){
            return next(new errorResponse('invalid credentials',400));
        }
        // check password
        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            return next(new errorResponse('invalid password',400))
        }

        jwtTokenResponse(user,200,res);
  }
  catch(error){
        next(error);
  }
};

const jwtTokenResponse = async(user,codeStatus,res) => {
    const token = await user.getJwtToken();
    res.status(codeStatus)
    .cookie('token', token, {message: 60 * 60 * 1000, httpOnly:true})
    .json({
        success:true,
        id:user.id,
        role:user.role
    })
}

// logout
exports.logout = async (req, res, next) => {
  res.clearCookie('token');
  res.status(200).json({
    success:true,
    message:"logged out"
  })
};

// user profile
exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json({
    success:true,
    user
  })
};