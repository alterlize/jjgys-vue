<template>
<div class="app-container">
    <div class="tools-div">
      <el-button size="small" type="primary" @click="exportsdgc()" icon="el-icon-bottom"
        >导出隧道工程模板文件</el-button
      >
      <el-button size="small" icon="el-icon-top" type="primary" @click="importsdgc()">导入隧道工程信息文件</el-button>
      <el-button size="small" type="primary" icon="el-icon-bottom"
        >生成隧道工程所有鉴定表</el-button
      >
    </div>

    <div class="tool-div">
      <el-row >  
        <el-card  class="row-title"  > 衬砌 </el-card> 
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" style="font-size: 15px;" @click.native="sdcqtqd()"> 隧道衬砌砼强度 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" style="font-size: 15px;" @click.native="sdcqhd()"> 隧道衬砌厚度 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" style="font-size: 15px;" @click.native="sddmpzd()"> 隧道大面平整度 </el-card>
        </el-col>
      </el-row>
     
      <el-row >  
        <el-card  class="row-title"  > 隧道路面 </el-card> 
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" style="font-size: 15px;" @click.native="lqlmysd()"> 隧道沥青路面压实度 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" style="font-size: 15px;" @click.native="lqlmssxs()"> 隧道沥青路面渗水系数 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" style="font-size: 15px;" @click.native="hntlmqd()"> 隧道混凝土路面强度 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" style="font-size: 15px;" @click.native="tlmxlbgc()"> 隧道砼路面相邻板高差 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" style="font-size: 15px;" @click.native="lmgzsd()">  隧道路面构造深度手工铺砂法 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" style="font-size: 15px;" @click.native="lqlmhdzx()"> 隧道沥青路面厚度钻芯法 </el-card>
        </el-col>
      </el-row>
      <el-row>
       
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" style="font-size: 15px;" @click.native="hntlmhdzx()"> 隧道混凝土路面厚度钻芯法 </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" style="font-size: 15px;" @click.native="sdhp()"> 隧道横坡 </el-card>
        </el-col>
      </el-row>
      
      <el-row >  
        <el-card  class="row-title"  > 总体 </el-card> 
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-card shadow="hover" class="content" align="middle" style="font-size: 15px;" @click.native="sdztkd()"> 隧道总体宽度 </el-card>
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
            :action="'http://localhost:8800/project/info/fbgc/importsdgc'"
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
import hntlmhdzx from '@/api/project/fbgc/sdgc/hntlmhdzx';
import lqlmhdzx from '@/api/project/fbgc/sdgc/lqlmhdzx';
import projectApi from '@/api/project/projectInfo.js'
export default {
    name:'sdlist',
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

    sdcqtqd() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/sdgc/cqtqd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    sdcqhd() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/sdgc/cqhd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    sddmpzd() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/sdgc/dmpzd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    lqlmysd() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/sdgc/lqlmysd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    lqlmssxs() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/sdgc/lqlmssxs",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    hntlmqd() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/sdgc/hntlmqd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    tlmxlbgc() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/sdgc/tlmxlbgc",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    lmgzsd() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/sdgc/lmgzsd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    lqlmhdzx() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/sdgc/lqlmhdzx",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    hntlmhdzx() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/sdgc/hntlmhdzx",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },


    sdhp() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/sdgc/sdhp",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    sdztkd() {
      let projecttitle = this.$route.query.projecttitle;
      
      this.$router.push({path:"/jjgfbgc/sdgc/ztkd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
    },
    importsdgc() {
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
    exportsdgc() {
      let projectname = this.$route.matched[1].meta.title;
      projectApi.exportAll(projectname).then((res) => {
        const objectUrl = URL.createObjectURL(
          new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        // 设置导出的文件名称
        link.download = projectname+`隧道工程` + '.xlsx'
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