// ejs template example

const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const http = require("http");

const fixtures = require("../fixtures");

const index = path.join(__dirname, "/views/index.ejs");

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf8" });

    const file = fs.readFileSync(index, "utf8");
    /*

    const compiledFunction = ejs.compile(file, {
      filename: path.join(__dirname, '/views/included.ejs')
    });

    response.write(compiledFunction({f: fixtures}));

  */
    const page = ejs.render(
      file,
      {
        f: fixtures
      },
      {
        filename: path.join(__dirname, "/views/included.ejs")
      }
    );
    response.end(page);
  })
  .listen(3000, () => {
    console.log("Start server on port 3000");
  });
