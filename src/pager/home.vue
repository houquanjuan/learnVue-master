<template>
    <div id="h_home">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">aside</el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
  name: 'h_home'
}
</script>
<style lang="scss" scoped>
$style-color: #409EFF;
.el-header {
    background-color: $style-color;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: $style-color;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: $style-color;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
