import $http from '@/assets/js/http'


// 添加子任务
export function save(data) {
    return $http.post('api/task/createSubtask', data);
}

// 设置任务对应执行者
export function assignTask(data) {
    return $http.post('api/task/assignTask', data);
}
// 修改子任务状态
export function taskDone(code, done) {
    return $http.post('api/task/changeStatus', {
        subtaskId: code,
        status: done
    });
}

// 删除子任务状态
export function del(code) {
    return $http.post('api/task/deleteSubtask', {
        subtaskId: code
    });
}
// 当前用户任务列表
export function selfList(data) {
    return $http.post('api/task/myTaskList', data);
}
export function list(data) {
    return $http.post('project/task', data);
}
export function getListByTaskTag(data) {
    return $http.post('project/task/getListByTaskTag', data);
}



export function taskSources(data) {
    return $http.post('project/task/taskSources', data);
}

export function sort(data) {
    return $http.post('project/task/sort', data);
}

export function edit(data) {
    return $http.post('project/task/edit', data);
}

export function taskToTags(data) {
    return $http.post('project/task/taskToTags', data);
}
export function setTag(data) {
    return $http.post('project/task/setTag', data);
}

export function like(code, like) {
    return $http.post('project/task/like', {
        like: like,
        taskCode: code
    });
}

export function star(code, star) {
    return $http.post('project/task/star', {
        star: star,
        taskCode: code
    });
}

export function createComment(code, comment, mentions) {
    return $http.post('project/task/createComment', {
        taskCode: code,
        comment: comment,
        mentions: mentions
    });
}



export function batchAssignTask(data) {
    return $http.post('project/task/batchAssignTask', data);
}

export function read(code) {
    return $http.post('project/task/read', {
        taskCode: code
    });
}


export function setPrivate(code, isPrivate) {
    return $http.post('project/task/setPrivate', {
        taskCode: code,
        private: isPrivate
    });
}

export function recycle(code) {
    return $http.post('project/task/recycle', {
        taskCode: code
    });
}

export function recycleBatch(data) {
    return $http.post('project/task/recycleBatch', data);
}

export function recovery(code) {
    return $http.post('project/task/recovery', {
        taskCode: code
    });
}


export function dateTotalForProject(data) {
    return $http.post('project/task/dateTotalForProject', data);
}

export function logs(data) {
    return $http.post('project/task/taskLog', data);
}

export function getLogBySelfProject(data) {
    return $http.post('project/project/getLogBySelfProject', data);
}
export function _taskWorkTimeList(data) {
    return $http.post('project/task/_taskWorkTimeList', data);
}
export function saveTaskWorkTime(data) {
    return $http.post('project/task/saveTaskWorkTime', data);
}
export function editTaskWorkTime(data) {
    return $http.post('project/task/editTaskWorkTime', data);
}
export function delTaskWorkTime(data) {
    return $http.post('project/task/delTaskWorkTime', data);
}