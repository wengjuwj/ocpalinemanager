<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
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
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
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
      this.setOptions(this.chartData)
    },
    setOptions(expectedData) {
      let xData=[];
      let yData=[];
      expectedData.map(function (item,index) {
              xData.push(item[0])
              yData.push(item[1]);
      });
      this.chart.setOption({
         // Make gradient line here
          visualMap: [{
              show: false,
              type: 'continuous',
              seriesIndex: 0,
              min: 0,
              max: 400
          }],
          title: [{
              left: 'center',
              text: ''
          }],
          tooltip: {
              trigger: 'axis'
          },
          xAxis: [{
              data:xData
          }],
          yAxis: [{
          }],
          series: [{
              type: 'line',
              showSymbol: false,
              data: yData
          }]
      })
    }
  }
}
</script>

<style>

</style>
