(function(){
	angular
	.module('app')
	.controller('tagsController', tagsController);

	function tagsController($http){

		var vm = this;

		vm.tags = []
	  vm.editMode = false;
	  vm.newTag = false;
	  vm.tagName = "";

	  vm.tag = {
	    "tag": {
	      "name": ""
	    }
	  }

	  vm.createNewTag = function(){
	    $http({
	      method: 'POST',
	      url: 'http://localhost:3000/tags',
	      data: vm.tag
	    }).then(function successCallback(response) {
	        console.log(response);
	        vm.getTags();
	      }, function errorCallback(response) {
	        console.log(response);
	      });
	  };

	  vm.deleteTag = function(id){
	    $http({
	      method: 'DELETE',
	      url: 'http://localhost:3000/tags/' + id
	    }).then(function successCallback(response) {
	        console.log(response);
	        vm.getTags();
	      }, function errorCallback(response) {
	        console.log(response);
	      });
	  };

	  vm.getTags = function(){
	    console.log("teste")
	    $http({
	      method: 'GET',
	      url: 'http://localhost:3000/tags'
	    }).then(function successCallback(response) {
	        vm.tags = response.data;
	      }, function errorCallback(response) {
	        console.log(response);
	      });
	  };


	  vm.updateTag = function(id){

	    $http({
	      method: 'PUT',
	      url: 'http://127.0.0.1:3000/tags/' + id,
	      data: vm.tag
	    }).then(function successCallback(response) {
	        console.log(response);
	        vm.getTags();
	      }, function errorCallback(response) {
	        console.log(response);
	      });
	  };
	  vm.getTags();
		}

})();