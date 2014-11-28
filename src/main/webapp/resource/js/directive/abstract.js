

//截取首个<p></p>间的内容，做为试题的摘要显示
OJApp.directive('abstract', function() {
	return {
		restrict: 'AE',
		scope:{},
		link: function(scope, elem, attrs) {
			var context = attrs.context;
			scope.tmpContext = context.substring(context.indexOf("<p>")+3,context.indexOf("</p>"));
		},
		replace: true,
		template:"<td>{{tmpContext}}</td>"
	};

});