<template>
  <div>
    <a-modal
      class="invite-department-member"
      :width="360"
      v-model="actionInfo.modalStatus"
      :title="actionInfo.modalTitle"
      :footer="null"
      @cancel="cancel"
    >
      <div class="header">
        <span>账号邀请</span>
      </div>
      <div class="search-content">
        <a-input v-model="keyword" placeholder="输入邮箱查找">
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
      <div class="member-list">
        <a-list
          class="project-list"
          itemLayout="horizontal"
          :loading="searching"
          :dataSource="list"
          :locale="{emptyText: (keyword && keyword.length > 1) ? '没有搜索到相关成员' : ''}"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <span slot="actions">
              <a-button
                size="small"
                type="dashed"
                icon="user-add"
                v-if="!item.team"
                @click="invite(item)"
              >添加</a-button>
              <template v-else>
                <a-icon type="user"></a-icon>
                <span>已加入</span>
              </template>
            </span>
            <a-list-item-meta :description="item.email">
              <span slot="title">{{item.member_name}}</span>
              <a-avatar slot="avatar" icon="user" :src="item.avatar" />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import _ from "lodash";
import {
  inviteMember,
  noTeamMembers
} from "../../api/departmentMember";
import { checkResponse } from "../../assets/js/utils";

export default {
  name: "inviteDepartmentMember",
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      }
    },
    teamName: {
      type: [String, Number],
      default() {
        return "";
      }
    },
    departmentCode: {
      type: [String, Number],
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      change:false,
      form: this.$form.createForm(this),
      actionInfo: {
        modalStatus: this.value,
        confirmLoading: false,
        modalTitle: this.departmentCode ? "添加成员至部门" : "添加成员至组织"
      },
      linkInfo: {
        modalStatus: false,
        confirmLoading: false,
        modalTitle: "邀请成员",
        link: "",
        overTime: ""
      },
      keyword: "",
      searching: false,
      list: []
    };
  },
  watch: {
    value(value) {
      this.actionInfo.modalStatus = value;
    },
    keyword() {
      this.search();
    }
  },
  created() {
    if (this.departmentCode) {
      this.searching = true;
      noTeamMembers(this.keyword).then(res => {
        this.searching = false;
        this.list = res.data;
        
      });
    }
  },
  methods: {
    invite(item) {
      inviteMember(item.id, this.teamName).then(res => {
        const success = checkResponse(res);
        if (success) {
          item.team = this.teamName;
          this.$emit("update", item);
        }
      });
    },
    search: _.debounce(function() {
      if (!this.keyword) {
        this.list = [];
      }
      this.searching = true;
      noTeamMembers(this.keyword).then(res => {
        this.searching = false;
        this.list = res.data;
      });
    }, 500),
    cancel() {
      this.actionInfo.modalStatus = false;
      this.$emit("input", this.actionInfo.modalStatus);
    }
  }
};
</script>

<style lang="less">
.invite-department-member {
  .ant-modal-body {
    padding-top: 0;
    padding-bottom: 24px;
    min-height: 40vh;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px 0;
  }

  .member-list {
    padding-top: 12px;
  }
}
</style>
