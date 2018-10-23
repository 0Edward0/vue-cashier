<template>
  <div class="saleManager">
    <el-row>
      <!--查询表单-->
      <el-form :inline="true" :model="saleForm" class="form-inline queryForm" label-position="right" size="small"
               label-width="100px">
        <el-col :span="20" class="form-item-col">
          <el-form-item label="产品名称">
            <el-select v-model="saleForm.prodId" placeholder="产品名称" clearable>
              <el-option v-for="(item,index) in produceDict" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否拿货:" prop="hasGoods">
            <el-select v-model="saleForm.hasGoods" placeholder="是否拿货" clearable>
              <el-option v-for="(item,index) in yesNoDict" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否支付:" prop="hasPayment">
            <el-select v-model="saleForm.hasPayment" placeholder="是否支付" clearable>
              <el-option v-for="(item,index) in yesNoDict" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-col class="short-select">

            <el-form-item label="客户名称:" prop="saleObj">
              <el-input v-model="saleForm.saleObj" placeholder="客户名称" clearable></el-input>
            </el-form-item>
            <!--<el-form-item label="支付方式:" prop="paymentType">-->
              <!--<el-select v-model="saleForm.paymentType" placeholder="支付方式" clearable>-->
                <!--<el-option v-for="(item,index) in paymentTypeDict" :label="item.label" :value="item.value"-->
                           <!--:key="index"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
              <el-form-item label="支付时间">
                <el-date-picker type="date" placeholder="选择开始日期" v-model="saleForm.paymentDateStart"
                                style="width: 100%;" clearable></el-date-picker>
              </el-form-item>
              <el-form-item prop="saleDate">
                <el-date-picker type="date" placeholder="选择结束时间" v-model="saleForm.paymentDate"
                                style="width: 100%;" clearable></el-date-picker>
              </el-form-item>
          </el-col>

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
        <el-button type="primary" @click="onGood" icon="el-icon-sold-out" size="small">确认拿货
        </el-button>
        <el-button type="primary" @click="onPayment" icon="el-icon-check" size="small">确认支付
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <!--表格-->
      <el-table :data="tableData" ref="produceTable" height="410" class="table-container" show-summary
                @row-click="rowClick"  @selection-change="selectionChange">
        <el-table-column type="selection" width="70"></el-table-column>
        <el-table-column v-if="false" prop="id" label="主键"></el-table-column>
        <el-table-column v-if="false" prop="prodId" label="产品id"></el-table-column>
        <el-table-column fixed prop="saleObj" label="客户名称" width="150" sortable></el-table-column>
        <el-table-column prop="prodName" label="产品名称" width="100" sortable></el-table-column>
        <el-table-column prop="saleQuantity" label="售出数量" width="100" sortable></el-table-column>
        <el-table-column prop="salePrice" label="售出单价" width="100" sortable></el-table-column>
        <el-table-column prop="saleSumPrice" label="售出总价" width="100" sortable></el-table-column>
        <!--<el-table-column prop="saleDate" label="售出日期" width="110" :formatter="dataFormatter" sortable></el-table-column>-->
        <el-table-column prop="paymentDate" label="支付日期" :formatter="dataFormatter" width="120"
                         sortable></el-table-column>
        <el-table-column prop="hasGoods" label="是否拿货" :formatter="yesNoFormatter" width="100"
                         sortable></el-table-column>
        <el-table-column prop="hasPayment" label="是否付款" :formatter="yesNoFormatter" width="100"
                         sortable></el-table-column>
        <el-table-column prop="paymentType" label="付款方式" width="200"></el-table-column>
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

    <!--编辑dialog-->
    <el-dialog class="form-dialog" title="新增销售记录" :visible.sync="dialogFormVisible" :width="formDialogWidth">
      <el-form :inline="true" ref="editSaleForm" :model="editSaleForm" label-position="right" size="small"
               :rules="editFormRule" :label-width="formLabelWidth">
        <el-col :span="24" class="form-item-col">
          <el-form-item label="客户名称:" prop="saleObj">
            <el-input v-model="editSaleForm.saleObj" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="销售产品:" prop="prodId">
            <el-select v-model="editSaleForm.prodId" placeholder="产品名称" @change="prodNameChanage" clearable>
              <el-option v-for="(item,index) in produceDict" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
            <el-input v-if="false" v-model="editSaleForm.prodName"></el-input>
          </el-form-item>
          <el-form-item label="售出单价:" prop="salePrice">
            <el-input v-model.number="editSaleForm.salePrice" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="售出数量:" prop="saleQuantity">
            <el-input v-model.number="editSaleForm.saleQuantity" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="售出总额:" prop="saleSumPrice">
            <el-input v-model.number="editSaleForm.saleSumPrice" autocomplete="off" clearable disabled></el-input>
          </el-form-item>
          <!--<el-form-item label="售出日期:" prop="saleDate">-->
            <!--<el-date-picker type="date" v-model="editSaleForm.saleDate" autocomplete="off"-->
                            <!--clearable></el-date-picker>-->
          <!--</el-form-item>-->
          <el-form-item label="是否拿货:" prop="hasGoods">
            <el-select v-model="editSaleForm.hasGoods" placeholder="是否拿货" clearable>
              <el-option v-for="(item,index) in yesNoDict" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否支付:" prop="hasPayment">
            <el-select v-model="editSaleForm.hasPayment" placeholder="是否支付" clearable>
              <el-option v-for="(item,index) in yesNoDict" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式:" prop="paymentType">
            <el-select v-model="editSaleForm.paymentType" placeholder="支付方式" clearable>
              <el-option v-for="(item,index) in paymentTypeDict" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付日期:" prop="paymentDate">
            <el-date-picker type="date" v-model="editSaleForm.paymentDate" autocomplete="off"
                            clearable></el-date-picker>
          </el-form-item>
          <el-form-item label="备注:" prop="remark">
            <el-input type="textarea" v-model.number="editSaleForm.remark" autocomplete="off"
                      style="width:550px"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogOk" size="small">确 定</el-button>
        <el-button @click="dialogCancel" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <!--确认拿货-->
    <el-dialog title="确认支付" :visible.sync="paymentFormVisible" width="450px">
      <el-form ref="paymentForm" :model="paymentForm" label-position="right" size="small"
                :label-width="formLabelWidth">
          <el-form-item label="支付方式:" prop="paymentType" required>
            <el-select v-model="paymentForm.paymentType" placeholder="支付方式" clearable>
              <el-option v-for="(item,index) in paymentTypeDict1" :label="item.label" :value="item.value"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付日期:" prop="paymentDate" required>
            <el-date-picker type="date" v-model="paymentForm.paymentDate" autocomplete="off"
                            clearable format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onConfirmPayment" size="small">确 定</el-button>
        <el-button @click="onCancelPayment" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <!--确认支付-->

  </div>
</template>

<script>
import {listSale, addSale, updateSale, delSale, getSale, loadProduce, confirmGoods, confirmPayment} from '../../api/bill'
import {dataFormatter, dataTimeFormatter, yesNoFormatter} from '@/utils/toolUtils'
import {message, delMsg} from '@/utils/message'
import moment from 'moment'

export default {
  name: 'saleManager',
  data: function () {
    // 查询form
    let nowDate = new Date()
    let nowStartDate = new Date()
    let nStartDate = nowStartDate.setDate(nowStartDate.getDate() - 7)
    let formdata = {
      prodId: '',
      prodName: '',
      paymentDateStart: nStartDate,
      paymentDate: nowDate
    }
    // 编辑form
    let editformdata = {
      id: null,
      prodId: '',
      prodName: '',
      salePrice: 0,
      saleQuantity: 1,
      saleSumPrice: 0,
      saleDate: new Date(),
      hasGoods: 0,
      hasPayment: 0,
      paymentType: null,
      paymentDate: null,
      remark: ''
    }
    let paymentFormData = {
      paymentType: '',
      paymentDate: new Date()
    }
    const formRule = {
      prodName: [
        {required: true, message: '请输入产品名称', trigger: 'blur'}
      ],
      salePrice: [
        {required: true, message: '请输入产品价格', trigger: 'blur'},
        {type: 'number', message: '进货单价必须为数字值'}
      ],
      saleQuantity: [
        {required: true, message: '请输入产品价格', trigger: 'blur'},
        {type: 'number', message: '进货数量必须为数字值'}
      // ],
      // saleSumPrice: [
      //   {required: true, message: '请输入产品价格', trigger: 'blur'},
      //   {type: 'number', message: '进货总额必须为数字值'}
      ]

    }
    let yesNoDict = [
      {label: '是', value: 1},
      {label: '否', value: 0}
    ]
    let paymentTypeDict = [
      {label: '微信', value: '微信'},
      {label: '现金', value: '现金'},
      {label: '支付宝', value: '支付宝'}
    ]
    let paymentTypeDict1 = [
      {label: '微信', value: '1'},
      {label: '现金', value: '2'},
      {label: '支付宝', value: '3'}
    ]
    return {
      // 下拉字典
      yesNoDict: yesNoDict,
      paymentTypeDict: paymentTypeDict,
      paymentTypeDict1: paymentTypeDict1,
      produceDict: [],
      currentPage: 0,
      pageSize: 10,
      total: 0,
      tableData: null,
      tableIndex: 0,
      // 表格选中行
      tableSelections: [],
      saleForm: formdata,
      // 修改表单对象
      editSaleForm: editformdata,
      paymentForm: paymentFormData,
      editFormRule: formRule,
      // dialog是否修改，新增为否
      isEdit: false,
      // 表单dialog是否可见
      dialogFormVisible: false,
      paymentFormVisible: false,
      // 表单标签宽度
      formLabelWidth: '120px',
      // 表单dialog 宽度
      formDialogWidth: '57%'

    }
  },
  computed: {
    salePriceValue: function () {
      return this.editSaleForm.saleQuantity * this.editSaleForm.salePrice
    }
  },
  watch: {
    salePriceValue: function (val, oldval) {
      this.editSaleForm.saleSumPrice = val
    }
  },
  created () {
    // 加载产品下拉数据
    this.loadProduce()
  },
  mounted () {
    // 初始化查询数据
    this.listSale()
  },
  methods: {
    // table出日期格式化
    dataFormatter: dataFormatter,
    dataTimeFormatter: dataTimeFormatter,
    yesNoFormatter: yesNoFormatter,
    // 产品选择下拉值改变
    prodNameChanage: function (value) {
      if (value) {
        for (let key in this.produceDict) {
          let ps = this.produceDict[key]
          if (ps.value === value) {
            this.editSaleForm.prodName = ps.label
            this.editSaleForm.salePrice = ps.salePrice
            break
          }
        }
      }
    },
    // 表格选中一行
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
      // 重新查询数据
      this.listSale()
    },
    // 当前页发生改变
    handleCurrentChange: function (_page) {
      this.currentPage = _page
      // 重新查询数据
      this.listSale()
    },
    // 点击一行数据编辑
    handleEdit: function (index, row) {
      console.info('update row [ ' + JSON.stringify(row) + ' ]')
      const vm = this
      getSale(row.id).then(res => {
        vm.tableIndex = index
        vm.isEdit = true
        vm.editSaleForm = res
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
        delSale(ids).then(res => {
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
      this.listSale()
    },
    // 重置
    onReset: function () {
      this.saleForm = {}
    },
    // 新增
    onAdd: function () {
      this.dialogFormVisible = true
      this.editSaleForm.id = null
    },
    // 批量确认拿货
    onGood: function () {
      // $alert('此功能先别用', '提示')
      this.onConfirmGood()
    },
    // 批量确认支付
    onPayment: function () {
      // this.$alert('此功能先别用', '提示')
      if (this.tableSelections.length > 0) {
        this.paymentFormVisible = true
      } else {
        message('请选择要确认支付的订单', 'warning')
      }
    },
    // 确认拿货
    onConfirmGood: function () {
      if (this.tableSelections.length > 0) {
        let ids = []
        // let flag = false
        this.tableSelections.forEach(item => {
          if (item.hasGoods === 1) {
            // flag = true
            console.info(`${item.saleObj}此订单已经确认拿货`)
          } else {
            ids.push(item.id)
          }
        })
        // 如果要提示的话，则打开注释
        // if (flag) {
        //   message('已经确认拿货的不需要再次确认', 'error')
        // }

        if (ids.length > 0) {
          let param = {ids: ids.join(',')}
          confirmGoods(param).then(res => {
            if (res === true) {
              message('确认拿货成功', 'success')
              this.listSale()
            } else {
              message('确认拿货失败，请稍后重试', 'success')
            }
          }).catch(() => {
            message('确认拿货失败，请稍后重试', 'success')
          })
        }
      } else {
        message('请选择要确认拿货的订单', 'warning')
      }
    },
    // 确认支付
    onConfirmPayment: function () {
      if (this.tableSelections.length > 0) {
        let ids = []
        // let flag = false
        this.tableSelections.forEach(item => {
          if (item.hasPayment === 1) {
            // flag = true
            console.info(`${item.saleObj}此订单已经确认支付`)
          } else {
            ids.push(item.id)
          }
        })
        // 如果要提示的话，则打开注释
        // if (flag) {
        //   message('已经确认拿货的不需要再次确认', 'error')
        // }

        if (ids.length > 0) {
          this.$refs['paymentForm'].validate(valid => {
            if (valid) {
              this.paymentForm.paymentDate = moment(this.paymentForm.paymentDate).format('YYYY-MM-DD HH:mm:ss')
              let param = Object.assign({ids: ids.join(',')}, this.paymentForm)
              confirmPayment(param).then(res => {
                if (res === true) {
                  message('确认支付成功', 'success')
                  this.paymentFormVisible = false
                  this.listSale()
                } else {
                  message('确认支付失败，请稍后重试', 'success')
                }
              }).catch(() => {
                message('确认支付失败，请稍后重试', 'success')
              })
            } else {
              message('录入信息验证失败，请检查', 'error')
            }
          })
        } else {
          message('请选中未支付的订单', 'warning')
        }
      }
    },
    onCancelPayment: function () {
      this.paymentFormVisible = false
    },
    // 编辑保存
    dialogOk: function () {
      let vm = this
      vm.$refs['editSaleForm'].validate(valid => {
        if (valid) {
          if (vm.isEdit) {
            // 修改
            updateSale(vm.editSaleForm).then(res => {
              message('修改成功', 'success')
              vm.dialogFormVisible = false
              this.tableData.splice(this.tableIndex, 1, res)
            }).catch(() => {

            })
          } else {
            // 新增
            addSale(vm.editSaleForm).then(res => {
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
    listSale: function () {
      let vm = this
      listSale(vm.saleForm, vm.currentPage, vm.pageSize).then(response => {
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

  .saleManager {
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
        .short-select{
          .el-input__inner {
            width: 110px !important;
          }
        }
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
      .form-item-col {
        text-align: left;
        .el-input__inner {
          width: 150px !important;
        }
        .el-date-editor{
          .el-input__inner {
            width: 120px !important;
          }
        }
      }
    }
  }
</style>
