function heightAdj() {
  if ($(window).width() < 768) {
    $.each( $('.image-left'), function( key, value ) {
      var ht = $(this).children('.text-area').height();
      if (ht < 100) {
        ht = (46.6*$(window).width())/100;
      }
      $(this).css('height',ht+'px');
      if ($(this).hasClass('first-div')) {
        $(this).css('margin-top','-8%');
      } else {
        $(this).css('margin-top','-'+(ht/2)+'px');
      }
    });
    $.each( $('.image-right'), function( key, value ) {
      var ht = $(this).children('.text-area').height();
      if (ht < 100) {
        ht = (46.6*$(window).width())/100;
      }
      $(this).css('height',ht+'px');
      if ($(this).hasClass('first-div')) {
        $(this).css('margin-top','-8%');
      } else {
        $(this).css('margin-top','-'+(ht/2)+'px');
      }
    });
  } else {
      $.each( $('.image-left'), function( key, value ) {
        var ht = $(this).children('.text-area').height();
        if (ht < 100) {
          ht = (46.6*$(window).width())/100;
        }
        $(this).css('height',ht+'px');
        if ($(this).hasClass('first-div')) {
          $(this).css('margin-top','-80px');
        } else {
          $(this).css('margin-top','-'+(ht/2)+'px');
        }
      });
      $.each( $('.image-right'), function( key, value ) {
        var ht = $(this).children('.text-area').height();
        if (ht < 100) {
          ht = (46.6*$(window).width())/100;
        }
        $(this).css('height',ht+'px');
        if ($(this).hasClass('first-div')) {
          $(this).css('margin-top','-80px');
        } else {
          $(this).css('margin-top','-'+(ht/2)+'px');
        }
      });
  }

  if ($(window).width() < 1440 && $(window).width() > 767) {
    $.each( $('.image-two-right'), function( key, value ) {
      var ht = $(this).find('.text-area img').height();
      var hti = $(this).find('.image-area').height();
      if (ht < 100) {
        ht = (46.6*$(window).width())/100;
      }var a = $('.image-two-right').find('.text-area').width();
      var b = $('.image-two-right').find('.text-area img').width();
      if ($(this).hasClass('text-wrapper')) {
        $(this).find('.tilt-heading').css('right',(((a-b)/2)-75+30-10)+'px');
      } else {
        $(this).find('.tilt-heading').css('left',(((a-b)/2)-75+30-10)+'px');
      }
      $(this).find('.image-area').css('margin-bottom',(ht-hti)/2+'px');
      $(this).css('height',ht+'px');
      $(this).css('margin-top','-'+(ht/2)+'px');
    });
  } else {
    if ($(window).width() < 768) {
      $.each( $('.image-two-right'), function( key, value ) {
        var ht = $(this).find('.container-fluid').height();
        var hti = $(this).find('.image-area img').height();
        var firstImage = $(this).find('img').first().height();
        if (ht < 100) {
          ht = (46.6*$(window).width())/100;
        }
        var a = $('.image-two-right').find('.text-area').width();
        var b = $('.image-two-right').find('.text-area img').width();
        if ($(this).hasClass('text-wrapper')) {
          $(this).find('.tilt-heading').css('right',(((a-b)/2)-60+30-14)+'px');
        } else {
          $(this).find('.tilt-heading').css('left',(((a-b)/2)-60+30-14)+'px');
        }
        $(firstImage).css('margin-bottom',(firstImage)/2+'px');
        $(this).css('height',ht+'px');
        $(this).css('margin-top','-'+(firstImage/2)+'px');
      });
    } else {
      $.each( $('.image-two-right'), function( key, value ) {
        $(this).css('height','800px');
        $(this).css('margin-top','-400px');
        if ($(this).hasClass('text-wrapper')) {
          $(this).find('.tilt-heading').css('right','32px');
        } else {
          $(this).find('.tilt-heading').css('left','32px');
        }
      });
    }
  }

  $.each( $('.color-spacer'), function( key, value ) {
    var hTop = $(this).prev().outerHeight();
    var hTopMargin = parseInt($(this).prev().css('margin-top').replace('px',''));
    var bottomPadding = 150;
    if (hTopMargin == 0) {
      hTopMargin = -(hTop/2);
    }
    if ($(this).prev().hasClass('first-div')) {
      hTopMargin = -((hTop/2)+hTopMargin/2);
    }
    if ($(this).prev().hasClass('over')) {
      $(this).addClass('mobile-height-fixer');
    }
    if ($(this).next().hasClass('page-footer')) {
      var bottomPadding = 0;
    }
    var hBottom = $(this).next().outerHeight();
    var hSmall = (hTop > hBottom) ? hBottom : hTop;
    var hLarge = (hTop > hBottom) ? hTop : hBottom;
    $(this).css('height',(hTop+(bottomPadding))+'px');
    $(this).css('margin-top','-'+(hTop+hTopMargin)+'px');
  });
}

$( document ).ready(function() {
    $(".text-area img").one("load", function() {
      heightAdj();
    }).each(function() {
      if(this.complete) {
          //heightAdj();
      }
    });
});

$( window ).resize(function() {
    heightAdj();
});
