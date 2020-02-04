<template>
  <div class="news">
    <div class="infinite-list-wrapper" style="overflow:auto">
      <div class="title"><h2>实时动态</h2></div>
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
      >
        <li v-for="(item, i) in newsList" class="list-item" :key="i" @click="newsDetails(item)">
          <div class="timeInfo">
            <b>{{ (item.event_time)+'000'-0 | timeStr}}</b>
            <!-- <i>{{ item.pubDateStr }} {{ item.pubDate | timeStr }}</i> -->
          </div>
          <!-- <div class="newTitle">
              <h3>{{item.title}}</h3>
          </div> -->
          <div class="newContent">{{item.desc}}</div>
        </li>
      </ul>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      newsList: [],
      loading: false,
      newNum: 10
    }
  },
  methods: {
    //   得到数据
    async getNews () {
    //   let { data: res } = await this.$http.get(
    //     'https://file1.dxycdn.com/2020/0127/794/3393185296027391740-115.json'
    //   )
      let { data: res } = await this.$http.get('http://yuzhiyong.life:8777/new')
      //   console.log('res2', JSON.parse(res.data[0].content).sub_raw_datas)
      let list = JSON.parse(res.data[0].content).sub_raw_datas
      //   this.data = JSON.parse(res.data[0].content).sub_raw_datas
      list.forEach(item => {
        this.data.push(item.raw_data)
      })
      // console.log(this.data)
      this.newsList = this.data.slice(0, this.newNum)
    //   console.log(this.data)
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.newNum += 3
        this.newsList = this.data.slice(0, this.newNum)
        this.loading = false
      }, 900)
    },
    // 点击事件
    newsDetails (item) {
    //   console.log(1)
      location.assign(item.sourceUrl)
    }
  },
  created () {
    this.getNews()
  },
  computed: {
    noMore () {
      return this.newsList.length >= this.data.length
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  filters: {
    timeStr (timestr, pattern = '') {
    //   timestr = timestr + '000' - 0
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
        return `${hh}:${mm}:${ss} ${y}-${m}-${d}`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.news {
  width: 100%;
}
.infinite-list-wrapper {
  width: 100%;
  height: calc(100vh - 40px);
  .title {
    border-bottom: 1px solid #ccc;
    border-left: 3px solid rgb(247, 104, 9);
    padding-left: 3px;
    margin-top: 15px;
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
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      cursor: pointer;
      margin: 0 10px;
      padding: 15px 0;
      border-bottom: 1px solid #ccc;
      .timeInfo {
        b {
          font-size: 14px;
          font-weight:400;

          color:slategrey
        }
        i {
          font-style: normal;
          font-size: 15px;
          margin-left: 10px;
          color: rgb(58, 56, 56);
        }
      }
      .newTitle{
          >h3{
              margin: 10px 0;
          }
      }
      .newContent{
        //   overflow: hidden;
        //   text-overflow: ellipsis;
        //   display: -webkit-box;
        //   -webkit-line-clamp: 2;
        //   -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
