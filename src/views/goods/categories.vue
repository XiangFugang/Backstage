<template>
  <div class="all">
    <div class="top">
      <div class="title">
        <div class="font">首页</div>
        <div class="arrow">></div>
        <div class="font">商品管理</div>
        <div class="arrow">></div>
        <div class="font">商品分类</div>
      </div>
      <div class="table">
        <div class="box">
          <div class="header">
            <el-button type="primary" @click="addCat">添加分类</el-button>
          </div>
          <zk-table
            ref="table"
            :data="list"
            :columns="columns"
            :stripe="props.stripe"
            :border="props.border"
            :show-header="props.showHeader"
            :show-summary="props.showSummary"
            :show-row-hover="props.showRowHover"
            :show-index="props.showIndex"
            :tree-type="props.treeType"
            :is-fold="props.isFold"
            :expand-type="props.expandType"
            :selection-type="props.selectionType"
            sum-text="sum"
            index-text="#"
          >
            <template slot="effective">
              <img src="../../images/true.png" alt />
            </template>
            <template slot="level" slot-scope="scope">
              <el-tag v-if="scope.row.cat_level===0" size="small">一级</el-tag>
              <el-tag v-if="scope.row.cat_level===1" size="small" type="success">二级</el-tag>
              <el-tag v-if="scope.row.cat_level===2" size="small" type="warning">三级</el-tag>
            </template>
            <template slot="operation" slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="update(scope.row)"
              >编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)">删除</el-button>
            </template>
          </zk-table>
        </div>
        <el-dialog title="编辑分类" :visible.sync="dialogFormVisible">
          <el-form :model="updatelive" :rules="rules" ref="updatelive">
            <el-form-item label="分类名称" :label-width="formLabelWidth" prop="cat_name">
              <el-input v-model="updatelive.cat_name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('updatelive')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加分类" :visible.sync="dialogFormVisible1">
          <el-form :model="addCatForm" :rules="rules" ref="addCatForm">
            <el-form-item label="分类名称" :label-width="formLabelWidth" prop="cat_name">
              <el-input v-model="addCatForm.cat_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="父级分类" :label-width="formLabelWidth" prop="value">
              <el-cascader
                v-model="value"
                style="width:400px"
                :options="addlist"
                :props="{ checkStrictly: true,expandTrigger: 'hover' }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="submitForm1('addCatForm')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
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
</template>

<script>
export default {
  data() {
    return {
      props: {
        stripe: false,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: true,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false
      },
      formLabelWidth: "100px",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      disabled: true,
      updatelive: {},
      addCatForm: {
        cat_name: ""
      },
      value: [],
      addid: [],
      rules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      },
      rules1: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      },
      addlist: [],
      list: [],
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
          minWidth: "350px"
        },
        {
          label: "是否有效",
          minWidth: "350px",
          align: "center",
          headerAlign: "center",
          type: "template",
          template: "effective"
        },
        {
          label: "排序",
          minWidth: "350px",
          type: "template",
          align: "center",
          headerAlign: "center",
          type: "template",
          template: "level"
        },
        {
          label: "操作",
          minWidth: "350px",
          type: "template",
          align: "center",
          headerAlign: "center",
          type: "template",
          template: "operation"
        }
      ],
      pagenum: 1,
      pagesize: 5,
      text1: this.$store.getters.code,
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      loading: false,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  components: {},
  methods: {
    //改变每页条数
    handleSizeChange(e) {
      this.pagesize = e;
      this.getCat();
    },
    //改变页数
    handleCurrentChange(e) {
      this.pagenum = e;
      this.getCat();
    },
    handleChange(value) {
      console.log(value);
      if ((value.length = 1)) {
        this.addid = value[0];
        this.level = 1;
      } else if ((value.length = 2)) {
        this.addid = value[1];
        this.level = 2;
      } else {
        this.addid = 0;
        this.level = 0;
      }
      console.log(this.addid, 3);
      console.log(this.level, 4);
    },
    //商品分类列表
    getCat(pagenum, pagesize) {
      this.$store
        .dispatch("goods/getCat1", {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        })
        .then(res => {
          this.list = res.data.result;
          this.total=res.data.total
          console.log(res.data, 1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCat2(type) {
      this.$store
        .dispatch("goods/getCat2", type)
        .then(res => {
          console.log(res.data, 2);
          this.addlist = res.data;
          this.addlist.map(item => {
            this.$set(item, "value", item.cat_id);
            this.$set(item, "label", item.cat_name);
            if (item.children) {
              item.children.map(item1 => {
                this.$set(item1, "value", item1.cat_id);
                this.$set(item1, "label", item1.cat_name);
              });
            }
          });
          console.log(this.addlist);
        })
        .catch(err => {
          console.log(err);
        });
    },
    update(e) {
      console.log(e);
      this.dialogFormVisible = true;
      this.updatelive = e;
    },
    addCat() {
      this.dialogFormVisible1 = true;
    },
    //提交编辑商品分类
    submitForm(updatelive) {
      this.$refs[updatelive].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("goods/updateCategories", {
              id: this.updatelive.cat_id,
              cat_name: this.updatelive.cat_name
            })
            .then(res => {
              this.dialogFormVisible = false;
              this.getCat();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.dialogFormVisible = false;
    },
    //提交添加商品分类
    submitForm1(addCatForm) {
      this.$refs[addCatForm].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("goods/updateCategories", {
              cat_pid: this.addid,
              cat_name: this.addCatForm.cat_name,
              cat_level: this.level
            })
            .then(res => {
              this.dialogFormVisible1 = false;
              this.getCat();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.dialogFormVisible = false;
    }
  },
  mounted() {
    this.getCat();
    this.getCat2("2");
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
        .header {
          margin-bottom: 15px;
        }
      }
    }
    .block {
      display: flex;
      align-items: center;
      .text {
        width: 90px;
        text-align: end;
        margin-right: 10px;
      }
    }
  }
}
</style>