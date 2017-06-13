
var apiKey = "&rating&api_key=dc6zaTOxFJmzC";
var parameters = "&limit=" + limit + "&offset=" + offset;
var api = "http://api.giphy.com/v1/gifs/search?q=";
var searchTag = "";
var tagType = "";
var apiUrl = "";
var limit = 10;
var offset = 10;

function runApi() {
	tagType = $("#input").val();
		var currentApiUrl = api + tagType + apiKey;
		for (var i = 0; i < 1; i++) {
			$.getJSON(currentApiUrl,function(json) {
				console.log(json);
				$.each(json.data, function(index, value) {
					$.get(value.images.original.url);
					var newGif = $("<img class='giffy col-xs-6 col-md-3'>");
					$(newGif).attr("src", value.images.original_still.url);
					$(newGif).attr("data-name", value.images.original.url);
					$("#gifContainer").append(newGif);
				})
			})
		}
		offset += 10;
		$("#input").val("");
}

$(document).ready(function() {
	$("#input").on("keyup", function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13) {
		runApi();
		}
	})

	$(".query_btn").on("click", function() {
		runApi();
	})

	$("#gifContainer").on("click", ".giffy", function() {
		console.log(this);
		var temp = $(this).attr("src");
		$(this).attr("src", $(this).attr("data-name"));
		$(this).attr("data-name", temp);
	})
})

