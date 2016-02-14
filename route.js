// app.js
(function () {
    'use strict';
    var routerApp = angular.module("Angularapps");

    routerApp.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('home');

        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partials/main.html',
            resolve : {
                   
                    loggedin: checkLoggedin
                }
            })
        .state('partyDetail', {
            url: '/party/:partyID/:partyLocation',
            templateUrl: 'partials/welcome/welcome_web.html',
            
            onEnter: [ '$state', 'AuthenticationService', function($state,$stateParams, AuthenticationService){
                if (! AuthenticationService.isLoggedIn($stateParams.partyLocation)) {
                    $state.go('login');
                };
            }]

            resolve : {
                AuthenticationService : [ 'AuthenticationService',
                function(AuthenticationService) {
                    return AuthenticationService.isLoggedIn();
                } ],
                appdata : [
                'AuthenticationService',
                function(AuthenticationService) {
                    return AuthenticationService
                    .getCurrentUser();
                } ]
            }
        });

        $urlRouterProvider.when("/myaccount","/myaccount/contact");
        $urlRouterProvider.when("/welcome","/welcome/web");
        
        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
            // Initialize a new promise
            var deferred = $q.defer();
            // Make an AJAX call to check if the user is logged in
            $http.get('/api/loggedIn')
            .success(function (data) {
                    // Manage session at client end
                    if (data.code != 401) {
                        if(data.type != 'agent'){
                            $timeout(deferred.resolve, 0);
                        }else{
                            $timeout(deferred.resolve, 0);
                            $location.path('/');
                        }
                    }else{
                        $timeout(deferred.resolve, 0);
                        $location.path('/');
                    }
                });
            return deferred.promise;
        };

        var checkLoggedout = function($q, $timeout, $http, $location, $rootScope,$route) {
            // Initialize a new promise
            var deferred = $q.defer();
            // Make an AJAX call to check if the user is logged in
            $http.get('/api/loggedIn')
            .success(function(data) {
                    // Authenticated
                    if (data.code != 401){
                        $timeout(deferred.resolve, 0);
                        if(data.type != 'agent'){
                            $location.path('/users/dashboard');
                        }else{
                            $location.path('/dashboard');
                        }
                    }else{
                        $timeout(deferred.resolve, 0);
                        $location.path($route.current.originalPath);
                    }
                });
            return deferred.promise;
        };
    });


})();


