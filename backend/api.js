(function () {
  var express = require('express')
  var bodyParser = require('body-parser')
  var url_root = require('./url-root')
  var app = express()

  app.get('/', (req, res) => {
    url_root.serveUrlRoot(req.url, res)
  })

  app.put('/:base/', bodyParser.json(), (req, res) => {
    url_root.putUrlRoot(req.params.base, req.body, res)
  })

  app.listen(8080)
})()
