var request = require("request-promise-native");
async function makeRequest(apikey, endpoint, body=null)
{
    var options = {
        uri: 'https://www.thebluealliance.com/api/v3'+endpoint,
        headers: {
            'User-Agent': 'Scouting-Backend/ (libtba, v1)',
            'X-TBA-Auth-Key': apikey
        },
        json: true
    };
    if(body)
    {
        options["body"] = body;
    }
    var r;
    try
    {
        r = await request(options);
    }
    catch(err)
    {
        return {"error":true,"message":String(err)};
    }
    return {"error": false, "data": r};
}
module.exports.makeRequest = makeRequest;