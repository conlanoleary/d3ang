/*
 * Main directives file
 */

directives = angular.module('directives', []);

directives.directive('d3Bars', ['$window', '$timeout', function($window, $timeout) {
	return {
		restrict: 'EA',
		scope: {
			data: '=' // bi-directional data-binding
		},
		link: function(scope, ele, attrs) {
			
			// Set static variables not dependent on data
			var margin = parseInt(attrs.margin) || 20,
					barHeight = parseInt(attrs.margin) || 20,
					barPadding = parseInt(attrs.barPadding) || 5;

			var svg = d3.select(ele[0])
									.append("svg")
									.style('width', '100%');

			// Browser onresize event
			window.onresize = function() {
				scope.$apply();
			};

			// Watch for resize event
			scope.$watch(function() {
				return angular.element($window)[0].innerWidth;
			}, function() {
				scope.render(scope.data);
			});

			// Watch for data from controller to change and re-render graph
			scope.$watch('data', function(newVals, oldVals) {
				return scope.render(newVals);
			}, true);

			scope.render = function(data) {
				// Remove all previous items before render
				svg.selectAll('*').remove();

				// If we don't passed any data, return out of the element
				if (!data) return;

				// Setup variables
				var width = d3.select(ele[0]).node().offsetWidth - margin,
						// Calculate the height
						height = scope.data.length * (barHeight + barPadding),
						// Use the category20() scale function for multicolor support
						color = d3.scale.category20(),
						// xScale
						xScale = d3.scale.linear()
							.domain([0, d3.max(data, function(d) {
								return d.score;
							})])
							.range([0, width]);

				// Set the height based on the calculations above
				svg.attr('height', height);

				// Create the rectangles for the bar chart
				svg.selectAll('rect')
					.data(data).enter()
						.append('rect')
						.attr('height', barHeight)
						.attr('width', 140)
						.attr('x', Math.round(margin/2))
						.attr('y', function(d,i) {
							return i * (barHeight + barPadding);
						})
						.attr('fill', function(d) { return color(d.score); })
						.transition()
							.duration(1000)
							.attr('width', function(d) {
								return xScale(d.score);
							});

				// Add text
				svg.selectAll('text')
					.data(data).enter()
						.append('text')
						.attr('fill', '#fff')
						.attr('y', function(d,i) {
							return i * (barHeight + barPadding) + 15;
						})
						.attr('x', 15)
						.text(function(d) {
							return d.name + " (scored: " + d.score + ")";
						});
			};
		}
	};
}]);