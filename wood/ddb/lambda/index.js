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
     uname: 'wood',
     uid: '1234',
     price: 100.00
    }
  }
  
  try {
    console.log("calling ddb put params");
    let result = await ddb.put(params).promise().promise();
    return result;
  } catch (err) {
    return err;
  }
}

exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    
    console.log("I'm listing tables");
    let await_result = await listTables();
    console.log("await_result = "+JSON.stringify(await_result));

    try {
      let create_result = await createItem();
      console.log("result = "+JSON.stringify(create_result));
      return { body: 'Successfully created item!' }
    } catch (err) {
      return { error: err }
    }
    
    console.log("lambda done");

  return response;
};
