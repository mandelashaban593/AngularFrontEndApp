'use strict'
/**
 * Created by robert on 04.01.17.
 */
angular.module('frontendApp')
.config(['$stateProvider','$urlRouterProvider',
  function( $stateProvider, $urlRouterProvider) {



    var navbar = {
      templateUrl:"views/nav.html",
    };


    var footernav = {
      templateUrl:"views/footer.html"
    };

    $stateProvider
      .state("main", {
        url: "/",
        views:{
          '': {
            templateUrl:"views/main.html",
            controller: "MainCtrl",
            controllerAs: 'vm'
          },
          'nav@': {
            templateUrl:"views/nav.html"
          },
          'footer@': {
            templateUrl:"views/footer.html"
          }
        },
        styles: 'landing',
        authenticate: false
      }).state("login", {
        url: "/login/?{param:json}",
        views:{
          '': {
            templateUrl:"views/authentication/login.html",
            controller: "LoginCtrl",
            controllerAs: 'vm'
          },
          'nav@': navbar,

          'footer@': footernav,

          params:{
            param: {}
          }
        },
        authenticate: false
      }).state("register", {
        url: "/register/",
        views:{
          '': {
            templateUrl:"views/authentication/register.html",
            controller: "RegisterCtrl",
            controllerAs: 'vm'
          },
          'nav@': navbar,
           'footer@': footernav,
        },
        authenticate: false
      }).state("about", {
        url: "/about",
        views:{
          '': {
            templateUrl:"views/about.html",
            controller: "AboutCtrl",
            controllerAs: 'vm'
          },
          'nav@': {
            templateUrl:"views/nav.html"
          },
          'footer@': {
            templateUrl:"views/footer.html"
          }
        },
        styles: 'landing',
        authenticate: false
      }).state("home", {
        url: "/home",
        views:{
          '': {
            templateUrl:"views/home.html",
            controller: "HomeCtrl",
            controllerAs: 'vm'
          },
          'nav@': {
            templateUrl:"views/authednav.html"
          },
          'footer@': {
            templateUrl:"views/footer.html"
          }
        },
        styles: 'home',
        authenticate: true
      }).state("logout", {
        url: "/logout/",
        views:{
          '': {
            templateUrl:"views/main.html",
            controller: "LogoutCtrl",
            controllerAs: 'vm'
          },
          'nav@': {
            templateUrl:"views/nav.html"
          },
          'footer@': {
            templateUrl:"views/footer.html"
          }
        },
        authenticate: true
      });

    $urlRouterProvider.otherwise("/");
  }]);