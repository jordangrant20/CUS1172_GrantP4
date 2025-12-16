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
    
    // basic debugging - student would add this
    console.log('API called with query:', query);
    
    // Handle different API routes
    if (query.path) {
      const pathArray = Array.isArray(query.path) ? query.path : [query.path];
      console.log('Path array:', pathArray);
      
      // GET /api - return all employees  
      if (pathArray.length === 0) {
        return res.json({ employees: employee.data });
      }
      
      // GET /api/by_name/:name
      if (pathArray[0] === 'by_name' && pathArray[1]) {
        const searchName = pathArray[1];
        console.log('Searching for name:', searchName);
        const filtered = employee.data.filter(emp => 
          emp.employee_name.toLowerCase().includes(searchName.toLowerCase())
        );
        console.log('Found', filtered.length, 'matches');
        return res.json({ employees: filtered });
      }
      
      // GET /api/by_age/:start/:end
      if (pathArray[0] === 'by_age' && pathArray[1] && pathArray[2]) {
        const startAge = parseInt(pathArray[1]);
        const endAge = parseInt(pathArray[2]);
        console.log('Searching age range:', startAge, 'to', endAge);
        const filtered = employee.data.filter(emp => {
          const age = parseInt(emp.employee_age);
          return age >= startAge && age <= endAge;
        });
        console.log('Found', filtered.length, 'matches in age range');
        return res.json({ employees: filtered });
      }
    } else {
      // Root /api endpoint
      return res.json({ employees: employee.data });
    }
  }
  
  res.status(404).json({ error: 'Not found' });
}
