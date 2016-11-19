var mainApp = angular.module("mainApp", ['ngRoute', 'ui.tinymce', 'ngFileUpload', 'ui.bootstrap', 'ui.bootstrap.tooltip', 'ui.bootstrap.modal', 'ngCookies']);
var apiUrl = "http://lewogona.com:3000/api/";
var postConfig = {headers : {'Content-Type': 'application/x-www-form-urlencoded'}}; //;charset=utf-8;

mainApp.controller('mainController', ['$rootScope', '$scope', '$http', '$window', function($rootScope, $scope) { // id "aaa" is press, admin panel is launch
    var admin = 0;
    $scope.admin = function(e) {
        if(e.keyCode == 65) // 'a'
            admin++;
        else
            admin = 0;
        if(admin >= 3) {
            $windoww.location.href = "login";
            admin = 0;
        }
    };
}]);

angular.module('mainApp')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);