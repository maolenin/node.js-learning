//Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
// Promise 1
let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise 1 resolved")
    },6000)})

//Promise 2
let myPromise2 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise 2 resolved")
    },6000)})

// Result of two promises
myPromise1.then((successMessage) => {
    console.log("From Callback " + successMessage);
    myPromise2.then((successMessage) => {
      console.log("From callback " + successMessage);
    })
  })
