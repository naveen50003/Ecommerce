/// <reference path="../../Scripts/angular.js" />
/// <reference path="../app.js" />



angular.module('myApp').directive('starRating', function () {
                        return {
                            scope: {
                                rating: '=',
                                maxRating: '@',
                                readOnly: '@',
                                click: "&",
                                mouseHover: "&",
                                mouseLeave: "&",
                            },
                            template:
                                "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer; font-size:1.5em' ng-repeat='idx in maxRatings track by $index'> \
                                        <img style='width:24px' ng-src='{{((hoverValue + _rating) <= $index) && \"images/star-empty-lg.png\" || \"images/star-fill-lg.png\"}}' \
                                        ng-Click='isolatedClick($index + 1)' \
                                        ng-mouseenter='isolatedMouseHover($index + 1)' \
                                        ng-mouseleave='isolatedMouseLeave($index + 1)' ></img> \
                    					</div><br/><button class='label label-primary' style='cursor:pointer;' ng-click='clear()' ng-disabled='isdisable'>clear</button>\
                    					<button class='label label-primary' style='cursor:pointer;' ng-click='toggleReadOnly()' ng-model='isdisable'>Toggle Read Only</button>",
                            compile: function (element, attrs) {
                                if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                                    attrs.maxRating = '5';
                                }
                            },
                            controller: 'starRatingController'
                        }
            
});
