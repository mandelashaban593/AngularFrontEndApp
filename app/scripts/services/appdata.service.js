/**
 * Created by robert on 04.01.17.
 */
'use strict';

angular.module('yeoAngApp')
  .factory('AppDataService', ['dataFactory','$localStorage','CacheFactory', function (dataFactory,$localStorage,CacheFactory) {
    return {
      appdata: appdata,
      loadappdata:loadappdata
    };

  






        //get apps data and store
        function getAppData(cache) {
                  dataFactory.getServices()
                    .then(function(response) {

                      if (response.data['apps']) {
                      
    
                      var apps = response.data['apps'];
                      console.log(apps);
                      for (var i = apps.length - 1; i >= 0; i--) {
                      cache.put(apps[i].name, apps[i]);
                      
                      }
                      

                    }                 
                  }, function(error) {

                      console.log('profile', error.message)

                    });
              }





    function loadappdata() {
      //prepare the cache data on load
      var cache = CacheFactory.get('appDataCache');
      getAppData(cache);
    }



    function appdata(name) {
         //get the cache
      var cache = CacheFactory.get('appDataCache');
      var data = cache.get(name);

      if (data){

      }else{
        getAppData(cache);
        cache = CacheFactory.get('appDataCache');
        data = cache.get(name);
      }

      return data;
    }






  }]);
