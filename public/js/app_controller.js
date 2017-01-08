(function() {
    angular
        .module("JabongApp")
        .controller('JabongAppCtrl', ['$scope', '$rootScope', '$location', 'network_service', '$log', '$http', '$timeout',
            function($scope, $RS, $location, network_service, $log, $http, $timeout) {
                var _this = this;
                $scope.isLoading = 0;


                $scope.data = {};

                $scope.popUpMessageDetails = {};
                $scope.popUpMessageDetails.typeOfMessage = {};
                $scope.popUpMessageDetails.message = {};
                $scope.popUpMessageDetails.tittle = {};
                $scope.popUpMessageDetails.statusCode = {};
                $RS.isAuthenticated = true;

                
                $scope.init = function() {
                    $location.path('/catalog');
                };  

                $RS.showLoading = function() {
                    $("#preloaderdiv").css('top', window.pageYOffset + "px");
                    $scope.isLoading = $scope.isLoading + 1;
                    $("body", "html").css('overflow', 'hidden');
                };

                $RS.hideLoading = function() {
                    $scope.isLoading = ($scope.isLoading === 0) ? 0 : ($scope.isLoading - 1);
                    if ($scope.isLoading === 0)
                        $("body", "html").css('overflow', 'auto');
                };

                $RS.showPopupMessage = function(type, title, message, statusCode, closeCallback) {
                    $scope.popUpMessageDetails.typeOfMessage = type;
                    $scope.popUpMessageDetails.message = message;
                    $scope.popUpMessageDetails.tittle = title;
                    // $scope.popUpMessageDetails.statusCode = statusCode;
                    $scope.popUpMessageDetails.closeCallback = closeCallback;
                    var errorOBj = {
                        Type: type,
                        Title: title,
                        Message: message,
                        StatusCode: statusCode
                    };
                    // console.log("Error Object : " + JSON.stringify(errorOBj));
                    $('#popUpMessage').modal('show');
                }

                $RS.hidePopupMessage = function() {
                    $('#popUpMessage').modal('hide');
                    $timeout(function() {
                        if ($scope.popUpMessageDetails.closeCallback) {
                            $scope.popUpMessageDetails.closeCallback();
                        }
                    }, 200);
                }

                $RS.MatchshowPopupMessage = function(type, tittle, message, statusCode) {
                    $scope.popUpMessageDetails.typeOfMessage = type;
                    $scope.popUpMessageDetails.message = message;
                    $scope.popUpMessageDetails.tittle = tittle;
                    $scope.popUpMessageDetails.statusCode = statusCode;
                    $('#MatchpopUpMessage').modal('show');
                }

                $RS.MatchhidePopupMessage = function() {
                    $('#MatchpopUpMessage').modal('hide');
                }

                $scope.toObject = function(arr) {
                    var rv = {};
                    for (var i = 0; i < arr.length; ++i) {
                        rv[arr[i]] = true;
                    }
                    return rv;
                };

                $scope.init();
            }
        ]);
})();