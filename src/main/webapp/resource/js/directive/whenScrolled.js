OJApp.directive('whenscrolled', function() { 
  return function(scope, elm, attr) { 

	  $(window).scroll(function()
	{
	  if(elm.offset().top > 5){
		  elm.removeClass("navbar-transparent");
		  elm.addClass("navbar-inverse");
	  }else{
		  elm.removeClass("navbar-inverse");
		  elm.addClass("navbar-transparent");
	  }
	});
    
    
  }; 
});

