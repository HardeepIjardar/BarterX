

import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const PORT = 8090;
const __dirname = dirname(fileURLToPath(import.meta.url));
const contentsDir = join(__dirname, 'contents');

const logFilePath = join(__dirname, "log.txt");
const logStream = createWriteStream(logFilePath, { flags: 'a' });

const logRequest = (url) => {
    const logEntry = `${new Date().toISOString()} - Request URL: ${url}\n`;
    logStream.write(logEntry, (err) => {
        if (err) {
            console.error(`Error writing to log file: ${err}`);
        }
    });
};

const serveHtmlFile = async (res, filePath) => {
    try {
        const data = await readFile(filePath, 'utf-8');
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    } catch (error) {
        res.statusCode = 500;
        res.end("<h1>Internal Server Error</h1>");
    }
};

const server = createServer(async (req, res) => {
    const url = req.url;
    logRequest(url);
    const routes = {
        "/": "index.html",
        "/products": "products.html",
        "/login": "login.html",
        "/signup": "signup.html",
        "/profile": "profile.html",
        "/cart": "cart.html",
        "/checkout": "checkout.html",
        "/orders": "orders.html",
        "/categories": "categories.html",
        "/chat": "chat.html",
        "/contact": "contact.html",
        "/about": "about.html",
    };

    const fileName = routes[url];
    if (fileName) {
        const filePath = join(contentsDir, fileName); // Construct path to the file
        await serveHtmlFile(res, filePath);
    } else {
        res.statusCode = 404;
        res.end("<h1>Page not found</h1>");
    }
});
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});