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

export default mongoose.model("book", bookModel);
