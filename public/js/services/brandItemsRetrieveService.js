angular.module('myApp').service("brandItemsRetrieveService",function() {
	  this.retrieveKeys=function(object)
	  {
	    var properties = [];
	    angular.forEach(object, function(value, key) {
           properties.push(key);
            });
          return properties;
      }
})