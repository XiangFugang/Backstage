<template>
  <div class="all">
    <div class="top">
      <div class="title">
        <div class="font">首页</div>
        <div class="arrow">></div>
        <div class="font">订单管理</div>
        <div class="arrow">></div>
        <div class="font">订单列表</div>
      </div>
      <div class="table">
        <div class="box">
          <div class="header">
            <div class="search">
              <el-input placeholder="请输入搜索内容" v-model="query">
                <el-button slot="append" icon="el-icon-search" @click="search(query)"></el-button>
              </el-input>
            </div>
          </div>
          <el-table :data="orders" border style="width: 100%">
            <el-table-column prop="index" label="#" width="50" align="center"></el-table-column>
            <el-table-column prop="order_number" label="订单编号" min-width="200" align="center"></el-table-column>
            <el-table-column prop="order_price" label="订单价格" align="center" min-width="200"></el-table-column>
            <el-table-column label="是否付款" align="center" min-width="200">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.order_pay==='0'">已付款</el-tag>
                <el-tag type="danger" v-else>未付款</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="is_send" label="是否发货" align="center" min-width="200"></el-table-column>
            <el-table-column prop="Time" label="下单时间" align="center" min-width="200"></el-table-column>
            <el-table-column label="操作" align="center" min-width="200">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-edit"
                  type="primary"
                  size="mini"
                  @click="update(scope.row)"
                ></el-button>
                <el-button icon="el-icon-location" type="success" size="mini" @click="look"></el-button>
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
      <el-dialog title="物流信息" :visible.sync="looklock">
        <el-steps :active="0"  direction="vertical" space="80px">
          <el-step :title="item.context" :description="item.time" v-for="(item,index) in result" :key="index"></el-step>
        </el-steps>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagenum: 1,
      looklock: false,
      pagesize: 10, //每页条数
      query: "", //关键词
      total: 0, //订单总数
      orders: [], //订单列表
      currentPage: 1, //当前页数
      user_id: "",
      result:[],
      pay_status: "",
      is_send: "",
      order_fapiao_title: "",
      order_fapiao_company: "",
      order_fapiao_content: "",
      consignee_addr: ""
    };
  },
  components: {},
  methods: {
    //搜索订单
    search(e) {
      this.query = e;
      this.getOrders();
    },
    //改变每页条数
    handleSizeChange(e) {
      this.pagesize = e;
      this.getOrders();
    },
    //改变页数
    handleCurrentChange(e) {
      this.pagenum = e;
      this.getOrders();
    },
    //获取商品列表
    getOrders(
      pagenum,
      pagesize,
      query,
      user_id,
      pay_status,
      is_send,
      order_fapiao_title,
      order_fapiao_company,
      order_fapiao_content,
      consignee_addr
    ) {
      this.$store
        .dispatch("goods/orders", {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          query: this.query,
          user_id: this.user_id,
          pay_status: this.pay_status,
          is_send: this.is_send,
          order_fapiao_title: this.order_fapiao_title,
          order_fapiao_company: this.order_fapiao_company,
          order_fapiao_content: this.order_fapiao_content,
          consignee_addr: this.consignee_addr
        })
        .then(res => {
          this.total = res.data.total;
          console.log(res);
          let index = 0;
          res.data.goods.map(item => {
            this.$set(
              item,
              "Time",
              this.$dayjs(item.create_time).format("YYYY-MM-DD HH:mm:ss")
            );
            this.$set(item, "index", (index += 1));
          });
          this.orders = res.data.goods;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查看物流
    wuLiu(id) {
      this.$store
        .dispatch("goods/wuLiu", id)
        .then(res => {
          console.log(res);
          this.result=res.data
        })
        .catch(err => {
          console.log(err);
        });
    },
    look() {
      this.looklock=false
      this.looklock = true;
      this.wuLiu("1106975712662");
    }
  },
  mounted() {
    this.getOrders();
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