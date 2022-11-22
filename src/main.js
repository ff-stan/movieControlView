import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
// 导入vuex
import store from '../src/store/index.js'
// 导入vue-route
import { router } from './route'

const app = createApp(App)
// 在全局中使用vuex
app.use(store)
// 在全局中使用vue-route
app.use(router)
// 在全局中使用element-ui
app.use(ElementPlus)
// 在全局中注册icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
