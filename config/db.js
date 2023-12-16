const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDb connected at host ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`MongoDb connection error ${error}`);
  }
};

module.exports = connectDB;
