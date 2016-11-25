function objFilter(obj, accepted, exclude) {
    var result = {};
    for (var key in obj)
        if ((accepted.indexOf(key) > -1 && !exclude)
            || (exclude && accepted.indexOf(key) == -1))
            result[key] = obj[key];
    return result;
}

var secToCol = {
    news:{class:"panel-default", hex:"#AAB2BD", foot:"rgb(255, 255, 255)"},
    various:{class:"panel-success", hex:"#8CC152", foot:"rgb(210, 255, 123)"},
    old:{class:"panel-warning", hex:"#F6BB42", foot:"rgb(255, 255, 99)"},
    inOut:{class:"panel-danger", hex:"#DA4453", foot:"rgb(255, 102, 125)"},
    videos:{class:"panel-info", hex:"#37BC9B", foot:"rgb(83, 255, 233)"}
};

mainApp.controller('homeCtrl', function($scope, $http, $location, $uibModal, $cookies) {
    if($location.path() === "/login") {
        if(!$cookies.get("login")) {
            $uibModal.open({
                templateUrl: 'views/partials/login.html',
                controller: 'loginCtrl',
                size: 'sm'
            });
        }
        else
            $location.path('.');
    }

    $scope.articles = [];
    $scope.front = [];

    var urlList = apiUrl + "articles";
    $http.get(urlList)
        .then(function(response) {
            var articles = response.data;
            if(articles.length > 0) {
                for(var key in articles) {
                    if (articles[key].position == "first")
                        $scope.front[0] = articles[key];
                    else if(articles[key].position == "second")
                        $scope.front[1] = articles[key];
                    else if(articles[key].position == "third")
                        $scope.front[2] = articles[key];
                    else if(articles[key].position == "second")
                        $scope.front[3] = articles[key];
                }
            }
        });
    $scope.getPanelClass = function (section) {
        if(secToCol[section])
            return secToCol[section].class;
    };
    $scope.getPanelColor = function (section) {
        if(secToCol[section])
            return {"background-color":secToCol[section].foot};
    };
    $scope.goToArticle = function (id) {
        if(id)
            $location.path('article/'+id);
    };
});

mainApp.controller('articleCtrl', function($scope, $http, $location, $routeParams, $cookies) {
    $scope.articles = [];

    var urlList = apiUrl + "articles";
    if($routeParams.sortName)
        urlList += "/" + $routeParams.sortName;
    if($cookies.get("token"))
        urlList += "?token=" + $cookies.get("token");
    $http.get(urlList)
        .then(function(response) {
            if(response.data.length > 0)
                $scope.articles = response.data;
            else
                $scope.articles = [{title:"404", short:"Pas de contenu pour le moment... revenez plus tard ?",
                    section:"news", img:"assets/img/lost.png"}];
        }, function errorCallback() {
            $scope.articles = [{title:"404", short:"Pas de contenu pour le moment... revenez plus tard ?",
                section:"news", img:"assets/img/lost.png"}];
        });
    $scope.getPanelClass = function (section) {
        return secToCol[section].class;
    };
    $scope.getPanelColor = function (section) {
        return {"background-color":secToCol[section].foot};
    };
    $scope.goToArticle = function (id) {
        if(id)
            $location.path('article/'+id);
    };
});

mainApp.controller('detailArticleCtrl', function($scope, $http, $location, $routeParams) {
    if($routeParams.articleId){
        var urlDetail = apiUrl + "article/" + $routeParams.articleId;
        $http.get(urlDetail)
            .then(function(response) {
                if(response.data && response.data.author) //response.data.posted == "1"
                    $scope.article = response.data;
                else
                    $scope.article = {title:"404 Article not found."};
            }, function errorCallback() {
                $scope.article = {title:"404 Article not found."};
            });
        $scope.getColor = function(sec) {
            if(secToCol[sec])
                return {"border-color":secToCol[sec].hex};
        }
    }
    $scope.goEditArticle = function (id) {
        $location.path('article/edit/'+id);
    };
    $scope.article = {title:"Chargement..."};
});

mainApp.controller('newArticleCtrl', function($scope, $http, $timeout, $routeParams, $cookies, $location) {
    if(!$cookies.get("token"))
        $location.path("login");
    $scope.article = {
        title : "",
        section : "news",
        short : "",
        thumbnail : "",
        author : $cookies.get("login"),
        position : "hide"
    };
    $scope.save = {
        animation: false,
        text: "Enregistrer"
    };
    $scope.state = {
        draft : "btn-success",
        posted : "btn-default"
    };

    $scope.getCurrPanel = function() {
        return secToCol[$scope.article.section].class;
    };

    $scope.setSection = function (section) {
        $scope.article.section = section;
    };

    $scope.setPosted = function (state) {
        if(state){
            $scope.article.posted = true;
            $scope.state = {
                draft : "btn-default",
                posted : "btn-danger"
            };
        }
        else {
            $scope.article.posted = false;
            $scope.state = {
                draft : "btn-success",
                posted : "btn-default"
            };
        }
    };

    var url = apiUrl + "article" + "?token=" + $cookies.get("token");
    if($routeParams.articleId) {
            url = apiUrl + "article/" + $routeParams.articleId + "?token=" + $cookies.get("token");
        var urlDetail = apiUrl + "article/" + $routeParams.articleId;
        $scope.$on('tinymceOnLoad', function() {
            $http.get(urlDetail)
                .then(function(response) {
                    if(response.data && response.data.author){
                        $scope.article = response.data;
                        tinyMCE.activeEditor.setContent($scope.article.content);
                    }
                });
        });
    }
    $scope.save.func = function () {
        $scope.article.content = tinyMCE.activeEditor.getContent({format : 'raw'});
        console.log(url);
        $scope.save.text = "";
        $http.post(url, $.param(objFilter($scope.article, ["details", "date"], true)), postConfig)
            .then(function(response) {
                $timeout(function (){
                    $scope.save.text = "Enregistrer";
                }, 1000);
                if(response.data.id)
                    url = apiUrl + "article/" + response.data.id + "?token=" + $cookies.get("token");
                console.log(response.data);
            });
    };
    $scope.del = function() {
        //var urlDel = apiUrl + "article/delete/" + $routeParams.articleId + "?token=" + $cookies.get("token");
        $http.delete(url)
            .then(function(response) {
                $location.path('/');
                console.log(response.data);
            });
    };
});