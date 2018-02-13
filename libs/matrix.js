var fs = require('fs');
var config = require('../config.json');
var routes = {};
var libs = {};
var direxists = function(path)
{
    if(!fs.existsSync(path))
    {
        fs.mkdirSync(path);
        console.log("matrix: created required directory "+path);
    }
}
var getroutes = function()
{
    return routes;
}
var getlibs = function()
{
    return libs;
}
var initMatrix = function(app)
{
    direxists("./routes");
    direxists("./libs");
    var load = require('./load.js');
    libs = load("./libs", app);
    console.log("matrix: loaded all libraries");
    routes = load("./routes", app);
    routes["/"] = routes["/"+config.root]
    delete routes["/"+config.root];
    Object.keys(routes).forEach(route =>
    {
        app.route(route)
        .get(function (req, res) {
            routes[route].execute("get", app, req, res, libs);
        })
        .post(function (req, res) {
            routes[route].execute("post", app, req, res, libs);
        })
        .put(function (req, res) {
            routes[route].execute("put", app, req, res, libs);
        });
    });
    app.use('/static', require("express").static('static'));
    console.log("matrix: loaded all routes");
}
module.exports.initMatrix = initMatrix;
module.exports.config = config;
module.exports.routes = routes;
module.exports.readroutes = getroutes;