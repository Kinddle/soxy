(function ($) {

  $.jvcart = function (options) {
    // Return the instance
    return $('body').jvcart(options);
  };

  $.fn.jvcart = function (options) {
  
    settings = $.extend({
      // Default settings
      mainContent: $('.page'),
      theMenu: $('.m-cart--dropdown-box'),
      slideSpeed: 0.3,
      cartMenuWidth: 280,
      mobileCartMenuWidth: 280,
      position: 'right',
      push: true
    }, options );
    
    
    // Insert hamburger button
    $('.m-cart--dropdown-box').prepend('<div class="hamburger-cart"><div class="hamburger-cart-inner"><div class="bar bar1 hide"></div><div class="bar bar2 cross"></div><div class="bar bar3 cross hidden"></div><div class="bar bar4 hide"></div></div></div>');
    
    
    // Menu settings
    settings.theMenu.css({
      width: settings.cartMenuWidth, 
      position: 'fixed',
      top: 0,
      display: 'none',
      height: '100%'
    }).addClass('hamburger-cart').wrapInner('<div class="mobile-menu-inner"></div>');
    
    $('.mobile-menu-inner').css({
      width: 'auto', 
      display: 'block'
    });
    
    
    // Fix height
    function mainContentHeightFix() {
      settings.mainContent.css({
        minHeight: $(window).height()
      });
    }
    mainContentHeightFix();
    
    
    // Hamburger & Mobile Menu vars
    var hamburger = $('.hamburger-cart'),
    hamburgerMarginLeft = parseInt(hamburger.css('margin-left')),
    hamburgerLeftPushPosition = hamburger.outerWidth(true) - hamburgerMarginLeft,
    crosses = $('.bar2,.bar3'),
    crossLeft = $('.bar2'),
    crossRight = $('.bar3');
    
    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
    
    // Mobile menu & hamburger position left or right
    if(isMobile) {
        theMarginLeft = -settings.mobileCartMenuWidth;
    } else {
        theMarginLeft = -settings.cartMenuWidth;
    }
    settings.theMenu.add(hamburger)
    .css({
        left: 'auto', 
        right: 0
    });
  
  
    // menuClose function
    function menuClose() {
      // Hamburger
      hamburger.removeClass('open');
      
      //Cross
      TweenMax.to(crosses, settings.slideSpeed / 2, {rotation:0, ease:Power3.easeOut});
      
      // Move content back to hide menu
      TweenMax.to(settings.mainContent, settings.slideSpeed, {marginLeft: 0});
      
      
      // Hide content (safari bounce fix)
      setTimeout( function(){ 
        settings.theMenu.css({display: 'none'}); 
      }, 200);
      
      // Disable scrolling plus fix menu-scrolling
      // From http://stackoverflow.com/a/14244680
      settings.theMenu.css({
        'overflow-y': 'hidden',
        '-webkit-overflow-scrolling': 'inherit',
        'overflow-scrolling': 'inherit'
      });
      $(document).off('touchmove');
      $('body').css({overflow: 'inherit'});

      setTimeout( function() {
        $('.m-navigation--list').show();
      }, 200);
      
    }
    
  
    // menuOpen function
    function menuOpen() {
      $('.m-navigation--list').hide();

      // Hamburger
      hamburger.addClass('open');
      
      // Cross
      TweenMax.to(crossLeft, settings.slideSpeed / 2, {rotation:45, ease:Power3.easeOut});
      TweenMax.to(crossRight, settings.slideSpeed / 2, {rotation:-45, ease:Power3.easeOut});
      
      // Move content to show menu
      TweenMax.to(settings.mainContent, settings.slideSpeed, {marginLeft: theMarginLeft});
      
      
      // Show content (safari bounce fix)
      settings.theMenu.css({display: 'block'});
      
      // Disable scrolling on page except header
      // From http://stackoverflow.com/a/14244680
      var setScrollable = '.m-cart--dropdown-list',
      bodySelect = $('body');

      bodySelect.css({overflow: 'hidden'});
  
      $(document).on('touchmove',function(e){
        e.preventDefault();
      });
      bodySelect.on('touchstart', setScrollable, function(e) {
      if (e.currentTarget.scrollTop === 0) {
        e.currentTarget.scrollTop = 1;
      } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
        e.currentTarget.scrollTop -= 1;
      }
      });
      bodySelect.on('touchmove', setScrollable, function(e) {
        e.stopPropagation();
      });
      settings.theMenu.css({
        'overflow-y': 'scroll',
        'overflow-scrolling': 'touch',
        '-webkit-overflow-scrolling': 'touch'
      });
    }
  
  
    // Stuff on Window-resize
    $(window).resize(function() {
      menuClose();
      mainContentHeightFix();
    });
    
  
    // Hamburger click
    $('.m-cart--dropdown').on('click', function(e) {
      if ($('.hamburger-cart').hasClass('open')) {
        menuClose();
      } else {
        menuOpen();
      }
        e.stopPropagation();
        return false;
    });

    $('.hamburger-cart').on('click', function(e) {
      if ($('.hamburger-cart').hasClass('open')) {
        menuClose();
      } else {
        menuOpen();
      }
        e.stopPropagation();
        return false;
    });
  
  
    // Close main-menu on click outside menu
    settings.mainContent.on('click', function() {
      if (hamburger.hasClass('open')) {
        menuClose();
      }
    });
  
  };
  
})(jQuery);
