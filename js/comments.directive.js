(function(){
	angular
	.module('app')
	.directive('commentsDirective', commentsDirective);

	function commentsDirective(){
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
	}

})();