const Book = require("../models/book");
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

module.exports = {
  addBook,
  getBook,
};
