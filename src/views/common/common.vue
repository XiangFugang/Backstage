<template>
  <div>
    <top class="top"></top>
    <div class="main">
      <left class="left"></left>
      <router-view class="right"></router-view>
    </div>
  </div>
</template>

<script>
import top from "../../components/top/top";
import left from "../../components/left/left";
export default {
  name: "",
  components: {
    top,
    left
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  onLoad() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #dbdada;
  position: fixed;
  top: 0;
  background: white;
  z-index: 1000;
}
.main {
  width: 100%;
  display: flex;
  .left {
    width: 200px;
    height: calc(100vh - 61px) !important;
    margin-left: 40px;
    border-right: 1px solid #e6e6e6;
    position: fixed;
    top: 61px;
    background: white;
  }
  .right {
    background: white;
    // height: calc(100vh - 61px) !important;
    width: calc(100vw - 240px) !important;
    margin: 61px 0 0 240px;
  }
}
</style>