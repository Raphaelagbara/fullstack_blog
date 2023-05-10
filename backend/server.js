const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDb = require("./db/index.js");
// error middleware
const errorHandler = require('./middleware/error');
require("dotenv").config();
const port = process.env.PORT || 5000;


// importing routes
const auth= require('./routes/auth');
const postRoutes = require('./routes/postRoutes');


// middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors());



//routes middleware
app.use('/api',auth);
app.use('/api', postRoutes);

//error middleware
app.use(errorHandler);


//connecting to Mongodb
Promise.all([connectToDb()])
  .then(() =>
    app.listen(5000, () => console.log(`Blog is listening on port ${port}`))
  )
  .catch((error) => {
    console.error(`MongoDB Atlas Error: ${error}`);
    process.exit();
  });
