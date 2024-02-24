const User = require("../models/user_model");

const bcrypt = require("bcrypt");
const JsonWebToken = require("jsonwebtoken");
const sendcookie = require("../utils/features");
const { Errorhandler } = require("../middlewares/error");

const login = async (req, res, next) => {

  try{
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password"); //it means data to mily baki laikin 7 passwrd b mily werna wo nh milna tha because we write select false in schema
  
    if (!user) return next(new Errorhandler("Invalid Email or password", 400));
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) return next(new Errorhandler("Invalid Email or password", 400));
  
    sendcookie(user, res, `Welcome back ${user.name}`, 201);
  }
  catch(error){
    next(error)
  }
  
};

const register = async (req, res, next) => {
try{
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return next(new Errorhandler("User Already exist", 400));

  const hashedpassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedpassword });

  sendcookie(user, res, "Registered successfully", 201);
}
catch(error){
next(error)
}

  
};

const get_my_profile = async (req, res) => {

  try{
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
  catch(error){
next(error)
  }
 
};

const logout =  (req, res) => {
  res
    .status(200)
    .cookie("token", "", { 
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: process.env.NODE_ENV==='Development' ? "lax" : "none",
        secure: process.env.NODE_ENV==='Development'? false:true,
      
    })
    .json({
      success: true,
      user: req.user,
    });
};
module.exports = { register, get_my_profile, login, logout };
