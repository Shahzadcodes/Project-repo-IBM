const express = require('express');
const books = require("./booksdb.js");
const jwt = require('jsonwebtoken');
const public_users = express.Router();

public_users.get('/getbooks', async(req, res) => {
  const allBooks = await Object.values(books); 
  res.json(allBooks);
});

public_users.post('/addbook', (req, res) => {
  const { author, title } = req.body;
  const newBook = {
    author,
    title,
    reviews: {} 
  };
  const newId = Object.keys(books).length + 1; 

  books[newId] = newBook;
  res.json({ message: "Book added successfully.", bookId: newId });
});

public_users.get('/author/:author', (req, res) => {
  const author = req.params.author;
  const authorBooks = Object.values(books).filter(book => book.author === author);
  res.json(authorBooks);
});

public_users.get('/title/:title', (req, res) => {
  const title = req.params.title;
  const titleBooks = Object.values(books).filter(book => book.title === title);
  res.json(titleBooks);
});

public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.json(books[isbn]);
  } else {
    res.status(404).json({ message: "Book not found." });
  }
});

public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.json(books[isbn].reviews);
  } else {
    res.status(404).json({ message: "Book not found." });
  }
});

public_users.get('/review/:isbn/:user', (req, res) => {
  const isbn = req.params.isbn;
  const user = req.params.user;
  if (books[isbn] && books[isbn].reviews[user]) {
    res.json({ review: books[isbn].reviews[user] });
  } else {
    res.status(404).json({ message: "Review not found." });
  }
});

module.exports.general = public_users;
