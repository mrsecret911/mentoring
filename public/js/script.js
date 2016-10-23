$(document).ready( function() {
var href = window.location.pathname;
var $nav = $("#nav"),
$content = $("#content");


function loadData(content) {
	$("#content").html(content);
	var pageFunction = $nav.find("li.active a").attr("data-page");
	pageFunctions[pageFunction]();
}


function loadContent(href) {
	history.pushState(null, null, href);
	if(href === '/') {
		url = "http://localhost:9999/pages/home.html";
	}
	else {
		history.pushState(null, null, href);
		url = "http://localhost:9999" + href;
	}
	$.ajax({
		url: url,
		type: 'get',
		dataType: 'html'
	})
	.then(loadData)
	.catch(error => console.error(error))
}

$nav.on('click', 'a', function (event) {
	$(this).closest("li").addClass('active').siblings("li").removeClass("active");
	href = $(this).attr("href");
	event.preventDefault();
	loadContent(href);	
});


loadContent(href);
 	



var pageFunctions = {
	home: function(){
		$(':file').unbind('change').change( function () {
        var input = $(this),
                numFiles = input.get(0).files ? input.get(0).files.length : 1,
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

        var $txt = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;

        if ($txt.length) {
          $txt.val(log);
        }

        readURL(this);

      });

      var allImages = localStorage.getItem("allIamges");
      if(allImages){
        var imgArr = JSON.parse(allImages);
        $("#imgWrap").html('<img src="' + imgArr[imgArr.length - 1].src + '">');
      }

      function readURL(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
          	console.log(22);

            var src = e.target.result;
            $("#imgWrap").html('<img src="' + src + '">');

            if(localStorage.getItem("allIamges")){

              var allImages = JSON.parse(localStorage.getItem("allIamges"));
              allImages.push({
                index: allImages.length,
                src: src
              });
              localStorage.setItem('allIamges', JSON.stringify(allImages));
            }
            else {
              var allImages = [{
                index: 0,
                src: src
              }];
              localStorage.setItem('allIamges', JSON.stringify(allImages));
            }
          }
          reader.readAsDataURL(input.files[0]);
        }

      }

	},
	allImages: function(){
		var allImages = localStorage.getItem("allIamges");
		var $allImages = $("#allImages");

		if(allImages) {
			JSON.parse(allImages).forEach(function(el){
				$allImages.append('<div class="col-xs-3"><img src="' + el.src + '"></div>');
			});	
		}
	},
	searchResult: function(){
		$("#search").submit(function(event){
			$.get( 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBE75WzZrtIJ-M_mKoqC63clmR2SCdskdo&cx=017576662512468239146:omuauf_lfve&q=' + $(this).find("input").val(), function( data ) {
			  var $searchResults = $("#search_results");
			  console.log(data.items);
			    data.items.forEach(function(el) {
			      var title = el.title;
			      var link = el.link;
			      var snippet = el.snippet;
			      $searchResults.append('<div class="col-xs-12"><a href="' + link + '">' + title + '</a><br/> <p>' + snippet + '</p></div><br/>');
			    })
			});
			event.preventDefault();
		});
	},
}
});



