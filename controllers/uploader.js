mainApp.controller('uploadCtrl', function($scope, $http, $cookies, Upload) {
    $scope.loader = false;
    $scope.uploadFiles = function(file, errFiles) {
        $scope.loader = false;
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: apiUrl + "upload" + "?token=" + $cookies.get("token"),
                data: {img: file}
            });
            file.upload.then(function (response) {
                /*$timeout(function () {
                    file.result = response.data;
                });*/
                $scope.loader = false;
                if(response.data.path){
                    $scope.$parent.article.thumbnail = response.data.thumbnail;
                }
                console.log(response.data);
            });
        }
        else
            $scope.loader = false;
    };
    $scope.setLoader = function () {
        $scope.loader = true;
    };
});