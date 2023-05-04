import Book from "../model/book.js";

export const createBook = async (req, res) => {
  try {
    const { id, title, description, detail, status } = req.body;
    const newBook = await Book.create({
      id,
      title,
      description,
      detail,
      status
    });
    res.status(200).json(newBook);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getBooks = async (req, res) => {
  try {
    const listBooks = await Book.find();
    res.status(200).json(listBooks);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteBook = await Book.findOneAndDelete({ id });
    res.send(deleteBook);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updateBook = await Book.findOneAndUpdate({ id }, body);
    res.send(updateBook);
  } catch (error) {
    res.send({ "error": error.message });
  }
}

export const getABook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findOne({ id });
    res.send(book);
  } catch (error) {
    res.send({ "error": error.message });
  }
}