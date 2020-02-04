<template>
  <div class="members-index">
    <div class="layout-item left">
      <div class="left-content">
        <div class="content-item muted">所有团队</div>
        <div class="actions content-item">
          <a-dropdown :trigger="['click']" v-model="showCreateDepartment" placement="bottomCenter">
            <a>
              <a-icon :style="{fontSize: '14px'}" type="plus-circle" />申请团队
            </a>
            <div slot="overlay">
              <create-department v-if="showCreateDepartment"></create-department>
            </div>
          </a-dropdown>
        </div>
        <div class="content-item department">
          <a-spin :spinning="departmentLoading">
            <a-tree :loadData="onLoadData" :treeData="treeData" showIcon @select="onSelect">
              <template slot="custom">
                <a-icon type="bulb" />
              </template>
            </a-tree>
          </a-spin>
        </div>
      </div>
    </div>
    <div class="layout-item right">
      <div class="header">
        <div class="title"></div>
        <div class="actions">
          <template v-if="currentDepartmentCode">
            <a-dropdown :trigger="['click']" placement="bottomCenter">
              <a class="ant-dropdown-link" href="#">
                <a-icon type="user-add" />添加成员
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;" @click="showInviteMember = true">
                    <a-icon type="user-add" />通过邮箱邀请
                  </a>
                </a-menu-item>
                <a-menu-divider />
              </a-menu>
            </a-dropdown>
            <a-dropdown :trigger="['click']" v-model="showEditDepartment" placement="bottomCenter">
              <a>
                <a-icon :style="{fontSize: '14px'}" type="edit" />编辑团队
              </a>
              <div slot="overlay">
                <create-department
                  v-if="showEditDepartment"
                  :department-code="currentDepartmentCode"
                  :teamName="currentSelectTeam"
                  @edit="editDepartmentSuccess"
                ></create-department>
              </div>
            </a-dropdown>
            <a @click="deleteDepartment">
              <a-icon :style="{fontSize: '14px'}" type="delete" />删除团队
            </a>
          </template>
        </div>
      </div>
      <div class="members-content">
        <a-list class="member-list" :loading="loading">
          <div
            v-if="showLoadingMore"
            slot="loadMore"
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
          >
            <a-button @click="onLoadMore">加载更多</a-button>
          </div>
          <a-list-item :key="index" v-for="(item, index) in members">
            <a-list-item-meta>
              <a-avatar slot="avatar" :src="item.avatar" />
              <div slot="title">
                <router-link :to="`/members/profile/${item.code}`" class="text-default">
                  {{ item.name
                  }}
                </router-link>
                <a-tag class="m-l-sm" v-if="item.is_team_leader">团队管理员</a-tag>
              </div>
              <div slot="description">
                <span>
                  {{item.email}}
                  <span v-if="item.departments">- {{ item.departments }}</span>
                </span>
              </div>
            </a-list-item-meta>
            <template v-if="!item.is_owner">
              <a
                class="muted"
                slot="actions"
                v-if="item.status == 0"
                @click="resumeAccount(item,index)"
              ></a>

              <a class="muted" slot="actions" @click="deleteAccount(item,index)">
                <a-tooltip :title="`从团队内移除`">
                  <a-icon type="user-delete" />
                </a-tooltip>
              </a>
            </template>
          </a-list-item>
        </a-list>
      </div>
    </div>
    <invite-department-member
      v-model="showInviteMember"
      :teamName="currentSelectTeam"
      :department-code="currentDepartmentCode"
      v-if="showInviteMember"
      @update="getMembers"
    ></invite-department-member>
  </div>
</template>

<script>
import _ from "lodash";
import inviteDepartmentMember from "../../components/project/inviteDepartmentMember";
import createDepartment from "../../components/project/createDepartment";
import { list } from "../../api/department";
import {
  del,
  forbid,
  getMembers,
  resume,
  getCurrentTeam
} from "../../api/user";
import pagination from "../../mixins/pagination";
import { checkResponse } from "../../assets/js/utils";
import { notice } from "../../assets/js/notice";
import { removeMember } from "../../api/departmentMember";
import { del as deleteDepartment } from "../../api/department";
export default {
  name: "members",
  components: {
    inviteDepartmentMember,
    createDepartment
  },
  mixins: [pagination],
  data() {
    return {
      keyword: "",
      selectedKeys: ["0"],
      menus: [{ icon: "team", title: "所有成员" }],
      currentTeam: "", // 当前用户所在团队
      currentSelectTeam: "", //当前选中团队名
      currentMenu: {},
      currentDepartmentCode: "",
      currentTreeNode: "", //当前团队树节点
      treeData: [],
      departmentLoading: false,
      loading: false,
      members: [],
      showLoadingMore: false,
      loadingMore: false,
      showInviteMember: false,
      showCreateDepartment: false,
      showEditDepartment: false,

      uploadLoading: false
    };
  },
  computed: {},
  created() {
    // this.getMembers({ key: 0 });
    this.getCurrentTeam(); //获取当前所在队伍
    this.getDepartment();
  },
  methods: {
    // 获得当前用户团队
    getCurrentTeam() {
      getCurrentTeam().then(res => {
        this.currentTeam = res.data[0].team;
      });
    },
    //获得团队列表
    getDepartment() {
      this.departmentLoading = true;
      list().then(res => {
        let list = [];
        if (res.data.length) {
          res.data.forEach(v => {
            if (this.currentTeam === v.team) {
              list.push({
                key: v.id,
                title: v.team,
                isLeaf: !v.hasNext,
                scopedSlots: { icon: "custom" }
              });
            } else {
              list.push({
                key: v.id,
                title: v.team,
                isLeaf: !v.hasNext,
                scopedSlots: { icon: "" }
              });
            }
          });
        }
        this.treeData = list;
        this.departmentLoading = false;
      });
    },
    // 获得对应团队成员
    getMembers({ key } = {}, reload = true) {
      let app = this;
      if (key != undefined) {
        this.currentDepartmentCode = "";
        this.currentMenu = this.menus[key];
        this.selectedKeys = [key.toString()];
      }
      app.loading = true;
      if (reload) {
        this.pagination.page = 1;
      }
      getMembers(this.requestData).then(res => {
        if (reload) {
          app.members = res.data;
        } else {
          app.members = app.members.concat(res.data);
        }

        app.pagination.total = res.data.length;
        app.showLoadingMore = app.pagination.total > app.members.length;
        app.loading = false;
        app.loadingMore = false;
      });
    },
    // 选择事件
    onSelect(selectedKeys, e) {
      this.selectedKeys = [];
      this.currentMenu = e.node.dataRef;
      this.currentSelectTeam = e.node.dataRef.title;
      this.currentDepartmentCode = e.node.dataRef.key;
      this.currentTreeNode = e.node;
      let app = this;
      this.requestData.id = e.node.dataRef.key;
      this.requestData.teamName = e.node.dataRef.title;
      app.loading = true;
      getMembers(this.requestData).then(res => {
        app.members = res.data;
        app.loading = false;
        app.loadingMore = false;
      });
    },
    onLoadData(treeNode) {
      return new Promise(resolve => {
        list({ page: 1, pageSize: 100, pcode: treeNode.dataRef.key }).then(
          res => {
            let list = [];
            treeNode.dataRef.isLeaf = !list.length > 0;
            treeNode.dataRef.children = list;
            this.treeData = [...this.treeData];
            resolve();
          }
        );
      });
    },

    // 更改团队名
    editDepartmentSuccess(data) {console.log(data);
    
      this.currentTreeNode.dataRef.title = data;
      this.currentSelectTeam = data;
      this.showEditDepartment = false;
      this.requestData.teamName = data
    },
    // 删除团队
    deleteDepartment() {
      let app = this;
      this.$confirm({
        title: "您确定要删除当前团队吗？",
        content: `团队中的成员将不属于任何团队。`,
        okText: "删除",
        okType: "danger",
        cancelText: "再想想",
        onOk() {
          deleteDepartment(app.currentSelectTeam).then(res => {
            if (!checkResponse(res)) {
              return;
            }
            if (app.currentTreeNode.$parent.dataRef) {
              app.onLoadData(app.currentTreeNode.$parent);
              app.onSelect(null, { node: app.currentTreeNode.$parent });
            } else {
              app.getMembers({ key: 0 });
              app.getDepartment();
            }
            notice({ title: "删除成功" }, "notice", "success");
          });
          return Promise.resolve();
        }
      });
    },
    // 移除团队成员
    deleteAccount(member, index) {
      let app = this;
      this.$confirm({
        title: `确认从${this.currentSelectTeam}中移除成员吗？`,
        content: `移除后该账号在${this.currentSelectTeam}内的相关信息将会被清除`,
        okText: "移除",
        okType: "danger",
        cancelText: "再想想",
        onOk() {
          if (app.currentDepartmentCode) {
            removeMember(member.id, app.currentSelectTeam).then(res => {
              if (!checkResponse(res)) {
                return;
              }
              app.members.splice(index, 1);
              notice({ title: "移除成功" }, "notice", "success");
            });
          } else {
            del(member.code).then(res => {
              if (!checkResponse(res)) {
                return;
              }
              app.members.splice(index, 1);
              notice({ title: "移除成功" }, "notice", "success");
            });
          }
          return Promise.resolve();
        }
      });
    }
  }
};
</script>

<style lang="less">
.members-index {
  margin: 24px auto;
  display: flex;
  flex-direction: row;
  width: 1100px;
  padding: 0 12px;

  .layout-item {
    background: #fff;
    width: 100%;
  }

  .left {
    padding: 12px 24px 12px 0;
    width: 280px;
    height: 85vh;

    .left-content {
      width: 255px;
      height: 100%;
      border-right: 1px solid #e8e8e8;

      .content-item {
        padding: 6px 24px 12px 24px;
      }

      .search-content {
        padding: 12px;

        .anticon-close-circle {
          cursor: pointer;
          color: #ccc;
          transition: color 0.3s;
          font-size: 12px;
        }

        .anticon-close-circle:hover {
          color: #999;
        }

        .anticon-close-circle:active {
          color: #666;
        }
      }

      .menus {
      }

      .actions {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0;
      }

      .department {
        padding: 6px 12px 12px 12px;

        .ant-tree li {
          position: relative;

          .ant-tree-node-content-wrapper {
            height: 40px;
            line-height: 40px;
            width: 100%;

            &.ant-tree-node-selected,
            &:hover {
              background-color: #f5f5f5;
            }
          }

          .ant-tree-iconEle {
            height: 40px;
            line-height: 40px;
          }

          .ant-tree-switcher {
            position: absolute;
            right: 0;
            height: 40px;
            line-height: 40px;

            .ant-tree-switcher-loading-icon {
              height: 40px;
            }
          }
        }
      }
    }

    .ant-menu-root {
      border-right: none;
    }
  }

  .right {
    padding: 24px 12px 12px 0;

    .header {
      padding-right: 12px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 24px;

      .title {
        font-size: 18px;
      }

      .actions {
        a {
          margin-left: 12px;
        }
      }
    }

    .members-content {
      height: 75vh;

      .member-list {
        margin-right: 12px;
      }
    }
  }
}
</style>
