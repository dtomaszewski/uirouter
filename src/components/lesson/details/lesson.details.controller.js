(function() {
  'use strict';


  angular.module('lesson')
    .controller('LessonDetailsCtrl', ['LessonService', '$stateParams', LessonDetailsCtrl]);


  function LessonDetailsCtrl(LessonService, $stateParams) {
    var vm = this;

    LessonService.get({ lessonNumber: $stateParams.number}, function(data) {
      vm.lesson = data;
    });
    vm.lessonNumber = $stateParams.number;
  }
})();

