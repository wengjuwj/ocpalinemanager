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
      type: Object,
      required: true
    },
    limitNum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chart: null
      // mapdata
      // mockMapData:[
      //     {"name":"南海诸岛","value":0},
      //     {"name": "北京", "value": 0},
      //     {"name": "天津", "value": 0},
      //     {"name": "上海", "value": 10},
      //     {"name": "重庆", "value": 0},
      //     {"name": "河北", "value": 0},
      //     {"name": "河南", "value": 30},
      //     {"name": "云南", "value": 0},
      //     {"name": "辽宁", "value": 0},
      //     {"name": "黑龙江", "value": 0},
      //     {"name": "湖南", "value": 0},
      //     {"name": "安徽", "value": 0},
      //     {"name": "山东", "value": 0},
      //     {"name": "新疆", "value": 0},
      //     {"name": "江苏", "value": 0},
      //     {"name": "浙江", "value": 0},
      //     {"name": "江西", "value": 0},
      //     {"name": "湖北", "value": 0},
      //     {"name": "广西", "value": 0},
      //     {"name": "甘肃", "value": 0},
      //     {"name": "山西", "value": 4},
      //     {"name": "内蒙古", "value": 0},
      //     {"name": "陕西", "value": 0},
      //     {"name": "吉林", "value": 0},
      //     {"name": "福建", "value": 0},
      //     {"name": "贵州", "value": 0},
      //     {"name": "广东", "value": 0},
      //     {"name": "青海", "value": 8},
      //     {"name": "西藏", "value": 0},
      //     {"name": "四川", "value": 0},
      //     {"name": "宁夏", "value": 0},
      //     {"name": "海南", "value": 0},
      //     {"name": "台湾", "value": 0},
      //     {"name": "香港", "value": 0},
      //     {"name": "澳门", "value": 0}
      // ],
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
