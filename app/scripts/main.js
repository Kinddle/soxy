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
