(function() {

	var geoDecorator = function($delegate) {
		var locate = function() {
			var start = new Date();
			var result = $delegate.locate();
			result.always(function () {
				console.log("Geo location took: " + (new Date() - start) + "ms");
			});
			return result;
		};

		return {
		  locate: locate
		};
	};

	var testApp = angular.module("testApp");
	testApp.config(["$provide", function ($provide) {
		$provide.decorator("geo", geoDecorator);
	}]);

}());

var upstream = angular.module('thirdParty', []);
upstream.service('emailService', function() {
  this.email = "";

  this.setContent = function(content) {
    this.email = content;
  };

  this.send = function(recipient) {
    return 'sending "' + this.email + '" to ' + recipient;
  };
});

var app = angular.module('myApp', ['thirdParty']);

app.config(function($provide) {
  $provide.decorator('emailService', function($delegate) {
    // myApp depends on the emailService from a third-party module, but the service is lacking a way to send email with signature.
    // To avoid reinventing the wheel and, as well as, maintaining a good habit of leaving third-party module intact,
    // I use $provide.decorator here to enhance emailService.
    $delegate.sendWithSignature = function(recipient, signature) {
      return 'sending "' + this.email + '" to ' + recipient + " by " + signature;
    };
    return $delegate;
  });
});

app.controller('MainCtrl', function($scope, emailService) {
  emailService.setContent("Greeting!!");
  $scope.emailComplete = emailService.sendWithSignature('a@a.com', 'tamakisquare');
});



