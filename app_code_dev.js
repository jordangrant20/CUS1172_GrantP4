var updateView = async (button) => {
  
  if (button.dataset.querytype == 'by_name') {
    let queryvalue = document.querySelector('#nameQuery').value;
    api = `http://localhost:4000/api/by_name/${queryvalue}`;
    console.log('Name API call:', api);
  } else if (button.dataset.querytype == 'by_age') {
    let queryStartAge = document.querySelector('#startAgeQuery').value;
    let queryEndAge = document.querySelector('#endAgeQuery').value;
    api = `http://localhost:4000/api/by_age/${queryStartAge}/${queryEndAge}`;
    console.log('Age API call:', api);
  }
  
  const data = await fetch(api);
  const model = await data.json();
  console.log('API response:', model);
  render_view(model);
}


var render_view = (model) => {
  var source = document.querySelector("#show_results_view").innerHTML;
  var template = Handlebars.compile(source);
  var html = template(model);
  
  document.querySelector("#results").innerHTML = html;
}
