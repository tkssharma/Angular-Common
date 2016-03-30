app.service('UserService', function(store) {
	var service = this,
		currentUser = null;

	service.setCurrentUser = function(user) {
		currentUser = user;
		store.set('user', user);
		return currentUser;
	};

	service.getCurrentUser = function() {
		if (!currentUser) {
			currentUser = store.get('user');
		}
		return currentUser;
	};
})

.service('APIInterceptor', function($rootScope, UserService) {
	var service = this;

	service.request = function(config) {
		return config;
	};

	service.responseError = function(response) {
		return response;
	};
})

// send token in request

.service('APIInterceptor', function($rootScope, UserService) {
    var service = this;

    service.request = function(config) {
        var currentUser = UserService.getCurrentUser(),
            access_token = currentUser ? currentUser.access_token : null;

        if (access_token) {
            config.headers.authorization = access_token;
        }
        return config;
    };

    service.responseError = function(response) {
        return response;
    };
})

// check for responseError

.service('APIInterceptor', function($rootScope, UserService) {
    var service = this;

    service.request = function(config) {
        var currentUser = UserService.getCurrentUser(),
            access_token = currentUser ? currentUser.access_token : null;

        if (access_token) {
            config.headers.authorization = access_token;
        }
        return config;
    };

    service.responseError = function(response) {
        if (response.status === 401) {
            $rootScope.$broadcast('unauthorized');
        }
        return response;
    };
})
// push the interceptors in $httpprovider
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/templates/login.tmpl.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'app/templates/dashboard.tmpl.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashboard'
        });

    $urlRouterProvider.otherwise('/dashboard');

    $httpProvider.interceptors.push('APIInterceptor');
})
