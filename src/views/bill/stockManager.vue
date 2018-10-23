<template>
  <div class="stockManager">
    <el-row>
      <!--查询表单-->
      <el-form :inline="true" :model="stockForm" class="form-inline queryForm" label-position="right" size="small"
               label-width="100px">
        <el-col :span="20" class="form-item-col">
          <el-form-item label="产品名称">
            <el-select v-model="stockForm.prodId" placeholder="产品名称" clearable>
              <el-option v-for="(item,index) in produceDict" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="进货时间">
            <el-date-picker type="date" placeholder="选择开始日期" v-model="stockForm.stockDateStart"
                            style="width: 100%;" clearable></el-date-picker>
          </el-form-item>
          <el-form-item prop="stockDate">
            <el-date-picker type="date" placeholder="选择结束时间" v-model="stockForm.stockDate"
                            style="width: 100%;" clearable></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="onQuery" icon="el-icon-search" size="small">查询</el-button>
          <el-button type="primary" @click="onReset" icon="el-icon-refresh" size="small">重置</el-button>
        </el-col>
      </el-form>
    </el-row>
    <hr/>
    <el-row>
      <el-col style="text-align: right">
        <el-button type="primary" @click="onAdd" icon="el-icon-plus" size="small">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <!--表格-->
      <el-table :data="tableData" ref="produceTable" height="440" class="table-container" show-summary
                @row-click="rowClick"  @selection-change="selectionChange">
        <el-table-column type="selection" width="70"></el-table-column>
        <el-table-column v-if="false" prop="id" label="主键"></el-table-column>
        <el-table-column v-if="false" prop="prodId" label="产品id"></el-table-column>
        <el-table-column fixed prop="prodName" label="产品名称" width="150" sortable></el-table-column>
        <el-table-column prop="stockPrice" label="产品单价" width="120" sortable></el-table-column>
        <el-table-column prop="stockQuantity" label="进货数量" width="120" sortable></el-table-column>
        <el-table-column prop="otherMoney" label="其他费用(快递)" width="180" sortable></el-table-column>
        <el-table-column prop="stockSumPrice" label="支出总金额" width="120" sortable></el-table-column>
        <el-table-column prop="stockDate" label="支出时间" :formatter="dataTimeFormatter" width="200"></el-table-column>
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

    <el-dialog class="form-dialog" title="新增进货/支出" :visible.sync="dialogFormVisible" :width="formDialogWidth">
      <el-form ref="editStockForm" class="form-inline" :model="editStockForm" label-position="right" size="small"
               :rules="editFormRule" :label-width="formLabelWidth">
        <el-form-item label="产品名称:" prop="prodId">
          <el-select v-model="editStockForm.prodId" placeholder="产品名称" @change="prodNameChanage" clearable>
            <el-option v-for="(item,index) in produceDict" :label="item.label" :value="item.value"
                       :key="index"></el-option>
          </el-select>
          <el-input v-if="false" v-model="editStockForm.prodName"></el-input>
        </el-form-item>
        <el-form-item label="产品单价:" prop="stockPrice">
          <el-input v-model.number="editStockForm.stockPrice" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="进货数量:" prop="stockQuantity">
          <el-input v-model.number="editStockForm.stockQuantity" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="其他金额(快递):" prop="otherMoney">
          <el-input v-model.number="editStockForm.otherMoney" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="支出总额:" prop="stockPrice">
          <el-input v-model.number="editStockForm.stockSumPrice" autocomplete="off" clearable disabled></el-input>
        </el-form-item>
        <el-form-item label="支出日期:" prop="stockDate">
          <el-date-picker type="date" v-model="editStockForm.stockDate" autocomplete="off"
                          clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="参与余量统计:" prop="isRemainder">
          <el-select v-model="editStockForm.isRemainder" placeholder="是否参与余量统计" clearable>
            <el-option v-for="(item,index) in yesNoDict" :label="item.label" :value="item.value"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input type="textarea" v-model.number="editStockForm.remark" autocomplete="off" clearable></el-input>
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
import {listStock, addStock, updateStock, delStock, getStock, loadProduce} from '../../api/bill'
import {dataFormatter, dataTimeFormatter} from '@/utils/toolUtils'
import {message, delMsg} from '@/utils/message'

export default {
  name: 'stockManager',
  data: function () {
    // 查询form
    let nowDate = new Date()
    let nowStartDate = new Date()
    let nStartDate = nowStartDate.setDate(nowStartDate.getDate() - 7)
    let formdata = {
      prodId: '',
      prodName: '',
      stockDateStart: nStartDate,
      stockDate: nowDate
    }
    // 编辑form
    let editformdata = {
      id: null,
      prodId: '',
      prodName: '',
      stockPrice: 0,
      stockQuantity: 1,
      otherMoney: 0,
      stockSumPrice: 0,
      stockDate: new Date(),
      isRemainder: 1,
      remark: ''
    }
    const formRule = {
      prodName: [
        {required: true, message: '请输入产品名称', trigger: 'blur'}
      ],
      stockPrice: [
        {required: true, message: '请输入产品价格', trigger: 'blur'},
        {type: 'number', message: '进货单价必须为数字值'}
      ],
      stockQuantity: [
        {required: true, message: '请输入产品价格', trigger: 'blur'},
        {type: 'number', message: '进货数量必须为数字值'}
      ],
      otherMoney: [
        {required: true, message: '请输入产品价格', trigger: 'blur'},
        {type: 'number', message: '其他金额必须为数字值'}
      // ],
      // stockSumPrice: [
      //   {required: true, message: '请输入产品价格', trigger: 'blur'},
      //   {type: 'number', message: '进货总额必须为数字值'}
      ]
    }
    let yesNoDict = [
      {label: '是', value: 1},
      {label: '否', value: 0}
    ]
    return {
      // 下拉字典
      yesNoDict: yesNoDict,
      produceDict: [],
      currentPage: 0,
      pageSize: 10,
      total: 0,
      tableData: null,
      tableIndex: 0,
      // 表格选中行
      tableSelections: [],
      stockForm: formdata,
      // 修改表单对象
      editStockForm: editformdata,
      editFormRule: formRule,
      // dialog是否修改，新增为否
      isEdit: false,
      // 表单dialog是否可见
      dialogFormVisible: false,
      // 表单标签宽度
      formLabelWidth: '120px',
      // 表单dialog 宽度
      formDialogWidth: '30%'

    }
  },
  computed: {
    stockPriceValue: function () {
      return (this.editStockForm.stockQuantity * this.editStockForm.stockPrice) +
      this.editStockForm.otherMoney
    }
  },
  watch: {
    stockPriceValue: function (val, oldval) {
      this.editStockForm.stockSumPrice = val
    }
  },
  created () {
    // 加载产品下拉数据
    this.loadProduce()
  },
  mounted () {
    // 初始化查询数据
    this.listStock()
  },
  methods: {
    // table出日期格式化
    dataFormatter: dataFormatter,
    dataTimeFormatter: dataTimeFormatter,
    // 产品选择下拉值改变
    prodNameChanage: function (value) {
      if (value) {
        for (let key in this.produceDict) {
          let ps = this.produceDict[key]
          if (ps.value === value) {
            this.editStockForm.prodName = ps.label
            this.editStockForm.stockPrice = ps.stockPrice
            break
          }
        }
      }
    },
    rowClick: function (row, event, cloumn) {
      if (row) {
        this.$refs.produceTable.toggleRowSelection(row)
      }
    },
    // 行选中改变后
    selectionChange: function (selections) {
      this.tableSelections = selections
    },
    // pagesize发生改变
    handleSizeChange: function (_pageSize) {
      this.pageSize = _pageSize
      // 初始化查询数据
      this.listStock()
    },
    // 当前页发生改变
    handleCurrentChange: function (_page) {
      this.currentPage = _page
      // 初始化查询数据
      this.listStock()
    },
    // 点击一行数据编辑
    handleEdit: function (index, row) {
      console.info('update row [ ' + JSON.stringify(row) + ' ]')
      const vm = this
      getStock(row.id).then(res => {
        vm.tableIndex = index
        vm.isEdit = true
        vm.editStockForm = res
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
        delStock(ids).then(res => {
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
      this.listStock()
    },
    // 重置
    onReset: function () {
      this.stockForm = {}
    },
    // 新增
    onAdd: function () {
      this.dialogFormVisible = true
      this.editStockForm.id = null
    },
    // 编辑保存
    dialogOk: function () {
      let vm = this
      vm.$refs['editStockForm'].validate(valid => {
        if (valid) {
          if (vm.isEdit) {
            // 修改
            updateStock(vm.editStockForm).then(res => {
              message('修改成功', 'success')
              vm.dialogFormVisible = false
              this.tableData.splice(this.tableIndex, 1, res)
            }).catch(() => {

            })
          } else {
            // 新增
            addStock(vm.editStockForm).then(res => {
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
    listStock: function () {
      let vm = this
      listStock(vm.stockForm, vm.currentPage, vm.pageSize).then(response => {
        vm.total = response.total
        vm.tableData = response.list
      }).catch(() => {
        message('产品列表数据获取失败', 'error')
      })
    },
    loadProduce: function () {
      let vm = this
      loadProduce().then(res => {
        vm.produceDict = res
      }).catch(() => {
        this.produceDict = []
      })
    }
  }
}
</script>

<style scoped lang="scss">

  .stockManager {
    background: $white;
    hr {
      border: none;
      border-bottom: 1px solid #dcdfe6;
      border-: 1;
    }
    .form-inline {
      /*float: left;*/
      .form-item-col {
        text-align: left;
      }
      .el-input__inner {
        width: 120px !important;
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
    .form-dialog {
      .form-inline {
        float: left;
        .el-input {
          width: 90%;
        }
      }
    }
  }
</style>
