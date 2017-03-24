/*
 * Custom for side navition & backtop button
 * winjeysong 20170227
 */

$(document).ready(function() {
    //scrollspy
    var $window = $(window)
    var $body = $('#index-content')

        $body.scrollspy({
            target: '.bs-docs-sidebar'
        })
        $window.on('load', function() {
            $body.scrollspy('refresh')
        })

        // Kill links
        $('.bs-docs-container [href=#]').click(function(e) {
            e.preventDefault()
        })

    // hide #back-top & #sideNav first
    $("#back-top").hide();
    $("#sideNav").hide();
    $('#sideNav').offset({ top: 0 });
    // on desktop
    // control the show or hide position of #sideNav & #back-top
    $(function() {
        $('#index-content').scroll(function() {
            if ($(this).scrollTop() > $('.intro-header').outerHeight(true) + 36 + 20 + 20 && $(this).scrollTop() < ($('.intro-header').outerHeight(true) + $('.post-container').outerHeight(true) + 20 + 36 - $('#sideNav').height())) {
                $('#sideNav').fadeIn();
                $('#sideNav').offset({ top: 20 })
                $('#back-top').fadeIn();
            } else if ($(this).scrollTop() < $('.intro-header').outerHeight(true) + 36 + 20 + 20) {
                $('#sideNav').offset({ top: -$('#sideNav').height() }).fadeOut();
                $('#back-top').fadeOut();
            } else {
                $('#sideNav').offset({ top: -$('#sideNav').height() + $('#sideNav>ul>li a').outerHeight() * 6 });
            }
        });

        // scroll to top when click the button
        $('#back-top a').click(function() {
            $('#index-content').animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    });


    // on mobile device
    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > $('.intro-header').outerHeight(true) + 36 + 20 + 20) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });

        // scroll to top when click the button
        $('#back-top a').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    });

});