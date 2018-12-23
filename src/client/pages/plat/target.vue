<template>
    <div>
        <el-row :gutter="12">
            <el-col :span="6" v-for="(item, index) in targetList" :key="index">
                <el-card shadow="hover">{{item.TargetName}}</el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
@Component()
export default class target extends Vue {
    data() {
        return { targetList: Array };
    }

    created() {
        console.log(this.project);
    }
    async asyncData({ $axios }) {
        const data = await $axios.$get('/target/all');
        console.log(data);
        return { targetList: data };
    }
}
</script>

<style scoped>
</style>