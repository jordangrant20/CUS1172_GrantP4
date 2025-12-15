// Employee data - inline to avoid file path issues on Vercel
const employee = {
    "data": [{
        "id": "1111",
        "EmployeeName": "Hemani Singh",
        "EmployeeAge": "23",
        "EmployeeSalary": "90,000",
        "ProfileImage": ""
    }, {
        "id": "1112",
        "EmployeeName": "Jordan Grant",
        "EmployeeAge": "23",
        "EmployeeSalary": "80,000",
        "ProfileImage": ""
    }, {
        "id": "1113",
        "EmployeeName": "Bathsheba Wilson",
        "EmployeeAge": "25",
        "EmployeeSalary": "70,000",
        "ProfileImage": ""
    }, {
        "id": "1114",
        "EmployeeName": "Charles Barkley",
        "EmployeeAge": "26",
        "EmployeeSalary": "60,000",
        "ProfileImage": ""
    }, {
        "id": "1115",
        "EmployeeName": "LeBron James",
        "EmployeeAge": "40",
        "EmployeeSalary": "120,000",
        "ProfileImage": ""
    }, {
        "id": "1116",
        "EmployeeName": "Stephen Curry",
        "EmployeeAge": "36",
        "EmployeeSalary": "110,000",
        "ProfileImage": ""
    }, {
        "id": "1117",
        "EmployeeName": "Ryad Ramirez",
        "EmployeeAge": "34",
        "EmployeeSalary": "115,000",
        "ProfileImage": ""
    }, {
        "id": "1118",
        "EmployeeName": "Alex Morgan",
        "EmployeeAge": "28",
        "EmployeeSalary": "95,000",
        "ProfileImage": ""
    }, {
        "id": "1119",
        "EmployeeName": "Zuby Ejiofor",
        "EmployeeAge": "22",
        "EmployeeSalary": "100,000",
        "ProfileImage": ""
    }]
};

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
        const url = req.url;
        console.log('API Request URL:', url); // Debug logging
        
        // Handle different routes - Vercel strips /api prefix
        if (url === '/' || url === '') {
            // Return all employees
            let outputJSON = {
                employee: employee["data"]
            };
            res.json(outputJSON);
        } 
        else if (url.startsWith('/by_name/')) {
            // Handle name search
            const qname = url.split('/by_name/')[1];
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
        }
        else if (url.match(/^\/by_age\/\d+\/\d+$/)) {
            // Handle age range search
            const parts = url.split('/');
            const start_age = parts[2]; // Adjusted index since /api is stripped
            const end_age = parts[3];
            
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
        }
        else {
            res.status(404).json({ error: `API endpoint not found: ${url}` });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
