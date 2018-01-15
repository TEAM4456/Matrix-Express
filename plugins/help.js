var exclusions =
[
    //Insert commands to exclude here
]
var execute = function(command,message,client,libs)
{
    var mx = libs["matrix"];
    var ch = message.channel;
    var helpstr = "```\nMatrixV2 command list:\n";
    Object.keys(mx.readPlugins()).forEach(function(key)
    {
        //is key excluded
        if(exclusions.indexOf(key) == -1)
        {
            helpstr = helpstr + key + "\n"
        }
    });
    helpstr = helpstr + "```"
    ch.send(helpstr)
}
module.exports.execute = execute;