mainApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })
        .when('/login', {
            templateUrl: 'views/home.html',
            controller: 'homeCtrl'
        })
        .when('/us', {
            templateUrl: 'views/us.html'
        })
        .when('/new', {
            templateUrl: 'views/new.html',
            controller: 'newArticleCtrl'
        })
        .when('/:sortName', {
            templateUrl: 'views/articles.html',
            controller: 'articleCtrl'
        })
        .when('/article/edit/:articleId', {
            templateUrl: 'views/new.html',
            controller: 'newArticleCtrl'
        })
        .when('/article/:articleId', {
            templateUrl: 'views/details.html',
            controller: 'detailArticleCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}]);