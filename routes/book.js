const express = require('express');
const router = express.Router();

const bookController = require('../controllers/BookController');

router.post("/", bookController.createBook);
router.get("/", bookController.getBooks);
router.delete("/:id", bookController.deleteBook);
router.put("/:id", bookController.updateBook);
router.get('/:id', bookController.getABook);

module.exports = router;
