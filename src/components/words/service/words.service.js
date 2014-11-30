(function() {
  'use strict';

  angular.module('words.service', ['ngResource'])
    .service('WordsService', WordsService);

  function WordsService($resource) {
    return $resource('/api/words/:lessonNumber');
  }
})();

