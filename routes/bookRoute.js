import express from "express";
const router = express.Router();
import { getBooks, createBook } from "../controllers/bookController.js";

router.post("/", createBook);
router.get("/", getBooks);
// router.delete("/delete/:id", deleteUser)
// router.put("/updates/:id", updateUser)
// router.get('/search', searchUser)

export default router;
