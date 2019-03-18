<template>
    <div>
        <el-row>
            <el-col :span="4">
                <el-button @click.native="showPlan(-1 , null)" shadow="hover">新增</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="planList" stripe style="width: 100%">
                    <el-table-column
                        :formatter="formatDate"
                        prop="beginTime"
                        label="启动日期"
                        width="180"
                    ></el-table-column>
                    <el-table-column prop="planName" label="名称" width="120"></el-table-column>
                    <el-table-column prop="expectations" label="成果"></el-table-column>
                    <el-table-column prop="targetName" label="执行目标"></el-table-column>
                    <el-table-column align="right" width="160">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="showPlan(scope.$index,scope.row)">Edit</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                            >Delete</el-button>
                        </template>
                    </el-table-column>
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
                        <el-select
                            v-model="currentPlan.targetId"
                            class="input-box"
                            placeholder="请选择"
                        >
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
import { formatDate } from '../../../Common/dateUtility'
import { ModelUtility } from '../../../Common/model.utility'
import { Message } from 'element-ui'

@Component({
})
export default class Plan extends Vue {
    async asyncData({ $axios }) {
        // console.log(this.targetList);
        const data = await $axios.$get('/api/plan')
        const targetData = await $axios.$get('/api/target/all')
        data.forEach(element => {
            const target = targetData.find(x => x.id === element.targetId)
            if (target) {
                element.targetName = target.targetName
            }
        })
        return {            planList: data,
            targetList: targetData,
                }
    }
    targetList: any = new Array()
    planList: any = new Array()
    currentPlan: PlanDto = new PlanDto()

    pickerOptions1: any = {
        disabledDate(time) {
            return time.getTime() <= Date.now()
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

    formatDate(row, column, cellValue, index) {
        const daterc = row[column.property]
        if (daterc != null) {
            const dateMat = new Date(daterc)

            return formatDate(dateMat, 'yyyy-MM-dd')
        }

    }
    handleEdit(index, row) {
        console.log(index, row)
    }
    async handleDelete(index, row) {
        await axios.delete(`/api/plan/${row.id}`)
    }
    showPlan(index, item: PlanDto) {
        let plan: any
        if (index < 0) {
            this.currentPlan = new PlanDto()
        } else {
            plan = this.planList[index]
            ModelUtility.merge(this.currentPlan, plan)
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
        Message('处理成功')
        this.refreshPlanList()
    }

    async refreshPlanList() {
        await axios.get('/api/plan').then(v => {
            console.log(v.data)
            this.planList = [...v.data]
            this.planList.forEach(element => {
                const target = this.targetList.find(x => x.id === element.targetId)
                if (target) {
                    element.targetName = target.targetName
                }
            })
        })
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