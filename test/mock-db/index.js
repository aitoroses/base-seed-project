
var path = require('path')
var NEDB = require('nedb')

// Create an instance
var collections = ['action', 'user', 'category', 'act']
var db = {}

for (var i = 0; i < collections.length; i++) {
  var collectionName = collections[i]
  db[collectionName] = new NEDB({ filename: path.resolve('test/mock-db/' + collectionName + '.db'), autoload: true })
  db[collectionName].loadDatabase()
}

module.exports = db
