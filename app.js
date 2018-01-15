var matrix = require("./libs/matrix.js");
const dsscord = require('discord.js');
const discord = new dsscord.Client();
matrix.initMatrix();
discord.on('ready', () => {
    discord.user.setGame(matrix.config.prefix+"help")
    console.log("I am ready!");
});
discord.on('message', message => {
    matrix.commandLogic(message, discord);
});
if(matrix.config.token == "<insert token here>")
{
    console.log("You must insert a token in config.json; check discordapp.com and create one.");
    return null;
}
discord.login(matrix.config.token);