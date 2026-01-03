# Cheat Sheet Node.js and Express

## Table of Contents

* [Safe clone of external repos into the learning path](#safe-clone-of-external-repos-into-the-learning-path)
* [Module 1 - Introduction to Server-Side JavaScript](#module-1---introduction-to-server-side-javascript)
* [Promises, Async/Await, and Axios Requests in Node.js and Express](#promises,-async/await,-and-axios-requests-in-node.js-and-express) 
* [Module 2 - Cheat Sheet: Asynchronous I/O with Callback Program](#module-2---cheat-sheet:-asynchronous-i/o-with-callback-program)
* [Authentication and Authorization in Node.js](#authentication-and-authorization-in-node.js)
* [Module 3 Cheat Sheet: Express Web Application Framework](#module-3-cheat-sheet:-express-web-application-framework)

## Safe clone of external repos into the learning path

1. Start fresh: remove old local copy and clone your clean repo

```sh
rm -rf nodejs-learning/ # Only if the repo already exist and it is wrong
git clone git@github.com:maolenin/node.js-learning.git
cd node.js-learning/
git status --porcelain # must be empty
```

2. Clone the external repo outside the main repo

```sh
  git clone https://github.com/ibm-developer-skills-network/lkpho-Cloud-applications-with-Node.js-and-React.git /tmp/lkpho
```

3. Clean the external repo

```sh
cd tmp/lkpho # VERY IMPORTANT 
gti filter-repo --path-glob '*/node_modules/*' --invert-paths

rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

4. Import the cleaned repo as a subtree

```sh
cd ~/node.js-learning
git subtree add \
  --prefix 01_lkpho-Cloud-applications-with-Node.js-and-React \
  /tmp/lkpho \
  main \
  --squash
```

5. Prevent future node_modules commits

```sh
echo "node_modules/" >> .gitignore
git add .gitignore
git commit -m "chore: ignore node_modules"
```

6. Push normally to GitHub

```sh
git push origin main
```
7. (If not already set) Add your remote repository

```sh
git remote add origin git@github.com:maolenin/node.js-learning.git
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

## Promises, Async/Await, and Axios Requests in Node.js and Express

1. Promises

A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It allows you to chain operations in a more readable and manageable way.

### Creating a Promise

To create a Promise, you use the new Promise constructor, which takes a function with two parameters: resolve and reject. The resolve function is called when the asynchronous operation completes successfully, and the reject function is called when it fails.

```js
// Creating a new Promise object and assigning it to the variable myPromise
const myPromise = new Promise((resolve, reject) => {

  // Simulating a condition with a boolean variable 'success'
  let success = true;

  // If the condition is true, call resolve to mark the promise as fulfilled
  if (success) {
    resolve("The operation was successful!");
  } else {
    // If the condition is false, call reject to mark the promise as rejected
    reject("The operation failed!");
  }
});
```

### Using Promises with .then() and .catch()

You can handle the resolved value or the error using .then() and .catch() methods. These methods also return Promises, allowing you to chain multiple asynchronous operations in sequence.

```js
// Execute the promise and handle the fulfilled and rejected states
myPromise

  // Handle the resolved state of the promise
  .then((message) => {
    // This block will execute if the promise is resolved
    console.log(message); // "The operation was successful!"
  })

  // Handle the rejected state of the promise
  .catch((error) => {
    // This block will execute if the promise is rejected
    console.error(error); // "The operation failed!"
  });
```

### Example: Reading a file

Here's an example using the fs.promises module to read a file. The fs.promises module provides Promise-based methods for file system operations.

```js
// Import the 'fs' module and use its promise-based methods
const fs = require('fs').promises;

// Read the content of the file 'example.txt' with 'utf8' encoding
fs.readFile('example.txt', 'utf8')

  // Handle the resolved state of the promise
  .then((data) => {
    // This block will execute if the file is read successfully
    console.log(data); // Print the file content to the console
  })

  // Handle the rejected state of the promise
  .catch((err) => {
    // This block will execute if there is an error reading the file
    console.error('Error reading file:', err); // Print the error message to the console
  });
```

2. Async/Await

As you might have already learnt, Java Script is a single-threaded scripting language. It means the process can happen only sequentially and no two processes can happen simultaneously. This is a big deterrent to any language and JS solved this by introducing asynchronous programming through Promises. While Promises solved the issues with synchronous programming, nested then can compilcate the structure and readability of the code.

Async and Await are syntactic sugar over Promises, making asynchronous code look more like synchronous code, which is easier to read and write. An async function returns a Promise, and you can use await inside an async function to pause execution until a Promise is resolved or rejected.

### Using async and await

```js
An async function always returns a Promise. Inside the async function, you can use the await keyword to pause execution until a Promise is resolved or rejected.

// Async function that wraps the operation
async function myAsyncFunction() {
  // Simulating a condition with a boolean variable 'success'
  let success = true;

  // If the condition is true, resolve with a success message
  if (success) {
    return "The operation was successful!";
  } else {
    // If the condition is false, throw an error to simulate rejection
    throw new Error("The operation failed!");
  }
}
// Using async function to handle Promise
async function executeAsyncFunction() {
  try {
    // Await the async function call to get the result
    const result = await myAsyncFunction();
    console.log(result); // Output the result if successful
  } catch (error) {
    console.error(error.message); // Handle and output any errors
  }
}

// Call the async function to execute
executeAsyncFunction();
```

This example shows how async and await can simplify asynchronous programming in JavaScript. The async function myAsyncFunction simulates a conditional operation, returning a success message if the condition is met and throwing an error otherwise. The executeAsyncFunction uses await to call myAsyncFunction and handles the result or any errors using try and catch. This approach makes the code easier to read and understand compared to handling promises with .then() and .catch() chains.

3. Axios Requests

Axios is a promise-based HTTP client for the browser and Node.js. It makes it easy to send asynchronous HTTP requests to REST endpoints and perform CRUD operations. Axios automatically transforms JSON data and provides a clean and simple API.

### How Axios is Used

`npm install axios`

#### Making a GET Request

```js
// Import the axios library

const axios = require('axios');

// Using the axios.get method to make a GET request to the specified URL.

axios.get('https://api.example.com/data')

  // If the request is successful, the `.then` block is executed.

  .then(response => {
    // The response object contains the data returned from the server.
    // We log the `data` property of the response to the console.

    console.log(response.data);
  })

  // If there is an error during the request, the `.catch` block is executed.

  .catch(error => {

    // We log an error message to the console along with the error object.
    // This helps in debugging and understanding what went wrong with the request.

    console.error('Error fetching data:', error);
  });
```

The axios.get method returns a Promise that resolves with the response object, allowing you to access the data with response.data.

#### Making a POST Request:

```js
// Import the axios library.

const axios = require('axios');

// Data to be sent in the POST request. This is a JavaScript object containing the user information.
const data = {
  name: 'John Doe',
  age: 30
};

// Using the axios.post method to make a POST request to the specified URL with the data object.
axios.post('https://api.example.com/users', data)
  
// If the request is successful, the `.then` block is executed.
  .then(response => {
    
// The response object contains the data returned from the server.
// We log a message along with the `data` property of the response to the console.
    
    console.log('User created:', response.data);
  })
  // If there is an error during the request, the `.catch` block is executed.
  
    .catch(error => {
    // We log an error message to the console along with the error object.
    // This helps in debugging and understanding what went wrong with the request.
    
    console.error('Error creating user:', error);
  });
```

This code snippet demonstrates the basic usage of axios for making HTTP POST requests and handling responses and errors.

#### Example: Using Async/Await with Axios

Combining async/await with Axios provides a clean approach to handle HTTP requests:

```js
const axios = require('axios'); // For Node.js, or include via CDN for browser

// Asynchronous function to post data to an API
async function postData() {
  try {
    // Await the response from the Axios POST request
    let response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo', // The title of the post
      body: 'bar',  // The body/content of the post
      userId: 1     // The user ID associated with the post
    });

    // Log the response data to the console
    console.log(response.data);
  } catch (error) {
    // If there is an error, log the error message to the console
    console.error('Error posting data:', error);
  }
}

// Call the async function to execute the request
postData();
```

Here, await pauses the function execution until the POST request completes, and the result is handled inside the try block.

## Module 2 - Cheat Sheet: Asynchronous I/O with Callback Program

### Async-await	
We can await promises as long as they are being called inside asynchronous functions.	

```js
const axios = require('axios').default;
let url = "some remote url"
async function asyncCall() {
  console.log('calling');
  const result = await axios.get(url);
  console.log(result.data);
}
asyncCall();
```

### Callback	
Callbacks are methods that are passed as parameters. They are invoked within the method to which they are passed as a parameter, conditionally or unconditionally. We use callbacks with a promise to process the response or errors.	

```js
//function(res) and function(err) are the anonymous callback functions
axios.get(url).then(function(res) {
    console.log(res);
}).catch(function(err) {
    console.log(err)
})
```

### Promise	
An object that is returned by some methods, representing eventual completion or failure. The code continues to run without getting blocked until the promise is fulfilled or an exception is thrown.	

```js
axios.get(url).then(
//do something
).catch(
//do something
) 
```

### Promise use case	
Promises are used when the processing time of the function we invoke takes time like remote URL access, I/O operations file reading, etc.	

```js
let prompt = require('prompt-sync')();
let fs = require('fs');
const methCall = new Promise((resolve,reject)=>{
    let filename = prompt('What is the name of the file ?');
    try {
      const data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'});
      resolve(data);
    } catch(err) {
      reject(err)
    }
});
console.log(methCall);
methCall.then(
  (data) => console.log(data),
  (err) => console.log("Error reading file")
);
```

### object.on()	
It defines an event handler that the framework calls when an event occurs	

```js
http.request( options, function(response) {
 let buffer = ‘’;
 ...
 response.on('data', function(chunk) {
   buffer += chunk;
 });
 response.on('end', function() {
   console.log(buffer);
 });
}).end();
```

### Callback Hell/The Pyramid of Doom	
Nested callbacks stacked below one another and waiting for the previous callback. This creates a pyramid structure that affects the readability and maintainability of the code.	

```js
const makeCake = nextStep => {
  buyIngredients(function(shoppingList) {
    combineIngredients(bowl, mixer, function(ingredients){
      bakeCake(oven, pan, function(batter) {
        decorate(icing, function(cake) {
          nextStep(cake);
        });
      });
    });
  });
};
```

### Axios Request	
The axios package handles HTTP requests and returns a promise object.	

```js
const axios = require('axios').default;
const connectToURL=(url)=>{
  const req=axios.get(url);
  console.log(req);
  req.then(resp=>{
  console.log("Fulfilled");
  console.log(resp.data);
  })
  .catch(err=>{
  console.log("Rejected");
  });
}
connectToURL('valid-url')
connectToURL('invalid-url')
```

## Authentication and Authorization in Node.js

### Session-based

Session-based authentication is the oldest form of authentication technology. Typically, the flow of a session is as follows.

- The user uses their credentials to log in.
- The login credentials are verified against the credentials in a database. The database is responsible for storing which resources can be accessed based on the session ID.
- The server creates a session with a session ID that is a unique encrypted string. The session ID is stored in the database.
- The session ID is also stored in the browser as a cookie.
- When the user logs out or a specified amount of time has passed, the session ID is destroyed on both the browser and the database.

```js
const express = require('express');
const session = require('express-session');

const app = express();

// Middleware to set up session management
app.use(session({
  secret: 'secret-key',      // Replace with a strong secret key
  resave: false,             // Whether to save the session data if there were no modifications
  saveUninitialized: true,   // Whether to save new but not modified sessions
  cookie: { secure: false }  // Set to true in production with HTTPS
}));

// POST endpoint for handling login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simulated user authentication (replace with actual logic)
  if (username === 'user' && password === 'password') {
    req.session.user = username;  // Store user information in session
    res.send('Logged in successfully');
  } else {
    res.send('Invalid credentials');
  }
});

// GET endpoint for accessing dashboard
app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome ${req.session.user}`);  // Display welcome message with user's name
  } else {
    res.send('Please log in first');
  }
});
// Start the server on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));
```

### Token-based

Token-based security entails two parts: authentication and authorization. Authentication is the process of providing credentials and obtaining a token that proves the user's credentials.
Authorization refers to the process of using that token so the resource server knows which resources the user should have access to.

```js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const secretKey = 'your-secret-key'; // Replace with a strong secret key

// POST endpoint for user login and JWT generation
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simulated user authentication
  if (username === 'user' && password === 'password') {
    // Generate JWT with username payload
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token }); // Send token as JSON response
  } else {
    res.send('Invalid credentials');
  }
});

// GET endpoint to access protected resource (dashboard)
app.get('/dashboard', (req, res) => {
  // Get token from Authorization header
  const token = req.headers['authorization'];

  if (token) {
    // Verify JWT token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.send('Invalid token');
      } else {
        // Token is valid, send welcome message with username
        res.send(`Welcome ${decoded.username}`);
      }
    });
  } else {
    res.send('Token missing');
  }
});

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));
```

### Passwordless

With passwordless authentication, the user does not need login credentials, but rather, they gain access to the system by demonstrating they possess a factor that proves their identity. Common factors include biometrics such as a fingerprint, a "magic link" sent to their email address, or a one-time passcode sent to a mobile device. Password recovery systems now commonly use passwordless authentication.

```js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

const users = {}; // In-memory storage for demo purposes

// Endpoint to request access and send verification code via email
app.post('/request-access', (req, res) => {
  const { email } = req.body;

  // Generate a 6-digit verification code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Store the code in memory (users object)
  users[email] = code;

  // Simulated email sending (for demonstration)
  console.log(`Sending code ${code} to ${email}`);

  res.send('Code sent to your email');
});

// Endpoint to verify the received code
app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;

  // Compare the received code with stored code for the email
  if (users[email] === code) {
    // Code matches, access granted
    res.send('Access granted');
  } else {
    // Code does not match, access denied
    res.send('Invalid code');
  }
});

// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000'));
```

## Module 3 Cheat Sheet: Express Web Application Framework

### Dependencies in `package.json`	
A dependency of express version between 4.0 to 5.0 will be declared as:

```js
"dependencies":{"express":"4.x"}
```

### new express()	
Creates an express object which acts as a server application.

```js
const express = require(“express”);
const app = new express();
```

### express.listen()
The listen method is invoked on the express object with the port number on which the server listens. The function is executed when the server starts listening.

```js
app.listen(3333, () => {
  console.log(“Listening at
  http://localhost:3333)
})
```

### express.get();	
This method is meant to serve the retrieve requests to the server. The get() method is to be implemented with two parameters; the first parameter defining the end-point and the second parameter is a function taking the request-handler and response-handler.

```js
// handles GET queries to end point /user/about/id.
app.get(“user/about/:id”, (req,res)=>{
  res.send(“Response about user ”
  +req.params.id)
})
```

### express.post();
This method is meant to serve the create requests to the server. The post() method is to be implemented with two parameters: the first parameter defines the end-point and the second parameter is a function taking the request-handler and response-handler.

```js
// handles POST queries to the same end point.
app.post(“user/about/:id”, (req,res)=>{
  res.send(“Response about user ”
  +req.params.id)
})
```

### express.use()
This method takes middleware as a parameter. Middleware acts as a gatekeeper in the same order that it is used, before the request reaches the get() and post() handlers. The order in which the middleware is chained depends on the order in which the .use() method is used to bind them. The middleware myLogger() function takes three parameters, which are request, response, and next. You can define a method that takes these three parameters and then bind it with express.use() or router.use(). Here, you are creating middleware named myLogger and making the application use it.  The output rendered includes the time the request is received.

```js
const express = require("express");
const app = new express();
function myLogger(req, res, next){
  req.timeReceived = Date();
  next();
}
app.get(“/”, (req, res)=>{
  res.send(“Request received at
  "+req.timeReceived+“ is a success!")
})
```

### express.Router()
Router-level middleware is not bound to the application. Instead, it is bound to an instance of express.Router(). You can use specific middleware for a specific route instead of having all requests going through the same middleware. Here, the route is /user and you want the request to go through the user router. Define the router, define the middleware function that the router will use and what happens next, and then you bind the application route to the router.

```js
const express = require(“express”);
const app = new express();
let userRouter = express.Router();
let itemRouter = express.Router();
userRouter.use(function (req, res, next){
  console.log(“User quert time:”, Date());
  next();
})
userRouter.get(“/:id”, function (req, res,
  next) {
  res.send(“User ”+req.params.id+ “ last
  successful login ”+Date())
})
app.listen(3333, () => {
  console.log(“Listening at http://localhost:3333)
})
```

### express.static()
This is an example of static middleware that is used to render static HTML pages and the images from the server side. At the application level, the static files can be rendered from the cad220_staticfiles directory. Notice that the URL has only the server address and the port number followed by the filename.

```js
const express = require(“express”);
const app = new express();
app.use(express.static("cad220_staticfiles"))
app.listen(3333, () => {
  console.log("Listening at  http://localhost:3333")
})
```

### jsonwebtoken.sign()
Used for signing-in based on a generated JWT (JSON Web token)

```js
if (uname === "user" && pwd === "password") {
    return res.json({
      token: jsonwebtoken.sign({ user: "user" }, JWT_SECRET),
    });
  }
```

### jsonwebtoken.verify()
Verifies a JWT by passing the token value & the JWT secret as arguments.

```js
const verificationStatus =   jsonwebtoken.verify(tokenValue, "aVeryVerySecretString");
```

### Project folder strucure
A fairly established project structure for API's built using Express.js is:

```js
test-project/
   node_modules/
   config/
     db.js           //Database connection and configuration
     credentials.js  //Passwords/API keys for external services used by your app
   models/            //For mongoose schemas
      items.js
      prices.js
   routes/           //All routes for different entities in different files
      items.js
      prices.js
   app.js
   routes.js         //Require all routes in this and then require this file in
   package.json
```


