var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
var env = require('node-env-file');
var unmarshalItem = require('dynamodb-marshaler').unmarshalItem;

//Load .env file with AWS key and secret
env(__dirname + '/../.env');

var awskey = process.env.AWS_ACCESS_KEY_ID
var awssecret = process.env.AWS_SECRET_ACCESS_KEY

//update AWS config
AWS.config.update({
    accessKeyId: awskey,
    secretAccessKey: awssecret,
    region: "us-east-1",
});

/* GET secret from dynamodb. */
router.get('/', function(req, res, next) {
    var dynamodb = new AWS.DynamoDB;

    console.log("Im theDoctor, Im the leakmaster!");

   var data = dynamodb.scan({ // Scan the data from DynamoDB
        TableName: 'devops-challenge'
    }, function(err, data) {
        // data.Items = [{username: {S: 'nackjicholson'}] 
        items = data.Items.map(unmarshalItem);
        //console.log(items); // For Debug

        // Now that we got the items, lest search for the correct one.
        var lookupval = 'thedoctor';

        // iterate over each element in the array
        for (var i = 0; i < items.length; i++) {
            // look for the entry with a matching value
            if (items[i].code_name == lookupval) {
                // item found, lets send 
                res.json(items[i]) ;
            } 
        }
    });
	// res.setHeader('Content-Type', 'application/json');
    
});

module.exports = router;