/**
 * global declaration of all angular modules Modules related to resource design
 * can be added to this root module & should be added in every file @ ngTranslate
 * @ LocalController to fetch Translate data
 */
 (function() {
 	angular.module("Angularapps").controller("localController", localController)
 	/* .factory("springRestLocalFetchservice",springRestLocalFetchservice) */
 	.factory("asyncLoader", asyncLoader)
 	.config(config);

	//@config
	config.$inject = [ '$translateProvider' ];
	function config($translateProvider) {
		//$translateProvider.preferredLanguage('en');
		$translateProvider.useLoader('asyncLoader');

		var langMap = {
			'en_AU': 'en',
			'en_CA': 'en',
			'en_NZ': 'en',
			'en_PH': 'en',
			'en_UK': 'en',
			'en_US': 'en',
			'ja_JP': 'ja'
		};

		$translateProvider
		.registerAvailableLanguageKeys(['en', 'sp'], langMap)
		.determinePreferredLanguage();
		/*console.log($translateProvider.
		.determinePreferredLanguage());*/
                                //window.navigator.languages[0]

	}

	// @factory
	asyncLoader.$inject = [ '$q', '$timeout', '$http' ];
	function asyncLoader($q, $timeout, $http) {

		return function(options) {
			var deferred = $q.defer(), translations;

			var resturl = "lang"+options.key+".json"
			$http.get(
				resturl,{cache:false}).success(function(translations) {
					deferred.resolve(translations);
						//alert(translations);
					}).error(function(translations) {
						deferred.reject(translations);
					});

					$timeout(function() {
						deferred.resolve(translations);
					}, 2000);

					return deferred.promise;
				};

			}


	//@controller
	localController.$inject = [ '$translate', '$scope','$rootScope','$state'];
	function localController($translate, $scope,$rootScope,$state) {
		$scope.defaultlanguage = true;
		$scope.state= $state;
		$scope.changeLanguage = function(langKey) {


			if(langKey === 'en')
			{
				$rootScope.lang= "en";
				$scope.defaultlanguage = true;
					//changeLanguageFeedbackPanel(langKey);
				}
				if(langKey === 'sp')
				{
					$rootScope.lang= "sp";
					$scope.defaultlanguage = false;
					//changeLanguageFeedbackPanel(langKey);
				}


				$translate.use(langKey);
			};

		}

	})();
