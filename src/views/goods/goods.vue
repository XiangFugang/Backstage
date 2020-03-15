<template>
  <div class="all">
    <div class="top">
      <div class="title">
        <div class="font">首页</div>
        <div class="arrow">></div>
        <div class="font">用户管理</div>
        <div class="arrow">></div>
        <div class="font">用户列表</div>
      </div>
      <div class="table">
        <div class="box">
          <div class="header">
            <div class="search">
              <el-input placeholder="请输入搜索内容" v-model="query">
                <el-button slot="append" icon="el-icon-search" @click="search(query)"></el-button>
              </el-input>
            </div>
            <el-button type="primary" @click="dialogFormVisible = true">添加商品</el-button>
          </div>
          <el-table :data="goods" style="width: 100%">
            <el-table-column prop="index" label="#" width="50" align="center"></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" min-width="500" align="center"></el-table-column>
            <el-table-column prop="goods_price" label="商品价格（元）" align="center" width="150"></el-table-column>
            <el-table-column prop="goods_weight" label="商品重量" align="center" width="150"></el-table-column>
            <el-table-column prop="Time" label="创建时间" align="center" width="200"></el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-edit"
                  type="primary"
                  size="mini"
                  @click="update(scope.row)"
                ></el-button>
                <el-button
                  icon="el-icon-delete"
                  type="danger"
                  size="mini"
                  @click="del(scope.row.goods_id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="paging">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
      <el-dialog title="编辑商品" :visible.sync="updategoods">
        <el-form :model="updatelist" :rules="rules" ref="updatelist">
          <el-form-item label="商品名称" :label-width="formLabelWidth" prop="goods_name">
            <el-input v-model="updatelist.goods_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth" prop="goods_price">
            <el-input type="number" v-model="updatelist.goods_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" :label-width="formLabelWidth" prop="goods_number">
            <el-input v-model="updatelist.goods_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" :label-width="formLabelWidth" prop="goods_weight">
            <el-input v-model="updatelist.goods_weight" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updategoods = false">取 消</el-button>
          <el-button type="primary" @click="subupdate">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagenum: 1,
      pagesize: 10, //每页条数
      query: "", //关键词
      total: 0, //商品总数
      goods: [], //商品列表
      currentPage: 1, //当前页数
      updategoods:false,        //编辑商品开关
      updatelist:{},          //编辑商品当前行的商品参数
      formLabelWidth: "120px",
      rules: {
        goods_name: [{ required: true, message: "请输入商品名", trigger: "blur" }],
        goods_price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        goods_number: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        goods_weight: [{ required: true, message: "请输入商品重量", trigger: "blur" }],
      },
       //添加角色验证
    };
  },
  components: {},
  methods: {
    //搜索商品
    search(e) {
      this.query = e;
      this.getGoods();
    },
     //改变每页条数
    handleSizeChange(e) {
      this.pagesize = e;
      this.getGoods();
    },
    //改变页数
    handleCurrentChange(e) {
      this.pagenum = e;
      this.getGoods();
    },
    //编辑商品
    update(e){
      // console.log(e)
      this.updatelist=e
      this.updategoods=true
    },
    subupdate(){
      this.updategoods=false
    },
    //获取商品列表
    getGoods(pagenum, pagesize, query) {
      this.$store
        .dispatch("goods/goods", {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          query: this.query
        })
        .then(res => {
          this.goods = res.data.goods;
          this.total = res.data.total;
          //  console.log(res)
          let index = 0;
          this.goods.map(item => {
            this.$set(item, "Time", this.$dayjs(item.add_time).format('YYYY-MM-DD HH:mm:ss'));
            this.$set(item, "index", (index += 1));
          });
          console.log(this.goods);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除商品
    del(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("goods/delGoods", e)
            .then(res => {
              if (res.meta.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.pagenum = 1;
                this.getGoods();
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.getGoods();
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
      border: 1px solid #dddcdc;
      .box {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        .header {
          width: 100%;
          height: 40px;
          display: flex;
          margin: 0 0 20px 0;
          .search {
            width: 30%;
            margin-right: 30px;
          }
        }
        .paging {
          margin: 20px 0 0 0;
        }
      }
    }
  }
}
</style>