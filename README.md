# Cheat Sheet Node.js and Express

## Table of Contents

* [Safe clone of external repos into the learning path](#safe-clone-of-external-repos-into-the-learning-path)
* [Module 1 - Introduction to Server-Side JavaScript](#module---introduction-to-server-side-javascript)

## Safe clone of external repos into the learning path

#### 🧹 Start fresh: remove old local copy and clone your clean repo
```sh
rm -rf nodejs-learning/
git clone git@github.com:maolenin/node.js-learning.git
cd node.js-learning/
```

#### 🔗 Add the external IBM repo as a subtree inside your project (squashed = single clean commit)
```sh
  git subtree add --prefix 01_lkpho-Cloud-applications-with-Node.js-and-React \
  https://github.com/ibm-developer-skills-network/lkpho-Cloud-applications-with-Node.js-and-React.git \
  main --squash
```

#### 🧽 Remove any node_modules folders (safely cleans project)
```sh
git filter-repo --path-glob '*/node_modules/*' --invert-paths
```

#### 🧰 Optimize repository after cleaning
```sh
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

#### 🧱 Add .gitignore to prevent node_modules from ever being committed again
```sh
echo "node_modules/" >> .gitignore
git add .gitignore
git commit -m "Add .gitignore to exclude node_modules"
```

#### 🔗 (If not already set) Add your remote repository
```sh
git remote add origin git@github.com:maolenin/node.js-learning.git
```

#### 🚀 Push everything to GitHub
```sh
git push -u origin main --force
```

## Module 1 - Introduction to Server-Side JavaScript

### http/createServer
http package is used for establishing remote connections to a server or to create a server which listens to client.
createServer - Takes a requestListener, a function which takes request and response parameters, where request is the handle to the request from the client and response is the handle to be sent to the client.

```js
const http = require('http');
const requestListener = function(req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}
const port = 8080;
const server = http.createServer(requestListener);
console.log('server listening on port: '+ port);
server.listen(port);
```

### new Date()
new Date() method returns the current date as an object. You can invoke methods on the date object to format it or change the timezone.	

```js
module.exports.getDate = function getDate() {
    let aestTime = new Date().toLocaleString("en-US", {timeZone: "Australia/Brisbane"});
    return aestTime;
}
```

### import()
The import statement is used to import modules that some other module has exported. A file that includes reusable code is known as a module.	

```js
// addTwoNos.mjs
function addTwo(num) {
  return num + 4;
}
export { addTwo };
// app.js
import { addTwo } from './addTwoNos.mjs';
// Prints: 8
console.log(addTwo(4));
```

### require()
The built-in NodeJS method require() is used to incorporate external modules that are included in different files. The require() statement essentially reads and executes a JavaScript file before returning the export object.	

```js
module.exports = 'Hello Programmers';
let msg = require('./messages.js');
console.log(msg);
```

### Working with JSON
Essential for APIs—data is exchanged in JSON format.

```js
let jsonData = '{"title":"Express 101","rating":5}';

const bookObj = JSON.parse(jsonData);    // convert JSON to JS object
const newJson = JSON.stringify(bookObj); // convert JS object to JSON
```

### Simple Node.js + Express example
Create a minimal server that responds with JSON data.

```js
// app.js
const express = require("express");
const app = express();
app.use(express.json());  // to parse JSON bodies

app.get("/books", (req, res) => {
  res.json([{ title: "Learn Node", rating: 4 }]);  // return JSON response
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

### req.params
```js
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;  // extract dynamic part from URL
  res.send(`User ID is ${userId}`);
});
```

### req.query

```js
app.get('/books', (req, res) => {
  const author = req.query.author;  // extract ?author= value from query string
  res.send(`Filter by author: ${author}`);
});
```

### req.body

```js
app.post('/register', (req, res) => {
  const username = req.body.username;  // get value from request body
  res.send(`Username received: ${username}`);
});
```
