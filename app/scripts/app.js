
/* 
 * Main application and configuration 
 */

d3angApp = angular.module('d3angApp', [// Custom d3angApp
                                       'controllers',
                                       'directives',
                                       'filters',
                                       'services',
                                       // Third party
                                       ]);
  
d3angApp.config(['$routeProvider', function ($routeProvider) {
    
  $routeProvider.when('/', {
    templateUrl: 'views/main.html',
      controller: 'MainCtrl'
  });

  $routeProvider.when('/dirtest/', {
    templateUrl: 'views/dirtest.html',
    controller: 'DirTestCtrl'
  });

  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]);
