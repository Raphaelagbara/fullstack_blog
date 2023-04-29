const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose= require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({limit:'10mb', extended:true}));
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT||5000

app.listen(port,()=>{
    console.log(`server is cooking on ${port}`)
})
