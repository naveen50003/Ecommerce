angular.module('myApp',['myApp.controllers','ui.router']);
angular.module('myApp').config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider,$stateProvider){

	$urlRouterProvider.otherwise('/');
	
	$stateProvider
	.state('home',{
		url:'/',
		templateUrl:'templates/firstpage.html',
		controller:'displayPageController'

	})
	.state('items',{
		url:'/items:parem1?parem2',
		templateUrl:'templates/laptopsPage.html',
		controller: 'brandItemController'
    	})
	.state('subitems',{
		url:'/subitems:parem1?parem2?parem3',
		templateUrl:'templates/appleLaptop.html',
		controller: 'brandItemProductController'
	})
	.state('navitems',{
		url:'/navitems:name',
		templateUrl:'templates/electronic.html',
		controller: 'brandController'
	})
	.state('cart',{
		url:'/cart',
		templateUrl:'templates/cart.html',
		controller: 'cartController'
	})
	.state('single',{
		url:'/single:parem1?parem2?parem3?parem4',
		templateUrl:'templates/singleLap.html',
		controller: 'itemController'
		
	});
	// $locationProvider.html5Mode(true);
}]);