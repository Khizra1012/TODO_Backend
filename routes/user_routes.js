const {
  register,
  login,
  get_my_profile,
  logout,
} = require("../controllers/user_controller");

const express = require("express");
const isAuthenticated = require("../middlewares/auth");

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me",isAuthenticated, get_my_profile); //same route ho or methods different hon to aisy b likh skty hain hm separate likhny ki bjaey

module.exports = router;
