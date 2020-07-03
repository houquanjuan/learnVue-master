<!-- 首页轮播图 -->
<template>
    <div class="rotation_chart_wrap" id="rotationChart">
        <!-- 图片 -->
        <div class="image_wrap">
            <a class="image_container"
                v-for="(item, index) in bannerImages"
                :key="item.id"
                :class="{'image_hidden': (currentIndex == (index + 1))||(index==0 && currentIndex==imageCount), 'image_show': currentIndex === index }"
                :href="item.id"
                target="_blank"
            >
                <div class="image_item" :style="{backgroundImage: 'url('+item.url+')'}"><p>{{item.title}}</p></div>
            </a>
        </div>
        <!-- 轮询点 -->
        <div class="dots">
            <div class="dot_item"
                v-for="(item,dindex) in bannerImages"
                :key="item.id"
                :class="{'dot_current': dindex==currentIndex}"
                @mouseover="switchDirect('dot', dindex)"
                @click="switchDirect('dot', dindex)"
                ></div>
        </div>
        <!-- 导向箭头 -->
        <div class="arrows">
            <i class="arrow_item el-icon-arrow-left" @click="switchDirect('left')"></i>
            <i class="arrow_item el-icon-arrow-right" @click="switchDirect('right')"></i>
        </div>
    </div>
</template>
<script>
export default {
  name: 'rotationChart',
  props: {

  },
  data () {
    return {
      bannerImages: [{
        url: require('@/assets/banner/banner1.jpg'),
        title: 'img1',
        id: 'img1',
        link: 'http://baidu.com'
      }, {
        url: require('@/assets/banner/banner2.jpg'),
        title: 'img2',
        id: 'img2',
        link: 'http://baidu.com'
      }, {
        url: require('@/assets/banner/banner3.jpg'),
        title: 'img3',
        id: 'img3',
        link: 'http://baidu.com'
      }],
      imageCount: 0,
      currentIndex: 2,
      intervalId: ''
    }
  },
  computed: {
  },
  mounted () {
    this.imageCount = this.bannerImages.length
    this.setImageInterval()
  },
  destroyed () {
    clearInterval(this.intervalId)
  },
  methods: {
    setImageInterval () {
      let that = this
      that.intervalId = setInterval(function () {
        that.currentIndex++
        if (that.currentIndex >= that.imageCount) {
          that.currentIndex = 0
        }
      }, 3000)
    },
    // 改变当前轮播图时，轮询重新开始
    switchDirect (type, index) {
      clearInterval(this.intervalId)
      if (type === 'left') {
        this.currentIndex--
        if (this.currentIndex < 0) {
          this.currentIndex = this.imageCount - 1
        }
      } else if (type === 'right') {
        this.currentIndex++
        if (this.currentIndex >= this.imageCount) {
          this.currentIndex = 0
        }
      } else if (type === 'dot') {
        this.currentIndex = index
      }
      this.setImageInterval()
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/style/banner.scss'

</style>
