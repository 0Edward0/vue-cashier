<template>
  <div class="roleManager">
    <el-row>
      <!--查询表单-->
      <el-form :inline="true" :model="roleForm" class="form-inline" label-position="right" size="small"
               label-width="70px">
        <el-col :span="20">
          <el-form-item label="角色编码">
            <el-input v-model="roleForm.roleCode" placeholder="角色编码"></el-input>
          </el-form-item>
          <el-form-item label="角色名称">
            <el-input v-model="roleForm.roleName" placeholder="角色名称"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="roleForm.status" placeholder="状态">
              <el-option label="正常" value="0"></el-option>
              <el-option label="禁用" value="1"></el-option>
            </el-select>
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
        <el-button type="primary" @click="onQuery" icon="el-icon-plus" size="small">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <!--表格-->
      <el-table :data="roleTableData" height="420" class="table-container">
        <el-table-column fixed prop="roleCode" label="角色账号" width="120"></el-table-column>
        <el-table-column prop="roleName" label="角色姓名" width="200"></el-table-column>
        <el-table-column prop="status" label="状态" width="120"></el-table-column>
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

    <el-dialog class="form-dialog" title="新增角色" :visible.sync="dialogFormVisible" center :width="formDialogWidth">
      <el-form  :model="editRoleForm" label-position="right" size="small" :label-width="formLabelWidth">
        <el-form-item label="角色编码:" >
          <el-input v-model="editRoleForm.menuName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="菜单名称:">
          <el-input v-model="editRoleForm.path" autocomplete="off" clearable></el-input>
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
import {listRole} from '../../api/userRoleMenu'
import {message} from '@/utils/message'

export default {
  name: 'roleManager',
  data () {
    let formdata = {
      roleCode: '',
      roleName: '',
      status: 0
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
      currentPage: 0,
      pageSize: 10,
      total: 0,
      roleTableData: null,
      roleForm: formdata,
      // 修改表单对象
      editRoleForm: editformdata,
      // 表单dialog是否可见
      dialogFormVisible: false,
      // 表单标签宽度
      formLabelWidth: '80px',
      // 表单dialog 宽度
      formDialogWidth: '30%'

    }
  },
  mounted () {
    this.listRole()
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
      this.listRole()
    },
    // 重置
    onReset: function () {
      this.roleForm = {}
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
    listRole: function () {
      let vm = this
      listRole(vm.roleForm, vm.currentPage, vm.pageSize).then(response => {
        vm.total = response.total
        vm.roleTableData = response.list
      }).catch(() => {
        message('角色数据获取失败', 'error')
      })
    }
  }
}
</script>

<style scoped lang="scss">

  .roleManager {
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
