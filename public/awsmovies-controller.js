angular.module('AWSMoviesApp', [])
    .controller('AWSMoviesController', function($scope, $http) {

        $scope.SearchMovies = function() {
            var params = {
                year: $scope.searchTermParam
            };

            var config = {
                params: params
            };

            console.log($scope.searchTermParam);
            //REST GET Call to the Node.JS server which will in turn call
            //the MarkLogic database javascript api.
            $http.get("/search", config)
                .success(function(data, status, headers, config) {
                    // The $http service automatically converts the response to a
                    // JavaScript object whenever it sees that it looks 
                    // like a JSON string.
                    $scope.MovieSearchResults = "";
                    $scope.MovieSearchRawResults = "";
                    data.Items.forEach(function(item) {
                        $scope.MovieSearchResults += " -" + item.year + ": " + item.title + "\n";
                        $scope.MovieSearchRawResults += JSON.stringify(item, null, 4) + "\n-------\n";
                        //console.log(" -", item.year + ": " + item.title);
                    });

                })

            .error(function(data, status, headers, config) {
                $scope.movies = logResult("GET ERROR", data, status, headers, config);
            });

        };

        $scope.LoadMovies = function() {

            var params = {
                dir: "D:/DEV/aneml-master/aneml-master/setup/tweet-data"
            };

            var config = {
                params: params
            };
            var destDoc, sourceDoc, sourceFolder, newLayer;

            console.log("Loading the movies BRO!");

            $http.get("/load", config)
                .success(function(data, status, headers, config) {
                    // The $http service automatically converts the response to a
                    // JavaScript object whenever it sees that it looks 
                    // like a JSON string.
                    //console.log(" -", item.year + ": " + item.title);

                })

            .error(function(data, status, headers, config) {
                $scope.movies = "ERROR";
                //$scope.movies = logResult("GET ERROR", data, status, headers, config);
            });
        };

    }); //end