
exports.handler = async (event) => {
    // this is extra handy debugging so you can see how different systems (browser, curl, api_gateway) call this function
    console.log("json = "+JSON.stringify(event));
    
    var device_id = null;
    
    if (event.routeKey.endsWith('/device/{device_id}')) {
        console.log('got a routekey ending in /device/{device_id}')
        if (event.requestContext.http.method=='GET') {
            if (('queryStringParameters' in event) && ('device_id' in event.queryStringParameters)) {
                device_id = event.queryStringParameters.device_id;
            } else if (('pathParameters' in event) && ('device_id' in event.pathParameters)) {
                device_id = event.pathParameters.device_id
            }
            
            if (device_id==null) {
                // return the complete list of devices
                const response = {
                    statusCode: 200,
                    body: JSON.stringify({'status': 'success',
                                          'result': [{'device_id':1,'description':'the first device'},{'device_id':2,'description':'the second device'}]})
                };
                return response
            } else {
                const response = {
                    statusCode: 200,
                    body: JSON.stringify({'status': 'success',
                                          'result': [{'device_id':device_id,'description':'dummy return data for device:'+device_id}]})
                }
                return response;
            }
        } else if (event.requestContext.http.method=='POST') {
            console.log("It's a POST")
            const response = {
                statusCode: 200,
                isBase64Encoded: false,
                headers: {      
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'status': 'success',
                                      'result': [{'device_id':42}]})
            };
            console.log("responding to POST with: "+JSON.stringify(response))
            return response;
        }
    } // routeKey device/{device_id}
    
    console.log("not a routeKey dveice: "+event.routeKey);
    //let body = {};
    /*
    if (event.body !== null && event.body !== undefined) {
            body = JSON.parse(event.body)
    }
    */
    if (event.requestContext.http.method=="POST") {
        const response = {
            statusCode: 200,
            body: 'POST received! for endpoint: '+event.routeKey
        };
        return response 
    } else if (event.requestContext.http.method=="GET") {
        const response = {
            statusCode: 200,
            body: 'Hello from Lambda endpoint: '+event.routeKey
        };
        return response
    }  else if (event.requestContext.http.method=="OPTIONS") {
        const response = {
            statusCode: 200,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            //'Access-Control-Expose-Headers': 'Content-Type,x-api-key,X-Amz-Date,Authorization,x-api-key,x-amz-security-token,Auth',
            'Access-Control-Allow-Headers': 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization',
            'Content-Type': 'application/json',
            body: 'Options allowed: '+event.routeKey
        };
        console.log('returning OPTIONS')
        return response
    } 

    // Invalid response
    const response = {
        statusCode: 400,
        body: 'Invalid method '+event.requestContext.http.method
    };
    return response;
};
