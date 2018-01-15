var fs = require('fs');
var path = require('path')
function extend(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
}
var load = function (dir, app, cdir="") {
    var loadlist = {}
    fs.readdirSync(dir).forEach(function (file)
    {
      var stat = fs.statSync(path.join(dir, file));
      if (stat.isFile())
      {
        if (file.includes('.js'))
        {
            loadlist["/"+cdir+file.replace('.js', '')] = require("../"+dir + '/' + file);
            console.log(file+" initialized");
        }
      }
      else if (stat.isDirectory())
      {
        loadlist = extend(loadlist, load(path.join(dir, file), app, cdir+file+"/")); //Adds directory plugin list to original list to list all plugins
      }
    });
    return loadlist;
}
module.exports = load;