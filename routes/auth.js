const express = require("express");
const { body } = require("express-validator");
const { isAuth } = require("../middleware/is-auth");
const router = express.Router();
const authController = require("../controllers/authController");

router.put(
  "/signup",
  [
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("password").trim().isLength({ min: 6 }),
    body("name").trim().notEmpty(),
    body("role").isNumeric().withMessage("Please enter a number"),
  ],
  authController.signup
);
router.post("/login", authController.login);
router.get("/test-auth", isAuth, (req, res, next) => {
  res.json("basarili route");
  next();
});
module.exports = router;
