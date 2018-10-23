<template>
  <div class="produceManager">
    <el-row>
      <!--查询表单-->
      <el-form :inline="true" :model="produceForm" class="form-inline queryForm" label-position="right" size="small"
               label-width="100px">
        <el-col :span="20" class="form-item-col">
          <el-form-item label="产品名称">
            <el-input v-model="produceForm.prodName" placeholder="产品名称" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="onQuery" icon="el-icon-search" size="small">查询</el-button>
          <el-button type="primary" @click="onReset" icon="el-icon-refresh" size="small">重置</el-button>
        </el-col>
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
      <el-table :data="tableData" height="440" class="table-container">
        <el-table-column v-if="false" prop="id" label="主键" width="120"></el-table-column>
        <el-table-column fixed prop="prodName" label="产品名称" width="150"></el-table-column>
        <el-table-column prop="stockPrice" label="进货价格" width="100"></el-table-column>
        <el-table-column prop="salePrice" label="售出价格" width="100"></el-table-column>
        <el-table-column prop="creater" label="创建人" width="100"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" :formatter="dataFormatter" width="120"></el-table-column>
        <el-table-column prop="updater" label="修改人" width="100"></el-table-column>
        <el-table-column prop="updateDate" label="修改时间" :formatter="dataFormatter" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
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

    <el-dialog class="form-dialog" title="新增产品" :visible.sync="dialogFormVisible" center :width="formDialogWidth">
      <el-form  ref="editProduceForm" :model="editProduceForm" label-position="right" size="small"
                :rules="editFormRule" :label-width="formLabelWidth">
        <el-form-item label="产品名称:" prop="prodName">
          <el-input v-model="editProduceForm.prodName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="进货价格:" prop="stockPrice">
          <el-input v-model.number="editProduceForm.stockPrice" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="销售价格:" prop="salePrice">
          <el-input v-model.number="editProduceForm.salePrice" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input type="textarea" v-model.number="editProduceForm.remark" autocomplete="off" clearable></el-input>
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
import {listProduce, addProduce, updateProduce, delProduce, getProduce} from '../../api/bill'
import {dataFormatter} from '@/utils/toolUtils'
import {message, delMsg} from '@/utils/message'

export default {
  name: 'produceManager',
  data: function () {
    // 查询form
    let formdata = {
      prodName: ''
    }
    // 编辑form
    let editformdata = {
      id: null,
      prodName: '',
      stockPrice: 25,
      salePrice: 40,
      remark: ''
    }
    const formRule = {
      prodName: [
        {required: true, message: '请输入产品名称', trigger: 'blur'}
      ],
      stockPrice: [
        {required: true, message: '请输入产品价格'},
        {type: 'number', message: '价格必须为数字值'}
      ],
      salePrice: [
        {required: true, message: '请输入产品价格'},
        {type: 'number', message: '价格必须为数字值'}
      ]
    }
    return {
      currentPage: 0,
      pageSize: 10,
      total: 0,
      tableData: null,
      tableIndex: 0,
      produceForm: formdata,
      // 修改表单对象
      editProduceForm: editformdata,
      editFormRule: formRule,
      // dialog是否修改，新增为否
      isEdit: false,
      // 表单dialog是否可见
      dialogFormVisible: false,
      // 表单标签宽度
      formLabelWidth: '100px',
      // 表单dialog 宽度
      formDialogWidth: '30%'

    }
  },
  mounted () {
    this.listProduce()
  },
  methods: {
    // table出日期格式化
    dataFormatter: dataFormatter,
    // pagesize发生改变
    handleSizeChange: function (_pageSize) {
      this.pageSize = _pageSize
      this.listProduce()
    },
    // 当前页发生改变
    handleCurrentChange: function (_page) {
      this.currentPage = _page
      this.listProduce()
    },
    // 点击一行数据编辑
    handleEdit: function (index, row) {
      console.info('update row [ ' + JSON.stringify(row) + ' ]')
      const vm = this
      getProduce(row.id).then(res => {
        vm.tableIndex = index
        vm.isEdit = true
        vm.editProduceForm = res
        vm.dialogFormVisible = true
      }).catch(() => {
        message('产品信息获取失败', 'error')
      })
    },
    // 点击一行数据删除
    handleDelete: function (index, row) {
      console.info('delete row [ ' + JSON.stringify(row) + ' ]')
      delMsg().then(() => {
        this.tableIndex = index
        let ids = []
        ids.push(row.id)
        delProduce(ids).then(res => {
          message('数据删除成功', 'success')
          this.tableData.splice(this.tableIndex, 1)
        }).catch(() => {
          message('数据删除失败', 'error')
        })
      }).catch(() => {

      })
    },
    // 查询
    onQuery: function () {
      this.listProduce()
    },
    // 重置
    onReset: function () {
      this.produceForm = {}
    },
    // 新增
    onAdd: function () {
      this.dialogFormVisible = true
      this.editProduceForm.id = null
    },
    // 编辑保存
    dialogOk: function () {
      let vm = this
      vm.$refs['editProduceForm'].validate(valid => {
        if (valid) {
          if (vm.isEdit) {
            // 修改
            updateProduce(vm.editProduceForm).then(res => {
              message('修改成功', 'success')
              vm.dialogFormVisible = false
              this.tableData.splice(this.tableIndex, 1, res)
            }).catch(() => {

            })
          } else {
            // 新增
            addProduce(vm.editProduceForm).then(res => {
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
    listProduce: function () {
      let vm = this
      listProduce(vm.produceForm, vm.currentPage, vm.pageSize).then(response => {
        vm.total = response.total
        vm.tableData = response.list
      }).catch(() => {
        message('产品列表数据获取失败', 'error')
      })
    }
  }
}
</script>

<style scoped lang="scss">

  .produceManager {
    background: $white;
    hr{
      border:none;
      border-bottom: 1px solid #dcdfe6;
      border-: 1;
    }
    .form-inline {
      /*float: left;*/
      .form-item-col{
        text-align: left;
      }
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
