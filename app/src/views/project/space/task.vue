<template>
  <div class="project-space-task" :class="project.task_board_theme">
    <div class="project-navigation">
      <div class="project-nav-header">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <router-link to="/home">
              <a-icon type="home" />首页
            </router-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <project-select class="nav-title" style="display: inline-block" :code="code"></project-select>
            <span class="actions">
              <a-tooltip
                :mouseEnterDelay="0.3"
                :title="project.collected ? '取消收藏' : '加入收藏'"
                @click="collectProject"
              >
                <a-icon
                  type="star"
                  theme="filled"
                  style="color: grey;"
                  v-show="!project.collected"
                />
                <a-icon
                  type="star"
                  theme="filled"
                  style="color: #ffaf38;"
                  v-show="project.collected"
                />
              </a-tooltip>
            </span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <section class="nav-body">
        <ul class="nav-wrapper nav nav-underscore pull-left">
          <li class="actives">
            <a class="app" data-app="tasks">任务</a>
          </li>
        </ul>
      </section>
      <div class="project-nav-footer">
        <a
          class="footer-item"
          :class="{active:slideMenuKey == 'config'}"
          @click="visibleDraw('config')"
        >
          <a-icon type="menu"></a-icon>
          <span>菜单</span>
        </a>
      </div>
    </div>
    <wrapper-content :showHeader="false">
      <draggable
        v-model="taskStages"
        :options="{group:'stages',filter:'.undraggables',handle:'.ui-sortable-handle',ghostClass:'stage-ghost',animation: 200,forceFallback:false}"
        id="board-scrum-stages"
        class="board-scrum-stages"
        :move="stageMove"
        @update="stageSort"
      >
        <div
          class="scrum-stage"
          v-for="(stage,index) in taskStages"
          :key="index"
          :id="stage.id"
          :class="{ 'fixed-creator': stage.fixedCreator == true}"
        >
          <header class="scrum-stage-header ui-sortable-handle" v-show="!stage.tasksLoading">
            <div class="stage-name hinted">
              {{ stage.task_name }}
              <span
                class="task-count"
                v-if="stage.tasks.length > 0"
              >· {{ stage.tasks.length }}</span>
            </div>
            <div class="stage-menu-toggler popover">
              <a-dropdown :trigger="['click']" placement="bottomCenter">
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>编辑任务列表</span>
                  </template>
                  <a href="javascript:void(0)" class="menu-toggler-title">
                    <a-icon type="ellipsis" style="font-size: 18px;" />
                  </a>
                </a-tooltip>
                <a-menu slot="overlay" @click="doStage" :selectable="false">
                  <a-menu-item :key="'editStage_' + stage.id + '_' + index">
                    <a-icon type="edit"></a-icon>编辑列表
                  </a-menu-item>
                  <a-menu-item :key="'delStage_' + stage.id + '_' + index">
                    <a-icon size="14" type="delete"></a-icon>删除列表
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </header>
          <div
            class="scrum-stage-wrap ui-sortable"
            :class="{ 'hidden-creator-bottom': stage.showTaskCard}"
          >
            <vue-scroll
              :ref="index + '-stage'"
              @handle-resize="handleResize($event,index)"
              :ops="scrollOps"
            >
              <section
                :id="stage.id"
                :task-type-index="index"
                class="scrum-stage-content thin-scroll"
              >
                <!-- {{stage.id}} -->
                <a-spin wrapperClassName="tasks-loading" :spinning="stage.tasksLoading">
                  <!--未完成列表-->

                  <template v-for="(task,taskIndex) in stage.unDoneTasks">
                    <div
                      class="task task-card ui-sortable-handle"
                      :index="taskIndex"
                      :id="task.id"
                      :key="task.id"
                      :class="showTaskPri(task.pri)"
                      v-if="!task.done"
                      @click.stop="showModal(task,index,taskIndex)"
                    >
                      <div class="task-priority bg-priority-0"></div>
                      <a-tooltip :placement="index > 0 ? 'top':'right'">
                        <div
                          class="check-box-wrapper"
                          @click.stop="taskDone(task.id,index,taskIndex,1)"
                        >
                          <a-icon
                            class="check-box"
                            :class="{'disabled': task.hasUnDone}"
                            type="border"
                            :style="{fontSize:'16px'}"
                          />
                        </div>
                      </a-tooltip>
                      <div class="task-content-set open-detail">
                        <div class="task-content-wrapper">
                          <div class="task-content">{{ task.task_name }}</div>
                          <a-tooltip placement="top" v-if="task.executor && task.executor.avatar">
                            <template slot="title">
                              <span>{{task.executor.name}}</span>
                            </template>
                            <img
                              :src="task.executor.avatar"
                              :title="task.executor.name"
                              class="avatar img-circle img-24 hinted"
                            />
                          </a-tooltip>
                        </div>
                        <div class="task-info-wrapper clearfix">
                          <div class="task-infos">
                            <span
                              class="label"
                              :class="showTimeLabel(task.end_time)"
                              v-if="task.end_time"
                            >
                              <span
                                :title="task.end_time"
                              >{{ showTaskTime(task.begin_time,task.end_time)}}</span>
                            </span>
                            <span class="icon-wrapper muted" v-if="task.description">
                              <a-icon type="file-text"></a-icon>
                            </span>
                            <span class="icon-wrapper muted" v-if="task.hasSource">
                              <a-icon type="link"></a-icon>
                            </span>
                            <span class="icon-wrapper muted" v-if="task.hasComment">
                              <a-icon type="message" />
                            </span>
                            <!-- <span class="icon-wrapper muted" v-if="task.childCount[0] > 0">
                                <a-icon type="bars"></a-icon>
                                <span>{{task.childCount[1]}}/{{task.childCount[0]}}</span>
                            </span>-->
                            <span class="tag muted" v-for="tag in task.tags" :key="tag.code">
                              <a-badge status="success" :class="`badge-${tag.tag.color}`" />
                              {{tag.tag.name}}
                            </span>
                            <span
                              :class="'icon-wrapper text text-' + task.task_execute.color"
                              v-if="task.execute_state > 0"
                            >{{ task.task_execute_name }}</span>
                            <span class="icon-wrapper muted" v-if="task.like">
                              <a-icon type="like" />
                              <span>{{task.like}}</span>
                            </span>
                          </div>
                        </div>
                        <footer
                          class="task-info-footer"
                          v-if="project.prefix && project.open_prefix"
                        >
                          <span class="task-id-number">{{project.prefix}}-{{task.id_num}}</span>
                        </footer>
                      </div>
                    </div>
                  </template>
                  <!--创建任务卡片-->
                  <div
                    class="task-creator-wrap card"
                    :id="'card' + index"
                    v-show="stage.showTaskCard"
                  >
                    <form class="task-creator">
                      <a-input
                        :ref="`inputTaskName${index}`"
                        v-model="task.name"
                        class="task-content-input"
                        type="textarea"
                        :rows="3"
                        placeholder="任务内容"
                        @keyup.enter="createTask(stage.id,index)"
                      />
                      <div class="submit-set">
                        <a-button
                          type="default"
                          size="large"
                          class="small-btn"
                          @click.stop="showTaskCard(index,false)"
                        >取消</a-button>
                        <a-button
                          :loading="createTaskLoading"
                          :disabled="!task.name"
                          type="primary"
                          size="large"
                          class="small-btn"
                          :class="{'disabled-btn':!task.name}"
                          @click.stop="createTask(stage.id,index)"
                        >创建</a-button>
                      </div>
                    </form>
                  </div>
                  <!--已完成列表-->
                  <template v-for="(task,taskIndex) in stage.doneTasks">
                    <div
                      class="task done task-card ui-sortable-handle"
                      :index="taskIndex"
                      :id="task.id"
                      :key="task.id"
                      @click.stop="showModal(task,index,taskIndex)"
                    >
                      <div class="task-priority bg-priority-0"></div>
                      <span
                        class="check-box-wrapper"
                        @click.stop="taskDone(task.id,index,taskIndex,0)"
                      >
                        <a-icon
                          class="check-box"
                          type="check-square"
                          :style="{fontSize:'16px'}"
                          :class="{'disabled': task.hasUnDone}"
                        />
                      </span>
                      <div class="task-content-set open-detail">
                        <div class="task-content-wrapper">
                          <div class="task-content">{{ task.task_name }}</div>
                          <a-tooltip placement="top" v-if="task.executor && task.executor.avatar">
                            <template slot="title">
                              <span>{{task.executor.name}}</span>
                            </template>
                            <img
                              v-if="task.executor && task.executor.avatar"
                              :src="task.executor.avatar"
                              :title="task.executor.name"
                              class="avatar img-circle img-24 hinted"
                            />
                          </a-tooltip>
                        </div>
                        <div class="task-info-wrapper clearfix">
                          <div class="task-infos">
                            <span
                              class="tag muted"
                              :class="'tag-color-'+ tag.color"
                              v-for="(tag) in task.task_tag_item_list"
                              :key="tag.code"
                            >{{ tag.name }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <!--添加任务按钮-->
                  <div
                    class="task-creator-handler-wrap"
                    @click.stop="showTaskCard(index)"
                    v-if="!stage.showTaskCard"
                  >
                    <a class="task-creator-handler link-add-handler">
                      <a-icon type="plus-circle" style="padding-right: 6px;"></a-icon>添加任务
                    </a>
                  </div>
                </a-spin>
              </section>
            </vue-scroll>
          </div>
          <!--</a-spin>-->
        </div>
        <div class="scrum-stage undraggable create-stage">
          <header class="scrum-stage-header">
            <div class="stage-name hinted" style="width: 100%">
              <a class="muted" v-show="!showCreateStage" @click="showInputStrageName">
                <a-icon type="plus" />
                <span class="m-l-xs">新建任务列表</span>
              </a>
              <div v-show="showCreateStage">
                <div>
                  <a-input
                    ref="inputStageName"
                    v-model="stageName"
                    placeholder="新建任务列表..."
                    @keyup.enter="creteStage"
                    auto-focus
                  ></a-input>
                </div>
                <div class="submit-set create-stage-footer">
                  <a
                    type="text"
                    class="cancel-text muted"
                    @click="showCreateStage = !showCreateStage"
                  >取消</a>
                  <a-button type="primary" class="middle-btn" @click="creteStage">保存</a-button>
                </div>
              </div>
            </div>
          </header>
        </div>
      </draggable>
      <router-view></router-view>
    </wrapper-content>
    <!--编辑任务列表-->
    <a-modal
      :width="360"
      v-model="stageModal.modalStatus"
      :title="stageModal.modalTitle"
      :bodyStyle="{paddingBottom:'1px'}"
      :footer="null"
    >
      <a-form @submit.prevent="editStage" :form="stageModal.form">
        <a-form-item>
          <a-input
            ref="inputStageTitle"
            placeholder="列表标题"
            v-decorator="['name',{rules: [{ required: true, message: '请输入列表标题' }]}]"
          />
        </a-form-item>
        <a-form-item>
          <div class="action-btn pull-right">
            <a type="text" class="cancel-text muted" @click="stageModal.modalStatus = false">取消</a>
            <a-button type="primary" htmlType="submit" class="middle-btn">保存</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
    <!--项目设置菜单-->
    <a-drawer
      wrapClassName="info-drawer"
      title="项目设置"
      width="350"
      placement="right"
      @close="configDraw.visible = false"
      :visible="configDraw.visible"
    >
      <div class="config-wrapper">
        <ul class="config-menus">
          <li class="menu-item">
            <a @click="projectModal.modalStatus = true">
              <a-icon type="setting" />项目设置
            </a>
          </li>

          <li class="menu-item">
            <a>
              <a-icon type="block" />保存为项目模板 *
            </a>
          </li>
        </ul>
      </div>
    </a-drawer>
    <!--项目设置-->
    <a-modal
      destroyOnClose
      class="project-config-modal"
      :width="800"
      v-model="projectModal.modalStatus"
      :title="projectModal.modalTitle"
      :footer="null"
    >
      <project-config :code="code" @update="updateProject"></project-config>
    </a-modal>
    <!--任务标签-->
    <a-modal
      class="task-tag-modal"
      :width="800"
      v-model="taskTagModal.modalStatus"
      :title="taskTagModal.modalTitle"
      :footer="null"
    >
      <task-tag v-if="taskTagModal.modalStatus" :code="code" @update="init"></task-tag>
    </a-modal>
    <!--设置任务执行者-->
    <a-modal
      class="invite-project-member"
      :width="360"
      v-model="projectMemberModal.modalStatus"
      :title="projectMemberModal.modalTitle"
      :footer="null"
    >
      <div class="member-list">
        <a-list
          class="project-list"
          itemLayout="horizontal"
          :loading="loading"
          :dataSource="projectMembers"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <span slot="actions">
              <a-button size="small" type="dashed" icon="user-add" @click="setExecutor(item)">设置</a-button>
            </span>
            <a-list-item-meta :description="item.email">
              <span slot="title">{{item.name}}</span>
              <a-avatar slot="avatar" icon="user" :src="item.avatar" />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </a-modal>
    <!-- 子任务弹窗 -->
    <div>
      <a-modal
        title="任务设置"
        :visible="visible"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
      >
        <template slot="footer">
          <a-button type="danger" @click="handleDelete">删除该任务</a-button>
          <a-button key="back" @click="handleCancel">返回</a-button>
        </template>
        <div class="field">
          <div class="field-left">
            <a-icon type="check-square" />
            <span class="field-name">状态</span>
          </div>
          <div class="field-right">
            <a-dropdown
              :trigger="['click']"
              :disabled="!!task.deleted || !!task.hasUnDone"
              :class="{'disabled': task.hasUnDone}"
            >
              <a-tooltip placement="top">
                <span>
                  <a-tag v-if="currentTask.done" color="green">已完成</a-tag>
                  <span v-show="!currentTask.done">未完成</span>
                </span>
              </a-tooltip>
              <a-menu
                class="field-right-menu"
                slot="overlay"
                :selectable="false"
                @click="changeDone(currentTask.id,stageIndex,currentTaskIndex,!currentTask.done)"
              >
                <a-menu-item key="done">
                  <div class="menu-item-content">
                    <a-tag color="green">已完成</a-tag>
                    <a-icon type="check" class="check muted" v-show="currentTask.done"></a-icon>
                  </div>
                </a-menu-item>
                <a-menu-item key="undone">
                  <div class="menu-item-content">
                    <a-tag color="grey">未完成</a-tag>
                    <a-icon type="check" class="check muted" v-show="!currentTask.done"></a-icon>
                  </div>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </div>
        <div class="field">
          <div class="field-left">
            <a-icon type="user" />
            <span class="field-name">执行者</span>
          </div>
          <div class="field-right">
            <a-dropdown
              :trigger="['click']"
              v-model="visibleTaskMemberMenu"
              :disabled="!!currentTask.deleted"
              placement="bottomCenter"
            >
              <a-tooltip :mouseEnterDelay="0.5" v-if="!currentTask.deleted">
                <template slot="title">
                  <span>点击设置执行者</span>
                </template>
                <div class="field-flex">
                  <template v-if="currentTask.executor">
                    <a-avatar :src="currentTask.executor.avatar" icon="user" size="small" />
                    <a class="muted name">{{currentTask.executor.member_name}}</a>
                  </template>
                  <template v-if="!currentTask.executor">
                    <a-avatar icon="user" size="small" />
                    <a class="muted name">待认领</a>
                  </template>
                </div>
              </a-tooltip>
              <div class="field-flex" v-else>
                <template v-if="currentTask.executor">
                  <a-avatar :src="currentTask.executor.avatar" icon="user" size="small" />
                  <a class="muted name">{{currentTask.executor.member_name}}</a>
                </template>
                <template v-if="!currentTask.executor">
                  <a-avatar icon="user" size="small" />
                  <a class="muted name">待认领</a>
                </template>
              </div>
              <div slot="overlay">
                <task-member-menu
                  v-if="visibleTaskMemberMenu"
                  :teamName="currentTeam"
                  :executor="currentTask.executor"
                  :projectCode="currentTask.project_id"
                  :taskCode="currentTask.id"
                  @close="changeTask"
                ></task-member-menu>
              </div>
            </a-dropdown>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
import moment from "moment";
import draggable from "vuedraggable";
import projectSelect from "@/components/project/projectSelect";
import projectConfig from "@/components/project/projectConfig";
import TaskTag from "@/components/project/taskTag";
import taskMemberMenu from "@/components/project/taskMemberMenu";
import {
  list as getTaskStages,
  sort,
  tasks as getTasks
} from "../../../api/taskStages";
import { read as getProject } from "../../../api/project";

import {
  save as createTask,
  taskDone,
  sort as sortTask,
  batchAssignTask,
  del as delTask
} from "../../../api/task";
import {
  save as createState,
  edit as editStage,
  del as delStage
} from "../../../api/taskStages";

import {
  checkResponse,
  getApiUrl,
  getAuthorization,
  getUploadUrl
} from "../../../assets/js/utils";
import { formatTaskTime } from "../../../assets/js/dateTime";
import { collect } from "../../../api/projectCollect";
import { notice } from "../../../assets/js/notice";
import { Login } from "../../../api/user";

export default {
  name: "project-space-task",
  components: {
    TaskTag,
    draggable,
    projectSelect,
    projectConfig,
    taskMemberMenu
  },
  data() {
    return {
      visibleTaskMemberMenu: false,
      /*成员菜单*/
      currentTaskDone: 0, // 当前任务完成状态
      stageIndex: undefined, // 当前选中列index
      currentTaskIndex: undefined, // 当前选中任务index
      code: this.$route.params.code, // 当前projectId
      loading: true,
      project: { task_board_theme: "simple" },
      stageName: "",
      currentTeam: "", // 当前用户所在团队名
      task: {}, //当前任务
      taskStages: [], //任务列表
      projectMembers: [], //项目成员列表
      projectMembersCopy: [], //项目成员列表副本
      createTaskLoading: false, //创建任务loading
      showCreateStage: false,
      currentTask: {},
      preCode: "",
      nextCode: "",
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      stageKeys: [],
      stageModal: {
        form: this.$form.createForm(this),
        stageCode: "",
        stageIndex: 0,
        modalStatus: false,
        confirmLoading: false,
        modalTitle: "编辑列表"
      },

      slideMenuKey: "",
      inviteMemberDraw: {
        visible: false,
        keyword: "",
        searching: false,
        list: []
      },
      configDraw: {
        visible: false
      },

      downLoadUrl: getUploadUrl("project/task/_downloadTemplate"),
      uploadLoading: false,
      uploadAction: getApiUrl("project/task/uploadFile"),

      /*项目设置*/
      projectModal: {
        modalStatus: false,
        modalTitle: "项目设置"
      },
      /*任务标签*/
      taskTagModal: {
        modalStatus: false,
        modalTitle: "任务标签"
      },

      /*项目成员*/
      projectMemberModal: {
        loading: false,
        currentStageIndex: 0,
        modalStatus: false,
        modalTitle: "设置任务执行者"
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    }),
    scrollOps() {
      return {
        rail: {
          background: "#e5e5e5",
          opacity: 1
        },
        bar: {
          keepShow: true
        }
      };
    }
  },
  watch: {
    $route(to, from) {
      if (this.code != to.params.id) {
        this.code = to.params.code;

        this.getProject();
        this.init();
      }
    },
    inviteMemberDraw: {
      handler(newVal) {
        if (newVal.visible) {
          this.slideMenuKey = "member";
        } else {
          this.slideMenuKey = false;
        }
        if (newVal.keyword) {
          this.searchInviteMember();
        }
      },
      deep: true
    },
    configDraw: {
      handler(newVal) {
        if (newVal.visible) {
          this.slideMenuKey = "config";
        } else {
          this.slideMenuKey = false;
        }
      },
      deep: true
    }
  },
  created() {
    this.getProject();
    this.init();
  },
  methods: {
    init() {
      this.getTaskStages();
    },
    showModal(task, index, taskIndex) {
      this.currentTask = task;
      this.visible = true;
      this.stageIndex = index;
      this.currentTaskIndex = taskIndex;
      this.currentTaskDone = task.done;
    },
    handleCancel(e) {
      this.visible = false;
    },
    // 删除子任务
    handleDelete(e) {
      this.visible = false;
      delTask(this.currentTask.id);
      this.init();
    },
    // 获得项目信息
    getProject() {
      this.loading = true;
      getProject(this.code).then(res => {
        this.loading = false;
        this.project = res.data;
        this.currentTeam = res.data.team;
      });
    },
    // 获得任务信息
    getTaskStages(showLoading = true) {
      let app = this;
      getTaskStages({ projectId: this.code }).then(res => {
        let taskStages = [];
        if (!showLoading) {
          res.data.forEach(v => {
            v.tasksLoading = false;
            taskStages.push(v);
          });
        } else {
          //提前赋值，展现loading
          this.taskStages = taskStages = res.data;
        }
        if (taskStages.length) {
          taskStages.forEach((v, k) => {
            getTasks({ taskListId: v.id }).then(res => {
              res.data.forEach(task => {
                if (task.done) {
                  v.doneTasks.push(task);
                } else {
                  v.unDoneTasks.push(task);
                }
              });
              v.tasksLoading = false;
              v.tasks = res.data;
              if (!showLoading) {
                app.$set(app.taskStages, k, v);
              }
            });
          });
        }
      });
    },
    //显示添加任务卡片
    showTaskCard(index = false, show = true) {
      this.taskStages.forEach(v => {
        v.showTaskCard = false;
      });
      if (index === false) {
        return false;
      }
      this.taskStages[index].showTaskCard = show;
      this.$nextTick(() => {
        //滚动创建到创建窗口
        this.$refs[index + "-stage"][0].scrollIntoView("#card" + index);
        this.$refs[`inputTaskName${index}`][0].focus();
      });
    },
    //准备添加任务
    createTask(stageCode, stageIndex) {
      if (!this.task.name) {
        this.$message.warning("任务内容不能为空", 2);
        return false;
      }
      this.task.stage_code = stageCode;
      this.task.project_code = this.code;
      this.confirmCreateTask(stageIndex);
    },
    //添加任务
    confirmCreateTask(stageIndex) {
      let app = this;
      if (app.createTaskLoading) {
        app.$message.warning("正在添加任务，请稍后...", 2);
        return false;
      }
      setTimeout(function() {
        if (app.createTaskLoading === true) {
          app.$message.loading({
            content: "正在添加任务，请稍后...",
            duration: 5
          });
        }
      }, 2000);
      app.createTaskLoading = true;
      createTask(app.task)
        .then(res => {
          app.createTaskLoading = false;
          const result = checkResponse(res);
          if (result) {
            app.$message.destroy();
            let taskStages = app.taskStages[stageIndex];
            taskStages.tasks.push(res.data);
            app.taskStages[stageIndex].unDoneTasks.push(res.data);
            app.task = {};
          }
        })
        .catch(() => {
          app.createTaskLoading = false;
        });
    },
    // 列表更改任务完成状态
    taskDone(taskCode, stageIndex, taskIndex, done) {
      let task = null;
      let unDoneTasks = this.taskStages[stageIndex].unDoneTasks;
      let doneTasks = this.taskStages[stageIndex].doneTasks;
      if (done) {
        task = unDoneTasks[taskIndex];
      } else {
        task = doneTasks[taskIndex];
      }
      if (task.hasUnDone) {
        return false;
      }
      task.done = done;
      if (done) {
        unDoneTasks.splice(taskIndex, 1);
        doneTasks.push(task);
        doneTasks = doneTasks.sort(function(a, b) {
          if (a.sort === b.sort) {
            return a.id_num - b.id_num;
          } else {
            return a.sort - b.sort;
          }
        });
      } else {
        doneTasks.splice(taskIndex, 1);
        unDoneTasks.push(task);
        unDoneTasks = unDoneTasks.sort(function(a, b) {
          if (a.sort === b.sort) {
            return a.id_num - b.id_num;
          } else {
            return a.sort - b.sort;
          }
        });
      }
      taskDone(taskCode, done).then(res => {
        const result = checkResponse(res);
        if (!result) {
          return false;
        }
        //可能会触发工作流，所以全部刷新
        this.getTaskStages(false);
      });
    },
    // 弹窗更改任务完成状态
    changeDone(taskCode, stageIndex, taskIndex, done) {
      done ? (done = 1) : (done = 0);
      this.taskDone(taskCode, stageIndex, taskIndex, done);
      this.currentTask.done = done;
    },
    // 改变弹窗用户信息
    changeTask(executor) {
      this.currentTask.executor = executor;
      console.log(this.currentTask);
    },
    showInputStrageName() {
      this.showCreateStage = !this.showCreateStage;
      this.$nextTick(() => {
        this.$refs.inputStageName.focus();
      });
    },
    // 列表action
    doStage(action) {
      let app = this;
      let actionKeys = action.key.split("_");

      const stageCode = actionKeys[actionKeys.length - 2];
      const stageIndex = actionKeys[actionKeys.length - 1];
      const actionKey = actionKeys[0];
      switch (actionKey) {
        case "editStage":
          this.stageModal.stageCode = stageCode;
          this.stageModal.stageIndex = stageIndex;
          this.$nextTick(() => {
            this.stageModal.form.setFieldsValue({
              name: this.taskStages[stageIndex].name
            });
            this.$refs.inputStageTitle.focus();
          });
          this.stageModal.modalStatus = true;
          break;
        case "delStage":
          if (this.taskStages[stageIndex].tasks.length > 0) {
            this.$warning({
              title: "删除列表",
              content: `请先清空此列表上的任务，然后再删除这个列表`,
              okText: "确定"
            });
            return false;
          }
          this.$confirm({
            title: "删除列表",
            content: `您确定要永远删除这个列表吗？`,
            okText: "删除",
            okType: "danger",
            cancelText: `再想想`,
            onOk() {
              delStage(stageCode);
              app.taskStages.splice(stageIndex, 1);
              return Promise.resolve();
            }
          });
          break;
      }
    },
    // 添加任务列表
    creteStage() {
      if (!this.stageName) {
        this.$message.warning("请输入列表名称", 2);
        return false;
      }
      createState({ taskName: this.stageName, projectId: this.code })
        .then(res => {
          const result = checkResponse(res);
          if (!result) {
            return false;
          }
          const stage = res.data;
          this.taskStages.push(stage);
          this.stageName = "";
          this.$nextTick(() => {
            document.getElementById("board-scrum-stages").scrollLeft = 10000;
          });
        })
        .then(() => {
          this.getProject();
          this.init();
        });
    },
    editStage() {
      let stage = this.stageModal.form.getFieldsValue();
      if (!stage.name) {
        this.$message.warning("请输入列表名称", 2);
        return false;
      }
      editStage({
        taskName: stage.name,
        taskId: this.stageModal.stageCode
      }).then(res => {
        const result = checkResponse(res);
        if (!result) {
          return false;
        }

        this.taskStages[this.stageModal.stageIndex].task_name = stage.name;
        this.stageModal.modalStatus = false;
      });
    },
    setExecutor(member) {
      let stage = this.taskStages[this.projectMemberModal.currentStageIndex];
      let taskCodes = [];
      stage.tasks.forEach(v => {
        if (v.canRead) {
          taskCodes.push(v.code);
        }
      });
      if (taskCodes) {
        batchAssignTask({
          taskCodes: JSON.stringify(taskCodes),
          executorCode: member.code
        }).then(res => {
          this.projectMemberModal.modalStatus = false;
          if (!checkResponse(res)) {
            return false;
          }
          getTasks({ stageCode: stage.code }).then(res => {
            let canNotReadCount = 0;
            res.data.forEach(task => {
              if (!task.canRead) {
                canNotReadCount++;
              }
            });
            stage.canNotReadCount = canNotReadCount;
            stage.tasksLoading = false;
            stage.tasks = res.data;
          });
        });
      } else {
        this.projectMemberModal.modalStatus = false;
      }
    },
    showTaskPri(pri) {
      return {
        warning: pri == 1,
        error: pri == 2
      };
    },
    showTimeLabel(time) {
      let str = "label-primary";
      if (time == null) {
        return str;
      }
      let cha = moment(moment(time).format("YYYY-MM-DD")).diff(
        moment().format("YYYY-MM-DD"),
        "days"
      );
      if (cha < 0) {
        str = "label-danger";
      } else if (cha == 0) {
        str = "label-warning";
      } else if (cha > 7) {
        str = "label-normal";
      }
      return str;
    },
    showTaskTime(time, timeEnd) {
      return formatTaskTime(time, timeEnd);
      // return moment(time).format('MM月DD日 HH:mm')
    },
    taskDetail(code, stageIndex) {},
    stageMove(evt) {
      this.preCode = evt.draggedContext.element.id;
      this.nextCode = evt.relatedContext.element.id;
    },
    stageSort() {
      sort(this.preCode, this.nextCode, this.code);
    },
    taskSort(event) {
      console.log(event);
      const toStageCode = event.to.parentNode.parentNode.parentNode.getAttribute(
        "id"
      );
      let codes = "";
      for (let i = 0, len = event.to.children.length; i < len; i++) {
        codes += "," + event.to.children[i].getAttribute("id");
      }
      sortTask({ stageCode: toStageCode, codes: codes.substr(1) }).then(res => {
        this.getTaskStages(false);
      });
    },
    handleResize(vertical, stageIndex) {
      if (vertical.barSize) {
        this.taskStages[stageIndex].fixedCreator = true;
      }
    },

    visibleDraw(type) {
      if (type == "member") {
        this.configDraw.visible = false;
        this.inviteMemberDraw.visible = !this.inviteMemberDraw.visible;
      } else {
        this.inviteMemberDraw.visible = false;
        this.configDraw.visible = !this.configDraw.visible;
      }
    },
    searchInviteMember: _.debounce(function() {
      if (!this.inviteMemberDraw.keyword) {
        this.projectMembers = JSON.parse(
          JSON.stringify(this.projectMembersCopy)
        );
      }
      if (this.inviteMemberDraw.keyword.length <= 1) {
        return false;
      }
      this.searching = true;
      this.projectMembers = this.projectMembers.filter(
        item => item.name.indexOf(this.inviteMemberDraw.keyword) != -1
      );
    }, 500),
    updateProject(data) {
      this.project = data;
    },
    collectProject() {
      const type = this.project.collected ? "cancel" : "collect";
      collect(this.project.id, type).then(res => {
        if (!checkResponse(res)) {
          return;
        }
        this.project.collected = !this.project.collected;
      });
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/components/task";
.ant-modal-mask {
  background-color: rgba(0, 0, 0, 0.25);
}

.project-space-task {
  .tasks-loading {
    .ant-spin-blur {
      opacity: 0;
    }
  }
}

.info-drawer {
  top: 116px;
  width: 0 !important;

  .ant-drawer-mask {
    visibility: hidden;
  }

  .ant-drawer-content {
    background-color: #f7f7f7;
  }

  .ant-drawer-header {
    background-color: #f7f7f7;
    text-align: center;
  }

  .ant-drawer-body {
    padding: 12px 0;
  }

  .search-content {
    padding: 0 24px;
  }
}

.info-drawer {
  .member-list {
    padding-top: 12px;

    .ant-list-item-meta {
      align-items: center;
    }

    .member-list-item {
      padding: 12px 24px;

      &:hover {
        background-color: #eee;
        cursor: pointer;
      }
    }
  }
}
.field {
  display: flex;
  justify-content: flex-start;
  margin: 12px 0;
  min-height: 36px;

  .field-left {
    align-self: flex-start;
    width: 132px;
    height: 36px;
    padding-right: 12px;
  }

  .field-right {
    cursor: pointer;
    max-width: calc(100% - 132px);

    .inline-block {
      display: inline-block;
    }

    &.field-date {
      display: flex;
    }

    &.width-block {
      width: 100%;

      .w-e-text {
        cursor: text;
      }
    }

    .name {
      margin: 0 8px;
    }
  }

  .block-field {
    width: 100%;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 2px 0;
    margin-bottom: 12px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
  }

  .task-child {
    width: 100%;

    .task-list {
      padding: 8px 0;

      .list-item {
        padding: 4px 12px 4px 5px;
        display: flex;
        align-items: center;
        /*justify-content: space-between;*/

        .task-title,
        .task-input {
          flex: 1 1;
          margin: 0;
        }

        .title-text {
          color: #333;
          line-height: 14px;

          &.done {
            color: #a6a6a6;
          }
        }

        .ant-input,
        .title-text {
          font-size: 14px;

          &:hover,
          &:focus {
          }
        }

        .check-box-wrapper {
          margin-top: 0;
        }

        .task-item {
          cursor: pointer;
          margin-right: 12px;

          &.disabled {
            cursor: not-allowed;
          }

          &.check-box {
            .anticon-check {
              visibility: visible;
              top: 14px;
              left: 18px;
            }
          }
        }
      }

      .action-btn {
        padding: 2px 12px 2px 16px;
      }
    }

    .add-handler {
      /*margin-bottom: 8px;*/
      padding-left: 16px;
      padding-right: 12px;
      display: flex;
      align-items: center;
      height: 36px;
    }
  }

  .file-list {
    width: 100%;
    padding: 8px;

    .ant-list-item {
      padding: 10px 12px;
      border-bottom: none;
      border-radius: 4px;
      margin-bottom: 2px;

      &:hover {
        background-color: #f5f5f5;
      }

      .ant-list-item-meta-title {
        margin-bottom: 0;
        line-height: 24px;
      }
    }
  }
}
.ant-modal-content {
  top: 100px;
}
.field-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 8px;
}
.info-drawer {
  .config-wrapper {
    position: relative;
    padding-bottom: 1px;

    .config-menus {
      padding: 0;
      list-style: none;

      .menu-item {
        position: relative;
        line-height: 30px;

        &:hover {
          background: #eeeeee;
        }

        &:first-child > a {
          margin-top: -6px;
        }

        a {
          display: block;
          cursor: pointer;
          padding: 5px 15px;
          text-decoration: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #383838;
          font-weight: 600;

          .anticon {
            width: 24px;
            text-align: center;
            font-size: 15px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
