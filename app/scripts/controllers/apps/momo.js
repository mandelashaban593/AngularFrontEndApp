'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the frontendApp
 */

angular.module('yeoAngApp')
  .controller('MomoCtrl', ['$scope', '$state', 'dataFactory','AppDataService', function($scope, $state, dataFactory,AppDataService) {


    //get the app data
    var data = AppDataService.appdata('momo')

      $scope.sendMoneyModel = {
        'countries': data['countries'][0].name,
        'currencies':data['currencies'][0].code,
        'recipientcurrency': data['countries'][0].currency.code,
      }


      console.log(data['countries'][0].currency.code)

      var servicedata = {}
      var servicename = 'momo'
      $scope.currencies = data['currencies']
      $scope.countries = data['countries']

  
  
     $scope.$watch("sendMoneyModel.countries", function(newVal, oldVal) {


      if (newVal !== oldVal) {

        for (var i = data['countries'] - 1; i >= 0; i--) {
          var ctry = data['countries'][i];
          if(ctry.name == newVal){
            $scope.sendMoneyModel['recipientcurrency'] = ctry.currency.code;
          }
        }



      }
    });


  }]);
