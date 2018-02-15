async function execute(type, express, req, res, libs)
{
    res.set('Content-Type', 'application/json');
    if((!req.query.teamid && !req.query.teamtag) || !req.query.year)
    {
        res.status(400).send(JSON.stringify({"error":true,"message":"No teamtag, year, teamid in request."}));
        return null;
    }
    if(isNaN(req.query.year))
    {
        res.status(400).send(JSON.stringify({"error":true,"message":"Not a valid year"}));
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
    var data = await libtba.makeRequest(apikey, "/team/"+tag+"/events/"+req.query.year);
    if(data["error"] == true)
    {
        res.status(500).send(data);
        return null;
    }
    res.send(data);
}
module.exports.execute = execute;