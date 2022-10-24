/* D3 Line Chart */

// We run the constants before loading the data, for efficiency porpuses
// The cons and loading the data could run at the same time.
const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
// Sets the height, width, and margins variables that we will use later

const svg = d3.select("#chart") // Select the first chart element in the the html
    .append("svg") // It appends an svg to the div of the chart
    .attr("viewBox", [0, 0, width, height]); // Makes the SVG scalable, and sets the size of the chart

d3.csv('long-term-interest-canada.csv').then(data => {
    let timeParse = d3.timeParse("%Y-%m"); // Reads date with the format "%Y-%m"

    for (let d of data) {
        d.Num = +d.Num
        d.Month = timeParse(d.Month)
    }  // Everything is loaded as a string. The'+' changes every value of the col Num to numbers
    // The timeParse changes every value of the col Month to a timeParse date format

    let x = d3.scaleTime() // We use scaleTime for axis that correspond to time
        .domain(d3.extent(data, d => d.Month)) // Each element of x is a monthof the data 
        .range([margin.left, width - margin.right]); // Defines the space of the x axis

    let y = d3.scaleLinear() // use to set as y a scale of a continuous domain like real numbers
        .domain([0, d3.max(data, d => d.Num)]) // Creates y, between 0 and the max value in our data
        .range([height - margin.bottom, margin.top]); // Defines the y axis space. svgs are built from top to down
    
     svg.append("g") // appends the y-Axis to the SVG, with g tags with the labels and ticks
       .attr("transform", `translate(${margin.left},0)`)
       .attr("class", "y-axis")
       .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => d + "%").tickSize(-width));

    svg.append("g") // appends the x-axis to the SVG, with g tags with the labels and tick, but no vertical lines
       .attr("transform", `translate(0,${height - margin.bottom})`)
       .call(d3.axisBottom(x).tickSizeOuter(0));

     svg.append("text") // appends the x-axis label to the SVG
       .attr("class", "x-label")
       .attr("text-anchor", "end")
       .attr("x", width - margin.right) // Position parameters
       .attr("y", height)
       .attr("dx", "0.5em")
       .attr("dy", "-0.5em") 
       .text("Year"); // Text of the label
    
     svg.append("text") // appends the y-axis label to the SVG
       .attr("class", "y-label")
       .attr("text-anchor", "end")
       .attr("x", -margin.top/2) // Position parameters
       .attr("dx", "-0.5em")
       .attr("y", 10)
       .attr("transform", "rotate(-90)")
       .text("Interest rate"); // Text of the label

    let line = d3.line() // Sets the line we are gonna plot
        .x(d => x(d.Month)) //Assign the x values, which are the months
        .y(d => y(d.Num)) //Assign the y values, which are the values of the interest rates
        .curve(d3.curveBasis); // Smooths the line

    svg.append("path") // Appends the line to the svg
        .datum(data)
        .attr("d", line)
        .attr("fill", "none") // Do not fill the area around the line
        .attr("stroke", "#eb4c42"); // Defines the color and the line


    
  });