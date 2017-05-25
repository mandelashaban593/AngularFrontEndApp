/**
 * Created by robert on 11.01.17.
 */
angular.module('frontendApp')
  .controller('RestoreCtrl', ['$state', '$stateParams', '$scope', '$cookies','$translate', 'AuthService', 'ngToast', 'dataFactory',
    function ($state, $stateParams, $scope, $cookies, $translate ,AuthService, ngToast, dataFactory) {
    var vm = this;

    vm.sendMail = function(mail) {
      // function that sends email in order to retrieve reset link on users submited email account
      var email = {
        email: mail
      };

      dataFactory.sendEmail(email,$cookies.get('acctoken')).then(function(){
        vm.validateEmail = '';
        var message = 'Resetting link has been sent to your email account.';
        $translate(message).then(function(translation){
          vm.translatedMessage = translation;
          ngToast.create({
            className: 'success',
            content: vm.translatedMessage
          });
        });
      }, function(){
        var information = 'User with such email does not exist';
        $translate(information).then(function(translation){
          vm.validateEmail = translation
        })
      })
    }

  }]);
