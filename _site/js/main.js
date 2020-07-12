function heightAdj() {
  if ($(window).width() < 1200) {
    $.each( $('.image-left'), function( key, value ) {
      var ht = $(this).children('.text-area').height();
      var name = $(this).find('.tilt-heading').height();
      var tiltHeight = $(this).find('.tilt-heading').height();
      var tiltWidth = $(this).find('.tilt-heading').width();
      $(this).find('.tilt-heading').css('right',-(tiltWidth/2)+'px');
      $(this).find('.tilt-heading').css('top','calc(50% - '+ name/2 +'px)');
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
      var name = $(this).find('.tilt-heading').height();
      var tiltHeight = $(this).find('.tilt-heading').height();
      var tiltWidth = $(this).find('.tilt-heading').width();
      $(this).find('.tilt-heading').css('left',-(tiltWidth/2)+'px');
      $(this).find('.tilt-heading').css('top','calc(50% - '+ name/2 +'px)');
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
        var tiltHeight = $(this).find('.tilt-heading').height();
        var tiltWidth = $(this).find('.tilt-heading').width();
        $(this).find('.tilt-heading').css('right',-(tiltWidth/2)+'px');
        $(this).find('.tilt-heading').css('top',tiltWidth/2+'px');
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
        var tiltHeight = $(this).find('.tilt-heading').height();
        var tiltWidth = $(this).find('.tilt-heading').width();
        $(this).find('.tilt-heading').css('left',-(tiltWidth/2)+'px');
        $(this).find('.tilt-heading').css('top',tiltWidth/2+'px');
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

  if ($(window).width() < 1440 && $(window).width() > 1199) {
    $.each( $('.image-two-right'), function( key, value ) {
      var ht = $(this).find('.text-area img').height();
      var hti = $(this).find('.image-area').height();
      if ($(this).hasClass('toggle-image')) {
        $(this).find('.container-fluid').append( $(this).find('.container-fluid').children().first() );
        $(this).find('.container-fluid').children().removeClass('left-img');
        $(this).find('.container-fluid').children().removeClass('right-img');
        $(this).removeClass('toggle-image');
      }
      if (ht < 100) {
        ht = (46.6*$(window).width())/100;
      }var a = $('.image-two-right').find('.text-area').width();
      var b = $('.image-two-right').find('.text-area img').width();
      if ($(this).hasClass('text-wrapper')) {
        $(this).find('.tilt-heading').css('right',(((a-b)/2)-84+30-10)+'px');
      } else {
        $(this).find('.tilt-heading').css('left',(((a-b)/2)-84+30-10)+'px');
      }
      $(this).find('.image-area').css('margin-bottom',(ht-hti)/2+'px');
      $(this).css('height',ht+'px');
      $(this).css('margin-top','-'+(ht/2)+'px');
    });
  } else {
    if ($(window).width() < 1200) {
      $.each( $('.image-two-right'), function( key, value ) {
        var ht = $(this).find('.container-fluid').height();
        var hti = $(this).find('.image-area img').height();
        if ($(this).find('.container-fluid').children().first().hasClass('image-area')) {
          $(this).find('.container-fluid').append( $(this).find('.container-fluid').children().first() );
          $(this).find('.container-fluid').children().first().addClass('left-img');
          $(this).find('.container-fluid').children().last().addClass('right-img');
          $(this).addClass('toggle-image');
        }
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
        if ($(this).hasClass('toggle-image')) {
          $(this).find('.container-fluid').append( $(this).find('.container-fluid').children().first() );
          $(this).find('.container-fluid').children().removeClass('left-img');
          $(this).find('.container-fluid').children().removeClass('right-img');
          $(this).removeClass('toggle-image');
        }
        $(this).css('height','960px');
        $(this).css('margin-top','-480px');
        if ($(this).hasClass('text-wrapper')) {
          $(this).find('.tilt-heading').css('right','-28px');
        } else {
          $(this).find('.tilt-heading').css('left','-28px');
        }
      });
    }
  }

  $.each( $('.color-spacer'), function( key, value ) {
    var hTop = $(this).prev().outerHeight();
    var hTopMargin = parseInt($(this).prev().css('margin-top').replace('px',''));
    var hBotMargin = parseInt($(this).next().css('margin-top').replace('px',''));
    var bottomPadding = 150;
    var defaultx = 0;
    if (hTopMargin == 0) {
      hTopMargin = -(hTop/2);
    }
    if (hBotMargin == 0) {
      hBotMargin = -($(this).next().outerHeight()/2);
    }
    if ($(this).prev().hasClass('first-div')) {
      hTopMargin = -((hTop/2)+hTopMargin/2);
    }
    if ($(this).prev().hasClass('over')) {
      $(this).addClass('mobile-height-fixer');
    }
    if ($(this).next().hasClass('page-footer')) {
      bottomPadding = 100;
    }
    if ($(this).hasClass('more-padding')) {
      if ($(window).width() < 1200) {
        bottomPadding = 400
      }
    }
    if ($(this).hasClass('default')) {
        defaultx = hBotMargin-hTopMargin;
    }
    if ($(this).next().hasClass('image-two-right')) {
      if ($(window).width() > 1199) {
        //bottomPadding = 300;
      } else {
        //bottomPadding = 200;
      }
    }
    var hBottom = $(this).next().outerHeight();
    var hSmall = (hTop > hBottom) ? hBottom : hTop;
    var hLarge = (hTop > hBottom) ? hTop : hBottom;
    $(this).css('height',(hTop+hTopMargin-hBotMargin+bottomPadding+defaultx)+'px');
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
    $('[data-url]').css('cursor', 'pointer');
    $( "[data-url]" ).click(function() {
      window.location.href = $(this).data('url');
    });
    $(".button-white.text-midnightblue").click(function() {
      $(this).parent().css('display','none');
      $('.more').removeClass('more');
      heightAdj();
    });
    var myVar = setInterval(heightAdj, 200);

    setTimeout(function(){
      clearInterval(myVar);
    }, 3000);
});

$( window ).resize(function() {
    heightAdj();
});
