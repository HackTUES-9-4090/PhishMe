const path = require('path')

function main() {
	if(process.argv.length < 4) {
		console.log("Usage: " + process.argv[0] + " " + process.argv[1] + " <url> <filename>")
		return
	}
	const https = require('https')
	const fs = require('fs')
	const url = process.argv[2]
	const filename = process.argv[3]
	let dir = "app/" + path.parse(filename).dir
	if(dir.length > "app/".length && !fs.existsSync(dir)) {
		fs.mkdirSync(dir)
	}
	const req = https.request(url, res => {
		const data = [];

		res.on('data', _ => data.push(_))
		res.on('end', () => fs.writeFile("app/" + filename, data.join(), (err) => {
			if(err) throw err;
		}))
	});
	req.end();
	//console.log(process.argv[2]);
}
main();	