// 全部导入
import http from '../utils/http'
/**
 * @parms request 请求地址
 * @parms '/testIp'代表vue-cil中config，index.js中配置的代理  */
 let request = "http://amdeus.top:3000"

//  导出请求方法
export default {
    getListAPI(path,params){
        return http.get(`${request + path}`,params)
    },
    postAPI(path,params){
        return http.post(`${request + path}`,params)
    }
}