/**
 * Created by robert on 17.01.17.
 */
angular.module('frontendApp')
  .controller('RegisterConfirmCtrl', ['$rootScope', '$state', '$stateParams', '$scope', '$cookies', '$timeout', '$translate', 'AuthService', 'ngToast', 'dataFactory', 'validationFactory',
    function ($rootScope ,$state, $stateParams, $scope, $cookies, $timeout, $translate, AuthService, ngToast, dataFactory, validationFactory) {
      var vm = this;

      confirmRegister();

      function confirmRegister() {
        dataFactory.confirmRegister($stateParams.token, $stateParams.uid, $cookies.get('acctoken')).then(function () {
          vm.tokenValid = true;
          $timeout(function () {
            $state.go('main');
            $rootScope.$broadcast('OpenLogin')
          }, 4000);
        }, function () {
            vm.tokenValid = false;
        })
      }
    }]);
