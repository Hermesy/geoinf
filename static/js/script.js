angular.module('myApp', ["firebase"])
	.controller('myCtrl', ["$scope", "$http", "$firebase",  
		function($scope, $http, $firebase){
			 
			 var ref = new Firebase("https://luminous-fire-5765.firebaseio.com/comments");		
			 var sync = $firebase(ref);
			 $scope.date = sync.$asObject();
			 
			$http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=470fd2ec8853e25d2f8d86f685d2270e&page=1').success(function(data) { 
				$scope.data = data;
			}); 	
	}])
	.factory('myFactory', function() {
		var myFactoryService;

		return myFactoryService;
  });