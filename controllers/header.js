mainApp.directive("header", function(){
    return {
        restrict : "E",
        templateUrl : "views/partials/header.html",
        controller: "headerController as header"
    };
});

var secToCol = {
    news:{class:"panel-default", hex:"#AAB2BD", foot:"rgb(255, 255, 255)"},
    various:{class:"panel-success", hex:"#8CC152", foot:"rgb(210, 255, 123)"},
    old:{class:"panel-warning", hex:"#F6BB42", foot:"rgb(255, 255, 99)"},
    inOut:{class:"panel-danger", hex:"#DA4453", foot:"rgb(255, 102, 125)"},
    videos:{class:"panel-info", hex:"#37BC9B", foot:"rgb(83, 255, 233)"}
};

mainApp.controller('headerController', function($rootScope, $scope, $location, $cookies, $window) {
    $scope.login = $cookies.get("login");
    $scope.getBack = function (section) {
        if($location.path() === "/" + section)
            return {"background-color":secToCol[section].hex, color:"#FFFFFF"};
        else if($location.path() === "/us" && section == "/us"
            || $location.path() === "/" && section == "/home")
            return {"background-color": "#000000", color:"#FFFFFF"};
    };
    $scope.disconnect = function() {
        if($cookies.get("login")){
            console.log("LOGIN DELETED");
            $cookies.remove("token", { path: '/audrey/' });
            $cookies.remove("login", { path: '/audrey/' });
        }
        $window.location.href = "login";
    };
});