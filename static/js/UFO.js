
const sightings = data;

// data provided in the data.js file

var tbody = d3.select("tbody");
var head = d3.select("thead"); 

// selecting table elements with d3

var headers = Object.keys(sightings[0]);
var hrow = head.append("tr");

// loop to add each column header

headers.forEach(head => {
    var cell = hrow.append("th");
    cell.text(head);
});

// function that builds out a table from given data

function buildTable(data) {
    data.forEach(sight => {
        var row = tbody.append("tr");
        Object.entries(sight).forEach(function([key, value]) {
        var cell = row.append("td");
        cell.text(value);
        });
    });
};

// creates unfiltered table when the page is loaded.

buildTable(data);

// retrieving each of the filter items by id

var inputDate = d3.select("#date_in");
var country = d3.select("#country");
var state = d3.select("#state");
var city = d3.select("#city");
var shape = d3.select("#shape");
var form = d3.select("#form");

// populating the shape drop down with all of the unique shape values

var shapes = sightings.map(s => s.shape);
var u_shapes = [... new Set(shapes)];
u_shapes.forEach(sh => {
    var o = shape.append("option");
        o.text(sh);
});

// following are the basic filter functions for each parameter, returning an unchanged copy of the data if
// the value of the filter is the default/'all' value, and returning a filtered version of the data if an option
// other than the default has been selected, containing matches with the selected option.

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


// below are the two functions used to create the progressive specificity location filters. The two functions
// follow all the same steps: find the current value of the preceding layer (country for state, state for city),
// filter the data on that preceding layer, find the unique values of the current layer (state or city), and 
// populate the drop down associated with the current layer with those unique values.

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

// array of filtering functions 

filter_array = [];

// on any change of the filters, the associated filter function gets pushed to the filter array

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

// prevents the page from fully reloading on form submission

form.on("submit", function() {
    d3.event.preventDefault();
});

// this final function applies each filter in the filter array to the original data in succession, 
// stacking the filters on top of each other.

function filter() {
    var table_data = sightings;

    filter_array.forEach(fn => {
        table_data = fn(table_data);
    });

    tbody.html("");
    buildTable(table_data);
};









  

