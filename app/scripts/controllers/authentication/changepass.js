/**
 * Created by robert on 13.01.17.
 */
angular.module('frontendApp')
  .controller('changePassCtrl', ['$state', '$stateParams', '$scope','$translate', 'AuthService', 'ngToast', 'dataFactory', 'validationFactory',
    function ($state, $stateParams, $scope, $translate ,AuthService, ngToast, dataFactory, validationFactory) {
      var vm = this;

      vm.changePassword = function(current, newpass1, newpass2) {
        //function that takes current password along with new password and its confirmation.
        if (newpass1 === newpass2) {
          var errorList = validationFactory.passValidation(newpass1);
          if (errorList.length === 0){
            dataFactory.changePassword(current, newpass1, newpass2).then(function (data) {
              vm.validation = "";
              $state.go('home');
            }, function (error){
              var message = "This is not your current password";
              $translate(message).then(function(translation) {
                vm.validation = translation
              });
            })
          }
          else {
            var message = errorList[0];
            $translate(message).then(function(translation) {
              vm.validation = translation
            });
          }
        }
        else{
          var info = "Passwords does not match";
          $translate(info).then(function(translation) {
            vm.validation = translation
          });
        }

      }



    }]);
