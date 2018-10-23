<template>
  <div class="main">
    <el-row>
      <el-col :span="14">&nbsp;</el-col>
      <el-col :span="10">
        <div class="latitude">
          查看纬度：
          <el-select ref="queryLatitude" placeholder="产品名称" size="small" value="date" style="width:120px">
            <el-option label="当日" value="date"></el-option>
            <el-option label="当月" value="month"></el-option>
            <el-option label="当日" value="yeah"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" class="chart-col">
        <div class="chart chart-allStock">
          <echartComponent key="allStock" v-if="loadAllStock" :echartStyle="echartStyle" :echartId="allStockId"
                           :titleText="allStockTitle"
                           :toolTipFormat="allStockToolTip" :options="allStockOptions"
                           :seriesName="allStockSeriesName" :optionsData="allStockOptionsData"
                           @currentEchartClick="allStockEchartClick"></echartComponent>
        </div>
        <!--总支出额-->
      </el-col>
      <el-col :span="8" class="chart-col">
        <div class="chart chart-allSale">
          <echartComponent key="allSale"  v-if="loadAllSale" :echartStyle="echartStyle" :echartId="allSaleId"
                           :titleText="allSaleTitle"
                           :toolTipFormat="allSaleToolTip" :options="allSaleOptions"
                           :seriesName="allSaleSeriesName" :optionsData="allSaleOptionsData"
                           @currentEchartClick="allSaleEchartClick"></echartComponent>
        </div>
        <!--总销售额-->
      </el-col>
      <el-col :span="8" class="chart-col">
        <div class="chart chart-allProfix">
          <echartComponent key="allProfix" v-if="loadAllProfix" :echartStyle="echartStyle" :echartId="allProfixId"
                           :titleText="allProfixTitle"
                           :toolTipFormat="allProfixToolTip" :options="allProfixOptions"
                           :seriesName="allProfixSeriesName" :optionsData="allProfixOptionsData"
                           @currentEchartClick="allProfixEchartClick"></echartComponent>
        </div>
        <!--总利润-->
      </el-col>
      <el-col :span="8" class="chart-col">
        <div class="chart chart-warehouse">
          <echartComponent key="warehouse" v-if="loadWareHouse" :echartStyle="echartStyle"
                           :echartId="wareHouseId" :titleText="wareHouseTitle"
                           :toolTipFormat="wareHouseToolTip" :options="wareHouseOptions"
                           :seriesName="wareHouseSeriesName" :optionsData="wareHouseOptionsData"
                           @currentEchartClick="wareHouseEchartClick"></echartComponent>
        </div>
        <!--当前仓库剩余数量-->
      </el-col>
      <el-col :span="8" class="chart-col">
        <div class="chart chart-todoGood">
          <echartComponent key="todoGood" v-if="loadTodoGood" :echartStyle="echartStyle" :echartId="todoGoodId"
                           :titleText="todoGoodTitle"
                           :toolTipFormat="todoGoodToolTip" :options="todoGoodOptions"
                           :seriesName="todoGoodSeriesName" :optionsData="todoGoodOptionsData"
                           @currentEchartClick="todoGoodEchartClick"></echartComponent>
        </div>
        <!--未提货数量-->
      </el-col>
      <el-col :span="8" class="chart-col">
        <div class="chart chart-todoPayment">
          <echartComponent key="todoPayment" v-if="loadTodoPayment" :echartStyle="echartStyle" :echartId="todoPaymentId"
                           :titleText="todoPaymentTitle"
                           :toolTipFormat="todoPaymentToolTip" :options="todoPaymentOptions"
                           :seriesName="todoPaymentSeriesName" :optionsData="todoPaymentOptionsData"
                           @currentEchartClick="todoPaymentEchartClick"></echartComponent>
        </div>
        <!--未支付订单-->
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echartComponent from '@/components/echartComponent'
import {
  countWareHouse,
  countTodoGood,
  countTodoPayment,
  countAllStock,
  countAllSale,
  countAllProfix
} from '@/api/bill'

export default {
  name: 'main-vue',
  components: {echartComponent},
  data () {
    return {
      echartStyle: {
        width: '18rem',
        height: '25rem'
      },
      // 仓库余量汇总
      wareHouseId: 'echart_id_warehouse',
      loadWareHouse: false,
      wareHouseTitle: '仓库余量统计(袋)',
      wareHouseToolTip: '余量统计',
      wareHouseOptions: [],
      wareHouseSeriesName: '剩余数量',
      wareHouseOptionsData: [],
      // 未提货数量汇总
      todoGoodId: 'echart_id_todogood',
      loadTodoGood: false,
      todoGoodTitle: '未提货数量统计(袋)',
      todoGoodToolTip: '未提货统计',
      todoGoodOptions: [],
      todoGoodSeriesName: '未提数量',
      todoGoodOptionsData: [],
      // 未支付数量汇总
      todoPaymentId: 'echart_id_payment',
      loadTodoPayment: false,
      todoPaymentTitle: '未支付数量统计(袋)',
      todoPaymentToolTip: '未支付统计',
      todoPaymentOptions: [],
      todoPaymentSeriesName: '未支付数量',
      todoPaymentOptionsData: [],
      // 总支出
      allStockId: 'echart_id_allStock',
      loadAllStock: false,
      allStockTitle: '总支出金额统计(元)',
      allStockToolTip: '总支出统计',
      allStockOptions: [],
      allStockSeriesName: '总支出金额',
      allStockOptionsData: [],
      // 总销售
      allSaleId: 'echart_id_allSale',
      loadAllSale: false,
      allSaleTitle: '总销售额统计(元)',
      allSaleToolTip: '总销售统计',
      allSaleOptions: [],
      allSaleSeriesName: '总销售金额',
      allSaleOptionsData: [],
      // 总利润
      allProfixId: 'echart_id_allProfix',
      loadAllProfix: false,
      allProfixTitle: '利润金额统计(元)',
      allProfixToolTip: '利润统计',
      allProfixOptions: [],
      allProfixSeriesName: '利润金额',
      allProfixOptionsData: []
    }
  },
  created () {
    this.countWareHouseQuery('date')
    this.countTodoGoodQuery('date')
    this.countTodoPaymentQuery('date')
    this.countAllStockQuery('date')
    this.countAllSaleQuery('date')
    this.countAllProfixQuery('date')
  },
  methods: {
    // 仓库汇总请求
    countWareHouseQuery: function (type) {
      countWareHouse(type).then(res => {
        this.wareHouseTitle = res.title
        this.wareHouseOptions = res.options
        this.wareHouseOptionsData = res.optionsData
        this.loadWareHouse = true
      }).catch(() => {
        console.error('仓库汇总查询失败')
      })
    },
    // 未提货
    countTodoGoodQuery: function (type) {
      countTodoGood(type).then(res => {
        this.todoGoodTitle = res.title
        this.todoGoodOptions = res.options
        this.todoGoodOptionsData = res.optionsData
        this.loadTodoGood = true
      }).catch(() => {
        console.error('未提货汇总查询失败')
      })
    },
    // 未支付
    countTodoPaymentQuery: function (type) {
      countTodoPayment(type).then(res => {
        this.todoPaymentTitle = res.title
        this.todoPaymentOptions = res.options
        this.todoPaymentOptionsData = res.optionsData
        this.loadTodoPayment = true
      }).catch(() => {
        console.error('未支付汇总查询失败')
      })
    },
    // 总支出
    countAllStockQuery: function (type) {
      countAllStock(type).then(res => {
        this.allStockTitle = res.title
        this.allStockOptions = res.options
        this.allStockOptionsData = res.optionsData
        this.loadAllStock = true
      }).catch(() => {
        console.error('总支出汇总查询失败')
      })
    },
    // 总销售
    countAllSaleQuery: function (type) {
      countAllSale(type).then(res => {
        this.allSaleTitle = res.title
        this.allSaleOptions = res.options
        this.allSaleOptionsData = res.optionsData
        this.loadAllSale = true
      }).catch(() => {
        console.error('总销售汇总查询失败')
      })
    },
    // 总利润
    countAllProfixQuery: function (type) {
      countAllProfix(type).then(res => {
        this.allProfixTitle = res.title
        this.allProfixOptions = res.options
        this.allProfixOptionsData = res.optionsData
        this.loadAllProfix = true
      }).catch(() => {
        console.error('仓库汇总查询失败')
      })
    },
    // 仓库汇总点击
    wareHouseEchartClick: function (param) {
    },
    // 未提货汇总点击
    todoGoodEchartClick: function (param) {
    },
    // 未支付汇总点击
    todoPaymentEchartClick: function (param) {
    },
    // 总支出汇总点击
    allStockEchartClick: function (param) {
    },
    // 总销售汇总点击
    allSaleEchartClick: function (param) {
    },
    // 总利润汇总点击
    allProfixEchartClick: function (param) {
    }
  }
}
</script>

<style scoped lang="scss">
  @mixin border {
    /*border: 1px solid red*/
  }

  .main {
    .latitude {
    }
    .chart-col {
      .chart {
        @include border;
        /*width: 18rem;*/
        /*height: 18rem;*/
        margin: 0 auto
      }
    }

  }
</style>
