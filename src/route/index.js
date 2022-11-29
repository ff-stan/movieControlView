import { createRouter, createWebHashHistory } from "vue-router"
import { ElMessage } from 'element-plus'
const routes = [
    { path: "/", redirect: "/home" },
    {
        path: "/home",
        name: "home",
        // 设置鉴权
        meta: { permission: true },
        component: () => import("../pages/Home.vue")
    },
    {
        path: "/login",
        name: "login",
        // 单独的路由守卫
        beforeEnter: (to, from) => {
            if (sessionStorage.getItem("token") || localStorage.getItem("token")) {
                ElMessage.success("已登录~~~")
                return router.push("/")
            }
            return true
        },
        component: () => import("../pages/Login.vue")
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,

})
// 路由守卫 判断是否登录
router.beforeEach((to, from, next) => {
    if (to.meta.permission) {
        if (sessionStorage.getItem("token") || localStorage.getItem("token")) {
            next()
        } else {
            ElMessage.error('请先登录!!!')
            next("/login")
        }
    } else {
        next()
    }
})
export default router