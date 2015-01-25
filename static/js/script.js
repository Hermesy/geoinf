angular.module('myApp', ["firebase"])
	.controller('myCtrl', function($scope, $http, $firebase, myFactory){
			 
		myFactory.getData().success(function(d){
			$scope.data = d;
			$scope.initialCommentModel();
		});
		
		$scope.comments = myFactory.getComments();
		
		var ref2 = new Firebase("https://luminous-fire-5765.firebaseio.com/");
		ref2.authWithPassword({
			email : "hermes007@gmail.com",
			password : "dupasmoka"
		}, function(error, authData) {
			if (error)
				$scope.auth = false;
			else
				$scope.auth = true
			});	
		
		$scope.addComment = function() {
			myFactory.addComment({id:$scope.comment.id, author:$scope.comment.author, text:$scope.comment.text});
			$('#myModal').modal('hide');
			$scope.initialCommentModel();
		}
		
		$scope.fillIdInModal = function(id) {
			$scope.comment.id = id;	
		}
		
		$scope.initialCommentModel = function() {
			$scope.comment = {};
			$scope.comment.id = "";
			$scope.comment.author = "";
			$scope.comment.text = "";
		}	

		$scope.deleteComment = function(id) {
			myFactory.deleteComment(id);
		}

	})
	.factory('myFactory', function($http, $firebase, $q, $firebaseAuth) {
		var ref = new Firebase("https://luminous-fire-5765.firebaseio.com/comments/");	
		var sync = $firebase(ref);
		var items = sync.$asArray();
		
		var getData = function() {
			var promise = $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=470fd2ec8853e25d2f8d86f685d2270e&page=1')
				.success(function(response) { 
					return response;
				});
			return promise;
		}
		
		var getComments = function() {
			return items;
		}
		
		var addComment = function(object) {
			items.$add(object);
		}
		
		var deleteComment = function(id) {
			var fredRef = new Firebase("https://luminous-fire-5765.firebaseio.com/comments/"+id);
			fredRef.remove();
		}

		return {
			getData: getData,
			getComments: getComments,
			addComment: addComment,
			deleteComment: deleteComment
		}
	});