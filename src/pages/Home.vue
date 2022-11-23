<template>
    <TopNavigation activeIndex="/home"></TopNavigation>
    <!-- 轮播图 -->
    <div class="common-layout">
        <el-container>
            <el-main style="pdding:none;">
                <el-carousel style="width:100%;">
                    <el-carousel-item v-for="item in carouselImgs" :key="item">
                        <img :src="getImg(item.advImg)" class="carousel">
                    </el-carousel-item>
                </el-carousel>
            </el-main>
        </el-container>
        <el-container>
            <!-- 简单的新闻列表 -->
            <el-main class="content">
                <!-- 新闻列表 -->
                <ArticleList :articleList="newsList">
                    <template #articleData="data">
                        <span class="just-center">
                            <el-icon>
                                <View />
                            </el-icon>{{ data.data.readNum }}
                        </span>
                        <span class="just-center">
                            <el-icon>
                                <ChatDotSquare />
                            </el-icon>{{ data.data.commentNum }}
                        </span>
                        <span class="just-center">
                            <el-icon>
                                <Star />
                            </el-icon>{{ data.data.likeNum }}
                        </span>
                    </template>
                </ArticleList>
            </el-main>
            <!-- 服务模块 -->
            <el-asied>
                <el-menu class="el-menu-vertical-demo" :collapse="true" router="true">
                    <el-menu-item :index="'/' + item.link" v-for="item in allService">
                        <div class="service_img">
                            <el-image :src="getImg(item.imgUrl)" fil="fill"></el-image>
                        </div>
                        <template #title>{{ item.serviceName }}</template>
                    </el-menu-item>
                </el-menu>
            </el-asied>
        </el-container>
    </div>


</template>

<script setup>// @ts-nocheck

import { ref } from "vue"
import api from "../api/api"
import TopNavigation from "../components/TopNavigation.vue"
import ArticleList from "../components/ArticleList.vue";
const activeIndex = ref("/home");
// 轮播图图片数组
const carouselImgs = ref([])
// 新闻列表数组
const newsList = ref([])
// 新闻列表数组
const activityList = ref([])
// 全部服务列表数组
const allService = ref([])

// 获取轮播图图片
api.getListAPI("/prod-api/api/rotation/list", {
    type: 2
}).then((res) => {
    carouselImgs.value = res.data.rows
})
// 获取新闻列表 只要6个
api.getListAPI("/prod-api/press/press/list", {
    pageNum: 1,
    pageSize: 6
}).then((res) => {
    newsList.value = res.data.rows
})
// 获取活动列表 只要6个
api.getListAPI("/prod-api/api/activity/activity/list", {
    pageNum: 1,
    pageSize: 6
}).then((res) => {
    activityList.value = res.data.rows
})
// 获取全部服务资源
api.getListAPI("/prod-api/api/service/list").then((res) => {
    allService.value = res.data.rows
})

function getImg(imgUrl) { return "http://124.93.196.45:10001" + imgUrl }
</script>

<style lang="scss" scoped>
.common-layout {
    &>*+* {
        margin-top: .5em;
    }

    .el-main {
        padding: 0;
    }

    .carousel {
        width: 100%;
        height: 100%;
    }

    .just-center {
        display: flex;
        justify-content: center;
        align-items: center;

        &>*+* {
            margin-left: .5em;
        }
    }

    .el-menu {
        &>*+* {
            margin-top: .5em;
        }

        .el-menu-item {
            padding: 0;
        }

        .service_img {
            padding: 5px;
        }
    }
}
</style>
<style>
.el-menu-item .el-menu-tooltip__trigger {
    padding: 0;
}
</style>
