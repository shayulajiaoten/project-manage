import {getStore} from "../assets/js/storage";

const theme = getStore('theme');
export default {
    theme: theme ? theme : 'dark',
    organizationList: getStore('organizationList', true),//能查看的组织列表
    currentOrganization: getStore('currentOrganization', true),//当前组织
    system: getStore('system', true),//系统配置
    windowLoading: false, // 窗口loading
    pageLoading: false, // 页面加载loading
    socketAction: '',
    boundClient: false,//是否绑定client
}
