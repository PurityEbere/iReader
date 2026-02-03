const express = require("express");
const router = express.Router();
const bookStores = require("../controllers/bookStores");

router.post("/", bookStores.createBook);
router.get("/", bookStores.getBooks);
router.get("/:id", bookStores.getBookById);
router.put("/:id", bookStores.updateBook);
router.delete("/:id", bookStores.deleteBook);

module.exports = router;
