<template>
  <div class="userManager">
    <el-row>
      <!--查询表单-->
      <el-form :inline="true" :model="userForm" class="form-inline" label-position="right" size="small"
               label-width="50px">
        <el-col :span="20">
          <el-form-item label="账户">
            <el-input v-model="userForm.account" placeholder="账户"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="userForm.shortName" placeholder="账户"></el-input>
          </el-form-item>
          <!--<el-form-item label="类型">-->
            <!--<el-select v-model="userForm.type" placeholder="账户类型">-->
              <!--<el-option label="内部账户" value="0"></el-option>-->
              <!--<el-option label="临时账户" value="1"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="状态">
            <el-select v-model="userForm.status" placeholder="状态">
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
        <el-button type="primary" @click="onAdd" icon="el-icon-plus" size="small">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <!--表格-->
      <el-table :data="tableData" height="420" class="table-container">
        <el-table-column v-if="false" prop="id" label="主键" width="120"></el-table-column>
        <el-table-column fixed prop="account" label="账号" width="120"></el-table-column>
        <el-table-column prop="shortName" label="姓名" width="200"></el-table-column>
        <el-table-column prop="type" label="类型" width="120" :formatter="typeFormatter"></el-table-column>
        <el-table-column prop="status" label="状态" width="120" :formatter="statusFormatter"></el-table-column>
        <el-table-column prop="photo" label="头像" width="120"></el-table-column>
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

    <el-dialog class="form-dialog" title="新增用户" :visible.sync="dialogFormVisible" center :width="formDialogWidth">
      <el-form  ref="editUserForm" :model="editUserForm" label-position="right" size="small"
                :rules="editFormRule" :label-width="formLabelWidth">
        <el-form-item label="账号:" prop="account">
          <el-input v-model="editUserForm.account" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="名称:" prop="shortName">
          <el-input v-model="editUserForm.shortName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="头像:" prop="photo">
          <el-input v-model="editUserForm.photo" autocomplete="off" clearable></el-input>
        </el-form-item>
        <div v-if="!isEdit">
          <el-form-item label="密码:" prop="password_one">
            <el-input type="password" v-model="editUserForm.password_one" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="password">
            <el-input type="password" v-model="editUserForm.password" autocomplete="off" clearable></el-input>
          </el-form-item>
        </div>
        <!--<el-form-item label="确认密码:" >-->
          <!--<el-input  type="password" v-model="editUserForm.createTime" autocomplete="off" clearable></el-input>-->
        <!--</el-form-item>-->
        <div v-if="isEdit">
          <el-form-item label="类型:">
            <el-select v-model="editUserForm.type" placeholder="请选择账号类型" clearable>
              <el-option label="内部账号" :value="0"></el-option>
              <el-option label="临时账号" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:" >
            <el-select v-model="editUserForm.status" placeholder="请选择账号状态" clearable>
              <el-option label="正常" :value="0"></el-option>
              <el-option label="禁用" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogOk" size="small">确 定</el-button>
        <el-button @click="dialogCancel" size="small">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {listUser, addUser, updateUser, delUser, getUser} from '../../api/userRoleMenu'
import {message} from '@/utils/message'

export default {
  name: 'userManager',
  data: function () {
    const vm = this
    // 查询form
    let formdata = {
      account: '',
      shortName: '',
      type: '',
      status: '0'
    }
    // 编辑form
    let editformdata = {
      account: '',
      shortName: '',
      photo: '',
      password_one: '',
      password: '',
      status: '',
      type: '',
      creater: '',
      createTime: ''
    }
    // 第一次密码验证
    let passwordOneVali = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('密码必须大于6位,小于20位'))
      } else {
        if (this.editUserForm.password !== '') {
          this.$refs.editUserForm.validateField('password')
        }
        callback()
      }
    }
    // 第二次密码验证
    let passwordVali = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!vm.editUserForm.password_one) {
        callback(new Error('密码不能为空'))
      } else if (vm.editUserForm.password_one !== value) {
        callback(new Error('两次密码输入不一致，请核对'))
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error('密码必须大于6位,小于20位'))
      } else {
        callback()
      }
    }
    const formRule = {
      account: [
        {required: true, message: '请输入用户名', trigger: 'blur'}
      ],
      shortName: [
        {required: true, message: '请输入用户名称', trigger: 'blur'}
      ],
      password_one: [
        {validator: passwordOneVali, trigger: 'blur'}
      ],
      password: [
        {validator: passwordVali, trigger: 'blur'}
      ]
    }
    return {
      currentPage: 0,
      pageSize: 10,
      total: 0,
      tableData: null,
      tableIndex: 0,
      userForm: formdata,
      // 修改表单对象
      editUserForm: editformdata,
      editFormRule: formRule,
      // dialog是否修改，新增为否
      isEdit: false,
      // 表单dialog是否可见
      dialogFormVisible: false,
      // 表单标签宽度
      formLabelWidth: '100px',
      // 表单dialog 宽度
      formDialogWidth: '40%'

    }
  },
  mounted () {
    this.listUser()
  },
  methods: {
    // 类型自定义转换
    typeFormatter: function (row, column) {
      if (row.type === 0) {
        return '内部用户'
      }
      if (row.type === 1) {
        return '临时用户'
      }
      return row.type
    },
    // 类型自定义转换
    statusFormatter: function (row, column) {
      if (row.status === 0) {
        return '正常'
      }
      if (row.status === 1) {
        return '禁用'
      }
      return row.status
    },
    // pagesize发生改变
    handleSizeChange: function () {

    },
    // 当前页发生改变
    handleCurrentChange: function () {

    },
    // 点击一行数据编辑
    handleEdit: function (index, row) {
      console.info('update row [ ' + JSON.stringify(row) + ' ]')
      const vm = this
      vm.isEdit = true
      getUser(row.id).then(res => {
        vm.tableIndex = index
        vm.editUserForm = res
        vm.dialogFormVisible = true
      }).catch(() => {
        message('用户信息获取失败', 'error')
      })
    },
    // 点击一行数据删除
    handleDelete: function (index, row) {
      console.info('delete row [ ' + JSON.stringify(row) + ' ]')
      this.tableIndex = index
      let ids = []
      ids.push(row.id)
      delUser(ids).then(res => {
        message('数据删除成功', 'success')
        this.tableData.splice(this.tableIndex, 1)
      }).catch(() => {
        message('数据删除失败', 'error')
      })
    },
    // 查询
    onQuery: function () {
      this.listUser()
    },
    // 重置
    onReset: function () {
      this.userForm = {}
    },
    // 新增
    onAdd: function () {
      this.dialogFormVisible = true
      this.isEdit = false
    },
    // 编辑保存
    dialogOk: function () {
      let vm = this
      vm.$refs['editUserForm'].validate(valid => {
        if (valid) {
          if (vm.isEdit) {
            // 修改
            updateUser(vm.editUserForm).then(res => {
              message('修改成功', 'success')
              vm.dialogFormVisible = false
              this.tableData.splice(this.tableIndex, 1, res)
            }).catch(() => {

            })
          } else {
            // 新增
            addUser(vm.editUserForm).then(res => {
              message('保存成功', 'success')
              vm.dialogFormVisible = false
              this.tableData.push(res)
            }).catch(() => {

            })
          }
        } else {
          message('录入信息验证失败，请检查', 'error')
        }
      })
    }, // 编辑取消
    dialogCancel: function () {
      this.dialogFormVisible = false
    },
    listUser: function () {
      let vm = this
      listUser(vm.userForm, vm.currentPage, vm.pageSize).then(response => {
        vm.total = response.total
        vm.tableData = response.list
      }).catch(() => {
        message('用户列表数据获取失败', 'error')
      })
    }
  }
}
</script>

<style scoped lang="scss">

  .userManager {
    background: $white;
    hr{
      border:none;
      border-bottom: 1px solid #dcdfe6;
      border-: 1;
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
        width: 90%;
      }
    }
  }
</style>
