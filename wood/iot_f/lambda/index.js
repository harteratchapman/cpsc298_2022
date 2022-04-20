
// working curl command
// curl -X POST -H "Content-Type: application/json" -d '{"name":"1x"}' https://my_api_gateway_url/default/iot_f
exports.handler = async (event) => {
    console.log("event keys="+Object.keys(event));
    console.log("event rrawQueryString="+event.rawQueryString);
    console.log("event queryStringParameters="+JSON.stringify(event.queryStringParameters));
    console.log("json = "+JSON.stringify(event));
    var rawbody = Buffer.from(event.body, 'base64').toString('ascii');
    console.log("decoded body = "+rawbody);
    let body = {};
    /*
    if (event.body !== null && event.body !== undefined) {
            body = JSON.parse(event.body)
    }
    */
    if (event.requestContext.http.method=="POST") {
        const response = {
            statusCode: 200,
            body: 'POST received!<br/>'+body+'<br/>keys='+Object.keys(body)
        };
        return response 
    } else if (event.requestContext.http.method=="GET") {
        const response = {
            statusCode: 200,
            body: 'Hello from Lambda!<br/>'+body+'<br/>keys='+Object.keys(body)
        };
        return response
    }

    // Invalid response
    const response = {
        statusCode: 400,
        body: 'Invalid method '+event.requestContext.http.method
    };
    return response;
};
