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
        component: () => import("../pages/Login.vue")
    },
    {
        path: "/newList",
        name: "newList",
        component: () => import("../pages/news/newList.vue")
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})