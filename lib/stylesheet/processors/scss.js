var scss = require("node-sass")
var TerraformError = require("../../error").TerraformError
var helpers = require("../../helpers")

exports.compile = function(filePath, dirs, fileContents, callback){
  scss.render({
    file: filePath,
    includePaths: dirs,
    outputStyle: 'compressed',
    sourceMap: true,
    outFile: helpers.outputPath(filePath)
  }, function (e, css) {
    if (e) {
      var error = new TerraformError ({
        source: "Sass",
        dest: "CSS",
        lineno: e.line || 99,
        name: "Sass Error",
        message: e.message,
        filename: e.file || filePath,
        stack: fileContents.toString()
      })
      return callback(error)
    }

    callback(null, css.css, css.map)
  });
}
