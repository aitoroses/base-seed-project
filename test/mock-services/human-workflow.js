var hwCollection = require('../mock-db')['tasks']

var utils = require('../utils')
var handleError = utils.handleError
var generateToken = utils.generateToken
var createTask = utils.createTask

module.exports = [
  {
    method: 'GET',
    path: '/HumanWorkflow/TaskQueryService/token', /* ?user=<user> */
    reply: function(params, query, body) {
      if (!query.user) {
        this.status(401)
        this.res.end('Bad user.')
        return
      }

      var token = generateToken(query.user, 1, 0.5)
      token = (new Buffer(token, 'UTF-8')).toString('base64')
      this.res.end(token)
    },

    options: {
      requiresAuth: false,
      contentType: 'application/text'
    }
  },
  {
    method: 'POST',
    path: '/HumanWorkflow/TaskQueryService/authenticate',
    reply: function(params, query, body) {

      // If pass is not welcome1 => Error
      // Empty Authorization header
      // End response
      // JWT Middleware will automatically respond 401 status code (Not authorized)
      if (body.password != 'welcome1') {
        this.res.set({Authorization: null})
        this.res.status(401)
        this.res.json({message: JSON.stringify(body) + ' are not valid credentials. Ensure contentType is application/json'})
      } else {
        // Password is valid
        // Generate a token
        // Codify it with base64 and set header
        var token = generateToken(body.login)
        token = (new Buffer(token, 'UTF-8')).toString('base64')
        this.res.set({Authorization: 'Bearer ' + token})
        this.res.end()
      }
    },

    options: {
      requiresAuth: false
    }
  },{
    method: 'POST',
    path:'/HumanWorkflow/TaskQueryService/queryCountTasks',
    reply: function(params, query, body) {
      hwCollection.count({'systemAttributes.state': 'ASSIGNED'}, function(err, count) {
        this.res.json(count)
      }.bind(this))
    }
  },

  {
    method: 'POST',
    path:'/HumanWorkflow/TaskQueryService/queryTasks',
    reply: function(params, query, body) {
      hwCollection.find({'systemAttributes.state': 'ASSIGNED'})
        .exec(function(err, results) {
          results.forEach(r => r.payload = null)
          this.res.json(results)
        }.bind(this))
    }
  },

  {
    method: 'POST',
    path:'/HumanWorkflow/TaskQueryService/queryTasks/:startRow/:endRow',
    reply: function(params, query, body) {
      hwCollection.find({'systemAttributes.state': 'ASSIGNED'})
        .skip(params.startRow)
        .limit(params.endRow - params.startRow)
        .exec(function(err, results) {
          if (params.startRow == 0 && params.endRow == 0) results = []
          results.forEach(r => r.payload = null)
          this.res.json(results)
        }.bind(this))
    }
  },
  {
    method: 'POST',
    path:'/HumanWorkflow/TaskService/updateTask',
    reply: function(params, query, body) {
      var _this = this

      // Update the task
      var incomingTask = body
      hwCollection.findOne({'systemAttributes.taskId': body.systemAttributes.taskId})
        .exec(function(err, dbTask) {
          handleError(this.res, {errorMessage: 'Not existing task.'})
        }.bind(this))
    }
  },
  {
    method: 'GET',
    path:'/HumanWorkflow/TaskQueryService/getTaskDetailsById/:taskId',
    reply: function(params, query, body) {
      hwCollection.findOne({'systemAttributes.taskId': params.taskId, })
        .exec(function(err, task) {
          this.res.json(task)
        }.bind(this))
    }
  }
]
