d3.csv("data/data_lines_premdeaths_per1M.csv").then(data => {

  let height = 500,
    width = 800,
    margin = ({ top: 25, right: 250, bottom: 35, left: 30 })
    innerWidth = width - margin.left - margin.right;


  const svg = d3.select("#multiline_prem_deaths")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);


  let timeParse = d3.timeParse("%Y");

  let countries = new Set();

  for (let d of data) {
    d.Date = timeParse(d.Date);
    d.Value = +d.Value;
    countries.add(d.Location);
  }

  console.log(data)

  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.Date))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Value)])
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(d => d));

  let line = d3.line()
    .x(d => x(d.Date))
    .y(d => y(d.Value));
 
  for (let country of countries) {
    let countryData = data.filter(d => d.Location === country);

    let g = svg.append("g")
      .attr("class", "country")
      .on('mouseover', function () {
        d3.selectAll(".highlight").classed("highlight", false);
        d3.select(this).classed("highlight", true);
      });



    g.append("path")
      .datum(countryData)
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("d", line)

    if (country === "World") {
      g.classed("highlight", true);
      g.attr("stroke", "black");
    }

    let lastEntry = countryData[countryData.length - 1]; //last piece of data to position text x and y

    g.append("text")
      .text(country)
      .attr("x", x(lastEntry.Date) + 3)
      .attr("y", y(lastEntry.Value))
      .attr("dominant-baseline", "middle")
      .attr("fill", "#999");
  }
  
});