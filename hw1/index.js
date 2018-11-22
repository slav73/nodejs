const fs = require('fs');
const path = require('path');

const img = path.join(__dirname, 'images');
const newBase = path.join(__dirname, 'newDir');

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
		repeatIfSubFolders(elem, dir, linkFile, getFileList);
	});
};

const repeatIfSubFolders = (file, dir, linkFileFn, repeatGettingFromFolderFn) => {
	const folderToCheck = path.join(dir, file);
	const stat = fs.lstatSync(folderToCheck);
	if (stat.isFile()) {
		const elem = { route: folderToCheck, name: file };
		linkFileFn(elem);
	} else if (stat.isDirectory()) {
		repeatGettingFromFolderFn(folderToCheck);
	}
};

const linkFile = file => {
	const dirName = file.name[0].toUpperCase();
	const newDir = path.join(newBase, dirName);
	createDirIfNotExist(newDir);
	const newFile = path.join(newDir, file.name);
	fs.copyFileSync(file.route, newFile);
};

// const errorHandler = err => {
// 	if (err) {
// 		console.log(err.message);
// 	}
// };

start(img);

