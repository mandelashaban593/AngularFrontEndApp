'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontendApp
 */


angular.module('yeoAngApp')
  .controller('LoginCtrl', ['$scope', 'LoginService', 'AuthService', '$state', '$stateParams', function($scope, LoginService, AuthService, $state, $stateParams) {



    var loginCtrl = this;

    $scope.loginInputData = {
      'email':'',
      'password':'',
    }



    if (AuthService.isAuthenticated()) {
      // User is authenticated
      $state.transitionTo('home', $state.params, {
        reload: true,
          inherit: false,
          notify: true
      });
    }
    if($stateParams.email){
      loginInputData.email = $stateParams.email;
    }

    var login = function(user, LoginService) {
      // This service's function returns a promise, but we'll deal with that shortly
      LoginService.login(user)
        // then() called when son gets back
        .then(function(data) {


          // promise fulfilled
          if (AuthService.isAuthenticated()) {
            // User isn’t authenticated
            $state.transitionTo("home", $stateParams, {
          reload: true,
    inherit: false,
    notify: true
});
          }

        }, function(error) {
        

          // promise rejected, could log the error with: console.log('error', error);
          if(error){
            $scope.errorMsg = "You have provided an Invalid email/password. Please Check your login details and try again";
            /*
            if(error['error_description'] == 'Invalid credentials given.'){ 
            }
            */
          }
          else {
            //$scope.errorMsg = "Server error";
          }
          return loginCtrl.errorMsg;
        });
    };

    $scope.postForm = function() {
      var user = {
        'username': $scope.loginInputData.email,
        'password': $scope.loginInputData.password
      };

      return login(user, LoginService);

    }



  }]);
