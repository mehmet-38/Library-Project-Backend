const express = require("express");
const { isAuth, isAdmin } = require("../middleware/is-auth");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/users", isAuth, isAdmin, userController.getUser);
module.exports = router;
