async function execute(type, express, req, res, libs)
{
    res.set('Content-Type', 'application/json');
    if(!req.query.teamid && !req.query.teamtag)
    {
        res.status(400).send(JSON.stringify({"error":true,"message":"No teamtag or teamid in request."}));
        return null;
    }
    var tagservice = libs["/frctag"];
    var libtba = libs["/libtba"];
    var apikey = libs["/consts"].apikey;
    var tag = await tagservice.createTag(req.query.teamtag, req.query.teamid);
    if(tag == "frc0")
    {
        res.status(400).send(JSON.stringify({"error":true,"message":"Team tag or ID invalid."}));
        return null;
    }
    var data = await libtba.makeRequest(apikey, "/team/"+tag+"/districts");
    if(data["error"] == true)
    {
        res.status(500).send(data);
        return null;
    }
    res.send(data);
}
module.exports.execute = execute;