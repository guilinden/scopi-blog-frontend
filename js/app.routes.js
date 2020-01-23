(function(){
	angular
	.module('app')
	.config(router);

	function router($routeProvider){
		$routeProvider.
        when('/tags',{
            templateUrl : 'view/tags.html',
            controller: 'tagsController',
            controllerAs: 'tagsCtrl'
        }).
        when("/home", {
            templateUrl: 'view/home.html',
            controller: 'blogController',
            controllerAs: 'BlogCtrl'
        })
        .when("/posts", {
          templateUrl: 'view/posts.html',
          controller: 'blogController',
          controllerAs: 'BlogCtrl'
        }).otherwise({
          redirectTo: '/home'
        });
	};

})();