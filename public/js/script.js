$(document).ready( function() {
var href = window.location.pathname;

function loadPage(href) {
	console.log(window.location);
	if(href === '/') {
		$("#content").load("http://localhost:9999/pages/home/index.html");
	}
	else {
		history.pushState(null, null, href);
		$("#content").load("http://localhost:9999" + href +'index.html' );
	}
}
loadPage(href);


var $nav = $("#nav"),
 	$content = $("#content");

 	$nav.find("a").click(function (event) {
 		href = $(this).attr("href");
 		history.pushState(null, null, href);
 		loadPage(href);
 		event.preventDefault();
 	});

});



