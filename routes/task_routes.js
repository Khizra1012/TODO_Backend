const express = require("express");
const { newTask, get_my_tasks, update_tasks, delete_tasks } = require("../controllers/task_controllers");
const isAuthenticated = require("../middlewares/auth");

const router = express.Router();

router.post("/new", isAuthenticated, newTask); //task just usi case mai add huskta h jb user login ho

router.get("/my", isAuthenticated, get_my_tasks);

router.route("/:id").put(isAuthenticated, update_tasks).delete(isAuthenticated, delete_tasks);

module.exports = router;
