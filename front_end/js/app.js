// JavaScript for Employee Search App
// CUS1172 - Project 4

// Function to update the view based on search
var updateView = async function(button) {
    console.log("Button clicked:", button.dataset.querytype);
    
    var api = '';
    
    // Check which type of search we're doing
    if (button.dataset.querytype == 'by_name') {
        var queryvalue = document.querySelector('#nameQuery').value;
        if (!queryvalue) {
            alert('Please enter a name to search for!');
            return;
        }
        api = `/api/by_name/${queryvalue}`;
        
    } else if (button.dataset.querytype == 'by_age_range') {
        var queryStartAge = document.querySelector('#startAgeQuery').value;
        var queryEndAge = document.querySelector('#endAgeQuery').value;
        
        // Simple validation
        if (parseInt(queryStartAge) >= parseInt(queryEndAge)) {
            alert('Start age must be less than end age!');
            return;
        }
        
        api = `/api/by_age/${queryStartAge}/${queryEndAge}`;
    }
    
    console.log("API URL:", api);
    
    try {
        // Make the API call
        const data = await fetch(api);
        const model = await data.json();
        
        console.log("API Response:", model);
        
        // Show the results
        render_view(model);
        
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('#results').innerHTML = '<div class="alert alert-danger">Error loading data!</div>';
    }
};

// Function to show all employees
var showAll = async function() {
    try {
        const data = await fetch('/api');
        const model = await data.json();
        render_view(model);
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('#results').innerHTML = '<div class="alert alert-danger">Error loading data!</div>';
    }
};

// Function to render the results using Handlebars
var render_view = function(model) {
    console.log("Rendering results:", model);
    
    // Get the template
    var source = document.querySelector("#show_results_view").innerHTML;
    var template = Handlebars.compile(source);
    var html = template(model);
    
    // Put the results on the page
    document.querySelector('#results').innerHTML = html;
};

// Add some helpful functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("Employee Search App loaded!");
    
    // Allow Enter key for name search
    document.querySelector('#nameQuery').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.querySelector('#queryByName').click();
        }
    });
    
    // Show all employees on page load
    showAll();
});
