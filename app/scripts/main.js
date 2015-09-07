var tl;
$(document).ready(function() {
    // Dropdown Cart counter
    // This button will increment the value
    $('.qtyplus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });
    // This button will decrement the value till 0
    $(".qtyminus").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });
});


$stick = $('.m-cart--order-box');
$stickbutton = $('.m-cart--order-box .m-button');
$foot = $('footer');
$footheight = $('footer').height();
margin = 20;
offtop = $stick.offset().top - (margin*2);
offbtm = $foot.offset().top - ( 650 + $stick.height() );

$(window).scroll(function () {
    scrtop = $(window).scrollTop();
    if (scrtop > offtop && $stick.hasClass('is-natural')) {
        $stick.removeClass('is-natural').addClass('is-fixed').css('top', margin);
        $('.m-cart--dropdown-box').removeClass('is-active');
    }
    if (offtop > scrtop && $stick.hasClass('is-fixed')) {
        $stick.removeClass('is-fixed').addClass('is-natural').css('top', '40px');
    }
    if (scrtop > (offbtm+120) && $stick.hasClass('is-fixed')) {
        $stick.removeClass('is-fixed').addClass('is-bottom').css('top', offbtm+margin);
        $stickbutton.text('Buy Now');
    }
    if ((offbtm+170) > scrtop && $stick.hasClass('is-bottom')) {
        $stick.removeClass('is-bottom').addClass('is-fixed').css('top', margin);
        $stickbutton.text('Continue Checkout');
    }
});

TweenLite.defaultEase = Power3.easeInOut;

//responsive timeline animation.
//values recorded once, nothing changes on resize
var display = true;
if($(window).width() <= 480) {
    var tl = new TimelineMax({ yoyo:true, repeatDelay:1});
    $('.menu-btn').on('click', function () {
        if ( display === true) {
            tl.to(".slide", 1, {'xPercent':90, force3D:true});
            display = false;
        } else if ( display === false) {
            tl.to(".slide", 1, {'xPercent':0, force3D:true});
            display = true;
        }
    });
    // // $('[class!=".slide"]').on('click', function () {
    // //     if ( display === false) {
    // //         tl.to(".slide", 1, {'xPercent':0, force3D:true});
    // //         display = true;
    // //     }
    // // });
    // $('.page').on('click', function () {
    //     console.log('page clicked');
    //     if ( display === true) {
    //         tl.to(".slide", 1, {'xPercent':0, force3D:true});
    //         display = false;
    //     }
    // });
    // $('.slide').on('click', function () {
    //     console.log('slide clicked');
    // });
}

