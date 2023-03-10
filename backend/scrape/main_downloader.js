const path = require('path')

function main() {
	if(process.argv.length < 5) {
		console.log("Usage: " + process.argv[0] + " " + process.argv[1] + " <url> <filename> <dirname>")
		return
	}
	const https = require('https')
	const fs = require('fs')
	const url = process.argv[2]
	const filename = process.argv[3]
	const DIR = process.argv[4]

	let cdir = DIR + path.parse(filename).dir
	if(cdir.length > DIR.length && !fs.existsSync(cdir)) {
		console.log("CREATING DIR " + cdir)
		fs.mkdirSync(cdir)
	}
	const req = https.request(url, res => {
		const data = [];

		res.on('data', _ => data.push(_))
		res.on('end', () => fs.writeFile(DIR + filename, data.join(), (err) => {
			if(err) throw err;
		}))
	});
	req.end();
	//console.log(process.argv[2]);
}
main();	