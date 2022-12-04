const moongose = require("mongoose");

const Schema = moongose.Schema;

const bookSchema = new Schema({
  book_name: {
    type: String,
    required: true,
  },
  book_type: {
    type: String,
    required: true,
  },
  book_author: {
    type: String,
    required: true,
  },
});

module.exports = moongose.model("Book", bookSchema);
