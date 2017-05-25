/**
 * Created by robert on 12.01.17.
 */
angular.module('yeoAngApp')
  .factory('validationFactory', [ function() {
    return {
      emailValidation:emailValidation,
      passValidation:passValidation
    };

    function emailValidation(email) {
      // regex test that checks if provided string is an email adress
      var emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailTest.test(email)
    }

    function passValidation(password) {
      // regex test that checks if provided string consists 8 alpha-numeric characters
      var validInfo=[];
      if (password.length < 8){
        validInfo.push("Your password must be at least of 8 characters.");
      }
      if (password.search(/[a-z]/i) < 0){
        validInfo.push("Your password must contain at least one letter.");
      }
      if (password.search(/[0-9]/) < 0){
        validInfo.push("Your password must contain at least one digit.");
      }
      return validInfo
    }


  }]);
