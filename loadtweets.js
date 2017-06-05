// JavaScript Document
//Set up vairaibles
module.exports = {

    loadTweets: function(dir, callback) {

        console.log("Data Directory: " + dir);


        var filesystem = require("fs");
        var results = [];

        filesystem.readdirSync(dir).forEach(function(file) {

            file = dir + '/' + file;
            var stat = filesystem.statSync(file);

            if (stat && stat.isDirectory()) {
                results = results.concat(_getAllFilesFromFolder(file))
            } else {
                var tweet = JSON.parse(filesystem.readFileSync(file, 'utf8'));
                results.push(tweet);
                console.log(tweet);
            }
        });

        console.log("!!!Loaded Data!!");

    }
};