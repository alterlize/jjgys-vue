<template>
    <div class="app-container">
        <!--查询表单-->
        <div class="search-div">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="检测时间:">
              <el-input v-model="searchObj.jcsj" />
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
              @click="exportdmpzd()"
              style="margin-left: 0px"
              icon="el-icon-bottom"
              size="mini"
              >导出隧道大面平整度文件</el-button
            >
            <!-- :disabled="$hasBP('bnt.ql.export')  === false" -->
            <el-button
              class="btn-add"
              type="success"
              @click="importdmpzd()"
              style="margin-left: 0px"
              icon="el-icon-top"
              size="mini"
              >导入隧道大面平整度数据文件</el-button
            >
            <el-button
              class="btn-add"
              type="success"
              size="mini"
              @click="scjdb()"
              style="margin-left: 1px"
              icon="el-icon-top"
              >生成鉴定表</el-button
            >
            <el-button
              class="btn-add"
              type="success"
              size="mini"
              @click="ckjdb()"
              style="margin-left: 1px"
              icon="el-icon-top"
              >查看鉴定表</el-button
            >
            <el-button
            class="btn-add"
            type="primary"
            size="mini"
            @click="modify()"
            style="margin-left: 1px"
            icon="el-icon-edit"
            >修改</el-button>
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
          style="width: 100%;"
          class="table"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" />
          <el-table-column label="序号" width="50px">
            <template slot-scope="scope">
              {{ (page - 1) * limit + scope.$index + 1 }}
            </template>
          </el-table-column>
            <el-table-column prop="jcsj" label="检测时间" width="200px" />
            <el-table-column prop="sdmc" label="隧道名称" width="300px" />
            <el-table-column prop="zh" label="桩号" />
            <el-table-column prop="yxps" label="允许偏差(mm)" />
            <el-table-column prop="scz" label="实测值(mm)" />
            <el-table-column prop="createtime" label="创建时间" width="200px"/>
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
                :on-change="fileChange"
                :auto-upload="false"
                :file-list="fileList"
                :limit="1"
                action="/"
                class="upload-demo"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传xls文件</div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="onUploadSuccess">提交</el-button>
            <el-button @click="dialogImportVisible = false,fileList=[]">取消</el-button>
          </div>
        </el-dialog>
    
        <el-dialog
          title="填写说明"
          :visible.sync="dialogVisible"
          width="30%"
          
          :before-close="handleClose"
        >
          <span>1.日期格式：yyyy-MM-dd，例如：2021-05-23</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <el-dialog
         title="隧道大面平整度鉴定表结果"
         :visible="dialogVisible1">
         <el-descriptions :column="1"  border>
          <el-descriptions-item>
              <template slot="label" >合格点数</template>
              {{descriptions["合格点数"]}}
          </el-descriptions-item>
          <el-descriptions-item>
              <template slot="label" >总点数</template>
              {{descriptions["总点数"]}}
          </el-descriptions-item>
          <el-descriptions-item>
              <template slot="label" >合格率(%)</template>
              {{descriptions["合格率"]}}
          </el-descriptions-item>
         </el-descriptions>
         <span slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="dialogVisible1 = false">关闭</el-button>
         </span>
         
        </el-dialog>
        <el-dialog title="修改" :visible.sync="dialogVisible2" width="40%" >
          <el-form ref="dataForm" :model="modifyData"  label-width="130px" size="small" style="padding-right: 40px;">
            <el-form-item label="检测时间" prop="jcsj">
            <el-input v-model="modifyData.jcsj"></el-input>
            </el-form-item>
            <el-form-item label="隧道名称" prop="sdmc">
            <el-input v-model="modifyData.sdmc"></el-input>
            </el-form-item>
            <el-form-item label="桩号" prop="zh">
            <el-input v-model="modifyData.zh"></el-input>
            </el-form-item>
            
            <el-form-item label="允许偏差(mm)" prop="yxps">
            <el-input v-model="modifyData.yxps"></el-input>
            </el-form-item>
            <el-form-item label="实测值(mm)" prop="scz">
            <el-input v-model="modifyData.scz"></el-input>
            </el-form-item>
            
            
            <el-form-item label="创建时间" prop="createtime">
            <el-input v-model="modifyData.createtime"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false" size="small" icon="el-icon-refresh-right">取 消</el-button>
            <el-button type="primary" icon="el-icon-check" @click="update()" size="small">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </template>
    <script>
    // 引入定义接口js文件
    import api from "@/api/project/fbgc/sdgc/dmpzd.js";
    import { getSystemErrorMap } from "util";
    import FileSaver from "file-saver"
    export default {
      
      data() {
        // 初始值
        let value = this.$route.query.projecttitle
        return {
          data: {
            proname: value,
          },
          descriptions: {
             '合格点数':0,
             '总点数':0,
             '合格率':0
            },
          dialogImportVisible: false,
          list: [], // 项目列表
          total: 0, // 总记录数
          page: 1, // 当前页码
          limit: 10, // 每页记录数
          searchObj: {}, // 查询条件
          multipleSelection: [], // 批量删除选中的记录列表
          dialogVisible: false,
          dialogVisible1:false,
          dialogVisible2:false,
          proname:this.$route.query.projecttitle,
          htd:this.$route.query.htdname,
          fbgcName:this.$route.query.fbgcName,
          hdgqd: {},
          file:'',// 待上传文件
          fileList:[],
          modifyData:{}
        };
      },
      created() {
        // 页面渲染之前
        //console.log(this.$route.query.projecttitle);
        //alert(this.$route.matched[1].meta.title)
        this.fetchData();
      },
      // 'http://localhost:8800/jjg/fbgc/ljgc/hdgqd/importhdgqd'
      methods: {
        handleClose(){
    
        },
        scjdb(){
          let commonInfoVo={}
          commonInfoVo.proname=this.proname
          commonInfoVo.htd=this.htd
          commonInfoVo.fbgc='衬砌'
          api.scjdb(commonInfoVo).then((res) => {
            
            api.download(commonInfoVo.proname,commonInfoVo.htd).then((response)=>{
              
              var temp = response.headers["content-disposition"]
              var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
              var matches = filenameRegex.exec(temp);
              var filename=''
              if (matches != null && matches[1]) { 
                filename = matches[1].replace(/['"]/g, '');
              }
              console.log('鉴定表',decodeURI(filename))
              FileSaver.saveAs(response.data,decodeURI(filename))
              
            })
            
          });
    
        },
        ckjdb(){
            this.dialogVisible1=true
            let commonInfoVo={}
            commonInfoVo.proname=this.proname
            commonInfoVo.htd=this.htd
            commonInfoVo.fbgc='衬砌'
            api.lookjdb(commonInfoVo).then((res)=>{
              console.log('tttt',res)
              this.descriptions['合格点数']=res.data[0]["合格点数"]
              this.descriptions['总点数']=res.data[0]["总点数"]
              this.descriptions['合格率']=res.data[0]["合格率"]
            })
        },
        importdmpzd() {
          this.dialogImportVisible = true;
        },
        // 上传文件触发
        fileChange(file,fileList){
          this.fileList=fileList
          
        },
        onUploadSuccess() {
          
          //debugger
          let fd=new FormData()
          
          
    
          fd.append('file',this.fileList[0].raw)
          fd.append('proname',this.proname)
          fd.append('htd',this.htd)
          fd.append('fbgc','衬砌')
          
          api.importdmpzd(fd).then((res)=>{
            console.log('res',res)
            if(res.message=='成功'){
              this.fetchData();
              this.$message({
                type: "success",
                message: "上传成功!",
              });
              this.dialogImportVisible = false;
              this.fileList=[]
            }
            else{
              this.$alert('上传失败！')
            }
          })
          
          
          
        },
        exportdmpzd() {
          let projectname = this.proname;
          let htd =this.htd
          let fbgc=this.fbgcName
          
          debugger
          api.exportdmpzd().then((res) => {
            const objectUrl = URL.createObjectURL(
              new Blob([res.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              })
            );
            const link = document.createElement("a");
            // 设置导出的文件名称
            link.download = projectname +htd+fbgc+ `隧道大面平整度` + ".xlsx";
            link.style.display = "none";
            link.href = objectUrl;
            link.click();
            document.body.appendChild(link);
          });
        },
        // 修改
        modify(){
          if (this.multipleSelection.length === 0) {
            this.$message.warning("请选择要修改的记录！");
            return;
          }
          if (this.multipleSelection.length > 1) {
            this.$message.warning("一次只能修改一条记录！");
            return;
          }
          this.modifyData={}
          api.getById(this.multipleSelection[0].id).then((res)=>{
            if(res.message=='成功'){
              this.dialogVisible2=true
              this.modifyData=res.data
            }
            else{
              this.$alert('出错')
            }
          })
          
        },
        update(){
          api.modify(this.modifyData).then((res)=>{
            if(res.message=='成功'){
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              // 刷新页面
              this.dialogVisible2=false
              
              this.fetchData();
            }
            else{
              this.$alert('出错')
            }
          })
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
          this.searchObj.proname = this.proname;
          this.searchObj.htd=this.htd
          this.searchObj.fbgc='衬砌'
          
          // 调用api
          api.pageList(this.page, this.limit, this.searchObj).then((response) => {
            this.list = response.data.records;
            this.total = response.data.total;
            console.log('eeee',this.list)
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
    .app-container{
      height: 100%;
      overflow: hidden;
    }
    </style>