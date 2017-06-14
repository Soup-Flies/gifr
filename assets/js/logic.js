var searchTag = "";
var tagType = "";
var apiUrl = "";
var limit = 6;
var offset;

var apiKey = "&rating&api_key=dc6zaTOxFJmzC";
var parameters = "&limit=" + limit + "&offset=" + offset;
var api = "https://api.giphy.com/v1/gifs/search?q=";

function runApi() {
	tagType = $("#input").val();
		var currentApiUrl = api + tagType + parameters + apiKey;
			$.getJSON(currentApiUrl,function(json) {
				console.log(json);
				$.each(json.data, function(index, value) {
					$.get(value.images.original.url);
					var newDiv = $("<div class='aspectMaint col-xs-6 col-md-3'>")
					var newGif = $("<img class='giffy'>");
					$(newGif).attr("src", value.images.original_still.url);
					$(newGif).attr("data-name", value.images.original.url);
					$(newDiv).append(newGif);
					$("#gifContainer").append(newDiv);
				});
			});
		console.log(currentApiUrl);
		$("#input").val("");
};

$(document).ready(function() {
	$("#input").on("keyup", function(event) {
		if (event.keyCode == 13) {
			runApi();
		};
	});

	$(".query_btn").on("click", function() {
		runApi();
	});

	$("#gifContainer").on("click", ".giffy", function() {
		console.log(this);
		var temp = $(this).attr("src");
		$(this).attr("src", $(this).attr("data-name"));
		$(this).attr("data-name", temp);
	});

	// $(window).scroll(function () {
	// if ($(window).scrollTop() >= 330 ) {
	// 	setTimeout(function() {
	// 		$(".navSearch").append($(".inputCont"));
	// 		$(".navbar").attr("margin-top", "30px");
	// 	}, 50)
	// } else if ($(window).scrollTop() <= 320) {
	// 	setTimeout(function() {
	// 		$(".inputMain").append($(".inputCont"));
	// 		$(".navbar").attr("margin-top", "-60px");
	// 	}, 50);
	// }
	// });
});

