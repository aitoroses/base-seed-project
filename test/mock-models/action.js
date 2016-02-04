module.exports = {
  type: {
    values: ['CREATE_DRAFT','SUBMIT_REQUEST','APPROVE_REQUEST','DISMISS_REQUEST','ASK_FOR_CHANGE','RESUBMIT','RECALL','INVALIDATE','COMMENT','RAISE_QUESTION','ADD_CONTRIBUTOR']
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
