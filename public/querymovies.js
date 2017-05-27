module.exports = { 

    search: function(searchTerm, callback) {
        var AWS = require("aws-sdk");

        //need to update region in config
        AWS.config.update({
            region: "us-east-1"
        });

        var docClient = new AWS.DynamoDB.DocumentClient();

        console.log("Querying for movies from 1985.");

        var params = {
            TableName : "Movies",
            KeyConditionExpression: "#yr = :yyyy",
            ExpressionAttributeNames:{
                "#yr": "year"
            },
            ExpressionAttributeValues: {
                ":yyyy":1985
            }
        };

        docClient.query(params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                data.Items.forEach(function(item) {
                    console.log(" -", item.year + ": " + item.title);
                });
            }
        });

 },

      err: function(error) {
        console.log("ERROR");
  }


};