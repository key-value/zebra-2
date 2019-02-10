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
                    <el-table-column prop="planName" label="计划名称" width="180"></el-table-column>
                    <el-table-column prop="description" label="描述"></el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-dialog
            title="更新数据"
            :visible.sync="dialogFormVisible"
            :modalAppendToBody="false"
            width="45%"
        >
            <el-form :model="currentPlan">
                <el-form-item label="计划名称" :label-width="formLabelWidth">
                    <el-input v-model="currentPlan.planName" autocomplete="off" placeholder="计划代号"></el-input>
                </el-form-item>
                <el-form-item label="预期成果" :label-width="formLabelWidth">
                    <el-input v-model="currentPlan.expectations" placeholder="希望达到的成果"></el-input>
                </el-form-item>
                <el-form-item label="最低成果" :label-width="formLabelWidth">
                    <el-input v-model="currentPlan.minExpectations" placeholder="至少要做出的成果"></el-input>
                </el-form-item>
                <el-form-item label="启动时间" :label-width="formLabelWidth">
                    <div>
                        <el-date-picker
                            class="input-box"
                            v-model="currentPlan.beginTime"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions1"
                        ></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="预期结束时间" :label-width="formLabelWidth">
                    <div>
                        <el-date-picker
                            class="input-box"
                            v-model="currentPlan.endTime"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions1"
                        ></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="执行目标" :label-width="formLabelWidth">
                    <div>
                        <el-select v-model="currentPlan.targetId"
                                class="input-box" placeholder="请选择">
                            <el-option
                                v-for="item in targetList"
                                :key="item.id"
                                :label="item.targetName"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="currentPlan.description" placeholder="描述下计划"></el-input>
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
        const data = await $axios.$get('/api/plan')
        const targetData = await $axios.$get('/api/target/all')
        return {            planList: data,
            targetList: targetData        }
    }
    planList: any = new Array()
    currentPlan: PlanDto = new PlanDto()

    pickerOptions1: any = {
        disabledDate(time) {
            return time.getTime() < Date.now()
        },
        shortcuts: [{
            text: '今天',
            onClick(picker) {
                picker.$emit('pick', new Date())
            },
        }, {
            text: '明天',
            onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24)
                picker.$emit('pick', date)
            },
        }, {
            text: '下周',
            onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
            },
        }],
    }

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
            await axios.put(`/api/plan/${this.currentPlan.id}`, this.currentPlan)
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

.input-box {
    width: 100%;
}
</style>