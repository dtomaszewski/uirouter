(function() {
  'use strict';

  var wordsServiceMock = angular.module('words.service.mock', ['ngMockE2E']);

  wordsServiceMock.run(function($httpBackend) {
    var words = [
      {
        lessonNumber: '1',
        polish: 'formalny',
        norwegian: 'formelle'
      },
      {
        lessonNumber: '1',
        polish: 'przyjazny',
        norwegian: 'vennlig'
      },
      {
        lessonNumber: '1',
        polish: 'dobry, serdeczny, uprzejmy',
        norwegian: 'behandlig'
      },
      {
        lessonNumber: '2',
        polish: 'piegi',
        norwegian: 'fregner'
      },
      {
        lessonNumber: '2',
        polish: 'szczupły',
        norwegian: 'slank'
      },
      {
        lessonNumber: '3',
        polish: 'nieśmiały',
        norwegian: 'skjenert'
      },
      {
        lessonNumber: '3',
        polish: 'zamyślony',
        norwegian: 'betenkt'
      }
    ];

    var wordsUrl = '/api/words';
    var editingRegex = new RegExp(wordsUrl + '/[0-9][0-9]*', '');

    $httpBackend.whenGET(wordsUrl).respond(words);

    $httpBackend.whenGET(editingRegex).respond(function(method, url, data) {
      var word = {'lessonNumber' : 0},
        parameters = url.split('/'),
        length = parameters.length,
        lessonNumber = parameters[length - 1],
        wordsFromLesson = [];

      if(lessonNumber > 0) {
        for (var i = 0; i < words.length; i++) {
          if(words[i].lessonNumber === lessonNumber) {
            wordsFromLesson.push(words[i]);
          }
        }
      }

      return [200, wordsFromLesson, {}];
    });

    // Pass through any requests for application files
    $httpBackend.whenGET(/components\/.*/).passThrough();

  });
})();
