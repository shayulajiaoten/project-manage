import $http from '@/assets/js/http'


// 获得任务列表
export function list(data) {
    return $http.post('api/task/taskList', data);
}

// 获得子任务列表
export function tasks(data) {
    return $http.post('api/task/subTaskList', data);
}
// 添加项目列表
export function save(data) {
    return $http.post('api/task/createTask', data);
}

//删除项目任务列表
export function del(code) {
    return $http.post('api/task/deleteTask', {
        taskId: code
    });
}

// 更改项目对应任务列表名
export function edit(data) {
    return $http.post('api/task/editTask', data);
}
// 任务列表id交换
export function sort(preCode, nextCode, projectCode) {
    return $http.post('api/task/sortTaskList', {
        preId: preCode,
        nextId: nextCode,
        projectId: projectCode
    });
}