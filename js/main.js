;(function () {

	'use strict';



	// iPad and iPod detection
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	var fullHeight = function() {
		if ( !isiPad() && !isiPhone() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			})
		}


	};

	var sliderMain = function() {

	  	$('#portfolio-home .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000
	  	});

	  	$('#portfolio-home .flexslider .slides > li').css('height', $(window).height());
	  	$(window).resize(function(){
	  		$('#portfolio-home .flexslider .slides > li').css('height', $(window).height());
	  	});

	};

	var sliderSayings = function() {
		$('#portfolio-sayings .flexslider').flexslider({
			animation: "slide",
			slideshowSpeed: 5000,
			directionNav: false,
			controlNav: true,
			smoothHeight: true,
			reverse: true
	  	});
	}

	var offcanvasMenu = function() {
		$('body').prepend('<div id="portfolio-offcanvas" />');
		$('body').prepend('<a href="#" class="js-portfolio-nav-toggle portfolio-nav-toggle"><i></i></a>');

		$('.portfolio-main-nav .portfolio-menu-1 a, .portfolio-main-nav .portfolio-menu-2 a').each(function(){

			var $this = $(this);

			$('#portfolio-offcanvas').append($this.clone());

		});
		// $('#portfolio-offcanvas').append
	};

	var mainMenuSticky = function() {

		var sticky = $('.js-sticky');

		sticky.css('height', sticky.height());
		$(window).resize(function(){
			sticky.css('height', sticky.height());
		});

		var $section = $('.portfolio-main-nav');

		$section.waypoint(function(direction) {

		  	if (direction === 'down') {

			    	$section.css({
			    		'position' : 'fixed',
			    		'top' : 0,
			    		'width' : '100%',
			    		'z-index' : 99999
			    	}).addClass('portfolio-shadow');;

			}

		}, {
	  		offset: '0px'
		});

		$('.js-sticky').waypoint(function(direction) {
		  	if (direction === 'up') {
		    	$section.attr('style', '').removeClass('portfolio-shadow');
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 69; }
		});

	};

	// Parallax
	var parallax = function() {

		$(window).stellar();

	};


	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-portfolio-nav-toggle', function(event){

			var $this = $(this);

			$('body').toggleClass('portfolio-overflow offcanvas-visible');
			$this.toggleClass('active');
			event.preventDefault();

		});

	};

	var scrolledWindow = function() {

		$(window).scroll(function(){

			var scrollPos = $(this).scrollTop();


			$('#portfolio-home .portfolio-text').css({
		      'opacity' : 1-(scrollPos/300),
		      'margin-top' : (-212) + (scrollPos/1)
		   });

		   $('#portfolio-home .flexslider .portfolio-overlay').css({
				'opacity' : (.5)+(scrollPos/2000)
		   });

		   if (scrollPos > 300) {
				$('#portfolio-home .portfolio-text').css('display', 'none');
			} else {
				$('#portfolio-home .portfolio-text').css('display', 'block');
			}


		});

		$(window).resize(function() {
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-portfolio-nav-toggle').removeClass('active');
		   }
		});

	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);

			return false;
		});

	};


	// Page Nav
	var clickMenu = function() {
		var topVal = ( $(window).width() < 769 ) ? 0 : 58;

		$(window).resize(function(){
			topVal = ( $(window).width() < 769 ) ? 0 : 58;
		});
		$('.portfolio-main-nav a:not([class="external"]), #portfolio-offcanvas a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section');

				if ( $('div[data-section="' + section + '"]').length ) {

					$('html, body').animate({
			        	scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
			    	}, 500);

			   }

		    event.preventDefault();

		    // return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		$('.portfolio-main-nav a[data-nav-section], #portfolio-offcanvas a[data-nav-section]').removeClass('active');
		$('.portfolio-main-nav, #portfolio-offcanvas').find('a[data-nav-section="'+section+'"]').addClass('active');

	};

	var navigationSection = function() {

		var $section = $('div[data-section]');

		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}

		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	// Animations
	var homeAnimate = function() {
		if ( $('#portfolio-home').length > 0 ) {

			$('#portfolio-home').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						$('#portfolio-home .to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);


					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};



	var aboutAnimate = function() {
		var about = $('#portfolio-about');
		if ( about.length > 0 ) {

			about.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						about.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);

					setTimeout(function() {
						about.find('.to-animate-2').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);



					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};

	var sayingsAnimate = function() {
		var sayings = $('#portfolio-sayings');
		if ( sayings.length > 0 ) {

			sayings.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						sayings.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);


					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};

	var featureAnimate = function() {
		var feature = $('#portfolio-featured');
		if ( feature.length > 0 ) {

			feature.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						feature.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);

					setTimeout(function() {
						feature.find('.to-animate-2').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('bounceIn animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 500);


					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};

	var typeAnimate = function() {
		var type = $('#portfolio-type');
		if ( type.length > 0 ) {

			type.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						type.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);

					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};

	var foodMenusAnimate = function() {
		var menus = $('#portfolio-menus');
		if ( menus.length > 0 ) {

			menus.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						menus.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);

					setTimeout(function() {
						menus.find('.to-animate-2').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 500);

					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};


	var eventsAnimate = function() {
		var events = $('#portfolio-events');
		if ( events.length > 0 ) {

			events.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						events.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);

					setTimeout(function() {
						events.find('.to-animate-2').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 500);

					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};

	var reservationAnimate = function() {
		var contact = $('#portfolio-contact');
		if ( contact.length > 0 ) {

			contact.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						contact.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);

					setTimeout(function() {
						contact.find('.to-animate-2').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 500);

					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};

	var footerAnimate = function() {
		var footer = $('#portfolio-footer');
		if ( footer.length > 0 ) {

			footer.waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						footer.find('.to-animate').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 200);

					setTimeout(function() {
						footer.find('.to-animate-2').each(function( k ) {
							var el = $(this);

							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );

						});
					}, 500);

					$(this.element).addClass('animated');

				}
			} , { offset: '80%' } );

		}
	};



	// Document on load.
	$(function(){

		fullHeight();
		sliderMain();
		sliderSayings();
		offcanvasMenu();
		mainMenuSticky();
		parallax();
		burgerMenu();
		scrolledWindow();
		clickMenu();
		navigationSection();
		goToTop();


		// Animations
		homeAnimate();
		aboutAnimate();
		sayingsAnimate();
		featureAnimate();
		typeAnimate();
		foodMenusAnimate();
		eventsAnimate();
		reservationAnimate();
		footerAnimate();



	});


}());
