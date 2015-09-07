
                                       /*Main Controller */

angular.module('myApp.controllers',[]).controller('myHomePageControllers',['$scope','$rootScope','$state','retriveJsonService',function($scope,$rootScope,$state,retriveJsonService) {

	$rootScope.checkItem = [];
 	$rootScope.viewPost = [];
 	$rootScope.chckedIndexs=[];
	$rootScope.cardItems = 0;
	$rootScope.price = 0;
	var promise = retriveJsonService.jsonDataPromise();
	promise.then(function(result) {

		$scope.products = result.data;
		$scope.jsonarr = [];	
		
		   /* Filtering Logic */
			angular.forEach($scope.products,function(value,key)	{

				$scope.jsonarr.push({name:key});
				angular.forEach(value,function(value,key)	{

					$scope.jsonarr.push({name:key});
					angular.forEach(value,function(value,key)	{

						$scope.jsonarr.push({name:key});
						angular.forEach(value,function(item)	{

							$scope.jsonarr.push({name:item.name});
						});
					});
				});
			});
				
		 
	},function(error){
	
		console.log('This is error');
	});
    $scope.sample=function(key1,key2,key3) {

    	$rootScope.brandkey = key1;
    	$rootScope.brandItemkey = key2;
    	$rootScope.brandItemProductkey = key3;
	}
   	$scope.changes = function() {

		var len=$scope.names.length;
		if(len == 0) {

				$scope.flag=false;
			}
			else {

				$scope.flag=true;
			}
		}
		$scope.clicks = function(naming) {
				
			$scope.names = naming;
			if($scope.names!=="") {

				$scope.flag=false;
			}
			else {

				$scope.flag=true;
			}
			
		}
		$scope.searchItemDisplay = function() {

			$rootScope.brandkey = $scope.names;
			angular.forEach($scope.products,function(value1,key1) {

				if($scope.names === key1) {

					$state.go('navitems');
				}
				else {	
		             
            	angular.forEach(value1,function(value2,key2) {

					if($scope.names === key2) {

						 $rootScope.brandkey = key1;
						 $rootScope.brandItemkey = key2;
						 $state.go('items');
                	}
				  	else {
							angular.forEach(value2,function(value3,key3) {

								if($scope.names === key3) {

	                             	$rootScope.brandkey = key1;
				                  	$rootScope.brandItemkey = key2;
				                  	$rootScope.brandItemProductkey = key3;
			                  	 	$state.go('subitems');
	                            }
						        else {

						         	angular.forEach(value3,function(item) {
										      
				                     	if($scope.names === item.name) {
				                              				
				                         	$rootScope.brandkey = key1;
						                  	$rootScope.brandItemkey = key2;
						                  	$rootScope.brandItemProductkey = key3;
						                  	$rootScope.item = $scope.names;
						                  	$state.go('single',{parem1 : item.name});
				                         }

		                             });
						    	 }
							});
						}
					});
				}
			});
		}
}]).controller('displayPageController',['$scope','$rootScope','retriveJsonService',function($scope,$rootScope,retriveJsonService) {

		//  displayPageController
       
    $scope.begin = 0;
    $scope.end = 1;
	console.log('Entered to displayPageController');
	var promise = retriveJsonService.jsonDataPromise();
		promise.then(function(result) {

	       	   $scope.displayProducts=result.data;	
	           
      	});
 	$scope.sample=function(key1,key2,key3,item) {

    	$rootScope.brandkey = key1;
    	$rootScope.brandItemkey = key2;
    	$rootScope.brandItemProductkey = key3;
     	console.log("key value is"+key1,key2);
     	$rootScope.item=item;
 	}
	
	}]).filter('slice',function() {

		return function(arr,start,end)	{

			return arr.slice(start,end);
        }
}).controller('brandController',['$scope','$rootScope','retriveJsonService','$stateParams',function($scope,$rootScope,retriveJsonService,$stateParams) {
 
		//brandController

	console.log($stateParams.key1);
	console.log('Entered to brandcontroller');
	$scope.key=$rootScope.brandkey;
	console.log("child key:"+$scope.key);
	console.log('Entered to brandcontroller');
	var promise = retriveJsonService.jsonDataPromise();
		promise.then(function(result) {

    		$scope.totalBrandItems = result.data;	
		    console.log($scope.totalBrandItems[$scope.key]); 
		    $scope.branditems = $scope.totalBrandItems[$scope.key];
      	});
       	$scope.sample = function(key1,key2,key3) {

			$rootScope.brandItemkey = key1;
			$rootScope.brandItemProductkey = key2;
			$rootScope.item = key3;
        }
}]).controller('brandItemController',['$scope','$rootScope','retriveJsonService',function($scope,$rootScope,retriveJsonService) {
						//brandItemController
	$scope.brandkey = $rootScope.brandkey;
	$scope.brandItemKey = $rootScope.brandItemkey;
	var promise = retriveJsonService.jsonDataPromise();
	promise.then(function(result) {

   	   $scope.totalBrandItems = result.data;	
       $scope.branditems = $scope.totalBrandItems[$scope.brandkey][$scope.brandItemKey];
    
    });
}]).controller('brandItemProductController',['$scope','$rootScope','retriveJsonService',function($scope,$rootScope,retriveJsonService) {
						//brandItemProductController          
	$scope.brandkey = $rootScope.brandkey;
	$scope.brandItemKey = $rootScope.brandItemkey;
	$scope.brandItemProductKey = $rootScope.brandItemProductkey;
	var promise = retriveJsonService.jsonDataPromise();
	promise.then(function(result) {

		$scope.totalBrandItems=result.data;	
		$scope.branditems = $scope.totalBrandItems[$scope.brandkey][$scope.brandItemKey][$scope.brandItemProductKey];
		console.log($scope.branditems);

	});
	$scope.sample = function(key1) {

		$rootScope.item = key1;
	}
}]).controller('itemController',['$scope','$rootScope','retriveJsonService',function($scope,$rootScope,retriveJsonService) {
						//itemController	         	    	
	$scope.brandkey=$rootScope.brandkey;
	$scope.brandItemKey=$rootScope.brandItemkey;
	$scope.brandItemProductKey=$rootScope.brandItemProductkey;
	$scope.targetItem = {};					
	var promise = retriveJsonService.jsonDataPromise();
	promise.then(function(result) {

   	    $scope.totalBrandItems=result.data;	
        $scope.branditems = $scope.totalBrandItems[$scope.brandkey][$scope.brandItemKey][$scope.brandItemProductKey];
        angular.forEach($scope.branditems,function(value,key) {
						           	
			if(value.name === $rootScope.item) {
				$scope.targetItem.name = value.name;
                $scope.targetItem.price = value.price;
                $scope.targetItem.imgSrc = value.imgSrc;
                $scope.targetItem.description = value.description; 
			}
	})
});
                $scope.starRating1 = 0;
				$scope.hoverRating1 = 0;

				$scope.uname=" ";
				
				$scope.comments=" ";
				
				$scope.showPost=false;
				
				$scope.showReview=false;
							
						    $scope.click1 = function (param) {
						        
						    };

						    $scope.mouseHover1 = function (param) {
						        console.log('mouseHover(' + param + ')');
						        $scope.hoverRating1 = param;
						    };

						    $scope.mouseLeave1 = function (param) {
						        console.log('mouseLeave(' + param + ')');
						        $scope.hoverRating1 = param ;
						    };
							
							$scope.review=function(){
								$scope.showReview=true;
								
							}
							
							$scope.post=function(){
								
								$scope.showPost=true;
								
								if($scope.showPost==true) {

									$scope.givenReview=$scope.uname+":"+$scope.comments;
									$scope.viewPost.push({viewComment:$scope.givenReview});

								}	
								$scope.uname = "";
								$scope.comments = "";

							}
							$scope.addCart = function(brandItemProductKey,targetItem) {

                                    
								$rootScope.cartBrandName = brandItemProductKey;
								$rootScope.cartItem = targetItem;
								console.log($rootScope.cartBrandName);
								console.log($rootScope.cartItem);

							}

					
					

}]).controller('cartController',['$scope','$rootScope','retriveJsonService',function($scope,$rootScope,retriveJsonService) {

	//cartController
   
  	var promise = retriveJsonService.jsonDataPromise();
	$scope.firstRound = 0;
	var tempVar = 0;
	$scope.show=false;
	$scope.findItem = $rootScope.cartItem;
	console.log("cardController");
	console.log($rootScope.brandkey);
	console.log($rootScope.brandItemkey);
	console.log($rootScope.brandItemProductkey);
	promise.then(function(result) {

	 	$scope.totalBrandItems=result.data;	
	  	$scope.branditems = $scope.totalBrandItems[$rootScope.brandkey][$rootScope.brandItemkey][$rootScope.brandItemProductkey];
	  	console.log($scope.branditems);
	  	console.log($rootScope.checkItem.length);

	  	if($rootScope.checkItem.length)
	  	    {
	  	    	console.log("entered if case");
	  	    	angular.forEach($rootScope.checkItem,function(item) {

	  	    		console.log("entered inner if case");
	  	    		console.log(item.name);
	  	    		if(item.name === $scope.findItem)
	  	    		{
	  	    			console.log("ele,ent already exists");
	  	    			item.count ++;

	  	    			item.price = parseInt(item.count) * parseInt(item.price);
	  	    			tempVar = 1;
	  	    			$rootScope.cardItems ++;
	  	    			$rootScope.price = 0;
	  	    			$rootScope.price = $rootScope.price + item.price;

	  	    		}

	  	    	});
  	    
	  	     	if(tempVar === 0)	{



					  	angular.forEach($scope.branditems,function(item) {

					  		if(item.name === $scope.findItem)

						  		{
						  			$scope.count=1;
						  			console.log(item.price);
						  			$rootScope.checkItem.push({name:item.name,count:$scope.count,price:item.price});
						  			console.log($rootScope.checkItem);
						  			console.log($rootScope.checkItem.length);
						  			$rootScope.cardItems ++;
						  			$rootScope.price = $rootScope.price + parseInt(item.price);
						  			tempVar = 0;
								}
					  	})
				  	}
		  	}
	  	else	{

	  		   	console.log("entered else case");

	  		  	angular.forEach($scope.branditems,function(item) {

		  		if(item.name === $scope.findItem)

			  		{
			  			$scope.count=1;
			  			console.log(item.price);
			  			$rootScope.checkItem.push({name:item.name,count:$scope.count,price:item.price});
			  			console.log($rootScope.checkItem);
			  			console.log($rootScope.checkItem.length);
			  			$rootScope.cardItems ++;
			  			$rootScope.price = $rootScope.price + parseInt(item.price);
			  			


			  		}
		  	})


	  	}
	});

		
		
			$scope.toggleModal = function (item) {

				 $scope.delteItem = item;
		         if ($rootScope.chckedIndexs.indexOf(item) === -1) {
		             $rootScope.chckedIndexs.push(item);
		         }
		         else {
		             $rootScope.chckedIndexs.splice($rootScope.chckedIndexs.lastIndexOf(item), 1);
		         }
		         $scope.show = !$scope.show;
		     }
			$scope.remove = function(index) {
				console.log('removed'+index);
				angular.forEach($rootScope.chckedIndexs, function (value, index) {

		              var index = $scope.checkItem.lastIndexOf(value);
		              $scope.checkItem.splice($scope.checkItem.lastIndexOf(value), 1);
		              $rootScope.cardItems = $rootScope.cardItems - $scope.delteItem.count;
		              $rootScope.price = $rootScope.price - $scope.delteItem.price;
		              console.log('removed in foreach'+index);
		              console.log('removed in foreach'+value);
		         });
		         $rootScope.chckedIndexs = [];
		         $scope.show=!$scope.show;
			};
			$scope.hideModel=function()
	       {
		    $scope.show=!$scope.show;
			}  
			
}]).controller('starRatingController',['$scope',function ($scope) {

			//starRatingController
			$scope.maxRatings = [];
			$scope.isdisable=false;
            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            };

            $scope._rating = $scope.rating;

            $scope.isolatedClick = function (param) {
                if ($scope.readOnly == 'true') return;
				if($scope.isdisable==true){
					return false;
				}else{
                $scope.rating = $scope._rating = param;
                $scope.hoverValue = 0;
                $scope.click({ param: param });
				}
            };

            $scope.isolatedMouseHover = function (param) {
                if ($scope.readOnly == 'true') return;
				if($scope.isdisable==true){
					return false;
				}else{
                $scope._rating = 0;
                $scope.hoverValue = param;
                $scope.mouseHover({ param: param });
				}
            };

            $scope.isolatedMouseLeave = function (param) {
                if ($scope.readOnly == 'true') return;

				if($scope.isdisable==true){
					return false;
				}else{
                $scope._rating = $scope.rating;
                $scope.hoverValue = 0;
                $scope.mouseLeave({ param: param });
				}
            };
			
			$scope.clear = function () {
			
					$scope.rating=$scope._rating=0;
				
			};
			$scope.toggleReadOnly=function(){
				$scope.isdisable=!$scope.isdisable;
				return false;
			};
			
       
			
}]);






