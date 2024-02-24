const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user_router = require("./routes/user_routes");
const task_router = require("./routes/task_routes");
const connectdb = require("./database/database");
const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./middlewares/error");
const cors = require("cors");

config({
  path: "./database/config.env",
});

//using middleware to use Json data
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", 'PUT', 'POST', 'DELETE'],
    credentials: true,
  })
);
app.use("/api/v1/users", user_router); //by default routes k sath /users consider krlia jaey ga
app.use("/api/v1/tasks", task_router); //by default routes k sath /users consider krlia jaey ga

connectdb();

app.get("/", (req, res) => {
  res.send("Nice working");
});

//using error middleware
app.use(errorMiddleware);

module.exports = app;
