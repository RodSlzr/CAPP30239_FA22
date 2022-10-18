d3.csv("library_visits_jan22.csv").then(data => { // load the data from the csv file
    for (let d of data) {
        d.num = +d.num;
    }; // Everything is loaded as a string. The'+' changes every value of the col num to numbers
    
    const height = 600,
            width = 800,
            margin = ({top: 25, right: 35, bottom: 35, left: 50 });
    // Sets the height, width, and margins variables that we will use later

    let svg = d3.select("#chart") // Select the first chart element in the the html
        .append("svg") // It appends an svg to the div of the chart
        .attr("viewBox", [0, 0, width, height]); // Makes the SVG scalable, and sets the size of the chart

    let x = d3.scaleBand() // use to set as x an ordinal scale of a discrete domain like categories
        .domain(data.map(d => d.branch)) // Each element of x is category of the branch col in the data 
        .range([margin.left, width - margin.right]) // Defines the space of the x axis
        .padding(0.1); // space between columns
    
    let y = d3.scaleLinear() // use to set as y a scale of a continuous domain like real numbers
        .domain([0, d3.max(data, d => d.num)]).nice() // Creates y, between 0 and the max value in our data
        .range([height - margin.bottom, margin.top]) // Defines the y axis space. svgs are built from top to down

    const xAxis = g => g 
        .attr("transform", `translate(0, ${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x)); // creates the x axis to be at the bottom and sets its exact location

    const yAxis = g => g
        .attr("transform", `translate(${margin.left - 5}, 0)`)
        .call(d3.axisLeft(y)); // creates the y axis to be to the left and sets its exact location

    svg.append("g") // appends the xAxis to the SVG, with g tags with the labels and ticks
        .call(xAxis);

    svg.append("g")
        .call(yAxis); // appends the yAxis to the SVG, , with g tags with the labels and ticks

    let bar = svg.selectAll(".bar") // Append g tags that will contain the bars. 1 per data point and select them all
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");
    
    bar.append("rect") // To each g tag a rect tag is appended. The rect tag creates the rectangle figure
        .attr("fill", "#69b3a2") // Fills the bars with color
        .attr("x", d => x(d.branch)) // Determines the location considering the position of the branch in the x axis
        .attr("width", x.bandwidth()) // sets the bandwith of the bars to be equal for all bars
        .attr("y", d => y(d.num)) // Determines the height considering the value of the correspongin num. Bottom to top.
        .attr("height", d => y(0) - y(d.num)); // Determines the height considering the value of the correspongin num. Top to bottom

});