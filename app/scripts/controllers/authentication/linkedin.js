/**
 * Created by robert on 26.01.17.
 */
angular.module('frontendApp')
  .controller('LinkedInCtrl', ['$state', '$stateParams', '$scope', '$localStorage' , '$window', '$timeout', 'AuthService', 'dataFactory', 'ENV' , function ($state, $stateParams, $scope, $localStorage, $window, $timeout, AuthService, dataFactory, ENV) {

//     sendAccessCode();
//
//     function sendAccessCode(){
//       var codes = {
//         state: $stateParams.state,
//         code: $stateParams.code
//       };
// //       var url = 'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code='
// //         + codes.code + '&redirect_uri=' + ENV.callbackEndpoint + '&client_id=' + ENV.linkedinClientId
// //         + '&client_secret=' + ENV.linkedinClientSecret ;
// //       var popup = $window.open(url, '_blank','width=500, height=500');
// // console.log(popup)
// //       $timeout(function () {
// //         console.log(popup)
// //       },4000)
// //       popup.onload = function(){
// //         console.log("LOADED")
// //         $timeout(function(){ console.log(popup.document.documentElement.outerHTML) }, 2000);
// //       };
//
//       dataFactory.getLinkedInAccess(codes).then(function(data){
//         console.log(data);
//       })
//     }

  }]);
