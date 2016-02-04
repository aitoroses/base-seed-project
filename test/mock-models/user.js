module.exports = {
  firstName: {
    faker: 'name.firstName'
  },
  lastName: {
    faker: 'name.lastName'
  },
  userId:{
    function() {
      return this.object.lastName.substring(0, 5) + this.object.firstName.substring(0, 3) + Math.floor(Math.random() * 10)
    }
  }
}
