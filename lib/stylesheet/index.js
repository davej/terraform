var path         = require("path")
var Buffer       = require("buffer").Buffer
var fs           = require("fs")
var helpers      = require('../helpers')
var postcss      = require('postcss')
var autoprefixer = require('autoprefixer')
var minify       = require('harp-minify')
var cssnano      = require('cssnano')

/**
 * Build Processor list for stylesheets.
 *
 * same as doing...
 *
 *    var processors = {
 *      "less"   : require("./processors/less"),
 *      "stylus" : require("./processors/stylus")
 *    }
 *
 */

var processors = {}
helpers.processors["css"].forEach(function(sourceType){
  processors[sourceType] = require("./processors/" + sourceType)
})

module.exports = function(root, filePath, callback){

  var srcPath = path.resolve(root, filePath)
  var ext     = path.extname(srcPath).replace(/^\./, '')


  fs.readFile(srcPath, function(err, data){

    /**
     * File not Found
     */

    if(err && err.code === 'ENOENT') return callback(null, null)

    /**
     * Read File Error
     */

    if(err) return callback(err)


    /**
     * Lookup Directories
     */

    var dirs = [
      path.dirname(srcPath),
      path.dirname(path.resolve(root))
    ]

    /**
     * Lookup Directories
     */
    var render = processors[ext].compile(srcPath, dirs, data, function(err, css, srcMap) {
      if (err) return callback(err);

      /**
       * Autoprefix, then consistently minify
       */
      // Running through postcss loses some source map accuracy.
      // For example it doesn't support nested selectors so it will map to the
      // outermost selector.
      var obj;
      if (srcMap) {
        var srcMapString = Buffer.isBuffer(srcMap) ? srcMap.toString() : JSON.stringify(srcMap)
        obj = {
          from: srcPath,
          to: helpers.outputPath(srcPath),
          map: {
            prev: srcMapString
          }
        }
      }
      postcss([autoprefixer, cssnano]).process(css, obj).then(function (result) {
        result.warnings().forEach(function (warn) {
          console.warn(warn.toString())
        })
        callback(null, result.css, result.map ? result.map.toString() : null);
      })


    })

  })

}
