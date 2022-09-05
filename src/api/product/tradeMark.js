import request from '@/utils/request'
// 获取品牌管理数据模块
export const reqTradeMarkList = (page,limit)=>request({url: `/admin/product/baseTrademark/${page}/${limit}`,method:'get'});