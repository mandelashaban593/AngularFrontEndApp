/**
 * Created by robert on 11.01.17.
 */
angular.module('frontendApp')
  .controller('ResetPasswordCtrl', ['$state', '$stateParams', '$scope', '$cookies', '$timeout', '$translate', 'AuthService', 'ngToast', 'dataFactory', 'validationFactory',
    function ($state, $stateParams, $scope, $cookies, $timeout, $translate, AuthService, ngToast, dataFactory, validationFactory) {
      var vm = this;

      vm.tokenValid = false;

      isTokenValid();

      vm.resetPassword = function (password1, password2){
        //function that takes password and its confirmation in order to reset password.
        if (password1 === password2) {
          var errorsList = validationFactory.passValidation(password1);
          if (errorsList.length == 0) {
            vm.passInfo = '';
            var params = $stateParams;
            dataFactory.resetPassword(params.token, params.uid, password1, password2, vm.accToken).then(function () {
              var message = 'You have successfully changed your password. You will be redirected shortly.';
              $translate(message).then(function(translation) {
                var trans_message = translation;
                ngToast.create({
                  className: 'success',
                  content: trans_message
                });
                $timeout(function () {
                  $state.go('login');
                }, 4000);
              })
            })
          }
          else {
            var error = errorsList[0];
            $translate(error).then(function(translation){
              vm.passInfo = translation
            })

          }
        }
        else {
          var anotherError = "Passwords does not match";
          $translate(anotherError).then(function(translation){
            vm.passInfo = translation
          })
        }
      };

      function isTokenValid(){
        // function that checks if token for password reset has not expired yet.
          dataFactory.validateToken($stateParams.token, $stateParams.uid, $cookies.getObject('token')).then(function(){
            vm.tokenValid = true;
          }, function(){
            $timeout(function(){
              $state.go('restore');
            },4000);
          })
      }
  }]);
