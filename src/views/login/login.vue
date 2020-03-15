<template>
  <div class="all">
    <div class="main">
      <div class="form">
        <div class="form_header">
          <div class="title">欢迎来到小爱后台管理系统</div>
        </div>
        <div class="form_text">
          <div class="text">
            <el-form
              :label-position="labelPosition"
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="110px"
              class="demo-ruleForm"
            >
              <el-form-item label="请输入用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>
              <el-form-item label="请输入密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div>特别提醒: 如果您是管理员,请使用管理员账号登录,如果不知道账号,请联系公司人事。</div>
          <el-row>
            <el-button type="primary" @click="login('ruleForm')" :loading="loading" class="login">登录</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "left",
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  components: {},
  mounted() {},
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.commit("user/SET_LOADING", true);
          this.$store
            .dispatch("user/login", this.ruleForm)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  watch: {},
  computed: {
    loading() {
      return this.$store.state.user.loading;
    }
  }
};
</script>

<style lang='scss' scoped>
.all {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../../images/back.jpg") no-repeat;
  background-size: cover;
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .form {
      width: 650px;
      height: 350px;
      background-color: white;
      border: 1px solid #ebeef5;
      border-radius: 5px;
      .form_header {
        width: 650px;
        height: 78px;
        border-bottom: 1px solid #ebeef5;
        .title {
          width: 100%;
          height: 100%;
          font-size: 30px;
          text-align: center;
          line-height: 78px;
          font-weight: 700;
        }
      }
      .form_text {
        width: 610px;
        height: 230px;
        margin: 20px 0 0 20px;
        .text {
          width: 500px;
        }
        .login {
          margin: 20px 0 0 280px;
        }
      }
      .button {
        width: 100px;
        height: 40px;
        background: #409eff;
        text-align: center;
        line-height: 40px;
        color: white;
        border-radius: 4px;
        margin: 20px auto 0;
      }
    }
  }
}
</style>