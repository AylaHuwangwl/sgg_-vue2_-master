import request from '@/utils/request'
// 获取品牌管理数据模块
export const reqTradeMarkList = (page,limit)=>request({url: `/admin/product/baseTrademark/${page}/${limit}`,method:'get'});
export const reqAddTradeMark = (data)=>request({url: `/admin/product/baseTrademark/save`,method:'post',data});
export const reqUpdateTradeMark = (data)=>request({url: `/admin/product/baseTrademark/update`,method:'put',data});
export const reqDeleteTradeMark = (id)=>request({url: `/admin/product/baseTrademark/remove/${id}`,method:'delete'});