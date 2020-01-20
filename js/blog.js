var blogClient =  angular.module('blogClient',[])

blogClient.controller('BlogController', ['$scope','$http', function($scope,$http){

  $scope.posts = []
  $scope.perPage = 2
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
    return $scope.perPage == $scope.postCount
  }

}]);