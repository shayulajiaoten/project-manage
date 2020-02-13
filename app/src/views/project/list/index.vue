<template>
  <div class="project-list-index">
    <wrapper-content :showHeader="false">
      <div class="action">
        <a-button type="primary" icon="plus" @click="doAction(null,'new')">创建新项目</a-button>
      </div>
      <a-list
        class="project-list"
        :loading="loading"
        itemLayout="horizontal"
        :dataSource="dataSource"
      >
        <a-list-item slot="renderItem" slot-scope="item,index">
          <span slot="actions" @click="doAction(item,'del',index)">
            <a-tooltip title="移至回收站">
              <a-icon type="delete" />
            </a-tooltip>
          </span>
          <span slot="actions" @click="doAction(item,'edit',index)">
            <a-tooltip title="项目设置">
              <a-icon type="setting" />
            </a-tooltip>
          </span>
          <span slot="actions">
            <a-tooltip
              :title="item.collected ? '取消收藏' : '加入收藏'"
              @click="doAction(item,'collect',index)"
            >
              <a-icon type="star" v-show="!item.collected" />
              <a-icon type="star" theme="filled" style="color: #ffaf38;" v-show="item.collected" />
            </a-tooltip>
          </span>
          <a-list-item-meta :description="item.description">
            <div slot="title">
              <router-link :to="'/project/space/task/' + item.id">{{item.project_name}}</router-link>
            </div>
            <a-avatar slot="avatar" icon="user" :src="item.cover" />
          </a-list-item-meta>
          <div class="other-info muted">
            <div class="info-item">
              <span>创建日期</span>
              <span>{{moment(item.create_time).format('YYYY-MM-DD')}}</span>
            </div>
            <div class="info-item">
              <span>创建人</span>
              <span>{{item.creator}}</span>
            </div>
            <div class="info-item schedule">
              <span>进度</span>
              <a-progress :strokeWidth="5" :percent="item.plan" />
            </div>
          </div>
        </a-list-item>
      </a-list>
    </wrapper-content>
    <a-modal
      destroyOnClose
      :width="360"
      v-model="actionInfo.modalStatus"
      :title="actionInfo.modalTitle"
      :bodyStyle="{paddingBottom:'1px'}"
      :footer="null"
    >
      <a-form @submit.prevent="handleSubmit" :form="form">
        <a-form-item>
          <a-input
            placeholder="项目名称（必填）"
            v-decorator="['name',{rules: [{ required: true, message: '请输入项目名称' }]}]"
          />
        </a-form-item>
        <a-form-item>
          <a-select placeholder="项目模板" v-decorator="['templateId',]">
            <a-select-option :key="-1">空白项目</a-select-option>
            <a-select-option
              :key="template.id"
              v-for="template in templateList"
            >{{template.template_name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-textarea placeholder="项目简介" :rows="2" v-decorator="['description']" />
        </a-form-item>
        <a-form-item>
          <div class="action-btn">
            <a-button
              type="primary"
              htmlType="submit"
              block
              size="large"
              :loading="actionInfo.confirmLoading"
              class="middle-btn"
            >完成并创建</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      destroyOnClose
      class="project-config-modal"
      :width="800"
      v-model="projectModal.modalStatus"
      :title="projectModal.modalTitle"
      :footer="null"
    >
      <project-config :code="currentProjectCode" @update="updateProject"></project-config>
    </a-modal>
    <invite-project-member
      v-model="showInviteMember"
      :project-code="currentProjectCode"
      v-if="showInviteMember"
    ></invite-project-member>
  </div>
</template>
<script>
import projectConfig from "@/components/project/projectConfig";
import { selfList, doData, recycle } from "@/api/project";
import {checkResponse} from '@/assets/js/utils';
import pagination from "@/mixins/pagination";
import moment from "moment";
import { collect } from "../../../api/projectCollect";
import { list as projectTemplates } from "../../../api/projectTemplate";
import { list } from "../../../api/department";

export default {
  components: {
    projectConfig
  },
  mixins: [pagination],
  data() {
    return {
      dataSource: [],
      loading: false,
      // loading:true,
      showLoadingMore: false,
      loadingMore: false,
      showInviteMember: false,
      currentProject: {},
      currentProjectCode: 0,
      currentProjectIndex: 0,
      newData: {
        code: ""
      },
      form: this.$form.createForm(this),
      searchForm: {},
      actionInfo: {
        modalStatus: false,
        confirmLoading: false,
        modalTitle: "编辑项目"
      },
      /*项目设置*/
      projectModal: {
        modalStatus: false,
        modalTitle: "项目设置"
      },
      templateList: []
    };
  },
  watch: {
    $route: function() {
      this.init();
    }
  },
  created() {
    this.init();
    this.projectTemplates();
  },
  methods: {
    moment,
    init(reset = true) {
      let app = this;
      if (reset) {
        this.dataSource = [];
        this.showLoadingMore = false;
      }
      this.requestData.type = this.$route.params.type;
      app.loading = true;
      console.log(app.requestData.type);

      selfList(app.requestData.type).then(res => {
        app.dataSource = app.dataSource.concat(res.data);
        app.loading = false;
        app.loadingMore = false;
      });
    },
    projectTemplates() {
      projectTemplates({ viewType: -1 }).then(res => {
        this.templateList = res.data;
      });
    },

    doAction(record, action, index) {
      this.currentProject = record;
      this.currentProjectIndex = index;
      let app = this;
      app.newData = { id: 0 };
      if (action == "new") {
        setTimeout(function() {
          app.form && app.form.resetFields();
        }, 0);
        app.actionInfo.modalStatus = true;
        app.actionInfo.modalTitle = "创建项目";
      } else if (action == "edit") {
        app.currentProjectCode = record.id;
        app.projectModal.modalStatus = true;
      } else if (action == "del") {
        this.$confirm({
          title: "确定放入回收站？",
          content: `一旦将项目「${this.currentProject.name}」放入回收站，所有与项目有关的信息将会被放入回收站`,
          okText: "放入回收站",
          okType: "danger",
          cancelText: "再想想",
          onOk() {
            recycle(record.id).then(() => {
              app.dataSource.splice(index, 1);
              // app.init();
            });
            return Promise.resolve();
          }
        });
      } else if (action == "collect") {
        const type = record.collected ? "cancel" : "collect";
        collect(record.id, type).then(() => {
          app.$set(app.dataSource[index], "collected", !record.collected);
          if (this.requestData.type == "collect") {
            app.dataSource.splice(index, 1);
          }
        });
      }
    },
    updateProject(data) {
      this.dataSource[this.currentProjectIndex] = Object.assign(
        this.dataSource[this.currentProjectIndex],
        data
      );
    },
    handleSubmit() {
      let app = this;
      app.form.validateFields(err => {
        if (!err) {
          app.handleOk();
        }
      });
    },
    handleOk() {
      let app = this;
      app.actionInfo.confirmLoading = true;
      let obj = app.form.getFieldsValue();
      if (app.newData.id) {
        //编辑
        obj.projectCode = app.newData.id;
      } else {
        //新增
        Object.assign(obj, app.newData);
      }

      doData(obj).then(res => {
        app.actionInfo.confirmLoading = false;
        if (!checkResponse(res)) {
          return;
        }
        app.form.resetFields();
        app.newData = { id: 0 };
        app.actionInfo.modalStatus = false;
        app.init();
      });
    }
  }
};
</script>
<style lang="less">
@import "~ant-design-vue/lib/style/themes/default";

.project-list-index {
  .project-list {
    .ant-list-item-meta-avatar {
      .ant-avatar {
        width: 50px;
        height: 50px;
        border-radius: 3px;
      }
    }

    .ant-list-item-content {
      .other-info {
        display: flex;

        .info-item {
          display: flex;
          flex-direction: column;
          padding-left: 48px;
        }

        .schedule {
          width: 250px;
        }
      }
    }

    .ant-list-item-action {
      .anticon:hover {
        svg {
          color: @primary-color;
        }
      }
    }
  }
}
</style>
