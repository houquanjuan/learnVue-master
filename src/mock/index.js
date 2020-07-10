const Mock = require('mockjs')

var testData = Mock.mock({
  'list|1-10': [{
    'id|+1': 1,
    'name|1-10': '*',
    'property|1-100': 100,
    'isWork|1': true
  }]
})

export default testData
