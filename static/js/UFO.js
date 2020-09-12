
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
var country = d3.select("#country");
var state = d3.select("#state");
var city = d3.select("#city");
var form = d3.select("#form");

function filter_date() {
    var date = d3.event.target.value
    var filtered = sightings.filter(sight => sight.datetime === date);
    tbody.html("");
    buildTable(filtered);
};

function filter_country() {
    var country = d3.event.target.value;
    var filtered = sightings.filter(sight => sight.country === country);
    tbody.html("");
    buildTable(filtered);
};

function state_drop(){
    state.html("<option selected>choose...</option>");
    var country = d3.event.target.value;
    var filtered = sightings.filter(sight => sight.country === country);
    var states = filtered.map(f => f.state);
    var unique_sts = [... new Set(states)];
    unique_sts.forEach(s => {
        var o = state.append("option");
        o.text(s);
    });

};

function filter_state() {
    var state = d3.event.target.value;
    var filtered = sightings.filter(sight => sight.state === state);
    tbody.html("");
    buildTable(filtered);
};

function city_drop(){
    city.html("<option selected>choose...</option>");
    var state = d3.event.target.value;
    var filtered = sightings.filter(sight => sight.state === state);
    var cities = filtered.map(f => f.city);
    var unique_cts = [... new Set(cities)];
    unique_cts.forEach(c => {
        var o = city.append("option");
        o.text(c);
    });

};

function filter_city() {
    var city = d3.event.target.value;
    var filtered = sightings.filter(sight => sight.city === city);
    tbody.html("");
    buildTable(filtered);
};

inputDate.on("change", filter_date);

country.on("change", function () {
    filter_country();
    state_drop();
});

state.on("change", function () {
    filter_state();
    city_drop();
});

city.on("change", filter_city)

form.on("submit", function() {
    d3.event.preventDefault();
});


  





  

