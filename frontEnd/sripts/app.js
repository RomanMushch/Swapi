var app = angular.module("apiStarWars", ["ngRoute"]);
app.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/", {
            controller: 'MainController',
            templateUrl : "views/main/categories.html"
        })
        .when("/list", {
            controller: 'ListController',
            templateUrl : "views/categories-data/list.html"
        })
        .when("/details", {
            controller: 'DetailsController',
            templateUrl : "views/categories-data/details.html"
        })
        .otherwise({
            redirectTo: '/'
        });

});