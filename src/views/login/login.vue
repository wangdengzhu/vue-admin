<template>
  <div id="login-container">
    <div class="LoginForm text-center">
          <div class="loginTitle">
              <span class="title">满金店后台管理系统</span>
          </div>
          <el-form ref="loginForm" v-bind:model="form" v-bind:rules="rules">
              <div class="mjb-item">
                  <p class="error-tip">{{errorTips}}</p>
                  <el-form-item prop="userAccount">
                      <el-input placeholder="用户名" v-model.trim="form.userAccount" v-on:keyup.enter.native="onSubmit">
                          <i slot="prefix" class="userName my-icon"></i>
                      </el-input>
                  </el-form-item>
                  <el-form-item prop="userPwd">
                      <el-input type="password" placeholder="密码" v-model.trim="form.userPwd" v-on:keyup.enter.native="onSubmit">
                          <i slot="prefix" class="password my-icon"></i>
                      </el-input>
                  </el-form-item>
                  <el-form-item prop="code" v-if="false">
                      <el-input placeholder="验证码" v-model="form.code" class="my-input" maxlength="6">
                          <i slot="prefix" class="code my-icon"></i>
                      </el-input>
                      <el-button v-on:click.prevent="sendCode" v-bind:disabled="isSendCode" class="send-code">{{sendCodeBtn}}</el-button>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" v-on:click="onSubmit" v-bind:disabled="nonLogin" class="login-btn">{{loginBtn}}</el-button>
                  </el-form-item>
              </div>
          </el-form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        userAccount: '',
        userPwd: ''
      },
      rules: {
        userAccount: [
          { required: true, message: '账户名不能为空', trigger: 'blur' }
        ],
        userPwd: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      errorTips: '', // 登录失败提示文字
      isShowTips: false, // 是否显示登录失败提示文字
      nonLogin: false, // 禁用登录按钮
      loginBtn: '登录' // 登录按钮显示文字
    }
  },
  mounted () {
    // this.$get('pms/Eleme/GetSpuStatusList', {id: 1})
    //   .then((response) => {
    //     console.log(response)
    //   })
  },
  methods: {
    // 用户登录
    onSubmit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('LoginByUsername', this.form).then((response) => {
            this.$router.push({ path: this.common.getParam('redirect') || '/default' })
          })
        }
      })
    }
  }
}
</script>

<style scoped>
html, body {
    height: 100%;
    overflow: hidden;
}
#app{
  height: 100%;
}
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset;
}

#login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(./../../assets/images/bg.png) no-repeat;
  background-size: 100% 100%;
}

.LoginForm {
  margin: 150px auto;
  border-radius: 30px;
  width: 450px;
  max-height: 622px;
  box-shadow: 0px 12px 20px 12px rgba(7, 64, 51, 0.5);
  filter: Alpha(opacity=50);
  background: #fff;
  text-align: center;
}

.loginTitle {
  height: 160px;
  line-height: 160px;
  background: url(./../../assets/images/header_bg.png) no-repeat;
  background-size: 100% 100%;
}

.loginTitle > .title {
  margin-left: 20px;
  color: #fff;
  font-size: 28px;
}

.LoginForm .loginMiddle {
  background: #fff;
  padding: 0 40px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
}

.LoginForm .el-form-item {
  margin-left: 65px;
  margin-bottom: 30px;
  width: 320px;
}

.userName {
  background: url(./../../assets/images/userName.png) no-repeat;
}

.password {
  background: url(./../../assets/images/password.png) no-repeat;
}

.my-icon {
  height: 17px;
  width: 13px;
  display: inline-block;
  margin-top: 13px;
  margin-left: 5px;
  background-size: 100%;
}

#btnLogin:not(:disabled) {
  background-color: #00b38a;
}
#root_container {
  height: 100%;
}
.el-input .el-input__inner {
  line-height: 43px;
  height: 43px;
  border: 1px solid #00b38a;
  border-radius: 10px;
  outline: none;
}
.mjb-item {
  padding-bottom: 30px;
}
.error-tip {
  margin: 10px auto;
  width: 320px;
  color: red;
}
.login-btn {
  border-radius: 10pt;
  color: #fff;
  font-size: 24px;
  width: 320px;
  height: 50px;
  border: none;
  outline: none;
}
.login-btn:not(:disabled) {
  background-color: #00b38a;
}
.my-input {
  width: 175px;
}
.send-code {
  margin-left: 30px;
  width: 110px;
  color: #fff;
  background: #00b38a;
  font-size: 16px;
  border-radius: 9pt;
  border: none;
  height: 43px;
  outline: none;
}
.el-button:focus,
.el-button:hover {
  color: #fff;
  background-color: #00b38a;
}
</style>
