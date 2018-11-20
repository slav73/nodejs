const fs = require("fs");
const path = require("path");
const base = process.cwd();

const newBase = path.join(base, "newDir");

if (!fs.existsSync(newBase)) {
  fs.mkdirSync(newBase);
}

function filescanner(dir, done) {
  let results = [];

  fs.readdir(dir, function(err, list) {
    if (err) return done(err);

    let pending = list.length;

    if (!pending) return done(null, results);

    list.forEach(function(file) {
      file = path.resolve(dir, file);

      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          filescanner(file, function(err, res) {
            results = results.concat(res);
            pending--;
            if (!pending) done(null, results);
          });
        } else {
          results.push(path.basename(file));
          let dirName = path
            .basename(file)
            .toString()[0]
            .toUpperCase();

          let newDir = path.join(newBase, dirName);
          if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir);
          }

          let newFile = path.join(newDir, path.basename(file));
          if (!fs.existsSync(newFile)) {
            fs.link(file, newFile, err => {
              if (err) {
                console.error(err.message);
                return;
              }
            });
          }

          pending--;
          if (!pending) done(null, results);
        }
      });
    });
  });
}

filescanner(base, function(err, data) {
  if (err) {
    throw err;
  }
});
