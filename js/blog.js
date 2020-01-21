var blogClient =  angular.module('blogClient',['ngRoute'])

blogClient.config(['$routeProvider',

        function($routeProvider){
        $routeProvider.
        when('/tags',{
            templateUrl : 'view/tags.html',
            controller: 'TagsController'
        }).
        when("/home", {
            templateUrl: 'view/home.html',
            controller: 'BlogController'
        })
        .when("/posts", {
          templateUrl: 'view/posts.html',
          controller: 'BlogController'
        }).otherwise({
          redirectTo: '/home'
        });
    }]);

blogClient.controller('TagsController', ['$scope','$http', function($scope,$http){

  $scope.tags = []
  $scope.editMode = false;
  $scope.newTag = false;
  $scope.tagName = "";

  $scope.tag = {
    "tag": {
      "name": ""
    }
  }

  $scope.createNewTag = function(){
    $http({
      method: 'POST',
      url: 'http://localhost:3000/tags',
      data: $scope.tag
    }).then(function successCallback(response) {
        console.log(response);
        $scope.getTags();
      }, function errorCallback(response) {
        console.log(response);
      });
  };

  $scope.deleteTag = function(id){
    $http({
      method: 'DELETE',
      url: 'http://localhost:3000/tags/' + id
    }).then(function successCallback(response) {
        console.log(response);
        $scope.getTags();
      }, function errorCallback(response) {
        console.log(response);
      });
  };

  $scope.getTags = function(){
    console.log("teste")
    $http({
      method: 'GET',
      url: 'http://localhost:3000/tags'
    }).then(function successCallback(response) {
        $scope.tags = response.data;
      }, function errorCallback(response) {
        console.log(response);
      });
  };

 
  $scope.updateTag = function(id,name){
    tag = { "tag": {
        "name": $scope.tagName
      }
    }
    console.log(tag)

    $http({
      method: 'PUT',
      url: 'http://127.0.0.1:3000/tags/' + id,
      data: tag
    }).then(function successCallback(response) {
        console.log(response);
        //$scope.getTags();
      }, function errorCallback(response) {
        console.log(response);
      });
  };

  $scope.getTags();

}]);

blogClient.controller('BlogController', ['$scope','$http', function($scope,$http){

  $scope.posts = []
  $scope.perPage = 10
  $scope.page = 1
  $scope.postCount = 0;
  $scope.newComment = false;
  $scope.users = []

  $scope.comment = {
    "comment": {
      "text": "",
      "user_id": null,
      "comment_id": null,
    }
  }

  $scope.deletePost = function(post_id){
    $http({
      method: 'DELETE',
      url: 'http://localhost:3000/posts/' + post_id
    }).then(function successCallback(response) {
        console.log(response)
        $scope.getPosts();
      }, function errorCallback(response) {
        console.log(response);
      });
  }

  $scope.deleteComment = function(post_id,comment_id){
    $http({
      method: 'DELETE',
      url: 'http://localhost:3000/posts/' + post_id + '/comments/' + comment_id
    }).then(function successCallback(response) {
        console.log(response)
        $scope.getPosts();
      }, function errorCallback(response) {
        console.log(response);
      });
  }

  $scope.createNewComment = function(post_id,user_id,comment_id=null){
    $scope.comment.comment.user_id = user_id;
    $scope.comment.comment.comment_id = comment_id;
    console.log("--------------------- New Comment -----------------")
    console.log($scope.comment)
    console.log(comment_id)
    $http({
      method: 'POST',
      url: 'http://localhost:3000/posts/' + post_id + '/comments',
      data: $scope.comment
    }).then(function successCallback(response) {
        $scope.getPosts();
        $scope.comment = {
          "comment": {
            "text": "",
            "user_id": null,
            "comment_id": null,
          }
        }
      }, function errorCallback(response) {
        console.log(response);
      });
  };

  $scope.getUsers = function(){
    $http({
      method: 'GET',
      url: 'http://localhost:3000/users'
    }).then(function successCallback(response) {
        $scope.users = response.data;
      }, function errorCallback(response) {
        console.log(response);
      });
  };

  $scope.getPosts = function(){
    console.log("teste")
    $http({
      method: 'GET',
      url: 'http://localhost:3000/posts',
      headers: {
        'perPage': $scope.perPage,
        'page': $scope.page
      }
    }).then(function successCallback(response) {
        console.log(response);
        $scope.posts = response.data.posts;
        $scope.postCount = response.data.post_count
      }, function errorCallback(response) {
        console.log(response);
      });
  };

  $scope.getUsers();
  $scope.getPosts();

  $scope.getMorePosts = function(){
    console.log($scope.postCount)
    if($scope.perPage < $scope.postCount){
      $scope.perPage += 1
      $scope.getPosts();
    }
  };

  $scope.isButtonDisabled = function(){
    return $scope.posts.length >= $scope.postCount 
  }

}]);