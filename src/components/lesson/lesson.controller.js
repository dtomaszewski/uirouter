(function() {
  'use strict';

  angular.module('lesson')
    .controller('LessonCtrl', ['LessonService', LessonCtrl]);

  function LessonCtrl(LessonService) {
    var vm = this;

    LessonService.query(function(data) {
      vm.lessons = data;
    })
  }
})();
