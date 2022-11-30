(function ($) {
    "use strict";

    var Tp_Blog_Slider = function ($scope, $) {

        $scope.find('.tp-blog-slider').each(function () {
            var settings = $(this).data('xld');
            var swiper = new Swiper($(this), {
                init: false,
                loop: true,
                paginationClickable: true,
                spaceBetween: settings['space'],
                navigation: {
                    nextEl: '.khbprev',
                    prevEl: '.khbnxt'
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    type: 'bullets',
                },
                breakpoints: {
                    1140: {
                        slidesPerView: settings['items'],
                    },
                    768: {
                        slidesPerView: settings['item_tab'],
                    },
                    1: {
                        slidesPerView: 1,
                    }, 
                },
            });
            if (settings['auto']) {
                swiper.params.autoplay.enabled = true;
                swiper.params.autoplay.delay = settings['speed'];
            }
            swiper.init();
        });

    };

    var Imgbx3 = function ($scope, $) {
        $scope.find('.imgbx3carou').each(function () {
            var slider_elem = $(this);
            var settings = slider_elem.data('xld');
            var options = {
                slidesPerView: settings['item'],
                paginationClickable: true,
                spaceBetween: settings['space'],
                navigation: {
                    nextEl: '.khbprev',
                    prevEl: '.khbnxt',
                },
                breakpoints: {
                    1025: {
                        slidesPerView: settings['item'],
                    },
                    768: {
                        slidesPerView: settings['item_tab'],
                    },
                    480: {
                        slidesPerView: 1,
                    },
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    type: 'bullets',
                },
                loop: true,
                autoplay: {
                    delay: settings['speed'],
                    disableOnInteraction: false,
                },
                mousewheel: settings['mouse'],
                on: {
                    init: function () {
                        if (settings['center']) {
                            slider_elem.find('.swiper-slide').addClass("centermode");
                        }
                    },
                },
            };

            if ('undefined' === typeof Swiper) {
                const asyncSwiper = elementorFrontend.utils.swiper;
                new asyncSwiper(slider_elem, options).then((newSwiperInstance) => {
                    var swiper = newSwiperInstance;
                });

            } else {
                var swiper = new Swiper(slider_elem, options);
            } 

        });
    };

    var TpBoxTab = function ($scope, $) {
        $scope.find('.tp-tab').each(function () {
            var tabArea = "ul.tab-area li",
                tabContent = '.tab-content';
            $(tabArea).add(tabContent).each(function () {
                $(this).siblings(':first-child').addClass('active');
            });
            $(tabArea).on('click', function () {
                $(this).each(function () {
                    var tabIndex = $(this).index();
                    $(this).siblings().removeClass('active');
                    $(this).parent('ul').next(".tab-wrap").find(tabContent).removeClass('active');
                    $(this).addClass('active');
                    $(this).parent('ul').next(".tab-wrap").find(tabContent).eq(tabIndex).addClass('active');
                })
            });
        });
    };

    var TestiVert = function ($scope, $) {
        $scope.find('.testi6-container').each(function () {
            var slider_elem = $(this);
            var settings = slider_elem.data('xld');
            const sliderThumbnails = slider_elem.find('.testi6wrap');
            const sliderConfiguration = {
                autoplay: settings['auto'],
                speed: 500,
                arrows: false,
                dots: false,
                autoplaySpeed: settings['speed'],
                slidesToShow: settings['item'],
                focusOnSelect: true,
                vertical: true,
                centerMode: settings['center'],
            }
            sliderThumbnails.not('.slick-initialized').slick(sliderConfiguration);
        });
    };

    var WidgetTestiCarou = function ($scope, $) {
        var slider_elem = $scope.find('.testi_4');
        var settings = slider_elem.data('xld');
        var main_slide = $scope.find('.slider-single-' + settings['id']);
        var nav_slide = $scope.find('.slider-nav-' + settings['id']);
        var prblm = $('.slider-nav-' + settings['id'] + ' ' + '.slick-slide');
        main_slide.not('.slick-initialized').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            fade: false,
            asNavFor: nav_slide,
            fade: true,
        });
        nav_slide.not('.slick-initialized').slick({
            slidesToShow: settings['items'],
            autoplay: settings['auto'],
            autoplaySpeed: settings['speed'],
            slidesToScroll: 1,
            asNavFor: main_slide,
            dots: false,
            arrows: false,
            centerMode: true,
            focusOnSelect: true,
            responsive: [{
                breakpoint: 768,
                settings: {}
            },]
        });
        prblm.removeClass('slick-active');
        prblm.eq(0).addClass('slick-active');
        main_slide.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            var mySlideNumber = nextSlide;
            prblm.removeClass('slick-active');
            prblm.eq(mySlideNumber).addClass('slick-active');
        });
    };

    var TpProVideoPop = function ($scope, $) {

        $scope.find('.tp-video-pop').each(function () {
            var slider_elem = $(this);
            var settings = slider_elem.data('xld');

            slider_elem.find('.tpvideopop').on('click', function (e) {

                e.preventDefault();
                $('body').addClass('poupactive');
                var this_form = $(this);
                var vidurl = this_form.data('vurl');
                var data = {
                    'action': 'tp_pro_show_video',
                    'vurl': vidurl,
                };

                $.ajax({
                    url: misha_loadmore_params.ajaxurl,
                    data: data,
                    type: 'POST',
                    success: function (result) {

                        this_form.find('.tp-form-btn button').removeClass('working');
                        $('.close').on('click', function () {
                            $('body').removeClass('poupactive');
                            slider_elem.find('.popwrap').empty();
                        });
                        slider_elem.find('.response .popwrap').html(result);

                        $('iframe').mediaWrapper({
                            intrinsic: false,
                            baseWidth: 16,
                            baseHeight: 9
                        });

                    },

                });

            });

        });
    };

    var TbDateCter2 = function ($scope, $) {
        $scope.find('.countdown2').each(function () {
            var settings = $(this).data('xld');
            if ($.fn.countdown) {
                $('.countdown2').countdown({
                    date: settings['date'],
                });
            }
        });
    };

    var TpSwiperSplitSync = function ($scope, $) {

        $scope.find('.tp-split-sync-vertical').each(function () {
            var settings = $(this).data('xld');
            var nxt = $(this).find('.swiper-button-next');
            var prv = $(this).find('.swiper-button-prev');

            var parent = $(this).find('.gallery-top');
            var child = $(this).find('.gallery-thumbs');

            parent.not('.slick-initialized').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: prv,
                nextArrow: nxt,
                autoplay: settings['auto'],
                autoplaySpeed: settings['speed'],                
                fade: true,
                asNavFor: child
            });
            child.not('.slick-initialized').slick({
                slidesToShow: settings['desktop'],
                slidesToScroll: 1,
                asNavFor: parent,
                dots: false,
                focusOnSelect: true
            });
        });
    };

    var TbTeam5 = function ($scope, $) {
        $scope.find('.tbteam5').each(function () {

            $('.tbteam5 .items').each(function () {
                $(this).on('mouseenter', function () {
                    $(this).find('.team-info').addClass('visible');
                    $(document).on('mousemove', function (e) {
                        $(this).find('.team-info').css({
                            left: e.clientX - 10,
                            top: e.clientY + 25
                        });
                    });
                }).on('mouseleave', function () {
                    $(this).find('.team-info').removeClass('visible');
                });
            })

        });
    };

    var TpSyncTextSlider = function ($scope, $) {
        $scope.find('.tp-sync-text').each(function () {
            var main = $(this).find('.slider-single');
            var child = $(this).find('.slider-nav');
            var dot = $(this).find('.slick-slider-dots');
            var settings = $(this).data('xld');
            main.not('.slick-initialized').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true, 
                asNavFor: child
              });
              child.not('.slick-initialized').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: main,
                dots: true,
                autoplay : settings['auto'],
                autoplaySpeed : settings['speed'],
                fade: true,
                appendDots: dot,
                arrows: false,
                focusOnSelect: true
              });

        });
    };

    var Testimonial_2 = function ($scope, $) {
        $scope.find('.tpswiper').each(function () {
            var settings = $(this).data('xld');
            var options = {
                slidesPerView: 1,
                pagination: {
                    el: $(this).find('.swiper-pagination'),
                    clickable: true,
                },
                autoplay: {
                    delay: settings['speed'],
                    enabled: settings['auto'],
                },
                spaceBetween: settings['space'],

                breakpoints: {
                    1140: {
                        slidesPerView: settings['item'],
                    },
                    768: {
                        slidesPerView: settings['itemtab'],
                    },
                    1: {
                        slidesPerView: 1,
                    },
                },
                loop: true,
                navigation: {
                    nextEl: $(this).find('.khbprev'),
                    prevEl: $(this).find('.khbnxt'),
                }
            };

            if ('undefined' === typeof Swiper) {
                const asyncSwiper = elementorFrontend.utils.swiper;
                new asyncSwiper($(this), options).then((newSwiperInstance) => {
                    var swiper = newSwiperInstance;
                    //var swiper = new asyncSwiper($(this), options);
                });
                console.log(swiper);
            } else {
                var swiper = new Swiper($(this), options);
            }  

        });
    };


    $(window).on('elementor/frontend/init', function () {

        var widgets = {
            'tpblogslide': Tp_Blog_Slider,
            'tpvbx_tab': TpBoxTab,
            'tptfbox': TpBoxTab,
            'tpp_tab_testim': TpBoxTab,
            'tb_imgbx3': Imgbx3,
            'tpp_testimonial_2': Testimonial_2,
            'tpprovideo': TpProVideoPop,
            'tbdttymr': TbDateCter2,
            'tb_team5': TbTeam5,
            'tp_testivert': TestiVert,
            'tb-testim4': WidgetTestiCarou,
            'tpsplitsyncslider': TpSwiperSplitSync,
            'tp_sync_slider': TpSyncTextSlider,
        };

        if (elementorFrontend.isEditMode()) {

            $.each(widgets, function (widget, callback) {
                elementorFrontend.hooks.addAction('frontend/element_ready/' + widget + '.default', callback);
            });
        } else {
 
            $.each(widgets, function (widget, callback) {
                elementorFrontend.hooks.addAction('frontend/element_ready/' + widget + '.default', callback);
            });
        }
    });
    
})(jQuery);
