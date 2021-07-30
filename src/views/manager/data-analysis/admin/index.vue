<template>
  <div class="dashboard-editor-container">

    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

    <!-- <el-row style="margin-bottom:30px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>观看时间曲线</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div>
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-card>   
    </el-row> -->

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
            <!-- <el-tooltip content="编辑" placement="top" effect="light" style="float: right;">
             <i class="el-icon-edit" style="cursor:pointer;color:#1682e6;"/>
            </el-tooltip> -->
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div>
            <div class="basic-info">
              <el-row>
                  <div class="card-list">
                      <div class="card-list-icon-wrapper icon-component">
                        <svg-icon icon-class="peoples" class-name="card-list-icon"/>
                      </div>
                      <div class="card-list-description component-guide">
                        <div class="card-list-text">
                          当前访问量<count-to :start-val="0" :end-val="2002" :duration="2600" class="card-list-num" />
                        </div>
                      </div>
                      <div class="card-list-operation">
                          <el-tooltip content="设置" placement="top" effect="light">
                            <el-button type="primary" icon="el-icon-setting" circle @click="dialogVisitorsVisible = true">
                            </el-button>
                          </el-tooltip>
                      </div>
                  </div>
              </el-row>
               <el-row>
                  <div class="card-list">
                      <div class="card-list-icon-wrapper icon-guide">
                        <svg-icon icon-class="size" class-name="card-list-icon"/>
                      </div>
                      <div class="card-list-description description-guide">
                        <div class="card-list-text">
                          当前访问倍数<count-to :start-val="0" :end-val="2" :duration="2" class="card-list-num" />
                        </div>
                      </div>
                      <div class="card-list-operation">
                          <el-tooltip content="设置" placement="top" effect="light">
                            <el-button type="success" icon="el-icon-setting" circle @click="dialogMultipleVisible = true">
                            </el-button>
                          </el-tooltip>
                      </div>
                  </div>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>热力地图</span>
            <!-- <el-tooltip content="编辑" placement="top" effect="light" style="float: right;">
             <i class="el-icon-edit" style="cursor:pointer;color:#1682e6;"/>
            </el-tooltip> -->
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div>
            <map-chart :chart-data="mapData" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>观看时间曲线</span>
            <!-- <el-tooltip content="编辑" placement="top" effect="light" style="float: right;">
             <i class="el-icon-edit" style="cursor:pointer;color:#1682e6;"/>
            </el-tooltip> -->
          </div>
          <div>
            <!-- <line-chart :chart-data="lineChartData" /> -->
            <live-line-chart :chart-data="liveLineData"></live-line-chart>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>数据统计（饼图）</span>
            <!-- <el-tooltip content="编辑" placement="top" effect="light" style="float: right;">
             <i class="el-icon-edit" style="cursor:pointer;color:#1682e6;"/>
            </el-tooltip> -->
          </div>
          <div>
            <pie-chart />
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>数据统计（柱图）</span>
            <el-tooltip content="编辑" placement="top" effect="light" style="float: right;">
             <i class="el-icon-edit" style="cursor:pointer;color:#1682e6;"/>
            </el-tooltip>
          </div>
          <div>
            <bar-chart />
          </div>
          </el-card>
      </el-col> -->
    </el-row>
    <!-- 设置访问量 -->
    <el-dialog title="设置访问量" :visible.sync="dialogVisitorsVisible">
      <el-form ref="visitorsForm" :rules="rules" :model="dialogVisitorsForm" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="当前访问量" prop="visitors_num">
          <el-input v-model="dialogVisitorsForm.visitors_num" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisitorsVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogVisitorsVisible = false">
          确定
        </el-button>
      </div>
    </el-dialog>
    <!-- 设置访问倍数 -->
    <el-dialog title="设置访问倍数" :visible.sync="dialogMultipleVisible">
      <el-form ref="multipleForm" :rules="rulesMultiple" :model="dialogMultipleForm" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="访问倍数" prop="multiple">
          <el-input v-model="dialogMultipleForm.multiple" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMultipleVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogMultipleVisible = false">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import MapChart from './components/MapChart'
import LiveLineChart from './components/LiveLineChart.vue'
// api
import { getMapData } from '@/api/analysis'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    PieChart,
    BarChart,
    TodoList,
    BoxCard,
    MapChart,
    CountTo,
    LiveLineChart
  },
  data() {
    return {
      liveLineData:[["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]],
      lineChartData: lineChartData.newVisitis,
      // 热力地图数据
      mapData: [],
      // 访问量
      dialogVisitorsVisible:false,
      rules:{
        visitors_num: [{ required: true, message: '请填写直播间名称', trigger: 'blur' }],
      },
      dialogVisitorsForm:{
        visitors_num:''
      },
       // 访问倍数
      dialogMultipleVisible:false,
      rulesMultiple:{
        multiple: [{ required: true, message: '请填写直播间名称', trigger: 'blur' }],
      },
      dialogMultipleForm:{
        multiple:''
      },
      query:{
        id:''
      }
    }
  },
  created(){
    this.query.id=this.$route.query && this.$route.query.id
    console.log(this.query.id, 'this.querythis.query')
    this.getMapData();
  },
  methods: {
    // reset visitorsForm data
    resetVisitors(){
      this.dialogVisitorsForm={
        visitors_num:''
      }
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    // api连接
    getMapData() {
      getMapData(this.query).then(response => {
        this.mapData=response.data.data
        console.log(this.mapData, 'this.mapDatamapDatamapData')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.box-card{
  margin-bottom: 20px;
}
.basic-info{
  height: 350px;
  width: 100%;
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
// 基本信息-信息列表
.card-list{
  height:56px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 1px 1px 4px 1px rgb(0 0 0 / 20%);
  .card-list-icon-wrapper{
    padding:10px;
    transition: all 0.38s ease-out;
    // border-radius: 6px;
    margin-right: 10px;
  }
  .card-list-icon {
      float: left;
      font-size: 30px;
    }
  .card-list-description{
    flex: 1;
    font-weight: bold;
    margin-left: 0px;
    .card-list-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
    }
      .card-list-num {
        margin-left: 5%;
        font-size: 16px;
      }
  }
  .card-list-operation{

  }
   &:hover {
      .icon-component,.component-guide .card-list-text,.component-guide .card-list-num {
        color: #36a3f7;
      }
      .icon-guide,.description-guide .card-list-text,.description-guide .card-list-num{
        color: #34bfa3;
      }
    }
}
</style>
