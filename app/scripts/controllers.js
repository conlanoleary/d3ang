/*
 * Main controllers file
 */

controllers = angular.module('controllers', []);

controllers.controller('MainCtrl', ['$scope', function ($scope) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma',
    'd3',
  ];
}]);

controllers.controller('DirTestCtrl', ['$scope', function($scope) {
  $scope.greeting = "Resize the page to see the re-rendering"
  $scope.d3Data = [
 	{name: "Greg", score: 98},
	{name: "Ari", score: 60},
	{name: "Q", score: 75},
	{name: "Loser", score: 48}
  ];
}]);
