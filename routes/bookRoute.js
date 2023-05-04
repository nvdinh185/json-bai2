import express from "express";
const router = express.Router();
import { getBooks, createBook, deleteBook, getABook, updateBook } from "../controllers/bookController.js";

router.post("/", createBook);
router.get("/", getBooks);
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);
router.get('/:id', getABook);

export default router;
