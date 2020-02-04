import $http from '@/assets/js/http'

//  当前用户有关的项目
export function selfList(type) {
    switch (type) {
        case 'collect':
            return $http.get('api/project/collectList');
        case 'my':
            return $http.get('api/project/projectList');
        case 'recycle':
            return $http.get('api/project/recycleList');
        case 'archive':
            return $http.get('api/project/pigeonholeList');
    }
}

// 当前用户收藏列表
export function collectList(data) {
    return $http.get('api/project/collectList', data);
}
// 创建或申请项目
export function doData(data) {
    let url = 'project/project/save';
    if (data.projectCode) {
        url = 'project/project/edit';
    }
    return $http.post(url, data);
}
// 将项目放入回收站
export function recycle(code) {
    return $http.post('api/project/recycle', {
        projectId: code
    });
}
export function quit(code) {
    return $http.post('project/project/quit', {
        projectCode: code
    });
}
// 取消回收项目
export function recovery(id) {
    return $http.post('api/project/recovery', {
        projectId: id
    });
}

export function archive(code) {
    return $http.post('project/project/archive', {
        projectCode: code
    });
}
export function recoveryArchive(code) {
    return $http.post('project/project/recoveryArchive', {
        projectCode: code
    });
}
export function del(code) {
    return $http.post('project/project/delete', {
        projectCode: code
    });
}
export function read(code) {
    return $http.post('project/project/read', {
        projectCode: code
    });
}
export function _projectStats(data) {
    return $http.post('project/project/_projectStats', data);
}