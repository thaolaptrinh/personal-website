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
    })
    .when("/quizzes/play/:id", {
      templateUrl: "pages/play-quiz.html",
      controller: "PlayQuizController",
    })
    .when("/newsletter", {
      templateUrl: "pages/newsletter.html",
      controller: "NewsletterController",
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
    $rootScope.API_URL = "https://personal-sage.vercel.app";
    $rootScope.BASE_URL = "http://" + $location.host() + ":" + $location.port();
    $scope.date = new Date();
    $http.get($rootScope.API_URL + "/author").then((res) => {
      $rootScope.author = res.data;
    });

    $http.get($rootScope.API_URL + "/quizzes").then((res) => {
      $rootScope.quizzes = res.data;
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
    };

    $scope.handleSearch = ($event) => {
      $event.preventDefault();

      if ($scope.input.search === null) return;
      if ($scope.input.search.length > 0) {
        $location.path("/blog/").search({ search: $scope.input.search });
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

app.controller("QuizController", function ($rootScope, $scope, $http) {
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

  // $scope.handleSearch = ($event) => {
  //   $event.preventDefault();
  //   console.log(1);
  // };
});

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
