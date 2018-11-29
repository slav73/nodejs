const async = require('async');
const fetch = require('node-fetch');

const url = [
  'https://loftschool.com/api/v1/courses/streams/1',
  'https://loftschool.com/api/v1/courses/streams/2',
  'https://loftschool.com/api/v1/courses/streams/3',
];

async.parallel(
  url.map(item => {
    return function(cb) {
      fetch(item)
        .then(res => {
          return res.text();
        })
        .then(body => {
          const course = JSON.parse(body).special.course_alias;
          cb(null, `${item}  -  ${course} \n`);
        })
        .catch(err => {
          cb(err);
        });
    };
  }),
  function(err, results) {
    if (err) {
      console.log(`Ups: ${err.message}`);
      return;
    }
    console.log(results);
  }
);
