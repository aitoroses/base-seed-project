var db = require('../mock-db')
var util = require('util')
var moment = require('moment')
/**
 * The task assignation information will come from the BPM
 * So we'll have to simulate that information
 * Act -> Request -> Task (assignation information)
 * type Todo = {read: boolean, act: Act, assignee: User}
 * @return Todos[] as a callback
 */
function generateTodos(acts, users, cb) {

  var todos = acts.map(function(a) {
    var userIndex = Math.floor(Math.random() * users.length)

    // return Todos
    return {
      assignee: users[userIndex],
      act: a,
      markedAsRead: Math.random() > 0.5 ? true : false
    }
  })

  cb(todos)
}

// Generate todos on startup
var todos = []
db.act.find({}).exec(function(err, acts) {
  db.user.find({}).exec(function(err, users) {
    generateTodos(acts, users, function(results) {
      todos = results
    })
  })
})

module.exports = [
  {
    method: 'get',
    path:'/actions',
    reply: function(params, query, body) {
      db.action.find({})
        .skip(params.startRow)
        .limit(params.endRow - params.startRow)
        .exec(function(err, results) {
          if (params.startRow == 0 && params.endRow == 0) results = []
          this.res.json(results)
        }.bind(this))
    }
  },
  {
    method: 'get',
    path:'/users',
    reply: function(params, query, body) {
      db.user.find({})
        .skip(params.startRow)
        .limit(params.endRow - params.startRow)
        .exec(function(err, results) {
          if (params.startRow == 0 && params.endRow == 0) results = []
          this.res.json(results)
        }.bind(this))
    }
  },
  {
    method: 'get',
    path:'/categories',
    reply: function(params, query, body) {
      db.category.find({})
        .exec(function(err, results) {
          this.res.json(results)
        }.bind(this))
    }
  },
  {
    method: 'get',
    path:'/todos', // ?user=osesai1
    reply: function(params, query, body) {
      return todos.filter(function(t) {return t.assignee.userId == query.user})
    }
  },
  {
    method: 'get',
    path:'/acts',
    reply: function(params, query, body) {
      console.log(query)
      var filter = {
        $and: []
      }

      var param = {
        limit: 100,
        skip: 0
      }

      if (query) {
        if (query.people) {
          query.people = [].concat(query.people)
          var orPeople = []
          for (var i = 0; i < query.people.length; i++) {
            var p = query.people[i]
            orPeople.push({ group: query.people[i] })
          }

          filter.$and.push({$or: orPeople})
        }

        if (query.category) {
          query.category = [].concat(query.category)
          var orCategory = []
          for (var i = 0; i < query.category.length; i++) {
            var p = query.category[i]
            orCategory.push({ 'category.type': query.category[i] })
          }

          filter.$and.push({$or: orCategory})
        }

        if (query.action) {
          query.action = [].concat(query.action)
          var orAction = []
          for (var i = 0; i < query.action.length; i++) {
            var p = query.action[i]
            orAction.push({
              'action.type': query.action[i]
            })
          }

          filter.$and.push({$or: orAction})
        }
      }

      db.act.find(filter)
        .exec(function(err, results) {
          if (query) {
            if (query.text) {
              var expression = ''
              for (var i = 0; i < query.text.length; i++) {
                expression = expression + 'actStringified.indexOf("' + query.text[i] + '") > 0'
                if (i < query.text.length - 1) {
                  expression = expression + ' || '
                }
              }

              results = results.filter((a)=> {
                var actStringified = JSON.stringify(a)
                return eval(expression)
              })
            }
          }

          var skip = (query.skip) ? parseInt(query.skip) : 0
          var limit = (query.limit) ? parseInt(query.limit) : 10
          limit = limit + skip
          results = results.slice(skip, limit)

          setTimeout(function() {
            this.res.json(results)
          }.bind(this), 800)
        }.bind(this))
    }
  },
  {
    method: 'get',
    path:'/user/:userId/acts',
    reply: function(params, query, body) {
      var filter = {
        $and: []
      }

      if (query) {
        if (query.lastId) {
          filter.$and.push({ id: { $gt: parseInt(query.lastId) } })
        }

        if (query.timestamp) {
          filter.$and.push({ creationDate: { $gte: moment.unix(query.timestamp).toDate() } })
        }

        filter.$and.push({ group: { $in: [params.userId]} })
      }

      db.act.find(filter)
        .exec(function(err, results) {

          results = results.map(function(item) {
            delete item._id
            return item
          })

          console.log('Acts: '.green.bold + results.length.toString().gray.bold + ' ' + JSON.stringify(filter))

          setTimeout(function() {
            this.res.json(results)
          }.bind(this), 800)
        }.bind(this))
    }
  }
]
