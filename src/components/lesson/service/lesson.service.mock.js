(function() {
  'use strict';

  var lessonsServiceMock = angular.module('lesson.service.mock', ['ngMockE2E']);

  lessonsServiceMock.run(function($httpBackend) {
  var lessons = [
    {
      number: '1',
      topic: 'lesson 1 topic',
      subjects: [
        {
          name: 'słówka',
          details: 'cechy charakteru'
        },
        {
          name: 'tekst',
          details: 'uzupełnij brakujące słowa'
        },
        {
          name: 'zdania',
          details: 'uzupełnij brakujące słowa'
        }
      ]
    },
    {
      number: '2',
      topic: 'lesson 2 topic',
      subjects: [
        {
          name: 'słówka',
          details: 'rodzina'
        },
        {
          name: 'słówka',
          details: 'przyjaźń'
        },
        {
          name: 'zdania',
          details: 'uzupełnij brakujące słowa'
        }
      ]
    },
    {
      number: '3',
      topic: 'lesson 3 topic',
      subjects: [
        {
          name: 'słówka',
          details: 'cechy charakteru'
        },
        {
          name: 'tekst',
          details: 'uzupełnij brakujące słowa'
        },
        {
          name: 'zdania',
          details: 'uzupełnij brakujące słowa'
        }
      ]
    },
    {
      number: '4',
      topic: 'lesson 4 topic',
      subjects: [
        {
          name: 'słówka',
          details: 'cechy charakteru'
        },
        {
          name: 'tekst',
          details: 'uzupełnij brakujące słowa'
        },
        {
          name: 'wyrażenia',
          details: 'wyrażenia z \'av\' '
        }
      ]
    }
  ];

    var lessonsUrl = '/api/lessons';
    var editingRegex = new RegExp(lessonsUrl + '/[0-9][0-9]*', '');

    $httpBackend.whenGET(lessonsUrl).respond(lessons);

    $httpBackend.whenGET(editingRegex).respond(function(method, url, data) {
      var lesson = {'number' : 0},
        parameters = url.split('/'),
        length = parameters.length,
        lessonNumber = parameters[length - 1];

      if(lessonNumber > 0) {
        for (var i = 0; i < lessons.length; i++) {
          if(lessons[i].number === lessonNumber) {
            lesson = lessons[i];
            break;
          }
        }
      }

      return [200, lesson, {}];
    });

    // Pass through any requests for application files
    $httpBackend.whenGET(/components\/.*/).passThrough();

  });
})();



