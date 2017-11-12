(function () {
  const querystring = require('querystring')
  const fs = require('fs')

  var dbs = []

  const load = (dbName) => {
    var db = dbs.find(db => db.name == dbName)
    if (typeof(db) !== 'undefined') {
      return db;
    } else {
      db = new Database (dbName)
      if (dbName === 'users') {
        db.items = JSON.parse(fs.readFileSync('./fake_users.json', 'utf8'))
      }
      dbs.push(db)
      return db
    }
  }

  const hasTag = (item, tag) => item.tags.indexOf(tag) != -1

  const recursiveDiff = (old, diff) => {
    for (const key in diff) {
      if (typeof(old[key] === 'undefined')) {
        old[key] = diff[key]
      } else {
        recursiveDiff(old[key], diff[key])
      }
    }
  }

  var Database = function Database (s) {
    this.name = s
    this.items = []
  }

  Database.prototype.getAll = function () {
    return this.items;
  }

  Database.prototype.getByTag = function (name) {
    return this.items.filter(item => hasTag(item, name))
  }

  Database.prototype.getById = function (id) {
    return this.items.find(item => item.id == id)
  }

  Database.prototype.putItem = function (item) {
    var oldItem = this.getById(item.id)
    if (typeof(oldItem) === 'undefined') {
      this.items.push(item)
    } else {
      recursiveDiff(oldItem, item)
    }
  }

  Database.prototype.search = function (queryObj) {
    // TODO
  }

  Database.prototype.serveAll = function (response) {
    var queryData = this.getAll()
    response.json(queryData)
  }

  Database.prototype.serveTag = function (tagName, response) {
    var queryData = this.getByTag(tagName)
    response.json(queryData)
  }
  Database.prototype.serveSearch = function (queryStr, response) {
    var queryObj = querystring.parse(queryStr)
    var queryData = this.search(queryObj)
    response.json(queryData)
  }
  Database.prototype.serveId = function (id, response) {
    var queryData = this.getById(id)
    response.json(queryData)
  }

  Database.prototype.serveError = function (response) {
    response.status(404).json({
      'error': 'Not found'
    })
  }

  module.exports = {
    'Database': Database,
    'load': load
  }
})();
