<template>
  <div class="dashboard-container">
    <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in 4" :key="item">
      <el-image :src="src"></el-image>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
     return {
        src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
      }
  },
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
