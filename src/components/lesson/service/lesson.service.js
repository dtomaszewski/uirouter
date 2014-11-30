(function() {
  'use strict';
  angular.module('lesson.service', ['ngResource'])
    .service('LessonService', function ($resource) {

      return $resource('/api/lessons/:lessonNumber');

    });
})();
