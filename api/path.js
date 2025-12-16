// API endpoint for Vercel deployment
const fs = require('fs');
const path = require('path');

// Read employee data
const dataPath = path.join(process.cwd(), 'db.json');
let employee;

try {
  const rawdata = fs.readFileSync(dataPath, 'utf8');
  employee = JSON.parse(rawdata);
} catch (error) {
  console.error('Error reading data file:', error);
  employee = { data: [] };
}

module.exports = function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const { query } = req;
    
    // Handle different API routes
    if (query.path) {
      const pathArray = Array.isArray(query.path) ? query.path : [query.path];
      
      // GET /api - return all employees  
      if (pathArray.length === 0) {
        return res.json({ employees: employee.data });
      }
      
      // GET /api/by_name/:name
      if (pathArray[0] === 'by_name' && pathArray[1]) {
        const searchName = pathArray[1];
        const filtered = employee.data.filter(emp => 
          emp.employee_name.toLowerCase().includes(searchName.toLowerCase())
        );
        return res.json({ employees: filtered });
      }
      
      // GET /api/by_age/:start/:end
      if (pathArray[0] === 'by_age' && pathArray[1] && pathArray[2]) {
        const startAge = parseInt(pathArray[1]);
        const endAge = parseInt(pathArray[2]);
        const filtered = employee.data.filter(emp => {
          const age = parseInt(emp.employee_age);
          return age >= startAge && age <= endAge;
        });
        return res.json({ employees: filtered });
      }
    } else {
      // Root /api endpoint
      return res.json({ employees: employee.data });
    }
  }
  
  res.status(404).json({ error: 'Not found' });
}
