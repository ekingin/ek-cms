import ekRequest from '../../index'

import type { IDataType } from '../../types'

// 获取页面列表数据
export function getPageList(url: string, queryInfo: any) {
  return ekRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

// 删除页面列表数据
export function deletePageData(url: string) {
  return ekRequest.delete<IDataType>({
    url
  })
}

// 新建页面列表数据
export function createPageData(url: string, newData: any) {
  return ekRequest.post<IDataType>({
    url,
    data: newData
  })
}

// 编辑页面列表数据
export function editPageData(url: string, editData: any) {
  return ekRequest.patch<IDataType>({
    url,
    data: editData
  })
}
