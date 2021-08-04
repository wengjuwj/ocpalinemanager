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
      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
            <el-tooltip content="编辑" placement="top" effect="light" style="float: right;">
             <i class="el-icon-edit" style="cursor:pointer;color:#1682e6;"/>
            </el-tooltip>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
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
      </el-col> -->
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>热力地图</span>
            <el-tooltip content="编辑" placement="top" effect="light" style="float: right;">
             <i class="el-icon-edit" style="cursor:pointer;color:#1682e6;" @click="dialogMapVisible=true" />
            </el-tooltip>
          </div>
          <div>
            <!-- 总计人数 -->
            <div>总计人数：<count-to :start-val="0" :end-val="5016" :duration="2600" class="card-list-num" /></div>
            <map-chart :chart-data="mapData" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>观看时间曲线 </span>
            <el-tooltip content="编辑" placement="top" effect="light" style="float: right;">
             <i class="el-icon-edit" style="cursor:pointer;color:#1682e6;" @click="dialogLineVisible=true" />
            </el-tooltip>
          </div>
          <div>
            <!-- 峰值人数 -->
            <div>峰值人数：<count-to :start-val="0" :end-val="1036" :duration="2600" class="card-list-num" /></div>
            <live-line-chart :chart-data="liveLineData"></live-line-chart>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>数据统计（饼图）</span>
            <el-tooltip content="编辑" placement="top" effect="light" style="float: right;">
             <i class="el-icon-edit" style="cursor:pointer;color:#1682e6;"/>
            </el-tooltip>
          </div>
          <div>
            <pie-chart />
          </div>
        </el-card>
      </el-col> -->
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
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>热力地图(调整)</span>
          </div>
          <div>
             <!-- 总计人数 -->
            <div>总计人数：<count-to :start-val="0" :end-val="5016" :duration="2600" class="card-list-num" /></div>
            <map-chart :chart-data="changeMapData" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>观看时间曲线(调整)</span>
          </div>
          <div>
            <!-- 峰值人数 -->
            <div>峰值人数：<count-to :start-val="0" :end-val="1036" :duration="2600" class="card-list-num" /></div>
            <live-line-chart :chart-data="changeLiveLineData"></live-line-chart>
          </div>
        </el-card>
      </el-col>
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
    <!-- 设置地图数据 -->
    <el-dialog title="热力地图" :visible.sync="dialogMapVisible">
      <el-form ref="mapForm" :rules="rulesMap" :model="dialogMapForm" label-position="left" label-width="100px" style="width:80%; margin-left:50px;">
        <el-form-item label="设置访问倍数">
          <el-input type="number" v-model="dialogMapForm.set_visitors_multiple" />
        </el-form-item>
        <el-form-item label="访问量">
            <el-table
              :data="dialogMapForm.set_visitors"
              border
              ref="multipleTable"
              height="300px"
              style="width: 100%;margin-left:15px;">
              <el-table-column
                prop="name"
                label="省份">
                <template slot-scope="{row}">
                  <span>{{ row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="value"
                label="原始访问量">
                <template slot-scope="{row}">
                  <span>{{ row.value }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="value"
                label="调整访问量">
                <template slot-scope="{row}">
                  <el-input v-model="row.set_value" />
                </template>
              </el-table-column>
            </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMapVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="setMapData">
          确定
        </el-button>
      </div>
    </el-dialog>
    <!-- 设置时间曲线 -->
    <el-dialog title="时间曲线" :visible.sync="dialogLineVisible">
      <el-form ref="lineForm" :rules="rulesLine" :model="dialogLineForm" label-position="left" label-width="100px" style="width:80%; margin-left:50px;">
        <el-form-item label="设置访问倍数">
          <el-input type="number" v-model="dialogLineForm.set_visitors_multiple" />
        </el-form-item>
        <el-form-item label="访问量">
            <el-table
              :data="dialogLineForm.set_visitors"
              border
              ref="multipleLineTable"
              height="300px"
              style="width: 100%;margin-left:15px;">
              <el-table-column
                prop="name"
                label="时间">
                <template slot-scope="{row}">
                  <span>{{ row.time_slot }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="value"
                label="原始访问量">
                <template slot-scope="{row}">
                  <span>{{ row.value }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="value"
                label="调整访问量">
                <template slot-scope="{row}">
                  <el-input v-model="row.set_value" />
                </template>
              </el-table-column>
            </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLineVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="setLineData">
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
import { getMapData,getLineData } from '@/api/analysis'

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
      // 观看曲线原始数据块
      liveLineData:[],
      // 观看数据调整数据块
      changeLiveLineData:[],
      lineChartData: lineChartData.newVisitis,
      // 热力地图原始数据块
      mapData: [],
      // 热力地图调整数据块
      changeMapData:[],
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
      // 地图编辑
      dialogMapVisible:false,
      rulesMap:{},
      dialogMapForm:{
        set_visitors_multiple:'',
        set_visitors:[]
      },
      // 观看时间曲线编辑
      dialogLineVisible:false,
      rulesLine:{},
      dialogLineForm:{
        set_visitors_multiple:'',
        set_visitors:[]
      },
      query:{
        id:''
      }
    }
  },
  created(){
    this.query.id=this.$route.query && this.$route.query.id;
    this.getMapData();
    this.getLineData();
  },
  watch:{
    'dialogMapForm.set_visitors_multiple':function(){
      let multiple=1;
      if(this.dialogMapForm.set_visitors_multiple!=''&&this.dialogMapForm.set_visitors_multiple!=0){
        multiple=parseInt(this.dialogMapForm.set_visitors_multiple)
      }
      this.dialogMapForm.set_visitors.forEach(item=>{
        if(item.value!=0){
          item.set_value=(item.value)*multiple
        }
      })
      this.setMapChartData(this.dialogMapForm.set_visitors)
    },
    'dialogLineForm.set_visitors_multiple':function(){
      let multiple=1;
      if(this.dialogLineForm.set_visitors_multiple!=''&&this.dialogLineForm.set_visitors_multiple!=0){
        multiple=parseInt(this.dialogLineForm.set_visitors_multiple)
      }
      this.dialogLineForm.set_visitors.forEach(item=>{
        if(item.value!=0){
          item.set_value=(item.value)*multiple
        }
      })
      this.setLinChartData();
    }
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
    // 设置地图数据
    setMapData(){
      this.setMapChartData(this.dialogMapForm.set_visitors)
      this.dialogMapVisible=false;
    },
    // 设置观看时间数据
    setLineData(){
      this.setLinChartData();
      this.dialogLineVisible=false;
    },
    setLinChartData(){
      let set_arr=[];
        this.dialogLineForm.set_visitors.forEach((item)=>{
        let set_value=[]
        set_value[0]=item.time_slot
        set_value[1]=item.set_value
        set_arr.push(set_value);
       })
       this.changeLiveLineData=set_arr;
    },
    setMapChartData(data){
      this.changeMapData=data.map((item)=>{
          return {name:item.name,value:item.set_value}
      })
    },
    // api连接
    getMapData() {
      getMapData(this.query).then(response => {
        let data=response.data.data
        this.mapData=data;
        this.setMapChartData(data)
        this.dialogMapForm.set_visitors=JSON.parse(JSON.stringify(data))
        this.dialogMapForm.set_visitors.forEach((item)=>{
          item['set_value']=item.value
        });
      })
    },
    getLineData() {
      getLineData(this.query).then(response => {
        console.log('response', response)
        let data=response.data.data
        this.dialogLineForm.set_visitors=JSON.parse(JSON.stringify(data))
        data.forEach((item,index)=>{
          let origin=[]
          let set_value=[]
          origin[0]=item.time_slot
          origin[1]=item.value
          set_value[0]=item.time_slot
          set_value[1]=item.set_value
          this.liveLineData.push(origin);
          this.changeLiveLineData.push(set_value);
        })
      })
    },
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
