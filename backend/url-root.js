(function () {
  var database = require('./database.js')

  // URL scheme:
  // https://domain.com/api/base/scheme/name
  // where base is one of [user, org]
  // scheme is one of [tag, search, id]
  // name only relevant in tag and id schemes
  var serveUrlRoot = (path, query, response) => {
    var base, scheme, name
    console.log([base, scheme, name] = path.split('/').slice(1, 3))
    var db = database.load(base)
    if (db) {
      if (scheme == 'tag') {
        db.serveTag(name, response);
      } else if (scheme == 'search') {
        db.serveSearch(query, response)
      } else if (scheme == 'id') {
        db.serveId(name, response)
      } else if (scheme == 'all') {
        db.serveAll(response)
      } else {
        db.serveError(response)
      }
    }
  }

  var putUrlRoot = (base, item, response) => {
    var db = database.load(base)
    if (db) {
      db.putItem(item)
    }
  }

  module.exports = {
    'serveUrlRoot': serveUrlRoot,
    'putUrlRoot': putUrlRoot
  }
})();
