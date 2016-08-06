//myUnderline automatically appends svg element and subsequent underline rectangles to parent elements.  uses jquery to ascertain width of parent elements, and d3 to generate and style svgs
//class the DOM elements you want svg's appended to with 'class = "myUnderline"'
	
	var myUnderlines = d3.selectAll('.myUnderline');

	var svgs = myUnderlines.append('svg')
		.each(function(){  //can implement jquery through use of each()
			$(this).attr({'width': $(this).parent().width(),
					  'height': '20px'});
		})
		.on('mouseover', function(){
			d3.select(this).select('.barsOne').style({'opacity':'0.2'});
		})
		.on('mouseleave', function(){
			d3.select(this).select('.barsOne').style({'opacity':'0.0'});
		})
		.on('click', function(){
			d3.selectAll('.barsTwo').style({'opacity':'0.0'});
			d3.select(this).select('.barsTwo').style({'opacity':'0.5'});
		});

	//create equivalent on mouseover of link
	myUnderlines
		.on('mouseover', function(){
				d3.select(this).select('.barsOne').style({'opacity':'0.2'});
			})
			.on('mouseleave', function(){
				d3.select(this).select('.barsOne').style({'opacity':'0.0'});
			})
			.on('click', function(){
				d3.selectAll('.barsTwo').style({'opacity':'0.0'});
				d3.select(this).select('.barsTwo').style({'opacity':'0.5'});
			});

	var g = svgs.append('g');

	var barsOne = g.append('line')
		.each( function() {
			$(this).attr({
						'class' : 'barsOne',
						'x2': $(this).parent().parent().width()-4,
					  	'stroke-width': '8px',
					  	'x1' : '4px',
					  	'y1' : '4px',
					  	'y2' : '4px',
					  });

		})
		.style({'stroke':'black',
				'stroke-linecap': 'round',
				'opacity' : ' 0.0',
			    'transition': ' 0.3s'});

	var barsTwo = g.append('line')
		.each( function() {
				$(this).attr({
						'class' : 'barsTwo',
						'x2': $(this).parent().parent().width()-4,
					  	'stroke-width': '8px',
					  	'x1' : '4px',
					  	'y1' : '16px',
					  	'y2' : '16px',
					  });

			})
			.style({'stroke':'black',
				'stroke-linecap': 'round',
				'opacity' : ' 0.0',
			    'transition': ' 0.3s'});

// on resize : on windowscroll mouseup event (doesn't trigger at end of resize :/)
// http://stackoverflow.com/questions/2996431/detect-when-a-window-is-resized-using-javascript
$(window).resize(function(){

		svgs
			.each(function(){  //can implement jquery through use of each()
				$(this).attr({'width': $(this).parent().width()});
			});
		barsOne
			.each( function() {
							$(this).attr({
										'x2': $(this).parent().parent().width()-4,
					  				})
				});
		barsTwo
			.each( function() {
					$(this).attr({
								'x2': $(this).parent().parent().width()-4,
					  		})
				});


});	