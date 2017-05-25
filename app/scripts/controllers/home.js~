'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the frontendApp
 */

angular.module('yeoAngApp')
  .controller('HomeCtrl', ['$scope', 'LoginService', 'AuthService', '$state', '$stateParams','AppDataService', function($scope, LoginService, AuthService, $state, $stateParams,AppDataService) {


    if (!AuthService.isAuthenticated()) {
      // User is not authenticated
      $state.transitionTo('login', $state.params, {
        reload: true,
          inherit: false,
          notify: true
      });
    }


    $scope.sendMoneyModel = {
      'country':'UGANDA',
      'service':'momo',
      'form_partial':'',
      'momo_sendcurrency':'USD',
    }


    $scope.LoadFormPartial = function(){
    var val = $scope.sendMoneyModel.service;
    $scope.sendMoneyModel.form_partial = "views/partials/"+val+".html";
    }


    $scope.LoadFormPartial()


    $scope.$watch("sendMoneyModel.service", function(newVal, oldVal) {
      if (newVal !== oldVal) {
      $scope.LoadFormPartial();
      $("select").dropkick('redraw');
      }
    });

  }]);
