import $http from '@/assets/js/http'

export function list(data) {
    return $http.get('api/members/teamList', data);
}


export function doData(data) {
    let url = 'api/members/createTeam';
    if (data.departmentCode) {
        url = 'api/members/editTeam';
    }
    return $http.post(url, data);
}



export function del(teamName) {
    return $http.post('api/members/deleteTeam', {teamName});
}
