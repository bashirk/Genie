(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '.main-nav',
    offset: 54
  });

  // Collapse the navbar when page is scrolled
  $(window).scroll(function() {
    if ($(".main-nav").offset().top > 100) {
      $(".main-nav").addClass("nav-shrink");
    } else {
      $(".main-nav").removeClass("nav-shrink");
    }
  });
 
  //below taken from http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
function getScrollXY() {
    var scrOfX = 0, scrOfY = 0;
    if( typeof( window.pageYOffset ) == 'number' ) {
        //Netscape compliant
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
    }
    return [ scrOfX, scrOfY ];
}

//taken from http://james.padolsey.com/javascript/get-document-height-cross-browser/
function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

document.addEventListener("scroll", function (event) {
    if (getDocHeight() == getScrollXY()[1] + window.innerHeight) {
      $(".main-nav").addClass("nav-bottom").removeClass("nav-shrink");
    } else {
      $(".main-nav").removeClass("nav-bottom");

    }
});

$('.switch-on').on('click', function(e) {
  $('body').toggleClass("meta");
  e.preventDefault();
});

$("#menu-open").click(function(){
    $(".nav-mobile").addClass("active");
});
$("#menu-close").click(function(){
    $(".nav-mobile").removeClass("active");
});

$('.nl-email').on("keyup", action);
function action() {
   if($('.nl-email').val().length > 0) {
      $('.nl-submit').prop("disabled", false);
   }else {
      $('.nl-submit').prop("disabled", true);
   }
}


$(".rub-lamp").click(function(){
  $(".lamp-hero").addClass("rubbed");
});


var initVal = "";
$(document).ready(function(){
    $(".nl-submit").attr("disabled", "true");
    $(".nl-email").blur(function(){
        if ($(this).val() != initVal && $(this).val() != "") {
            $(".nl-submit").removeAttr("disabled");
        } else {
            $(".nl-submit").attr("disabled", "true");        
        }
    });    
});


window.sr = ScrollReveal();
sr.reveal('#home-hero', { origin: "bottom" , distance: "12px" , duration: 1300 }, 500);


})(jQuery); // End of use strict


