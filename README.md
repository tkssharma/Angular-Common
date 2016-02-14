
# Angular JS Common Features

Angular JS
Code example for some importent concepts of Angular JS
================
- Angular interceptor 
- Angular lazy load 
- Angular Style Guide
- Angular promises 
- Angular $resources 
- Angular UI router $stateparam 
- $window html5 localstorage 
- securing REST API at client side angular 


Angular JS 
====================
<a name="README">[<img src="http://www.w3schools.com/angular/pic_angular.jpg" width="50px" height="50px" />](https://github.com/kumartarun/React-JS-Starter-apps.git)</a>

HTTP Interceptors
====================
```Javascript
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
```

Local Storage 
====================
```Javascript

 (function () {
	'use strict';
	var app = angular.module('Angularapps');

	app.factory('$localStorage', ['$window', function($window) {
		return {
			set: function(key, value) {
				$window.localStorage[key] = value;
			},
			get: function(key, defaultValue) {
				return $window.localStorage[key] || defaultValue;
			},
			setObject: function(key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			},
			getObject: function(key) {
				return JSON.parse($window.localStorage[key] || '{}');
			},
			remove: function(key){
				delete $window.localStorage[key];
			}
		}
	}]);

})();

``

Run the tutorial
====================
```Terminal
git clone https://github.com/tkssharma/Angular-Common.git
Run index.html files on any local server
```

Contact
====================
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/MARTIN2.png" />](http://gennexttraining.herokuapp.com/)
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/github.png" />](https://github.com/tkssharma)
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/mail.png" />](mailto:tarun.softengg@gmail.com)
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/linkedin.png" />](https://www.linkedin.com/in/tkssharma)
[<img src="https://s3-us-west-2.amazonaws.com/martinsocial/twitter.png" />](https://twitter.com/tkssharma)
