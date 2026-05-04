const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;

  // Check if username and password are provided
  if (username && password) {
    //check is the user already exist
  //  if (!isValid(username)) {
      users.push({"username":username, "password":password});
      return res.status(200).json({message: "User succesfully registered"});
    /*} else {
      return res.status(404).json({message: "User already exists!"});
      }*/
  } else {
    return res.status(404).json({message: "Unable to register user."});
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn], null, 4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  // Get the author parameter from url
  const author = req.params.author;
  let filtered_author = Object.values(books).filter(
    (book) => book.author === author);
    res.send(JSON.stringify(filtered_author, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  // Get the book's title from paramaters url
  const title = req.params.title;
  let filtered_title = Object.values(books).filter(
    (book) => book.title === title);
    res.send(JSON.stringify(filtered_title, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  const book = books[isbn];
  res.send(book.reviews);
});

module.exports.general = public_users;
