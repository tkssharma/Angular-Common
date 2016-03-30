function testInterceptor() {
	return {
		request: function(config) {
			if(true) {
				config.headers['x-csrf-token'] = 'lalalalala';
				config.headers.authorization = 'blalalalallalallalallallalallalall';
			}
			return config;
		},

		requestError: function(config) {
			return config;
		},

		response: function(res) {
			return res;
		},

		responseError: function(res) {
			if (response.status === 401) {
				$rootScope.$broadcast('unauthorized');
			}
			return res;
		}
	}
}

angular.module('app', [])
.factory('testInterceptor', testInterceptor)
.config(function($httpProvider) {
	$httpProvider.interceptors.push('testInterceptor');
})
.run(function($http) {
	$http.get('http://test-routes.herokuapp.com/test/hello')
	.then(function(res) {
		console.log(res.data.message)
	})
})
