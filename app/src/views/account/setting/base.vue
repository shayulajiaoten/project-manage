<template>
  <div class="account-setting-base">
    <wrapper-content :showHeader="false">
      <div class="setting-content">
        <account-setting></account-setting>
        <div class="layout-item right">
          <div class="setting-info-title">
            <span>基本设置</span>
          </div>
          <div class="setting-info">
            <div class="setting-info-content">
              <a-form
                layout="vertical"
                :form="form"
                hideRequiredMark
                @submit.prevent="handleSubmit"
              >
                <a-form-item label="昵称">
                  <a-input
                    v-decorator="['nickname',{rules: [{ required: true, message: '请输入您的邮箱' }]}]"
                  />
                </a-form-item>
                <a-form-item label="简介">
                  <a-textarea placeholder="个人简介" :rows="4" v-decorator="['description']" />
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" htmlType="submit" :loading="loading">更新基本信息</a-button>
                </a-form-item>
              </a-form>
            </div>
            <div class="setting-info-avatar">
              <span>头像</span>
              <a-avatar class="avatar" :size="150" :src="userInfo.avatar">{{userInfo.name}}</a-avatar>
              <a-upload
                name="avatar"
                class="avatar-uploader"
                :showUploadList="false"
                :data="{code: userInfo.code}"
                :headers="headers"
                :action="uploadAction"
                :beforeUpload="beforeUpload"
                @change="handleChange"
              >
                <a-button icon="upload" class="upload">更换头像</a-button>
              </a-upload>
            </div>
          </div>
        </div>
      </div>
    </wrapper-content>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AccountSetting from "@/components/layout/account/setting";
import {
  checkResponse,
  getAuthorization,
  getBase64
} from "../../../assets/js/utils";
import { editPersonal } from "../../../api/user";
import { getStore } from "../../../assets/js/storage";
import { destroyNotice, notice } from "../../../assets/js/notice";

export default {
  name: "settingBase",
  components: {
    AccountSetting
  },
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this),
      uploadLoading: false,
      uploadAction: "project/index/uploadAvatar"
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    headers() {
      return getAuthorization();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        email: this.userInfo.email,
        nickname: this.userInfo.nickname,
        description: this.userInfo.description
      });
    });
  },
  methods: {
    handleSubmit() {
      let app = this;
      this.form.validateFields((err, values) => {
        if (!err) {
          let obj = app.form.getFieldsValue();
          obj.id = app.userInfo.id;
          obj.avatar = app.userInfo.avatar;
          editPersonal(obj)
            .then(res => {
              app.loading = false;
              if (!checkResponse(res)) {
                return;
              }
              app.userInfo.email = obj.email;
              app.userInfo.nickname = obj.nickname;
              app.userInfo.description = obj.description;
              app.$store.dispatch("setUser", app.userInfo);
            })
            .then(() => {
              this.success();
            });
        }
      });
    },
    success() {
      this.$message.success("修改成功");
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        notice(`正在上传，请稍后...`, "message", "loading", 0);
        this.uploadLoading = true;
        return;
      }
      // if (info.file.status === "done") {
      //   getBase64(info.file.originFileObj, imageUrl => {
      //     this.userInfo.avatar = info.file.response.data.url;
      //     this.$store.dispatch("SET_USER", this.userInfo);
      //     this.uploadLoading = false;
      //     setTimeout(function() {
      //       destroyNotice();
      //     }, 500);
      //   });
      // }
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图片不能超过2MB!");
      }
      return isLt2M;
    }
  }
};
</script>

<style lang="less">
.account-setting-base {
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
          width: 320px;
        }

        &-avatar {
          padding-left: 104px;
          display: flex;
          flex-direction: column;

          .avatar {
            margin-top: 12px;
          }

          .avatar-uploader {
            width: 115px;
            margin: 24px auto;
          }
        }
      }
    }
  }
}
</style>
