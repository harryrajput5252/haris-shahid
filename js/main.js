
/***************************************************
==================== JS INDEX ======================
****************************************************
01. PreLoader Js
02. Mobile Menu Js
03. Portfolio Js
04. brand Js
05. client Js
06. Progressbar Js
07. Counterup Js
08. Type text Js
09. Popup video Js


****************************************************/

(function ($) {
	
"use strict";

$(document).ready(function(){
	
	var list	 = jQuery('.body-content .header-section .main-menu ul li, .body-content .header-section .mobile-menu ul li');
	var vContent = jQuery('.body-content');
	var vSection = jQuery('.content');
	
	list.on('click',function(){
		var element = jQuery(this);
		var myHref	= element.find('a').attr('href');
		if(!element.hasClass('active')){
			list.removeClass('active');
			element.addClass('active');
			vSection.removeClass('active');
			vContent.find(myHref).addClass('active').animate({ scrollTop: 0 });
		}
	});
	
	/* Type Text*/	
    var $typed = $("#typed");
    if ($typed.length > 0) {
      $typed.typed({
        strings: ["CMS Expert ", "Full Stack Developer", "Freelancer"],
        stringsElement: null,
        typeSpeed: 40,
        startDelay: 150,
        backSpeed: 40,
        backDelay: 350,
        loop: true,
        loopCount: 550,
        showCursor: true,
        cursorChar: "|",
        attr: null,
        contentType: "html",
      });
    }
	
	/* Progress Bar */ 
	$(document).ready(function(){
		$('.bar1').barfiller({duration: 3000 });
		$('.bar2').barfiller({duration: 3000 });
		$('.bar3').barfiller({duration: 3000 });
		$('.bar4').barfiller({duration: 3000 });
		$('.bar5').barfiller({duration: 3000 });
		$('.bar6').barfiller({duration: 3000 });
	});
	
	/* Counter Up */
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});
	
	/* brand-active */
$('.brand-active').owlCarousel({
    loop:true,
    nav:false,
	dots:false,
	smartSpeed: 600,
	autoplay:true,
    responsive:{
        0:{
            items:2
        },
        576:{
            items:2
        },
        768:{
            items:3
        },
        992:{
            items:4
        },
        1200:{
            items:5
        }
    }
})	

/* testimonial-active */
$('.testi-active').owlCarousel({
    loop:true,
    nav:false,
	smartSpeed: 600,
	dots:true,
	margin:30,
	autoplay:false,
    responsive:{
        0:{
            items:1
        },
        767:{
            items:1
        },
        1000:{
            items:2
        }
    }
})

	/* mobile menu */
	$('#menuToggle').click(function() {
	   $(this).toggleClass('active');
	   $('#mobile-menu').toggleClass('open');
	 });

	function mousecursor() {
    if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
            t = document.querySelector(".cursor-outer");
        let n, i = 0,
            o = !1;
        window.onmousemove = function (s) {
            o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
        }, $("body").on("mouseenter", "a, .cursor-pointer", function () {
            e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
        }), $("body").on("mouseleave", "a, .cursor-pointer", function () {
            $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
        }), e.style.visibility = "visible", t.style.visibility = "visible"
    }
	};

	$(function () {
		mousecursor();
	});

	$('.main-menu ul li a').click(function(e) {
		$('li a').removeClass('active');
		$(this).addClass('active');
	});

	/* portfolio-area */	
    $('.portfolio-area').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
    });

     var $grid = $('.grid.filter').isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: '.grid-item'
      }
    });
	//for filter menu active class
	$('.Portfolio-menu button').on('click', function(event) {
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
		event.preventDefault();
	});
	
	$('.popup-img').magnificPopup({
		type: 'image',
		// other options
	   gallery: {
			// options for gallery
			enabled: true
		 },
	});
	
	/* POPUP VIDEO */  
    if ($(".video-btn").length) {
        $(".video-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {  
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });    
    }
	
	
/* Preloader */ 
	$(window).on('load', function() {
	  $('.hola').delay(2000).fadeOut('slow');
	}); 


	
	
	
})

})(jQuery);