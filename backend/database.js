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

  function Database (s) {
    this.scheme = s
    this.items = []
  }

  Database.prototype.getByTag = (name) => {
    return this.items.filter(item => hasTag(item, name))
  }

  Database.prototype.getById = (id) => {
    return this.items.find(item => item.id == id)
  }

  Database.prototype.search = (queryObj) => {
    // TODO
  }

  Database.prototype.serveTag = (tagName, response) => {
    var queryData = this.getByTag(tagName)
    response.json(queryData)
  }
  Database.prototype.serveSearch = (queryStr, response) => {
    var queryObj = querystring.parse(queryStr)
    var queryData = this.search(queryObj)
    response.json(queryData)
  }
  Database.prototype.serveId = (id) => {
    var queryData = this.getById(id)
    response.json(queryData)
  }

  module.exports = {
    'Database': Database,
    'load': load
  }
})();
