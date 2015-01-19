angular.module('myApp', [])
	.controller('myCtrl', function($scope, $http, $page = 1, myFactory){
		$http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=470fd2ec8853e25d2f8d86f685d2270e&page='+$page).success(function(data) { 
			$scope.data = data;
		}); 	
	})
	.factory('myFactory', function() {
		var myFactoryService;

		return myFactoryService;
  });