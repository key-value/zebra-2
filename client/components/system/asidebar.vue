<template  >
    <el-menu default-active="1">
        <el-menu-item index="6">
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
        <el-menu v-for="navbody in navList" :key="navbody.index">
            <el-menu-item index="navbody.index" >
                <i class="el-icon-setting"></i>
                <span slot="title">{{navbody.title}}  </span>
            </el-menu-item>
        </el-menu>
    </el-menu>
</template>

<script lang="ts">
import Component, { Getter } from 'nuxt-class-component';
import Vue from 'vue';
import { NavBody } from '../../store';

@Component({})
export default class Asidebar extends Vue {
    @Getter navList: NavBody[] = new Array<NavBody>();

    created() {
        const a = new NavBody(1, '日程', '1', '1');
        this.navList.push(a);
    }
}

// export default Vue.extend({
//     data : function () {
//         navList: Array;
//     }
// })


</script>
