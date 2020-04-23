<template>
  <a-tabs tabPosition="left" defaultActiveKey="1" :animated="false" v-model="tabKey">
    <a-tab-pane key="1">
      <span slot="tab">
        <a-icon type="heat-map" />概览
      </span>
      <div class="config-content">
        <div class="content-item">
          <div class="infos">
            <p class="item-title">项目封面</p>
            <div class="cover-item">
              <template v-if="project.cover">
                <img class="avatar" :src="project.cover" />
              </template>
              <span class="no-avatar" v-show="!project.cover"></span>
              <a-upload
                name="cover"
                class="cover-uploader"
                :showUploadList="false"
                :data="{id: code}"
                :headers="headers"
                :action="uploadAction"
                :beforeUpload="beforeUpload"
                @change="handleChange"
              >
                <a-button size="large" class="upload">上传新封面</a-button>
                <p class="upload-tips muted">最佳图片比例为300*150</p>
              </a-upload>
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="infos">
            <p class="item-title">项目名称</p>
            <a-input size="large" v-model="project.project_name"></a-input>
          </div>
          <div class="infos">
            <p class="item-title">项目进度 (%)</p>
            <a-input-number size="large" :min="0" :max="100" v-model="project.plan"></a-input-number>
          </div>
        </div>
        <div class="content-item">
          <div class="infos">
            <p class="item-title">项目简介</p>
            <a-input
              type="textarea"
              :rows="3"
              size="large"
              placeholder="介绍一下这个项目"
              v-model="project.description"
            ></a-input>
          </div>
        </div>
        <div class="content-item">
          <div class="infos">
            <a-button
              type="primary"
              class="middle-btn pull-right"
              size="large"
              @click="saveProject"
            >保存</a-button>
          </div>
        </div>
      </div>
    </a-tab-pane>
    <a-tab-pane key="5">
      <span slot="tab">
        <a-icon type="ellipsis" />更多
      </span>
      <div class="config-content more-config">
        <div class="content-item">
          <div class="infos">
            <p class="item-title">项目操作</p>
            <div class="item-tips muted">您可以执行以下操作</div>
            <a-button size="large" class="middle-btn" @click="archiveProject">
              <span v-if="project.archive">取消归档</span>
              <span v-if="!project.archive">归档项目</span>
            </a-button>
            <a-button size="large" class="middle-btn" type="danger" @click="delProject">
              <span v-if="project.deleted">恢复项目</span>
              <span v-if="!project.deleted">移至回收站</span>
            </a-button>
          </div>
        </div>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import {
  read as getProject,
  doData,
  archive,
  recycle,
  recoveryArchive,
  recovery,
  quit
} from "../../api/project";
import {
  list as getTaskWorkflowList,
  edit as EditTaskWorkflow
} from "../../api/taskWorkflow";
import { _getAll as getTaskStages } from "../../api/taskStages";

import { notice } from "../../assets/js/notice";
import {
  checkResponse,
  getApiUrl,
  // getAuthorization,
  getBase64
} from "../../assets/js/utils";
import { Login } from "../../api/user";

export default {
  name: "projectConfig",
  props: {
    code: {
      type: [String, Number],
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      /*项目设置*/
      loading: false,
      tabKey: "1",
      project: {},
      taskWorkflowList: [],
      doTaskWorkflowView: false,
      loadingWorkflowRule: false,
      taskWorkflow: null,
      taskWorkflowRuleList: [],
      currentTaskWorkflowRule: {
        taskWorkflowName: "",
        firstObj: "", //哪个列表任务
        firstAction: {
          //做什么
          action: -1,
          value: ""
        },
        firstResult: {
          //就
          action: -1,
          value: ""
        },
        lastResult: {
          //最后
          action: -1,
          value: ""
        },
        state: {
          //任务状态
          action: -1,
          value: -1
        }
      },
      taskWorkflowRuleActions: [
        { id: -1, name: "请选择" },
        { id: 0, name: "增加任务、被移动" },
        { id: 1, name: "被完成" },
        { id: 2, name: "被重做" },
        { id: 3, name: "设置执行人" }
        // {id: 4, name: "截止时间"},
        // {id: 5, name: "优先级"},
      ],
      taskWorkflowRuleTypes: [
        { id: -1, name: "请选择" },
        { id: 0, name: "自动流转到" },
        { id: 3, name: "默认指派给" }
      ],
      taskStates: [
        { id: -1, name: "不做修改" },
        { id: 1, name: "已完成" },
        { id: 2, name: "未完成" }
      ],
      projectMembers: [],
      taskStages: [],
      uploadLoading: false,
      uploadAction: "api/project/uploadCover"
    };
  },
  computed: {
    headers() {
      return {};

      // return getAuthorization();
    }
  },
  watch: {
    code() {
      this.getProject();
    }
  },
  created() {
    this.getProject();
  },
  methods: {
    getProject() {
      this.loading = true;
      getProject(this.code).then(res => {
        this.loading = false;
        this.project = res.data;
      });
    },
    saveProject() {
      const project = this.project;
      doData({
        cover: project.cover,
        projectId: project.id,
        projectName: project.project_name,
        description: project.description,
        plan: Number(project.plan)
      }).then(res => {
        if (!checkResponse(res)) {
          return;
        }
        this.$emit("update", this.project);
        notice(
          {
            title: "保存成功"
          },
          "notice",
          "success"
        );
      });
    },
    archiveProject() {
      let app = this;
      if (!app.project.archive) {
        this.$confirm({
          title: "归档项目",
          content: `一旦将项目「${this.project.project_name}」归档，本项目和所含信息将会被移到「归档项目」内，其中的内容依然会被统计和搜索收录，归档项目可以随时恢复并继续使用。`,
          okText: "归档",
          okType: "danger",
          cancelText: `再想想`,
          onOk() {
            archive(app.code).then(res => {
              if (!checkResponse(res)) {
                return;
              }
              app.$router.replace("/project/archive");
            });
            return Promise.resolve();
          }
        });
      } else {
        this.$confirm({
          title: "取消归档项目？",
          content: `取消归档「${this.project.name}」后就可以正常使用了`,
          okText: "取消归档",
          okType: "primary",
          cancelText: "再想想",
          onOk() {
            recoveryArchive(app.code).then(res => {
              if (!checkResponse(res)) {
                return;
              }
              app.$router.replace("/project/list/my");
            });
            return Promise.resolve();
          }
        });
      }
    },
    delProject() {
      let app = this;
      if (!app.project.deleted) {
        this.$confirm({
          title: "确定放入回收站？",
          content: `一旦将项目「${this.project.project_name}」放入回收站，所有与项目有关的信息将会被放入回收站`,
          okText: "放入回收站",
          okType: "danger",
          cancelText: "再想想",
          onOk() {
            recycle(app.code).then(res => {
              if (!checkResponse(res)) {
                return;
              }
              app.$router.replace("/project/recycle");
            });
            return Promise.resolve();
          }
        });
      } else {
        this.$confirm({
          title: "确定恢复项目？",
          content: `恢复「${this.project.project_name}」后就可以正常使用了`,
          okText: "恢复项目",
          okType: "primary",
          cancelText: "再想想",
          onOk() {
            recovery(app.code).then(res => {
              if (!checkResponse(res)) {
                return;
              }
              app.$router.replace("/project/list/my");
            });
            return Promise.resolve();
          }
        });
      }
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.uploadLoading = true;
        return;
      }
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj, () => {
          this.project.cover = info.file.response.msg;
          this.uploadLoading = false;
          // this.$emit("update", this.project);
          notice(
            {
              title: "封面上传成功"
            },
            "notice",
            "success"
          );
        });
      }
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
.project-config-modal {
  .ant-modal-body {
    padding: 0;
  }

  .ant-modal-body,
  .ant-tabs,
  .ant-tabs-bar {
    min-height: 550px;
    min-width: 180px;

    .ant-tabs-tab {
      padding: 12px 24px;
    }
  }

  .ant-tabs-nav-wrap {
    padding-top: 10px;
  }

  .ant-tabs-left-content {
    padding-top: 18px;
    padding-right: 24px;
  }

  .ant-tabs .ant-tabs-left-bar .ant-tabs-tab {
    text-align: left;
  }

  .config-content {
    .content-item {
      display: flex;
      justify-content: space-between;
      flex: 1 1;
      margin-bottom: 24px;

      .infos {
        width: 100%;
        padding-right: 12px;

        p {
          margin-bottom: 6px;
        }

        .item-title {
          font-size: 16px;
        }

        .item-tips {
          margin-bottom: 12px;
        }

        .ant-select {
          width: 100%;
        }

        .ant-input-number-lg {
          width: 100%;
        }

        .cover-item {
          display: flex;

          img {
            width: 300px;
            height: 150px;
          }

          .cover-uploader {
            display: block;
            margin-left: 24px;

            .upload-tips {
              margin-top: 12px;
            }
          }
        }
      }
    }

    &.task-config {
      .content-item {
        padding-bottom: 24px;
        padding-right: 16px;
        border-bottom: 1px solid #e5e5e5;
      }

      .prefix-input {
        width: 50%;
        margin-right: 24px;
      }
    }

    .task-workflow {
      .workflow-content {
        margin-top: 12px;

        .workflow-rule-item {
          margin-bottom: 16px;

          p {
            color: rgba(0, 0, 0, 0.45);
          }
        }
      }
    }

    &.more-config {
      .ant-btn {
        margin-right: 12px;
      }
    }
  }
}
</style>
