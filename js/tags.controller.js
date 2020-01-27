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
					var len = vm.tags.length
					for(var i=0;i<len;i++){
							if (vm.tags[i]["id"] == tag_id) {
								vm.tags.splice(i, 1);
							}
					}
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


	  vm.updateTag = function(tag_id){

	    $http({
	      method: 'PUT',
	      url: 'http://127.0.0.1:3000/tags/' + tag_id,
	      data: vm.tag
	    }).then(function successCallback(response) {
					console.log(response);
					var len = vm.tags.length
					for(var i=0;i<len;i++){
							if (vm.tags[i]["id"] == tag_id) {
								vm.tags[i] = response.data;
							}
					}
	        //vm.getTags();
	      }, function errorCallback(response) {
	        console.log(response);
	      });
	  };
	  vm.getTags();
		}

})();