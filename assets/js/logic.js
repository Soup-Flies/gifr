var limit = 6;
var random = Math.floor(Math.random() * 30);
var offset = random;
var lastSearch = "";
var firstSearch = true;

var apiKey = "&api_key=dc6zaTOxFJmzC";
var api = "https://api.giphy.com/v1/gifs/";

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
function apiSetup(search, random) {
	var tagType = search;
	var parameters = "&limit=" + limit + "&offset=" + offset + "&rating";
	var currentApiUrl;
	if (!random) {
		currentApiUrl = api + "search?q=" + tagType + parameters + apiKey;
		runApi(currentApiUrl);
	} else {
		currentApiUrl = api + "random" + apiKey;
		console.log("random");
		for (var i = 0; i < 6; ++i) {
			runApi(currentApiUrl);
		};
		
	}
};

function runApi(apiUrl) {
	$.getJSON(apiUrl,function(json) {
		$.each(json.data, function(index, value) {
			var rating = value.rating;
			var animImg = value.images.original.url;
			var stillImg = value.images.original_still.url;
			$.get(animImg);
			addGifs(stillImg, animImg, rating);
		});	
	});
	searchTest();
}

//Control the current offset being called for based on back to back searches of same category
function searchTest() {
	var currentSearch = $("#input").val();
	if (currentSearch == lastSearch || !lastSearch) {
		offset += limit;
	} else {
		offset = random;
	}
	lastSearch = $("#input").val();
	$("#input").val("");
}

$(document).ready(function() {

	//Handling for the click of search button
	$("#search").click(function() {
		var search = $("#input").val();
		apiSetup(search, false);
	});

	$("#reSearch").click(function(event) {
		apiSetup(lastSearch, false);
	});

	$("#clearSearch").click(function(event) {
		$("#gifContainer").empty();
		offset = random;
	});

	$("#randomSearch").click(function(event) {
		apiSetup(null, true);
	})

	//Take enter as input confirm versus a click
	$("#input").on("keyup", function(event) {
		if (event.keyCode == 13) {
			var search = $("#input").val();
			apiSetup(search, false);
		};
	});

	//Control still versus animation state for displayed Gifs
	$("#gifContainer").on("click", ".giffy", function() {
		var temp = $(this).attr("src");
		$(this).attr("src", $(this).attr("data-name"));
		$(this).attr("data-name", temp);
	});
});

