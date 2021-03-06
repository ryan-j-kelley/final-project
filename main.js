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
		// add more images here
		var image1 = $('.imagePane').eq(0);
		var image2 = $('.imagePane').eq(1);
		var image3 = $('.imagePane').eq(2);
		var image4 = $('.imagePane').eq(3);
		var image5 = $('.imagePane').eq(4);
		var image6 = $('.imagePane').eq(5);
		var image7 = $('.imagePane').eq(6);
		var image8 = $('.imagePane').eq(7);
		var image9 = $('.imagePane').eq(8);
		var image10 = $('.imagePane').eq(9);

		if (isInView(image1)) {
			console.log("it's scrolling")
			$('#image1').addClass('fadeIn');
		};

		if (isInView(image2)) {
			console.log("it's scrolling")
			$('#image2').addClass('fadeIn');
		};

		if (isInView(image3)) {
			console.log("it's scrolling")
			$('#image3').addClass('fadeIn');
		};

		if (isInView(image4)) {
			console.log("it's scrolling")
			$('#image4').addClass('fadeIn');
		};

		if (isInView(image5)) {
			console.log("it's scrolling")
			$('#image5').addClass('fadeIn');
		};

		if (isInView(image6)) {
			console.log("it's scrolling")
			$('#image6').addClass('fadeIn');
		};

		if (isInView(image7)) {
			console.log("it's scrolling")
			$('#image7').addClass('fadeIn');
		};

		if (isInView(image8)) {
			console.log("it's scrolling")
			$('#image8').addClass('fadeIn');
		};

		if (isInView(image9)) {
			console.log("it's scrolling")
			$('#image9').addClass('fadeIn');
		};

		if (isInView(image10)) {
			console.log("it's scrolling")
			$('#image10').addClass('fadeIn');
		};

	});
});

var players = {};

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

	var onPlayerReady = function (event) {
		ele = $("#" + player_id);
		// event.target.playVideo();
	};

	var onPlayerStateChange = function (event) {
		if (event.data == YT.PlayerState.PLAYING && !self.done) {
			setTimeout(stopVideo, 6000);
			self.done = true;
		}
	};

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



	this.stop = function () {
		self.player.stopVideo();
	}

	this.play = function () {
		self.player.playVideo();
	};

	this.pause = function () {
		self.player.pauseVideo();
	};

	this.mute = function () {
		self.player.mute();
	};

	this.unMute = function () {
		self.player.unMute();
	};

	$(window).on("scroll", function () {
		// console.log("YT scroller");
		// console.log("ele", ele);
		if (isInView(ele) && ele.hasClass("autoplay")) {
			// console.log("in view!");
			// self.mute();
			self.play();
		} else {
			self.pause();
		}
	});

};


// make these global

var videos = [];

function onYouTubeIframeAPIReady() {
	$(".youtube").each(function () {
		var id = $(this).data("id");

		players[id] = new CUNY_YT($(this));
	});
};

$('.front').on('click', function (e) {
	e.preventDefault();

	var card = $(this).closest(".card"),
		video_id = card.find("[data-id]").data("id");

	card.find('.front').removeClass('active');
	card.find('.back').addClass('active');

	console.log(players[video_id]);
	players[video_id].player.playVideo();
	// card.find('.interview').playVideo();
});


// if (this.back.hasClass('active') {
// 		removeClass('active')
// 	} else {
// 		addClass('active')
