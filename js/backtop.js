/*
 * Custom for side navition & backtop button
 * winjeysong 20170227
 */

$(document).ready(function() {
    
    // hide #back-top & #sideNav first
    $("#back-top").hide();
    $("#sideNav").hide();

    // on desktop
    // control the show or hide position of #sideNav & #back-top
    $(function() {
        $('#index-content').scroll(function() {
            if ($(this).scrollTop() > $('intro-header').outerHeight(true)+36+20+20 && $(this).scrollTop() < ($('.intro-header').outerHeight(true)+$('.post-container').outerHeight(true)+20+36-$('#sideNav').height())) {
                $('#sideNav').fadeIn();
                $('#sideNav').offset({top:20})
                $('#back-top').fadeIn();
            } 
            else if($(this).scrollTop() < $('intro-header').outerHeight(true)+36+20+20){
                $('#sideNav').offset({top:-$('#sideNav').height()}).fadeOut();
                $('#back-top').fadeOut();
            }
            else{
                $('#sideNav').offset({top:-$('#sideNav').height()+$('#sideNav>ul').outerHeight(true)*6});
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
            if ($(this).scrollTop() > $('intro-header').outerHeight(true)+36+20+20) {
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
