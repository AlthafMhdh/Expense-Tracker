// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// //Generate JWT token
// const generateToken = (id) => {
//     return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
// }

// //Register User
// exports.registerUser = async(req, res) => {
//     const {fullName, email, password, profileImageUrl} = req.body;

//     if (!fullName || !email || !password) {
//         return res.status(400).json({message: "All fields are required"});
//     }

//     try {
//         const existingUser = await User.findOne({email});
//         if (existingUser) {
//             return res.status(400).json({ message: "Email already exists" });
//         }

//         console.log("Creating user:", req.body);
//         const user = await User.create({
//             fullName,
//             email,
//             password,
//             profileImageUrl,
//         });

//         res.status(201).json({
//             id: user._id,
//             user,
//             token: generateToken(user._id),
//         });
//     } 
//     catch (err) {
//         console.error("Register Error =>", err); 
//         res.status(500).json({message: "Error registering user", error: err.message});
//     }
// };

// //Login User
// exports.loginUser = async(req, res) => {
//     const {email, password} = req.body;

//     if (!email || !password) {
//         return res.status(400).json({message: "All fields are required"});
//     }

//     try {
//         const user = await User.findOne({email});
//         if (!user || !(await user.comparePassword(password))) {
//             return res.status(400).json({message: "Invalid credentials"});    
//         }
//         res.status(201).json({
//             id: user._id,
//             user,
//             token: generateToken(user._id),
//         });
//     } 
//     catch (err) {
//         res.status(500).json({message: "Error login user", error: err.message});
//     }
// };

// //Get User
// exports.getUserInfo = async(req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select("-password");

//         if (!user) {
//             return res.status(404).json({message: "User not found"});
//         }

//         res.status(200).json(user);
//     }
//     catch (err) {
//         res.status(500).json({message: "Error fetching user", error: err.message});
//     }
// };

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
export const registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    console.log("Creating user:", req.body);
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Register Error =>", err);
    res.status(500).json({
      message: "Error registering user",
      error: err.message,
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  console.log("Reached login route but error")

  try {
    const user = await User.findOne({ email });
    console.log("Reached login route")
    // if (!user || !(await user.comparePassword(password))) {
    //   return res.status(400).json({ message: "Invalid credentials" });
    // }

    // res.status(201).json({
    //   id: user._id,
    //   user,
    //   token: generateToken(user._id),
    // });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ user, token });

  } catch (err) {
    res.status(500).json({
      message: "Error login user",
      error: err.message,
    });
  }
};

// Get User Info
export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching user",
      error: err.message,
    });
  }
};
