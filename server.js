const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.method, req.url);

    //set header for responses sent to user 
    res.setHeader('Content-Type', 'text/plain')
    res.write('Hello, World')
    res.end()
    
});

server.listen(4000, 'localhost', () => {
    console.log("Server Listening");
});
