(function(){
	angular
	.module('app')
	.controller('loginController', loginController);

	function loginController($http,$localStorage,$location){

		var vm = this;

		vm.user = {
			"email": "",
			"password": ""
		}

		vm.login = function(){
			$http({
	      method: 'POST',
	      url: 'http://localhost:3000/auth/login',
	      data: vm.user
	    }).then(function successCallback(response){
					$localStorage.currentUser = { token: response.data.token };
					$http.defaults.headers.common.Authorization = response.data.token;
					$location.path('tags')
					console.log(response.data.token)
	      }, function errorCallback(response) {
	        console.log(response.data);
	      });
		}

		vm.logout = function(){
			$localStorage.removeItem('currentUser');
			$http.defaults.headers.common.Authorization = ''
		}

	}

})();