/**
 * @ngdoc function
 * @name yurtManagementWebApp.controller:DetailsController
 * @description
 * # DetailsController
 * Controller of the yurtManagementWebApp
 */

(function () {
    'use strict';

    var DetailsController = function ($scope, $http) {
        //----------------------------------------------------------------------------------------------- BASE --//
        //---------------------------------------------------------------------------------- SCOPE & VARIABLES --//
        $scope.showPeopleDetails = false;
        $scope.formatedData = {}
        $scope.formatedData.formatedFilms = []
        $scope.formatedData.formatedSpecies = []
        $scope.formatedData.formatedVehicles = []
        $scope.formatedData.formatedStarships = []
        $scope.formatedData.formatedPeople = []
        $scope.formatedData.formatedPlanets = []
        var _personId = null;
        var appConfig = {
            Api: {
                Paths: {
                    Host: 'https://swapi.co/api/'
                }
            },
            Enums: {
                MethodType: {
                    GET: 'GET',
                    POST: 'POST',
                    DELETE: 'DELETE'
                },
            }
        }
        //-------------------------------------------------------------------------------------------- METHODS --//
        function getPlanet(planet) {
            $http({
                method: appConfig.Enums.MethodType.GET,
                url: planet
            }).then(function successCallback(response) {
                $scope.formatedData.planetName = response.data.name;
                var id = planet.replace('https://swapi.co/api/planets/','')
                id = id.replace('/','')
                $scope.formatedData.planetId = id
            }, function errorCallback(response) {
            });
        }
        function getAdditionalDetails(dataElement, category) {
            angular.forEach(dataElement, function (value) {
                $http({
                    method: appConfig.Enums.MethodType.GET,
                    url: value
                }).then(function successCallback(response) {
                    var str = 'https://swapi.co/api/'+category+'/'
                    var id = value.replace(str,'')
                    id = id.replace('/','')
                    if (category=='films') {
                        var params = {}
                        params.filmName = response.data.title
                        params.filmId = id
                        $scope.formatedData.formatedFilms.push(params)
                    }
                    if (category=='species') {
                        var params = {}
                        params.speciesName = response.data.name
                        params.speciesId = id
                        $scope.formatedData.formatedSpecies.push(params)
                    }
                    if (category=='vehicles') {
                        var params = {}
                        params.vehiclesName = response.data.name
                        params.vehiclesId = id
                        $scope.formatedData.formatedVehicles.push(params)
                    }
                    if (category=='starships') {
                        var params = {}
                        params.starshipsName = response.data.name
                        params.starshipsId = id
                        $scope.formatedData.formatedStarships.push(params)
                    }
                    if (category=='people') {
                        var params = {}
                        params.peopleName = response.data.name
                        params.peopleId = id
                        $scope.formatedData.formatedPeople.push(params)
                    }
                    if (category=='planets') {
                        var params = {}
                        params.planetName = response.data.name
                        params.planetId = id
                        $scope.formatedData.formatedPlanets.push(params)
                    }

                }, function errorCallback(response) {
                });

            })

        }
        function getDetails(category, element) {
            $http({
                method: appConfig.Enums.MethodType.GET,
                url: appConfig.Api.Paths.Host + category + '/' + element
            }).then(function successCallback(response) {

                $scope.showLoader = false;
                $scope.elementData = response.data;
                if ($scope.elementData.homeworld) {
                    getPlanet($scope.elementData.homeworld)
                }
                if ($scope.elementData.films) {
                    getAdditionalDetails($scope.elementData.films, 'films')
                }
                if ($scope.elementData.species) {
                    getAdditionalDetails($scope.elementData.species, 'species')
                }
                if ($scope.elementData.vehicles) {
                    getAdditionalDetails($scope.elementData.vehicles, 'vehicles')
                }
                if ($scope.elementData.starships) {
                    getAdditionalDetails($scope.elementData.starships, 'starships')
                }
                if ($scope.elementData.residents) {
                    getAdditionalDetails($scope.elementData.residents, 'people')
                }
                if ($scope.elementData.characters) {
                    getAdditionalDetails($scope.elementData.characters, 'people')
                }
                if ($scope.elementData.people) {
                    getAdditionalDetails($scope.elementData.people, 'people')
                }
                if ($scope.elementData.planets) {
                    getAdditionalDetails($scope.elementData.planets, 'planets')
                }
                if ($scope.elementData.pilots) {
                    getAdditionalDetails($scope.elementData.pilots, 'people')
                }
            }, function errorCallback(response) {
            });
        }
        //--------------------------------------------------------------------------------------------- EVENTS --//
        $scope.getUrlVars = function () {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }
        //-------------------------------------------------------------------------------------------- SERVICE --//
        //------------------------------------------------------------------------------------------- WATCHERS --//
        //---------------------------------------------------------------------------------------------- READY --//
        var onReady = function () {
            $scope.showLoader = true;
            $scope.showPeopleDetails=false;
            var getUrl = $scope.getUrlVars()
            $scope.category = getUrl.c1
            $scope.element = getUrl.c2
            if ($scope.category === 'people') $scope.showPeopleDetails=true;
            if ($scope.category === 'planets') $scope.showPlanetDetails=true;
            if ($scope.category === 'films') $scope.showFilmDetails=true;
            if ($scope.category === 'species') $scope.showSpeciesDetails=true;
            if ($scope.category === 'vehicles') $scope.showVehiclesDetails=true;
            if ($scope.category === 'starships') $scope.showStarshipsDetails=true;
            getDetails($scope.category, $scope.element)
        }
        //----------------------------------------------------------------------------------------------- INIT --//
        onReady()
        };

    DetailsController.$inject = ['$scope', '$http'];


    angular.module('apiStarWars')
        .controller('DetailsController', DetailsController);

})();