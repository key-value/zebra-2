<template>
  <el-container class="main-container">
    <el-header>
      <headerbar></headerbar>
    </el-header>
    <el-container>
      <el-aside width="280px">
        <asidebar></asidebar>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import headerbar from '~/components/frame/headbar.vue'
import asidebar from '~/components/frame/asidebar.vue'

export default {
  components: {
    headerbar,
    asidebar
  }
}
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.main-container {
  /* height: 100vh; */
  height: 100%;
  width: 100%;
  position: fixed;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
