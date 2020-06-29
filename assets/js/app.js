// @TODO: YOUR CODE HERE!

var svgWidth = 1000;
var svgHeight = 900;

var margin = {
  top: 80,
  right: 80,
  bottom: 120,
  left: 120
};

var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

var svg = d3.select("#scatter").append("svg").attr("height", svgHeight).attr("width", svgWidth);

var chartGroup = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("assets/data/data.csv").then(function(data) {

    console.log(data);

    var state_abbr = data.map(d => d.abbr);
    console.log(state_abbr);

    data.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.obesity = +data.obesity;
        data.healthcare = +data.healthcare;
        data.smokes = +data.smokes;
    });

    var xScale_poverty = d3.scaleLinear().domain(d3.extent(data, d => d.poverty)).range([0, chartWidth]);
    var xScale_age = d3.scaleLinear().domain(d3.extent(data, d => d.age)).range([0, chartWidth]);
    var xScale_income = d3.scaleLinear().domain(d3.extent(data, d => d.income)).range([0, chartWidth]);

    var yScale_healthcare = d3.scaleLinear().domain(d3.extent(data, d => d.healthcare)).range([chartHeight, 0]);
    var yScale_obesity = d3.scaleLinear().domain(d3.extent(data, d => d.obesity)).range([chartHeight, 0]);
    var yScale_smokes = d3.scaleLinear().domain(d3.extent(data, d => d.smokes)).range([chartHeight, 0]);

    var bottomAxis_poverty = d3.axisBottom(xScale_poverty);
    var bottomAxis_age = d3.axisBottom(xScale_age);
    var bottomAxis_income = d3.axisBottom(xScale_income);

    var leftAxis_healthcare = d3.axisLeft(yScale_healthcare);
    var leftAxis_smokes = d3.axisLeft(yScale_smokes);
    var leftAxis_obesity = d3.axisLeft(yScale_obesity);


    //add circles
    var circlesGroup = chartGroup.selectAll("circle").data(data).enter()
      .append("circle")
      .classed("stateCircle", true)
      .attr("r", "16")
      .attr("text", d => d.abbr)
      .attr("cx", d => xScale_poverty(d.poverty))
      .attr("cy", d => yScale_healthcare(d.healthcare));

    // add circle text
    chartGroup.selectAll("text").data(data).enter()
      .append("text")
      .classed("stateText", true)
      .attr("x", d => xScale_poverty(d.poverty))
      .attr("y", d => yScale_healthcare(d.healthcare))
      .attr("alignment-baseline", "middle")
      .text(d => d.abbr);
    
    

    chartGroup.append("g").attr("id", "bottom-axis").attr("transform", `translate(0, ${chartHeight})`).call(bottomAxis_poverty);
    chartGroup.append("g").attr("id", "left-axis").call(leftAxis_healthcare);

    var bottomtextGroup = chartGroup.append("g").attr("id", "bottom-text").classed("aText", true);

    bottomtextGroup.append("text")
      .attr("id", "poverty-button")
      .classed("active", true)
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 50 })`)
      .text("In Poverty (%)");
    
    bottomtextGroup.append("text")
      .attr("id", "age-button")
      .classed("inactive", true)
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 70 })`)
      .text("Age (Median)");

    bottomtextGroup.append("text")
      .attr("id", "income-button")
      .classed("inactive", true)
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 90 })`)
      .text("Household Income (Median)");

    var lefttextGroup = chartGroup.append("g").attr("id", "left-text").classed("aText", true);

    lefttextGroup.append("text")
      .attr("id", "healthcare-button")
      .classed("active", true)
      .attr("writing-mode", "vertical-lr")
      .attr("transform", `translate(-50, ${chartHeight/2})`)
      .text("Lacks Healthcare(%)");

    lefttextGroup.append("text")
      .attr("id", "smokes-button")
      .classed("inactive", true)
      .attr("writing-mode", "vertical-lr")
      .attr("transform", `translate(-70, ${chartHeight/2})`)
      .text("Smokes (%)");

    lefttextGroup.append("text")
      .attr("id", "obesity-button")
      .classed("inactive", true)
      .attr("writing-mode", "vertical-lr")
      .attr("transform", `translate(-90, ${chartHeight/2})`)
      .text("Obesity (%)");


    d3.select("#poverty-button").on("click", function() {

        d3.select("#bottom-text").select(".active").attr("class", "inactive");
        d3.select(this)
          .transition()
          .duration(100)
          .attr("class", "active");

        d3.selectAll("circle").data(data).attr("cx", d => xScale_poverty(d.poverty));
        d3.selectAll(".stateText").data(data).attr("x", d => xScale_poverty(d.poverty));
        d3.select("#bottom-axis").call(bottomAxis_poverty);
    });

    d3.select("#age-button").on("click", function() {

        d3.select("#bottom-text").select(".active").attr("class", "inactive");
        d3.select(this)
          .transition()
          .duration(100)
          .attr("class", "active");;

        d3.selectAll("circle").data(data).attr("cx", d => xScale_age(d.age));
        d3.selectAll(".stateText").data(data).attr("x", d => xScale_age(d.age));
        d3.select("#bottom-axis").call(bottomAxis_age);
    });

    d3.select("#income-button").on("click", function() {

        d3.select("#bottom-text").select(".active").attr("class", "inactive");
        d3.select(this)
          .transition()
          .duration(100)
          .attr("class", "active");;

        d3.selectAll("circle").data(data).attr("cx", d => xScale_income(d.income));
        d3.selectAll(".stateText").data(data).attr("x", d => xScale_income(d.income));
        d3.select("#bottom-axis").call(bottomAxis_income);
    });

    d3.select("#healthcare-button").on("click", function() {

        d3.select("#left-text").select(".active").attr("class", "inactive");
        d3.select(this)
          .transition()
          .duration(100)
          .attr("class", "active");

        d3.selectAll("circle").data(data).attr("cy", d => yScale_healthcare(d.healthcare));
        d3.selectAll(".stateText").data(data).attr("y", d => yScale_healthcare(d.healthcare));
        d3.select("#left-axis").call(leftAxis_healthcare);
    });

    d3.select("#smokes-button").on("click", function() {

        d3.select("#left-text").select(".active").attr("class", "inactive");
        d3.select(this)
          .transition()
          .duration(100)
          .attr("class", "active");

        d3.selectAll("circle").data(data).attr("cy", d => yScale_smokes(d.smokes));
        d3.selectAll(".stateText").data(data).attr("y", d => yScale_smokes(d.smokes));
        d3.select("#left-axis").call(leftAxis_smokes);
    });

    d3.select("#obesity-button").on("click", function() {

        d3.select("#left-text").select(".active").attr("class", "inactive");
        d3.select(this)
          .transition()
          .duration(100)
          .attr("class", "active");

        d3.selectAll("circle").data(data).attr("cy", d => yScale_obesity(d.obesity));
        d3.selectAll(".stateText").data(data).attr("y", d => yScale_obesity(d.obesity));
        d3.select("#left-axis").call(leftAxis_obesity);
    });






}).catch(function(error) {
    console.log(error);
});
  
