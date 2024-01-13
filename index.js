const http = require("http");
const fs = require("fs");
const path = require("path");

const page404 = fs.readFileSync("./pages/404.html", "utf-8");

const server = http.createServer((req, res) => {
	const filename = req.url === "/" ? "index.html" : req.url + ".html";
	const filepath = path.join("./pages", filename);

	fs.readFile(filepath, (err, data) => {
		res.writeHead(200, { "Content-Type": "text/html" });
		if (err) {
			console.log(`Page "${filepath}" not found!`);
			res.write(page404);
		} else {
			console.log(`Serving "${filepath}"`);
			res.write(data);
		}
		res.end();
	});
});

server.listen(8080, () => {
	console.log("[SERVER STARTED] listening on port 8080");
});
