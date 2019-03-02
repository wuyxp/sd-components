<template>
  <div :style="style" class="___container">
    <slot></slot>
    <transition name="___fade">
      <div class="___container--mask" v-if="maskShow" :style="maskStyle"></div>
    </transition>
  </div>
</template>

<script>
const isSupportWebp = () => !![].map && (typeof window !== 'undefined') && window.document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0
export default {
  name: 'LazyDiv',
  props: {
    src: {
      type: String,
      default: ''
    },
    minSrc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      style: {},
      maskStyle: {},
      maskShow: true
    }
  },
  mounted() {
    const minPic = this.src.replace(/(\.\w+)$/, '-min$1')
    this.loadMinPic(minPic)
  },
  methods: {
    loadImg(src, callback, errorCallback) {
      const image = new Image()
      image.onload = () => {
        callback.call(this, image)
      }
      image.onerror = () => {
        errorCallback && errorCallback()
      }
      image.src = src
    },
    loadMinPic(src) {
      const cb = () => {
        this.maskShow = false
      }
      this.loadImg(src, image => {
        const style = {
          backgroundImage: `url(${image.src})`
        }
        this.maskStyle = style
        if (isSupportWebp()) {
          this.loadWebpPic(cb)
        } else {
          this.loadOriginPic(cb)
        }
      }, this.loadOriginPic.bind(this))
    },
    loadWebpPic(cb) {
      const webpPic = this.src.replace(/(\.\w+)$/, '.webp')
      this.loadImg(webpPic, image => {
        const style = {
          backgroundImage: `url(${image.src})`
        }
        this.style = style
        cb && cb()
      }, this.loadOriginPic.bind(this, cb))
    },
    loadOriginPic(cb) {
      const originPic = this.src
      this.loadImg(originPic, image => {
        const style = {
          backgroundImage: `url(${image.src})`
        }
        this.style = style
        cb && cb()
      })
    }
  }
}
</script>

<style scoped>
  .___container {
    position: relative;
    background-color: #aaaaaa
  }
  .___container--slot {
    position: relative;
    z-index: 2;
  }
  .___container--mask {
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: inherit;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .___fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .___fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
