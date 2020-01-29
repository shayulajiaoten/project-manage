<template>
  <div class="main">
    <a-form
      v-show="!oauthLoading"
      class="user-layout-login"
      ref="formLogin"
      id="formLogin"
      :form="form"
    >
      <a-tabs :tabBarStyle="{ textAlign: 'center'}">
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="帐户名或邮箱地址"
              v-decorator="[
                        'account',
                        {rules: [{ required: true, message: '请输入帐户名或邮箱地址' },
                        { validator: this.handleUsernameOrEmail }], validateTrigger: 'blur'}
                      ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码"
              v-decorator="[
                        'password',
                        {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
                      ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a
              class="forge-password"
              style="float: right;"
              @click="routerLink('/member/forgot')"
            >忘记密码</a>
          </a-form-item>
          <a-form-item style="margin-top:24px">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="login-button"
              :loading="loginBtn"
              @click.stop.prevent="handleSubmit"
              :disabled="loginBtn"
            >登录</a-button>
            <div class="user-login-other">
              <router-link class="register" :to="{ name: 'register' }">注册账户</router-link>
            </div>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
    </a-form>
  </div>
</template>

<script>
import { Login } from "@/api/user";
import { checkResponse } from "@/assets/js/utils";
import $router from '../../router/index';
export default {
  name: "Login",
  data() {
    return {
      customActiveKey: "tab1",
      loginBtn: false,
      oauthLoading: false,
      // login type: 0 email, 1 account, 2 telephone
      loginType: 0,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        smsSendBtn: false
      },
      formLogin: {
        account: "",
        password: "",
        captcha: "",
        mobile: "",
      }
    };
  },
  methods: {
    handleUsernameOrEmail(rule, value, callback) {
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (regex.test(value)) {
        this.loginType = 0;
      } else {
        this.loginType = 1;
      }
      callback();
    },
    handleSubmit() {
      const app = this;
      let loginParams = {
      };
      app.form.validateFields(
        ["account", "password"],
        { force: true },
        (err, values) => {
          if (!err) {
            loginParams.member_name = values.account
            loginParams.password = values.password;
            app.loginBtn = true;
            Login(loginParams)
              .then(res => {
                if (checkResponse(res)) {
                  // this.dealDataBeforeLogin(res);
                  this.$router.push('/home');
                }
                this.loginBtn = false;
              })
              .catch(() => {
                this.loginBtn = false;
              });
          }
        }
      );
    }
  }
};
</script>

<style lang="less">
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
