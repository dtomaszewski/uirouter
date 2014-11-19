'use strict';


angular.module('uirouter', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'components/main/main.html',
        controller: 'MainCtrl'
      })
      .state('lesson', {
        url: '/lesson',
        templateUrl: 'components/lesson/lesson.html',
        controller: 'LessonCtrl'
      })
      .state('lesson.number', {
        url: '/:number',
        templateUrl: 'components/lesson/lesson-details.html',
        controller: 'LessonDetailsCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
