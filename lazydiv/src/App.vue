<template>
  <div id="app">
    <div id="app">
    <div>
      正常背景图片
    </div>
    <LazyDiv
      class="test"
      src = "https://raw.githubusercontent.com/wuyxp/sd-components/master/lazydiv/src/images/logo.jpg"
    >
      测试地址
    </LazyDiv>
  </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style>
.test{
  width: 800px;
  height: 500px;
  background-size: contain;
}
</style>

