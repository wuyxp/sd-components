// import { getOptions } from 'loader-utils';
const utils = require('loader-utils')

exports.default = function(source){
  console.log(typeof source)
  // console.log(__webpack_public_path__)
  console.log(source)
  console.log(utils.urlToRequest(this))
  console.log('进入自定义loader')
  return source
}
