<template>
  <div class="main user-layout-register">
    <h3>
      <span>注册</span>
    </h3>
    <a-form ref="formRegister" :autoFormCreate="(form)=>{this.form = form}" id="formRegister">
      <a-form-item
        fieldDecoratorId="email"
        :fieldDecoratorOptions="{rules: [{ required: true, type: 'email', message: '请输入邮箱地址' }], validateTrigger: ['change', 'blur']}"
      >
        <a-input size="large" type="text" placeholder="邮箱"></a-input>
      </a-form-item>
      <a-form-item
        fieldDecoratorId="member_name"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名' }], validateTrigger: ['change', 'blur']}"
      >
        <a-input size="large" type="text" placeholder="用户名"></a-input>
      </a-form-item>
      <a-form-item fieldDecoratorId="nickname">
        <a-input size="large" type="text" placeholder="昵称"></a-input>
      </a-form-item>

      <a-form-item
        fieldDecoratorId="question"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择密保问题' }], validateTrigger: ['change', 'blur']}"
      >
        <a-select size="large" placeholder="请选择密保问题">
          <a-select-option value="phone">你的手机号码</a-select-option>
          <a-select-option value="profession">你的职业</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        fieldDecoratorId="answer"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密保答案' }], validateTrigger: ['change', 'blur']}"
      >
        <a-input size="large" type="text" placeholder="密保答案"></a-input>
      </a-form-item>
            <a-popover placement="rightTop" trigger="click" :visible="state.passwordLevelChecked">
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">
              强度：
              <span>{{ passwordLevelName }}</span>
            </div>
            <a-progress
              :percent="state.percent"
              :showInfo="false"
              :strokeColor=" passwordLevelColor "
            />
            <div style="margin-top: 10px;">
              <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
            </div>
          </div>
        </template>
        <a-form-item
          fieldDecoratorId="password"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}"
        >
          <a-input
            size="large"
            type="password"
            @click="handlePasswordInputClick"
            autocomplete="false"
            placeholder="密码须至少6位，且区分大小写"
          ></a-input>
        </a-form-item>
      </a-popover>
      <a-form-item
        fieldDecoratorId="password2"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}"
      >
        <a-input size="large" type="password" autocomplete="false" placeholder="再次确认您的密码"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn"
        >注册</a-button>
        <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
// import md5 from 'md5'
import { register } from "@/api/user";
import { checkResponse } from "../../assets/js/utils";
import { notice } from "../../assets/js/notice";

const levelNames = {
  0: "低",
  1: "低",
  2: "中",
  3: "强"
};
const levelClass = {
  0: "error",
  1: "error",
  2: "warning",
  3: "success"
};
const levelColor = {
  0: "#ff0000",
  1: "#ff0000",
  2: "#ff7e05",
  3: "#52c41a"
};
export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: null,

      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: "#FF0000"
      },
      registerBtn: false
    };
  },
  computed: {
    passwordLevelClass() {
      return levelClass[this.state.passwordLevel];
    },
    passwordLevelName() {
      return levelNames[this.state.passwordLevel];
    },
    passwordLevelColor() {
      return levelColor[this.state.passwordLevel];
    }
  },
  methods: {
    handlePasswordLevel(rule, value, callback) {
      let level = 0;

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++;
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++;
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++;
      }
      this.state.passwordLevel = level;
      this.state.percent = level * 30;
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100;
        }
        callback();
      } else {
        if (level === 0) {
          this.state.percent = 10;
        }
        callback(new Error("密码强度不够"));
      }
    },

    handlePasswordCheck(rule, value, callback) {
      const password = this.form.getFieldValue("password");
      if (value === undefined) {
        callback(new Error("请输入密码"));
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error("两次密码不一致"));
      }
      callback();
    },

    handlePasswordInputClick() {
      this.state.passwordLevelChecked = true;
    },

    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.registerBtn = true;
          let params = this.form.getFieldsValue();
          console.log(params);

          register(params).then(res => {
            this.registerBtn = false;
            if (!checkResponse(res)) {
              return false;
            }
            notice(
              { title: "提示", msg: "注册成功，请登陆" },
              "notification",
              "success"
            );
            this.$router.push({ name: "login" });
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less">
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
