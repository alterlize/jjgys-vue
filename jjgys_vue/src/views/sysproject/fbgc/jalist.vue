<template>
<div class="app-container">
    <div class="tools-div">
      <el-button size="small" type="primary" @click="exportjagc()" icon="el-icon-bottom"
        >导出交安工程模板文件</el-button
      >
      <el-button size="small" icon="el-icon-top" type="primary" @click="importjagc()">导入交安工程信息文件</el-button>
      <el-button size="small" type="primary" icon="el-icon-bottom"
        >生成交安工程所有鉴定表</el-button
      >
    </div>

    <div class="tool-div">
      <el-row >  
        <el-card  class="row-title"  > 标线 </el-card> 
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" @click.native="jabx()"> 交安标线 </el-card>
        </el-col>
      </el-row>
      
      <el-row >  
        <el-card  class="row-title"  > 标志</el-card> 
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" @click.native="jabz()"> 交安标志 </el-card>
        </el-col>
      </el-row>
     
      <el-row >  
        <el-card  class="row-title"  > 防护栏</el-card> 
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" @click.native="jabxfhl()"> 交安波形防护栏 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" @click.native="jathlqd()"> 交安砼护栏强度 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" @click.native="jathldmcc()"> 交安砼护栏断面尺寸 </el-card>
        </el-col>
      </el-row>
      
      
    </div>

     <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
      <el-form label-position="right" label-width="170px">
        <el-form-item label="文件">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :data="data"
            :action="'http://localhost:8800/project/info/fbgc/importjagc'"
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
    name:'jalist',
    data() {
        let projecttitle = this.$route.matched[1].meta.title;
        return {
            data: {
        projectname: projecttitle,
      },
            dialogImportVisible: false,
            htdname:this.$route.query.htdname,
            fbgcName:this.$route.query.fbgcName
        }
    },
    methods: {
    jabx() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/jagc/jabx",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    jabz() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/jagc/jabz",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    jabxfhl() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/jagc/jabxfhl",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    jathlqd() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/jagc/jathlqd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    jathldmcc() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/jagc/jathldmcc",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    importjagc() {
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
    exportjagc() {
      let projectname = this.$route.matched[1].meta.title;
      projectApi.exportAll(projectname).then((res) => {
        const objectUrl = URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        // 设置导出的文件名称
        link.download = projectname+`交安工程` + '.xlsx'
        link.style.display = "none";
        link.href = objectUrl;
        link.click();
        document.body.appendChild(link);
      })
    }

    }
    

}
</script>
<style>
.row-title {
    margin-top: 20px;
    background: rgb(240, 238, 238);
    
    
  }
.content{
  cursor: pointer;
}
</style>