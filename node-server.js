const http = require("http");

const host = "localhost";
const port = 8000;

const requestListener = (req, res) => {
    if (req.url == "/") {
        res.end("Hello Worls");
    } else if (req.url == "/about") {
        res.end("This is the about page");
    } else if (req.url == "/feed/trending") {
        res.end("This is the trending page");
    } else if (req.url == "/feed/trending") {
        res.end("This is the trending page");
    }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});