//npm install express: terminal
var express = require('express');
var app = express();
var port = 4000;

var api_handler = require('./api.js');

// Simple API route using the same serverless function
app.use('/api', (req, res) => {
    api_handler(req, res);
});

// Serve the main app at root and /demo
app.use(express.static('.'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/demo', (req, res) => res.sendFile(__dirname + '/index.html'));

// Starting the server

if (require.main === module) {
    app.listen(port, function() {
        console.log(" Server is running successfully on port " + port);
        console.log(" Access the API at: http://localhost:" + port + "/api");
        console.log(" Access the demo at: http://localhost:" + port + "/demo");
    });
}

// Export for Vercel
module.exports = app;