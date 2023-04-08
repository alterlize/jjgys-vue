<template>
  <div class="app-container">
    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-input style="width: 20%" v-model="searchObj.name" placeholder="岗位名称"></el-input>
            <el-button type="primary" icon="el-icon-search" size="mini"  @click="fetchData()">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <!-- <el-button type="primary" icon="el-icon-search" size="mini"  @click="fetchData()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button> -->
        </el-row>
      </el-form>
    </div>
    <!-- 工具条 -->
  <div class="tools-div">
    <el-button type="success" :disabled="$hasBP('bnt.sysPost.add')  === false" icon="el-icon-plus" size="mini" @click="add">添 加</el-button>
  </div>
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;"
      @selection-change="handleSelectionChange">

      <el-table-column type="selection"/>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="postCode" label="岗位编码" />
      <el-table-column prop="name" label="岗位名称" />
      <el-table-column prop="createTime" label="创建时间" width="160"/>
      <el-table-column label="操作"  align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row.id)" title="修改"/>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)" title="删除" />
        </template>
      </el-table-column>
      
    </el-table>

  <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%" >
      <el-form ref="dataForm" :model="sysPost" :rules="addrulse" label-width="100px" size="small" style="padding-right: 40px;">
        <el-form-item label="岗位编码" prop="postCode">
          <el-input v-model="sysPost.postCode"/>
        </el-form-item>
        <el-form-item label="岗位名称" prop="name">
          <el-input v-model="sysPost.name"/>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker
          v-model="sysPost.createTime"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="saveOrUpdate()" size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
//引入定义接口的js文件
import api from '@/api/system/post'

export default {
  //定义初始值
  data() {
    return {
      listLoading:false,//是否显示加载
      list:[],//操作日志列表
      total:0,//总记录数
      page:1,//当前页
      limit:10,//每页显示记录数
      searchObj:{},//条件查询封装对象

      dialogVisible: false,//弹出框
      sysPost:{}, //封装添加表单数据
      selectValue:[] //复选框选择内容封装数组
    }
  },
  //页面渲染之前执行
  created() {
    //调用列表方法
    this.fetchData()
  },
  methods:{//具体方法
    //复选框发生变化执行方法
    handleSelectionChange(selection) {
      this.selectValue = selection
      //console.log(this.selectValue)
    },
    //添加或者修改方法
    saveOrUpdate() {
      if(!this.sysPost.id) {
        this.save()
      } else {
        this.update()
      }
    },
    //修改
    update() {
      api.update(this.sysPost)
        .then(response => {
          //提示
          this.$message.success('操作成功')
          //关闭弹框
          this.dialogVisible = false
          //刷新
          this.fetchData()
        })
    },
    //添加
    save() {
      api.save(this.sysPost)
        .then(response => {
          //提示
          this.$message.success('操作成功')
          //关闭弹框
          this.dialogVisible = false
          //刷新
          this.fetchData()
        })
    },
   //添加弹框的方法
    add() {
      this.dialogVisible = true
      this.sysPost = {}
    },
    //根据id查询，数据回显
    edit(id) {
      //弹出框
      this.dialogVisible = true
      //调用接口查询
      api.getPostId(id)
        .then(response => {
          this.sysPost = response.data
        })
    },
    //重置
    resetData() {
      //清空表单
      this.searchObj = {}
      //查询所有数据
      this.fetchData()
    },
    // 条件分页查询列表  pageNum 查询页数
    fetchData(pageNum=1) {
      //页数赋值
      this.page = pageNum
      //ajax
      api.getPageList(this.page,this.limit,this.searchObj)
        .then(response => {
          //this.listLoading = false
          //console.log(response)
          //每页数据列表
          this.list = response.data.records
          //总记录数
          this.total = response.data.total
        })
    },
    //删除
    removeDataById(id) {
        this.$confirm('此操作将永久删除该岗位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调用方法删除
          api.removeId(id)
            .then(response => {
              //提示
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //刷新
              this.fetchData()
          })
        })
    },
  }
}
</script>