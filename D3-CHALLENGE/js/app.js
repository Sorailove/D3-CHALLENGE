// @TODO: YOUR CODE HERE!

var svgWidth = 700;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60, 
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", 'translate(${margin.left}, ${margin.right)');

d3.csv("data/data.csv")
.then(function(smokerData) {
    smokerData.forEach(function(data) {
        data.smokes = +data.smokes;
        data.age = +data.age;
});

var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(smokerData, d => d.smokes)])
    .range([0, width]);

var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(smokerData, d => d.age)])
    .range([height, 0]);

var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

chartGroup.append("g")
    .attr("transform", 'translate(0, ${height})')
    .call(bottomAxis);

chartGroup.append("g")
    .call(leftAxis)

//var textGroup = chartGroup.append("text")
//.style("text-anchor", "middle")
//.selectAll("tspan")
//.data(smokersData)
//.enter()
// .append("tspan")
// .attr("x", d => xLinearScale(d.smokes))
// .attr("y", d => yLinearScale(d.age - 0.2))
// .text(d => d.abbr)

var circlesGroup = chartGroup.selectAll("circle")
.data(smokerData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.smokes))
    .attr("cy", d => yLinearScale(d.age))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>Smokers: ${d.smokes}<br>Age: ${d.age}`);
    });

chartGroup.call(toolTip);
circlesGroup.on("click", function(data) {
    toolTip.show(data, this);
  })

  .on("mouseout", function(data, index) {
    toolTip.hide(data);
  });
  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Smokers");

  chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Age");
  });
