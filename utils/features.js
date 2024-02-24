const JsonWebToken = require("jsonwebtoken");

const sendcookie = (user, res, message, statusCode=200) => {
  const cookie_value = JsonWebToken.sign(
    { _id: user._id },
    process.env.jwt_secret
  );

  res.status(statusCode)
    .cookie("token", cookie_value, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV=='Development' ? "lax": "none",
      secure: process.env.NODE_ENV=='Development'? false:true,
    })
    .json({ success: true, message: message });
};


module.exports=sendcookie;
