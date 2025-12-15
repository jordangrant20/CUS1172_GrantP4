const fs = require('fs');
const path = require('path');

// Read employee data from package.json
let rawdata = fs.readFileSync(path.join(__dirname, '../../package.json'));
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
        // Get the name from the URL path
        const qname = req.query.name || req.url.split('/').pop();
        
        if (!qname) {
            res.status(400).json({ error: 'Name parameter is required' });
            return;
        }

        const filtered_employees = employee["data"].filter(q => 
            q.EmployeeName.toLowerCase().includes(qname.toLowerCase())
        );

        let outputJSON = {
            employee: filtered_employees
        };
        res.json(outputJSON);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
