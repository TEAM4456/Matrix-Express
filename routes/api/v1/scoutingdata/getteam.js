async function execute(type, express, req, res, libs)
{
    res.set('Content-Type', 'application/json');
    var key = req.query.key;
    if(!key) {
        res.status(400).send({"error":true,"message":"Key missing from query."});
    }
    else {
        var db = libs["/database"];
        res.send(await db.getTeam(key));
    }
}
module.exports.execute = execute;