const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  return users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  return users.some(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;
  
  // Check if username and password is missing
  if (!username || !password) {
    return res.status(404).json({message: "Error logging in. Missing username or password"});
  }

  // Authenticate user
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
      }, 'access', { expiresIn: 60 * 60});

      //Store access token and username in session
      req.session.authorization = {
        accessToken, username
      }
      return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
  });

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const review = req.body.review;

  // Extract username from session
  const username = req.session.authorization ? req.session.authorization.username : null;
  // Check if the isbn is valid    
  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }
  
  if (!username) { // Is there any user authenticated?
    return res.status(208).json({message: "Not logged in. Please log in to add a review"});
  }
  
  // Add or update the review for the book
  books[isbn].reviews[username] = review;
  return res.status(200).json({message: "Review added/updated successfully"});    
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  // Extract username from session
  const username = req.session.authorization ? req.session.authorization.username : null;

  // Check if the isbn is valid    
  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }

  if (!username) { // Is there any user authenticated?
    return res.status(208).json({message: "Not logged in. Please log in to delete a review"});
  }

  // Check if the user has a review for the book
  if (!books[isbn].reviews[username]) {
    return res.status(404).json({message: "Review not found for this user"});
  }

  // Delete the review
  delete books[isbn].reviews[username];
  return res.status(200).json({message: "Review deleted successfully"});

});
  
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
