<template>
    <el-card :body-style="{ padding: '0px', height: '250px' }" shadow="hover" v-for="item in articleList" :key="item">
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
                        <slot name="articleData" :data="item"></slot>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
import { toRef } from 'vue'
const props = defineProps(["articleList"])
const articleList = toRef(props, "articleList")
function getImg(imgUrl) { return "http://124.93.196.45:10001" + imgUrl }
</script>

<style lang="scss" scoped>
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
</style>