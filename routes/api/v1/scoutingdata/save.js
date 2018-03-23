async function execute(type, express, req, res, libs)
{
    res.set('Content-Type', 'application/json');
    var matches = req.body.matches;
    var key = req.body.key;
    if(!key || !matches) {
        res.status(400).send({"error":true,"message":"Key or matches missing from body. Please send data in format of {\"key\":\"frc4456\",\"matches\":[]}"});
    }
    else {
        var db = libs["/database"];
        res.send(await db.updateTeam(key, matches));
    }
}
module.exports.execute = execute;