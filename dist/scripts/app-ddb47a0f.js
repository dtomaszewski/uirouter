(function() {
  'use strict';

  angular.module('lesson',
    [
      'lesson.details',
      'lesson.service',
      'lesson.service.mock'
    ]);

})();


(function() {
  'use strict';
  angular.module('lesson.service', ['ngResource'])
    .service('LessonService', ['$resource', function ($resource) {

      return $resource('/api/lessons/:lessonNumber');

    }]);
})();

(function() {
  'use strict';

  var lessonsServiceMock = angular.module('lesson.service.mock', ['ngMockE2E']);

  lessonsServiceMock.run(["$httpBackend", function($httpBackend) {
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

  }]);
})();




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

(function() {
  'use strict';


  angular.module('lesson.details', [])
    .controller('LessonDetailsCtrl', ['LessonService', '$stateParams', LessonDetailsCtrl]);


  function LessonDetailsCtrl(LessonService, $stateParams) {
    var vm = this;

    LessonService.get({ lessonNumber: $stateParams.number}, function(data) {
      vm.lesson = data;
    });
    vm.lessonNumber = $stateParams.number;
  }
})();



(function() {
  'use strict';
  angular.module('words',
    [
      'words.service',
      'words.service.mock'
    ]);
})();


(function() {
  'use strict';

  angular.module('words.service', ['ngResource'])
    .service('WordsService', WordsService);

  function WordsService($resource) {
    return $resource('/api/words/:lessonNumber');
  }
  WordsService.$inject = ["$resource"];
})();


(function() {
  'use strict';

  var wordsServiceMock = angular.module('words.service.mock', ['ngMockE2E']);

  wordsServiceMock.run(["$httpBackend", function($httpBackend) {
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
      var parameters = url.split('/'),
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

  }]);
})();

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

(function() {
  'use strict';
  angular.module('uirouter', ['ui.router', 'lesson', 'words'])
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'components/main/main.html',
          controller: 'MainCtrl as vm'
        })
        .state('lesson', {
          url: '/lesson',
          templateUrl: 'components/lesson/lesson.html',
          controller: 'LessonCtrl as vm'
        })
        .state('lesson.number', {
          url: '/:number',
          templateUrl: 'components/lesson/details/lesson.details.html',
          controller: 'LessonDetailsCtrl as vm'
        })
        .state('words', {
          url: '/words/:lessonNumber',
          templateUrl: 'components/words/words.html',
          controller: 'WordsCtrl as vm'
        });

      $urlRouterProvider.otherwise('/');
    }])
  ;
})();



(function() {
  'use strict';
  angular.module('uirouter')
    .controller('MainCtrl', [MainCtrl]);

  function MainCtrl() {
    var vm = this;
  }

})();


(function(module) {
try {
  module = angular.module('uirouter');
} catch (e) {
  module = angular.module('uirouter', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/lesson/lesson.html',
    '<div class="row lesson"><ul class="nav nav-tabs"><li ng-repeat="lesson in vm.lessons"><a ng-href="#/lesson/{{ lesson.number }}">Leksjon {{ lesson.number }}</a></li></ul></div><div ui-view="" class="row"></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('uirouter');
} catch (e) {
  module = angular.module('uirouter', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/main/main.html',
    '<h1>MAIN</h1>');
}]);
})();

(function(module) {
try {
  module = angular.module('uirouter');
} catch (e) {
  module = angular.module('uirouter', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/words/words.html',
    '<h1>Słowa z lekcji {{ vm.lessonNumber }}</h1><ul><li ng-repeat="word in vm.words">{{ word.polish }} - {{ word.norwegian }}</li></ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('uirouter');
} catch (e) {
  module = angular.module('uirouter', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/lesson/details/lesson.details.html',
    '<div class="lesson-details"><h1>{{ vm.lesson.topic }}</h1><p>Szczegóły :</p><ul><li ng-repeat="subject in vm.lesson.subjects">{{subject.name}}: {{subject.details}} <a ui-sref="words({ lessonNumber: vm.lessonNumber })">idź do</a></li></ul></div>');
}]);
})();
