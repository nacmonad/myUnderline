var app = angular.module('myUnderline', []);

app.controller('mainCtrl', function($scope, $element, $window) {
	console.log("hello wolrd!");
	$scope.words = ["directive", "angular", "javascript", "node", "array", "pseudorandom"];
	$scope.welcome = "welcome msg";

	angular.element($window).bind('resize', function(){
         // is outside of angular
         //scope.$digest();
         $scope.$broadcast('resizeElement');
       });



})
.directive('myUnderline', function() {
	return {
		restrict:'A',
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
				.attr('class','barsOne')  // {key1 :value, ....}
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