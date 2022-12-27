const express = require("express");
const bookController = require("../controllers/bookController");
const { body } = require("express-validator");
const router = express.Router();
const { isAuth, isAdmin } = require("../middleware/is-auth");
router.post(
  "/book",
  [
    body("book_name").trim().notEmpty(),
    body("book_author").trim().notEmpty(),
    body("book_type").trim().notEmpty(),
  ],
  isAuth,
  isAdmin,
  bookController.addBook
);
router.get("/my-book", isAuth, bookController.getBookWithId);
router.get("/book", bookController.getBook);
router.post("/borrow-book", isAuth, bookController.borrowBook);
module.exports = router;
