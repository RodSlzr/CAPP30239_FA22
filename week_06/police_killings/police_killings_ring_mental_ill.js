d3.json('a3cleanedonly2015.json').then((data) => {

  // Create a new object to transform data
  let newData = [
    { "Mental_illness": "Yes", "Totals": 0 },
    { "Mental_illness": "No", "Totals": 0 },
  ]

  for (let d of data) {
    if (d.Mental_illness === true) {
        newData[0].Totals += 1; // newData[0] is Yes (line 5)
    }  else {
        newData[1].Totals += 1; // newData[1] is No (line 6)
    }
  };

  const height = 400,
    width = 600,
    innerRadius = 125,
    outerRadius = 175,
    labelRadius = 200;

  const arcs = d3.pie().value(d => d.Totals)(newData);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

  function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arc(i(t));
    };
  }

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", (d, i) => d3.schemeCategory10[i+2])
    .attr("d", arc);

   svg.append("g")
     .attr("font-size", 10)
     .attr("text-anchor", "middle")
     .selectAll("text")
     .data(arcs)
     .join("text")
     .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
     .selectAll("tspan")
     .data(d => {
      return [d.data.Mental_illness, d.data.Totals];
    })
     .join("tspan")
     .attr("x", 0)
     .attr("y", (d, i) => `${i * 1.1}em`)
     .attr("font-weight", (d, i) => i ? null : "bold")
     .text(d => d);

   svg.append("text")
     .attr("font-size", 30)
     .attr("font-weight", "bold")
     .attr("text-anchor", "middle")
     .attr("alignment-baseline", "middle")
     .text("Mental Illness")
     .style("font-size", 20);
});