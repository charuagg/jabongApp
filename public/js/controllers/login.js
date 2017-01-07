(function() {
    angular
        .module("JabongApp")
        .controller("loginCtrl", ['$scope', 'network_service', '$rootScope', '$http',
            function($scope, network_service, $RS, $http) {
                $scope.username = "";
                $scope.password = "";

                $scope.loginUser = function() {
                    var data = {
                        'username': $scope.username,
                        'password': $scope.password
                    };
                    network_service.POST({
                        url: 'login',
                        data: data,
                        formPOST: true
                    }).then(function(response) {
                        if (response.status === 200) {
                            var flag = 0;
                            for (var i in response.data.roles) {
                                if (response.data.roles[i] == "category_panel" || response.data.roles[i] == "kam_panel" || response.data.roles[i] == "mapping_panel") {
                                    flag = 1;
                                }
                            }
                            if (flag == 0 || response.data.allowedSubCategories.length <= 0) {
                                $scope.showPopupMessage('error', 'Permission Denied !!', "Kindly Take Permission First", '');
                            } else {
                                $scope.setUserData(response.data);
                            }
                        }
                    });
                };
            }
        ]);
}());
