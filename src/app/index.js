'use strict';


angular.module('norskApp', ['ui.router', 'lesson', 'words'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'components/main/main.html',
        controller: 'MainCtrl as vm'
      })
      .state('lesson', {
        url: '/lesson',
        templateUrl: 'components/lesson/lesson.html',
        controller: 'LessonCtrl as vm'
      })
      .state('lesson.number', {
        url: '/:number',
        templateUrl: 'components/lesson/details/lesson.details.html',
        controller: 'LessonDetailsCtrl as vm'
      })
      .state('words', {
        url: '/words/:lessonNumber',
        templateUrl: 'components/words/words.html',
        controller: 'WordsCtrl as vm'
      });

    $urlRouterProvider.otherwise('/');
  })
;
