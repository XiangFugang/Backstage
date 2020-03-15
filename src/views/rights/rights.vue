<template>
  <div class="all">
    <div class="top">
      <div class="title">
        <div class="font">首页</div>
        <div class="arrow">></div>
        <div class="font">权限管理</div>
        <div class="arrow">></div>
        <div class="font">权限列表</div>
      </div>
      <div class="table">
        <div class="box">
          <el-table :data="list" border style="width: 100%">
            <el-table-column prop="index" label="#" width="150" align="center"></el-table-column>
            <el-table-column prop="authName" label="权限名称" min-width="450" align="center" height="150"></el-table-column>
            <el-table-column label="权限等级" min-width="450" align="center" >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.level==='0'">一级</el-tag>
                <el-tag v-else-if="scope.row.level==='1'" type="success" >二级</el-tag>
                <el-tag v-else type="warning">三级</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  components: {},
  methods: {
    getList(type) {
      this.$store
        .dispatch("rights/getList", type)
        .then(res => {
          let index = 0;
          res.data.map(item => {
            this.$set(item, "index", (index += 1));
          });
          this.list = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getList("list");
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