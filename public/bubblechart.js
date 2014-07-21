/*This page is the bubble chart. It still needs some work to adjust to screen size and maybe make it more interactive*/
var diameter = 900,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#chart").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var catNames = [
    "Glass",
    "Plastic",
    "Paper",
    "Battery/Bulb",
    "Metal",
    "Cloth",
    "Electronic",
    "Garage",
    "Other"
]

var nodeInfo = {
    categoryName: "",
    className: "",
    children: allItems.map(function(v, i) {
        return {
            className: i.toString(),
            categoryName: catNames[i],
            value: v
        };
    })
}

var node = svg.selectAll(".node")
    .data(bubble.nodes(nodeInfo))
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d) {
        return color(d.className);
    });

node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .style("font-size", "15px")
    .text(function(d) {
        return d.categoryName.substring(0, d.r / 6);
    });