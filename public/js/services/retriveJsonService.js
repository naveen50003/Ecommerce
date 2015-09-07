angular.module('myApp').service("retriveJsonService",function($http,$q) {

	var deffered=$q.defer();
	$http.get('data/shoppingDat.json').then(function(data) {
	
		deffered.resolve(data);
		
	});
		this.jsonDataPromise=function() {
		
			return deffered.promise;
			
		}

});