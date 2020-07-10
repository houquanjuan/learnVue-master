<template>
    <div id="mockTest">
        <ul v-for="item in mockTable" :key="item.id">
            <li v-for="(value, key) in item" :key="key">{{value}}</li>
        </ul>
        <ul v-for="item in mockTable" :key="item.id">
            <li v-for="(value, key) in item" :key="key">{{value}}</li>
        </ul>
    </div>
</template>
<script>
import testData from '@/mock/index'
export default {
  name: 'mockTest',
  data () {
    return {
      mockTable: testData.list
    }
  },
  mounted () {
    console.log(testData.list)
  }
}
</script>
<style scoped>
#mockTest {
    width: 100%;
    height: 100%;
    text-align: center;
    padding:50px;
    background: #f8f8f8;
}
ul{
    width:100%;
    min-width: 90rem;
    height: 30px;
    line-height: 30px;
    border-bottom: #f2f2f2 1px solid;
}
ul li{
    width:20%;
    display: inline-block;
}
</style>
