<template>
  <div id="project-select" v-if="currentProject">
    <a-dropdown
      :trigger="['click']"
      v-model="visibleMenu"
      class="action-item"
      placement="bottomCenter"
    >
      <a-tooltip :mouseEnterDelay="0.3" :title="currentProject.project_name">
        <a class="project-select" style="color: #333" @click="visibleMenu = true">
          <span>{{currentProject.project_name}}</span>
          <span class="m-l-xs">
            <a-icon type="down" />
          </span>
        </a>
      </a-tooltip>
      <div slot="overlay" class="middle-menu member-menu project-select-menu">
        <div class="search-content">
          <a-input v-model="keyword" size="large" placeholder="搜索">
            <a-icon slot="prefix" type="search" />
          </a-input>
        </div>
        <div class="member-list">
          <vue-scroll>
            <div class="list-group">
              <a-list
                class="list-content"
                itemLayout="horizontal"
                :dataSource="projectList"
                :locale="{emptyText: (keyword && keyword.length > 1) ? '没有找到该项目' : ''}"
              >
                <a-list-item
                  class="member-list-item"
                  slot="renderItem"
                  slot-scope="item"
                  @click.native="changeProject(item.id)"
                >
                  <span slot="actions">
                    <a-icon type="check" v-show="showCheck(item.id)"></a-icon>
                  </span>
                  <a-list-item-meta>
                    <span slot="title">{{item.project_name}}</span>
                    <a-avatar slot="avatar" icon="user" :src="item.cover" />
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </div>
          </vue-scroll>
        </div>
      </div>
    </a-dropdown>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";
import { selfList as getProjectList } from "../../api/project";
import pagination from "../../mixins/pagination";

export default {
  name: "ProjectSelect",
  props: {
    code: {
      type: [String],
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      visibleMenu: false,
      keyword: "",
      loading: false,
      currentProject: null,
      projectList: [],
      projectListCopy: [],
      projectTotal: 0
    };
  },
  mixins: [pagination],
  computed: {
    ...mapState({
      currentOrganization: state => state.currentOrganization,
      organizationList: state => state.organizationList
    })
  },
  watch: {
    code() {
      this.init();
    },
    keyword() {
      this.search();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getProjectList(true);
    },
    getProjectList(loading = true) {
      this.loading = loading;
      this.requestData.type = 'all'
      console.log(this.requestData);
      
      getProjectList(this.requestData.type).then(res => {
        this.projectList = res.data;
        this.projectListCopy = res.data;
        this.projectTotal = res.data.total;
        this.currentProject = res.data.find(
          item => item.id == this.code
        );
        this.loading = false;
      });
    },
    changeProject(code) {
      this.visibleMenu = false;
      this.$router.push("/project/space/task/" + code);
    },
    showCheck(code) {
      if (code == this.code) {
        return true;
      }
    },
    search: _.debounce(function() {
      this.keyword = this.keyword.trim();
      if (!this.keyword) {
        this.projectList = JSON.parse(JSON.stringify(this.projectListCopy));
      }
      // this.searching = true;
      this.projectList = this.projectList.filter(
        item => item.project_name.indexOf(this.keyword) != -1
      );
    }, 500),
    getPopup() {
      return document.getElementById("project-select");
    }
  }
};
</script>

<style lang="less">
#project-select {
  cursor: pointer;

  :hover {
    /*background: rgba(0, 0, 0, 0.025);*/
  }
}

.project-select-menu {
  margin-left: 10px;

  .member-list {
    height: 290px;
  }
}
</style>
