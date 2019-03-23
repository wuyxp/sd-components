/**
 * Created with comment
 * @author: 武扬/956826374@qq.com
 * @time: 2019/3/23 11:56
 */
/**
 * path 如果是字符串，那么就是将这个path里面的所有图片都进行转换
 * path 如果是对象，那么需要有dir属性，作为路径地址，exclude作为排除名称存在，include作为引入名称存在。include优先于exclude
 */
// new WebpAndMiniPicPlugin({
//   // path: ['', '']
//   path: {
//     dir: '',
//     exclude: [],
//     include: []
//   }
// })

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const utils = {
  isString(p) {
    return Object.prototype.toString.call(p) === '[object String]'
  },
  isNumber(p) {
    return Object.prototype.toString.call(p) === '[object Number]'
  },
  isBoolean(p) {
    return Object.prototype.toString.call(p) === '[object Boolean]'
  },
  isSymbol(p) {
    return Object.prototype.toString.call(p) === '[object Symbol]'
  },
  isUndefined(p) {
    return Object.prototype.toString.call(p) === '[object Undefined]'
  },
  isNull(p) {
    return Object.prototype.toString.call(p) === '[object Null]'
  },
  isFunction(p) {
    return Object.prototype.toString.call(p) === '[object Function]'
  },
  isDate(p) {
    return Object.prototype.toString.call(p) === '[object Date]'
  },
  isArray(p) {
    return Object.prototype.toString.call(p) === '[object Array]'
  },
  isRegExp(p) {
    return Object.prototype.toString.call(p) === '[object RegExp]'
  },
  isObject(p) {
    return Object.prototype.toString.call(p) === '[object Object]'
  }
}
class WebpAndMiniPicPlugin {
  constructor(options){
    // 最后需要得到一个paths的文件目录
    const { path } = options
    this.path = path
  }

  /**
   * 根据传入的路径，进行递归查找，排除或者引入options里面的路径，那么就对对应的值进行callback回调
   * @param pathDir
   * @param options
   * @param callback
   */
  loadPathDir(pathDir, options = {}, callback = () => {}){
    const files = fs.readdirSync(pathDir)
    // 遍历当前文件夹下的所有文件
    files.forEach(file => {
      const newPathDir = path.resolve(__dirname, pathDir, file)
      fs.stat(newPathDir, (err, stats) => {
        if(err){
          console.log(err)
          return
        }
        if(stats.isDirectory()){
          // 还是目录继续递归
          this.loadPathDir(newPathDir, options, callback)
        } else {
          // 如果是文件
          const {exclude, include} = options
          const fileInfo = path.parse(newPathDir)
          // 如果只有排除，没有引入
          if(Array.isArray(exclude) && !include){
            if(exclude.indexOf(fileInfo.name) < 0){
              const fileContent = fs.readFileSync(newPathDir)
              callback( fileInfo, fileContent )
            }
          }
          // 如果只有引入，没有排除
          else if(Array.isArray(include) && !exclude){
            if(include.indexOf(fileInfo.name) > -1){
              const fileContent = fs.readFileSync(newPathDir)
              callback( fileInfo, fileContent )
            }
          }
          // 如果既有引入，又有排除
          else if(Array.isArray(include) && Array.isArray(exclude)){
            if(exclude.indexOf(fileInfo.name) < 0 && include.indexOf(fileInfo.name) > -1){
              const fileContent = fs.readFileSync(newPathDir)
              callback( fileInfo, fileContent )
            }
          }
          // 如果两个参数都没有
          else {
            const fileContent = fs.readFileSync(newPathDir)
            callback( fileInfo, fileContent )
          }
        }
      })
    })
  }
  async makeWebp(compilation, fileInfo, fileContent) {
    const g = await sharp(fileContent).webp().toBuffer()
    compilation.assets[fileInfo.name + '.webp'] = {
      source: function() {
        return g;
      },
      size: function() {
        return g.length;
      }
    };
  }
  async makeMini(compilation, fileInfo, fileContent) {
    // 使用sharp进行压缩图片
    const g = await sharp(fileContent).resize(100).sharpen().toBuffer()
    compilation.assets[fileInfo.name + '-min'+ fileInfo.ext] = {
      source: function() {
        return g;
      },
      size: function() {
        return g.length;
      }
    };
  }
  // 需要根据参数的不同类型，生成不同的图片
  makePic (compilation, path) {
    const callback = (fileInfo, fileContent) => {
      this.makeWebp(compilation, fileInfo, fileContent)
      this.makeMini(compilation, fileInfo, fileContent)
    }
    if(utils.isString(path)){
      this.loadPathDir(path, {}, callback)
    }

    else if(utils.isObject(path)){
      const {dir, include, exclude} = path
      this.loadPathDir(dir, {
        include,
        exclude
      }, callback)
    }

    else if(utils.isArray(path)){
      this.path.forEach(p => {
        this.makePic(compilation, p)
      })
    }
  }

  // 钩子在这里执行
  apply(compiler){
    console.log('WebpAndMiniPicPlugin🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎')
    compiler.hooks.compilation.tap('WebpAndMiniPicPlugin', compilation => {
      this.makePic(compilation, this.path)
    })
  }
}
module.exports = WebpAndMiniPicPlugin
