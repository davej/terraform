var should  = require('should')
var polymer = require('../')

describe("stylesheets", function(){

  describe(".less", function(){

    var root = __dirname + '/fixtures/stylesheets/less'
    var poly = polymer.root(root)

    it("should have basic css file", function(done){
      poly.render("main.less", function(error, body){
        should.not.exist(error)
        body.should.include("background:pink")
        done()
      })
    })
    it("should autoprefix css", function(done){
      poly.render("main.less", function(error, body){
        should.not.exist(error)
        body.should.include("-webkit-font-feature-settings")
        done()
      })
    })

    it("should minify beyond preprocessor", function(done){
      poly.render("main.less", function(error, body){
        should.not.exist(error)
        body.should.not.include(";}")
        done()
      })
    })

    it("should have link to source map", function(done){
      poly.render("main.less", function(error, body){
        body.should.include("sourceMappingURL=main.css.map")
        done()
      })
    })

    it("should output source map", function(done){
      poly.render("main.less", function(error, body, srcMap){
        should.exist(srcMap)
        srcMap.should.include("\"mappings\":\"AAAA")
        done()
      })
    })

  })

  describe(".styl", function(){

    var root = __dirname + '/fixtures/stylesheets/styl'
    var poly = polymer.root(root)

    it("should have basic css file", function(done){
      poly.render("main.styl", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("background:pink")
        body.should.include("font-feature-settings")
        done()
      })
    })

    it("should autoprefix css", function(done){
      poly.render("main.styl", function(error, body){
        should.not.exist(error)
        body.should.include("-webkit-font-feature-settings")
        done()
      })
    })

    it("should minify beyond preprocessor", function(done){
      poly.render("main.styl", function(error, body){
        should.not.exist(error)
        body.should.not.include(";}")
        done()
      })
    })

    it("should have link to source map", function(done){
      poly.render("main.styl", function(error, body){
        body.should.include("sourceMappingURL=main.css.map")
        done()
      })
    })

    it("should output source map", function(done){
      poly.render("main.styl", function(error, body, srcMap){
        should.exist(srcMap)
        srcMap.should.include("\"mappings\":\"AAAA")
        done()
      })
    })

  })

  describe(".scss", function(){

    var root = __dirname + '/fixtures/stylesheets/scss'
    var poly = polymer.root(root)

    // console.log(root);

    it("should have basic css file", function(done){
      poly.render("main.scss", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("background:#ffc3cd")
        body.should.include("color:#000")
        done()
      })
    })
    it("should autoprefix css", function(done){
      poly.render("main.scss", function(error, body){
        should.not.exist(error)
        body.should.include("-webkit-font-feature-settings")
        done()
      })
    })
    it("should minify beyond preprocessor", function(done){
      poly.render("main.scss", function(error, body){
        should.not.exist(error)
        body.should.not.include(";}")
        done()
      })
    })
    it("should have link to source map", function(done){
      poly.render("main.scss", function(error, body){
        body.should.include("sourceMappingURL=main.css.map")
        done()
      })
    })
    it("should output source map", function(done){
      poly.render("main.scss", function(error, body, srcMap){
        should.exist(srcMap)
        srcMap.should.include("\"mappings\":\"AAAA")
        done()
      })
    })

  })

  describe(".sass", function(){

    var root = __dirname + '/fixtures/stylesheets/sass'
    var poly = polymer.root(root)

    it("should have basic css file", function(done){
      poly.render("main.sass", function(error, body){
        should.not.exist(error)
        should.exist(body)
        body.should.include("background:#ffc3cd")
        body.should.include("color:#000")
        done()
      })
    })
    it("should autoprefix css", function(done){
      poly.render("main.sass", function(error, body){
        should.not.exist(error)
        body.should.include("-webkit-font-feature-settings")
        done()
      })
    })
    it("should minify beyond preprocessor", function(done){
      poly.render("main.sass", function(error, body){
        should.not.exist(error)
        body.should.not.include(";}")
        done()
      })
    })
    it("should have link to source map", function(done){
      poly.render("main.sass", function(error, body){
        body.should.include("sourceMappingURL=main.css.map")
        done()
      })
    })
    it("should output source map", function(done){
      poly.render("main.sass", function(error, body, srcMap){
        should.exist(srcMap)
        srcMap.should.include("\"mappings\":\"AAAA")
        done()
      })
    })

  })

  // Test for using partial for preprocessed CSS
  // For emails, etc.
  //
  // describe("inline", function(){
  //
  //   var root = __dirname + '/fixtures/stylesheets/inline'
  //   var poly = polymer.root(root)
  //
  //   it("should be able to inline sass", function(done){
  //     poly.render("index.jade", function(error, body){
  //       console.log(body)
  //       body.should.eql("<html><style>body{background:#990000}</style></html>")
  //       done()
  //     })
  //
  //   })
  //
  // })

})
