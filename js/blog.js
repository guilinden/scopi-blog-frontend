var blogClient =  angular.module('blogClient',['ngRoute'])

blogClient.config(['$routeProvider',

        function($routeProvider){
        $routeProvider.
        when('/tags',{
            templateUrl : '../tags.html',
            controller: 'TagsController'
        }).
        when("/", {
            templateUrl: '../index.html',
            controller: 'BlogController'
        });
    }]);

blogClient.controller('BlogController', ['$scope','$http', function($scope,$http){

  $scope.posts = []
  $scope.perPage = 10
  $scope.page = 1
  $scope.postCount = 0;

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