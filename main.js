// this is where the scroll spy starts
var isInView = function (el) {
	if (typeof el == "undefined") {
		return false;
	}

	if (typeof el === "object") {
		el = el[0];
	}

	var rect = el.getBoundingClientRect();

	return rect.bottom > 0 &&
		rect.right > 0 &&
		rect.left < (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */ &&
		rect.top < (window.innerHeight || document.documentElement.clientHeight) /*or $(window).height() */ ;
};

// var timer;

$(document).ready(function () {
	$(window).on("scroll", function () {
		var image1 = $('.imagePane').eq(0);
		var image2 = $('.imagePane').eq(1);

		if (isInView(image1)) {
			console.log("it's scrolling")
			$('#image1').addClass('fadeIn');
		};

		if (isInView(image2)) {
			console.log("it's scrolling")
			$('#image2').addClass('fadeIn');
		};
	});
});

var CUNY_YT = function (ele) {
	var self = this,
		width = ele.width(),
		height = width * .5625;

	if (typeof window.player_counter === "undefined") {
		window.player_counter = 0;
	}

	window.player_counter++;

	var player_id = "cuny_player_" + window.player_counter;

	ele.attr("id", player_id);

	this.player = new YT.Player(player_id, {
		height: height,
		width: width,
		videoId: ele.data("id"),
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});

	this.done = false;

	var onPlayerReady = function (event) {
		event.target.playVideo();
	};

	var onPlayerStateChange = function (event) {
		if (event.data == YT.PlayerState.PLAYING && !self.done) {
			setTimeout(stopVideo, 6000);
			self.done = true;
		}
	}

	this.stop = function () {
		self.player.stopVideo();
	}

};

var videos = [];

function onYouTubeIframeAPIReady() {
	$(".youtube").each(function () {
		videos.push(new CUNY_YT($(this)));
	});
}

$('.front').on('click', function (e) {
	e.preventDefault();

	var card = $(this);

	$('card, .front').removeClass('active');
	$('card, .back').addClass('active');

});


// if (this.back.hasClass('active') {
// 		removeClass('active')
// 	} else {
// 		addClass('active')
