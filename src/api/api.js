// 全部导出
import http from '../utils/http'
/**
 * @parms request 请求地址
 * @parms '/testIp'代表vue-cil中config，index.js中配置的代理  */
 let request = "http://localhost:3000"

//  导出请求方法
export default {
    getListAPI(path){
        return http.get(`${request + path}`)
    },
    postFormAPI(path,data){
        return http.post(`${request + path}`,data)
    }
}