<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="6"  v-for="(item, index) in tableData" :key="index">
        <el-card shadow="hover">213鼠标悬浮时显示</el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Component, { Getter } from 'nuxt-class-component'
import Vue from 'vue'
@Component({})
export default class Plan extends Vue {
  currentDate: Date = new Date()
  tableData = [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }]
}
</script>

<style scoped>
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