<template>
  <div>
    <div class="all">
      <div class="name">欢迎来到小爱后台系统</div>
      <div class="right">
        <div>{{date}}</div>
        <div class="username">亲爱的,{{username}}</div>
        <div class="out">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      date: "",
      timer: ""
    };
  },
  components: {},
  methods: {},
  mounted() {
    this.username = JSON.parse(localStorage.getItem("user")).username;
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      let H = new Date().getHours();
      let Hours = "";
      if (H < 6) {
        Hours = "凌晨";
      } else if (6 < H && H <= 12) {
        Hours = "上午";
      } else if (13 <= H && H < 20) {
        Hours = "下午";
      } else {
        Hours = "晚上";
      }
      H = H > 12 ? H - 12 : H;
      let Min = new Date().getMinutes();
      Min = Min < 10 ? "0" + Min : Min;
      let S = new Date().getSeconds();
      S = S < 10 ? "0" + S : S;
      _this.date =
        new Date().getFullYear() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getDate() +
        " " +
        Hours +
        H +
        ":" +
        Min +
        ":" +
        S; // 修改数据date
    }, 1000);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.all {
  height: 100%;
  margin: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .name {
    color: #2e5e85;
    margin-left: 20px;
  }
  .right {
    display: flex;
    .username {
      margin: 0 10px;
    }
    .out {
      cursor: pointer;
      color: #409eff;
      margin-left: 12px;
    }
  }
}
</style>