(function(){
	angular
	.module('app')
	.controller('blogController', blogController);


	function blogController($http){
	  var vm = this;

	  vm.postTags = []
	  vm.posts = []
	  vm.perPage = 10
	  vm.page = 1
	  vm.postCount = 0;
	  vm.newComment = false;
	  vm.users = []
	  vm.commentText = '';
	  vm.newPost = false;
	  vm.currentTag = 0;
	  vm.selectedTags = []
	  vm.tags = []

	  vm.selectedUser = {
	    "id": null,
	    "name": ""
	  }

	  vm.post = {
	    "post":{
	      "title": "",
	      "description": "",
	      "user_id": null,
	      "tag_ids": [],
	      "tags": []
	    }
	  }

	  vm.comment = {
	    "comment": {
	      "text": "",
	      "user_id": null,
	      "comment_id": null,
	    }
	  }

	  vm.setPost = function(post) {
	    vm.post["post"] = post;
	    vm.post["post"]["tag_ids"] = []
	    var len = post.tags.length
	    for(var i=0;i<len;i++){
	      vm.post.post["tag_ids"][i] = post.tags[i]["id"]
	    }
	    console.log("VM POST ---------- - -- - -")
	    console.log(vm.post)
	  };

	  vm.removeTag = function(tag_id){
	    vm.post.post.tag_ids.splice( vm.post.post.tag_ids.indexOf(tag_id), 1 );

	    var len = vm.post.post.tags.length
	    for(var i=0;i<len;i++){
	      if(vm.post.post.tags[i]["id"] == tag_id) {
	        vm.post.post.tags.splice(i, 1);
	      }
	    }
	    console.log(vm.post)
	  };

	  vm.createNewPost = function(){
	    vm.post.post.user_id = vm.selectedUser.id;
	    console.log(vm.post)
	    $http({
	      method: 'POST',
	      url: 'http://localhost:3000/posts/',
	      data: vm.post
	    }).then(function successCallback(response) {
	        vm.getPosts();
	      }, function errorCallback(response) {
	        console.log(response);
	      });
	  };

	  vm.updateTag = function(){
	    vm.post.post.tag_ids.push(vm.currentTag.id)
	    vm.post.post.tags.push(vm.currentTag)
	  };

	  vm.getAllTags = function($htpp){
	    $http({
	      method: 'GET',
	      url: 'http://localhost:3000/tags/'
	    }).then(function successCallback(response) {
	        vm.tags = response.data;
	      }, function errorCallback(response) {
	        console.log(response);
	      });
	  };

	  vm.getAllTags();

	  vm.updatePost = function(){
	    $http({
	      method: 'PUT',
	      url: 'http://localhost:3000/posts/' + vm.post.post.id,
	      data: vm.post
	    }).then(function successCallback(response) {
	        console.log(response)
	        vm.getPosts();
	      }, function errorCallback(response) {
	        console.log(response);
	      });
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

	  vm.createNewComment = function(post_id,user_id,text_content,comment_id=null){
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
	        console.log(response);
	        vm.posts = response.data.posts;
	        vm.postCount = response.data.post_count
	        console.log(vm.posts)
	      }, function errorCallback(response) {
	        console.log(response);
	      });
	  };

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


		vm.getUsers();
	  vm.getPosts();

	};
})();