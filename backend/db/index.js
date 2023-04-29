const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const connectToDb = () =>
  mongoose
    .connect(
      `mongodb+srv://${process.env.atlasUser}:${process.env.atlasPassword}@cluster0.k3vhkk7.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("connected to mongoDB"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });

module.exports = connectToDb;
