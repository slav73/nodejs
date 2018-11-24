new Promise(function(resolve, reject) {
  //resolve("first promise resolved");
  reject("first err");
})
  .then(function(result) {
    console.log(result);
  })
  .catch(function(err) {
    console.log(err);
  });

// vs

new Promise(function(resolve, reject) {
  //resolve("second promise resolved");
  reject("second err");
}).then(
  function(result) {
    result = reject("second THEN err");
    console.log(result);
  },
  function(err) {
    console.log(err);
  }
);
