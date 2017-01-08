(function() {
    angular
        .module("JabongApp")
        .factory("network_service", ['$rootScope', '$http', 'EP', "$timeout", "$q", function($rootScope, $http, EP, $timeout, $q) {
            var server = EP.getAPIEndpoint(); // Use this for staging / production only
            var toQueryParams = function(queryObj, isFormPOST) {
                var query = "",
                    a = "";
                for (a in queryObj) {
                    if (typeof queryObj[a] === "object" && queryObj[a] !== null && queryObj[a].hasOwnProperty('length')) { // if Same parameter need to send multiple time 
                        var length = queryObj[a].length;
                        for (var i = 0; i < length; i++) {
                            if (queryObj[a][i] || queryObj[a][i] === 0) {
                                if (query === "") {
                                    query += a + "=" + encodeURIComponent(queryObj[a][i]);
                                } else {
                                    query += "&" + a + "=" + encodeURIComponent(queryObj[a][i]);
                                }
                            }
                        };
                    } else {
                        if (queryObj[a] !== '' && queryObj[a] !== null && queryObj[a] !== undefined) {
                            if (query === "") {
                                query += a + "=" + encodeURIComponent(queryObj[a]);
                            } else {
                                query += "&" + a + "=" + encodeURIComponent(queryObj[a]);
                            }
                        }
                    }
                }
                if (isFormPOST) {
                    return query;
                } else {
                    return query ? ("?" + query) : "";
                }

            }

            var getAPIEndpoint = function() {
                return server;
            };

            var getErrorMessage = function(response) {
                var error = {
                    statusCode: '',
                    errorMessage: '',
                }

                if (response.data && response.data.errorCode && response.data.errorMessage) {
                    error.statusCode = response.data.errorCode;
                    error.errorMessage = response.data.errorMessage;
                } else {
                    error.statusCode = response.status;
                    switch (response.status) {
                        case 400:
                            error.errorMessage = "Bad Request, Please check all the search parameters.";
                            break;
                        case 404:
                            error.errorMessage = "Oops!! Seems like sombody moved resource from server.";
                            break;
                        case 401:
                            error.errorMessage = "Seems, your session is expired. Please login again.";
                            break;
                        case 500:
                            error.errorMessage = "Oops!! Seems server not responding, Please try after some time.";
                            break;
                        default:
                            error.errorMessage = "Oops!! Something went wrong, Please try after some time.";
                    }
                }
                return error;
            };

            var GET = function(options) {
                var req = {
                    method: 'GET',
                    url: server + options.url + toQueryParams(options.params),
                    cache: options.cache ? options.cache : false,
                    timeout: options.canceller ? options.canceller : "",
                    no_loader: options.no_loader
                }
                var httpGET = $http(req).then(function(response) {
                    return response;
                }, function(response) {
                    if (!options.silent && !(options && options.ignore_errorCode && options.ignore_errorCode.indexOf(response.status) > -1)) {
                        var error = getErrorMessage(response);
                        if (options.url !== 'user' || response.errorCode === 500) {
                            $rootScope.showPopupMessage('error', 'Error Occured', error.errorMessage, ' Status Code: ' + error.statusCode);
                        }
                        if (error.statusCode === 401) {
                            $rootScope.user = {};
                            $rootScope.isAuthenticated = false;
                            localStorage.setItem('location', '');
                            window.location.href = "#login";
                        }
                    }
                    return response;
                });
                return httpGET;
            };

            var POST = function(options) {
                var req = {
                        method: 'POST',
                        url: server + options.url,
                        data: options.data,
                        timeout: options.canceller ? options.canceller : "",
                        no_loader: options.no_loader
                    }
                    // login API expects url encoded form data
                if (options['formPOST'] == true) {
                    req.data = toQueryParams(options.data, true);
                    req.headers = {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    };
                }
                if (options['multipart'] == true) {
                    req.headers = {
                        'Content-Type': undefined
                    };
                }
                return $http(req).then(function(response) {
                    return response;
                }, function(response) {
                    if (!options.silent && !(options && options.ignore_errorCode && options.ignore_errorCode.indexOf(response.status) > -1)) {
                        var error = getErrorMessage(response);
                        $rootScope.showPopupMessage('error', 'Error Occured', error.errorMessage, ' Status Code: ' + error.statusCode);
                        if (error.statusCode === 401) {
                            $rootScope.user = {};
                            $rootScope.isAuthenticated = false;
                            localStorage.setItem('location', '');
                            window.location.href = "#login";
                        }
                    }
                    return response;
                });
            };

            return {
                GET: GET,
                POST: POST,
                getErrorMessage: getErrorMessage,
                getAPIEndpoint: getAPIEndpoint,
                toQueryParams: toQueryParams
            };
        }])
}());