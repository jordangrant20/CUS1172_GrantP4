// JavaScript for Employee Search App
// CUS1172 - Project 4

// Function to get the correct API base URL
var getApiBaseUrl = function() {
    // If we're on localhost, use the local API
    if (window.location.hostname === 'localhost') {
        return '';
    }
    // For Vercel deployment, use absolute path
    return '';
};

// Function to update the view based on search
var updateView = async function(button) {
    console.log("Button clicked:", button.dataset.querytype);
    
    var apiBase = getApiBaseUrl();
    var api = '';
    
    // Check which type of search we're doing
    if (button.dataset.querytype == 'by_name') {
        var queryvalue = document.querySelector('#nameQuery').value;
        if (!queryvalue) {
            alert('Please enter a name to search for!');
            return;
        }
        api = `${apiBase}/api/by_name/${queryvalue}`;
        
    } else if (button.dataset.querytype == 'by_age_range') {
        var queryStartAge = document.querySelector('#startAgeQuery').value;
        var queryEndAge = document.querySelector('#endAgeQuery').value;
        
        // Simple validation
        if (parseInt(queryStartAge) >= parseInt(queryEndAge)) {
            alert('Start age must be less than end age!');
            return;
        }
        
        api = `${apiBase}/api/by_age/${queryStartAge}/${queryEndAge}`;
    }
    
    console.log("API URL:", api);
    
    try {
        // Make the API call
        const response = await fetch(api);
        console.log("Response status:", response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const model = await response.json();
        console.log("API Response:", model);
        
        // Show the results
        render_view(model);
        
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('#results').innerHTML = `<div class="alert alert-danger">Error loading data: ${error.message}. Check browser console for details.</div>`;
    }
};

// Function to show all employees
var showAll = async function() {
    try {
        var apiBase = getApiBaseUrl();
        console.log("Loading all employees from:", `${apiBase}/api`);
        const response = await fetch(`${apiBase}/api`);
        console.log("Response status:", response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const model = await response.json();
        console.log("API Response:", model);
        render_view(model);
    } catch (error) {
        console.error('Error loading all employees:', error);
        document.querySelector('#results').innerHTML = `<div class="alert alert-danger">Error loading data: ${error.message}. Check browser console for details.</div>`;
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
