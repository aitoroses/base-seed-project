module.exports = {
  type:{
    values: ['EVENT', 'MARKETING', 'GRANT', 'MATERIAL']
  },
  label: {
    function() {
      var lower = this.object.type.toLowerCase().split('_').join(' ')
      return lower.slice(0, 1).toUpperCase() + lower.slice(1)
    }
  },
  description: {
    faker: 'lorem.paragraph'
  },
  labelKey: {
    function() {
      return 'i18n_' + this.object.type
    }
  }
}
