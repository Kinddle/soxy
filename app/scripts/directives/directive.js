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
                    smallAttr    = attrs.resizeAttr  || 'ng-init',
                    smallAttrValue = attrs.resizeAttr || 'tab=2',
                    smallWidth   = attrs.resizeWidth || 768,

                    largeAttr    = attrs.resizeAttr  || 'ng-init',
                    largeAttrValue = attrs.resizeAttr || 'tab=true';
    
                var setSmall = function () {
                    el.addClass(smallClass);
                    el.attr(smallAttr, smallAttrValue);
                };
    
                var setLarge = function () {
                    el.removeClass(smallClass);
                    // el.removeAttr(smallAttr);
                    el.attr(largeAttr, largeAttrValue);
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
    .directive('showWithDelay', function($timeout){
        return {
            restrict: 'A',
            link: function($scope, $element, attrs){
                $element.addClass("ng-hide");
                $timeout(function() {
                    $element.removeClass("ng-hide");
                },attrs.showWithDelay);
            }
        };
    })
    .directive('ngFtscroller', function () {
        return {
            replace: false,
            restrict: 'A',
            // scope: {show:'@', noSecond: '='},
            link: function (scope, element, attr)
            {

                var ngScrollerOptions = {
                    scrollbars: false,
                    scrollingX: false,
                    bouncing: false
                };

                // ng-ftscroller-always-scroll
                if (attr.ngFtscrollerAlwaysScroll !== undefined && attr.ngFtscrollerAlwaysScroll == 'true') {
                    ngScrollerOptions.alwaysScroll = true;
                }

                // ng-ftscroller-base-alignments
                // instead of using an object use x,y
                // example:
                // ng-ftscroller-base-alignments="-1,10"
                if (attr.ngFtscrollerBaseAlignments !== undefined) {
                    if (attr.ngFtscrollerBaseAlignments.indexOf(',') > 0) {
                        var c = attr.ngFtscrollerBaseAlignments.split(',');
                        ngScrollerOptions.baseAlignments = {
                            x: parseInt(c[0], 10),
                            y: parseInt(c[1], 10)
                        };
                    } else {
                        console.error('Invalid configuration for `ng-ftscroller-base-alignments`, it must be like x,y (example: -5,10)');
                    }
                }

                // ng-ftscroller-bouncing
                if (attr.ngFtscrollerBouncing !== undefined && attr.ngFtscrollerBouncing == 'true') {
                    ngScrollerOptions.bouncing = true;
                }

                // ng-ftscroller-content-width
                if (attr.ngFtscrollerContentWidth !== undefined) {
                    ngScrollerOptions.contentWidth = attr.ngFtscrollerContentWidth;
                }
                // ng-ftscroller-content-height
                if (attr.ngFtscrollerContentHeight !== undefined) {
                    ngScrollerOptions.contentHeight = attr.ngFtscrollerContentHeight;
                }


                // default timeout
                var ngiScroll_timeout = 5;
                // default options
                var ngiScroll_opts = {
                    snap: true,
                    momentum: true,
                    hScrollbar: false
                };

                // scroll key /id
                var scroll_key = attr.ngIscroll;

                if (scroll_key === '') {
                    scroll_key = attr.id;
                }

                if (scope.$parent.myScrollOptions) {
                    for (var i in scope.$parent.myScrollOptions) {
                        if (i === scroll_key) {
                            for (var k in scope.$parent.myScrollOptions[i]) {
                                ngiScroll_opts[k] = scope.$parent.myScrollOptions[i][k];
                            }
                        } else {
                            ngiScroll_opts[i] = scope.$root.myScrollOptions[i];
                        }
                    }
                }

                // initialize function
                function setScroll()
                {
                    if (scope.$parent.myScroll === undefined) {
                        scope.$parent.myScroll = [];
                    }

                    scope.$parent.myScroll[scroll_key] = new FTScroller(element[0], ngiScroll_opts);
                }

                // new specific setting for setting timeout using: ng-iscroll-timeout='{val}'
                if (attr.ngIscrollDelay !== undefined) {
                    ngiScroll_timeout = attr.ngIscrollDelay;
                }

                // watch for 'ng-iscroll' directive in html code
                scope.$watch(attr.ngIscroll, function ()
                {
                    setTimeout(setScroll, ngiScroll_timeout);
                });
            }
        };
    });
    // .directive('onScroll', ['$window', function setClassWhenAtTop($window) {
    // var $win = angular.element($window);
    //
    //     return {
    //         restrict: "A",
    //         link: function (scope, element, attrs) {
    //             var topClass = attrs.setClassWhenAtTop,
    //                 topPadding = parseInt(attrs.paddingWhenAtTop, 10),
    //                 bottomPadding = parseInt(attrs.paddingWhenAtBottom, 10),
    //                 parent = element.parent().parent().parent().parent().parent(),
    //                 offsetTop,
    //                 offsetBottom;
    //
    //             $win.on("scroll", function () {
    //                 // dynamic page layout so have to recalculate every time;
    //                 // take offset of parent because after the element gets fixed
    //                 // it now has a different offset from the top
    //                 offsetTop = topPadding - parent.offset().top;
    //                 offsetBottom = bottomPadding - parent.offset().top;
    //                 console.log(parent.offset().top);
    //                 console.log($('footer').offset().top);
    //                 if ($win.scrollTop() >= offsetTop) {
    //                     element.addClass(topClass);
    //                     parent.height(element.height());
    //                     $('.m-cart--dropdown-box').removeClass('is-active');
    //                     console.log(offsetBottom);
    //                     if ($win.scrollTop() >= offsetBottom) {
    //                         $('.m-cart--order-box .m-button').text('Buy Now');
    //                     }
    //                 } else {
    //                     element.removeClass(topClass);
    //                     parent.css("height", null);
    //                     $('.m-cart--order-box .m-button').text('Continue Checkout');
    //                 }
    //             });
    //         }
    //     };
    // }]);

})();
