import $http from '@/assets/js/http'

export async function Login(data) {
    return $http.post('api/user/login', data);
}

export function register(data) {
    return $http.post('api/user/register', data);
}

export function getQuestion(data) {
    return $http.post('api/user/getQuestion', data);
}
// 密码修改（未登录）
export function changePassword(data) {
    return $http.post('api/user/changePassword', data);
}
// 密码修改（已登录）
export function editPassword(data) {
    return $http.post('api/user/editPassword', data);
}
// 修改邮箱
export function editEmail(data) {
    return $http.post('api/user/editEmail', data);
}


export function getMembers(data) {
    return $http.post('api/members/teamMembersList', data);
}


export function getCurrentTeam() {
    return $http.get('api/members/getCurrentTeam');
}

export function getMessage() {
    return $http.get('api/user/message');
}

export function editPersonal(data) {
    return $http.post('api/user/editPersonal', data);
}