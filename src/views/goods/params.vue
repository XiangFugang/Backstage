<template>
  <div class="all">
    <div class="top">
      <div class="title">
        <div class="font">首页</div>
        <div class="arrow">></div>
        <div class="font">商品管理</div>
        <div class="arrow">></div>
        <div class="font">分类参数</div>
      </div>
      <div class="table">
        <div class="box">
          <div class="warning">
            <img src="../../images/waring.png" alt="警告" class="img" />
            <div class="text">注意:只允许为第三级分类设置相关参数!</div>
          </div>
          <div class="center">
            <div class="text">选择商品分类:</div>
            <el-cascader
              style="width:260px"
              v-model="value"
              :options="list"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
            ></el-cascader>
          </div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="动态参数" name="first">
              <el-button type="primary" size="small" @click="addCan" :disabled="disabled">添加参数</el-button>
              <el-table :data="livelist" style="width: 100%">
                <el-table-column prop="index" label="#" width="60" align="center"></el-table-column>
                <el-table-column width="40" align="center">></el-table-column>
                <el-table-column prop="attr_name" label="参数名称" min-width="400" align="center"></el-table-column>
                <el-table-column label="操作" align="center" min-width="400">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-edit"
                      @click="update(scope.row)"
                    >编辑</el-button>
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      @click="del(scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="second">
              <el-button type="primary" size="small" @click="addCan1">添加属性</el-button>
              <el-table :data="livelist" style="width: 100%">
                <el-table-column prop="index" label="#" width="60" align="center"></el-table-column>
                <el-table-column width="40" align="center">></el-table-column>
                <el-table-column prop="attr_name" label="参数名称" min-width="400" align="center"></el-table-column>
                <el-table-column label="操作" align="center" min-width="400">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-edit"
                      @click="update2(scope.row)"
                    >编辑</el-button>
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      @click="del2(scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <el-dialog title="修改动态参数" :visible.sync="dialogFormVisible">
        <el-form :model="updatelive" :rules="rules" ref="updatelive">
          <el-form-item label="动态参数" :label-width="formLabelWidth" prop="attr_name">
            <el-input v-model="updatelive.attr_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('updatelive')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改静态属性" :visible.sync="dialogFormVisible2">
        <el-form :model="updatelive2" :rules="rules2" ref="updatelive2">
          <el-form-item label="动态参数" :label-width="formLabelWidth" prop="attr_name">
            <el-input v-model="updatelive2.attr_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm2('updatelive2')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加动态参数" :visible.sync="dialogFormVisible1">
        <el-form :model="updatelive1" :rules="rules" ref="updatelive1">
          <el-form-item label="动态参数" :label-width="formLabelWidth" prop="attr_name">
            <el-input v-model="updatelive1.attr_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm1('updatelive1')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加静态属性" :visible.sync="dialogFormVisible3">
        <el-form :model="updatelive3" :rules="rules" ref="updatelive3">
          <el-form-item label="静态属性" :label-width="formLabelWidth" prop="attr_name">
            <el-input v-model="updatelive3.attr_name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm3('updatelive3')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled:true,
      livelist: [], //动态参数列表
      value: [], //商品分类ID
      list: [], //商品分类列表
      formLabelWidth: "100px",
      activeName: "first",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      updatelive: {},       //编辑动态参数表单
      updatelive1: {        //添加动态参数表单
        attr_name:''
      },
      updatelive3: {        //添加静态属性表单
        attr_name:''
      },
      updatelive2: {},      //编辑静态属性表单
      rules: {
        attr_name: [{ required: true, message: "请输入参数", trigger: "blur" }]
      },
      rules2: {
        attr_name: [{ required: true, message: "请输入参数", trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    //标签页方法
    handleClick(tab) {
      if(tab.name==="second"){
        this.parameter(this.value[2], "only");
        this.disabled=false
      }else{
        this.parameter(this.value[2], "many");
        this.disabled=false
      }
    },
    //添加动态参数
    addCan() {
      this.dialogFormVisible1 = true;
    },
    //添加静态属性
    addCan1() {
      this.dialogFormVisible3 = true;
    },
    //添加动态参数提交表单
    submitForm1(updatelive1) {
      this.$refs[updatelive1].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("goods/addCan", {
              id: this.value[2],
              attr_name: this.updatelive1.attr_name,
              attr_sel: "many",
              attr_vals:''
            })
            .then(res => {
              this.dialogFormVisible1 = false;
              this.parameter(this.value[2], "many");
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
    //添加静态属性提交表单
    submitForm3(updatelive3) {
      this.$refs[updatelive3].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("goods/addCan", {
              id: this.value[2],
              attr_name: this.updatelive3.attr_name,
              attr_sel: "only",
              attr_vals:''
            })
            .then(res => {
              this.dialogFormVisible3 = false;
              this.parameter(this.value[2], "only");
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
    //编辑动态参数
    update(e) {
      this.dialogFormVisible = true;
      this.updatelive = e;
      console.log(this.updatelive, 1);
    },
    //编辑静态参数
    update2(e) {
      this.dialogFormVisible2 = true;
      this.updatelive2 = e;
      // console.log(this.updatelive2, 1);
    },
    //删除参数
    del(e) {
      this.updatelive = e;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("goods/delCan", {
              id: this.updatelive.cat_id,
              attrId: this.updatelive.attr_id
            })
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.activeName="first",
              this.parameter(this.value[2], "many");
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
    },
    //删除静态参数
    del2(e) {
      this.updatelive2 = e;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("goods/delCan", {
              id: this.updatelive2.cat_id,
              attrId: this.updatelive2.attr_id
            })
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.activeName="second",
              this.parameter(this.value[2], "only");
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
    },
    //提交编辑动态参数
    submitForm(updatelive) {
      this.$refs[updatelive].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("goods/putCan", {
              id: this.updatelive.cat_id,
              attrId: this.updatelive.attr_id,
              attr_name: this.updatelive.attr_name,
              attr_sel: "many",
              attr_vals: this.updatelive.attr_vals
            })
            .then(res => {
              this.dialogFormVisible = false;
              this.parameter(this.value[2], "many");
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
    //提交编辑静态参数
    submitForm2(updatelive2) {
      this.$refs[updatelive2].validate(valid => {
        if (valid) {
          // console.log(updatelive2.cat_id);
          this.$store
            .dispatch("goods/putCan", {
              id: this.updatelive2.cat_id,
              attrId: this.updatelive2.attr_id,
              attr_name: this.updatelive2.attr_name,
              attr_sel: "only",
              attr_vals: this.updatelive.attr_vals
            })
            .then(res => {
              this.parameter(this.value[2], "only");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.dialogFormVisible2 = false;
    },
    //商品分类列表
    getCat() {
      this.$store
        .dispatch("goods/getCat")
        .then(res => {
          console.log(res.data)
          this.list = res.data;
          this.list.map(item => {
            this.$set(item, "label", item.cat_name);
            this.$set(item, "value", item.cat_id);
            if (item.children) {
              item.children.map(item1 => {
                this.$set(item1, "label", item1.cat_name);
                this.$set(item1, "value", item1.cat_id);
                if (item1.children) {
                  item1.children.map(item2 => {
                    this.$set(item2, "label", item2.cat_name);
                    this.$set(item2, "value", item2.cat_id);
                  });
                }
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //参数列表
    parameter(id, sel) {
      this.$store
        .dispatch("goods/parameter", {
          id,
          sel
        })
        .then(res => {
          let index = 0;
          res.data.map(item => {
            this.$set(item, "index", (index += 1));
          });
          this.livelist = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleChange(value) {
      this.disabled=false
      this.value = value;
      this.activeName="first",
      console.log(this.value);
      this.parameter(value[2], "many");
    }
  },
  mounted() {
    this.getCat();
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
        .warning {
          display: flex;
          padding: 10px 0;
          align-items: center;
          .img {
            width: 15px;
            height: 15px;
            margin: 0 10px;
          }
          .text {
            font-size: 14px;
            color: #e6a23c;
          }
        }
        .center {
          display: flex;
          padding: 10px 0;
          align-items: center;
          .text {
            font-size: 20px;
            padding-right: 20px;
          }
        }
      }
    }
  }
}
</style>