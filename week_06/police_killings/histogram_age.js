// Histogram by age

// Simple Histogram

const height = 400,
    width = 600,
    margin = ({ top: 25, right: 10, bottom: 50, left: 10 }),
    padding = 1;

const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.json('a3cleanedonly2015.json').then((data) => {
  console.log(data)
  // Create a new object to transform data
  /*
  let newData = [
    { "Age": "15-24", "Totals": 0 },
    { "Age": "25-34", "Totals": 0 },
    { "Age": "35-44", "Totals": 0 },
    { "Age": "45-54", "Totals": 0 },
    { "Age": "55-64", "Totals": 0 },
    { "Age": "65-74", "Totals": 0 },
    { "Age": "75-86", "Totals": 0 },
  ]

  for (let d of data) {
    if (d.Age < 25) {
        newData[0].Totals += 1;
    }  else if (d.Age < 35) {
        newData[1].Totals += 1;
    }  else if (d.Age < 45) {
        newData[2].Totals += 1;
    }  else if (d.Age < 55) {
        newData[3].Totals += 1;
    }  else if (d.Age < 65) {
        newData[4].Totals += 1;
    }  else if (d.Age < 75) {
        newData[5].Totals += 1;
    }  else if (d.Age < 87) {
        newData[6].Totals += 1;
    }
  };
  */

  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Age)).nice()
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .range([height - margin.bottom, margin.top])
    .domain([0,300]);
    
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom + 5})`)
    .call(d3.axisBottom(x));

  const binGroups = svg.append("g")
    .attr("class", "bin-group");

  const bins = d3.bin()
    .thresholds(25)
    .value(d => d.Age)(data);
  console.log(bins)

  let g = binGroups.selectAll("g")
    .data(bins)
    .join("g");

   g.append("rect")
     .attr("x", d => x(d.x0) + (padding / 2))
     .attr("width", d => x(d.x1) - x(d.x0) - padding)
     .attr("y", height - margin.bottom)
     .attr("height", 0)
     .attr("fill", "green")
     .transition()
     .duration(750)
     .attr("y", d => y(d.length))
     .attr("height", d => height - margin.bottom - y(d.length));

   g.append("text")
     .text(d => d.length)
     .attr("x", d => x(d.x0) + (x(d.x1) - x(d.x0)) / 2)
     .attr("y", d => y(d.length) - 5)
     .attr("text-anchor", "middle")
     .attr("fill", "#333");

});
