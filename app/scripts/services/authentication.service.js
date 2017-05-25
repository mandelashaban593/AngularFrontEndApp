/**
 * Created by robert on 04.01.17.
 */
'use strict';

angular.module('yeoAngApp')
  .factory('AuthService', ['OAuth', '$q', 'dataFactory', '$rootScope', '$state', function (OAuth, $q, dataFactory, $rootScope, $state) {
    return {
      login: login,
      logout: logout,
      isAuthenticated: isAuthenticated
    };


    function login(user) {
      return OAuth.getAccessToken(user).then(function (response) {
        return response
      }, function(error) {
        return error
      })

    }

    function logout() {
      return OAuth.revokeToken().then(function () {
        $state.go('main');
      });
    }

    function isAuthenticated() {
      return OAuth.isAuthenticated()
    }

  }]);
