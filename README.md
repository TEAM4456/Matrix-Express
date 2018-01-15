# MatrixV2 Discord Framework

The MatrixV2 Discord Framework is a framework designed to be minimal, yet effectively aid in creating a Discord bot. It has been designed to be powerful, extensible, yet simple.

# Getting Started

First, clone the repository using `git clone` to a folder on your server.

Next, ensure modern versions of node.js and npm are installed.

Then, go into the directory and run `npm install`.

Go to [the Discord Developer's application page](https://discordapp.com/developers/applications/me) and create an application with a bot user. Copy the bot user's token into `config.json`.

Finally, run `nodejs app.js` and add the bot to the servers you desire.

# Add MatrixV2 to a server

To add MatrixV2 to a server, you must have the Manage Server permission on the server that you wish to add the bot to.

First, get the user ID of your bot by going to [the Discord Developer's application page](https://discordapp.com/developers/applications/me).

Next, calculate permissions. My favorite way to do this is [here.](https://finitereality.github.io/permissions-calculator/)

Add your desired permissions, then enter your bot's user ID into the box at the bottom, then click "Add".

Finally, go through the Discord procedure, selecting your server etc...

# The structure of MatrixV2

MatrixV2 is designed to be modular. It scans for files in it's plugins directory, and indexes commands by filename. For example, a file named `ping.js` would be executable by running the command ?ping in your server. (prefix is customizable). The file must have a specific structure, with a function named `execute` and a module export for it. An example is shown below:

```
var execute = function(command, message, client, libs)
{
    message.reply("Pong!");
}
module.exports.execute = execute;
```

The command is given the message and client objects from discord.js, and command and libs from MatrixV2. Libs is an index of all of the loaded libraries in /libs. For example, a file in that directory named `libawesomeness.js` would be referenced by libs["libawesomeness"].

# How to write a plugin

As seen by the example above, a plugin's execute function requires the four parameters `command`, `message`, `client`, and `libs`. To better understand how to properly use `message` and `client`, check [the discord.js documentation](discord.js.org).
Check the wiki for more examples.
