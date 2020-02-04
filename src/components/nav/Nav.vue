<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="疫情状况" name="status"></el-tab-pane>
      <el-tab-pane label="最新情况" name="new"></el-tab-pane>
      <el-tab-pane label="同行查询" name="inquire"></el-tab-pane>
      <el-tab-pane label="在线义诊" name="cure"></el-tab-pane>
    </el-tabs>
<router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'status'
    }
  },
  methods: {
    handleClick (tab, event) {
      // 转到对应版块
      // console.log(location.hash.slice(2))
      if (location.hash.slice(2) === tab.name) return false
      this.$router.push('/' + tab.name)
    },
    // 避免刷新后nav不一样
    getactiveName () {
      if (location.hash === '/') return false
      this.activeName = location.hash.slice(2)
    }
  },
  created () {
    this.getactiveName()
  }
}
</script>

<style lang="less" scoped>
.el-tabs /deep/ .el-tabs__nav {
  width: 100%;
  display: flex;
  .el-tabs__item {
    flex: 1;
    text-align: center;
    font-size: 16px;
    padding: 0;
  }
}
.el-tabs /deep/ .el-tabs__header{
    margin: 0;
}
.el-tabs{}
</style>
