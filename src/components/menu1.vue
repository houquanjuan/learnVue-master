<template>
    <div id="menuItem">
           <el-input v-model="nval" placeholder="please input message..."></el-input>
            <p>{{vcount}}</p>
            <el-button type="primary" @click="changeStore">click</el-button>
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
      nval: ''
    }
  },
  computed: {
    vcount () {
      return this.$store.states.count + this.count
    }
  },
  mounted () {
  },
  methods: {
    changeStore () {
      this.$store.mutations.setMessage(this.nval)
      this.$store.mutations.setCount(this.vcount)
    }
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
