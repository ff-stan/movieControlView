import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    { path: "/", redirect: "/home" },
    {
        path: "/home",
        name: "home",
        component: () => import("../pages/Home.vue")
    },
    {
        path: "/login",
        name: "login",
        // 单独的路由守卫 如果已登录则直接跳转到详情页
        beforeEnter: (to, from) => {
            if (sessionStorage.getItem("token") || localStorage.getItem("token")) {
                return router.push("/userInfo")
            }
            return true
        },
        component: () => import("../pages/Login.vue")
    },
    {
        path: "/newList",
        name: "newList",
        meta: { permission: true },
        component: () => import("../pages/news/newList.vue")
    },
    {
        path: "/userInfo",
        name: "userInfo",
        meta: { permission: true },
        component: () => import("../pages/user/userInfo.vue")
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
            alert("请先登录")
            next("/login")
        }
    } else {
        next()
    }
})
export default router