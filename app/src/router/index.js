import Vue from 'vue'
// import store from '@/store'
import Router from 'vue-router'
import Index from '@/views/index'
import Home from './home';
// import {
//   getStore,
//   // setStore
// } from "../assets/js/storage";
import {
  createRoute,
  // isTokenExpired
} from "../assets/js/utils";
// import config from "../config/config";
// import {
//   refreshAccessToken
// } from "../api/common/common";

Vue.use(Router);
const routes = [].concat(
  Home
);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// const menu = getStore('menu', true);
const menu = [{
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
          },
        ]
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
  }
]
if (menu) {
  menu.forEach(function (v) {
    routes.push(createRoute(v));
    if (v.children) {
      v.children.forEach(function (v2) {
        routes.push(createRoute(v2));
        if (v2.children) {
          v2.children.forEach(function (v3) {
            routes.push(createRoute(v3));
          });
        }
      });
    }
  });
  console.log(routes);
}
const router = new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: Index,
      children: routes
    },
    {
      name: 'member',
      path: '/member',
      component: resolve => require(['@/components/layout/UserLayout'], resolve),
      meta: {
        model: 'Login'
      },
      children: [{
          path: 'login',
          name: 'login',
          component: () => import( /* webpackChunkName: "user" */ '@/views/member/Login'),
          meta: {
            model: 'Login'
          },
        },
        {
          path: 'register',
          name: 'register',
          component: () => import( /* webpackChunkName: "user" */ '@/views/member/Register'),
          meta: {
            model: 'Login'
          },
        },
        {
          path: 'forgot',
          name: 'forgot',
          component: () => import( /* webpackChunkName: "user" */ '@/views/member/Forgot'),
          meta: {
            model: 'Login'
          },
        },
        // {
        //     path: 'register-result',
        //     name: 'registerResult',
        //     component: () => import(/* webpackChunkName: "user" */ '@/views/member/RegisterResult')
        // }
      ]
    },
    // {
    //   name: 'install',
    //   path: '/install',
    //   component: resolve => require(['@/views/error/install'], resolve),
    //   meta: {
    //     model: 'error'
    //   },
    // },
    // {
    //   name: 'resetEmail',
    //   path: '/reset/email',
    //   component: resolve => require(['@/views/reset/email'], resolve),
    //   meta: {
    //     model: 'error'
    //   },
    // },
    // {
    //   name: '404',
    //   path: '/404',
    //   component: resolve => require(['@/views/error/404'], resolve),
    //   meta: {
    //     model: 'error'
    //   },
    // },
    // {
    //   name: '403',
    //   path: '/403',
    //   component: resolve => require(['@/views/error/403'], resolve),
    //   meta: {
    //     model: 'error'
    //   },
    // },
    // {
    //   name: '500',
    //   path: '/500',
    //   component: resolve => require(['@/views/error/500'], resolve),
    //   meta: {
    //     model: 'error'
    //   },
    // },
  ]
});

// router.beforeEach((to, from, next) => {
//   console.log(to);
//   let tokenList = getStore('tokenList', true);
//   if (tokenList) {
//     let refreshToken = tokenList.refreshToken;
//     let accessTokenExp = tokenList.accessTokenExp;
//     //判断accessToken即将到期后刷新token
//     if (accessTokenExp && isTokenExpired(accessTokenExp)) {
//       refreshAccessToken(refreshToken).then(res => {
//         tokenList.accessToken = res.data.accessToken;
//         tokenList.accessTokenExp = res.data.accessTokenExp;
//         setStore('tokenList', tokenList);
//       });
//     }
//   }
//   const HOME_PAGE = config.HOME_PAGE;
//   //页面中转
//   if (to.name === 'index' || to.path === '/index' || to.path === '/') {
//     next({
//       path: HOME_PAGE
//     });
//     return false;
//   }
//   //无效页面跳转至首页
//   if (!to.name && from.meta.model !== 'Login' && to.path !== HOME_PAGE) {
//     next({
//       path: '/404'
//     });
//     return false;
//   }
//   if (to.meta.model === 'Login' && store.state.logged) {
//     next({
//       path: HOME_PAGE
//     });
//     return false;
//   }
//   if (!store.state.logged && to.meta.model !== 'Login' && to.meta.model !== 'error') {
//     next({
//       name: 'login',
//       query: {
//         redirect: to.fullPath
//       }
//     });
//     return false;
//   }
//   next();
// });
// router.afterEach(route => {
//   //预留
//   // window.scrollTo(0,0)
// });

export default router