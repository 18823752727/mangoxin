<template>
  <div class="login">
    <div class="login-content">
      <div class="title">系统登录</div>
      <el-form class="login-form" :model="form" :rules="rules" ref="form" label-width="0">
        <el-form-item prop="user">
          <el-input placeholder="请输入用户名"
                    v-model="form.user"
                    @keyup.enter="submitForm('form')"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    placeholder="请输入密码"
                    v-model="form.password"
                    @keyup.enter="submitForm('form')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import api from '../http';
  import {mapActions} from 'vuex';


  export default {
    name: 'login',
    data() {
      return {
        form: {
          user: '',
          password: ''
        }
      }
    },
    computed: {
      rules() {
        return {
          user: [
            {required: true, message: '请输入活动名称'}
          ],
          password: [
            {required: true, message: '请输入密码'}
          ]
        }
      }
    },
    methods: {
      ...mapActions(['clearUserInfo', 'setUserInfo']),

      /**
       * 提交表单
       * @param formName 需要校验的表单名称
       */
      submitForm(formName) {
        let _this = this;

        _this.$refs[formName].validate((valid) => {
          if (valid) {
            // 登录操作
            api.login(_this.form).then((res) => {
              // 登录成功操作
              _this.loginSuccess(res);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      /**
       * 登录成功操作
       * @param {Object} res 用户信息
       */
      loginSuccess(res) {
        let _this = this;

        //  存储登录信息
        _this.setUserInfo(res);

        // 跳转到列表页面
        _this.$router.push({
          path: '/'
        })
      }
    }
  }
</script>

<style lang="less">
  .login-form {
    .el-input {
      .el-input__inner {
        border-color: #3F4959;
        color: #fff;
        background-color: #2A3444;
      }
    }

    .login-btn {
      width: 100%;
      margin-top: 20px;
    }
  }
</style>


<style scoped lang="less">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2F3A4C;

    .login-content {
      width: 300px;

      .title {
        text-align: center;
        font-size: 28px;
        color: #fff;
      }

      .login-form {
        margin-top: 30px;
      }
    }
  }
</style>
