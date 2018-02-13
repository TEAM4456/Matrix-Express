var execute = async function(type, express, req, res, libs)
{
    var teamtag = "frc0";
    res.set('Content-Type', 'application/json');
    // INPUT VERIFICATION BLOCK
    if(!req.query.teamid && !req.query.teamtag)
    {
        res.status(400).send(JSON.stringify({"error": true, "message": "Team ID or Team Tag not included in request."}));
        return null;
    }
    if(req.query.teamtag)
    {
        if(isNaN(req.query.teamtag.replace('frc', '')))
        {
            res.status(400).send(JSON.stringify({"error": true, "message": "Team tag is not valid."}));
            return null;
        }
        teamtag = req.query.teamtag;
    }
    else if(req.query.teamid)
    {
        if(isNaN(req.query.teamid))
        {
            res.status(400).send(JSON.stringify({"error": true, "message": "Team ID is not a number."}));
            return null;
        }
        teamtag = "frc"+req.query.teamid;
    }
    // END INPUT VERIFICATION BLOCK
    var request = require("request-promise-native");
    var apikey = libs["/consts"].apikey;
    var options = {
        uri: 'https://www.thebluealliance.com/api/v3/team/'+teamtag,
        headers: {
            'User-Agent': 'Scouting-Backend',
            'X-TBA-Auth-Key': apikey
        },
        json: true
    };
    var r;
    try
    {
        r = await request(options);
    }
    catch(err)
    {
        res.status(500).send(JSON.stringify({"error":true,"message":String(err)}));
        return null;
    }
    res.status(200).send(JSON.stringify({"error": false, "data": r}));
}
module.exports.execute = execute;