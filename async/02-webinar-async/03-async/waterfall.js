const fs = require('fs');
const async = require('async');

try {
  async.waterfall(
    [
      function(cb) {
        fs.readFile('data.json', 'utf8', (err, data) => {
          cb(err, data);
        });
      },
      function(data, cb) {
        let result = JSON.parse(data);
        result.test = result.test + 10;
        cb(null, result);
      },
      function(arg, cb) {
        fs.writeFile('data.json', JSON.stringify(arg), err => {
          cb(err, 'done');
        });
      },
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`result:  + ${result}`);
    }
  );
} catch (err) {
  console.log(err);
}
