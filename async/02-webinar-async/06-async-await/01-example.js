const request = require('request');

const url = [
  'https://loftschool.com/api/v1/courses/streams/1',
  'https://loftschool.com/api/v1/courses/streams/4',
  'https://loftschool.com/api/v1/courses/streams/3',
];

function getNameCourse(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err) reject(err);
      if (response.statusCode === 200) {
        try {
          const data = JSON.parse(body).special.course_alias;
          resolve(data);
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new Error(`Ответ сервера ${url}: ${response.statusCode}`));
      }
    });
  });
}

url.forEach(async item => {
  try {
    let result = await getNameCourse(item);
    console.log('Result ', result);
  } catch (e) {
    console.log('Error ', e.message);
  }
});
