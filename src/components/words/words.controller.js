(function() {
  'use strict';

  angular.module('words')
    .controller('WordsCtrl', ['WordsService', '$stateParams', WordsCtrl]);

  function WordsCtrl(WordsService, $stateParams) {
    var vm = this;

    WordsService.query({lessonNumber: $stateParams.lessonNumber}, function(data) {
      vm.words = data;
    });

    vm.lessonNumber = $stateParams.lessonNumber;

  }
})();
