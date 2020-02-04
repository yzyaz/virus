<template>
  <div class="status">
    <div class="nationwide">
      <div class="statistics">
        <div class="title">
          <h2>全国统计</h2>
          <span>截止{{ timeStr | timeStr }}</span>
        </div>

        <div class="num">
          <el-tag type="danger">
            <i>确诊 </i>
            <b>{{ affirm }}</b>
            <span
              ><i>较昨日</i> <em> +{{ addAffirm }}</em></span
            >
          </el-tag>
          <el-tag type="warning">
            <i>疑似 </i>
            <b>{{ suspect }}</b>
            <span
              ><i>较昨日</i> <em> +{{ addSuspect }}</em></span
            >
          </el-tag>
          <el-tag type="info">
            <i>死亡 </i>
            <b>{{ die }}</b>
            <span
              ><i>较昨日</i> <em> +{{ addDie }}</em></span
            ></el-tag
          >
          <el-tag type="success">
            <i>治愈 </i>
            <b>{{ cure }}</b>
            <span
              ><i>较昨日</i> <em> +{{ addCure }}</em></span
            ></el-tag
          >
        </div>
        <div class="map" id="map">
          <div class="title" style="margin-bottom:0">
            <h4>{{tableTitle}}疫情地图</h4>
            <h5 @click="backNationwide" v-if="tableTitle==='全国'?false:true">返回全国</h5>
          </div>
          <div
            class="map_nationwide"
            style="width: 100%;backgroundColor:#f1fcfc"
          >
            <i v-show="tableTitle==='全国'?true:false" style="display:inline-block;color:#F56C6C;font-size:14px;margin-top:10px">点击各省 切换到省视图</i>
            <div id="main" style="width: 100%;height:400px;"></div>
          </div>
          <!-- <div
            v-show="tableTitle==='全国'?false:true"
            class="map_province"
            style="width: 100%;backgroundColor:#ccc"
          >
            <div id="province" style="width: 100%;height:400px;"></div>
          </div> -->
        </div>
        <div class="details">
          <div class="title">
            <h4>{{tableTitle}}各地详情</h4>
            <h5 @click="backNationwide" v-if="tableTitle==='全国'?false:true">返回全国</h5>
          </div>
          <el-table @row-click="tableclick" :data="tableData" stripe style="width: 100%" >
            <el-table-column width="50" :type="'index'"
              ><i v-if="tableTitle==='全国'?true:false" class="el-icon-caret-right"></i>
            </el-table-column>
            <el-table-column prop="district" label="地区"> </el-table-column>
            <el-table-column prop="affirm" label="确诊"> </el-table-column>
            <el-table-column prop="die" label="死亡"> </el-table-column>
            <el-table-column prop="cure" label="治愈"> </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: null,
      timeStr: '',
      affirm: null,
      suspect: null,
      die: null,
      cure: null,
      addAffirm: null,
      addSuspect: null,
      addDie: null,
      addCure: null,
      // 表格数据
      tableData: [],
      // 表格标题
      tableTitle: '全国',
      // 国地图数据
      natMapData: [],
      // 省地图数据
      proMapData: []

    }
  },
  methods: {
    // 获取数据
    async getData () {
      // let ceshi = await this.$http.get('localhost:8080/ok')
      // console.log(ceshi)
      let { data: res } = await this.$http.get(
        'http://yuzhiyong.life:8777/status'
      )
      console.log(JSON.parse(res.forum.extra.ncov_string_list))
      this.data = JSON.parse(res.forum.extra.ncov_string_list)
      this.timeStr = this.data.updateTime + '000' - 0
      // console.log('data', this.data, this.timeStr)
      // 确诊 疑似 死亡 治愈
      let nationwide0 = this.data.nationwide[0]
      this.affirm = nationwide0.confirmedNum
      this.suspect = nationwide0.suspectedNum
      this.die = nationwide0.deathsNum
      this.cure = nationwide0.curesNum
      // 较昨日
      let nationwide1 = this.data.nationwide[1]
      this.addAffirm =
        nationwide0.confirmedNum - nationwide1.confirmedNum
      this.addSuspect =
        nationwide0.suspectedNum - nationwide1.suspectedNum
      this.addDie = nationwide0.deathsNum - nationwide1.deathsNum
      this.addCure = nationwide0.curesNum - nationwide1.curesNum
      // 全国表格数据
      this.tableData = []
      this.data.provinces.forEach(item => {
        this.tableData.push({
          district: item.name,
          affirm: item.confirmedNum || 0,
          die: item.deathsNum || 0,
          cure: item.curesNum || 0
        })
      })
      console.log('data', this.data)
      // 全国map数据
      this.natMapData = []
      this.data.provinces.forEach(i => {
        this.natMapData.push({
          name: i.name,
          value: i.confirmedNum
        })
      })
      // 渲染地图
      this.mapInit()
    },
    // 点击表格
    tableclick (row) {
      if (this.tableTitle !== '全国') return false
      // console.log(row)
      this.tableTitle = row.district ? row.district : row
      // 得到当前省份数据
      let provinces = this.data.provinces.find((item) => item.name === this.tableTitle)
      // console.log(provinces)
      this.tableData = []
      provinces.cities.forEach(item => {
        this.tableData.push({
          district: item.name,
          affirm: item.confirmedNum || 0,
          die: item.deathsNum || 0,
          cure: item.curesNum || 0
        })
      })
      // 获取省数据
      this.provinceData(this.tableTitle)
      this.mapInit()
    },
    // 返回全国
    backNationwide () {
      this.tableTitle = '全国'
      // 全国表格数据
      this.tableData = []
      this.data.provinces.forEach(item => {
        this.tableData.push({
          district: item.name,
          affirm: item.confirmedNum || 0,
          die: item.deathsNum || 0,
          cure: item.curesNum || 0
        })
      })
      this.mapInit()
    },
    // 地图
    mapInit () {
      console.log('//', this.natMapData, this.proMapData)
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'))
      // console.log(myChart)
      // 指定图表的配置项和数据
      var option = {
        title: {// 顶部标题
          text: '2019-nCoV',
          subtext: '',
          x: 'center'
        },
        // 提示框
        tooltip: {
          trigger: 'item', // item数据项图形触发
          formatter: function (data) { // 设置提示框
            return (data.name + '<br/>' + '确诊:' + (data.value ? data.value : 0))
          }
        },
        // legend: { // 左上角名称
        //   orient: 'vertical',
        //   x: 'left',
        //   data: ['2019-nCoV']
        // },
        dataRange: { // 左下角柱状图
          min: 0,
          max: 1000,
          x: 'left',
          y: 'bottom',
          text: ['高', '低'],
          calculable: true
        },
        // 右侧工具栏
        // toolbox: {
        //   show: true,
        //   orient: 'vertical',
        //   x: 'right',
        //   y: 'center',
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        // roamController: { // 省会小点点
        //   show: true,
        //   x: 'right',
        //   mapTypeControl: {
        //     'china': true
        //   }
        // },
        series: [
          {
            name: '2019-nCoV',
            type: 'map',
            mapType: this.tableTitle === '全国' ? 'china' : this.tableTitle,
            roam: false,
            itemStyle: {
              // normal: { label: { show: true } },
              emphasis: { label: { show: true } }
            },
            data: (this.tableTitle === '全国' ? this.natMapData : this.proMapData)
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      // 设置点击事件
      myChart.on('click', (data) => {
        if (this.tableTitle === '全国') {
          // 刷新表格
          this.tableclick(data.name)
          this.tableTitle = data.name
          // 获取省数据
          this.provinceData(data.name)
          // 刷新地图
          this.mapInit()
        }
      })
    },
    // 各省数据
    provinceData (province) {
      this.proMapData = []
      this.data.provinces.find(i => i.name === province).cities.forEach(i => {
        this.proMapData.push({
          name: i.name + '市',
          value: (i.confirmedNum === 0 ? null : i.confirmedNum)
        })
      })
      console.log(this.proMapData)
    }
  },
  updated () {
  },
  created () {
    this.getData()
  },
  filters: {
    timeStr (timestr, pattern = '') {
      var date = new Date(timestr)
      var y = date.getFullYear()
      var m = (date.getMonth() + 1).toString().padStart(2, '0') // padStart(位数,'填充字符') 不足位数的填充，padEnd往后填充
      var d = date
        .getDate()
        .toString()
        .padStart(2, '0')
      if (pattern.toLowerCase() === 'yyyy-mm-dd') {
        return `${y}-${m}-${d}`
      } else {
        var hh = date.getHours()
        var mm = date.getMinutes()
        var ss = date.getSeconds()
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      }
    }
  }
}
</script>

<style lang="less" scoped>
h2 {
  padding: 0;
  margin: 0;
}
.status{
  width: 100%;
  height: calc(100vh - 40px);
  overflow: hidden;
  overflow-y: scroll
}
.title {
  border-bottom: 1px solid #ccc;
  border-left: 3px solid rgb(247, 104, 9);
  padding-left: 3px;
  margin-top: 15px;
  margin-bottom: 10px;
  h2,
  h4 {
    display: inline-block;
    margin: 0;
  }
  > span {
    margin-left: 17px;
    font-size: 14px;
    color: #999;
  }
}
.statistics {
  .num {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
    .el-tag {
      display: block;
      margin: 0;
      height: unset;
      text-align: center;
      > i {
        display: block;
        font-style: normal;
        color: rgb(32, 31, 31);
        font-size: 18px;
      }
      > b {
        display: block;
        font-size: 18px;
      }
      > span {
        > i {
          color: dimgrey;
          font-style: normal;
        }
        > em {
          font-weight: 600;
        }
      }
    }
  }

  .map {
    margin-top: 15px;
  }
    h5{
      padding: 0;
      margin: 0;
      float: right;
      margin-right: 15px;
      color: coral;
      cursor: pointer;
    }
}
.el-table /deep/ .el-table__row{
[class*="el-table_1_column"]{
  padding: 3px 0;
}
}
//https://i.snssdk.com/forum/home/v1/info/?activeWidget=1&city_code=510300&city_name=%E6%AD%A6%E6%B1%89&forum_id=1656784762444839
// https://i.snssdk.com/api/feed/forum_flow/v1/?activeWidget=1&city_code=510300&city_name=%E6%AD%A6%E6%B1%89&query_id=1656810113086509&tab_id=1656810113086525&category=forum_flow_subject&is_preview=0&stream_api_version=82&aid=13&offset=0&count=200
</style>
