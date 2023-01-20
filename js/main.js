AOS.init({
 	duration: 800,
 	easing: 'ease',
 	once: true,
 	offset: -100
});

jQuery(function($) {
	
	'use strict';
	siteMenuClone();
	mobileToggleClick();
	onePageNavigation();
	owlCarouselPlugin();
	scrollWindow();
	counter();
	contactForm();

});

//menüler kısmının mobil görünümünü sağlar
var siteMenuClone = function() {

	setTimeout(function() {

		$('.js-menu-duzen').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.js-mobil-ozellestirme');
		});
		
		var counter = 0;
    $('.mobil-menu .has-children').each(function(){
      var $this = $(this);
      
      $this.prepend('<span class="arrow-collapse collapsed">');

      $this.find('.arrow-collapse').attr({
        'data-toggle' : 'collapse',
        'data-target' : '#collapseItem' + counter,
      });

      $this.find('> ul').attr({
        'class' : 'collapse',
        'id' : 'collapseItem' + counter,
      });

      counter++;

    });

  }, 1000);

	$('body').on('click', '.arrow-collapse', function(e) {
    var $this = $(this);
    if ( $this.closest('li').find('.collapse').hasClass('show') ) {
      $this.removeClass('active');
    } else {
      $this.addClass('active');
    }
    e.preventDefault();  
    
  });

	$(window).resize(function() {
		var $this = $(this),
			w = $this.width();

		if ( w > 768 ) {
			if ( $('body').hasClass('offcanvas') ) {
				$('body').removeClass('offcanvas');
			}
		}
	});

	$('.js-burger-toggle-menu').click(function(e){
		e.preventDefault();
		if ( $('body').hasClass('offcanvas') ) {
  		$('body').removeClass('offcanvas');
  		$('.js-burger-toggle-menu').removeClass('open');
  	} else {
  		$('body').addClass('offcanvas');	
  		$('.js-burger-toggle-menu').addClass('open');
  	}
  });

}; 

//yönetim kurulu bölümünü sağlar
var owlCarouselPlugin = function() {

	$('.yonetim').owlCarousel({
    center: false,
    items: 1,
    loop: true,
    stagePadding: 20,
  	margin: 10,
    smartSpeed: 2000,
    autoplay: true,
    autoplayHoverPause: true,
    dots: true,
    nav: true,
    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">'],

    responsive:{
        400:{
          stagePadding: 20,
  				margin: 10,
        },
        600:{
          stagePadding: 100,
  				margin: 50,
        }
    }
	});
	owlSingleSlider();

	if ( $('.ortaklar-slide').length ) {

		$('.ortaklar-slide').owlCarousel({
			center: false,
	    loop: true,
	    stagePadding: 0,
	    margin: 0,
	    smartSpeed: 1000,
	    autoplay: true,
	    autoplayHoverPause: true,
	    dots: false,
	    nav: false,
	    responsive:{
		    400:{
		      items: 2
		    },
		    768:{
		    	items: 3
		    },
		    1000:{
		    	items: 5
		    }
	    }
	   });
	}

};

//yönetim kurulu bölümünü slayt şeklinde gösterir
var owlSingleSlider = function () {
	if ( $( '.single-slider' ).length ) {
		$('.single-slider').owlCarousel({
	    center: false,
	    items: 1,
	    loop: true,
	    stagePadding: 0,
	    margin: 0,
	    smartSpeed: 1500,
	    autoplay: true,
	    autoplayHoverPause: true,
	    dots: true,
	    nav: true,
	    navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">'],

	    responsive:{
	      400:{
	        stagePadding: 0,
					margin: 0,
	      },
	      600:{
	        stagePadding: 0,
					margin: 0,
	      }
	    }
		});
	}
}




// menüyü üstte tutar
var scrollWindow = function() {
	var lastScrollTop = 0;
	$(window).scroll(function(event){
		var $w = $(this),
				st = $w.scrollTop(),
				navbar = $('.site-icerik');
				// sd = $('.js-scroll-wrap');

		if (st > 150) {
			if ( !navbar.hasClass('scrolled') ) {
				navbar.addClass('scrolled');	
			}
		} 
		if (st < 150) {
			if ( navbar.hasClass('scrolled') ) {
				navbar.removeClass('scrolled sleep');
			}
		} 
		if ( st > 350 ) {
			if ( !navbar.hasClass('awake') ) {
				navbar.addClass('awake');	
			} 

			if (st > lastScrollTop){
	      navbar.removeClass('awake');	
	      navbar.addClass('sleep');	
	   	} else {
	      navbar.addClass('awake');	
	   	}
	   	lastScrollTop = st;
			

		}
		if ( st < 350 ) {
			if ( navbar.hasClass('awake') ) {
				navbar.removeClass('awake');
				navbar.addClass('sleep');
			}
		}

   

	});

};

//yetenekler kısmındaki sayıların gösterimini sağlar
var counter = function() {
	
	$('.yetenekler-bolumu-ozellestirme').waypoint( function( direction ) {

		if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

			var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
			$(this.element).find('.yetenekler-sayi-ozellestirme').each(function(){
				var $this = $(this),
					num = $this.data('number');
				$this.animateNumber(
				  {
				    number: num,
				    numberStep: comma_separator_number_step
				  }, 
				  {
				  	easing: 'swing',
    				duration: 3000
				  }
				);
			});
			
		}

	} , { offset: '95%' } );

};

//menüyü açar
var mobileToggleClick = function() {
	$('.js-menu').click(function(e) {

		e.preventDefault();

  	if ( $('body').hasClass('offcanvas') ) {
  		$('body').removeClass('offcanvas');
  		$('.js-menu').removeClass('active');
  		if ( $('.js-burger-toggle-menu').length ) {
  			$('.js-burger-toggle-menu').removeClass('open');
  		}
  	} else {
  		$('body').addClass('offcanvas');	
  		$('.js-menu').addClass('active');
  		if ( $('.js-burger-toggle-menu').length ) {
  			$('.js-burger-toggle-menu').addClass('open');
  		}
  	}


  });

  
	$(document).mouseup(function(e) {
    var container = $(".mobil-menu");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ( $('body').hasClass('offcanvas') ) {
				$('body').removeClass('offcanvas');
				$('body').find('.js-menu').removeClass('active');

				$('body').find('.js-burger-toggle-menu').removeClass('open');
			}
    }
	}); 
};



// menüdeki bölümlere tıklayınca yavaş akışı sağlar
var onePageNavigation = function() {
  var navToggler = $('.site-menu-toggle');
 	$("body").on("click", ".site-icerik .site-menu-ul li a[href^='#'], .smoothscroll[href^='#'], .mobil-menu .site-nav-wrap li a[href^='#']", function(e) {
    
    e.preventDefault();

    var $body = $('body');
    if ( $body.hasClass('offcanvas')  ) {
    	$body.removeClass('offcanvas');
    	$('body').find('.js-burger-toggle-menu').removeClass('open');
    }

    var hash = this.hash;
    
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, 'easeInOutExpo');

  });

};



//mesaj bölümünün kontrollerini sağlar
var contactForm = function() {
	if ($('#contactForm').length > 0 ) {
		$( "#contactForm" ).validate( {
			rules: {
				name: "required",
				email: {
					required: true,
					email: true
				},
				message: {
					required: true,
					minlength: 5
				}
			},
			messages: {
				name: "Lütfen İsim Soyisim giriniz",
				email: "Lütfen mail adresi giriniz",
				mesaj: "lütfen mesajınızı yazınız"
			},
			errorElement: 'span',
			errorLabelContainer: '.form-error',
			submitHandler: function(form) {		
				var $submit = $('.gonderiliyor'),
					waitText = 'Gönderiliyor...';

				$.ajax({   	
			      type: "POST",
			      url: "php/send-email.php",
			      data: $(form).serialize(),

			      beforeSend: function() { 
			      	$submit.css('display', 'block').text(waitText);
			      },
			      success: function(msg) {
	               if (msg == 'OK') {
	               	$('#basarisiz-form-mesaji').hide();
			            setTimeout(function(){
	               		$('#contactForm').fadeOut();
	               	}, 1000);
			            setTimeout(function(){
			               $('#basarili-form-mesaji').fadeIn();   
	               	}, 1400);
		               
		            } else {
		               $('#basarisiz-form-mesaji').html(msg);
			            $('#basarisiz-form-mesaji').fadeIn();
			            $submit.css('display', 'none');
		            }
			      },
			      error: function() {
			      	$('#basarisiz-form-mesaji').html("Mesajınız başarıyla iletilmiştir, teşekkürler!");
			         $('#basarisiz-form-mesaji').fadeIn();
			         $submit.css('display', 'none');
			      }
		      });    		
	  		}
			
		} );
	}
};
