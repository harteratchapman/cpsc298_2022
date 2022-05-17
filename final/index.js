
// since javascript doesn't have a seeded random, use this clever fix.
// https://stackoverflow.com/a/23304189/14866475
var seed = 1;
global.random = () => {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

global.randstr = (len) => {
    /* alphabet: [a-z0-9] */
    const  alphabet="abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$^&*()+";
    let retstr = "";
    for (let i=0;i<len;i++) {
        retstr += alphabet[Math.round(global.random()*alphabet.length)];
    }
    return retstr;
}

exports.handler = async (event) => {
    // this is extra handy debugging so you can see how different systems (browser, curl, api_gateway) call this function
    console.log("json event = "+JSON.stringify(event));

    seed = event.seed;

    let resp = {"a": global.randstr(8),
            "b": global.randstr(8),
            "c": global.randstr(8)}
            
    console.log(resp.a);
    console.log(resp.b);
    console.log(resp.c);
    
    return JSON.stringify(resp);
}

