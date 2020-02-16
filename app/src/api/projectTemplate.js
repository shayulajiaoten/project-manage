import $http from '@/assets/js/http'

// 模板列表
export function list(data) {
    return $http.post('api/template/tempalteList', data);
}

export function doData(data) {
    // console.log(data);
    
    let url = 'api/template/createTemplate';
    if (data.id) {
        url = 'api/template/changeTemplate';
    }
    return $http.post(url, data);
}
// 删除模板
export function del(code) {
    return $http.post('project/project_template/delete', {code: code});
}
