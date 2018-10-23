<template>
  <div class="login">
    <div class="main">

      <!--<el-card class="box-card">-->
        <div slot="header" class="clearfix">
          <div class="login-logo"><img src="../../assets/login-pig-blue.svg"/></div><span>账务管理系统</span>
        </div>

      <el-tabs v-model="activeName" @tab-click="handleClick" stretch>

        <el-tab-pane label="账号登陆"  name="accountLogin">

          <el-form ref="loginForm" :model="loginForm" :rules="formRule" status-icon>
            <div class="input-row">
              <el-form-item prop="username">
                <el-input placeholder="请输入用户名" v-model="loginForm.username" auto-complete="off"
                          prefix-icon="iconfont icon-account"  @keyup.enter="onSubmit">
                </el-input>
              </el-form-item>
            </div>
            <div class="input-row">
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" type="password" v-model="loginForm.password" auto-complete="off"
                          prefix-icon="iconfont icon-passwd" suffix-icon="iconfont icon-eye-close" @keyup.enter="onSubmit">
                </el-input>
              </el-form-item>
            </div>
            <div class="input-row">
              <el-form-item prop="captcha">
                <el-input placeholder="验证码" v-model="loginForm.captcha" auto-complete="off"  @keyup.enter="onSubmit">
                  <template slot="append">
                    <div class="captcha"></div>
                  </template>
                </el-input>
              </el-form-item>
            </div>

            <div class="input-row">
              <div class="forget-passwd">忘记密码?</div>
              <el-checkbox v-model="loginForm.rememberMe" class="remember-passwd">记住密码</el-checkbox>
            </div>
            <div class="input-row">
              <el-button class="submit" type="primary" @click="onSubmit" :loading="islogin">登录
              </el-button>
            </div>
          </el-form>

        </el-tab-pane>

        <el-tab-pane label="手机登陆"  name="mobileLogin"></el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
// import {Loading, Message} from 'element-ui'
import {Message} from 'element-ui'

export default {
  name: 'login-vue',
  data () {
    const loginForm = {
      username: '',
      password: '',
      captcha: '',
      rememberMe: false
    }
    let captchaValid = (rule, value, callback) => {
      // if (value === '') {
      //   callback(new Error('请输入验证码'))
      // // } else if (value !== 'aaa') {
      // //   callback(new Error('验证码不正确,请重新输入'))
      // } else {
      //   callback()
      // }
      callback()
    }
    const formRule = {
      username: [
        {required: true, message: '请输入用户名', trigger: 'blur'}
      ],
      password: [
        {required: true, message: '请输入密码', trigger: 'blur'}
      ],
      captcha: [
        {validator: captchaValid, trigger: 'blur'}
      ]
    }
    return {
      loginForm: loginForm,
      formRule: formRule,
      islogin: false,
      activeName: 'accountLogin'
    }
  },
  mounted () {
    let vm = this
    document.onkeydown = function (e) {
      if (e.key === 'Enter') {
        vm.onSubmit()
      }
    }
  },
  methods: {
    handleClick: function () {

    },
    onSubmit: function () {
      let vm = this
      // vm.islogin = true
      vm.$refs['loginForm'].validate((valid) => {
        if (valid) {
          let userInfo = vm.loginForm
          vm.$store.dispatch('loginByUser', userInfo).then(() => {
            vm.$router.push({name: 'index'})
          }).catch(() => {
            console.error('登录验证失败')
          })
        } else {
          Message({
            message: '请检查登录信息',
            type: 'error',
            center: true
          })
        }
      })

      // let loadingInstance = Loading.service({
      //   lock: true,
      //   text: '请稍后,登录验证中..',
      //   spinner: 'el-icon-loading'
      // })
      // vm.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
      //   loadingInstance.close()
      // })
    }
  }
}
</script>

<style scoped lang="scss">

  .login {
    padding: 0;
    overflow: hidden;
    background: $white;
    width: 100%;
    height: 100%;
    @include border_;
    //主块
    .main {
      width: 350px;
      margin: 0px auto;
      @include border_;
      //标题
      .clearfix {
        margin: 30px 0px;
        text-align: center;
        .login-logo {
          img {
            width: 160px;
            height: 160px;
          }

          margin-bottom:10px;
        }
        span{
          font-size: 20px;
          letter-spacing: 20px;
        }
      }

      //表单行
      .input-row {
        margin-bottom: 20px;
        //验证码
        .captcha {
          width: 50px;
        }
        //记住密码
        .remember-passwd{
          margin-left:30px;
        }
        //忘记密码
        .forget-passwd{
          float:right;
          color: $Blue;
          margin-right:30px;
        }
        //按钮
        .submit {
          width: 100%;
        }
      }
    }
  }
</style>
