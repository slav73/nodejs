const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { promisify } = require("util");

const checkFolder = promisify(fs.stat);
const copyFile = promisify(fs.copyFile);
const checkFileAsync = promisify(fs.access);
const createDirAsync = promisify(fs.mkdir);
const fileList = promisify(fs.readdir);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const newBase = path.join(__dirname, "newDir");

function init() {
  rl.question("Какой каталог вы хотите прошерстить?", answer => {
    console.log("Что ж, попробуем перебрать каталог " + answer);
    checkFileAsync(answer)
      .then(res => {
        img = path.join(__dirname, answer);
        start(img);
        console.log("Новый каталог создан и упорядочен");
      })
      .catch(err => {
        console.log("такого каталога нет!");
      });

    rl.close();
  });
}

const start = dir => {
  createDirIfNotExist(newBase);
  getFileList(dir);
};

const createDirIfNotExist = dir => {
  createDirAsync(dir).catch(err => console.log(err));
};

const getFileList = dir => {
  const list = fileList(dir);

  list.then(res => {
    res.forEach(elem => {
      repeatIfSubFolders(elem, dir);
    });
  });
};

const repeatIfSubFolders = (file, dir) => {
  const folderToCheck = path.join(dir, file);
  checkFolder(folderToCheck)
    .then(res => {
      res.isDirectory() ? getFileList(folderToCheck) : linkFile(file, dir);
    })
    .catch(err => console.log(err));
};

const linkFile = (file, dir) => {
  const dirName = file[0].toUpperCase();
  const newDir = path.join(newBase, dirName);
  const newFile = path.join(newDir, file);
  const oldFile = path.join(dir, file);

  createDirIfNotExist(newDir);
  copyFile(oldFile, newFile);
};

init();
