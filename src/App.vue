<template>
  <el-header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router="true"
      @select="handleSelect"
    >
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/login">登录页</el-menu-item>
      <el-menu-item index="/newList">新闻</el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item>
    </el-menu>
  </el-header>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeIndex = ref("/home");

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.container {
  width: 1280px;
  min-width: 1280px;
  margin: 0 auto;
  background-color: #ecf0f1;
}
</style>
