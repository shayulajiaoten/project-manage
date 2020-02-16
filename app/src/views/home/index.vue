<template>
  <div class="home-index">
    <div class="page-header">
      <p class="day-text muted">
        『 {{ yiyan.hitokoto }}』 —— 《{{ yiyan.from }}》
        <a class="muted" @click="getYiYan">
          <a-icon type="reload" />
        </a>
      </p>
      <div class="header-content">
        <div class="left-content">
          <div class="avatar">
            <a-avatar :size="64" :src="userInfo.avatar">{{userInfo.member_name}}</a-avatar>
          </div>
          <div class="user-info">
            <div class="title">{{helloTime}}{{ userInfo.member_name }}，祝你开心每一天！</div>

            <div class="team muted">
              <template v-if="userInfo.team">{{ userInfo.team }}</template>
            </div>
          </div>
        </div>
        <div class="right-content">
          <div class="content-item">
            <div class="item-title muted">任务数</div>
            <div class="item-text">
              <span>{{tasksTotal}}</span>
            </div>
          </div>
          <div class="content-item">
            <div class="item-title muted">项目总数</div>
            <div class="item-text">
              <span>{{projectTotal}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<wrapper-content :showHeader="false">-->
    <div class="page-wrapper">
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="进行中的项目"
            :body-style="{ padding: 0 }"
          >
            <router-link to="/project/list/my" slot="extra">全部项目</router-link>
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projectList">
                <a-card
                  :bordered="false"
                  :body-style="{ padding: 0 }"
                  @click="routerLink('/project/space/task/' + item.id)"
                >
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a-avatar size="small" :src="item.cover" />
                      <router-link :to="'/project/space/task/' + item.id">
                        <a-icon
                          type="star"
                          theme="filled"
                          style="color: #ffaf38;margin-right: 6px;"
                          v-show="item.collected"
                        />
                        {{ item.project_name }}
                      </router-link>
                    </div>
                    <div slot="description" class="card-description">
                      <a-tooltip :mouseEnterDelay="0.3" :title="item.description">
                        <span class="description-text">
                          <span v-if="item.description">{{ item.description }}</span>
                          <span v-else>暂无介绍</span>
                        </span>
                      </a-tooltip>
                      <a-tooltip
                        placement="right"
                        :mouseEnterDelay="0.3"
                        :title="`当前进度：${item.schedule}%`"
                      >
                        <a-progress :strokeWidth="2" :showInfo="false" :percent="item.schedule" />
                      </a-tooltip>
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a href="/#/home">{{ item.creator }}</a>
                    <span class="datetime">{{ formatTime(item.create_time) }}</span>
                  </div>
                </a-card>
              </a-card-grid>
              <p class="muted text-center m-t-md m-b-md" v-if="!projectList.length">暂无项目</p>
            </div>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="tasks-list"
            :title="`我的任务 · ${tasks.length}`"
            style="margin-bottom: 24px"
            :bordered="false"
            :loading="loading"
          >
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in tasks">
                <a-list-item-meta>
                  <div slot="title">{{ item.task_name }}</div>
                  <div slot="description">
                    <router-link
                      target="_blank"
                      class="muted"
                      :to="'/project/space/task/' + item.projectInfo.id"
                    >{{ item.projectInfo.project_name }}</router-link>
                  </div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24"
          v-show="userInfo.is_team_leader"
        >
          <a-card
            class="tasks-list"
            :title="`项目申请`"
            style="margin-bottom: 24px"
            :bordered="false"
            :loading="loading"
          >
            <a-list>
              <a-list-item
                v-show="!item.resolve"
                :key="index"
                v-for="(item, index) in projectCreateList"
              >
                <a-list-item-meta>
                  <div slot="title">{{ item.project_name }}</div>
                </a-list-item-meta>
                <a-button
                  type="danger "
                  style="margin-right:10px"
                  ghost
                  @click="editProjectStatus(item,0)"
                >
                  <a-icon type="close" />拒绝
                </a-button>
                <a-button type="primary" ghost @click="editProjectStatus(item,1)">
                  <a-icon type="check" />允许
                </a-button>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24"
          v-show="userInfo.super_leader"
        >
          <a-card
            class="tasks-list"
            :title="`团队申请`"
            style="margin-bottom: 24px"
            :bordered="false"
            :loading="loading"
          >
            <a-list>
              <a-list-item
                v-show="!item.resolve"
                :key="index"
                v-for="(item, index) in teamCreateList"
              >
                <a-list-item-meta>
                  <div slot="title">{{ item.team }}</div>
                </a-list-item-meta>

                <a-button
                  type="danger "
                  style="margin-right:10px"
                  ghost
                  @click="editTeamStatus(item,0)"
                >
                  <a-icon type="close" />拒绝
                </a-button>
                <a-button type="primary" ghost @click="editTeamStatus(item,1)">
                  <a-icon type="check" />允许
                </a-button>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <!--</wrapper-content>-->
  </div>
</template>
<script>
import { mapState } from "vuex";
import moment from "moment";
import { getYiYan } from "../../api/other";
import {
  formatTaskTime,
  relativelyTime,
  showHelloTime,
  relativelyTaskTime
} from "../../assets/js/dateTime";
import { selfList as getProjectList } from "../../api/project";
import pagination from "../../mixins/pagination";
import {
  resolveList,
  editTeamStatus,
  editProjectStatus
} from "../../api/system";
import { getLogBySelfProject, selfList } from "../../api/task";

export default {
  name: "Home",
  components: {},
  mixins: [pagination],
  data() {
    return {
      teamCreateList: [], // 团队申请
      projectCreateList: [], // 项目申请
      loading: false,
      yiyan: {},
      projectList: [],
      projectTotal: 0,
      activities: [],
      tasks: [],
      tasksTotal: 0,
      accounts: []
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    helloTime() {
      return showHelloTime();
    }
  },
  created() {
    this.getYiYan();
    this.init();
  },
  methods: {
    // 项目申请处理
    editProjectStatus(item, status) {
      let requestData = {};
      requestData.id = item.id;
      requestData.status = status;
      editProjectStatus(requestData).then(() => {
        item.resolve = 1;
      });
    },
    // 团队申请处理
    editTeamStatus(item, status) {
      let requestData = {};
      requestData.id = item.id;
      requestData.status = status;
      editTeamStatus(requestData).then(() => {
        item.resolve = 1;
      });
    },
    init(reset = true, loading = true) {
      resolveList().then(res => {
        this.teamCreateList = res.data[1];
        this.projectCreateList = res.data[0];
      });
      if (reset) {
        this.projectList = [];
      }
      this.getProjectList(loading);
      this.getTasks();
    },
    getProjectList(loading) {
      if (loading) {
        this.loading = true;
      }

      getProjectList("my").then(res => {
        if (res.errno != -1) {
          this.projectList = res.data;
          this.projectTotal = res.data.length;
        }
        this.loading = false;
      });
    },
    getTasks() {
      selfList().then(res => {
        this.tasks = res.data;
        this.tasksTotal = res.data.length;
      });
    },

    getYiYan() {
      let app = this;
      getYiYan(function(data) {
        app.yiyan = data;
      }, "d");
    },
    formatTime(time) {
      return relativelyTime(time);
    },
    showTaskTime(time, timeEnd) {
      return formatTaskTime(time, timeEnd);
    }
    //     showTimeLabel(time) {
    //         let str = 'label-primary';
    //         if (time == null) {
    //             return str;
    //         }
    //         let cha = moment(moment(time).format("YYYY-MM-DD")).diff(moment().format("YYYY-MM-DD"), 'days');
    //         if (cha < 0) {
    //             str = 'label-danger';
    //         } else if (cha == 0) {
    //             str = 'label-warning';
    //         } else if (cha > 7) {
    //             str = 'label-normal'
    //         }
    //         return str;
    //     },
  }
};
</script>
<style lang="less">
.home-index {
  .page-header {
    background: #fff;
    padding: 16px 32px 0;
    .header-content {
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;

      .left-content {
        display: flex;
        align-items: center;

        .user-info {
          margin-left: 12px;
          line-height: 33px;

          .title {
            font-size: 20px;
          }

          .team {
          }
        }
      }

      .right-content {
        display: flex;

        .content-item {
          padding: 0 32px;
          position: relative;

          .item-text {
            font-size: 30px;

            .small {
              font-size: 20px;
            }
          }

          &:after {
            background-color: #e8e8e8;
            position: absolute;
            top: 8px;
            right: 0;
            width: 1px;
            height: 40px;
            content: "";
          }

          &:last-child {
            &:after {
              width: 0;
            }
          }
        }
      }
    }
  }

  .page-wrapper {
    margin: 24px;

    .project-list {
      .card-title {
        font-size: 0;

        a {
          color: rgba(0, 0, 0, 0.85);
          margin-left: 12px;
          line-height: 24px;
          height: 24px;
          display: inline-block;
          vertical-align: top;
          font-size: 14px;

          &:hover {
            color: #1890ff;
          }
        }
      }

      .card-description {
        color: rgba(0, 0, 0, 0.45);
        height: 44px;
        line-height: 22px;
        overflow: hidden;
        .description-text {
          height: 22px;
        }
      }

      .project-item {
        display: flex;
        margin-top: 8px;
        overflow: hidden;
        font-size: 12px;
        height: 20px;
        line-height: 20px;

        a {
          color: rgba(0, 0, 0, 0.45);
          display: inline-block;
          flex: 1 1 0;

          &:hover {
            color: #1890ff;
          }
        }

        .datetime {
          color: rgba(0, 0, 0, 0.25);
          flex: 0 0 auto;
          float: right;
        }
      }

      .ant-card-meta-description {
        color: rgba(0, 0, 0, 0.45);
        height: 44px;
        line-height: 22px;
        overflow: hidden;
      }
    }

    .activities-list {
      .ant-list-item-meta-title {
        position: relative;
      }

      .comment-text {
        margin-bottom: 0;
      }

      .right-item {
        float: right;
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    .tasks-list {
      .ant-card-body {
        padding: 6px 24px;
      }
    }

    .item-group {
      padding: 20px 0 8px 24px;
      font-size: 0;

      a {
        color: rgba(0, 0, 0, 0.65);
        display: inline-block;
        font-size: 14px;
        margin-bottom: 13px;
        width: 25%;
      }
    }

    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;

        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 6px;
          transition: all 0.3s;
          display: inline-block;
        }

        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }
}
</style>
