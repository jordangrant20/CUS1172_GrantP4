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
    
    // simple debugging
    console.log('API called with query params:', query);
    
    // check if this is a search request
    if (query.type === 'name' && query.search) {
      console.log('Name search for:', query.search);
      const filtered = employee.data.filter(emp => 
        emp.employee_name.toLowerCase().includes(query.search.toLowerCase())
      );
      console.log('Found', filtered.length, 'name matches');
      return res.json({ employees: filtered });
    }
    
    if (query.type === 'age' && query.start_age && query.end_age) {
      const startAge = parseInt(query.start_age);
      const endAge = parseInt(query.end_age);
      console.log('Age search from', startAge, 'to', endAge);
      const filtered = employee.data.filter(emp => {
        const age = parseInt(emp.employee_age);
        return age >= startAge && age <= endAge;
      });
      console.log('Found', filtered.length, 'age matches');
      return res.json({ employees: filtered });
    }
    
    // default - return all employees
    console.log('Returning all employees');
    return res.json({ employees: employee.data });
  }
  
  res.status(404).json({ error: 'Not found' });
}
