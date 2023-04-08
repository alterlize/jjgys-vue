<template>
<div class="app-container">
    <div class="tools-div">
      <el-button size="small" type="primary" @click="exportlmgc()" icon="el-icon-bottom"
        >导出路面工程模板文件</el-button
      >
      <el-button size="small" icon="el-icon-top" type="primary" @click="importlmgc()">导入路面工程信息文件</el-button>
      <el-button size="small" type="primary" icon="el-icon-bottom"
        >生成路面工程所有鉴定表</el-button
      >
    </div>

    <div class="tool-div">
      <el-col :span="8">
        <el-card shadow="hover" @click.native="ql()"> 沥青路面压实度 </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" @click.native="sd()"> 路面弯沉 </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" @click.native="fhlm()"> 沥青路面渗水系数 </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" @click.native="hntlmjzd()"> 混凝土路面强度 </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" @click.native="sfz()"> 砼路面相邻板高差 </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" @click.native="ljx()"> 路面构造深度手工铺砂法 </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" @click.native="ljxql()"> 高速沥青路面厚度钻芯法 </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" @click.native="ljxsd()"> 混凝土路面厚度钻芯法 </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" @click.native="ljxhntlm()"> 路面横坡 </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" @click.native="ljxsd()"> 芯样完整性 </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" @click.native="ljxhntlm()"> 厚度 </el-card>
      </el-col> 
    </div>

     <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
      <el-form label-position="right" label-width="170px">
        <el-form-item label="文件">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :data="data"
            :action="'http://localhost:8800/project/info/fbgc/importlmgc'"
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

  </div>
</template>
<script>
import projectApi from '@/api/project/projectInfo.js'
export default {
    name:'lmlist',
    data() {
        let projecttitle = this.$route.matched[1].meta.title;
        return {
            data: {
        projectname: projecttitle,
      },
            dialogImportVisible: false,

        }
    },
    methods: {
    importlmgc() {
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
    exportlmgc() {
      let projectname = this.$route.matched[1].meta.title;
      projectApi.exportAll(projectname).then((res) => {
        const objectUrl = URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        // 设置导出的文件名称
        link.download = projectname+`路面工程` + '.xlsx'
        link.style.display = "none";
        link.href = objectUrl;
        link.click();
        document.body.appendChild(link);
      })
    }

    }
    
}
</script>