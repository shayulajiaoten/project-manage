import $http from '@/assets/js/http'

// 模板任务列表
export function list(data) {
    return $http.post('api/template/templateTaskList', data);
}
// 添加、修改模板任务
export function doData(data) {
    let url = 'api/template/addTemplateTask';
    if (data.id) {
        url = 'api/template/editTemplateTask';
    }
    return $http.post(url, data);
}
export function del(code) {
    return $http.post('api/template/delTemplateTask', {id: code});
}
