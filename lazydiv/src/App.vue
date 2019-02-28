<template>
  <div id="app">
    <div id="app">
    <div>
      正常背景图片
    </div>
    <LazyDiv
      class="test"
      src = "https://stage-gfw.deeda.care/deeda/images/medical/1.jpg"
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

