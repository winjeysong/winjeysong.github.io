/*
 * Custom for side navition
 * winjeysong 20170227
 * reference code: https://github.com/twbs/bootstrap/blob/master/docs/assets/js/src/application.js#L35
 */


var BlogDirectory = {
   /* setSideNavAffixing: function() {

        // Scrollspy
       /* var $window = $(window)
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
        })*/

        // Sidenav affixing
        /*  setTimeout(function () {
              var $sideBar = $('index-content #sideNav')

              $sideBar.affix({
                  offset: {
                      top: $sideBar.offset().top,
                      bottom:$('footer').outerHeight(true)
                      /*function () {
                          var offsetTop      = $sideBar.offset().top
                          var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10)
                          var navOuterHeight = $('.intro-header').height()

                          return (this.top = offsetTop - navOuterHeight - sideBarMargin)
                      },
                      bottom: function () {
                          return (this.bottom = $('footer').outerHeight(true)/*+$('.paper').outerHeight(true)+$('.ds-recent-comments').outerHeight(true)+10)
                         // return (this.bottom = 0 - $('.bs-docs-container').outerHeight(true))    
                  }
                  }
              })
          }, 100)

          setTimeout(function () {
              $('.bs-top').affix()
          }, 100)
    }, */// end of setSideNavAffixing:function()


    /* Generate directory tree
     *
     * side_nav_element: side navigation element
     * article_body_element:  article body container.
     *
     * processing: search header elements(h3,h4,h5) in `article_body_element`,
     * generate directory tree list, and put them into side_nav_element.
     */
    createBlogDirectory: function(side_nav_element, article_body_element) {
            if (!article_body_element || article_body_element.length < 1 ||
                !side_nav_element) {
                return false;
            }

            var nodes = article_body_element.find("h3,h4,h5");
            var ulSideNav = side_nav_element;

            $.each(nodes, function() {
                    var $this = $(this);

                    var nodetext = $this.text();
                    // There maybe HTML tags in header inner text, use regexp to erase them
                    nodetext = nodetext.replace(/<\/?[^>]+>/g, "");
                    nodetext = nodetext.replace(/&nbsp;/ig, "");

                    // btw: Jekyll generates id for each header.
                    var nodeid = $this.attr("id");
                    if (!nodeid) {
                        nodeid = "top";
                    }

                    var item_a = $("<a></a>");
                    item_a.attr("href", "#" + nodeid);
                    item_a.text(nodetext);

                    var ret_li;
                    // wrapper: ul ( in the template, outside this code )
                    // h1: layer 1: li - a
                    // h3: layer 2: ul - li - a
                    // h4: layer 3: ul - ul - li - a
                    switch ($this.get(0).tagName) {
                        case "H3":
                            var li_a = $("<li></li>").append(item_a);
                            ret_li = li_a;
                            break;
                        case "H4":
                            var li_a = $("<li></li>").append(item_a);
                            var nav_li_a = $("<ul class=\"nav\"></ul>").append(li_a);
                            ret_li = nav_li_a;
                            break;
                        case "H5":
                            var li_a = $("<li></li>").append(item_a);
                            var nav_li_a = $("<ul class=\"nav\"></ul>").append(li_a);
                            var nav_nav_li_a = $("<ul class=\"nav\"></ul>").append(nav_li_a);
                            ret_li = nav_nav_li_a;
                            break;
                    }

                    if (!ret_li) {
                        // do nothing
                    } else {
                        ulSideNav.append(ret_li);
                    }
                }) // end of each

        } //end of createBlogDirectory:function()

};


jQuery(function($) {
    $(document).ready(function() {
        /* qrcode
        var opt = { text : window.location.href, width:150, height:150 };
        try {
            document.createElement("canvas").getContext("2d");
        } catch (e) {
            $.extend(opt,{ render : "table" });
        }

        $('.qrcode').html('').qrcode(opt);
    */

        // Generate the side navigation `ul` elements
        BlogDirectory.createBlogDirectory($("#sideNav"), $(".bs-docs-container"));

        // caculate affixing
       // BlogDirectory.setSideNavAffixing();
    });
});