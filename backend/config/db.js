// const mongoose = require("mongoose");

// const connetDB = async () => {
//     try {
//         await mongoose.connect(process.env.Mongodb_URl, {});
//         console.log("DB Connected");
//     }
//     catch (err){
//         console.error("Error connecting DB", err);
//         process.exit(1);
//     }
// };

// module.exports = connetDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //await mongoose.connect(process.env.MONGODB_URL, {});
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (err) {
    console.error("Error connecting DB", err);
    process.exit(1);
  }
};

export default connectDB;
