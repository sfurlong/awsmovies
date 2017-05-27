var ret = "";

module.exports = { 


    search: function(searchTerm, callback) {
        var AWS = require("aws-sdk");

        ret = "";

        //need to update region in config
        AWS.config.update({
            region: "us-east-1"
        });

        var docClient = new AWS.DynamoDB.DocumentClient();

        console.log("Querying for movies from ." + searchTerm);

        var params = {
            TableName : "Movies",
            KeyConditionExpression: "#yr = :yyyy",
            ExpressionAttributeNames:{
                "#yr": "year"
            },
            ExpressionAttributeValues: {
                ":yyyy":searchTerm
            }
        };

        docClient.query(params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                console.log("Query succeeded.");
                data.Items.forEach(function(item) {
                    ret = ret + " -" + item.year + ": " + item.title + "<br>";
                    //ret = ret + item;
                    //console.log(" -", item.year + ": " + item.title);
                });
//                console.log(ret);
//                return callback(ret);
                //console.log(JSON.stringify(data, null, 4));
                return callback(JSON.stringify(data, null, 4));
            }
        });

    },

    err: function(error) {
      console.log("ERROR");
    }
};