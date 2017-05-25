/**
 * Created by robert on 05.01.17.
 */
angular.module('yeoAngApp')
  .controller('RegisterCtrl',['$scope', '$translate', '$state', '$cookies', 'dataFactory', 'validationFactory', 'AuthService','LoginService',  function ($scope, $translate, $state, $cookies, dataFactory, validationFactory, AuthService, LoginService) {
    var vm = this;

    $scope.validation = {
      'pass':'',
      'email':''
    };
    $scope.errorMsg = ""

    $scope.signupInputData = {
      'countrycode':'256',
      'email':'',
      'password':'',
      'phonenumber':'',
      'first_name': '',
      'last_name':''
    }

    if(AuthService.isAuthenticated()){
      $state.go('home');
    }


    var login = function(user, LoginService) {
      // This service's function returns a promise, but we'll deal with that shortly
      LoginService.login(user)
        // then() called when son gets back
        .then(function(data) {

          // promise fulfilled
          if (AuthService.isAuthenticated()) {
            // User isn’t authenticated
            $state.transitionTo("home");
          }

        }, function(error) {
          // promise rejected, could log the error with: console.log('error', error);
          if(error){
            loginCtrl.errorMsg = error.error_description;
          }
          else {
            loginCtrl.errorMsg = "Server error";
          }
          return loginCtrl.errorMsg;
        });
    };


    vm.register = function (email,countrycode,password,phonenumber,first_name,last_name) {
      // function that takes user credentials and tries to register them.
      if (emailPassValidation(email,password)) {

        var user = {
          email: email,
          password: password,
          country_code: countrycode,
          mobile_number: phonenumber,
          first_name:first_name,
          last_name:last_name,
        };

        dataFactory.register(user,$cookies.get('acctoken'))
        .then(function (response) {

          var errors = response.data['errors']

          if(errors){
            var email_errors = errors['email']
            var password_errors = errors['password']
            error_str = ""
            $scope.errorMsg = email_errors+" "+password_errors
            console.log(errors);

          }else{

          var user = {
        'username': email,
        'password':password
          };

       return login(user, LoginService);
          }
        //$rootScope.profile = response.data['profile'][0];
        //console.log($rootScope.profile.avatar);
        
        }, function (error) {
          $scope.status = 'Unable to signup ' + error.message;
        });


      }else{


        console.log("emailValidation failed");

      }

    };


     $scope.postForm = function() {
      var email = $scope.signupInputData.email;
      var password = $scope.signupInputData.password;
      var countrycode = $scope.signupInputData.countrycode;
      var phonenumber = $scope.signupInputData.phonenumber;
      var first_name = $scope.signupInputData.first_name;
      var last_name = $scope.signupInputData.last_name;

      vm.register(email,countrycode,password,
          phonenumber,first_name,last_name);
    }


    function emailPassValidation(email, password) {
      // function that uses validation factory validators to check if submited data is valid
      if (!validationFactory.emailValidation(email)){
        $scope.validation.pass = "";
        var message = "Please enter a valid email address";
        /*
        $translate(message).then(function(translation) {
          vm.validation.email = translation;
        });
        */
        $scope.validation.email = message;
        $scope.errorMsg = message
        return false
      }
      else {
        $scope.validation.email = "";
        if (validationFactory.passValidation(password).length > 0){
          var error = validationFactory.passValidation(password)[0];
          /*
          $translate(error).then(function(translation) {
            vm.validation.pass = translation;
          });
          */ 
          $scope.validation.pass = error;
          $scope.errorMsg = error;
          return false
        }
        else {
          return true
        }
      }
    }


  }]);
