<template>
  <div class="member-menu">
    <a-spin :spinning="listLoading || doListLoading">
      <div class="member-list">
        <vue-scroll>
          <div class="list-group">
            <span class="title muted">执行者</span>
            <div
              class="member-list-item ant-list-item"
              v-if="!doList.length && !doListLoading"
              @click="assignTask(null)"
            >
              <div class="ant-list-item-meta">
                <div class="ant-list-item-meta-avatar">
                  <a-avatar icon="user"></a-avatar>
                </div>
                <div class="ant-list-item-meta-content">
                  <h4 class="ant-list-item-meta-title">
                    <span>待认领</span>
                  </h4>
                </div>
              </div>
              <ul class="ant-list-item-action">
                <li>
                  <span>
                    <a-icon type="check"></a-icon>
                  </span>
                </li>
              </ul>
            </div>
            <a-list
              class="list-content"
              itemLayout="horizontal"
              :dataSource="doList"
              v-show="doList.length"
            >
              <a-list-item class="member-list-item" slot="renderItem" slot-scope="item">
                <span slot="actions">
                  <a-icon type="check" v-show="showCheck(item)"></a-icon>
                </span>
                <a-list-item-meta>
                  <span slot="title">{{item.member_name}}</span>
                  <a-avatar slot="avatar" icon="user" :src="item.avatar" />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
          <div class="list-group">
            <span class="title muted">其他成员</span>
            <div
              class="member-list-item ant-list-item"
              v-if="doList.length"
              @click="assignTask(null)"
            >
              <div class="ant-list-item-meta">
                <div class="ant-list-item-meta-avatar">
                  <a-avatar icon="user"></a-avatar>
                </div>
                <div class="ant-list-item-meta-content">
                  <h4 class="ant-list-item-meta-title">
                    <span>待认领</span>
                  </h4>
                </div>
              </div>
            </div>
            <a-list class="list-content" itemLayout="horizontal" :dataSource="list">
              <a-list-item
                class="member-list-item"
                slot="renderItem"
                slot-scope="item"
                @click.native="assignTask(item.id,item)"
                v-if="showMember(item)"
              >
                <a-list-item-meta>
                  <span slot="title">{{item.member_name}}</span>
                  <a-avatar slot="avatar" icon="user" :src="item.avatar" />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </vue-scroll>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { getMembers as list } from "../../api/user";
import { list as getTaskMembers } from "../../api/taskMember";
import { assignTask } from "../../api/task";

export default {
  name: "taskMemberMenu",
  props: {
    executor: {
      default() {
        return {};
      }
    },
    teamName: {
      type: [String, Number],
      default() {
        return "";
      }
    },
    projectCode: {
      type: [String, Number],
      default() {
        return "";
      }
    },
    taskCode: {
      type: [String, Number],
      default() {
        return "";
      }
    },
    isCommit: {
      //选择后是否提交
      type: [Boolean],
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      doListLoading: false,
      listLoading: false,
      showInviteMember: false,
      doList: [],
      list: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.listLoading = true;
      list({ teamName: this.teamName }).then(res => {
        this.list = res.data;
        this.listLoading = false;
        this.doList = [];
        if (this.executor.member_name) {
          this.doList.push(this.executor);
        }
      });
    },
    showMember(item) {
      let show = true;
      this.doList.forEach(v => {
        if (item.id == v.id) {
          show = false;
        }
      });
      return show;
    },
    showCheck(item) {
      if (item.is_executor) {
        return true;
      }
    },
    assignTask(executorCode, executor = null) {
      if (this.isCommit) {
        assignTask({
          subtaskId: this.taskCode,
          executorId: executorCode
        }).then(() => {
          this.doList = [];
          if (executor && executor.id) {
            this.doList.push(executor);
          }
          this.$emit("close", executor);
        });
      } else {
        this.$emit("close", executor);
      }
    }
  }
};
</script>
<style lang="less">
.member-menu {
  height: auto;
}
</style>