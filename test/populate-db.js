var mocker = require('mocker-data-generator')

var util = require('util')
var fs = require('fs')
var path = require('path')

// Models
var user = require('./mock-models/user')
var action = require('./mock-models/action')
var act = require('./mock-models/act')
var category = require('./mock-models/category')

var db = require('./mock-db')

var m = mocker()
m.schema('user', user, 30)
  .schema('action', action, {uniqueField: 'type'})
  .schema('category', category, {uniqueField: 'type'})
  .schema('act', act, 500)
  .build(function(data) {
    var keys = Object.keys(data)
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i]
      db[k].insert(data[k], function(err, newDocs) {
        if (err) {
          console.log(err)
          return console.log('Fail to insert ' + k + ' collection')
        }
      })
    }

    //console.log(util.inspect(data, { depth: 10 }))
    console.log('Database generated go play outside!!')
  })
