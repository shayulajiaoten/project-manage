import $http from '@/assets/js/http'
import {
    getApiUrl
} from "../assets/js/utils";

/* 查找用户 */

// 根据邮箱查找没有加入团队的用户
export function noTeamMembers(keyword) {
    return $http.post('api/members/noTeam', {
        email: keyword
    });
}

// 根据用户id和团队name邀请用户·
export function inviteMember(id, teamName) {
    return $http.post('api/members/inviteMember', {
        memberId: id,
        teamName
    });
}

// 移除团队成员
export function removeMember(accountCode, teamName) {
    return $http.post('api/members/deleteMember', {
        memberId: accountCode,
        teamName
    });
}
export function list(data) {
    return $http.post('project/department_member/index', data);
}
export function _downloadTemplate() {
    return getApiUrl('project/department_member/_downloadTemplate');
}
export function detail(data) {
    return $http.post('project/department_member/detail', data);
}