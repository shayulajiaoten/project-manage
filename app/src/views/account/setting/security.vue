<template>
  <div class="account-setting-security">
    <wrapper-content :showHeader="false">
      <div class="setting-content">
        <account-setting :keys="['security']"></account-setting>
        <div class="layout-item right">
          <div class="setting-info-title">
            <span>安全设置</span>
          </div>
          <div class="setting-info">
            <div class="setting-info-content">
              <div class="ant-list ant-list-split">
                <div class="ant-spin-nested-loading">
                  <div class="ant-spin-container">
                    <div class="ant-list-item">
                      <div class="ant-list-item-meta">
                        <div class="ant-list-item-meta-content">
                          <h4 class="ant-list-item-meta-title">
                            <a>账户密码</a>
                          </h4>
                          <div class="ant-list-item-meta-description">
                            <!-- <span>
                              <span class="security-list-description">当前密码强度 : 强</span>
                            </span>-->
                          </div>
                        </div>
                      </div>
                      <ul class="ant-list-item-action">
                        <li @click="editPassword">
                          <a>修改</a>
                        </li>
                      </ul>
                    </div>
                    <div class="ant-list-item">
                      <div class="ant-list-item-meta">
                        <div class="ant-list-item-meta-content">
                          <h4 class="ant-list-item-meta-title">
                            <a>邮箱帐号</a>
                          </h4>
                          <div class="ant-list-item-meta-description">
                            <span>
                              <span class="security-list-description">
                                <span v-if="userInfo.email">已绑定邮箱 : {{userInfo.email}}</span>
                                <span v-else>未绑定邮箱</span>
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <ul class="ant-list-item-action">
                        <li @click="editMail">
                          <a>
                            <span v-if="userInfo.email">修改</span>
                            <span v-else>绑定</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </wrapper-content>
    <a-modal
      :width="385"
      v-model="passwordInfo.modalStatus"
      :title="passwordInfo.modalTitle"
      :bodyStyle="{paddingBottom:'1px'}"
      :footer="null"
    >
      <a-alert style="margin-bottom: 12px;" v-show="errorTips" :message="errorTips" type="error" />
      <a-form
        layout="vertical"
        :form="form"
        hideRequiredMark
        @submit.prevent="handlePasswordSubmit"
      >
        <a-form-item label="原密码">
          <a-input
            type="password"
            v-decorator="['password',{rules: [{ required: true, message: '请输入原密码' }]}]"
          />
        </a-form-item>
        <a-form-item label="新密码">
          <a-input
            type="password"
            v-decorator="['newPassword',{rules: [{ required: true, message: '请输入新密码' }]}]"
          />
        </a-form-item>
        <a-form-item label="确认新密码">
          <a-input
            type="password"
            v-decorator="['confirmPassword',{rules: [{ required: true, message: '请确认新密码' }]}]"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" htmlType="submit" block size="large">保存</a-button>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      class="mail-modal"
      :width="385"
      v-model="mailInfo.modalStatus"
      :title="mailInfo.modalTitle"
      :bodyStyle="{paddingBottom:'1px'}"
      :footer="null"
    >
      <a-alert style="margin-bottom: 12px;" v-show="errorTips" :message="errorTips" type="error" />
      <a-form
        layout="vertical"
        :form="mailForm"
        hideRequiredMark
        @submit.prevent="handleMailSubmit"
      >
        <a-form-item>
          <a-input
            size="large"
            type="text"
            placeholder="邮箱地址"
            v-decorator="['email',{rules: [{ required: true, pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/, message: '请输入正确的邮箱地址' }], validateTrigger: 'change'}]"
          >
            <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            htmlType="submit"
            block
            size="large"
            :loading="mailInfo.confirmLoading"
            :disabled="mailInfo.confirmLoading"
          >保存</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import md5 from "md5";
import { mapState } from "vuex";
import AccountSetting from "@/components/layout/account/setting";
import { checkResponse } from "../../../assets/js/utils";
import { editEmail, editPassword } from "../../../api/user";

export default {
  name: "settingSecurity",
  components: {
    AccountSetting
  },
  data() {
    return {
      form: this.$form.createForm(this),
      mobileForm: this.$form.createForm(this),
      mailForm: this.$form.createForm(this),
      errorTips: "",
      passwordInfo: {
        modalStatus: false,
        confirmLoading: false,
        modalTitle: "修改密码",
        okText: "保存",
        cancelText: "放弃"
      },
      mobileInfo: {
        modalStatus: false,
        confirmLoading: false,
        modalTitle: "修改手机",
        okText: "保存",
        cancelText: "放弃",
        state: {
          time: 60,
          smsSendBtn: false
        }
      },
      mailInfo: {
        modalStatus: false,
        confirmLoading: false,
        modalTitle: "修改邮箱",
        okText: "保存",
        cancelText: "放弃",
        state: {
          time: 60,
          smsSendBtn: false
        }
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    editPassword() {
      this.passwordInfo.modalStatus = true;
    },
    editMobile() {
      this.mobileInfo.modalStatus = true;
    },
    editMail() {
      this.mailInfo.modalStatus = true;
    },
    handlePasswordSubmit() {
      let app = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          let obj = app.form.getFieldsValue();
          if (
            obj.password.length < 6 ||
            obj.newPassword.length < 6 ||
            obj.confirmPassword.length < 6
          ) {
            this.setErrorTips("密码必须包含6个字符");
            return false;
          }
          if (obj.newPassword != obj.confirmPassword) {
            this.setErrorTips("两次新密码不匹配");
            return false;
          }
          this.setErrorTips("");
          obj.id = app.userInfo.id;
          // obj.password = obj.password;
          // obj.newPassword = obj.newPassword;
          // obj.confirmPassword = obj.confirmPassword;
          editPassword(obj).then(res => {
            app.loading = false;
            if (!checkResponse(res)) {
              return;
            }
            this.passwordInfo.modalStatus = false;
            app.form && app.form.resetFields();
            this.$message.success("修改成功");
          });
        }
      });
    },

    handleMailSubmit() {
      let app = this;
      this.mailForm.validateFields((err, values) => {
        if (!err) {
          let obj = app.mailForm.getFieldsValue();
          obj.id = app.userInfo.id;
          this.setErrorTips("");
          app.mailInfo.confirmLoading = true;
          editEmail(obj).then(res => {
            app.mailInfo.confirmLoading = false;
            if (!checkResponse(res)) {
              return;
            }
            this.mailInfo.modalStatus = false;
            app.userInfo.email = obj.email;
            app.$store.dispatch("setUser", app.userInfo);
            this.$message.success("修改成功");
            app.mailForm && app.mailForm.resetFields();
          });
        }
      });
    },
    setErrorTips(content = "") {
      this.errorTips = content;
    }
  }
};
</script>

<style lang="less">
.account-setting-security {
  .wrapper-main {
    padding-left: 0;
  }

  .setting-content {
    display: flex;
    flex-direction: row;

    .right {
      flex: 1 1 0;
      padding: 8px 40px;

      .setting-info-title {
        font-size: 20px;
      }

      .setting-info {
        display: flex;
        flex-direction: row;
        padding-top: 12px;

        &-content {
          width: 100%;
        }
      }
    }
  }
}

.mobile-modal {
  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }
}
</style>
