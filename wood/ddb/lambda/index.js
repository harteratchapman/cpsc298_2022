// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-1'});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


async function listTables(){
  try {
      // Call DynamoDB to retrieve the list of tables
      let result = await ddb.listTables({Limit: 10}).promise();
      return result;
  } catch (err) {
    return err;
  }
}

async function createItem(){
  const params = {
  TableName : 'io1',
  Item: {
     'uname': {S: 'wood2'},
     'uid': {S: '1243'},
     'price': {S:'100.00'},
    }
  }
  
  try {
    let result = await ddb.putItem(params).promise();
    return result;
  } catch (err) {
    return err;
  }
}

async function listItems() {
    const params = {
        TableName: "io1",
    };

    let scanResults = [];
    let items = [];
    do{
        items =  await ddb.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    } while(typeof items.LastEvaluatedKey !== "undefined");
    
    return scanResults;
}

exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    
    console.log("I'm listing tables");
    let tables_result = await listTables();
    console.log("tables_result = "+JSON.stringify(tables_result));

    // this is a sample, uncomment to create a new item
/*
    try {
      let create_result = await createItem();
      console.log("result = "+JSON.stringify(create_result));
      return { body: 'Successfully created item!' }
    } catch (err) {
      return { error: err }
    }
*/

    try {
      let list_result = await listItems();
      console.log("result = "+JSON.stringify(list_result));
      return { body: JSON.stringify(list_result) }
    } catch (err) {
      return { error: err }
    }

    console.log("lambda done");
    

  return response;
};
