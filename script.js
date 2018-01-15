'use strict';

	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute', 'angularUtils.directives.dirPagination', 'ngResource']);

	// configure our routes
scotchApp.config(["$routeProvider",
function($routeProvider) {
    $routeProvider
        	// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			})

			.when('/pokedex', {
				templateUrl : 'pages/pokedex.html',
				controller  : 'PokedexCtrl'
			})

			.when('/pokemon', {
				templateUrl : 'pages/pokemon.html',
				controller  : 'PokedexCtrl'
			});
}
]);
	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	});

	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});

	scotchApp.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});

	scotchApp.controller('PokedexCtrl', ['$scope','$http', function($scope, $http){

  	$scope.pokemonList;
  	$scope.pokemonNow = '';

    function getList(){
    	$http.get('http://pokeapi.co/api/v1/pokedex/1/',{
    		'Content-Type': 'text/plain',
  			'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        }).success(function(pokemons){
      	if (pokemons){
        	console.log(pokemons);
        	$scope.pokemonList = pokemons.pokemon.sort(function(a,b){
          	if (a.name < b.name){return -1}
          		if (a.name > b.name){return 1}
        	});
        		$scope.pokemonNow = '';
      		}
    	});
  	}

  getList()
  

  $scope.getPokemonList = function(){
    getList()
  };
  
 $scope.getPokemonDetail = function(resource_uri){
 	
    $http.get('http://pokeapi.co/'+resource_uri).then(function(pokemon){
      {
        $scope.pokemonNow = false;
      }
    });
    $http.get('http://pokeapi.co/'+resource_uri).success(function(image){
      if (image){
        $scope.pokemonNow.sprite = 'http://pokeapi.co'+image.png;
      }
    });
  }
     
}]);
  	
scotchApp.filter('startFrom', function () {
  return function (input, start) {
    if (input) {
      start = +start;
      return input.slice(start);
    }
    return [];
  };
});


scotchApp.controller('PageCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter) {
  
  // create empty search model (object) to trigger $watch on update
  $scope.search = {};

  $scope.resetFilters = function () {
    // needs to be a function or it won't trigger a $watch
    $scope.search = {};
  };

  // pagination controls
  $scope.currentPage = 1;
  $scope.totalItems = 700;
  $scope.entryLimit = 7; // items per page
  $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

  // $watch search to update pagination
  $scope.$watch('search', function (newVal, oldVal) {
    $scope.filtered = 20;
    $scope.totalItems = $scope.filtered.length;
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
    $scope.currentPage = 1;
  }, true);
}]);
