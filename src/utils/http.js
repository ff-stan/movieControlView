// 导入封装好的axios实例
import request from './request'

const http = {
    /**
     * method: 请求
     * @param url 请求地址
     * @param params 请求参数
     */
    get(url,params){
        const config = {
            method: 'get',
            url:url
        }
        if(params) config.params = params
        return request(config)
    },
    post(url,data){
        const config = {
            method: 'post',
            url:url,
            headers:{
                'token':`${localStorage.getItem('token')}`
            }
        }
        if(data) config.data = data
        return request(config)
    },
    put(url,params){
        const config = {
            method: 'put',
            url:url
        }
        if(params) config.params = params
        return request(config)
    },
    delete(url,params){
        const config = {
            method: 'delete',
            url:url
        }
        if(params) config.params = params
        return request(config)
    }
}
// 导出
export default http