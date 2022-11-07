const path = require('path');
const fs = require('fs/promises');
const process = require('process');
const readline = require('readline');

const currentPath = path.join(__dirname, 'secret-folder');

const foldersFiles = async () => {
	const files = await fs.readdir(currentPath);
	// console.log(files)
	files.forEach(async (item) => {
		const stat = await fs.stat(path.join(currentPath, item));
		if (!stat.isDirectory()) {
			const extName = path.extname(item).substring(1);
			const fileName = path.basename(item, path.extname(item));
			const size = stat.size;	
			console.log(`${fileName} - ${extName} - ${size}`)
		}
	});
};
foldersFiles();