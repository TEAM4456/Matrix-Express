var fs = require('fs');
var path = require('path')
var load = function (dir) {
    var loadlist = {}
    fs.readdirSync(dir).forEach(function (file)
    {
      var stat = fs.statSync(path.join(dir, file));
      if (stat.isFile())
      {
        if (file.includes('.js'))
        {
            loadlist[file.replace('.js', '')] = require("../"+dir + '/' + file);
            console.log(file+" initialized");
        }
      }
      else if (stat.isDirectory())
      {
        load(path.join(dir, file));
      }
    });
    return loadlist;
}
module.exports = load;