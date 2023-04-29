const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err,req,res,next)=>
{
    
    let error = { ...err };
error.message = err.message;

if (err.name === "CastError") {
  const message = `Resource not found ${err.value}`;
  error = new ErrorHandler(message, 404);
}

// duplicate value error
if (err.code === 11000) {
  const message = "Duplicate field value";
  error = new ErrorHandler(message, 400);
}

// mongoose validation error
if (err.code === "ValidationError") {
  const message = Object.values(err.errors).map((val) => "" + val.message);
  error = new ErrorHandler(message, 400);
}

res.status(error.codeStatus || 500).json({
  success: false,
  error: error.message || "server error",
});
}
    
        

module.exports=errorHandler;