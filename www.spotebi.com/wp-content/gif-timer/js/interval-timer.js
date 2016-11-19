var source="http://www.awesomex.tk/www.spotebi.com/wp-content/gif-timer/resources/sounds/get-ready.mp3";

/*global window, document, BLOCKS */
	// Create audio context
	var ctx;
	if (typeof AudioContext !== "undefined") {
		ctx = new window.AudioContext();
	} else if (typeof webkitAudioContext !== "undefined") {
		ctx = new window.webkitAudioContext();
	}

function simpleWebAudioPlayer() {
	
	var player = {},
		sounds = [],
		masterGain;
	
	player.load = function (sound, callback) {
		
		var request;
		
		// Load the sound
		request = new window.XMLHttpRequest();
		request.open("get", sound.src, true);
		request.responseType = "arraybuffer";
		request.onload = function() {
			ctx.decodeAudioData(request.response, function(buffer) {
				
				sounds[sound.name] = sound;
				
				sounds[sound.name].buffer = buffer;
				// Invoke a function if a callback is specified
				if (sounds[sound.name].callback) {
					sounds[sound.name].callback();
				}

			});
		};
		request.send();
	};
	
	player.play = function (name) {
		
		var inst = {};
		
		if (sounds[name]) {	
			// Create a new source for this sound instance
			inst.source = ctx.createBufferSource();
			inst.source.buffer = sounds[name].buffer;
			inst.source.connect(masterGain);
			//inst.source.noteOn(0);			
			// Play the sound
			inst.source.start(0);
		}
	};
	

	// Create the master gain node
	masterGain = (ctx.createGain) ? ctx.createGain() : ctx.createGainNode();
	// Connect the master gain node to the context's output
	masterGain.connect(ctx.destination);
	
	return player;
}


//$(window).ready(function(){$(".timer-next").on("touchend",
function onWindowLoad(){var button = document.getElementsByClassName("timer-menu")[0];

	if ("ontouchstart" in window) {
		button.addEventListener("touchstart", buttonTapped);

	} else {
		button.addEventListener("mousedown", buttonTapped);

	}
            }//)});

function buttonTapped(){
		var player = simpleWebAudioPlayer(),
		soundLoaded = false,
		
		
		onSoundLoaded = function () {
			soundLoaded = true;
			player.play("test");
		};
		
		//buttonTapped = function () {
			
			if (soundLoaded) {
				player.play("test");
			} else {
				player.load({
					name: "test",
					src: source,
					callback: onSoundLoaded
				});
			}
		//};
}


	if (window.addEventListener) {
		window.addEventListener("load", onWindowLoad, false);
	} else if (window.attachEvent) {
		window.attachEvent("onload", onWindowLoad);
	} else {
		window.onload = onWindowLoad;
	}
			
