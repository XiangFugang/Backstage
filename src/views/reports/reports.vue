<template>
  <div class="all">
    <div class="top">
      <div class="title">
        <div class="font">首页</div>
        <div class="arrow">></div>
        <div class="font">数据统计</div>
        <div class="arrow">></div>
        <div class="font">数据报表</div>
      </div>
      <div class="table">
        <div class="box">
            <div id="main" style="width: 800px;height:400px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    get() {
      this.$store
        .dispatch("user/reports")
        .then(res => {
          console.log(res.data)
          this.charts = echarts.init(document.getElementById("main"));
          this.charts.setOption({
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#E9EEF3"
                }
              }
            },
            legend: {
              data: res.data.legend.data
            },
                grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis:res.data.xAxis,
              yAxis: [
              {
                type: 'value'
              }
            ],
            series:res.data.series
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.get();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.all {
  width: 100%;
  height: calc(100vh - 61px) !important;
  .top {
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    .title {
      display: flex;
      align-items: center;
      padding: 0 0 30px 0;
      .font {
        font-size: 14px;
        padding: 0 5px;
      }
      .arrow {
        padding: 0 5px;
      }
    }
    .table {
      width: 100%;
      border: 1px solid #ebeef5;
      .box {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
      }
    }
  }
}
</style>