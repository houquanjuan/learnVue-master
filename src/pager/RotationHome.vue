<template>
    <div class="H_container">
      <!-- 轮播图 -->
      <rotation-chart></rotation-chart>
      <!-- 菜单 -->
      <top-menu class="top_menu" :class="{'menu_scroll':menuScroll}"></top-menu>
      <div class="hrader">
        <p>count:{{count}}</p>
        <p>{{contentMessage}}</p>
        <p>message:{{message}}</p>
        <p>{{todo}}</p>
      </div>
    </div>
</template>
<script>
import rotationChart from '@/components/images/RotationChart'
import topMenu from '@/components/menu'
import {mapState} from 'vuex'

export default {
  name: 'H_container',
  components: {
    'rotation-chart': rotationChart,
    'top-menu': topMenu
  },
  data () {
    return {
      menuScroll: false,
      clientHeight: 0
    }
  },
  computed: {
    contentMessage () {
      if (this.clientHeight > 700) {
        return 'big screen'
      } else {
        return 'normal'
      }
    },
    ...mapState({
      count: state => state.count,
      message: state => state.message,
      todo: getter => getter.doneTodos
    })
  },
  mounted () {
    this.clientHeight = document.documentElement.clientHeight
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleScroll () {
      this.menuScroll = document.documentElement.scrollTop > this.clientHeight
      console.log(document.documentElement.scrollTop, this.menuScroll)
    },
    handleResize () {
      this.clientHeight = document.documentElement.clientHeight
      console.log('resize ' + this.clientHeight)
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin inhint-parent {
    width: 100%;
    height: 600px;
}
.H_container {
    @include inhint-parent;
}
.menu_scroll {
    background: #545c64;
}
.top_menu{
    width: 100%;
    height:60px;
    position: fixed;
    top:0px;
    left:0px;
    z-index:10000;
    transition: background .4s ease-out;
    -webkit-transition: background .4s ease-out;
    -moz-transition: background .4s ease-out;
    -o-transition: background .4s ease-out;
}
.ratation_chart{
   z-index: 0;
    top:0px;
    position: fixed;
}
// z-index要起作用，必须设置position :relative/ absolute / fixed
.hrader {
    width: 100%;
    height: 700px;
    background: #f8f8f8;
    margin-top:600px;
    z-index: 2;
    position:relative;
}
</style>
