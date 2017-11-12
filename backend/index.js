(function () {
  const express = require('express')
  const bodyParser = require('body-parser')
  const url_root = require('./url-root')
  const app = express()
  const { URL } = require('url')

  app.get('*', (req, res) => {
    url_root.serveUrlRoot(req.path, req.query, res)
    res.end()
  })

  app.put('/:base/', bodyParser.json(), (req, res) => {
    url_root.putUrlRoot(req.params.base, req.body, res)
  })

  app.listen(8080)
})()
