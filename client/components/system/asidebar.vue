<template  >
    <el-menu :default-active=defaultActive >
        <el-menu v-for="navbody in navList" :key="navbody.index">
            <el-menu-item :index="navbody.index" >
                <i :class="navbody.icon"></i>
                <span slot="title">{{navbody.title}}  </span>
            </el-menu-item>
        </el-menu>
    </el-menu>
</template>

<script lang="ts">
import Component, { Getter } from 'nuxt-class-component';
import Vue from 'vue';
// import { NavBody } from '../../store';
const asidebarDataName = require('static/systemData.json');
@Component({})
export default class Asidebar extends Vue {
    navList: any[] = asidebarDataName.asidebar;
    defaultActive: String = '1';
}

// export default Vue.extend({
//     data : function () {
//         navList: Array;
//     }
// })


</script>
