var master = angular.module('master', ['ngRoute', 'ngResource']);

master.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

master.factory('myFactory', ['$resource', function($resource) {
return $resource( '/auth/facebook',
                        { callback: "JSON_CALLBACK", format:'jsonp' }, 
                        { 
                            method1: { 
                                method: 'JSONP'
                            }
                                  } );

    }]);

master.controller('mainCtrl', function($scope, $http){
	console.log('working')
	$scope.facebookAuth = function(){
		console.log("somehoj")
		$http.jsonp('/auth/facebook').then(function(response){
			console.log(response)
		})
	}
})

master.controller('profile', function($scope, $http, myFactory){	
	// console.log('something')
	// console.log(myFactory.model.get())
	// console.log(myFactory.query())
		$http.jsonp('/auth/facebook').then(function(response){
			console.log(response)
			$scope.user = response.data
		})
})