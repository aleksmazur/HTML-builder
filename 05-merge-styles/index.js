const path = require('path');
const fs = require('fs');

const currentPath = path.join(__dirname, 'styles');
const createPath = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStream = fs.createWriteStream(createPath);

const createBundle = () => {
	fs.readdir(currentPath, {withFileTypes: true}, (error, files) => {
		files.forEach(item => {
			if (!item.isDirectory()) {
				if (path.extname(item.name) === '.css') {
					fs.readFile(path.join(__dirname, 'styles', item.name), (error, data) => {
						writeStream.write(data)
					})
				}
			}
		})
	})
}
createBundle();