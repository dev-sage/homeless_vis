var time_series = Array();

var padding = 50, w = window.innerWidth * 0.75, h = window.innerHeight * 0.75;

var xScale = d3.scale.linear()
							.domain([2006, 2016])
							.range([padding, w - padding]);

var yScale = d3.scale.sqrt()
               .domain([0, 1500])
							 .range([h - padding, padding]);
							
var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient("bottom");

var yAxis = d3.svg.axis()
						.scale(yScale)
						.orient("left");
						
var svg = d3.select("#chart")
				    .append("svg")
				    .attr("width", w)
				    .attr("height", h);



d3.csv("data/states_wide.csv", function(error, data) {
	data.forEach(function(d) {
		/*d.date2007 = +d.date2007;*/
		d.date2008 = +d.date2008;
		d.date2009 = +d.date2009;
		d.date2010 = +d.date2010;
		d.date2011 = +d.date2011;
		d.date2012 = +d.date2012;
		d.date2013 = +d.date2013;
		d.date2014 = +d.date2014;
		d.date2015 = +d.date2015;
	});

  console.log(data);
	for(i = 0; i < data.length; i++) {
		time_series[i] = [{time: 2008, value: data[i].date2008}, 
						          {time: 2009, value: data[i].date2009},
						          {time: 2010, value: data[i].date2010},
						          {time: 2011, value: data[i].date2011},
						          {time: 2012, value: data[i].date2012},
						          {time: 2013, value: data[i].date2013},
						          {time: 2014, value: data[i].date2014},
						          {time: 2015, value: data[i].date2015}];
	}
						            
	//console.log(time_series);
	var $message;
	
	function pull_author(time1) {
		$message = $("<div id = 'message'></div>");
		$("body").append($message);
		$message.append("<center> @" + time1[0].value + "</center>");
	}

	function remove_author() {
		$message.remove();
	}
	
  for(i = 0; i < time_series.length; i++) {
    console.log(time_series[i][0].value);
  }

	var line_svg = d3.svg.line()
							.interpolate("basis")
							.x(function(d) { return xScale(d.time); })
							.y(function(d) { return yScale(d.value); });

	svg.selectAll(".line")
		.data(time_series)
		.enter()
		.append("path")
		.attr("class", "line_path")
		.attr("d", line_svg);
		/*.on("mouseover", pull_author)
		.on("mouseout", function(datum) { remove_author(datum) });*/ 
		
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);
		
});

/*d3.csv("data/states_long.csv", function(error, data) {
	data.forEach(function(d) {
		d.year = +d.year;
		d.homeless_per_100k = +d.homeless_per_100k;
	});
	
	console.log(data);

	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(row) { return xScale(row.year) })
		.attr("cy", function(row) { return yScale(row.homeless_per_100k) })
		.attr("r", 2);
		
}); */ 

