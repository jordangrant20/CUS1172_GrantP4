// Simple employee data for Vercel serverless function
const employees = [
    {
        "id": "1111",
        "EmployeeName": "Hemani Singh",
        "EmployeeAge": "23",
        "EmployeeSalary": "90,000",
        "ProfileImage": ""
    },
    {
        "id": "1112",
        "EmployeeName": "Jordan Grant",
        "EmployeeAge": "23",
        "EmployeeSalary": "80,000",
        "ProfileImage": ""
    },
    {
        "id": "1113",
        "EmployeeName": "Bathsheba Wilson",
        "EmployeeAge": "25",
        "EmployeeSalary": "70,000",
        "ProfileImage": ""
    },
    {
        "id": "1114",
        "EmployeeName": "Charles Barkley",
        "EmployeeAge": "26",
        "EmployeeSalary": "60,000",
        "ProfileImage": ""
    },
    {
        "id": "1115",
        "EmployeeName": "LeBron James",
        "EmployeeAge": "40",
        "EmployeeSalary": "120,000",
        "ProfileImage": ""
    },
    {
        "id": "1116",
        "EmployeeName": "Stephen Curry",
        "EmployeeAge": "36",
        "EmployeeSalary": "110,000",
        "ProfileImage": ""
    },
    {
        "id": "1117",
        "EmployeeName": "Ryad Ramirez",
        "EmployeeAge": "34",
        "EmployeeSalary": "115,000",
        "ProfileImage": ""
    },
    {
        "id": "1118",
        "EmployeeName": "Alex Morgan",
        "EmployeeAge": "28",
        "EmployeeSalary": "95,000",
        "ProfileImage": ""
    },
    {
        "id": "1119",
        "EmployeeName": "Zuby Ejiofor",
        "EmployeeAge": "22",
        "EmployeeSalary": "100,000",
        "ProfileImage": ""
    }
];

export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { query } = req;
    const url = req.url || '';

    try {
        // Handle different routes
        if (url === '/api' || url === '/api/' || url === '/' || url === '') {
            // Return all employees
            return res.status(200).json({
                employee: employees
            });
        } 
        else if (url.includes('/by_name/')) {
            // Handle name search
            const qname = url.split('/by_name/')[1];
            if (!qname) {
                return res.status(400).json({ error: 'Name parameter is required' });
            }
            const filtered = employees.filter(emp => 
                emp.EmployeeName.toLowerCase().includes(qname.toLowerCase())
            );
            return res.status(200).json({
                employee: filtered
            });
        }
        else if (url.match(/\/by_age\/\d+\/\d+/)) {
            // Handle age range search
            const parts = url.split('/');
            const start_age = parseInt(parts[parts.indexOf('by_age') + 1]);
            const end_age = parseInt(parts[parts.indexOf('by_age') + 2]);
            
            const filtered = employees.filter(emp => {
                const age = parseInt(emp.EmployeeAge);
                return age >= start_age && age <= end_age;
            });
            
            return res.status(200).json({
                employee: filtered
            });
        }
        else {
            return res.status(404).json({ error: `Endpoint not found: ${url}` });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
