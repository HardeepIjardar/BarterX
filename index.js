const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathname;
    const log = `${new Date().toISOString()} - ${req.url}\n`;

    fs.appendFile('log.txt', log, (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.writeHead(200, { 'Content-Type': 'text/html' });

    switch (pathName) {
        case '/':
            res.end('<h1>Welcome to the BarterX</h1>');
            break;
        case '/products':
            res.end('<h1>Here are the products up for Sale in BarterX</h1>');
            break;
        case '/login':
            res.end('<h1>Login to the BarterX</h1>');
            break;
        case '/signup':
            res.end('<h1>Sign up to the BarterX</h1>');
            break;
        case '/profile':
            res.end('<h1>Trader Profile</h1>');
            break;
        case '/cart':
            res.end('<h1>Your Shopping Cart is here</h1>');
            break;
        case '/checkout':
            res.end('<h1>Lets start shipping</h1>');
            break;
        case '/orders':
            res.end('<h1>Your Orders are here</h1>');
            break;
        case '/categories':
            res.end('<h1>Browse Categories</h1>');
            break;
        case '/chat':
            res.end('<h1>Your Chat with fellow Traders</h1>');
            break;
        case '/contact':
            res.end('<h1>Contact Us at</h1>');
            break;
        case '/about':
            res.end('<h1>The modern approach to trading our commodities</h1>');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Page not found</h1>');
    }
});

const PORT = 8050;
server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
