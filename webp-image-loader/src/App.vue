<template>
  <div id="app">
    <LazyDiv
      class="test"
      :src = "require('./assets/bg.jpg')"
    >
      测试地址11123
    </LazyDiv>
    <div>需要把图片多生成出来几张的plugin</div>
    <img src="./assets/logo.png">
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
  .test {
    width: 480px;
    height: 300px;
  }
</style>
