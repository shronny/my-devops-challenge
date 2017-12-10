var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
var env = require('node-env-file');
var unmarshalItem = require('dynamodb-marshaler').unmarshalItem;


AWS.config.update({
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
        res.json(items[0]);
    });
	// res.setHeader('Content-Type', 'application/json');
    
});

module.exports = router;