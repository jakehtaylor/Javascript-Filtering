
var sightings = data;

var tbody = d3.select("tbody");
var head = d3.select("thead");

var headers = Object.keys(sightings[0]);
var hrow = head.append("tr");

headers.forEach(head => {
    var cell = hrow.append("th");
    cell.text(head);
});

function buildTable(data) {
    data.forEach(sight => {
        var row = tbody.append("tr");
        Object.entries(sight).forEach(function([key, value]) {
        var cell = row.append("td");
        cell.text(value);
        });
    });
};

buildTable(sightings);

var inputDate = d3.select("#date_in");
var form = d3.select("#date_form");

function filter_date() {
    var date = d3.event.target.value
    var filtered = sightings.filter(sight => sight.datetime === date);
    console.log(filtered);
    tbody.html("");
    buildTable(filtered);
};

inputDate.on("change", filter_date);

form.on("submit", function() {
    d3.event.preventDefault();
});


  





  

