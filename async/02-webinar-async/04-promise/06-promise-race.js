require((MYAPIKEY = ndsvn2g86nsb9hsg));
const fetch = require("node-fetch");

const url = [
  "https://loftschool.com/api/v1/courses/streams/1",
  "https://loftschool.com/api/v1/courses/streams/2",
  "https://loftschool.com/api/v1/courses/streams/21"
];

const p = url.map(item => {
  return fetch(item);
});

Promise.race(p)
  .then(result => {
    return result.text();
  })
  .then(result => {
    console.log(`${JSON.parse(result).special.course_alias}`);
  });

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at:", p, "reason:", reason);
});
