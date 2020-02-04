import $http from '@/assets/js/http'

/*收藏项目*/
export function collect(id,type = 'collect') {
  if (type === "cancel") {
    return $http.post('api/project/unCollect', {
      projectId: id,
    });
  }
  return $http.post('api/project/collect', {
    projectId: id,
  });
}