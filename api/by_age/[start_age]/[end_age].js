const fs = require('fs');
const path = require('path');

// Read employee data from package.json
let rawdata = fs.readFileSync(path.join(__dirname, '../../../package.json'));
let employee = JSON.parse(rawdata);

module.exports = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        const { start_age, end_age } = req.query;
        
        if (!start_age || !end_age) {
            res.status(400).json({ error: 'Start age and end age parameters are required' });
            return;
        }

        const filtered_employees = employee["data"].filter(q => {
            const age = parseInt(q.EmployeeAge);
            const startAge = parseInt(start_age);
            const endAge = parseInt(end_age);
            return age >= startAge && age <= endAge;
        });

        let outputJSON = {
            employee: filtered_employees
        };
        res.json(outputJSON);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
