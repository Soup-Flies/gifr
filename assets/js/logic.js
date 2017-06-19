var limit = 6;
var offset = 0;
var lastSearch = "";
var firstSearch = true;

var apiKey = "&rating&api_key=dc6zaTOxFJmzC";
var api = "https://api.giphy.com/v1/gifs/search?q=";

//Display returned gifs from API and add rating information to them
function addGifs(still, original, rating) {
	var newDiv = $("<div class='aspectMaint col-xs-6 col-md-3'>")
	var newGif = $("<img data-toggle='tooltip' data-placement='bottom' class='giffy'>");
	$(newGif).attr("src", still);
	$(newGif).attr("data-name", original);
	$(newGif).attr("title", "Rating: " + rating.toUpperCase());
	$(newDiv).append(newGif);
	$("#gifContainer").append(newDiv);
};

//Call the Giphy api, and setup variables to more easily handle the objects returned
function runApi() {
	var tagType = $("#input").val();
	var parameters = "&limit=" + limit + "&offset=" + offset;
	var currentApiUrl = api + tagType + parameters + apiKey;
	$.getJSON(currentApiUrl,function(json) {
		$.each(json.data, function(index, value) {
			var rating = value.rating;
			var animImg = value.images.original.url;
			var stillImg = value.images.original_still.url;
			$.get(animImg);
			addGifs(stillImg, animImg, rating);
		});	
	});
};

//Control the current offset being called for based on repeat searches of same category
function searchTest() {
	var currentSearch = $("#input").val();
	if (currentSearch == lastSearch || !lastSearch) {
		offset += limit;
	} else {
		offset = 0;
	}
	lastSearch = $("#input").val();
	$("#input").val("");
}

$(document).ready(function() {

	//Take enter as input confirm versus a click
	$("#input").on("keyup", function(event) {
		if (event.keyCode == 13) {
			runApi();
			searchTest();
		};
	});

	//Handling for the click of search button
	$(".query_btn").on("click", function() {
		runApi();
		searchTest();
	});

	//Control still versus animation state for displayed Gifs
	$("#gifContainer").on("click", ".giffy", function() {
		var temp = $(this).attr("src");
		$(this).attr("src", $(this).attr("data-name"));
		$(this).attr("data-name", temp);
	});
});

