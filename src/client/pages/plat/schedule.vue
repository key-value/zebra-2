<template>
    <div class="nav_main">
        <ul class="nav_mine">
            <li class="nav_item" v-for="(item, index) in targetList" :key="index">
                <div class="card_header">
                    <div>{{item.targetName}}</div>
                </div>
                <draggable class="list-group" :list="targetList" group="people">
                    <ul class="card_body">
                        <li
                            class="list_card_details"
                            draggable="true"
                            @dragstart="handleDragStart($event)"
                            @dragover="allowDrop($event)"
                            @drop="drop($event)"
                            v-for="(plan, sindex) in item.planList"
                            :key="sindex"
                        >
                            <div class="list_card_title">{{plan.planName}}</div>
                        </li>
                    </ul>
                </draggable>
                <div class="card_floor">1111</div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Inject, Model, Prop, Vue, Watch } from 'nuxt-property-decorator'
import axios from 'axios'
import { formatDate } from '../../../Common/dateUtility'
import { ModelUtility } from '../../../Common/model.utility'
import { Message } from 'element-ui'
import draggable from 'vuedraggable'

@Component({
})
export default class Schedule extends Vue {
    async asyncData({ $axios }) {
        // console.log(this.targetList);
        const data = await $axios.$get('/api/plan')
        const targetData = await $axios.$get('/api/target/allLeaf')
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
    // 完成拖动
    drop($event) {
        console.log('drop' + event)
    }
    // 开始拖动
    handleDragStart(event) {
        console.log('handleDragStart' + event)
    }
    // 拖动中
    allowDrop() {
        console.log(event)
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
.nav_mine {
    padding: 15px 20px;
    height: auto;
    display: inline-flex;
    flex-wrap: nowrap;
    overflow-x: auto;
}

.nav_mine .nav_item {
    border: #aca9a7;
    border-radius: 4px;
    margin-right: 22px;
    list-style: none;
    white-space: nowrap;
    max-height: 100%;
    width: 272px;
    text-align: left;
    background-color: #dfe1e6;
}

.card_header {
    cursor: pointer;
    padding: 10px 8px 8px;
}

.card_body {
    list-style: none;
    white-space: nowrap;
    padding: 0px 4px;
    margin: 0px 4px;
}

.list_card_details {
    cursor: pointer;
    border-radius: 4px;
    background-color: white;
    padding: 6px 8px 2px;
    box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 8px;
    min-height: 20px;
    cursor: move;
}
.list_card_details.over {
    border: 2px dashed #000;
}
.list_card_title {
    margin: 0px 0px 4px;
}

.card_floor {
    cursor: pointer;
    color: #6b778c;
    padding: 8px;
}
</style>