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

// export const deleteUser = async (req, res, next) => {
//   try {
//     const id = req.params.id
//     console.log(id);
//     const deleteUser = await User.findByIdAndDelete(id)
//     res.send(deleteUser)
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// export const updateUser = async (req, res, next) => {
//   try {
//     const id = req.params.id
//     const name = req.body
//     console.log(name, "name");
//     const updateUser = await User.findByIdAndUpdate(id, name)
//     res.send(updateUser)
//   } catch (error) {
//     res.send({ "error": error.message })
//   }
// }

// export const searchUser = async (req, res) => {
//   try {
//     const data = req.query.name
//     console.log(data, 'name');
//     const searchUser = await User.find({ "name": { $regex: data, $options: 'i' } },)
//     res.send(searchUser)
//   } catch (error) {
//     res.send({ "error": error.message })
//   }
// }