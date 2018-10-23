<template>
<div>
  <div :id="echartId" :style="echartStyle"></div>
</div>
</template>

<script>
export default {
  name: 'echartComponent',
  props: {
    // 自定义样式
    echartId: {
      type: String,
      default: 'myEchart'
    },
    // 自定义样式
    echartStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    // 自定义标题
    titleText: {
      type: String,
      default: ''
    },
    // 自定义框键名
    toolTipFormat: {
      type: String,
      default: ''
    },
    // 扇形区域名称
    options: {
      type: Array,
      default () {
        return []
      }
    },
    // 提示框名称
    seriesName: {
      type: String,
      default: ''
    },
    // 扇形区域数据
    optionsData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.$nextTick(function () {
      this.drawEchart(this.echartId)
    })
  },
  methods: {
    // 绘制图表
    drawEchart: function (id) {
      this.charts = this.$echarts.init(document.getElementById(id))
      this.charts.on('click', this.clickChart)
      this.charts.setOption({
        title: {
          text: this.titleText,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/> ' + this.toolTipFormat + ':{c}'
        },
        // 示例描述定位
        legend: {
          bottom: 20,
          left: 'center',
          // show: false, // 不显示
          // orient: 'vertical', // 竖向
          // textStyle: {
          //   fontSize: 12,
          //   itemWidth: 10,
          //   itemHeight: 5,
          //   itemGap: 10
          // },

          data: this.options // 扇形区域名称
        },
        series: {
          name: this.seriesName, // 提示框标题
          type: 'pie',
          // radius: '50%', // 实心
          radius: ['20%', '55%'], // 空心
          center: ['50%', '42%'],
          selectedMode: 'single',
          data: this.optionsData, // 扇形区域数据
          labelLine: {
            normal: {
              length: 10,
              length2: 50,
              lineStyle: {
                color: '#333'
              }
            }

          },
          label: {
            normal: {
              show: true,
              formatter: '{b}:{c}\n\n', // 换行
              // formatter: '{b}:{c}', 分类：数量
              // formatter: '{b}: {c}({d}%)'
              borderWidth: 20,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              padding: [10, -60],
              rich: {
                b: {
                  color: '#333',
                  fontSize: 12,
                  lineHeight: 20
                },
                c: {
                  fontSize: 12,
                  lineHeight: 20,
                  color: '#ffffff'
                }
              }
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }

      })
    },
    clickChart: function (param) {
      this.$emit('currentEchartClick', param)
    }
  }
}
</script>

<style scoped>
#myEchart{
  width:120%;
}
</style>
