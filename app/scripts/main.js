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
  tl.add(TweenMax.to(".profile",0.2,{"left":0, "opacity":1, ease:Back.easeOut}) );
  
  // images
  tl.add(TweenMax.to(".feed a",0.2,{"left":0, "opacity":1, ease:Back.easeOut}) );
  tl.add(TweenMax.to(".radio a",0.2,{"left":0, "opacity":1, ease:Back.easeOut}) );
  tl.add(TweenMax.to(".browse a",0.3,{"left":0, "opacity":1, ease:Back.easeOut}) );
  tl.add(TweenMax.to(".profile a",0.3,{"left":0, "opacity":1, ease:Back.easeOut}) );
  
  $(".menu-btn").on("click", showMenu);
  $(".radio").on("click", reverse);
  $(".menu>a").on("click", reverse);
  
});


function showMenu(e) {
  tl.play();
  
}

function reverse(e) {
  tl.reverse();
}
