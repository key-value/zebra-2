<template>
    <div>
        <el-row>
            <el-col :span="4">
                <el-button @click.native="showTask(-1 , null)" shadow="hover">新增</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="taskList" stripe style="width: 100%">
                    <el-table-column
                        :formatter="formatDate"
                        prop="beginTime"
                        label="启动日期"
                        width="180"
                    ></el-table-column>
                    <el-table-column prop="taskTitle" label="名称" width="120"></el-table-column>
                    <el-table-column align="right" width="160">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="showTask(scope.$index,scope.row)">Edit</el-button>
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
            <el-form :model="currentTask">
                <el-form-item label="计划名称" :label-width="formLabelWidth">
                    <el-input v-model="currentTask.taskTitle" autocomplete="off" placeholder="计划代号"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="currentTask.description" placeholder="描述下计划"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveTask">确 定</el-button>
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

export default class Task extends Vue {
    async asyncData({ $axios }) {
        // console.log(this.targetList);
        const data = await $axios.$get('/api/task')
        const planData = await $axios.$get('/api/plan')
        data.forEach(element => {
            const plan = planData.find(x => x.id === element.targetId)
            if (plan) {
                element.planName = plan.planName
            }
        })
        return {
            taskList: data,
            planList: planData,
        }
    }
    taskList: any = new Array()
    planList: any = new Array()
    currentTask: TaskDto = new TaskDto()

    dialogFormVisible: boolean = false
    formLabelWidth = '120px'

    formatDate(row, column, cellValue, index) {
        const daterc = row[column.property]
        if (daterc != null) {
            const dateMat = new Date(daterc)

            return formatDate(dateMat, 'yyyy-MM-dd')
        }

    }
    async handleDelete(index, row) {
        await axios.delete(`/api/task/${row.id}`)
    }
    showTask(index, item: any) {
        let task: any
        if (index < 0) {
            this.currentTask = new TaskDto()
        } else {
            task = this.taskList[index]
            ModelUtility.merge(this.currentTask, task)
        }

        this.dialogFormVisible = true
    }

    async saveTask() {
        if (this.currentTask.id === 0) {
            await axios.post('/api/task', this.currentTask)
        } else {
            await axios.put(`/api/task/${this.currentTask.id}`, this.currentTask)
        }
        this.dialogFormVisible = false
        Message('处理成功')
        this.refreshTaskList()
    }

    async refreshTaskList() {
        const result = await axios.get('/api/task')
        console.log(result.data)
        this.taskList = [...result.data]
        this.planList.forEach(element => {
            const plan = this.planList.find(x => x.id === element.targetId)
            if (plan) {
                element.targetName = plan.targetName
            }
        })

    }
}
export class TaskDto {
    id: number = 0
    taskTitle: string = ''
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