const app = angular.module("App", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "pages/home.html",
      title: "Home",
    })
    .when("/about", {
      templateUrl: "pages/about.html",
      title: "About",
    })
    .when("/blog", {
      templateUrl: "pages/blog.html",
      controller: "BlogController",
      title: "Blog",
    })
    .when("/blog/post/:id", {
      templateUrl: "pages/post-detail.html",
      controller: "PostController",
    })
    .when("/quizzes", {
      templateUrl: "pages/quizzes.html",
      controller: "QuizController",
      title: "Quizzes",
    })
    .when("/quizzes/play/:id", {
      template: "<play-quiz/>",
      title: "Play Quiz",
    })
    .when("/newsletter", {
      templateUrl: "pages/newsletter.html",
      title: "Newsletter",
    })
    .when("/404", {
      templateUrl: "pages/404.html",
      title: "404 Not Found",
    })
    .otherwise({
      redirectTo: "/404",
    });

  //check browser support
  // if (window.history && window.history.pushState) {
  //   $locationProvider.html5Mode({
  //     enabled: true,
  //     requireBase: false,
  //   });
  // }
});

app.filter("trustAs", [
  "$sce",
  function ($sce) {
    return function (input, type) {
      if (typeof input === "string") {
        return $sce.trustAs(type || "html", input);
      }
      console.log("trustAs filter. Error. input isn't a string");
      return "";
    };
  },
]);

app.run(function ($rootScope, $location, $route) {
  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    $rootScope.pathCurrent = $location.path();
  });
  $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
    $rootScope.title = $route.current.title;
  });
});

app.controller(
  "AppController",
  function ($rootScope, $scope, $location, $http, $sce, $routeParams) {
    // $rootScope.API_URL = "https://personal-sage.vercel.app";
    $rootScope.API_URL = "http://localhost:3000";

    console.log($location);
    $rootScope.BASE_URL = "http://" + $location.host() + ":" + $location.port();
    $scope.date = new Date();
    const options = {
      headers: { Accept: "application/json" },
    };
    $http.get($rootScope.API_URL + "/author").then((res) => {
      $rootScope.author = res.data;
    });

    const query_projects = "&_limit=3&_sort=id&_order=desc";

    $http
      .get($rootScope.API_URL + "/projects?" + query_projects)
      .then((res) => {
        $rootScope.projects = res.data;
      });

    $http.get($rootScope.API_URL + "/site").then((res) => {
      $rootScope.site = res.data;
    });

    const query = "&_limit=3&_sort=id&_order=desc";

    $http.get($rootScope.API_URL + "/posts?" + query).then((res) => {
      $scope.posts = res.data;
    });

    $scope.input = {
      search: null,
      email: null,
      searchQ: null,
    };

    $scope.handleSearch = ($event) => {
      $event.preventDefault();

      if ($scope.input.search === null) return;
      if ($scope.input.search.length > 0) {
        $location.path("/blog/").search({ search: $scope.input.search });
      }
    };

    $scope.handleSearchQ = ($event) => {
      $event.preventDefault();
      if ($scope.input.searchQ === null) return;
      if ($scope.input.searchQ.length > 0) {
        $location.path("/quizzes/").search({ search: $scope.input.searchQ });
      }
    };

    $scope.handleSubscribe = ($event) => {
      $event.preventDefault();
      console.log($scope.input.email);
    };
  }
);

app.controller(
  "BlogController",
  function ($rootScope, $scope, $http, $routeParams) {
    const query_all = "&_sort=id&_order=desc";

    $http.get($rootScope.API_URL + "/posts?" + query_all).then((res) => {
      $scope.posts = res.data;
    });

    if ($routeParams.search) {
      const query_search = "title_like=" + $routeParams.search;
      $http.get($rootScope.API_URL + "/posts?" + query_search).then((res) => {
        $scope.posts = res.data;
      });
    }
  }
);

app.controller(
  "PostController",
  function ($rootScope, $scope, $http, $routeParams) {
    let query = "?id=" + $routeParams.id;
    $http.get($rootScope.API_URL + "/posts" + query).then((res) => {
      $rootScope.title = res.data[0].title;
      $scope.post = res.data[0];
    });
  }
);

app.controller(
  "QuizController",
  function ($routeParams, $rootScope, $scope, $http, $location) {
    const API_KEY_QUIZ = "EnQv2OGyGax0duTQgeceQnB651PNXqQFgwcpdKYF";
    // const API_URL_QUIZ = "https://quizapi.io/api/v1/questions";

    // $http({
    //   url: API_URL_QUIZ,
    //   method: "GET",
    //   params: {
    //     apiKey: API_KEY_QUIZ,
    //     limit: 10,
    //     category: "Linux",
    //   },
    //   headers: { Accept: "application/json" },
    // }).then((res) => {
    //   console.log(res.data);
    // });
    $http.get($rootScope.API_URL + "/quizzes").then((res) => {
      $scope.quizzes = res.data;
    });

    if ($routeParams.search) {
      const query_search = "name_like=" + $routeParams.search;
      $http.get($rootScope.API_URL + "/quizzes?" + query_search).then((res) => {
        console.log(res.data);
        $scope.quizzes = res.data;
      });
    }
  }
);

app.controller(
  "PlayQuizController",
  function ($rootScope, $scope, $routeParams, $http, $location) {
    $http.get($rootScope.API_URL + "/quizzes/" + $routeParams.id).then(
      (res) => {
        $scope.data = res.data;
      },
      function (e) {
        $location.path("/404");
      }
    );

    $scope.handleSubmit = ($event) => {
      $event.preventDefault();
    };
  }
);

app.factory("$quizFactory", [
  "$routeParams",
  function ($routeParams) {
    var questions = [
      {
        id: 1,
        name: "Top 10 questions Linux",
        tag: "Linux",
        data: [
          {
            id: 15,
            question:
              "Which command to use for complete details of a command on the shell?",
            description: null,
            answers: {
              answer_a: "help",
              answer_b: "man",
              answer_c: "?",
              answer_d: "info",
              answer_e: null,
              answer_f: null,
            },
            multiple_correct_answers: "false",
            correct_answers: {
              answer_a_correct: "false",
              answer_b_correct: "true",
              answer_c_correct: "false",
              answer_d_correct: "false",
              answer_e_correct: "false",
              answer_f_correct: "false",
            },
            correct_answer: "answer_b",
            explanation: null,
            tip: null,
            tags: [{ name: "Linux" }],
            category: "Linux",
            difficulty: "Easy",
          },
          {
            id: 38,
            question:
              "To inspect the the boot process of a Linux system, which command can be used?",
            description: null,
            answers: {
              answer_a: "boot",
              answer_b: "dmesg",
              answer_c: "cat /var/log/start",
              answer_d: "cat /var/log/boot.txt",
              answer_e: null,
              answer_f: null,
            },
            multiple_correct_answers: "false",
            correct_answers: {
              answer_a_correct: "false",
              answer_b_correct: "true",
              answer_c_correct: "false",
              answer_d_correct: "false",
              answer_e_correct: "false",
              answer_f_correct: "false",
            },
            correct_answer: "answer_b",
            explanation: null,
            tip: null,
            tags: [{ name: "Linux" }],
            category: "Linux",
            difficulty: "Medium",
          },
          {
            id: 658,
            question: "Which command can introduce clock delay?",
            description: null,
            answers: {
              answer_a: "sleep",
              answer_b: "wait",
              answer_c: "suspend",
              answer_d: "delay",
              answer_e: null,
              answer_f: null,
            },
            multiple_correct_answers: "false",
            correct_answers: {
              answer_a_correct: "true",
              answer_b_correct: "false",
              answer_c_correct: "false",
              answer_d_correct: "false",
              answer_e_correct: "false",
              answer_f_correct: "false",
            },
            correct_answer: "answer_a",
            explanation: null,
            tip: null,
            tags: [{ name: "BASH" }],
            category: "Linux",
            difficulty: "Easy",
          },
          {
            id: 738,
            question:
              "How to delete all pods in Kubernetes matching the awk pattern1 or pattern2?",
            description: null,
            answers: {
              answer_a:
                "kubectl get nodes -n myns --no-headers=true | awk '/pattern1|pattern2/{print $1}' | xargs  kubectl delete -n myns pod",
              answer_b:
                "kubectl print pods  -n myns --no-headers=true | awk '/pattern1/2|pattern2/{print $1}' | xargs  kubectl delete -n myns pod",
              answer_c:
                "kubectl print pods  -n myns --no-headers=true | awk '/pattern1/2|pattern2/{print $1}' | xargs  kubectl remove -n myns pod",
              answer_d:
                "kubectl get pods  -n myns --no-headers=true | awk '/pattern1|pattern2/{print $1}' | xargs  kubectl delete -n myns pod",
              answer_e: null,
              answer_f: null,
            },
            multiple_correct_answers: "false",
            correct_answers: {
              answer_a_correct: "false",
              answer_b_correct: "false",
              answer_c_correct: "false",
              answer_d_correct: "true",
              answer_e_correct: "false",
              answer_f_correct: "false",
            },
            correct_answer: "answer_a",
            explanation: null,
            tip: null,
            tags: [{ name: "Kubernetes" }],
            category: "Linux",
            difficulty: "Hard",
          },
          {
            id: 695,
            question:
              "Which command can be used to change file access permission bits?",
            description: null,
            answers: {
              answer_a: "chmod",
              answer_b: "chown",
              answer_c: "umask",
              answer_d: "chperm",
              answer_e: null,
              answer_f: null,
            },
            multiple_correct_answers: "false",
            correct_answers: {
              answer_a_correct: "true",
              answer_b_correct: "false",
              answer_c_correct: "false",
              answer_d_correct: "false",
              answer_e_correct: "false",
              answer_f_correct: "false",
            },
            correct_answer: null,
            explanation: null,
            tip: null,
            tags: [{ name: "BASH" }, { name: "Linux" }],
            category: "Linux",
            difficulty: "Easy",
          },
          {
            id: 1074,
            question:
              "How to change the priority of a swap file/partition to 10",
            description: null,
            answers: {
              answer_a: "swapon -p 10 /path/to/swapfile",
              answer_b: "We can't change the priority of swap partions",
              answer_c: "swapon -P 10 /path/to/swapfile",
              answer_d: "swapon +10 /path/to/swapfile",
              answer_e: null,
              answer_f: null,
            },
            multiple_correct_answers: "false",
            correct_answers: {
              answer_a_correct: "true",
              answer_b_correct: "false",
              answer_c_correct: "false",
              answer_d_correct: "false",
              answer_e_correct: "false",
              answer_f_correct: "false",
            },
            correct_answer: null,
            explanation: null,
            tip: null,
            tags: [{ name: "Linux" }],
            category: "Linux",
            difficulty: "Medium",
          },
          {
            id: 662,
            question:
              "Which command can give first found difference between two file after comparing?",
            description: null,
            answers: {
              answer_a: "diff",
              answer_b: "cmp",
              answer_c: "Common",
              answer_d: "stat",
              answer_e: null,
              answer_f: null,
            },
            multiple_correct_answers: "false",
            correct_answers: {
              answer_a_correct: "false",
              answer_b_correct: "true",
              answer_c_correct: "false",
              answer_d_correct: "false",
              answer_e_correct: "false",
              answer_f_correct: "false",
            },
            correct_answer: "answer_a",
            explanation: null,
            tip: null,
            tags: [{ name: "BASH" }],
            category: "Linux",
            difficulty: "Easy",
          },
          {
            id: 735,
            question:
              "In Kubernetes how to create a service for a replicated Nginx, which serves on port 80 and connects to the containers on port 8000?",
            description: null,
            answers: {
              answer_a: "kubectl expose rc nginx --port=8080 --target-port=80",
              answer_b: "kubectl rc nginx --port=80 --target-port=8000",
              answer_c: "kubectl expose nginx --port=80 --target-port=8000",
              answer_d: "kubectl expose rc nginx --port=80 --target-port=8000",
              answer_e: null,
              answer_f: null,
            },
            multiple_correct_answers: "false",
            correct_answers: {
              answer_a_correct: "false",
              answer_b_correct: "false",
              answer_c_correct: "false",
              answer_d_correct: "true",
              answer_e_correct: "false",
              answer_f_correct: "false",
            },
            correct_answer: "answer_a",
            explanation: null,
            tip: null,
            tags: [{ name: "Kubernetes" }],
            category: "Linux",
            difficulty: "Hard",
          },
          {
            id: 731,
            question:
              "How to compares the current state of the cluster against the state that the cluster would be in if the manifest was applied in Kubernetes?",
            description: null,
            answers: {
              answer_a: "kubectl show -f ./my-manifest.yaml",
              answer_b: "kubectl log -f ./my-manifest.yaml",
              answer_c: "kubectl state -f ./my-manifest.yaml",
              answer_d: "kubectl diff -f ./my-manifest.yaml",
              answer_e: null,
              answer_f: null,
            },
            multiple_correct_answers: "false",
            correct_answers: {
              answer_a_correct: "false",
              answer_b_correct: "false",
              answer_c_correct: "false",
              answer_d_correct: "true",
              answer_e_correct: "false",
              answer_f_correct: "false",
            },
            correct_answer: "answer_a",
            explanation: null,
            tip: null,
            tags: [{ name: "Kubernetes" }],
            category: "Linux",
            difficulty: "Easy",
          },
          {
            id: 680,
            question:
              "How can you display the top 10 number of lines of a file?",
            description: null,
            answers: {
              answer_a: "head \u2212n 10 file.txt",
              answer_b: "head -f 10 file.txt",
              answer_c: "head --display-only 10 file.txt",
              answer_d: "head -show 10 file.txt",
              answer_e: null,
              answer_f: null,
            },
            multiple_correct_answers: "false",
            correct_answers: {
              answer_a_correct: "true",
              answer_b_correct: "false",
              answer_c_correct: "false",
              answer_d_correct: "false",
              answer_e_correct: "false",
              answer_f_correct: "false",
            },
            correct_answer: null,
            explanation: null,
            tip: null,
            tags: [{ name: "BASH" }, { name: "Linux" }],
            category: "Linux",
            difficulty: "Easy",
          },
        ],
      },
    ];

    return {
      getQuestion: function (id) {
        const idP = $routeParams.id - 1;
        if (id < questions[idP].data.length) {
          return questions[idP].data[id];
        } else {
          return false;
        }
      },
    };
  },
]);

app.directive("playQuiz", function ($quizFactory) {
  return {
    restrict: "AE",
    scope: {},
    templateUrl: "pages/play-quiz.html",
    link: function (scope, elem, attrs) {
      scope.start = function () {
        scope.id = 0;
        scope.quizOver = false;
        scope.inProgress = true;
        scope.getQuestion();
      };

      scope.reset = function () {
        scope.inProgress = false;
        scope.score = 0;
      };

      scope.getQuestion = function () {
        var q = $quizFactory.getQuestion(scope.id);
        if (q) {
          scope.question = q.question;
          scope.answers = q.answers;
          scope.answer = q.correct_answer;
          scope.answerMode = true;
        } else {
          scope.quizOver = true;
        }
      };

      scope.checkAnswer = function () {
        if (!$("input[name=answer]:checked").length) return;

        var ans = $("input[name=answer]:checked").val();

        if (ans == scope.answer) {
          scope.score++;
          scope.correctAns = true;
        } else {
          scope.correctAns = false;
        }
        scope.answerMode = false;
      };

      scope.nextQuestion = function () {
        scope.id++;
        scope.getQuestion();
      };

      scope.reset();
    },
  };
});
