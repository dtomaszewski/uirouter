'use strict';

angular.module('uirouter')
  .controller('LessonDetailsCtrl', function ($scope, LessonService, $stateParams) {
    var lesson = LessonService.getLessonByNumber($stateParams.number);
    $scope.topic = lesson[0].topic;
  });
