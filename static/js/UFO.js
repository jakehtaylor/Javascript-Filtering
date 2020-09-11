var tbody = d3.select("tbody");
var head = d3.select("thead");

var headers = Object.keys(data[0]);
var hrow = head.append("tr");

headers.forEach(function(head) {
    var cell = hrow.append("th");
    cell.text(head);
});

data.forEach(function(sight) {
    var row = tbody.append("tr");
    Object.entries(sight).forEach(function([key, value]) {
      var cell = row.append("td");
      cell.text(value);
    });
});







  

