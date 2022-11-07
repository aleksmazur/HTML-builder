const path = require('path');
const fs = require('fs');
const process = require('process');
const readline = require('readline');

const currentPath = path.join(__dirname, './text.txt');
const writeStream = fs.createWriteStream(currentPath);
const readLine = readline.createInterface({input: process.stdin, output: process.stdout})
readLine.question('Hello! Write smth here, please ', (answer) => {
	console.log(answer);
	if (answer === 'exit') {
		readLine.close();
		return
	}
	writeStream.write(answer + '\n');
});

readLine.on('line', (answer) => {
	if (answer === 'exit') {
		readLine.close();
		return
	} 
	writeStream.write(answer + '\n');
});

readLine.on('close', () => console.log('Bye-bye!'));