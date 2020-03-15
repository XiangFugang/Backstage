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
            <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
            <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                  <el-input autocomplete="off" v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                  <el-input autocomplete="off" v-model="ruleForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                  <el-input autocomplete="off" v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
                  <el-input autocomplete="off" v-model="ruleForm.mobile"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <el-table :data="users" border style="width: 100%">
            <el-table-column prop="index" label="#" width="100" align="center"></el-table-column>
            <el-table-column prop="username" label="姓名" width="180" align="center"></el-table-column>
            <el-table-column prop="role_name" label="角色" align="center"></el-table-column>
            <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
            <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
            <el-table-column label="状态" width="100" align="center">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.mg_state"
                  active-color="#13ce66"
                  inactive-color="#C0CCDA"
                  @change="change(scope.row.id,scope.row.mg_state)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑角色" placement="top">
                  <el-button
                    icon="el-icon-edit"
                    type="primary"
                    size="mini"
                    @click="update(scope.row)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
                  <el-button
                    icon="el-icon-delete"
                    type="danger"
                    size="mini"
                    @click="del(scope.row.id)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
                  <el-button
                    icon="el-icon-setting"
                    type="warning"
                    size="mini"
                    @click="postopen(scope.row)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <div class="paging">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[3, 5, 10, 20]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
      <el-dialog title="编辑用户" :visible.sync="updatelock">
        <el-form :model="updateForm" :rules="rules2" ref="updateForm">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="updateForm.username" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="updateForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
            <el-input v-model="updateForm.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updatelock = false">取 消</el-button>
          <el-button type="primary" @click="submitForm2('updateForm')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="分配用户" :visible.sync="postlock">
        <div class="formtext">当前用户:{{postForm.username}}</div>
        <div class="formtext">当前角色:{{postForm.role_name}}</div>
        <div class="select">
          <el-select v-model="postrole" placeholder="请选择">
            <el-option v-for="(item,index) in roles" :key="index" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="postlock = false">取 消</el-button>
          <el-button type="primary" @click="subrole(postrole)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0, //用户总数
      users: [], //用户列表数据
      pagenum: 1,
      pagesize: 5, //每页条数
      query: "", //关键词
      currentPage: 1, //当前页数
      postForm: {},
      postform: {
        rolename: ""
      },
      postrole:'',
      roles: [],
      dialogFormVisible: false, //添加用户弹窗开关
      updatelock: false, //编辑用户弹窗开关
      postlock: false, //分配用户弹窗开关
      formLabelWidth: "120px",
      //表单数据绑定
      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      updateForm: {}, //修改数据表单
      //表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 15,
            message: "密码长度在 6 到 15 个字符",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            min: 6,
            max: 15,
            message: "请输入正确的邮箱",
            trigger: "blur"
          }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" }
          // { type: "number", message: "请输入正确的手机号", trigger: "blur" }
        ]
      },
      rules2: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            min: 6,
            max: 15,
            message: "请输入正确的邮箱",
            trigger: "blur"
          }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" }
          // { type: "number", message: "请输入正确的手机号", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    //搜索用户
    search(e){
      this.query=e
      this.getUsers();
    },
    //改变每页条数
    handleSizeChange(e) {
      this.pagesize = e;
      this.getUsers();
    },
    //改变页数
    handleCurrentChange(e) {
      this.pagenum = e;
      this.getUsers();
    },
    //修改用户
    update(e) {
      this.updatelock = true;
      this.updateForm = e;
    },
    //打开分配角色并获取角色列表
    postopen(e) {
      this.postlock = true;
      this.postForm = e;
      console.log(e)
      this.$store
        .dispatch("user/roles")
        .then(res => {
          this.roles = res.data;
          console.log(this.roles);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //提交分配角色
    subrole(e){
      this.$store
        .dispatch("user/subRole",{
          id:this.postForm.id,
          rid:e
        })
        .then(res => {
          console.log(this.roles);
          this.postlock = false;
          this.getUsers();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取用户列表
    getUsers(pagenum, pagesize, query) {
      this.$store
        .dispatch("user/users", {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          query: this.query
        })
        .then(res => {
          this.total = res.data.total;
          //  console.log(res)
          let index = 0;
          res.data.users.map(item => {
            this.$set(item, "index", (index += 1));
          });
          this.users = res.data.users;
          console.log(this.users);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //改变状态
    change(id, e) {
      // console.log(id,e);
      this.$store
        .dispatch("user/upstate", {
          uId: id,
          type: e
        })
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //添加用户提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("user/addUsers", this.ruleForm)
            .then(res => {
              this.dialogFormVisible = false;
              this.getUsers();
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
    //编辑用户提交表单
    submitForm2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("user/updateUser", this.updateForm)
            .then(res => {
              console.log(res);
              this.getUsers();
              this.updatelock = false;
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
    //删除用户
    del(e) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("user/delUser", e)
            .then(res => {
              if (res.meta.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.pagenum = 1;
                this.getUsers();
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
    this.getUsers();
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
    .formtext {
      padding-bottom: 20px;
      font-size: 14px;
    }
  }
}
</style>