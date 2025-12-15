// Student project: Employee API for CUS1172
// Simple employee data
var employees = [
    {"id": "1111", "EmployeeName": "Hemani Singh", "EmployeeAge": "23", "EmployeeSalary": "90,000", "ProfileImage": ""},
    {"id": "1112", "EmployeeName": "Jordan Grant", "EmployeeAge": "23", "EmployeeSalary": "80,000", "ProfileImage": ""},
    {"id": "1113", "EmployeeName": "Bathsheba Wilson", "EmployeeAge": "25", "EmployeeSalary": "70,000", "ProfileImage": ""},
    {"id": "1114", "EmployeeName": "Charles Barkley", "EmployeeAge": "26", "EmployeeSalary": "60,000", "ProfileImage": ""},
    {"id": "1115", "EmployeeName": "LeBron James", "EmployeeAge": "40", "EmployeeSalary": "120,000", "ProfileImage": ""},
    {"id": "1116", "EmployeeName": "Stephen Curry", "EmployeeAge": "36", "EmployeeSalary": "110,000", "ProfileImage": ""},
    {"id": "1117", "EmployeeName": "Ryad Ramirez", "EmployeeAge": "34", "EmployeeSalary": "115,000", "ProfileImage": ""},
    {"id": "1118", "EmployeeName": "Alex Morgan", "EmployeeAge": "28", "EmployeeSalary": "95,000", "ProfileImage": ""},
    {"id": "1119", "EmployeeName": "Zuby Ejiofor", "EmployeeAge": "22", "EmployeeSalary": "100,000", "ProfileImage": ""}
];

// Main API function
module.exports = function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method == 'GET') {
        var url = req.url;
        
        // Return all employees
        if (url == '/' || url == '') {
            res.json({employee: employees});
        }
        // Search by name
        else if (url.indexOf('/by_name/') >= 0) {
            var name = url.split('/by_name/')[1];
            var results = [];
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].EmployeeName.toLowerCase().indexOf(name.toLowerCase()) >= 0) {
                    results.push(employees[i]);
                }
            }
            res.json({employee: results});
        }
        // Search by age range
        else if (url.indexOf('/by_age/') >= 0) {
            var parts = url.split('/');
            var startAge = parseInt(parts[2]);
            var endAge = parseInt(parts[3]);
            var results = [];
            for (var i = 0; i < employees.length; i++) {
                var age = parseInt(employees[i].EmployeeAge);
                if (age >= startAge && age <= endAge) {
                    results.push(employees[i]);
                }
            }
            res.json({employee: results});
        }
        else {
            res.status(404).json({error: 'Not found'});
        }
    } else {
        res.status(405).json({error: 'Method not allowed'});
    }
}
