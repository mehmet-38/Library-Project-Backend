const express = require("express");
const { isAuth, isAdmin } = require("../middleware/is-auth");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/userController");

router.get("/users", isAuth, isAdmin, userController.getUser);
router.post(
  "/users",
  [
    body("name").trim().notEmpty(),
    body("email").trim().isEmail(),
    body("password").trim().notEmpty(),
    body("role").trim().notEmpty().isNumeric(),
  ],
  isAuth,
  isAdmin,
  userController.addUser
);
module.exports = router;
