import { createServer } from 'http';
import { appendFile, readFile } from 'fs/promises';
import { join } from 'path';

// Define the port
const PORT = 8090;

// Log requests to a file
const logRequest = async (url) => {
    const logEntry = `${new Date().toISOString()} - Request URL: ${url}\n`;
    const logFilePath = join(import.meta.dir, "log.txt");
    try {
        await appendFile(logFilePath, logEntry);
    } catch (err) {
        console.error(`Error writing to log file: ${err}`);
    }
};

// Helper function to serve HTML files
const serveHtml = async (res, filePath) => {
    try {
        const fullPath = join(import.meta.dir, "html", filePath);
        const content = await readFile(fullPath, "utf-8");
        res.setHeader("Content-Type", "text/html");
        res.statusCode = 200;
        res.end(content);
    } catch (err) {
        console.error(`Error serving file ${filePath}: ${err}`);
        res.statusCode = 500;
        res.end("Internal Server Error");
    }
};

// Create the server
const server = createServer(async (req, res) => {
    const url = req.url;

    // Log the request
    await logRequest(url);

    switch (url) {
        case "/":
            await serveHtml(res, "./contents/index.html");
            break;
        case "/products":
            await serveHtml(res, "./contents/products.html");
            break;
        case "/login":
            await serveHtml(res, "./contents/login.html");
            break;
        case "/signup":
            await serveHtml(res, "./contents/signup.html");
            break;
        case "/profile":
            await serveHtml(res, "./contents/profile.html");
            break;
        case "/cart":
            await serveHtml(res, "./contents/cart.html");
            break;
        case "/checkout":
            await serveHtml(res, "./contents/checkout.html");
            break;
        case "/orders":
            await serveHtml(res, "./contents/orders.html");
            break;
        case "/categories":
            await serveHtml(res, "./contents/categories.html");
            break;
        case "/chat":
            await serveHtml(res, "./contents/chat.html");
            break;
        case "/contact":
            await serveHtml(res, "./contents/contact.html");
            break;
        case "/about":
            const filePath = path.join(__dirname, "contents", "about.html");
            fs.readFile(filePath, "utf8", (err, data) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Internal Server Error");
              } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
              }
            });
            break;
        default:
            res.statusCode = 404;
            await serveHtml(res, "./contents/notfound.html");
            break;
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server initiated on port ${PORT}...`);
});
