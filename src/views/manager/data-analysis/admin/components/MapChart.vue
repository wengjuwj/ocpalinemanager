<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import 'echarts/map/js/china.js'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      required: true
    },
    limitNum: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      chart: null   
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val, this.limitNum)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData, this.limitNum)
    },
    setOptions(dataList, maxNum) {
      const this_ = this
      const resizeTimer = null
      const option = {
        tooltip: {
          formatter: function(params, ticket, callback) {
            return params.seriesName + '<br />' + params.name + '：' + params.value
          }// 数据格式化
        },
        visualMap: {
          min: 0,
          max: maxNum,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 取值范围的文字
          inRange: {
            color: ['#e0ffff', '#006edd']// 取值范围的颜色
          },
          show: true// 图注
        },
        geo: {
          map: 'china',
          roam: false, // 不开启缩放和平移
          zoom: 1.23, // 视角缩放比例
          label: {
            normal: {
              show: true,
              fontSize: '10',
              color: 'rgba(0,0,0,0.7)'
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: '#F3B329', // 鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            name: '数据量',
            type: 'map',
            geoIndex: 0,
            data: dataList
          }
        ]
      }
      this.chart.setOption(option)

      // window.addEventListener('resize', function () {
      //   if (resizeTimer) clearTimeout(resizeTimer);
      //   resizeTimer = setTimeout(function () {
      //     this_.chart.resize();
      //   }, 100)
      // })
    }
  }
}
</script>
