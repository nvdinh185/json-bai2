import mongoose from "mongoose";

const bookModel = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    detail: {
      type: String,
    },
    status: {
      type: Boolean,
    }
  },
  {
    timestamps: false,
  }
);

const Book = mongoose.model("book", bookModel);

export default Book;
