// console graffiti
(function(){
	var lines =[];
	lines.push("┌─┐┬ ┬┌┐┌┌─┐┌┬┐┬┌─┐┌┐┌┌─┐┬   ┌─┐┌─┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┬┌─┐┌─┐");
	lines.push("├┤ │ │││││   │ ││ ││││├─┤│───├─┤├┤ └─┐ │ ├─┤├┤  │ ││  └─┐");
	lines.push("└  └─┘┘└┘└─┘ ┴ ┴└─┘┘└┘┴ ┴┴─┘ ┴ ┴└─┘└─┘ ┴ ┴ ┴└─┘ ┴ ┴└─┘└─┘");
	lines.push("http://functional-aesthetics.rhcloud.com ");
	lines.forEach( function( element, index) {
		console.log(element);
	});
})()

//angular appdefinition not neccessary,
//but the method where window resize triggers a broadcast
//needs to be put into your page.  this is en lieu
//of binding and throwing watch function calls by all
//individual my-underline elements (goin cray cray on the digest loop)

var app = angular.module('myUnderline', []);

app.controller('mainCtrl', function($scope, $element, $window) {
	//this is random crap to populate the page for testing
	//not neccessary
	$scope.words = ["directive", "angular", "javascript", "node", "array", "pseudorandom"];
	$scope.welcome = "welcome msg";

	//binding to window in order to broadcast window events to the myUnderline directive elements
	//this is neccessary
	angular.element($window).bind('resize', function(){
		console.log("bang")
         $scope.$broadcast('resizeElement');
       });
})
.directive('myUnderline', function() {
	return {
		restrict:'A',
		scope: 'true',
		link: function(scope,element) {
			var el = d3.select(element[0]),  //angular -> d3 
			width = element[0].clientWidth,
			height = element[0].clientHeight;
			
			var svg = el.append("svg");
			svg.attr('width', width+'px')
				.attr('height', '20px')
				.attr('class','my-underline');

			var g = svg.append('g');

			var barsOne = g.append('line')
				.attr('class','barsOne')  // why u no json? {key1 :value, ....}
				.attr('x2', parseInt(width-4)+'px')
				.attr('stroke-width', '8px')
				.attr('x1' , '4px')
				.attr('y1', '4px')
				.attr('y2', '4px')
				.style('stroke','black')
				.style('stroke-linecap', 'round')
				.style('opacity', ' 0.0')
			    .style('transition', ' 0.3s');

			var barsTwo = g.append('line')
				.attr('class','barsTwo')
				.attr('x2', parseInt(width-4)+'px')
				.attr('stroke-width', '8px')
				.attr('x1' , '4px')
				.attr('y1', '16px')
				.attr('y2', '16px')
				.style('stroke','black')
				.style('stroke-linecap', 'round')
				.style('opacity', ' 0.0')
			    .style('transition', ' 0.3s');
			
			//element events
			element.on('mouseover', function() {	
				d3.select(this).select('.barsOne').style('opacity','0.2');	
			})
			.on('mouseleave', function() {
				d3.select(this).select('.barsOne').style('opacity','0');	
			})
			.on('click', function() {
				d3.selectAll('.barsTwo').style('opacity','0');
				d3.select(this).select('.barsTwo').style('opacity','0.5');
				//angular.element('.active').toggleClass('active');
				//element.addClass('active');
			});

			scope.$on('resizeElement', function() {
				width = element[0].clientWidth;
				el.select('.barsOne').attr('x2', parseInt(width-4)+'px');
				el.select('.barsTwo').attr('x2', parseInt(width-4)+'px');
			
			});

		}
	}
});