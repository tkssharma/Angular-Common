/* bootstrap  Angular app for fetching common resources 
 * removed ng-app from index page to use manual bootstrap
 * @ bootstrap module added 
 */

 var myApplication = angular.module("Angularapps", [ 'ui.router', 'ngResource', 'pascalprecht.translate' ]);
 var initInjector = angular.injector([ "ng" ]);
 var $http = initInjector.get("$http");

 angular.element(document).ready(
 	function() {
 		
 		$http.get(
 			'demo.json', {
 				cache : false
 			})
 		.then(
 			function(response) {
 				myApplication.constant("config",
 					response.data);
 				console.log(response.data)
 				angular.bootstrap(document,["Angularapps"]);
 				
 			}, function(errorResponse) {
				// Handle error case
			});

 	});


 myApplication
 .controller(
 	"parentCntl",
 	[
 	"config",
 	"$scope",
 	"$rootScope",
 	"$state",
 	"$http",
 	function parentCntl(config, $scope, $rootScope, $state,
 		$http) {
 		$rootScope.lang= "en";
 		$rootScope.configdata = config;

 	}]);
