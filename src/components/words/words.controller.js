(function() {
  'use strict';

  angular.module('words')
    .controller('WordsCtrl', ['WordsService', '$stateParams', WordsCtrl]);

  function WordsCtrl(WordsService, $stateParams) {
    var vm = this;

    vm.lessonNumber = $stateParams.lessonNumber;

    WordsService.query({lessonNumber: vm.lessonNumber}, function(data) {
      vm.words = data;
    });

  }
})();
