const  JsonWebToken = require("jsonwebtoken");
const User = require("../models/user_model");


const isAuthenticated=async(req, res, next)=>{
  const { token } = req.cookies; //thats why we use cookieparser

  if (!token)
    return res.status(404).json({ success: false, message: "Login First" });

  const decoded = await JsonWebToken.verify(token, process.env.jwt_secret);

  // console.log(decoded);

   req.user = await User.findById(decoded._id);   //decoded data sy hmain _id milti or 1 or chez milti is liay hmny id lay li is mai sy

   next();
}

module.exports=isAuthenticated;