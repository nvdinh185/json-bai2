const mysql = require('mysql');

const configDB = {
  host: "localhost",
  user: "root",
  password: "123456",
  database: "books"
};

class BookController {

  // [GET] /book
  async getListBooks(req, res) {
    try {
      var conn = mysql.createConnection(configDB);

      var sqlSelect = "SELECT * FROM books";
      const listBooks = await new Promise((resolve, reject) => {
        conn.query(sqlSelect, function (err, results) {
          if (err) reject(err);
          resolve(results);
        });
      });
      res.status(200).send(listBooks);
    } catch (err) {
      console.log("Lỗi: " + err);
      res.status(500).send(err);
    } finally {
      conn.end();
    }
  }

  // [GET] /book/:id
  async getBookById(req, res) {
    try {
      var conn = mysql.createConnection(configDB);

      const id = req.params.id;
      const book = await new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM books WHERE id = '${id}'`, (err, row) => {
          if (err) reject(err);
          resolve(row);
        })
      })
      res.status(200).send(book[0]);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      conn.end();
    }
  }

  // [POST] /book
  async createBook(req, res) {
    const { id, title, description, detail, status } = req.body;
    try {
      var conn = mysql.createConnection(configDB);
      const newBook = await new Promise((resolve, reject) => {
        conn.query(`INSERT INTO books VALUES (?, ?, ?, ?, ?)`,
          [id, title, description, detail, status], function (err, results) {
            if (err) {
              reject(new Error(err.message));
            }
            resolve(results);
          });
      });
      res.status(200).send(newBook);
    } catch (error) {
      res.status(500).send(error);
    } finally {
      conn.end();
    }
  }

  // [DELETE] /book/:id
  async deleteBook(req, res) {
    try {
      var conn = mysql.createConnection(configDB);
      const id = req.params.id;
      const deleteBook = await new Promise((resolve, reject) => {
        conn.query(`DELETE FROM books WHERE id = '${id}'`, function (err, results) {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(results);
        });
      })
      res.status(200).send(deleteBook);
    } catch (error) {
      res.status(500).send(error);
    } finally {
      conn.end();
    }
  }

  // [PUT] /book/:id
  async updateBook(req, res) {
    try {
      var conn = mysql.createConnection(configDB);
      const { id, title, description, detail, status } = req.body;
      const updateBook = await new Promise((resolve, reject) => {
        conn.query(`UPDATE books SET title = '${title}', description = '${description}',
              detail = '${detail}', status = '${status}' WHERE id = '${id}'`, function (err, results) {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(results);
        });
      })
      res.status(200).send(updateBook);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    } finally {
      conn.end();
    }
  }
}

module.exports = new BookController();