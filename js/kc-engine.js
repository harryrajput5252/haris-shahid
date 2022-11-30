jQuery(function ($) {

    $(document).on('click', '.ash_loadmore:not(.disabled)', function (event) {

        var me = $(this);
        wa_load_posts(me);

    });

    function wa_load_posts(me) {

        var button = me.parent().parent();
        var cat = button.find('.current').data('id');
        var options = button.data('options');
        var container = me.parent().prev();
        var dir = me.data('dir');

        var ajmx = button.find('.xyz').data('max');
        var disabled = me;

        if (dir === 'more') {
            container.addClass("loading_bg");
        } else {
            container.append('<div class="load-wrap"><div class="loader"></div></div>');
        }
        if (ajmx) {
            var max_paged = button.find('.xyz').data('max');
        } else {
            var max_paged = button.data('max');
        }

        data = {
            'action': 'loadmore',
            'page': misha_loadmore_params.current_page,
            'options': options,
            'cat': cat,
            'dir': dir,
        };

        $.ajax({
            url: misha_loadmore_params.ajaxurl,
            data: data,
            type: 'POST',
            success: function (data) {

                if (data) {
                    if (dir === 'more') {
                        container.append(data);
                        container.removeClass("loading_bg");
                        $('html, body').animate({
                            scrollTop: button.offset().top + container.outerHeight(),
                        }, 'slow');

                    } else {
                        container.html(data);
                        $('html, body').animate({
                            scrollTop: button.offset().top - 20
                        }, 'slow');

                    }

                    container.masonry({
                        itemSelector: '.folio-item',
                        isAnimated: false,
                        transitionDuration: 0
                    });

                    container.masonry('reloadItems');
                    container.masonry('layout');

                    container.imagesLoaded(function () {
                        container.masonry('layout');
                    });

                    if (dir === 'nxt' || dir === 'more') {
                        misha_loadmore_params.current_page++;
                    }

                    if (dir === 'prev') {
                        misha_loadmore_params.current_page--;
                    }

                    button.attr('data-cpag', misha_loadmore_params.current_page);

                    if (misha_loadmore_params.current_page <= 1) {
                        disabled.addClass('disabled');
                    } else {
                        disabled.prev().removeClass('disabled');
                    }

                    if (misha_loadmore_params.current_page == max_paged) {
                        disabled.addClass('disabled');
                    } else {
                        disabled.next().removeClass('disabled');
                    }

                }
            },

        });

    }


    $(document).on('click', '.cat_tab:not(.current)', function (event) {
        var me = $(this);
        $(this).addClass("current").siblings().removeClass("current");
        wa_tab_cat(me);
    });

    function wa_tab_cat(me) {
        var cat_id = me.data('id');
        var container = me.parent().next();
        var rooty = me.parent().parent();
        var options = rooty.data('options');
        container.append('<div class="load-wrap"><div class="loader"></div></div>');
        rooty.attr('data-catid', cat_id);
        data = {
            'action': 'tabcat',
            'catid': cat_id,
            'page': '1',
            'options': options,
        };
        $.ajax({
            url: misha_loadmore_params.ajaxurl,
            data: data,
            type: 'POST',
            success: function (data) {
                container.removeClass('loader');
                if (data) {
                    container.html(data);
                    var max = container.find('.xyz').data('max');
                    rooty.attr('data-max', max);
                    misha_loadmore_params.current_page = '1';

                    $('html, body').animate({
                        scrollTop: container.offset().top - 20
                    }, 'slow');

                    if ('1' == max) {
                        rooty.find('.ash_loadmore').addClass('disabled');
                    } else {
                        rooty.find('.ash_loadmore').removeClass('disabled');
                    }

                    container.masonry({
                        itemSelector: '.folio-item',
                        isAnimated: false,
                        transitionDuration: 0
                    });

                    container.masonry('reloadItems');
                    container.masonry('layout');

                    container.imagesLoaded(function () {
                        container.masonry('layout');
                    });

                }
            },

        });

    }

    $('.tbfilterfolio').find('.post-container').masonry({
        itemSelector: '.folio-item',
        isAnimated: false,
        transitionDuration: 0
    });

});