<template>
<div class="app-container">
    <div class="tools-div">
      <el-button size="small" type="primary" @click="exportqlgc()" icon="el-icon-bottom"
        >导出桥梁工程模板文件</el-button
      >
      <el-button size="small" icon="el-icon-top" type="primary" @click="importqlgc()">导入桥梁工程信息文件</el-button>
      <el-button size="small" type="primary" icon="el-icon-bottom"
        >生成桥梁工程所有鉴定表</el-button
      >
    </div>

    <div class="tool-div">
      <el-row >  
        <el-card  class="row-title"  > 桥面 </el-card> 
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" @click.native="qmpzd()"> 桥面平整度三米直尺法 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" @click.native="qmhp()"> 桥面横坡 </el-card>
        </el-col> 
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" @click.native="qmgzsd()"> 桥面构造深度手工铺砂法 </el-card>
        </el-col>
      </el-row>

      <el-row >  
        <el-card  class="row-title"  > 上部 </el-card> 
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" @click.native="sbtqd()"> 桥梁上部砼强度 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover"  class="content" align="middle" @click.native="sbjgcc()"> 桥梁上部结构尺寸 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover"  class="content" align="middle" @click.native="sbbhchd()"> 桥梁上部保护层厚度 </el-card>
        </el-col>
      </el-row>
     
      <el-row >  
        <el-card  class="row-title"  > 下部 </el-card> 
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" @click.native="xbdttqd()"> 桥梁下部墩台砼强度 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" @click.native="xbjgcc()"> 桥梁下部结构尺寸 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" @click.native="xbbhchd()"> 桥梁下部保护层厚度 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" @click.native="xbszd()"> 桥梁下部竖直度 </el-card>
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
            :action="'http://localhost:8800/project/info/fbgc/importqlgc'"
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
import qmgzsd from '@/api/project/fbgc/qlgc/qmgzsd';
import xbjgcc from '@/api/project/fbgc/qlgc/xbjgcc';
import xbszd from '@/api/project/fbgc/qlgc/xbszd';
import projectApi from '@/api/project/projectInfo.js'
export default {
    name:"qllist",
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
    importqlgc() {
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
    exportqlgc() {
      let projectname = this.$route.matched[1].meta.title;
      projectApi.exportAll(projectname).then((res) => {
        const objectUrl = URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        // 设置导出的文件名称
        link.download = projectname+`桥梁工程` + '.xlsx'
        link.style.display = "none";
        link.href = objectUrl;
        link.click();
        document.body.appendChild(link);
      })
    },
    qmpzd() {
      let projecttitle = this.$route.query.projecttitle;
      
      //this.$router.push({path:"/jjgfbgc/ljgc/psdmcc",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    qmhp() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/qlgc/qmhp",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    qmgzsd() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/qlgc/qmgzsd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    sbtqd() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/qlgc/sbtqd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    sbjgcc() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/qlgc/sbjgcc",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    sbbhchd() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/qlgc/sbbhchd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    xbdttqd() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/qlgc/xbdttqd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    xbjgcc() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/qlgc/xbjgcc",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    xbbhchd() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/qlgc/xbbhchd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    xbszd() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/qlgc/xbszd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
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