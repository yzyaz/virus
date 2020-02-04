<template>
  <div class="cure">
    <div class="title">
      <h2>肺炎问诊</h2>
    </div>
    <el-tag @click="consult(item)"
      class="cureApp"
      type="success"
      v-for="(item, i) in pneumoniaList"
      :key="i"
    >
      <img :src="item.img" />
      <div class="name">
        <div class="cure_title">{{ item.title }}</div>
        <span class="cure_summary">{{ item.summary }}</span>
      </div>
      <el-tag class="cure_consult" type="danger"
        >咨询</el-tag
      >
    </el-tag>

    <div class="title">
      <h2>心理咨询</h2>
    </div>
    <el-tag @click="consult(item)"
      class="cureApp"
      type="success"
      v-for="(item) in mentalityList"
      :key="item.img"
    >
      <img :src="item.img" />
      <div class="name">
        <div class="cure_title">{{ item.title }}</div>
        <span class="cure_summary">{{ item.summary }}</span>
      </div>
      <el-tag class="cure_consult" type="danger"
        >咨询</el-tag
      >
    </el-tag>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pneumoniaList: [],
      mentalityList: []
    }
  },
  methods: {
    async getList () {
      let { data: res } = await this.$http.get(
        'https://i.snssdk.com/2/wap/search/extra/open_api/?alasrc=consultation_wh&keyword=%E8%82%BA%E7%82%8E%E4%B9%89%E8%AF%8A&source=search_tab&aid=13&limit=10&offset=0&debug=1'
      )
      // console.log(res)
      this.pneumoniaList = res.data[0].display.cp.filter(
        item => item.type === '肺炎问诊'
      )
      this.mentalityList = res.data[0].display.cp.filter(
        item => item.type === '心理咨询'
      )
      // console.log(this.pneumoniaList)
    },
    // 咨询按钮
    consult (item) {
      location.assign(item.mainurl)
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.title {
  border-bottom: 1px solid #ccc;
  border-left: 3px solid rgb(247, 104, 9);
  padding-left: 3px;
  margin-top: 15px;
  h2 {
    display: inline-block;
    margin: 0;
  }
}
.el-tag{
  cursor: pointer;
}
.cure{
  width: 100%;
  height: calc(100vh - 40px);
  overflow: hidden;
  overflow-y: scroll
}
.cureApp::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.cureApp {
  display: block;
  position: relative;
  margin: 20px;
  padding: 15px;
  height: unset;
  > img {
    float: left;
    width: 60px;
    border: 1px solid #ccc;
    border-radius: 50%;
    vertical-align: middle;
  }
  .name {
    position: absolute;
    left: 87px;
    .cure_title {
      font-size: 18px;
      font-weight: 500;
    }
    .cure_summary {
    }
  }
  .cure_consult {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%)
  }
}
</style>
