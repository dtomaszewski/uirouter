(function() {
  'use strict';
  angular.module('lesson.service', ['ngResource'])
    .service('LessonService', ['$resource', function ($resource) {

      return $resource('/api/lessons/:lessonNumber');

    }]);
})();
