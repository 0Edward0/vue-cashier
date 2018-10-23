<template>
  <div class="menuManager">
    <el-row>
      <!--查询表单-->
      <el-form :inline="true" :model="menuForm" class="form-inline" label-position="right" size="small"
               label-width="70px">
        <el-col :span="20">
          <el-form-item label="菜单名称">
            <el-input v-model="menuForm.menuName" placeholder="角色编码"></el-input>
          </el-form-item>
          <el-form-item label="菜单路径">
            <el-input v-model="menuForm.path" placeholder="角色名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="onQuery" icon="el-icon-search" size="small">查询</el-button>
          <el-button type="primary" @click="onReset" icon="el-icon-refresh" size="small">重置</el-button>
        </el-col>
        <!--<el-form-item>-->
        <!---->
        <!--</el-form-item>-->
      </el-form>
    </el-row>
    <hr />
    <el-row>
      <el-col style="text-align: right">
        <el-button type="primary" @click="onAdd" icon="el-icon-plus" size="small">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <!--表格-->
      <el-table :data="menuTableData" height="420" class="table-container">
        <el-table-column prop="id" label="id" width="120"></el-table-column>
        <el-table-column fixed prop="menuName" label="菜单名称" width="120"></el-table-column>
        <el-table-column prop="path" label="请求路径" width="100"></el-table-column>
        <el-table-column prop="url" label="请求链接" width="100"></el-table-column>
        <el-table-column prop="creater" label="创建人" width="100"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
        <el-table-column prop="updater" label="修改人" width="100"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间" width="150"></el-table-column>
        <el-table-column prop="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[10, 20, 100, 200]"
                     :page-size="pageSize"
                     layout="sizes,total  ,jumper, prev, pager, next"
                     :total="total">
      </el-pagination>
    </el-row>

    <el-dialog class="form-dialog" title="新增菜单" :visible.sync="dialogFormVisible" center :width="formDialogWidth">
      <el-form  :model="editMenuForm" label-position="right" size="small" :label-width="formLabelWidth">
        <el-form-item label="菜单名称:" >
          <el-input v-model="editMenuForm.menuName" autocomplete="off" clearable>
            <el-select v-model="editMenuForm.pid" placeholder="请选择父级菜单" slot="prepend" style="width:110px">
              <el-option label="一级菜单" value="root"></el-option>
              <el-option label="系统设置" value="sys"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="菜单路径:">
          <el-input v-model="editMenuForm.path" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="请求链接:">
          <el-input v-model="editMenuForm.url" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="创建人:" >
          <el-input v-model="editMenuForm.creater" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="创建时间:" >
          <el-input v-model="editMenuForm.createTime" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogOk" size="small">确 定</el-button>
        <el-button @click="dialogCancel" size="small">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {listMenu} from '../../api/userRoleMenu'
import {message} from '@/utils/message'

export default {
  name: 'menuManager',
  data () {
    let formdata = {
      menuName: '',
      path: ''
    }
    let editformdata = {
      menuName: '',
      path: '',
      url: '',
      pid: '',
      creater: '',
      createTime: ''
    }
    return {
      // 查询表单对象
      menuForm: formdata,
      // 修改表单对象
      editMenuForm: editformdata,
      currentPage: 0,
      pageSize: 10,
      total: 0,
      // table数据对象
      menuTableData: null,
      // 表单dialog是否可见
      dialogFormVisible: false,
      // 表单标签宽度
      formLabelWidth: '80px',
      // 表单dialog 宽度
      formDialogWidth: '40%'

    }
  },
  mounted () {
    this.listMenu()
  },
  methods: {
    // pagesize发生改变
    handleSizeChange: function () {

    },
    // 当前页发生改变
    handleCurrentChange: function () {

    },
    // 点击一行数据编辑
    handleEdit: function (index, row) {
      console.info('click row [ ' + JSON.stringify(row) + ' ]')
      this.dialogFormVisible = true
    },
    // 点击一行数据删除
    handleDelete: function (index, row) {
      console.info('click row [ ' + JSON.stringify(row) + ' ]')
    },
    // 查询
    onQuery: function () {
      this.listMenu()
    },
    // 重置
    onReset: function () {
      this.menuForm = {}
    },
    // 新增
    onAdd: function () {
      this.dialogFormVisible = true
    },
    // 编辑保存
    dialogOk: function () {

    }, // 编辑取消
    dialogCancel: function () {
      this.dialogFormVisible = false
    },
    listMenu: function () {
      let vm = this
      listMenu(vm.menuForm, vm.currentPage, vm.pageSize).then(response => {
        vm.total = response.total
        vm.menuTableData = response.list
      }).catch(() => {
        message('菜单数据获取失败', 'error')
      })
    }
  }
}
</script>

<style scoped lang="scss">

  .menuManager {
    background: $white;
    hr{
      border:none;
      border-bottom: 1px solid #dcdfe6;
    }
    .form-inline {
      /*float: left;*/
      .el-input__inner{
        width:120px !important;
      }
    }
    .table-container {
      width: 100%;
      height: 80%;
      .th {
        .cell {
          text-align: center;
        }
      }
    }
    .form-dialog{
      .el-input {
        width: 80%;
      }
    }
  }
</style>
