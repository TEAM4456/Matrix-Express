var execute = function(type, express, req, res, libs)
{
    res.set('Content-Type', 'application/json');
    res.send("{\"error\":\"no root\"}");
}
module.exports.execute = execute;