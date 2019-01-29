<template>
    <div>
        <el-row>
          <el-col :span="4">
            <el-button @click.native="showPlan(null)" shadow="hover">新增</el-button>
            </el-col>


        </el-row>
        <el-row>
        <el-col>
            <el-table :data="planList" stripe style="width: 100%">
                <el-table-column prop="beginTime" label="日期" width="180"></el-table-column>
                <el-table-column prop="planName" label="姓名" width="180"></el-table-column>
                <el-table-column prop="description" label="地址"></el-table-column>
            </el-table>
        </el-col></el-row>
        
        <el-dialog
            title="更新数据"
            :visible.sync="dialogFormVisible"
            :modalAppendToBody="false"
            width="45%"
        >
            <el-form :model="currentPlan">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input
                        v-model="currentPlan.planName"
                        autocomplete="off"
                        placeholder="目标"
                    ></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-input
                        :rows="3"
                        type="textarea"
                        v-model="currentPlan.description"
                        placeholder="描述下目标"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="savePlan">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Inject, Model, Prop, Vue, Watch } from 'nuxt-property-decorator'
import axios from 'axios'

@Component({})
export default class Plan extends Vue {
    async asyncData({ $axios }) {
        // console.log(this.targetList);
        const data = await $axios.$get('/api/plan/all')
        return { planList: data }
    }
    planList: any = new Array()
    currentPlan: PlanDto = new PlanDto()

    dialogFormVisible: boolean = false
    formLabelWidth = '120px'

    showPlan(plan: PlanDto) {
        if (plan == null) {
            this.currentPlan.planName = ''
            this.currentPlan.description = ''
            this.currentPlan.id = 0
        } else {
            this.currentPlan.planName = plan.planName
            this.currentPlan.description = plan.description
            this.currentPlan.id = plan.id
        }
        this.dialogFormVisible = true
    }

    async savePlan() {
        if (this.currentPlan.id === 0) {
           await axios.post('/api/plan', this.currentPlan)
        } else {
            await axios.put('/api/plan', this.currentPlan)
        }
        this.dialogFormVisible = false
    }

}

export class PlanDto {
    id: number = 0
    beginTime: Date = new Date()
    planName: string = ''
    description: string = ''
}
</script>

<style scoped>
 .el-row {
    margin-bottom: 20px;
  }

.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    width: 480px;
}
</style>