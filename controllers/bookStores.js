const db = require("../config/db");

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, isbn, publishedYear } = req.body;

    const [result] = await db.execute(
      `INSERT INTO books (title, author, genre, isbn, published_year)
       VALUES (?, ?, ?, ?, ?)`,
      [title, author, genre, isbn, publishedYear]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      author,
      genre,
      isbn,
      publishedYear,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM books");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getBookById = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM books WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, genre, isbn, publishedYear, isAvailable } = req.body;
    const { id } = req.params;

    await db.execute(
      `UPDATE books 
       SET title = ?, 
           author = ?, 
           genre = ?, 
           isbn = ?, 
           published_year = ?, 
           is_available = ?
       WHERE id = ?`,
      [
        title,
        author,
        genre,
        isbn,
        publishedYear,
        isAvailable,
        id,
      ]
    );

    res.json({ message: "Book updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await db.execute(
      "DELETE FROM books WHERE id = ?",
      [req.params.id]
    );

    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
