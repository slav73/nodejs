const util = require('util');
const request = require('axios');

const url = Array.from(
  {
    length: 25,
  },
  (_, i) => 'https://loftschool.com/api/v1/courses/streams/' + i
);

const p = url.map(item => {
  return request.get(item);
});

Promise.all(p.map(item => item.catch(err => err)))
  .then(result => {
    result.forEach((item, i) => {
      if (item.status === 200) {
        console.log(`${i} : ${item.data.special.course_alias}`);
      } else {
        console.log(`${i} : такой курс отсутствует`);
      }
    });
  })
  .catch(console.log);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
  process.exit(1);
});
