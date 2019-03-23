const utils = require('loader-utils')

exports.default = function(source){
  // console.log(typeof source)
  // console.log(__webpack_public_path__)
  // console.log(source)
  console.log('🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌进入了loader')
  console.log(utils.getOptions(this))
  console.log(this)
  return source
}
