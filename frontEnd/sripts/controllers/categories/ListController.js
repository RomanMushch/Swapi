/**
 * @ngdoc function
 * @name yurtManagementWebApp.controller:ListController
 * @description
 * # ListController
 * Controller of the yurtManagementWebApp
 */

(function () {
    'use strict';

    var ListController = function ($scope, $http) {
        //----------------------------------------------------------------------------------------------- BASE --//
        //---------------------------------------------------------------------------------- SCOPE & VARIABLES --//
        var appConfig = {
            Api: {
                Paths: {
                    Host: 'https://swapi.co/api/categories-data/'
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
        var _category = null;
        //-------------------------------------------------------------------------------------------- METHODS --//
        $scope.playAudio = function() {
            var audio  = $('#audioID')
            audio.get(0).currentTime = 0;
            audio.get(0).play();
            // $('#audioID').get(0).play()
        }
         $scope.getCategoryData = function(category, navigate) {
            if (navigate!=null) {
                $scope.showLoader = true;
                var str = 'https://swapi.co/api/' + category + '/'
                var pageNumber = navigate.replace(str,'');
                pageNumber = pageNumber.replace('/','')
            } else {
                pageNumber = ''
            }
            $http({
                method: appConfig.Enums.MethodType.GET,
                url: 'https://swapi.co/api/' + category +'/'+ pageNumber
            }).then(function successCallback(response) {
                $scope.showLoader = false;
                $scope.categoryData = response.data;

                var str = 'https://swapi.co/api/' + category +'/'
                angular.forEach($scope.categoryData.results, function (value) {
                    if (value.url) {
                        $scope.updateUrl = value.url.replace(str,'')
                        value.url = $scope.updateUrl.replace('/','')
                    }
                })
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
            var getUrl = $scope.getUrlVars()
            $scope.category = getUrl.category

            $scope.getCategoryData($scope.category, null)
        }
        //----------------------------------------------------------------------------------------------- INIT --//
        onReady()
    };
    ListController.$inject = ['$scope', '$http'];


    angular.module('apiStarWars')
        .controller('ListController', ListController);

})();