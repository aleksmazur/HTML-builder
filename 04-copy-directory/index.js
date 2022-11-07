const path = require('path');
const fs = require('fs');

const currentPath = path.join(__dirname, 'files');
const createPath = path.join(__dirname, 'files-copy');

const mkDir = () => {
	fs.mkdir(createPath, (error) => {
		if (error) throw error;
	});
};

const rmDir = () => {
	fs.access(createPath, (error) => {
		if (error && error.code === 'ENOENT') {
			mkDir();
		} else if (error) {
			throw error;
		}
		fs.rm(createPath, {recursive: true}, (error) => {
			if (error) throw error;
			mkDir();
			fs.readdir(currentPath, {withFileTypes: true}, (error, files) => {
				if (error) throw error;
				files.forEach( async (item) => {
					if (!item.isDirectory()) {
						const currentItemPath = path.join(currentPath, item.name);
						const createItemPath = path.join(createPath, item.name);
						const readStream = fs.createReadStream(currentItemPath);
						const writeStream = fs.createWriteStream(createItemPath);
						readStream.pipe(writeStream);
					} else { return }
				});
			});
		});
	});
}

rmDir();
