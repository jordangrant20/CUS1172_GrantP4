
const express = require('express');
const router = express.Router();
const path = require('path');

const fs = require('fs');
let rawdata = fs.readFileSync(path.join(__dirname, 'package.json'));
let employee = JSON.parse(rawdata);

// Defining a route for the root URL
router.get('/', (req, res) => {
    let outputJSON = {
        employee: employee["data"]
    }
    res.json(outputJSON);
});


// filter by name
router.get('/by_name/:qname', (req, res) => {
    let qname = req.params['qname'];
    filtered_employees = employee["data"].filter(q => q.EmployeeName.includes(qname));
   let outputJSON = {
        employee: filtered_employees
    }
    res.json(outputJSON);
})

// filter by age
router.get('/by_age/:start_age/:end_age', (req, res) => {
    let start_age = req.params['start_age'];
    let end_age = req.params['end_age'];
    filtered_employees = employee["data"].filter(
        q => {
            if ((parseInt(q.EmployeeAge) > parseInt(start_age)) && (parseInt(q.EmployeeAge) < parseInt(end_age))) {
                return true;
            } 
                return false;   
        }
    );
   let outputJSON = {
        employee: filtered_employees
    }
    res.json(outputJSON);
});

module.exports = router;
