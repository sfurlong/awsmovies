module.exports = {


    search: function(searchTerm, callback) {
        var AWS = require("aws-sdk");

        //need to update region in config
        AWS.config.update({
            region: "us-east-1"
        });

        var dynamoDB = new AWS.DynamoDB.DocumentClient();

        console.log("!!!Querying for movies from ." + searchTerm);

        var params = {
            TableName: "Movies",
            KeyConditionExpression: "#yr = :yyyy",
            ExpressionAttributeNames: {
                "#yr": "year"
            },
            ExpressionAttributeValues: {
                ":yyyy": searchTerm
            }
        };

        dynamoDB.query(params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                return callback(JSON.stringify(err, null, 4));
            } else {
                console.log("Query succeeded.");
                data.Items.forEach(function(item) {
                    //console.log(" -", item.year + ": " + item.title);
                });
                return callback(JSON.stringify(data, null, 4));
            }
        });

    },

    err: function(error) {
        console.log("ERROR");
    }
};