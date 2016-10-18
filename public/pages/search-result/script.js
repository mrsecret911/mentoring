$(function() {
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
});