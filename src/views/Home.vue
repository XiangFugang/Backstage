<template>
  <div class="all">
    <div class="top">
      <div class="title">首页</div>
      <div class="center">欢迎来到小爱后台管理系统</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>

<style lang='scss' scoped>
.all {
  width: 100%;
  height: calc(100vh - 61px) !important;
  .top {
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    .title {
      font-size: 14px;
      padding: 0 0 30px 0;
    }
    .center {
      position: relative;
      top: 20%;
      font-size: 24px;
      font-weight: 700;
      text-align: center;
    }
  }
}
</style>