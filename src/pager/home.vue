<template>
    <div id="h_home">
      <el-header>
        <div class="h_logo">数据可视化</div>
        <h-menu @menuSelect="menuSelected"></h-menu>
      </el-header>
      <el-container class="h_content">
        <el-container class="h_home_content" v-if="menuIndex==1">
          <el-aside width="200px">{{message}}</el-aside>
          <el-main>
            <menu-item :count=1></menu-item>
            <menu-item :count=12></menu-item>
          </el-main>
        </el-container>
        <el-container class="h_frame_content" v-else-if="menuIndex==2">2</el-container>
        <el-container class="h_frame_content" v-else-if="menuIndex==3">3</el-container>
        <el-container class="h_frame_content" v-else-if="menuIndex==4">4</el-container>
      </el-container>
    </div>
</template>
<script>
import menuItem from '../components/menu1.vue'
import hmenu from '../components/menu.vue'

export default {
  name: 'h_home',
  data () {
    return {
      menuIndex: 1,
      logoUrl: require('../assets/logo.png')
    }
  },
  components: {
    'menu-item': menuItem,
    'h-menu': hmenu
  },
  computed: {
    message () {
      return this.$store.states.message
    },
    count () {
      return this.$store.states.count
    }
  },
  mounted () {
  },
  methods: {
    menuSelected (index) {
      this.menuIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>

$style-color: #409EFF;
.el-header {
    background-color: rgb(84, 92, 100);
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 100px;
    position: fixed;
    top:0px;
    left:0px;
    z-index: 10000;
    width:100%;
  }
.h_content {
  position: absolute;
  top:60px;
  width:100%;
  height:calc(100% - 60px);
  height:-webkit-calc(100% - 60px);
  height:-o-calc(100% - 60px);
  height:-ws-calc(100% - 60px);
  overflow: hidden;
}
.h_content .el-container {
  height: 100%;
  overflow: auto;
}
  .el-aside {
    background-color: #D3DCE6;
    color: $style-color;
    text-align: center;
    height:100%;
    position: fixed;
    left:0px;
  }

  .el-main {
    padding-left:220px;
    background-color: #E9EEF3;
    color: $style-color;
    text-align: center;
    height:1000px;
  }

  .h_logo {
    width:200px;
    height:40px;
    background:url('../assets/logo3.png') no-repeat;
    background-size: contain;
    color: $style-color;
    line-height: 40px;
    font-size: 18px;
  }
</style>
