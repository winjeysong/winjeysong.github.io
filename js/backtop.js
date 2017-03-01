$(document).ready(function() {

    // hide #back-top first
    $("#back-top").hide();
    $("#sideNav").hide();
    // on computer
    $(function() {
        $('#index-content').scroll(function() {
            if ($(this).scrollTop() > 500) {
                $('#sideNav').fadeIn();
                $('#sideNav').offset({top:20})
                $('#back-top').fadeIn();
            } else {
                $('#sideNav').fadeOut();
                $('#back-top').fadeOut();
            }
        });
        
        // scroll body to 0px on click
        $('#back-top a').click(function() {
            $('#index-content').animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    }); 


    //on mobile device
    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });
        
        // scroll body to 0px on click
        $('#back-top a').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    });

});
