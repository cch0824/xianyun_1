<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <!-- 筛选 -->
          <el-row type="flex" justify="space-between">
            <el-col
              :span="10"
            >单程: {{airDate.departCity}} - {{airDate.destCity}} / {{airDate.departDate}}</el-col>
            <el-col>
              <el-row type="flex" justify="center" :gutter="10">
                <el-col :span="6">
                  <el-select size="small" v-model="selairport" placeholder="起飞机场" clearable>
                    <el-option v-for="(item,index) in airport" :key="index" :value="item"></el-option>
                  </el-select>
                </el-col>

                <el-col :span="6">
                  <el-select size="small" v-model="selflightTimes" placeholder="起飞时间" clearable>
                    <el-option v-for="(item,index) in flightTimes" :key="index" :value="item"></el-option>
                  </el-select>
                </el-col>

                <el-col :span="6">
                  <el-select size="small" v-model="selcompany" placeholder="航空公司" clearable>
                    <el-option v-for="(item,index) in company" :key="index" :value="item"></el-option>
                  </el-select>
                </el-col>

                <el-col :span="6">
                  <el-select size="small" v-model="value" placeholder="机型" clearable>
                    <el-option v-for="(item,index) in ['大','中','小']" :key="index" :value="item"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 撤销筛选 -->
          <div class="clearSearch">
            筛选:
            <el-button type="primary" round plain size="small">撤销</el-button>
          </div>
        </div>

        <!-- 航班头部布局 -->
        <FlightHeader />

        <!-- 航班信息 -->
        <div>
          <FlightItem v-for="(item,index) in currList" :key="index" :data="item" />

          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightHeader from "@/components/air/flightHeader";
import FlightItem from "@/components/air/flightItem";

export default {
  components: {
    FlightHeader,
    FlightItem
  },
  data() {
    return {
      flightData: [], //航班的全部信息
      currList: [], //当前页面显示的航班信息
      airDate: this.$route.query, //出发日期
      airport: [], //起飞机场
      selairport: "",
      flightTimes: [], //起飞时间
      selflightTimes: "",
      company: [], //航空公司
      selcompany: "",
      value: "",
      total: 0, //总条数
      pagesize: 2, //每页显示条数
      pagenum: 1 //当前页码
    };
  },
  methods: {
    // 改变每页显示条数时触发
    handleSizeChange(size) {
      this.pagesize = size;
      this.getCurrdata();
    },
    // 改变当前页码时触发
    handleCurrentChange(num) {
      this.pagenum = num;
      this.getCurrdata();
    },
    getCurrdata() {
      this.currList = this.flightData.slice(
        (this.pagenum - 1) * this.pagesize,
        this.pagenum * this.pagesize
      );
    }
  },
  mounted() {
    // console.log(this.$route.query);
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      // console.log(res);
      this.flightData = res.data.flights;
      this.getCurrdata();
      this.total = this.flightData.length;
      this.airport = res.data.options.airport; //起飞机场
      this.company = res.data.options.company; //航空公司
      this.flightTimes = res.data.options.flightTimes.map(item => {
        return item.from + ":00-" + item.to + ":00";
      });
    });
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
.clearSearch {
  margin-bottom: 10px;
}
</style>