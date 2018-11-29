const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const newBase = path.join(__dirname, "newDir");

const init = () => {
  rl.question("Какой каталог вы хотите прошерстить?", answer => {
    console.log("Что ж, попробуем перебрать каталог " + answer);

    let img = path.join(__dirname, answer);

    if (!fs.existsSync(img)) {
      img = path.join(__dirname, "images");
      console.log(
        "Пытаешься завалить программу? Бесполезно - такого каталога нет. А пока ты думаешь, прошерстим-ка мы папочку " +
          img
      );
    }

    start(img);
    console.log(
      "Поздравляем! Теперь ваш бардак красиво разложен в каталоге " + newBase
    );
    rl.close();
  });
};

const start = dir => {
  createDirIfNotExist(newBase);
  getFileList(dir);
};

const createDirIfNotExist = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const getFileList = dir => {
  const list = fs.readdirSync(dir);
  list.forEach(elem => {
    repeatIfSubFolders(elem, dir);
  });
};

const repeatIfSubFolders = (file, dir) => {
  const folderToCheck = path.join(dir, file);
  const stat = fs.lstatSync(folderToCheck);
  if (stat.isFile()) {
    const elem = { route: folderToCheck, name: file };
    return new Promise((resolve, reject) => {
      resolve(linkFile(elem));
    });
  } else if (stat.isDirectory()) {
    return new Promise((resolve, reject) => {
      resolve(getFileList(folderToCheck));
    });
  }
};

const linkFile = file => {
  const dirName = file.name[0].toUpperCase();
  const newDir = path.join(newBase, dirName);
  createDirIfNotExist(newDir);
  const newFile = path.join(newDir, file.name);
  fs.copyFileSync(file.route, newFile);
};

init();
