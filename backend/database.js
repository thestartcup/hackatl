(function () {
  const querystring = require('querystring')

  var dbs = []

  const load = (scheme) => {
    var db = dbs.find(db => db.scheme == scheme)
    if (typeof(db) !== 'undefined') {
      return db;
    } else {
      db = new Database (scheme)
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
    this.scheme = s
    this.items = []
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

  Database.prototype.serveTag = function (tagName, response) {
    var queryData = this.getByTag(tagName)
    response.json(queryData)
  }
  Database.prototype.serveSearch = function (queryStr, response) {
    var queryObj = querystring.parse(queryStr)
    var queryData = this.search(queryObj)
    response.json(queryData)
  }
  Database.prototype.serveId = function (id) {
    var queryData = this.getById(id)
    response.json(queryData)
  }

  module.exports = {
    'Database': Database,
    'load': load
  }
})();
