var tl;
$(document).ready(function() {
    //create a TimelineLite instance
    tl = new TimelineLite({
        'paused':true,
        align: 'sequence',
        'smoothChildTiming':true
    });
    tl.add(TweenMax.to(".menu-btn",0.2,{"autoAlpha":0}));
    tl.add(TweenMax.to(".screen", 0.1,{"autoAlpha":0.9}));
    // colors
    tl.add(TweenMax.to(".feed",0.2,{"left":0, "opacity":1, ease:Back.easeOut}) );
    tl.add(TweenMax.to(".radio",0.2,{ "left":0, "opacity":1, ease:Back.easeOut}) );
    tl.add(TweenMax.to(".browse",0.2,{"left":0, "opacity":1, ease:Back.easeOut}) );
    // images
    tl.add(TweenMax.to(".feed a",0.2,{"left":0, "opacity":1, ease:Back.easeOut}) );
    tl.add(TweenMax.to(".radio a",0.2,{"left":0, "opacity":1, ease:Back.easeOut}) );
    tl.add(TweenMax.to(".browse a",0.3,{"left":0, "opacity":1, ease:Back.easeOut}) );
    $(".menu-btn").on("click", showMenu);
    $(".radio").on("click", reverse);
    $(".menu>a").on("click", reverse);

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


function showMenu(e) {
    tl.play();
}

function reverse(e) {
    tl.reverse();
}

$stick = $('.m-cart--order-box');
$stickbutton = $('.m-cart--order-box .m-button');
$foot = $('footer');
$footheight = $('footer').height();
margin = 20;
offtop = $stick.offset().top - (margin*2);
offbtm = $foot.offset().top - ( $footheight + $stick.height() );

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
