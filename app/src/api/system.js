import $http from '@/assets/js/http'

export function info() {
    return $http.post('project/index/systemConfig');
}

// 申请列表
export function resolveList() {
    return $http.get('api/resolve/list');
}

// 团队申请处理
export function editTeamStatus(data) {
    return $http.post('api/resolve/editTeamStatus', data);
}
// 项目申请处理
export function editProjectStatus(data) {
    return $http.post('api/resolve/editProjectStatus', data);
}