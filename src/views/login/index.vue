<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          {{ $t("login.title") }}
        </h3>
        <!-- <lang-select class="set-language"/> -->
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="大写已开启"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>
      <!-- <div id="geetest"></div> -->
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-top: 30px"
        @click.native.prevent="handleLogin"
      >
        {{ $t("login.logIn") }}
      </el-button>

      <!-- <div style="position: relative">
        <div class="tips"></div>
      </div> -->
    </el-form> 
<!-- 
    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
      {{ $t("login.thirdpartyTips") }}
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog> -->
  </div>
</template>

<script>
import gt from "@/utils/gt.js";
import LangSelect from "@/components/LangSelect";
import SocialSign from "./components/SocialSignin";
import axios from "axios";

export default {
  name: "Login",
  components: { LangSelect, SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位数"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        // username: 'ticket_sys',
        // password: 'CDE#4rfv'
        username: "",
        password: "",
        // username: "xx_wsz_ticket_seller",
        // password: "8MR!aUZqv!37",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      textarea: "", // 验证码
      validResult: null,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {
    // this.validateCodeGT();
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {},
  methods: {
    validateCodeGT() {
      this.$get("/sys/validateCodeGT", {})
        .then((res) => {
          let data = res;
          //请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
          initGeetest(
            {
              // 以下配置参数来自服务端 SDK
              gt: data.gt,
              challenge: data.challenge,
              offline: !data.success,
              new_captcha: true,
              product: "bind",
              width: "100%",
              https: true
            },
            (captchaObj) => {
              // 这里可以调用验证实例 captchaObj 的实例方法
              // captchaObj.appendTo("#geetest"); //将验证按钮插入到宿主页面中geetest元素内
              captchaObj
                .onReady(() => {
                  // captchaObj.showCaptcha();
                  captchaObj.verify();
                })
                .onSuccess(() => {
                  //your code
                  this.validResult = captchaObj.getValidate();
                  this.submitLogin()
                  setTimeout(()=>{
                    captchaObj.destroy()
                    captchaObj=null
                  },1500)
                })
                .onError(() => {
                  captchaObj.reset()
                  //your code
                })
                .onClose(()=>{
                  this.loading=false
                })
            }
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    /**
     * 登录
     */
    handleLogin(){
      if (this.loginForm.username === "") {
        this.$message.warning('请输入账号')
        return
      } else if (this.loginForm.password === "") {
        this.$message.warning('请输入密码')
        return
      }
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
            this.loading = true;
            this.validateCodeGT()
        }else {
          // console.log('error submit!!');
          return false;
        }
      })
    },
    submitLogin() {
      this.loginForm.geetest_challenge = this.validResult.geetest_challenge
      this.loginForm.geetest_seccode = this.validResult.geetest_seccode
      this.loginForm.geetest_validate = this.validResult.geetest_validate
      // this.$refs.loginForm.validate((valid) => {
        // if (valid) {
          this.$store
            .dispatch("user/login", this.loginForm)
            .then((res) => {
              if (res && res.code == 200) {
                // this.$router.push({
                //   path: "/home",
                // });
                window.open('https://ticket.chinaums.com/', '_blank')
              }
              // setTimeout(()=>{
              //   this.loading = false;
              // },1500)
            })
            .catch(() => {
              this.loading = false;
            });
  
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },

  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
  ::v-deep .el-input {
    input {
      background: transparent !important;
      border: none;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0;
      border-bottom: none !important;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #242F3C inset !important;  //这里#fff是设置和我input框同样颜色
        -webkit-text-fill-color: #fff !important;  //这里是文本框字体颜色
      }
    }
    .el-input__inner{
      background: transparent !important;
    }
  }
</style>
