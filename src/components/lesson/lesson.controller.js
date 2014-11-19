'use strict';

angular.module('uirouter')
  .controller('LessonCtrl', function ($scope, LessonService) {
    $scope.lessons = LessonService.getLessons();
  });
