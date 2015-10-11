var babel = require("babel-core")
var TerraformError = require("../../error").TerraformError
var helpers = require("../../helpers")
var path = require("path")

exports.compile = function(filePath, fileContents, callback) {
  var script = null
  var error = null
  try {
    var options = {
      sourceMaps: true,
      sourceMapTarget: helpers.outputFileName(filePath),
      sourceFileName: path.basename(filePath)
    }
    script = babel.transform(fileContents.toString(), options)
  } catch (e) {
    e.source = "Babel"
    e.dest = "JavaScript"
    e.filename = filePath
    e.lineno = parseInt(e.loc.line)
    error = new TerraformError(e)
    if (global.token) delete global.token // remove babel leak
  }finally{
    callback(error, script && script.code, script && script.map)
  }
}
