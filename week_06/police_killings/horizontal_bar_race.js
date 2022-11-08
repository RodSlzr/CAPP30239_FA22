/* Horizontal bar chart for police killings in 2015 */

d3.json("a3cleanedonly2015.json").then(data => {

    // Create a new object to transform data

    let newData = [
        { "Race": "White", "Totals": 0 },
        { "Race": "Black", "Totals": 0 },
        { "Race": "Hispanic", "Totals": 0 },
        { "Race": "Asian", "Totals": 0 },
        { "Race": "Native", "Totals": 0 },
        { "Race": "Other", "Totals": 0 },
    ]

    for (let d of data) {
        if (d.Race === "White") {
            newData[0].Totals += 1;
        }  else if (d.Race === "Black") {
            newData[1].Totals += 1;
        }  else if (d.Race === "Hispanic") {
            newData[2].Totals += 1;
        }  else if (d.Race === "Asian") {
            newData[3].Totals += 1;
        }  else if (d.Race === "Native") {
            newData[4].Totals += 1;
        }  else if (d.Race === "Other") {
            newData[5].Totals += 1;
        }
    };


    for (let d of newData) {
        d.Totals = +d.Totals; //force a number
    };

    // data.sort((a, b) => b.cases - a.cases);
    //newData.sort((a, b) => d3.ascending(a.Race, b.Race));

    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 70 });

    let svg = d3.select("#horizontal-chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]); // for resizing element in browser

    let x = d3.scaleLinear()
        .domain([0, d3.max(newData, d => d.Totals)]).nice()
        .range([margin.left, width - margin.right]);
    
    let y = d3.scaleBand()
        .domain(newData.map(d => d.Race))
        .range([margin.top, height - margin.bottom])
        .padding(0.1);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x));
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y));

    let bar = svg.selectAll(".bar") // create bar groups
        .append("g")
        .data(newData)
        .join("g")
        .attr("class", "bar");

    bar.append("rect") // add rect to bar group
        .attr("fill", "brown")
        .transition()
        .duration(750)
        .attr("x", margin.left)
        .attr("width", d => x(d.Totals))
        .attr("y", d => y(d.Race))
        .attr("height", y.bandwidth());
    
    bar.append('text') // add labels
        .text(d => d.Totals) // the arrow is when we are looping =>
        .attr('x', d => margin.left + x(d.Totals) - 10)
        .attr('y', d => y(d.Race) + (y.bandwidth()/2))
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .style('fill', 'white');
    

});