(function() {

    angular.module('myApp', [
          // 'ui-router',
          'ngAnimate',
          'ngTouch',
          'ngDialog',
          'timer',
          'scrollToFixed',
        ])
        .controller('MainCtrl', function ($scope, $interval, $window) {


            $interval( function(){ $scope.callAtInterval(); }, 3000);

            $scope.slides = [
                {quote: 'I‘ll never wear any other sock again!', description: 'Quote 00'},
                {quote: 'The best sock ever!', description: 'Quote 01'},
                {quote: 'Like the color of sock a lot!', description: 'Quote 02'},
            ];

            $scope.scrollToFixedOptions = {
                marginTop : 5,
                limit : 0,
                bottom : -1,
                zIndex : 1000,
                baseClassName: 'scroll-to-fixed-fixed',
                preFixed:
                    function() {
                        $(window).scroll(function(){ 
                            if($(window).scrollTop() == ($(document).height() - $(window).height())) {
                                $('#text-trigger').text('Buy Now');
                            }
                        });
                    },
                postFixed:
                    function() {
                        $(this).find('#text-trigger').text('Continue Checkout');
                    }
            };

            $scope.scrollToFixedNavOptions = {
                marginTop: 0,
                limit: 0,
                bottom: -1,
                zIndex: 1000,
                baseClassName: 'scroll-to-fixed-fixed'
            };

            $scope.direction = 'left';
            $scope.currentIndex = 0;

            $scope.setCurrentSlideIndex = function (index) {
                $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
                $scope.currentIndex = index;
            };

            $scope.isCurrentSlideIndex = function (index) {
                return $scope.currentIndex === index;
            };

            $scope.callAtInterval = function () {
                $scope.direction = 'left';
                $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
            };

            $scope.prevSlide = function () {
                $scope.direction = 'left';
                $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
            };

            $scope.nextSlide = function () {
                $scope.direction = 'right';
                $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
            };

            $scope.changeText = function () {
                $('.link.with-arrow').text('Close');
            };

        })
        .animation('.slide-animation', function () {
            return {
                beforeAddClass: function (element, className, done) {
                    var scope = element.scope();

                    if (className == 'ng-hide') {
                        var finishPoint = element.parent().width();
                        if(scope.direction !== 'right') {
                            finishPoint = -finishPoint;
                        }
                        TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                    }
                    else {
                        done();
                    }
                },
                removeClass: function (element, className, done) {
                    var scope = element.scope();

                    if (className == 'ng-hide') {
                        element.removeClass('ng-hide');

                        var startPoint = element.parent().width();
                        if(scope.direction === 'right') {
                            startPoint = -startPoint;
                        }

                        TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                    }
                    else {
                        done();
                    }
                }
            };
        });

    // You can add inject other dependencies if you name them within each
    // file that was created for services, filters, directives, etc. I haven't
    // played with it. It may be a good experiment.

})();
