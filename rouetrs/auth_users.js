const express = require('express');
const jwt = require('jsonwebtoken');
const regd_users = express.Router();



regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const user = req.user.username;

  if (books[isbn]) {
    if (books[isbn].reviews[user]) {
      delete books[isbn].reviews[user];
      res.json({ message: "Review deleted" });
    } else {
      res.status(404).json({ message: "Review not found." });
    }
  } else {
    res.status(404).json({ message: "Book not found." });
  }
});


regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required." });
  } 

  else {
    // users.push({ username, password });
    res.json({ message: "User registered successfully." });
  }
})

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  // const user = users.find(u => u.username === username && u.password === password);
 
    res.json({ message: "Login successful" });

});

regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const user = req.user.username; 
  
  if (books[isbn]) {
    books[isbn].reviews[user] = review;
    res.json({ message: "Review added" });
  } else {
    res.status(404).json({ message: "Book not found." });
  }
});

module.exports.authenticated = regd_users;
