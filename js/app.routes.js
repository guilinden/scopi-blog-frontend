(function(){
	angular
	.module('app')
	.config(router);

	function router($stateProvider,$urlRouterProvider){

		$stateProvider.
        state('tags',{
            url: '/tags',
            templateUrl : 'view/tags.html',
            controller: 'tagsController',
            controllerAs: 'tagsCtrl',

        }).
        state("home", {
            url: '/home',
            templateUrl: 'view/home.html',
            controller: 'blogController',
            controllerAs: 'BlogCtrl',
            data: {
              //requireLogin: false
          }
        })
        .state("posts", {
          url: '/posts',
          templateUrl: 'view/posts.html',
          controller: 'blogController',
          controllerAs: 'BlogCtrl',
          data: {
            requireLogin: true
        }
        }).state("login", {
          url: '/login',
          templateUrl: 'view/login.html',
          controller: 'loginController',
          controllerAs: 'loginCtrl',
          data: {
            requireLogin: false
        }
        });


        $urlRouterProvider
        .otherwise('/home');
	};

})();