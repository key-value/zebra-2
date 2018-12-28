<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="6" v-for="(item, index) in targetList" :key="index">
                <el-card shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>{{item.targetName}}</span>
                        <div style="float: right; padding: 0">
                            <el-dropdown  >
                                <span class="el-dropdown-link">
                                    操作
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="showTarget(item)" >
                                        编辑
                                    </el-dropdown-item>
                                    <el-dropdown-item  @click.native="deleteTarget(item.id)"> 删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                    <div>{{item.description}}</div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card @click.native="showTarget(null)" shadow="hover">
                    新增
                </el-card>
            </el-col>
        </el-row>

        <el-dialog
            title="更新数据"
            :visible.sync="dialogFormVisible"
            :modalAppendToBody="false"
            width="45%"
        >
            <el-form :model="currentTarget">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input
                        v-model="currentTarget.targetName"
                        autocomplete="off"
                        placeholder="目标"
                    ></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-input
                        :rows="3"
                        type="textarea"
                        v-model="currentTarget.description"
                        placeholder="描述下目标"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveTarget">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script  lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
@Component({
    // tslint:disable-next-line:trailing-comma
    components: {},
})
export default class Target extends Vue {
    data() {
        return {
            targetList: Array,
        }
    }
    currentTarget = new TargetDto()
    // id = 0;
    // targetName = '';
    // description = '';
    dialogFormVisible: boolean = false
    formLabelWidth = '120px'
    created() { }
    async asyncData({ $axios }) {
        // console.log(this.targetList);
        const data = await $axios.$get('/api/target/all')
        return { targetList: data }
    }
    handleCommand(target: TargetDto) {
       this.showTarget(target)
    }

    showTarget(target) {
        if (target == null) {
            this.currentTarget.targetName = ''
            this.currentTarget.description = ''
            this.currentTarget.id = 0
        } else {
            this.currentTarget.targetName = target.targetName
            this.currentTarget.description = target.description
            this.currentTarget.id = target.id
        }
        this.dialogFormVisible = true
    }

    saveTarget() {
        console.log(this.data)
        if (this.currentTarget.id === 0) {
           const putResult = axios.post('/api/target', this.currentTarget)
           console.log(putResult)
        } else {
           const postResult = axios.put('/api/target', this.currentTarget)
           console.log(postResult)
        }
        this.dialogFormVisible = false
    }

    deleteTarget(id: number){
        const deleteResult = axios.delete(`/api/target/${id}`)
        console.log(deleteResult)
    }
}
export class TargetDto {
    id: number = 0
    targetName: string = ''
    description: string = ''
}
</script>

<style scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: '';
}
.clearfix:after {
    clear: both;
}

.el-card {
    min-height: 220px;
}
</style>