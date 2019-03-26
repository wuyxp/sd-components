<template>
  <div id="app">
    <div>
      正常背景图片
    </div>
    <LazyBackground
      class="test"
      :src = "url"
    >
      测试地址11123
    </LazyBackground>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      url: require('./images/logo.jpg'),
      onUrl: 'https://raw.githubusercontent.com/wuyxp/sd-components/master/lazydiv/src/images/logo.jpg'
    }
  }
}
</script>
<style>
.test{
  width: 800px;
  height: 500px;
  background-size: contain;
}
</style>

