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

export function changePassword(data) {
    return $http.post('api/user/changePassword', data);
}


export function getMembers(data) {
    return $http.post('api/members/teamMembersList', data);
}


export function getCurrentTeam() {
    return $http.get('api/members/getCurrentTeam');
}

