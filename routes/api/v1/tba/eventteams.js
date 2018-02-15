async function execute(type, express, req, res, libs)
{
    res.set('Content-Type', 'application/json');
    if(!req.query.eventid)
    {
        res.status(400).send(JSON.stringify({"error":true,"message":"No eventid in request."}));
        return null;
    }
    var tagservice = libs["/frctag"];
    var libtba = libs["/libtba"];
    var apikey = libs["/consts"].apikey;
    var data = await libtba.makeRequest(apikey, "/event/"+req.query.eventid+"/teams");
    if(data["error"] == true)
    {
        res.status(500).send(data);
        return null;
    }
    res.send(data);
}
module.exports.execute = execute;