var should    = require('should')
var polymer   = require('../')

describe("javascripts", function(){

  describe(".coffee", function(){
    var root = __dirname + "/fixtures/javascripts/coffee"
    var poly = polymer.root(root)

    it("should translate coffeescript to javascript", function(done){
      poly.render("main.coffee", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        done()
      })
    })
    it("should minify beyond preprocessor", function(done){
      poly.render("main.coffee", function(errors, body){
        should.not.exist(errors)
        body.should.not.include("\n\n")
        done()
      })
    })
    it("shouldn’t strip unused javascript when minifying", function(done){
      poly.render("unused.coffee", function(errors, body){
        should.not.exist(errors)
        body.should.include("alert")
        done()
      })
    })

    it("should return errors if invalid", function(done){
      poly.render("invalid.coffee", function(errors, body){
        should.exist(errors)
        should.not.exist(body)
        errors.should.have.property("name")
        errors.should.have.property("message")
        errors.should.have.property("stack")
        done()
      })
    })

    it("should have link to source map", function(done){
      poly.render("main.coffee", function(error, body){
        body.should.include("sourceMappingURL=main.js.map")
        done()
      })
    })

    it("should output source map", function(done){
      poly.render("main.coffee", function(error, body, srcMap){
        should.exist(srcMap)
        srcMap.should.include("\"mappings\":\"AAGA")
        done()
      })
    })

  })

  describe(".es6", function() {

    var root = __dirname + "/fixtures/javascripts/es6"
    var poly = polymer.root(root)

    it("should transpile ES6 to ES5", function(done){
      poly.render("main.es6", function(errors, body){
        should.not.exist(errors)
        should.exist(body)
        done()
      })
    })
    it("should minify beyond transpiling", function(done){
      poly.render("main.es6", function(errors, body){
        should.not.exist(errors)
        body.should.not.include("\n\n")
        done()
      })
    })
    it("should return errors if invalid", function(done){
      poly.render("invalid.es6", function(errors, body){
        should.exist(errors)
        should.not.exist(body)
        errors.should.have.property("name")
        errors.should.have.property("message")
        errors.should.have.property("stack")
        done()
      })
    })

    it("should have link to source map", function(done){
      poly.render("main.es6", function(error, body){
        body.should.include("sourceMappingURL=main.js.map")
        done()
      })
    })

    it("should output source map", function(done){
      poly.render("main.es6", function(error, body, srcMap){
        should.exist(srcMap)
        srcMap.should.include("\"mappings\":\"YAIA")
        done()
      })
    })
  })

})
