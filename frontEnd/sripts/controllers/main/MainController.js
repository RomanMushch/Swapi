/**
 * @ngdoc function
 * @name yurtManagementWebApp.controller:CheckTicketController
 * @description
 * # CheckTicketController
 * Controller of the yurtManagementWebApp
 */

(function () {
    'use strict';

    var MainController = function ($scope, $http) {
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
        $scope.playAudio = function() {
            var audio  = $('#audioID')
            audio.get(0).currentTime = 0;
            audio.get(0).play();
            // $('#audioID').get(0).play()
        }
        $scope.onSearch = function(next) {
            if (next!=null) {
                var goToPage = next
            } else {
                var goToPage = 'https://swapi.co/api/people/?search=' + $scope.textSearch
            }
            $scope.showLoader = true
            $http({
                method: appConfig.Enums.MethodType.GET,
                url: goToPage
            }).then(function successCallback(response) {
                $scope.showLoader = false
                $scope.searchData = response.data;
                angular.forEach($scope.searchData.results, function (value) {
                    // console.log(value)
                    if (value.url) {
                        var url = value.url;
                        url = url.slice(21)
                        var pos = url.indexOf('/')
                        value.category = url.substring(0,pos)
                        url = url.replace(value.category,'')
                        value.id = url.replace(/\//g,'')
                    }
                })
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        $scope.greeting = "Hello World";
        var onReady = function () {
            $scope.showLoader = true
            $http({
                method: appConfig.Enums.MethodType.GET,
                url: appConfig.Api.Paths.Host
            }).then(function successCallback(response) {
                $scope.showLoader = false
                $scope.starWarsData = response.data; // {"name": "Luke Skywalker", "height": "172", ...}

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
        //----------------------------------------------------------------------------------------------- INIT --//
        onReady()
            };

    MainController.$inject = ['$scope', '$http'];


    angular.module('apiStarWars')
        .controller('MainController', MainController);

})();