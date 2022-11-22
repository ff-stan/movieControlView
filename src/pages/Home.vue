<template>
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
                <el-card :body-style="{ padding: '0px', height: '250px' }" shadow="hover" v-for="item in newList"
                    :key="item">
                    <el-row>
                        <el-col :span="8">
                            <el-image :src="getImg(item.cover)" fil="fill"></el-image>
                        </el-col>
                        <el-col :span="16">
                            <h3>{{ item.title }}</h3>
                            <div class="news-item" v-html="item.content">

                            </div>
                            <el-row justify="space-between" style="margin:1em;font-size: .8em;">
                                <el-col :span="8">
                                    <span>发布于{{ item.publishDate }}</span>
                                </el-col>
                                <el-col :span="8" class="just-center">
                                    <span class="just-center">
                                        <el-icon>
                                            <View />
                                        </el-icon>{{ item.readNum }}
                                    </span>
                                    <span class="just-center">
                                        <el-icon>
                                            <ChatDotSquare />
                                        </el-icon>{{ item.commentNum }}
                                    </span>
                                    <span class="just-center">
                                        <el-icon>
                                            <Star />
                                        </el-icon>{{ item.likeNum }}
                                    </span>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>
            </el-main>
            <!-- 服务模块 -->
            <el-asied>

            </el-asied>
        </el-container>
    </div>


</template>

<script setup>// @ts-nocheck

import { ref } from "vue"
import api from "../api/api"
// 轮播图图片数组
const carouselImgs = ref([])
// 新闻列表数组
const newList = ref([])

// 获取轮播图图片
api.getListAPI("/prod-api/api/rotation/list", {
    type: 2
}).then((res) => {
    carouselImgs.value = res.data.rows
})
// 获取新闻列表 只要时间靠前的6个
api.getListAPI("/prod-api/press/press/list", {
    pageNum: 1,
    pageSize: 6
}).then((res) => {
    newList.value = res.data.rows
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

    .news-item {
        padding: .5em;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }

    .just-center {
        display: flex;
        justify-content: center;
        align-items: center;

        &>*+* {
            margin-left: .5em;
        }
    }
}
</style>
