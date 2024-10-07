const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.method, req.url);

    // Set header for responses sent to the user
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    let statusCode = 200; // Default status code

    switch(req.url) {
        case '/':
            path += 'base.html';
            break;
        case '/about':
            path += 'about.html';
            break;
        case '/project':
            path += 'projects.html';
            break;
        default:
            path += '404.html';
            statusCode = 404; // Set status code to 404 for unknown paths
            break;
    }

    // Read the requested file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log('Error reading file', err);
            res.statusCode = 500; // Internal Server Error if there's an issue reading the file
            res.end('<h1>500: Internal Server Error</h1');
        } else {
            res.statusCode = statusCode; // Use the status code determined by the URL
            res.end(data); // Send the file content as the response
        }
    });
});

// Start the server and listen on port 4000
server.listen(4000, 'localhost', () => {
    console.log("Server Listening on http://localhost:4000");
});
