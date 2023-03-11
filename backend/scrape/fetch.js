const path = require('path')
const https = require('https')
const fs = require('fs')
//dirname - directory in which to save file
//filename may or may not begin with '/' and can be a path
function main() {
	if(process.argv.length < 5) {
		console.log("Usage: " + process.argv[0] + " " + process.argv[1] + " <url> <filename> <dirname>")
		return
	}
	const url = process.argv[2]
	const filename = process.argv[3]
	const DIR = process.argv[4]

	let cdir = DIR + (path.parse(filename).dir[0] != '/' ? '/'  : '') + path.parse(filename).dir
	if(cdir.length > DIR.length + 1 && !fs.existsSync(cdir)) {
		console.log("CREATING DIR " + cdir)
		fs.mkdir(cdir, {recursive: true}, (err) => {
			if(err) {
				console.log(err)
			}
		})
	}

	const req = https.request(url, res => {
		const data = [];

		res.on('data', _ => data.push(_))
		res.on('end', () => fs.writeFile(cdir + '/' + path.parse(filename).base, data.join(), (err) => {
			if(err) throw err;
		}))
	});
	req.end();
	//console.log(process.argv[2]);
}
main();	