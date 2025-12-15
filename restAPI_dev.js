//npm install express: terminal
var express = require('express');
var app = express();
var port = 4000;

var api_routes = require('./api_routes_dev.js');

app.use('/api', api_routes);

app.use('/demo', express.static('front_end'));

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