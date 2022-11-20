let height = 400,
    width = 600,
    margin = ({ top: 25, right: 30, bottom: 35, left: 40 });
  
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);


d3.csv('data/data_scatter_premdeaths_90vs15vs19.csv').then(data => {

  for (let d of data) {
    d.rel_prem_deaths_1990 = +d.rel_prem_deaths_1990;
    d.rel_prem_deaths_2019 = +d.rel_prem_deaths_2019;
    d.abs_prem_deaths_2019 = +d.abs_prem_deaths_2019;
  };
  
  let x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.rel_prem_deaths_1990)).nice()
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.rel_prem_deaths_2019)).nice()
    .range([height - margin.bottom, margin.top]);

  const radius = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.abs_prem_deaths_2019)])
    .range([1, 25]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    //.call(d3.axisBottom(x).tickFormat(d => (d/1000) + "kg").tickSize(-height + margin.top + margin.bottom))
    .call(d3.axisBottom(x).tickSize(-height + margin.top + margin.bottom))

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))

   svg.append("g")
     .attr("fill", "#f00")
     //.attr("opacity", 0.75)
     .selectAll("circle")
     .data(data)
     .join("circle")
     .attr("r", d => radius(d.abs_prem_deaths_2019)) // struggling
     //.attr("r", d => aScale(d.abs_prem_deaths_2019)) // struggling
     //.attr("transform", d => `translate(${path.centroid(d)})`)
     .attr("cx", d => x(d.rel_prem_deaths_1990))
     .attr("cy", d => y(d.rel_prem_deaths_2019))
     //.attr("r", 2)
     .attr("opacity", 0.75);

    console.log(data)

   const tooltip = d3.select("body").append("div")
     .attr("class", "svg-tooltip")
     .style("position", "absolute")
     .style("visibility", "hidden");

   d3.selectAll("circle")
     .on("mouseover", function(event, d) {
       d3.select(this).attr("fill", "black");
       tooltip
         .style("visibility", "visible")
         .html(`Country: ${d.country}<br />Deaths: ${d.abs_prem_deaths_2019}`);
     })
     .on("mousemove", function(event) {
       tooltip
         .style("top", (event.pageY - 10) + "px")
         .style("left", (event.pageX + 10) + "px");
     })
     .on("mouseout", function() {
       d3.select(this).attr("fill", "red");
       tooltip.style("visibility", "hidden");
     })
    
});