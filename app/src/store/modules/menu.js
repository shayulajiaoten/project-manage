// import {getMenuForUser} from "@/api/menu";
import {
  getStore,
  setStore
} from '@/assets/js/storage';

const common = {
  state: {
    menu: [{
        id: "120",
        pid: 0,
        title: "工作台",
        icon: "appstore-o",
        url: "home",
        file_path: "home",
        params: "",
        node: "#",
        sort: 0,
        status: 1,
        create_by: 0,
        create_at: "2018-09-30 1:3:01",
        is_inner: false,
        values: "",
        show_slider: 0,
        statusText: "使用中",
        innerText: "导航",
        fullUrl: "home"
      },
      {
        id: "121",
        pid: 0,
        title: "项目管理",
        icon: "project",
        url: "#",
        file_path: "#",
        params: "",
        node: "#",
        sort: 0,
        status: 1,
        create_by: 0,
        create_at: "0000-00-00 00:00:00",
        is_inner: false,
        values: "",
        show_slider: 1,
        statusText: "使用中",
        innerText: "导航",
        fullUrl: "#",
        children: [{
            id: "122",
            pid: 121,
            title: "项目列表",
            icon: "branches",
            url: "#",
            file_path: "#",
            params: "",
            node: "#",
            sort: 0,
            status: 1,
            create_by: 0,
            create_at: "0000-00-00 00:00:00",
            is_inner: false,
            values: "",
            show_slider: 1,
            statusText: "使用中",
            innerText: "导航",
            fullUrl: "#",
            children: [{
                id: "151",
                pid: 122,
                title: "我的项目",
                icon: "",
                url: "project/list",
                file_path: "project/list",
                params: ":type",
                node: "project/project/index",
                sort: 0,
                status: 1,
                create_by: 0,
                create_at: "0000-00-00 00:00:00",
                is_inner: false,
                values: "my",
                show_slider: 1,
                statusText: "使用中",
                innerText: "导航",
                fullUrl: "project/list/my"
              },
              {
                id: "155",
                pid: 122,
                title: "我的收藏",
                icon: "",
                url: "project/list",
                file_path: "project/list",
                params: ":type",
                node: "project/project/index",
                sort: 10,
                status: 1,
                create_by: 0,
                create_at: "0000-00-00 00:00:00",
                is_inner: false,
                values: "collect",
                show_slider: 1,
                statusText: "使用中",
                innerText: "导航",
                fullUrl: "project/list/collect"
              },
              {
                id: "152",
                pid: 122,
                title: "回收站",
                icon: "",
                url: "project/recycle",
                file_path: "project/recycle",
                params: "",
                node: "project/project/index",
                sort: 20,
                status: 1,
                create_by: 0,
                create_at: "0000-00-00 00:00:00",
                is_inner: false,
                values: "",
                show_slider: 1,
                statusText: "使用中",
                innerText: "导航",
                fullUrl: "project/recycle"
              },
              {
                id: "159",
                pid: 122,
                title: "已归档项目",
                icon: "",
                url: "project/archive",
                file_path: "project/archive",
                params: "",
                node: "project/project/index",
                sort: 10,
                status: 1,
                create_by: 0,
                create_at: null,
                is_inner: false,
                values: "",
                show_slider: 1,
                statusText: "使用中",
                innerText: "导航",
                fullUrl: "project/archive"
              }
            ]
          },
          {
            id: "156",
            pid: 121,
            title: "基础设置",
            icon: "experiment",
            url: "#",
            file_path: "#",
            params: "",
            node: "#",
            sort: 0,
            status: 1,
            create_by: 0,
            create_at: "0000-00-00 00:00:00",
            is_inner: false,
            values: "",
            show_slider: 1,
            statusText: "使用中",
            innerText: "导航",
            fullUrl: "#",
            children: [{
              id: "157",
              pid: 156,
              title: "项目模板",
              icon: "",
              url: "project/template",
              file_path: "project/template",
              params: "",
              node: "project/project_template/index",
              sort: 0,
              status: 1,
              create_by: 0,
              create_at: "0000-00-00 00:00:00",
              is_inner: false,
              values: "",
              show_slider: 1,
              statusText: "使用中",
              innerText: "导航",
              fullUrl: "project/template"
            }, ]
          }
        ]
      },
      {
        id: "160",
        pid: 0,
        title: "团队成员",
        icon: "team",
        url: "#",
        file_path: "#",
        params: "",
        node: "#",
        sort: 0,
        status: 1,
        create_by: 0,
        create_at: null,
        is_inner: true,
        values: "",
        show_slider: 0,
        statusText: "使用中",
        innerText: "内页",
        fullUrl: "#",
        children: [{
          id: "164",
          pid: 160,
          title: "团队成员",
          icon: "",
          url: "#",
          file_path: "#",
          params: "",
          node: "#",
          sort: 0,
          status: 1,
          create_by: 0,
          create_at: null,
          is_inner: true,
          values: "",
          show_slider: 0,
          statusText: "使用中",
          innerText: "内页",
          fullUrl: "#",
          children: [{
              id: "166",
              pid: 164,
              title: "团队成员",
              icon: "",
              url: "members",
              file_path: "members",
              params: "",
              node: "project/department/index",
              sort: 0,
              status: 1,
              create_by: 0,
              create_at: null,
              is_inner: true,
              values: "",
              show_slider: 0,
              statusText: "使用中",
              innerText: "内页",
              fullUrl: "members"
            },
            {
              id: "167",
              pid: 164,
              title: "成员信息",
              icon: "",
              url: "members/profile",
              file_path: "members/profile",
              params: ":code",
              node: "project/department/read",
              sort: 0,
              status: 1,
              create_by: 0,
              create_at: null,
              is_inner: true,
              values: "",
              show_slider: 0,
              statusText: "使用中",
              innerText: "内页",
              fullUrl: "members/profile"
            }
          ]
        }]
      },
      {
        id: "124",
        pid: 0,
        title: "个人管理",
        icon: "setting",
        url: "#",
        file_path: "#",
        params: "",
        node: "#",
        sort: 100,
        status: 1,
        create_by: 0,
        create_at: "0000-00-00 00:00:00",
        is_inner: false,
        values: "",
        show_slider: 1,
        statusText: "使用中",
        innerText: "导航",
        fullUrl: "#",
        children: [{
          id: "148",
          pid: 124,
          title: "个人管理",
          icon: "user",
          url: "#",
          file_path: "#",
          params: "",
          node: "#",
          sort: 0,
          status: 1,
          create_by: 0,
          create_at: "0000-00-00 00:00:00",
          is_inner: false,
          values: "",
          show_slider: 1,
          statusText: "使用中",
          innerText: "导航",
          fullUrl: "#",
          children: [{
            id: "149",
            pid: 148,
            title: "个人设置",
            icon: "",
            url: "account/setting/base",
            file_path: "account/setting/base",
            params: "",
            node: "project/index/editpersonal",
            sort: 0,
            status: 1,
            create_by: 0,
            create_at: "0000-00-00 00:00:00",
            is_inner: false,
            values: "",
            show_slider: 1,
            statusText: "使用中",
            innerText: "导航",
            fullUrl: "account/setting/base"
          }, ]
        }]
      }
    ],
    breadCrumbInfo: []
  },
  mutations: {
    SET_MENU(state, data) {
      state.menu = data;
    },
    setBreadCrumbInfo(state, data) {
      state.breadCrumbInfo = data;
    }
  },
  actions: {
    // GET_MENU({commit}) {
    //     getMenuForUser().then(res => {
    //         setStore('menu', res.data);
    //         commit('SET_MENU', res.data);
    //     });
    // },
    SET_MENU({
      commit
    }, data) {
      setStore('menu', data);
      commit('SET_MENU', data);
    },
    setBreadCrumbInfo({
      commit
    }, data) {
      commit('setBreadCrumbInfo', data);
    }
  }

};
export default common