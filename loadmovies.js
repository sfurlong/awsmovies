/*********************************
Simple Demo for loading files into
DynamoDB.
**********************************/

//package to read json files
//var jsonfile = require('jsonfile');
//AWS node sdk
var AWS = require('aws-sdk');
var fs = require('fs');

var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

//need to update region in config
AWS.config.update({
    region: "us-east-1"
});

//create a doc client to allow using JSON directly
var docClient = new AWS.DynamoDB.DocumentClient();
console.log("Importing movies into DynamoDB. Please wait.");

var allMovies = JSON.parse(fs.readFileSync('./setup/moviedata.json', 'utf8'));
allMovies.forEach(function(movie) {
    var params = {
        TableName: "Movies",
        Item: {
            "year":  movie.year,
            "title": movie.title,
            "info":  movie.info
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", movie.title);
       }
    });
});
