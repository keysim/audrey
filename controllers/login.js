mainApp.controller('loginCtrl', function($scope, $http, $timeout, $cookies, $location, $window) {
    $scope.loginBtn = "Login";
    $scope.loginClass = "btn-primary";
    $scope.log = function() {
        console.log("login...");
        $scope.loginBtn = "<div class='login_anim'></div>";
        //console.log($scope.login, $scope.pwd);
        console.log($scope.login);
        var data = {password: $scope.pwd, login: $scope.login};
        $http.post(apiUrl + "authenticate", $.param(data), postConfig).then(function(res){
            console.log(res.data);
            $timeout(function() { // fake loading
                $scope.loginClass = "btn-primary login_out"; // Login fadeOut
                $timeout(function() {
                    if (!res.data.success) { // error
                        $scope.loginClass = "btn-danger login_in"; // Error fadeIn
                        $scope.loginBtn = res.data.message;
                        $timeout(function () {
                            $scope.loginClass = "btn-danger login_out";
                            $timeout(function () {
                                $scope.loginBtn = "Login";
                                $scope.loginClass = "btn-primary login_in";
                            }, 300);
                        }, 500);
                    }
                    else {
                        $scope.loginClass = "btn-success login_in";
                        $scope.loginBtn = "Welcome " + $scope.login;
                        $cookies.put("token", res.data.token);
                        $cookies.put("login", $scope.login);
                        $timeout(function () {
                            $window.location.href = "./";
                        }, 400);
                    }
                }, 300);
            }, 800);
        });
    };
});