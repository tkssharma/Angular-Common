 // Localstorage service
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
