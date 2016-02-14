/**
 * global declaration of all angular modules Modules related to resource design
 * can be added to this root module & should be added in every file
 * 
 * @setting global module with ngRoute as Dependancy @ global custom directive @ added
 *          ui.bootstrap.modal to provide angular + bootstrap in built
 *          functionality
 */
(function() {
	angular.module('Angularapps')
	 .config(function ($httpProvider, $provide) {
	    $provide.factory('httpInterceptor', function ($q, $rootScope) {
	        return {
	            'request': function (config) {
	                // intercept and change config: e.g. change the URL
	              
	                //$rootScope.$broadcast('httpRequest', config);
	                return config || $q.when(config);
	            },
	            'response': function (response) {
	                // we can intercept and change response here...
	                // broadcasting 'httpResponse' event
	                //$rootScope.$broadcast('httpResponse', response);
	                return response || $q.when(response);
	            },
	            'requestError': function (rejection) {
	                // broadcasting 'httpRequestError' event
	                //$rootScope.$broadcast('httpRequestError', rejection);
	                return $q.reject(rejection);
	            },
	            'responseError': function (rejection) {
	                // broadcasting 'httpResponseError' event
	               
	               console.log(rejection.status + rejection.statusText);
	               return $q.reject(rejection);
	                
	            }
	        };
	    });
	    $httpProvider.interceptors.push('httpInterceptor');
	})



})();