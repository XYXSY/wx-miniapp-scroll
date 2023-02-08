<template>
  <div class="update-pwd-page">
    <el-card class="pwd-card" shadow="never">
    <el-form
      ref="updateForm"
      :model="updateForm"
      :rules="rules"
      autocomplete="off"
      label-width="80px"
    >
    <el-form-item label="账号：">
      <el-input v-model="updateForm.username" disabled></el-input>
    </el-form-item>
    <el-form-item label="原密码：" required>
      <el-input v-model="updateForm.password" autocomplete="new-password" show-password @keyup.enter.native="handleLogin" @keyup.native="checkCapslock"></el-input>
    </el-form-item>
    <el-form-item label="新密码：" prop="newPassword">
      <el-input v-model="updateForm.newPassword" autocomplete="new-password" show-password @keyup.native="checkCapslock"></el-input>
    </el-form-item>
    <el-form-item label="验证码：" prop="captcha">
      <el-input placeholder="请输入验证码" v-model="updateForm.captcha"></el-input>
      <img class="verification-img" :src="VerificationSrc" @click="refreshCode">
    </el-form-item>
    <div style="text-align: center;">
      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="update"
      >
       确认
      </el-button>
      <el-button
        :loading="loading"
        type="info"
        @click.native.prevent="toIndex"
      >
       取消
      </el-button>
    </div>
    </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { baseURL } from '@/settings.js'

export default {
  name: "Login",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位数"));
      } else {
        callback();
      }
    };
    return {
      VerificationSrc:baseURL+'/captcha.jpg?t='+new Date().getTime(),
      updateForm: {
        captcha:'',
        username: '',
        password: "",
        newPassword:'',
      },
      rules: {
        newPassword: [{ required: true, trigger: "blur", validator: validatePassword }],
        captcha:[{ required: true, trigger: "blur", message:'请输入验证码'}]
      },
      capsTooltip: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.updateForm.username=this.name
  },
  destroyed() {},
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    /**
     * 修改密码
     */
    async update() {
      this.$refs.updateForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$post('/sellticket/user/password',JSON.stringify(this.updateForm),"application/json")
            .then((res) => {
              if (res && res.code == 200) {
                this.$alert('您已修改密码，请重新登录', '修改成功', {
                  confirmButtonText: '确定',
                  type: 'success',
                  callback: action => {
                    this.$store.dispatch('user/resetToken').then(res=>{
                      location.reload()
                    })
                  }
                });
              }
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消
    toIndex(){
      this.$router.push({
          path: "/",
        });
    },
    refreshCode(){
      this.VerificationSrc=baseURL+'/captcha.jpg?t='+new Date().getTime()

    }
  },
};
</script>

<style lang="scss" scoped>
.update-pwd-page{
  .pwd-card{
    margin:50px auto;
    width: 500px;
  }
  .verification-img{
    width: 120px;
    height: 36px;
    cursor: pointer;
  }
  ::v-deep{
    .el-form-item__content{
      display: flex;
      align-items: center;
    }
  }
}
</style>
