<template>
  <div class="app-container">
    <!--查询表单-->
    <div class="search-div">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="连接线名称:">
          <el-input v-model="searchObj.ljxname" />
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="fetchData()"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetData"
          >重置</el-button
        >
      </el-form>
    </div>
    <!-- 工具按钮 -->
    <div class="tools-div">
      <div class="anniu">
        <el-button
          class="btn-add"
          type="success"
          @click="exportLjx()"
          style="margin-left: 0px"
          icon="el-icon-bottom"
          size="mini"
          >导出连接线清单模板文件</el-button
        >
        <!-- :disabled="$hasBP('bnt.ql.export')  === false" -->
        <el-button
          class="btn-add"
          type="success"
          @click="importLjx()"
          style="margin-left: 0px"
          icon="el-icon-top"
          size="mini"
          >导入连接线清单数据</el-button
        >
        <!-- :disabled="$hasBP('bnt.ql.import')  === false" -->

        <el-button
          class="btn-add"
          type="danger"
          size="mini"
          @click="batchRemove()"
          style="margin-left: 1px"
          icon="el-icon-delete"
          >删除</el-button
        >
        <el-button class="shuoming" style="float：right" type="text" @click="dialogVisible = true"
          >填写说明</el-button
        >
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="list"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" />
      <el-table-column label="序号">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="ljxname" label="连接线名称" />
      <el-table-column prop="htd" label="合同段" />
      <el-table-column prop="zh" label="桩号" />
      <el-table-column prop="ljxlmsshtd" label="连接线名称" />
      <el-table-column prop="createTime" label="创建时间" />
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center"
      layout=" ->,total, sizes, prev, pager, next, jumper"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
    />

    <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
      <el-form label-position="right" label-width="170px">
        <el-form-item label="文件">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :data="data"
            :action="'http://localhost:8800/project/info/lqs/ljx/importLjx'"
            class="upload-demo"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="填写说明"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 引入定义接口js文件
import api from "@/api/project/lqs/ljx.js";
export default {
  data() {
    // 初始值
    let value = this.$route.query.name;
    return {
      data: {
        proname: value,
      },
      dialogImportVisible: false,
      list: [], // 项目列表
      total: 0, // 总记录数
      page: 1, // 当前页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询条件
      multipleSelection: [], // 批量删除选中的记录列表
      dialogVisible: false,
      ljx: {},
    };
  },
  created() {
    // 页面渲染之前
    console.log(this.$route.query.name);
    //alert(this.$route.matched[1].meta.title)
    this.fetchData();
  },
  methods: {
    handleClose(){

    },
    importLjx() {
      this.dialogImportVisible = true;
    },
    onUploadSuccess(response, file) {
      console.log(response.code);
      if (response.code == 201) {
        this.$message.error("上传失败，请使用正确格式的excel");
      } else {
        this.$message.success("上传成功");
      }
      this.dialogImportVisible = false;
      this.fetchData();
    },
    exportLjx() {
      let projectname = this.$route.query.name;
      api.export().then((res) => {
        const objectUrl = URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        // 设置导出的文件名称
        link.download = projectname + `连接线清单` + ".xlsx";
        link.style.display = "none";
        link.href = objectUrl;
        link.click();
        document.body.appendChild(link);
      });
      //window.open("http://localhost:8800/project/info/lqs/exportQL")
    },
    // 批量删除
    batchRemove() {
      // 判断非空
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请选择要删除的记录！");
        return;
      }
      this.$confirm("此操作将删除该项目的所有信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var idList = []; // [1,2,3 ]
        // 遍历数组
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var obj = this.multipleSelection[i];
          var id = obj.id;
          idList.push(id);
        }
        // 调用接口删除
        api.batchRemove(idList).then((response) => {
          // 提示信息
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 刷新页面
          this.fetchData();
        });
      });
    },
    // 复选框发生变化，调用方法，选中复选框行内容传递
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    fetchData() {
      this.searchObj.proname = this.$route.query.name;
      // 调用api
      api.pageList(this.page, this.limit, this.searchObj).then((response) => {
        this.list = response.data.records;
        this.total = response.data.total;
      });
    },
    // 改变每页显示的记录数
    changePageSize(size) {
      this.limit = size;
      this.fetchData();
    },
    // 改变页码数
    changeCurrentPage(page) {
      this.page = page;
      this.fetchData();
    },
    // 清空
    resetData() {
      this.searchObj = {};
      this.fetchData();
    },
  },
};
</script>

<style lang="scss" scoped>
.tools-div{
  .anniu{
    .shuoming{
      float: right;
    }
  }
}
</style>
