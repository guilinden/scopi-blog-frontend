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
					vm.tags.push(response.data)
	      }, function errorCallback(response) {
	        console.log(response);
	      });
	  };

	  vm.deleteTag = function(tag_id){
	    $http({
	      method: 'DELETE',
	      url: 'http://localhost:3000/tags/' + tag_id
	    }).then(function successCallback(response) {
					console.log(response);
					var tagIndex = vm.tags.findIndex(tag => tag.id == tag_id);
					vm.tags.splice(tagIndex, 1);
	      }, function errorCallback(response) {
	        console.log(response);
	      });
	  };

	  vm.getTags = function(){
	    $http({
	      method: 'GET',
	      url: 'http://localhost:3000/tags'
	    }).then(function successCallback(response) {
	        vm.tags = response.data;
	      }, function errorCallback(response) {
	        console.log(response);
	      });
	  };

	  vm.updateTag = function(tag_id){

	    $http({
	      method: 'PUT',
	      url: 'http://127.0.0.1:3000/tags/' + tag_id,
	      data: vm.tag
	    }).then(function successCallback(response) {
					var tagIndex = vm.tags.findIndex(tag => tag.id == tag_id);
					vm.tags[tagIndex] = response.data;
	      }, function errorCallback(response) {
	        console.log(response);
	      });
	  };
	  vm.getTags();
		}

})();