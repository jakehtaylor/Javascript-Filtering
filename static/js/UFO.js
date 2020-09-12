
const sightings = data;

var tbody = d3.select("tbody");
var head = d3.select("thead");

var headers = Object.keys(sightings[0]);
var hrow = head.append("tr");

filter_array = [];

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

buildTable(data);

var inputDate = d3.select("#date_in");
var country = d3.select("#country");
var state = d3.select("#state");
var city = d3.select("#city");
var shape = d3.select("#shape");
var form = d3.select("#form");

var shapes = sightings.map(s => s.shape);
var u_shapes = [... new Set(shapes)];
u_shapes.forEach(sh => {
    var o = shape.append("option");
        o.text(sh);
});

function filter_shape(data) {
    var shape = d3.select("#shape").property("value");
    if (shape === "all") {
        return data;
    };

    var filtered = data.filter(sight => sight.shape === shape);
    return filtered;
};


function filter_date(data) {
    var date = d3.select("#date_in").property("value");
    if (date === "") {
        return data;
    };
    var filtered = data.filter(sight => sight.datetime === date);
    return filtered;
};

function filter_country(data) {
    var country = d3.select("#country").property("value");
    if (country === "all") {
        return data;
    };
    var filtered = data.filter(sight => sight.country === country);
    return filtered;
};


function filter_state(data) {
    var state = d3.select("#state").property("value");
    if (state === "all") {
        return data;
    };
    var filtered = data.filter(sight => sight.state === state);
    return filtered;
};


function filter_city(data) {
    var city = d3.select("#city").property("value");
    if (city === "all") {
        return data;
    };
    var filtered = data.filter(sight => sight.city === city);
    return filtered;
};


function state_drop(){
    state.html("<option selected>all</option>");
    var country = d3.event.target.value;
    var filtered = sightings.filter(sight => sight.country === country);
    var states = filtered.map(f => f.state);
    var unique_sts = [... new Set(states)];
    var sts_alph = unique_sts.sort();
    sts_alph.forEach(s => {
        var o = state.append("option");
        o.text(s);
    });

};

function city_drop(){
    city.html("<option selected>all</option>");
    var state = d3.event.target.value;
    var filtered = sightings.filter(sight => sight.state === state);
    var cities = filtered.map(f => f.city);
    var unique_cts = [... new Set(cities)];
    var cts_alph = unique_cts.sort();
    cts_alph.forEach(c => {
        var o = city.append("option");
        o.text(c);
    });

};



inputDate.on("change", function() {
    filter_array.push(filter_date);
    filter();
    
});
shape.on("change", function() {
    filter_array.push(filter_shape);
    filter();
    
});

country.on("change", function () {
    filter_array.push(filter_country);
    filter();
    state_drop();
});

state.on("change", function () {
    filter_array.push(filter_state);
    filter();
    city_drop();
});

city.on("change", function() {
    filter_array.push(filter_city);
    filter();
});

form.on("submit", function() {
    d3.event.preventDefault();
});

function filter() {
    var table_data = sightings;

    filter_array.forEach(fn => {
        table_data = fn(table_data);
    });

    tbody.html("");
    buildTable(table_data);
};









  

