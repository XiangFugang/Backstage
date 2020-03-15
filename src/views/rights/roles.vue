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
          <div class="boxtop">
            <el-button type="primary" @click="dialogFormVisible=true">添加角色</el-button>
            <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleName">
                  <el-input autocomplete="off" v-model="ruleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" :label-width="formLabelWidth" prop="roleDesc">
                  <el-input autocomplete="off" v-model="ruleForm.roleDesc"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <el-table :data="roles" border style="width: 100%">
            <el-table-column width="100" align="center">></el-table-column>
            <el-table-column prop="index" label="#" width="100" align="center"></el-table-column>
            <el-table-column prop="roleName" label="职位" min-width="300" align="center"></el-table-column>
            <el-table-column prop="roleDesc" label="描述" min-width="300" align="center"></el-table-column>
            <el-table-column label="操作" min-width="300" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="updateRoles(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
                <el-button type="warning" size="mini" @click="distribution(scope.row)">分配权限</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-dialog title="编辑角色" :visible.sync="dialogFormVisible1">
        <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" class="demo-ruleForm">
          <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleName">
            <el-input autocomplete="off" v-model="ruleForm1.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" :label-width="formLabelWidth" prop="roleDesc">
            <el-input autocomplete="off" v-model="ruleForm1.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm1('ruleForm1')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="分配权限" :visible.sync="dialogFormVisible2">
        <el-tree
          :data="list"
          show-checkbox
          node-key="id"
          ref="tree"
          @check="change"
          draggable
          :default-expanded-keys="expanded"
          :default-checked-keys="userfloor3"
          :props="defaultProps"
        ></el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm1('ruleForm1')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roles: [], //角色列表
      list: [], //树状权限列表
      dialogFormVisible: false, //添加角色开关
      dialogFormVisible1: false, //编辑角色开关
      dialogFormVisible2: false, //角色分配权限开关
      ruleForm: {
        roleName: "",
        roleDesc: ""
      }, //添加用户数据绑定
      ruleForm1: {
        id: "",
        roleName: "",
        roleDesc: ""
      }, //编辑角色数据绑定
      formLabelWidth: "120px",
      rules: {
        roleName: [{ required: true, message: "请输入角色名", trigger: "blur" }]
      }, //添加角色验证
      rules1: {
        roleName: [{ required: true, message: "请输入角色名", trigger: "blur" }]
      }, //编辑角色验证
      defaultProps: {
        children: "children",
        label: "authName"
      },
      expanded: [],
      checked: [],
      listfloor3: [],
      userfloor3: []
    };
  },
  components: {},
  methods: {

    //获取角色列表
    getRoles() {
      this.$store
        .dispatch("user/roles")
        .then(res => {
          let index = 0;
          res.data.map(item => {
            this.$set(item, "index", (index += 1));
          });
          this.roles = res.data;
          // console.log(this.roles);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //添加角色提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("user/addRoles", this.ruleForm)
            .then(res => {
              this.dialogFormVisible = false;
              this.getRoles();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //打开编辑角色菜单
    updateRoles(e) {
      this.dialogFormVisible1 = true;
      // console.log(e)
      this.ruleForm1.roleName = e.roleName;
      this.ruleForm1.id = e.id;
    },
    //编辑角色提交表单
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm1);
          this.$store
            .dispatch("user/updateRoles", this.ruleForm1)
            .then(res => {
              console.log(res);
              this.getRoles();
              this.dialogFormVisible1 = false;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除角色
    del(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("user/delRoles", e)
            .then(res => {
              if (res.meta.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getRoles();
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
    },
    //获取权限列表
    getList(type) {
      this.$store
        .dispatch("rights/getList", type)
        .then(res => {
          this.list = res.data;
          console.log(this.list)
          res.data.map(item => {
            this.expanded.push(item.id);
            item.children.map(item1 => {
              this.expanded.push(item1.id);
            });
          });
          // console.log(this.expanded)
          // console.log(this.list, 1);
          // res.data.map(item => {
          //   item.children.map(item1 => {
          //     item1.children.map(item2 => {
          //       this.listfloor3.push(item2.id);
          //     });
          //   });
          // });
          // console.log(this.listfloor3, 222);
        })
        .catch(err => {
          console.log(err);
        });
    },
    distribution(e) {
      console.log(e)
      this.dialogFormVisible2 = true;
      this.getList("tree");
      e.children.map(item => {
        item.children.map(item1 => {
          item1.children.map(item2 => {
            this.userfloor3.push(item2.id);
          });
        });
      });
      // console.log(this.userfloor3, 333);
      // for (let a = 0; a < this.listfloor3.length; a++) {
      //   for (let i = 0; i < this.userfloor3.length; i++) {
      //     if (this.listfloor3[a].indexOf(this.userfloor3[i]) != -1) {
      //       this.checked.unshift(this.userfloor3[i]);
      //     }
      //   }
      // }
    },
    change(){
      this.$refs.tree.getCheckedKeys()
    }
  },
  mounted() {
    this.getRoles();
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
        .boxtop {
          padding-bottom: 20px;
        }
      }
    }
  }
}
</style>