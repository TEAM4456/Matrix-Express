var fs = require('fs');
var config = require('../config.json');
var plugins = {};
var libs = {};
var direxists = function(path)
{
    if(!fs.existsSync(path))
    {
        fs.mkdirSync(path);
        console.log("matrix: created required directory "+path);
    }
}
var getplugins = function()
{
    return plugins;
}
var getlibs = function()
{
    return libs;
}
var reloadPlugins = function()
{
    plugins = {}
    var load = require('./load.js');
    plugins = load("./plugins");
}
var initMatrix = function(app)
{
    direxists("./plugins");
    direxists("./libs");
    var load = require('./load.js');
    libs = load("./libs", app);
    console.log("matrix: loaded all libraries");
    plugins = load("./plugins", app);
    plugins["/"] = plugins["/"+config.root]
    plugins["/"+config.root] = undefined;
    Object.keys(plugins).forEach(plugin =>
    {
        app.route(plugin)
        .get(function (req, res) {
            plugins[plugin].execute("get", app, req, res, libs);
        })
        .post(function (req, res) {
            plugins[plugin].execute("post", app, req, res, libs);
        })
        .put(function (req, res) {
            plugins[plugin].execute("put", app, req, res, libs);
        });
    });
    console.log("matrix: loaded all plugins");
}
module.exports.initMatrix = initMatrix;
module.exports.config = config;
module.exports.plugins = plugins;
module.exports.readPlugins = getplugins;