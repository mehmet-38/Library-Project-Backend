const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const borrowSchema = new Schema({
  active: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  borrowDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Borrower", borrowSchema);
