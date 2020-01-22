var blogClient =  angular.module('blogClient',['ngRoute'])

blogClient.directive('comments', function() {
  var directive = {};
  directive.restrict = 'E';
  directive.templateUrl = 'view/comments.html'
  directive.scope = {
    comment : "=comment",
    deleteComment: '&',
    createNewComment: '&',
    postId: '=',
    users: '=',
 }

 return directive;
});

blogClient.config(['$routeProvider',

        function($routeProvider){
        $routeProvider.
        when('/tags',{
            templateUrl : 'view/tags.html',
            controller: 'TagsController'
        }).
        when("/home", {
            templateUrl: 'view/home.html',
            controller: 'BlogController',
            controllerAs: 'BlogCtrl'
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

blogClient.controller('BlogController', function($http){

  var vm = this;

  vm.posts = []
  vm.perPage = 10
  vm.page = 1
  vm.postCount = 0;
  vm.newComment = false;
  vm.users = []

  vm.comment = {
    "comment": {
      "text": "",
      "user_id": null,
      "comment_id": null,
    }
  }

  vm.deletePost = function(post_id){
    $http({
      method: 'DELETE',
      url: 'http://localhost:3000/posts/' + post_id
    }).then(function successCallback(response) {
        console.log(response)
        vm.getPosts();
      }, function errorCallback(response) {
        console.log(response);
      });
  }

  vm.deleteComment = function(post_id,comment_id){
    $http({
      method: 'DELETE',
      url: 'http://localhost:3000/posts/' + post_id + '/comments/' + comment_id
    }).then(function successCallback(response) {
        console.log(response)
        vm.getPosts();
      }, function errorCallback(response) {
        console.log(response);
      });
  }

  vm.createNewComment = function(post_id,user_id,comment_id=null,text_content){
    vm.comment.comment.user_id = user_id;
    vm.comment.comment.comment_id = comment_id;
    vm.comment.comment.text = text_content;
    console.log("--------------------- New Comment -----------------")
    console.log(vm.comment)
    console.log(comment_id)
    $http({
      method: 'POST',
      url: 'http://localhost:3000/posts/' + post_id + '/comments',
      data: vm.comment
    }).then(function successCallback(response) {
        vm.getPosts();
        vm.comment = {
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

  vm.getUsers = function(){
    $http({
      method: 'GET',
      url: 'http://localhost:3000/users'
    }).then(function successCallback(response) {
        vm.users = response.data;
      }, function errorCallback(response) {
        console.log(response);
      });
  };

  vm.getPosts = function(){
    console.log("teste")
    $http({
      method: 'GET',
      url: 'http://localhost:3000/posts',
      headers: {
        'perPage': vm.perPage,
        'page': vm.page
      }
    }).then(function successCallback(response) {
        console.log(vm.perPage);
        vm.posts = response.data.posts;
        vm.postCount = response.data.post_count
        console.log(vm.posts)
      }, function errorCallback(response) {
        console.log(response);
      });
  };

  vm.getUsers();
  vm.getPosts();

  vm.getMorePosts = function(){
    console.log(vm.postCount)
    if(vm.perPage < vm.postCount){
      vm.perPage += 1
      vm.getPosts();
    }
  };

  vm.isButtonDisabled = function(){
    return vm.posts.length >= vm.postCount 
  }

});