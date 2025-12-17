//npm install express: terminal
var express = require('express');
var app = express();

const fs = require('fs');
let rawdata = fs.readFileSync('./db.json');
let employee = JSON.parse(rawdata);

// Define routes

app.get('/api', (req, res) => {
    let outputJSON = {
        employees : employee["data"]
    }
    res.json(outputJSON);
});

app.get('/api/by_name/:qname', (req,res) => {
    let query = req.params['qname'];
    filtered_employees = employee["data"].filter(q => q.employee_name.includes(query));
    let outputJSON = {
        employees : filtered_employees
    }
    res.json(outputJSON);
});

app.get('/api/by_age/:start_age/:end_age', (req, res) => {
    let start_age = req.params['start_age'];
    let end_age = req.params['end_age'];
    filtered_employees = employee["data"].filter(
        q => {
            if ((q.employee_age > parseInt(start_age)) && ( q.employee_age < parseInt(end_age))) {
                return true;
            }
            return false;
        }
    );
    let outputJSON = {
        employees : filtered_employees
    }
    res.json(outputJSON);
});

// Serve main routes first (before static files)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index_dev.html');
});

app.get('/demo', (req, res) => {
    res.sendFile(__dirname + '/index_dev.html');
});

app.get('/demo/', (req, res) => {
    res.sendFile(__dirname + '/index_dev.html');
});

// Serve static files from current directory
app.use(express.static('.'));

// Start the server.

app.listen(4000, function() {
    console.log("Server is running successfully on port 4000");
    console.log(" Access the app at: http://localhost:4000/demo/");
    console.log(" Access the API at: http://localhost:4000/api");
});