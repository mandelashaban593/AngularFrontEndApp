'use strict';

angular.module('yeoAngApp')
  .factory('LoginService', ['OAuth', '$q', 'dataFactory', '$localStorage', '$rootScope', '$state', 'CacheFactory', 'ENV', 'AppDataService', function(OAuth, $q, dataFactory, $localStorage, $rootScope, $state, CacheFactory, ENV, AppDataService) {

    var urlBase = ENV.apiEndpoint+'/api';

    return {
      login: function(user) {
        dataFactory.clearAllDataCache();
        // the $http API is based on the deferred/promise APIs exposed by the $q service
        // so it returns a promise for us by default
        return OAuth.getAccessToken(user)
          .then(function(response) {
            if (typeof response.data === 'object') {
              //inject profile into scope
              try {
                var getProfile = function() {
                  dataFactory.getProfile()
                    .then(function(response) {

                      var profile = response.data[0];
                      $localStorage.$default({
                        profile: profile
                      })
                      $rootScope.profile = profile
                      $state.go("home");

                    }, function(error) {

                      console.log('profile', error.message)

                    });

                }
                getProfile()
              } catch (err) {
                console.log(err)
              }


              try{
                  //load app data on login
                 AppDataService.loadappdata();

              }catch(err){
                console.log(err)
              }



              return response.data;
            } else {
              // invalid response
              return $q.reject(response.data);
            }

          }, function(response) {
            // something went wrong
            return $q.reject(response.data);
          });
      }
    };
  }]);
