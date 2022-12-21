const Book = require("../models/book");
const User = require("../models/user");
const BorrowBook = require("../models/borrowBook");
const { validationResult } = require("express-validator");

const addBook = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const book_name = req.body.book_name;
  const book_author = req.body.book_author;
  const book_type = req.body.book_type;

  const book = new Book({
    book_name: book_name,
    book_author: book_author,
    book_type: book_type,
  });
  try {
    book.save();
    res.status(200).json("Successfully applied");
  } catch (error) {
    res.status(500).json(error);
  }
};
const getBook = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
};
const borrowBook = (req, res) => {
  const userId = req.currentUser._id;
  //const user = User.findOne({ _id: userId });
  const bookId = req.body.bookId;
  const borrowBook = new BorrowBook({
    active: true,
    userId: userId,
    bookId: bookId,
  });
  try {
    borrowBook.save();
    res.status(200).json("Successfully applied");
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  addBook,
  getBook,
  borrowBook,
};
