var allImages = localStorage.getItem("allIamges");
var $allImages = $("#allImages");

if(allImages) {
	JSON.parse(allImages).forEach(function(el){
		$allImages.append('<div class="col-xs-3"><img src="' + el.src + '"></div>');
	});	
}