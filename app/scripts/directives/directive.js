(function(){
    
    angular.module('myApp')
    .directive('onResize', ['$window', function ($window) {
        return {
            scope: {
                // control: '='
            },
            bindToController: {
                control: '='
            },
            link: function (scope, el, attrs) {
                var initialWidth = $window.innerWidth,
                    smallClass   = attrs.resizeClass || 'is-mobile',
                    smallAttr    = attrs.resizeAttr  || 'on-resize',
                    smallWidth   = attrs.resizeWidth || 768;
    
                var setSmall = function () {
                    el.addClass(smallClass);
                    el.attr(smallAttr, smallAttr);
                };
    
                var setLarge = function () {
                    el.removeClass(smallClass);
                    el.removeAttr(smallAttr);
                };
    
                if (initialWidth < smallWidth) {
                    setSmall();
                } else {
                    setLarge();
                }

                angular.element($window).on('resize', function () {
                    if ($window.innerWidth <= smallWidth) {
                        setSmall();
                    } else {
                        setLarge();
                        el.removeClass('ng-hide');
                    }
                });
            },
        };
    }])
    .directive('onScroll', ['$window', function setClassWhenAtTop($window) {
    var $win = angular.element($window);

        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var topClass = attrs.setClassWhenAtTop,
                    topPadding = parseInt(attrs.paddingWhenAtTop, 10),
                    parent = element.parent().parent().parent().parent().parent(),
                    offsetTop;
                    console.log(parent);

                $win.on("scroll", function () {
                    // dynamic page layout so have to recalculate every time;
                    // take offset of parent because after the element gets fixed
                    // it now has a different offset from the top
                    offsetTop = topPadding - parent.offset().top;
                    console.log(offsetTop);
                    console.log(topPadding);
                    if ($win.scrollTop() >= offsetTop) {
                        element.addClass(topClass);
                        parent.height(element.height());
                    } else {
                        element.removeClass(topClass);
                        parent.css("height", null);
                    }
                });
            }
        };
    }]);

})();
