//var categories = require('./category.js')
const moment = require('moment')

module.exports = {
  id: {
    incrementalId: true
  },
  category: {
    type:{
      faker: 'random.arrayElement(db.category)["type"]'
    },
    'object.category.type==="EVENT",location':{
      faker: 'address.city'
    },
    'object.category.type==="MARKETING"||object.category.type==="MATERIAL",product':{
      faker: 'lorem.words()[0]'
    },
    'object.category.type==="GRANT",value':{
      faker: 'random.number'
    }
  },

  actor: {
    faker: 'random.arrayElement(db.user)'
  },
  owner: {
    faker: 'random.arrayElement(db.user)'
  },
  therapeuticalArea: {
    faker: 'lorem.words()[0]'
  },
  request: {
    id: {
      faker: 'random.number'
    },
    title: {
      faker: 'lorem.sentence'
    },
    NP4Number: {
      faker: 'random.number'
    }
  },
  creationDate: {
    function(){
      return moment().subtract(this.object.id, 'day').toDate()
    }
  },
  group: [{
    faker: 'random.arrayElement(db.user)["userId"]',
    length: 10,
    fixedLength: false
  }],

  action: {
    type:{
      faker: 'random.arrayElement(db.action)["type"]'
    },
    'object.action.type==="ADD_CONTRIBUTOR",contributor': {
      faker: 'random.arrayElement(db.user)'
    },
    'object.action.type!=="ADD_CONTRIBUTOR",comment': {
      faker: 'lorem.sentence'
    }
  }
}
