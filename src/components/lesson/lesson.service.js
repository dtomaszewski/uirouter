'use strict';

angular.module('uirouter')
  .service('LessonService', function () {
    var lessons = [
      {
        number: '1',
        topic: 'lesson 1 topic'
      },
      {
        number: '2',
        topic: 'lesson 2 topic'
      },
      {
        number: '3',
        topic: 'lesson 3 topic'
      },
      {
        number: '4',
        topic: 'lesson 4 topic'
      }
    ];

    this.getLessonByNumber = function (number) {
      var result = lessons.filter(function( lesson ) {
        return lesson.number === number;
      });

      return result;
    };

    this.getLessons = function() {
      return lessons;
    };
  });
