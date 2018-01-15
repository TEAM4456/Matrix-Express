# Matrix Express Framework

The MatrixV2 Express Framework is port of the MatrixV2 Discord framework to use Express for a website or web API. This project is in beta.

# Getting Started

First, clone the repository using `git clone` to a folder on your server.

Next, ensure modern versions of node.js and npm are installed.

Then, go into the directory and run `npm install`.

Add some routes in the plugins folder. ex: `https://example.com/example` would be `example.js` in plugins, and `https://example.com/ex1/ex2` would be `ex2.js` in the folder called `ex1`.

# The structure of MatrixV2

MatrixV2 is designed to be modular. It scans for files in it's plugins directory, and indexes commands by filename. For example, a file named `ping.js` would be executable by going to the route `your.domain/ping`. The file must have a specific structure, with a function named `execute` and a module export for it. An example is shown below:

```
var execute = function(type, req, res, libs)
{
    res.send("Pong!");
}
module.exports.execute = execute;
```

The command is given the message and client objects from discord.js, and command and libs from MatrixV2. Libs is an index of all of the loaded libraries in /libs. For example, a file in that directory named `libawesomeness.js` would be referenced by `libs["libawesomeness"]`.

# How to write a plugin

As seen by the example above, a plugin's execute function requires the four parameters `command`, `message`, `client`, and `libs`. To better understand how to properly use `message` and `client`, check [the express.js documentation](expressjs.com).
Check the wiki for more examples.
