<template>
    <div id="menuItem">
           <el-input v-model="nval" placeholder="please input message..."></el-input>
            <p>{{vcount}}</p>
            <el-button type="primary" @click="changeStore(nval)">+{{count}}</el-button>
    </div>
</template>
<script>
export default {
  name: 'menuItem',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      nval: 22
    }
  },
  computed: {
    vcount () {
      return this.$store.state.count
    }
  },
  mounted () {
  },
  methods: {
    changeStore () {
      // this.$store.commit({
      //   type: 'increment',
      //   count: this.count
      // })
      this.$store.dispatch('increment', {count: this.count}).then(() => {
        console.log('dispatch-----------')
      })
      this.$store.commit('getMessage', this.nval)
    }
    // ...mapMutations({
    //   changeStore: 'getMessage'
    // })
  }
}
</script>

<style lang="scss" scoped>

$style-color: #409EFF;

  #menuItem {
    background-color: #E9EEF3;
    color: $style-color;
    text-align: center;
    line-height: 30px;
    margin-bottom: 50px;
  }
  #menuItem .el-input {
      width:50%;
  }
</style>
