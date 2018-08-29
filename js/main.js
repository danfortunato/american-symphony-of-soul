(function ($) {

	// Init ScrollMagic
    var controller = new ScrollMagic.Controller();

    // get all slides
	var slides = ["#music", "#media"];

	// get all headers in slides that trigger animation
	var headers = ["#music header", "#media header"];

	// get all break up sections
	var breakSections = ["#about", "#shows", "#contact"];

	// Enable ScrollMagic only for desktop, disable on touch and mobile devices
	if (!Modernizr.touch) {

		// SCENE 1
		// create scenes for each of the headers

		var headerScene = new ScrollMagic.Scene({
		        triggerElement: "#music header", // trigger CSS animation when header is in the middle of the viewport 
		        offset: -95 // offset triggers the animation 95 earlier then middle of the viewport, adjust to your liking
		    })
		    .setClassToggle('#music', 'is-active') // set class to active slide
		    //.addIndicators() // add indicators (requires plugin), use for debugging
		    .addTo(controller);

		var headerScene = new ScrollMagic.Scene({
		        triggerElement: "#media header", // trigger CSS animation when header is in the middle of the viewport 
		        offset: -95 // offset triggers the animation 95 earlier then middle of the viewport, adjust to your liking
		    })
		    .setClassToggle('#media', 'is-active') // set class to active slide
		    //.addIndicators() // add indicators (requires plugin), use for debugging
		    .addTo(controller);

	    // SCENE 2
	    // change color of the nav for dark content blocks
	    breakSections.forEach(function (breakSection, index) {
		    
		    // number for highlighting scenes
			var breakID = $(breakSection).attr('id');

		    // make scene
		    var breakScene = new ScrollMagic.Scene({
		        triggerElement: breakSection, // trigger CSS animation when header is in the middle of the viewport 
		        triggerHook: 0.75
		    })
		    .setClassToggle('#'+breakID, 'is-active') // set class to active slide
		    .addTo(controller);
		});

	    // SCENE 4 - parallax effect on each of the slides with bcg
	    // move bcg container when slide gets into the view

			var $bcg = $('#music').find('.bcg');
			var slideParallaxScene = new ScrollMagic.Scene({
		        triggerElement: '#music', 
		        triggerHook: 1,
		        duration: "200%"
		    })
		    //.setTween(TweenMax.from($bcg, 1, {y: '-40%', ease:Linear.easeNone}))
		    .setTween(TweenMax.fromTo($bcg, 1, {y: '-50%', ease:Linear.easeNone}, {y: '50%', ease:Linear.easeNone}))
		    .addTo(controller);

		    var $bcg = $('#media').find('.bcg');

			var slideParallaxScene = new ScrollMagic.Scene({
		        triggerElement: '#media', 
		        triggerHook: 1,
		        duration: "200%"
		    })
		    //.setTween(TweenMax.from($bcg, 1, {y: '-40%', ease:Linear.easeNone}))
		    .setTween(TweenMax.fromTo($bcg, 1, {y: '-25%', ease:Linear.easeNone}, {y: '5%', ease:Linear.easeNone}))
		    .addTo(controller);

	    // SCENE 5 - parallax effect on the intro slide
	    // move bcg container when intro gets out of the the view

	    var introTl = new TimelineMax();

	    introTl
	    	.to($('#splash header, .scroll-hint'), 0.2, {autoAlpha: 0, ease:Linear.easeNone})
	    	.to($('#splash .bcg'), 1.4, {y: '50%', ease:Linear.easeOut}, '-=0.2')
	    	// .to($('#splash'), 0.7, {autoAlpha: 0.5, ease:Linear.easeNone}, '-=1.4');

		var introScene = new ScrollMagic.Scene({
	        triggerElement: '#splash', 
	        triggerHook: 0,
	        duration: "100%"
	    })
	    .setTween(introTl)
	    .addTo(controller);

	    // change behaviour of controller to animate scroll instead of jump
		controller.scrollTo(function (newpos) {
			TweenMax.to(window, 1, {scrollTo: {y: newpos}, ease:Linear.easeInOut});
		});

		//  bind scroll to anchor links
		$(document).on("click", "a[href^='#']", function (e) {
			var id = $(this).attr("href");
			if ($(id).length > 0) {
				e.preventDefault();

				// trigger scroll
				controller.scrollTo(id);

					// if supported by the browser we can even update the URL.
				if (window.history && window.history.pushState) {
					history.pushState("", document.title, id);
				}
			}
		});

	}

}(jQuery));