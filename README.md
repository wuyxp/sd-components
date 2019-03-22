## Lazydiv
本文件夹是用于处理懒加载图片的组件
在这个文件夹下可以进行开发与打包
lazydiv文件夹下，是打包的源文件
### 开发
在lazydiv文件夹下，使用
```
npm run dev
```

### 打包
在lazydiv文件夹下，使用
```
npm run build
npm pack
npm publish
```
如果publish需要登录，那么使用npm login登录

在package.json文件中，可以对打包后的文件版本号和要打包进入文件进行修改。注意如果发布的时候版本号不能重复

发布完毕后使用方式是
```
npm install @sd/component-lazydiv --save
```

在main.js中进行引用

```
import LazyDiv from '@sd/component-lazydiv'
Vue.use(LazyDiv)
```

测试使用
```
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      正常背景图片
    </div>
    <LazyDiv
      class="test"
      src = "xxx.jpg"
    >
      测试地址
    </LazyDiv>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
```

## webp-image-loader
用于处理普通图片转化为webp和小图的plugin或者loader
还在研发中。。。