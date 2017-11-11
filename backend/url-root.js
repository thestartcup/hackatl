(function () {
  var database = require('./database.js')

  // URL scheme:
  // https://domain.com/api/base/scheme/name
  // where base is one of [user, org]
  // scheme is one of [tag, search, id]
  // name only relevant in tag and id schemes
  var parseUrlRoot = (url, response) => {
    var base, scheme, name
    [base, scheme, name] = url.pathname.split('/').slice(2, 5)

    var db = database.load(base)
    if (!db) { return; }
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
})();
