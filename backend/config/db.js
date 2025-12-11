// // const mongoose = require("mongoose");

// // const connetDB = async () => {
// //     try {
// //         await mongoose.connect(process.env.Mongodb_URl, {});
// //         console.log("DB Connected");
// //     }
// //     catch (err){
// //         console.error("Error connecting DB", err);
// //         process.exit(1);
// //     }
// // };

// // module.exports = connetDB;

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.Mongodb_URl, {});
//     console.log("DB Connected");
//   } catch (err) {
//     console.error("Error connecting DB", err);
//     process.exit(1);
//   }
// };

// export default connectDB;


// config/db.js
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    if (!process.env.Mongodb_URl) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    cached.promise = mongoose.connect(process.env.Mongodb_URl, {});
    console.log("DB Connected");
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
