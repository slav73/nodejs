const fs = require('fs');

const delay = time => {
  return new Promise((resolve, reject) => setTimeout(resolve, time));
};

async function read() {
  let stream = fs.createReadStream('01-example.js', {
    highWaterMark: 80,
    encoding: 'utf8',
  });

  for await (const chunk of stream) {
    await delay(500);
    console.log(chunk);
  }
}

read();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
