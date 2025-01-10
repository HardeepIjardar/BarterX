// Create a file index.js
// Now, using the http core module, create a web server that would handle requests to a Used Goods Marketplace SaaS product as detailed in the following questions
// Note: The server must be running on port 8050 and display a message "Server initiated on port 8050..." when it the server is started
// When a user navigates to the root URL of the web server, the server must display a message "Welcome to the BarterX"
// When a user navigates to the /products URL, the server must display a message "Here are the products up for Sale in BarterX"
// When a user naviages to the /login URL, the server must display a message "Login to the BarterX"
// When a user navigates to the /signup URL, the server must display a message "Sign up to the BarterX"
// When a user navigates to the /profile URL, the server must display a message "Trader Profile"
// When a user navigates to the /cart URL, the server must display a message "Your Shopping Cart is here"
// When a user navigates to the /checkout URL, the server must display a message "Lets' start shipping"
// When a user navigates to the /orders URL, the server must display a message "Your Orders are here"
// When a user navigates to the /categories URL, the server must display a message "Browse Categories"
// When a user navigates to the /chat URL, the server must display a message "Your Chat with fellow Traders"
// When a user navigates to the /contact URL, the server must display a message "Contact Us at"
// When a user navigates to the /about URL, the server must display a message "The modern approach to trading our commodities"
// For any other page, the server must display a message "Page not found"
// Bonus: Maintain a log.txt file that keeps track of every request that the server receives along with details about the time and date of the request, request url

const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port
const PORT = 8050;

// Log requests to a file
const logRequest = (url) => {
    const logEntry = `${new Date().toISOString()} - Request URL: ${url}\n`;
    const logFilePath = path.join(__dirname, "log.txt");
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error(`Error writing to log file: ${err}`);
        }
    });
};

// Create the server
const server = http.createServer((req, res) => {
    const url = req.url;

    // Log the request
    logRequest(url);

    res.setHeader("Content-Type", "text/plain");

    switch (url) {
        case "/":
            res.statusCode = 200;
            res.end(`Welcome to the BarterX`);
            break;
        case "/products":
            res.statusCode = 200;
            res.end(`Here are the products up for Sale in BarterX`);
            break;
        case "/login":
            res.statusCode = 200;
            res.end(`Login to the BarterX`);
            break;
        case "/signup":
            res.statusCode = 200;
            res.end(`Sign up to the BarterX`);
            break;
        case "/profile":
            res.statusCode = 200;
            res.end(`Trader Profile`);
            break;
        case "/cart":
            res.statusCode = 200;
            res.end(`Your Shopping Cart is here`);
            break;
        case "/checkout":
            res.statusCode = 200;
            res.end(`Let"s start shipping`);
            break;
        case "/orders":
            res.statusCode = 200;
            res.end(`Your Orders are here`);
            break;
        case "/categories":
            res.statusCode = 200;
            res.end(`Browse Categories`);
            break;
        case "/chat":
            res.statusCode = 200;
            res.end(`Your Chat with fellow Traders`);
            break;
        case "/contact":
            res.statusCode = 200;
            res.end(`Contact Us at barterx@gmail.com`);
            break;
        case "/about":
            res.statusCode = 200;
            res.end(`The modern approach to trading our commodities`);
            break;
        default:
            res.statusCode = 404;
            res.end(`Page not found`);
            break;
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server initiated on port ${PORT}...`);
});