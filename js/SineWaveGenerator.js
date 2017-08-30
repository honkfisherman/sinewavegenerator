	$(window).load(function(){

	var can = document.getElementById('myCanvas');
	var con = can.getContext('2d');
	var speed = 40;
	var squareSize = can.width;
	var middle = can.height / 2;
	var timer = -1;
	
	var a = 1; // amplitude, 1 is normal
	var b = 1; // period, 1 is normal
	var	c = 0; // phase shift, positive values phase shift left, 0 is none
	var	d = 0; // vertical shift, 0 is none
	
    window.clearInterval(timer);
    timer = window.setInterval(callAnimation, speed);
	$('#atext').html(a);
	$('#btext').html(b);
	$('#ctext').html(c);
	$('#dtext').html(d);

	displayFormula();
	
	window.requestAnimFrame = (function (callback) {
	    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
	        window.setTimeout(callback, 1000 / 60);
	    };
	})();

// Execute this function first for every interval
	function callAnimation() {
	    requestAnimFrame(function () {
	        animate();
	    });
	}
		
	function animate()
	{
		var x=0,y=0,cc=0,dd=0;
		var scale = 50;
		var x1 = 0;
		
		x = 1;
		cc = -c * scale / b; // convert the input units to pixel offset on the x axis.
		dd = -d * scale; // convert the input units to pixel offset on the y axis.
		y = (a * Math.sin(x * Math.PI / 180 + c) * -1 * scale + middle + dd); //Math.sin uses radians, must convert from degrees
	    con.clearRect(0, 0, can.width, can.height); // Clears the entire canvas
		con.beginPath();
		con.moveTo(x, y);           // Create a starting point (x, y)
		con.strokeStyle = 'black';

		for (var i = 0; i < (Math.floor(can.width / (2 * Math.PI * scale))) * b; i++) // This will make sure that max # of full cycles are drawn
		{
			for (x = 1; x < 361; x++)
			{
				y = (a * Math.sin(x * Math.PI / 180 + c) * -1 * scale + middle + dd);
				x1 = ((i * 2 * Math.PI * scale) + x * Math.PI / 180 * scale) / b;
		    	con.lineTo(x1, y);
		    }
	    }
	    
	    y = middle;
		con.stroke(); // Draw it
		con.beginPath();
		con.moveTo(x1, y);   // Create a starting point (x, y)
	    con.strokeStyle = 'red';
	    con.lineTo(1, y); // draw a line back to the start for the x axis
		con.stroke(); // Draw it

		if (c != 0) // draw a dashed line for the horizontal offset
		{
			con.beginPath();
			con.dashedLine(2 * Math.PI * scale + cc, 1, 2 * Math.PI * scale + cc, can.height, 4);
		    con.strokeStyle = 'blue';
			con.stroke(); // Draw it 
		}
		
		if (d != 0) // draw a dashed line for the vertical offset
		{
			con.beginPath();
			con.dashedLine(x1, y + dd, 1, y + dd, 4);
		    con.strokeStyle = 'blue';
			con.stroke(); // Draw it 
		}

		con.beginPath();
		con.moveTo(2 * Math.PI * scale, 1);   // Create a starting point (x, y)
	    con.strokeStyle = 'red';
	    con.lineTo(2 * Math.PI * scale, can.height); // draw a line for the y axis
		con.stroke(); // Draw it
	}

	CanvasRenderingContext2D.prototype.dashedLine = function (x1, y1, x2, y2, dashLen) {
	    if (dashLen == undefined) dashLen = 2;
	    this.moveTo(x1, y1);
	
	    var dX = x2 - x1;
	    var dY = y2 - y1;
	    var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
	    var dashX = dX / dashes;
	    var dashY = dY / dashes;
	
	    var q = 0;
	    while (q++ < dashes) {
	        x1 += dashX;
	        y1 += dashY;
	        this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
	    }
	    this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
	};
	
	function displayFormula()
	{
		var ccc = c;
		var ddd = d;
		
		c > 0 ? ccc = " + " + c : ccc = " " + c;
		if (c == 0) ccc = "";

		d > 0 ? ddd = " + " + d : ddd = d;
		if (d == 0) ddd = " ";
		
		$('#formula').html("Formula: y = " + a + "sin(" + b + "x" + ccc + ") " + ddd);
	}
	
	$("#aslider").slider({
	    range: "min",
	    value: a,
	    step: 1,
	    min: -5,
	    max: 5,
	    orientation: "vertical",
	    slide: function( event, ui ) {
		    $('#atext').html(ui.value);
		    a = ui.value;
		    displayFormula();
	    } 
	});
 
	$("#bslider").slider({
	    range: "min",
	    value: a,
	    step: 1,
	    min: 1,
	    max: 100,
	    orientation: "vertical",
	    slide: function( event, ui ) {
		    $('#btext').html(ui.value);
		    b = ui.value;
		    displayFormula();
	    } 
	});
 
	$("#cslider").slider({
	    range: "min",
	    value: c,
	    step: 1,
	    min: -7,
	    max: 7,
	    orientation: "vertical",
	    slide: function( event, ui ) {
		    $('#ctext').html(ui.value);
		    c = ui.value;
		    displayFormula();
	    } 
	});
 
	$("#dslider").slider({
	    range: "min",
	    value: d,
	    step: 1,
	    min: -5,
	    max: 5,
	    orientation: "vertical",
	    slide: function( event, ui ) {
		    $('#dtext').html(ui.value);
		    d = ui.value;
		    displayFormula();
	    } 
	});
});