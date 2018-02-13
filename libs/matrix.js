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
<<<<<<< HEAD
    routes["/"] = routes["/"+config.root]
=======
    routes["/"] = routes["/"+config.root];
>>>>>>> ac78fc7c01c96e903b497a08f7b5a02202e21946
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
<<<<<<< HEAD
    app.use('/static', require("express").static('static'));
=======
    app.use('/static', require("express").static('static'))
>>>>>>> ac78fc7c01c96e903b497a08f7b5a02202e21946
    console.log("matrix: loaded all routes");
}
module.exports.initMatrix = initMatrix;
module.exports.config = config;
module.exports.routes = routes;
module.exports.readroutes = getroutes;