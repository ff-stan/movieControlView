<template>
    <el-header style="padding:0;">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router="true"  :ellipsis="false">
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/newList">新闻</el-menu-item>
            <el-menu-item index="4">Orders</el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="/login" style="height:auto;">
                <el-avatar  :src="circleUrl" />
            </el-menu-item>
        </el-menu>
    </el-header>
</template>

<script setup>
import { toRef,ref } from 'vue'
const circleUrl = ref("https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png")
const props = defineProps(["activeIndex"])
const activeIndex = toRef(props, "activeIndex")
</script>

<style lang="scss" scoped>
.flex-grow {
    flex-grow: 1;
}
</style>