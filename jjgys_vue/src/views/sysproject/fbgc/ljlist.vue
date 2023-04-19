<template>

  <div class="app-container">
  
      <div class="tools-div">
        <el-button size="small" type="primary" @click="exportljgc()" icon="el-icon-bottom"
          >导出路基工程模板文件</el-button
        >
        <el-button size="small" icon="el-icon-top" type="primary" @click="importljgc()">导入路基工程信息文件</el-button>
        <el-button size="small" type="primary" icon="el-icon-bottom"
          >生成路基工程所有鉴定表</el-button
        >
      </div>
  
      <div class="tool-div"  >
        
        
  
  
        <el-row >  
          <el-card  class="row-title"  > 涵洞 </el-card> 
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-card class="content" shadow="hover" align="middle"   @click.native="hdgsd()" >涵洞砼强度</el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover" class="content" align="middle" @click.native="hdjgcc()"> 涵洞结构尺寸</el-card>
          </el-col>
        </el-row>
  
        <el-row >  
          <el-card  class="row-title"  > 排水工程 </el-card> 
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-card shadow="hover" align="middle" class="content" @click.native="psdmcc()" >排水断面尺寸</el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover" align="middle" class="content" @click.native="pspqhd()"> 排水铺砌厚度</el-card>
          </el-col>
        </el-row>
  
        <el-row >  
          <el-card  class="row-title"  > 路基土石方 </el-card> 
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-card shadow="hover" align="middle" class="content" @click.native="ljtsfysd()"> 路基土石方压实度 </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover" align="middle" class="content" @click.native="ljysdcj()"> 路基压实度沉降 </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover" align="middle"  class="content" @click.native="ljwcbkmlf()"> 路基弯沉贝克曼梁法 </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover" align="middle"  class="content" @click.native="ljwclcf()"> 路基弯沉落锤法 </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover" align="middle"  class="content" @click.native="ljbp()"> 路基边坡 </el-card>
          </el-col>
        </el-row>
       
        <el-row >  
          <el-card  class="row-title"  > 小桥工程 </el-card> 
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-card shadow="hover" align="middle" class="content" @click.native="xqjgcc()"> 小桥结构尺寸 </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover" align="middle" class="content" @click.native="xqgqd()"> 小桥砼强度 </el-card>
          </el-col>
        </el-row>
  
        <el-row >  
          <el-card  class="row-title"  > 支挡工程 </el-card> 
        </el-row>
        <el-row>
          <el-col :span="4" >
            <el-card shadow="hover"   align="middle" class="content" @click.native="zddmcc()"> 支挡断面尺寸 </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover" align="middle" class="content" @click.native="zdgqd()"> 支挡砼强度 </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover"   align="middle" class="content" @click.native="zdbmpzd()"> 支挡表面平整度 </el-card>
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
              :action="'http://localhost:8800/project/info/fbgc/importljgc'"
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
        hdjgcc(){
          let projecttitle = this.$route.query.projecttitle;
          
          this.$router.push({path:"/jjgfbgc/ljgc/hdjgcc",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
  
        },
      hdgsd() {
        let projecttitle = this.$route.query.projecttitle;
        
        this.$router.push({path:"/jjgfbgc/ljgc/hdgqd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
      },
      psdmcc() {
        let projecttitle = this.$route.query.projecttitle;
        
        this.$router.push({path:"/jjgfbgc/ljgc/psdmcc",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
      },
      pspqhd() {
        let projecttitle = this.$route.query.projecttitle;
        
        this.$router.push({path:"/jjgfbgc/ljgc/pspqhd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
      },
      ljtsfysd() {
        let projecttitle = this.$route.query.projecttitle;
        
        this.$router.push({path:"/jjgfbgc/ljgc/ljtsfysd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
      },
      ljysdcj() {
        let projecttitle = this.$route.query.projecttitle;
        
        this.$router.push({path:"/jjgfbgc/ljgc/ljysdcj",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
      },
      ljwcbkmlf() {
        let projecttitle = this.$route.query.projecttitle;
        
        this.$router.push({path:"/jjgfbgc/ljgc/ljwcbkmlf",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
      },
      ljwclcf() {
        let projecttitle = this.$route.query.projecttitle;
        
        this.$router.push({path:"/jjgfbgc/ljgc/ljwclcf",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
      },
      ljbp() {
        let projecttitle = this.$route.query.projecttitle;
        
        this.$router.push({path:"/jjgfbgc/ljgc/ljbp",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
      },
  
  
      xqjgcc() {
        let projecttitle = this.$route.query.projecttitle;
        
        this.$router.push({path:"/jjgfbgc/ljgc/xqjgcc",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
      },
      xqgqd() {
        let projecttitle = this.$route.query.projecttitle;
        
        this.$router.push({path:"/jjgfbgc/ljgc/xqgqd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
      },
      zddmcc() {
        let projecttitle = this.$route.query.projecttitle;
        
        this.$router.push({path:"/jjgfbgc/ljgc/zddmcc",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
      },
      zdgqd() {
        let projecttitle = this.$route.query.projecttitle;
        
        this.$router.push({path:"/jjgfbgc/ljgc/zdgqd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
      },
      zdbmpzd() {
        let projecttitle = this.$route.query.projecttitle;
        
        this.$router.push({path:"/jjgfbgc/ljgc/zdbmpzd",query:{projecttitle:projecttitle,htdname:this.htdname,fbgcName:this.fbgcName}});
      },
      importljgc() {
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
      exportljgc() {
        let projectname = this.$route.matched[1].meta.title;
        projectApi.exportAll(projectname).then((res) => {
          const objectUrl = URL.createObjectURL(
            new Blob([res.data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            })
          );
          const link = document.createElement("a");
          // 设置导出的文件名称
          link.download = projectname+`路基工程` + '.xlsx'
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