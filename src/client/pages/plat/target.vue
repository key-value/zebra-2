<template>
    <div>
        <el-row :gutter="12">
            <el-col :span="6" v-for="(item, index) in targetList" :key="index">
                <el-card shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>{{item.targetName}}</span>
                    </div>
                    <div>{{item.description}}</div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>添加目标</span>
                        <el-button
                            v-on:click="saveTarget"
                            style="float: right; padding: 3px 0"
                            type="text"
                        >保存</el-button>
                    </div>
                    <div>
                        <el-input v-bind:text="currentTarget.targetName" placeholder="目标"></el-input>
                        <div style="margin: 20px 0;"></div>
                        <el-input
                            type="textarea"
                            v-bind:text="currentTarget.description"
                            placeholder="描述下目标"
                        ></el-input>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
@Component()
export default class target extends Vue {
    data() {
        return {
            targetList: Array,
            currentTarget: {
                id: Number,
                targetName: String,
                description: String,
            },
        };
    }

    created() {
    }
    async asyncData({ $axios }) {
        //console.log(this.targetList);
        const data = await $axios.$get('/target/all');
        console.log(data);
        return { targetList: data };
    }

    saveTarget() {
        console.log(this.data)
       this.$axios.$post('/target', {targetName:this.currentTarget.targetName,description: this.currentTarget.description});
    }
}
</script>

<style scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.el-card {
    min-height: 220px;
}
</style>