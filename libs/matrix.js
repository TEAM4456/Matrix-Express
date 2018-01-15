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
var addplugin = function(name)
{
    if(!fs.existsSync("../plugins/"+name+".js"))
    {
        console.log("matrix: error adding plugin "+name+": file does not exist.");
    }
    plugins[name] = require("../plugins/"+name+".js")
}
var removeplugin = function(name)
{
    if(plugins[name])
    {
        delete plugins[name];
    }
    else
    {
        console.log("matrix: error removing plugin "+name+": plugin did not exist.")
    }
}
var addlib = function(name)
{
    if(!fs.existsSync("../libs/"+name+".js"))
    {
        console.log("matrix: error adding library "+name+": file does not exist.");
    }
    plugins[name] = require("../libs/"+name+".js")
}
var removelib = function(name)
{
    if(libs[name])
    {
        delete libs[name];
    }
    else
    {
        console.log("matrix: error removing library "+name+": library did not exist.")
    }
}
var reloadPlugins = function()
{
    plugins = {}
    var load = require('./load.js');
    plugins = load("./plugins");
}
var initMatrix = function()
{
    direxists("./plugins");
    direxists("./libs");
    var load = require('./load.js');
    plugins = load("./plugins");
    console.log("matrix: loaded all plugins");
    libs = load("./libs");
    console.log("matrix: loaded all libraries");
}
var commandLogic = function(message, client)
{
    var msg = require('./'+config.filter)(message,config.prefix);
    // if message is filtered, kill it
    if(msg == null)
    {
        return null;
    }
    var splitString = msg.content.split(" ");
    var command = splitString[0];
    command = command.replace(config.prefix,"");
    if(plugins[command])
    {
        try {
            plugins[command].execute(command, msg, client, libs);
        }
        catch(err){
            message.reply("Error running command.");
            console.log(err);
        }
    }
    else
    {
        message.channel.send("**Insufficient permissions or command not found**.")
    }
}
module.exports.commandLogic = commandLogic;
module.exports.initMatrix = initMatrix;
module.exports.config = config;
module.exports.reloadPlugins = reloadPlugins;
module.exports.plugins = plugins;
module.exports.readPlugins = getplugins;