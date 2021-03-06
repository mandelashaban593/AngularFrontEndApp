'use strict'
/**
 * Created by robert on 04.01.17.
 */
angular.module('yeoAngApp')
  .factory('dataFactory', ['$http','CacheFactory', 'ENV', function($http,CacheFactory, ENV) {

    var url = ENV.apiEndpoint ;
    var dataFactory = {};

    dataFactory.grabAccToken = function () {
      // method for applications access token retrieval
      var data = {
        "grant_type": "client_credentials",
        "client_id": ENV.signupClientid,
        "client_secret": ENV.signupClientsecret
      };
      data = queryString.stringify(data);
      return $http({
        method: 'POST',
        url: url + '/' + ENV.grantPath,
        data: data,
        headers: {
            Authorization: undefined,
            "Content-Type": "application/x-www-form-urlencoded"
          }
      })
    };

    dataFactory.register = function(user,access_token) {
      return $http({
        method: 'POST',
        url: url + '/api/accounts/signup/',
        data: user,
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json"
        }
      })
    };

    dataFactory.sendEmail = function(email,access_token) {
      //function for sending email with restoring link
      return $http({
        method: 'POST',
        url: url + '/api/accounts/recovery-password/',
        data: email,
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json"
        }
      })
    };


    dataFactory.validateToken = function(token, uid, access_token) {
      // function that pre-checks if provided token has not expired yet
      return $http({
        method: 'POST',
        url: url + '/api/accounts/validate_token/',
        data:{
          token:token,
          uid:uid
        },
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json"
        }
      })
    };


    dataFactory.clearAllDataCache = function () {
          CacheFactory.clearAll();
        };

    dataFactory.confirmRegister = function(token, uid, access_token) {
      // function that checks if given url is associated with newly created account
      return $http({
        method: 'POST',
        url: url + '/api/accounts/activate/',
        data:{
          token:token,
          uid:uid
        },
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json"
        }
      })
    };

    dataFactory.resetPassword = function(token, uid, password1, password2, access_token) {
      return $http({
        method: 'POST',
        url: url + '/api/accounts/password_reset_confirm/',
        data: {
          token:token,
          uid: uid,
          new_password1: password1,
          new_password2: password2
        },
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json"
        }

      })
    };

    dataFactory.changePassword = function(old_password, new_password1, new_password2) {
      return $http({
        method: 'POST',
        url: url + '/api/accounts/password-change/',
        data: {
          old_password: old_password,
          new_password1: new_password1,
          new_password2: new_password2
        }
      })
    };

    dataFactory.getProfile = function() {
      return $http({
        method: 'GET',
        url: url + '/api/profile/'
      })
    };

    dataFactory.getRates = function(access_token) {
      return $http({
        method: 'GET',
        url: url + '/api/rates/',
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json"
        }
      })
    };


    dataFactory.getMomoRates = function(access_token) {
      return $http({
        method: 'GET',
        url: url + '/api/momo/rate/',
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json"
        }
      })
    };


    dataFactory.getServices = function(name) {
      return $http({
        method: 'GET',
        url: url + '/api/apps/'
      })
    };


    dataFactory.getService = function(name) {
      return $http({
        method: 'GET',
        url: url + '/api/'+name+'/'
      })
    };


    dataFactory.getServiceRates = function(rate_url) {
      return $http({
        method: 'GET',
        url: url + rate_url
      })
    };


    return dataFactory
  }]);
