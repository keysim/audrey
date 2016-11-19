mainApp.directive("footer", function(){
    return {
        restrict : "E",
        templateUrl : "views/partials/footer.html",
        controller: "footerController as footer"
    };
});

mainApp.controller('footerController', function($rootScope, $scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});