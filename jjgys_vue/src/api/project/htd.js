import request from '@/utils/request'

const api_name = '/project/info/htd'

export default {

   // 批量删除
   batchRemove(idList) {
    return request({
      url: `${api_name}/removeBatch`,
      method: `delete`,
      data: idList
    })
  },

    //分页查询
  pageList(current, limit, searchObj) {
    return request({
      url: `${api_name}/findQueryPage/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  // 添加合同段
  save(proHtd) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: proHtd
    })
  },

}