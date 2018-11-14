<template  >
    <el-menu default-active="2"
             @open="handleOpen"
             @close="handleClose">
        <el-menu-item index="1">
            <i class="el-icon-tickets"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
            <i class="el-icon-location"></i>
            <span slot="title">目标</span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">计划</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-document"></i>
            <span slot="title">任务</span>
        </el-menu-item>
        <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">日程</span>
        </el-menu-item>
        <el-menu v-for="(navbody, i) in navList"
                 :key="navbody.index">
            <el-menu-item>
                <i class="el-icon-setting">{{i}}</i>
                <span slot="title">日程</span>
            </el-menu-item>
        </el-menu>
    </el-menu>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data : function () {
        navList: Array;
    }
})


</script>
