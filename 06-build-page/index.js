const path = require('path');
const fs = require('fs');
const fsPromise = require('fs/promises');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (error) => {
    if (error) throw error;
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (error) => {
    if (error) throw error;
});

const copyAssets = async () => {
	const assetsFiles = await fsPromise.readdir(path.join(__dirname, 'assets'), { withFileTypes: true });

  	assetsFiles.forEach(async item => {
		console.log(item.name);
		await fsPromise.mkdir(
			path.join(__dirname, 'project-dist', 'assets', item.name), { recursive: true }, (error) => {
				if (error) throw error;
			}
	  	);
  
	  	const assArray = await fsPromise.readdir(path.join(__dirname, 'project-dist', 'assets', item.name), { withFileTypes: true });
			
		assArray.forEach(async ass => {
			await fsPromise.unlink(path.join(__dirname, 'project-dist', 'assets', item.name, ass.name), (error) => {
				  if (error) throw error;
				}
			);
		})
  
	  	const newArr = await fsPromise.readdir(path.join(__dirname, 'assets', item.name), { withFileTypes: true });
		
		newArr.forEach(async elem => {
			await fs.copyFile(path.join(__dirname, 'assets', item.name, elem.name), path.join(__dirname, 'project-dist', 'assets', item.name, elem.name), (error) => {
			   if (error) throw error;
			});
		});
 	})
};

copyAssets();

const createStyles = async () => {
	const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

  	fs.readdir(path.join(__dirname, 'styles'), function (error, files) {
    	if (error) throw error;

		files.forEach(item => {
				if (path.parse(item).ext === '.css') {
					fs.readFile(path.join(__dirname, 'styles', item), (error, data) => {
						writeStream.write(data)
					})
			}
		})
  	});
};

createStyles();

const createHtml = async () => {
  	const template = await fsPromise.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  	const components = await fsPromise.readdir(path.join(__dirname, 'components'), { withFileTypes: true });

  	let templateString = template.toString();

	components.forEach(item => {
		if (path.extname(item.name) === '.html') {
			const readStream = fs.createReadStream(path.join(__dirname, 'components', item.name), 'utf-8');
			const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));

	  
			readStream.on('data', (data) => {
			  templateString = templateString.replace(`{{${item.name.replace('.html', '')}}}`, data);
			});
			readStream.on('end', () => {
				writeStream.write(templateString);
			});
		}
	})
};

createHtml();