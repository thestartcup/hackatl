(function () {
  var database = require('./database.js')

  // URL scheme:
  // https://domain.com/api/base/scheme/name
  // where base is one of [user, org]
  // scheme is one of [tag, search, id]
  // name only relevant in tag and id schemes
  var serveUrlRoot = (url, response) => {
    [base, scheme, name] = url.path.split('/').slice(2, 4)
    var db = database.load(base)
    if (db) {
      if (scheme == 'tag') {
        db.serveTag(name, response);
      } else if (scheme == 'search') {
        db.serveSearch(url.query, response)
      } else if (scheme == 'id') {
        db.serveId(name, response)
      } else {
        db.serveError()
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
