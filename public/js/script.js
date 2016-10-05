  $(document).ready( function() {


function loadPage(href) {
	if(href === '/') {
		$("#content").load("http://localhost:9999/pages/home.html");
	}
	else {
		$("#content").load("http://localhost:9999" + href );
	}
	 
}
loadPage(window.location.pathname);



var $nav = $("#nav"),
 	$content = $("#content");

 	$nav.find("a").click(function (event) {
 		var href = $(this).attr("href");

 		history.pushState(null, null, href);

 		loadPage(href);

 		event.preventDefault();
 	});



});



