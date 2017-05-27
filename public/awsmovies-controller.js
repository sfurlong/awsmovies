angular.module('AWSMoviesApp', [])
      .controller('HelloUserController', function($scope, $http) {
          $scope.NameChange = function () {
              $scope.greeting = "Hello " + $scope.name;
          };


          $scope.SearchMovies = function () {
          	  var ret = "";

			  var params = {
		        year: $scope.searchTermParam
		      };

		      var config = {
		        params: params
		      };


          	  console.log($scope.searchTermParam);
			  //REST GET Call to the Node.JS server which will in turn call
		      //the MarkLogic database javascript api.
		      $http.get("http://localhost:3000/search", config)
		        .success(function(data, status, headers, config) {
		          	// The $http service automatically converts the response to a
		          	// JavaScript object whenever it sees that it looks 
		          	// like a JSON string.
		          	$scope.MovieSearchResults = "";
		          	$scope.MovieSearchRawResults = "";
  					data.Items.forEach(function(item) {
	                    $scope.MovieSearchResults += " -" + item.year + ": " + item.title + "\n";
	                    $scope.MovieSearchRawResults += JSON.stringify(item, null, 4) + "\n\n";
	                    //console.log(" -", item.year + ": " + item.title);
	                });

		          	//$scope.getRawSearchTweetResults = jsonFilter(data);
		        })

		        .error(function(data, status, headers, config) {
		          $scope.movies = logResult("GET ERROR", data, status, headers, config);
		        });

          };

      });